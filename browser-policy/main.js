import PhysX from './vendor/physx/physx-js-webidl.mjs';
import {downloadAssets,decodeJSON} from './assets.js';
import {createPhysics} from './physics.js';
import {createRenderer} from './renderer.js?v=fly48';
import {createPolicyWorker} from './policy-client.js';
import {ensureIsolation} from './isolation.js';
import {createPolicyInputs} from './policy-inputs.js';
import {createForceInteraction} from './force-interaction.js';

const $=id=>document.getElementById(id),query=new URLSearchParams(location.search);
const debug=query.has('debug'),maxSteps=Number(query.get('steps')||300);
const rayPreview=document.documentElement.dataset.rayPreview==='true';
if(window.parent!==window)document.body.classList.add('embedded');
const diagnostics={phase:'download',steps:0,success:false};
const resources=[];
const startupAbort=new AbortController();
let stopped=false,suspended=false,onScreen=true;
function cleanup(){if(stopped)return;stopped=true;startupAbort.abort();for(const resource of resources.reverse()){try{resource.dispose();}catch(error){console.warn(error);}}}
function own(resource){if(stopped){resource.dispose();throw Error('Page closed');}resources.push(resource);return resource;}
addEventListener('pagehide',event=>{if(event.persisted)suspended=true;else cleanup();});
addEventListener('pageshow',()=>{suspended=false;});
new IntersectionObserver(entries=>{onScreen=entries[0].isIntersecting;}).observe($('viewport'));
if(window.parent!==window)new ResizeObserver(()=>window.parent.postMessage({type:'one-phase-demo-resize',height:document.querySelector('main').getBoundingClientRect().height},location.origin)).observe(document.querySelector('main'));
let diagnosticNode,debugImage;
if(debug){const panel=document.createElement('details');panel.open=true;const summary=document.createElement('summary');summary.textContent='Validation';panel.append(summary);debugImage=document.createElement('img');debugImage.width=224;debugImage.height=224;debugImage.alt='Initial policy camera image';panel.append(debugImage);diagnosticNode=document.createElement('pre');panel.append(diagnosticNode);document.querySelector('main').append(panel);}
function report(values){Object.assign(diagnostics,values);if(diagnosticNode)diagnosticNode.textContent=JSON.stringify(diagnostics,null,2);}
function fail(error){cleanup();console.error(error);report({phase:'error',error:String(error?.stack||error)});$('loading').classList.remove('done');$('loading').removeAttribute('aria-hidden');$('loading-title').textContent='This device could not start the demo';$('loading-detail').textContent=String(error?.message||error);$('progress-track').classList.remove('preparing');$('retry').hidden=false;$('status').textContent='Unavailable';$('pause').disabled=true;$('reset').disabled=true;}
$('retry').addEventListener('click',()=>location.reload());
addEventListener('unhandledrejection',event=>fail(event.reason));
addEventListener('error',event=>{if(/^ResizeObserver loop (limit exceeded|completed with undelivered notifications)/.test(event.message||''))return;fail(event.error||event.message);});
function phase(title,detail){$('loading-title').textContent=title;$('loading-detail').textContent=detail;$('progress-track').classList.add('preparing');report({phase:detail});}
const tick=ms=>new Promise(resolve=>setTimeout(resolve,ms));
const started=performance.now();
async function start(){
  if(!globalThis.isSecureContext)throw Error('Open this demo over HTTPS (or localhost).');
  if(!('WebAssembly'in globalThis)||!('Worker'in globalThis))throw Error('This browser needs WebAssembly and Web Workers.');
  if(await ensureIsolation({workerURL:new URL('../isolation-sw.js',import.meta.url)}))return;
  const manifestResponse=await fetch('./assets-manifest.json',{cache:'no-cache'});
  if(!manifestResponse.ok)throw Error('The asset manifest could not be loaded.');
  const manifest=await manifestResponse.json();
  const assets=await downloadAssets(manifest,({loaded,total,cachedBytes=0,persistedBytes=0})=>{
    const percent=Math.min(100,loaded/total*100);$('progress-fill').style.width=`${percent}%`;$('progress-track').setAttribute('aria-valuenow',String(Math.round(percent)));
    $('loading-detail').textContent=`${(loaded/1e6).toFixed(0)} / ${(total/1e6).toFixed(0)} MB${persistedBytes===total?' · saved for next time':''}`;
    report({downloadedBytes:loaded,totalBytes:total,cachedBytes,persistedBytes});
  },startupAbort.signal);
  const spec=decodeJSON(assets.get(manifest.scene.spec)),policyManifest=decodeJSON(assets.get(manifest.policy.manifest)),runtimeManifest=decodeJSON(assets.get(manifest.runtime.manifest));
  const getScene=async path=>{const value=assets.get(manifest.scene.base+path);if(!value)throw Error(`Missing scene asset ${path}`);return value;};
  phase('Preparing the simulation','Building the robot and scene');
  const physics=own(await createPhysics(await PhysX({wasmBinary:assets.get(manifest.physics.wasm)}),spec,{getAsset:getScene}));
  let seededEpisode=0;
  const referenceStart=query.get('start')==='reference';
  function resetEpisode(){
    const seed=query.has('seed')?(Number(query.get('seed'))+seededEpisode++)>>>0:crypto.getRandomValues(new Uint32Array(1))[0];
    const state=physics.reset(seed,{randomizeTee:!referenceStart});
    report({startMode:referenceStart?'reference':'uniform training poses',seed,initialTee:state.tee,goal:state.goal});
    return state;
  }
  resetEpisode();
  const view=own(await createRenderer($('scene'),spec,{getAsset:getScene}));
  view.update(physics.getBodyPoses());view.render();
  const initialRGB=view.readPolicyRGB().slice();
  const initialProprio=physics.getProprio(),inputs=createPolicyInputs($('policy-inputs'),spec);
  inputs?.update(initialRGB,initialProprio);
  if(debugImage){const c=document.createElement('canvas');c.width=224;c.height=224;const context=c.getContext('2d'),data=context.createImageData(224,224);for(let i=0;i<224*224;i++){data.data.set(initialRGB.subarray(i*3,i*3+3),i*4);data.data[i*4+3]=255;}context.putImageData(data,0,0);debugImage.src=c.toDataURL();}
  phase('Preparing the policy','Initializing inference on this device');
  function policyAssets(loaded){
    const wasmBinary=new Uint8Array(runtimeManifest.wasm_bytes);let offset=0;
    for(const part of runtimeManifest.assets){const bytes=loaded.get(manifest.runtime.base+part.path);wasmBinary.set(bytes,offset);offset+=bytes.length;loaded.delete(manifest.runtime.base+part.path);}
    return {graph:loaded.get(manifest.policy.base+policyManifest.model),externalData:policyManifest.external_data.map(path=>({path,data:loaded.get(manifest.policy.base+path)})),wasmBinary};
  }
  const {graph,externalData,wasmBinary}=policyAssets(assets);
  const policy=own(await createPolicyWorker(graph,externalData,wasmBinary,{
    backend:query.get('backend')||'auto',
    ...(query.has('threads')?{cpuThreads:Number(query.get('threads'))}:{}),
    onProgress:progress=>phase('Preparing the policy',progress.message||progress.stage),
    reloadAssets:async()=>policyAssets(await downloadAssets(manifest,()=>{},startupAbort.signal)),
  }));
  const firstAction=await policy.infer(initialRGB,initialProprio);
  let display=null;
  if(rayPreview){
    // Only the explicitly opened experimental page loads a ray tracer.
    const {createForcedRayDisplay}=await import('./forced-ray-display.js');
    display=own(await createForcedRayDisplay(view,spec,{
      onError:fail,onSamples:samples=>{if($('ray-samples'))$('ray-samples').textContent=`${Math.round(samples)} samples / pixel`;},
      getAsset:getScene,signal:startupAbort.signal,onProgress:phase,
      onDecision:graphics=>{$('scene').dataset.renderingMode=graphics.mode;report({graphics});},
    }));
  }else{
    // The website always uses the existing rasterizer: no graphics benchmark,
    // saved ray-tracing decision, or optional renderer downloads on startup.
    $('scene').dataset.renderingMode='rasterized';
    report({graphics:{mode:'rasterized',reason:'Website default'}});
  }
  assets.clear();
  report({phase:'running',backend:policy.backend,threads:policy.threads,capabilities:policy.capabilities,loadMs:performance.now()-started,initialProprio:Array.from(physics.getProprio()),firstAction:Array.from(firstAction)});
  let paused=rayPreview,resetRequested=false,first=firstAction,episode=0,coveredControlSteps=0,observationStep=0;
  let episodeDeadline=maxSteps;
  const forces=own(createForceInteraction($('scene'),view,{
    enabled:()=>!stopped&&!suspended&&!resetRequested&&!view.introActive(),
    getPulses:physics.getForces,
    onRelease(target,force){
      const pulse=physics.applyPlanarForce(target,force);if(!pulse)return null;
      coveredControlSteps=0;episodeDeadline=Math.max(episodeDeadline,observationStep+100);
      report({lastPerturbation:{target,force:pulse.force,duration:pulse.duration,atStep:observationStep}});
      return pulse;
    },
  }));
  $('viewport').classList.add('ready');$('loading').classList.add('done');$('loading').setAttribute('aria-hidden','true');$('status').textContent='Live policy';$('reset').disabled=false;$('pause').disabled=false;
  function updatePlaybackUI(){$('pause-label').textContent=paused?'Play':'Pause';$('pause').classList.toggle('is-paused',paused);$('status').textContent=paused?'Paused':'Live policy';}
  updatePlaybackUI();
  if(!rayPreview)view.startIntro({shouldAdvance:()=>onScreen&&!suspended});
  $('pause').onclick=()=>{paused=!paused;updatePlaybackUI();};
  $('reset').onclick=()=>{resetRequested=true;forces.cancel();view.resetCamera();};
  if(rayPreview)$('ray-refine').onchange=()=>{if(!$('ray-refine').checked)view.render();};
  const observer=new ResizeObserver(()=>{if(!stopped)view.render();});observer.observe($('viewport'));own({dispose:()=>observer.disconnect()});
  // Fixed 20 Hz control in simulation. Slow devices advance simulated time more slowly.
  while(!stopped){
    if(resetRequested){forces.cancel();const state=resetEpisode();view.nextTableTexture();policy.reset();first=null;episode++;coveredControlSteps=0;observationStep=0;episodeDeadline=maxSteps;resetRequested=false;view.update(state.bodyPoses);view.render();inputs?.update(view.readPolicyRGB(),physics.getProprio());updatePlaybackUI();report({episode,phase:paused?'paused':'running',steps:0,simulationSeconds:0,coverage:state.coverage,tee:state.tee,qpos:state.qpos,action:null,firstAction:null,success:false,everSucceeded:false,activeForces:[],lastPerturbation:null});}
    if(paused||suspended||(!debug&&(document.hidden||!onScreen))){
      if(rayPreview&&paused&&!suspended&&!document.hidden&&onScreen&&$('ray-refine')?.checked&&display.samples<512)await display.refine();
      await tick(100);continue;
    }
    const time=performance.now(),pixels=first?null:view.readPolicyRGB(),renderReadbackMs=performance.now()-time;
    let action=first;
    if(!action){const proprio=physics.getProprio();inputs?.update(pixels,proprio,observationStep);action=await policy.infer(pixels,proprio);}
    first=null;
    if(stopped)break;
    if(resetRequested)continue;
    if(paused){first=action;continue;}
    const physicsStart=performance.now(),state=physics.step(action),physicsMs=performance.now()-physicsStart;observationStep=state.step;view.update(state.bodyPoses);view.render();if(rayPreview)await display.idle();
    const activeForces=physics.getForces();
    // Website reset: two consecutive covered frames, without waiting for the
    // stricter evaluation criterion that also requires the Tee to settle.
    coveredControlSteps=state.coverage>=.9&&!activeForces.length&&!forces.dragging?coveredControlSteps+1:0;
    const ms=performance.now()-time;
    report({steps:state.step,backend:policy.backend,threads:policy.threads,simulationSeconds:state.time,coverage:state.coverage,success:state.success,everSucceeded:diagnostics.everSucceeded||state.success,activeForces,lastInferenceMs:policy.lastInferenceMs,renderReadbackMs,physicsMs,controlStepWallMs:ms,action:Array.from(action),qpos:state.qpos,tee:state.tee});
    if(debug&&state.step>=maxSteps){paused=true;updatePlaybackUI();report({phase:'validation complete'});$('status').textContent='Validation complete';}
    else if(!debug&&coveredControlSteps>=2){resetRequested=true;continue;}
    else if(!debug&&!forces.dragging&&!activeForces.length&&state.step>=episodeDeadline){await tick(600);if(!forces.dragging&&!physics.getForces().length)resetRequested=true;}
    await tick(Math.max(0,50-ms));
  }
}
start().catch(fail);
