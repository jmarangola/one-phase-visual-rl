import PhysX from '../vendor/physx/physx-js-webidl.mjs';
import {downloadAssets,decodeJSON} from '../assets.js';
import {createPhysics} from '../physics.js';
import {createRenderer} from '../renderer.js';
import {createPolicyWorker} from '../policy-client.js';
import {CpuRenderer,ObjectLoader,serializeScene} from './vendor/cpu-renderer.js';

const $=id=>document.getElementById(id),query=new URLSearchParams(location.search);
const steps=Math.min(150,Math.max(20,Number(query.get('steps')||110)));
const result={checkpoint:'bb1c4c44a8a2591089a8145656ad14832fa22371',renderer:'@tinypoly/cpu-renderer 0.3.1',rendererThree:'0.187.0',policyThree:'0.181.0',renderWorkers:4,stepsPerRun:steps,isolated:crossOriginIsolated,logicalCores:navigator.hardwareConcurrency,runs:[]};
const tick=ms=>new Promise(r=>setTimeout(r,ms));
const stats=a=>{const b=[...a].sort((x,y)=>x-y);return {count:b.length,median:b[Math.floor(b.length*.5)]??null,p95:b[Math.min(b.length-1,Math.floor(b.length*.95))]??null,mean:b.reduce((x,y)=>x+y,0)/b.length};};
let view,physics,policy,cpu,copy,serialized,meshCopies=[],originals=new Map(),copies=new Map(),stop=false,closed=false;
function report(text){$('status').textContent=text;$('results').textContent=JSON.stringify(result,null,2);}
function cleanup(){closed=true;stop=true;cpu?.dispose();policy?.dispose();view?.dispose();physics?.dispose();}
addEventListener('pagehide',cleanup);
$('stop').onclick=()=>{stop=true;cpu?.cancel();};
$('rerun').onclick=()=>location.reload();
function syncScene(){
  view.scene.updateMatrixWorld(true);
  for(const [uuid,o]of originals){const c=copies.get(uuid);if(!c)continue;c.matrixAutoUpdate=false;c.matrix.copy(o.matrix);c.matrixWorld.copy(o.matrixWorld);}
  copy.updateMatrixWorld(true);
}
async function frame({reuseScene=false}={}){
  const t=performance.now();syncScene();
  // Rigid links keep geometry/materials. Reuse their shared arrays and only
  // update matrices, so the benchmark does not reserialize 410k triangles.
  if(!reuseScene){
    for(let i=0;i<meshCopies.length;i++)serialized.scene.meshes[i].matrixWorld=meshCopies[i].matrixWorld.toArray();
    cpu.setScene({scene:serialized.scene,transfer:[]});
  }
  const image=await cpu.render();
  $('cpu').width=image.width;$('cpu').height=image.height;
  $('cpu').getContext('2d').putImageData(new ImageData(new Uint8ClampedArray(image.data),image.width,image.height),0,0);
  return performance.now()-t;
}
async function run(label,settings){
  stop=false;physics.reset(0);policy.reset();view.update(physics.getBodyPoses());view.render();
  const record={label,settings,success:false,firstSuccessStep:null,steps:0,inferenceMs:[],stepMs:[],rayFrameMs:[],rayErrors:[]};
  let rendering=true,renderTask=Promise.resolve();
  if(settings){
    cpu=new CpuRenderer({width:settings.width,height:settings.height,workers:4,pixelRatio:1,scene:{scene:serialized.scene,transfer:[]},camera:view.viewCamera,
      environment:{kind:'hdri',url:new URL('../assets/scene/lighting/environment.hdr',import.meta.url).href,intensity:1},
      settings:{samples:1,tileSize:32,toneMapping:'linear',shadows:{enabled:true,softness:0},ambientOcclusion:{enabled:false},globalIllumination:{enabled:settings.gi,samples:4,bounces:1,cache:true,cacheSpacing:4,denoise:settings.gi},vignette:0,grain:0},
      createWorker:()=>new Worker(new URL('./vendor/worker.js',import.meta.url),{type:'module'})});
    $('cpu-caption').textContent=`${label} · ${settings.width} × ${settings.height} · 4 CPU render workers`;
    const before=view.readPolicyRGB().slice();
    record.phaseEvents=[];let frameStart=performance.now();
    cpu.on('start',()=>record.phaseEvents.push({event:'prepared',ms:performance.now()-frameStart}));
    cpu.on('progress',p=>{if(p.completed===p.total)record.phaseEvents.push({event:p.phase,ms:performance.now()-frameStart});});
    record.coldFrameMs=await frame();
    const after=view.readPolicyRGB();record.changedPolicyRGBBytes=before.reduce((n,v,i)=>n+(v!==after[i]),0);
    renderTask=(async()=>{while(rendering&&!stop&&!closed){try{frameStart=performance.now();record.rayFrameMs.push(await frame());}catch(e){if(rendering&&!stop)record.rayErrors.push(String(e));break;}await tick(0);}})();
  }
  const begin=performance.now();
  for(let step=0;step<steps&&!stop&&!closed;step++){
    const t=performance.now(),rgb=view.readPolicyRGB(),action=await policy.infer(rgb,physics.getProprio());
    const state=physics.step(action);view.update(state.bodyPoses);view.render();
    if(state.success&&record.firstSuccessStep===null)record.firstSuccessStep=state.step;
    record.success=state.success;record.coverage=state.coverage;record.steps=state.step;
    if(step>=10){record.inferenceMs.push(policy.lastInferenceMs);record.stepMs.push(performance.now()-t);}
    report(`${label}: policy step ${state.step} / ${steps}${record.firstSuccessStep?' · task succeeded':''}`);
    await tick(Math.max(0,50-(performance.now()-t)));
  }
  record.rolloutWallMs=performance.now()-begin;rendering=false;
  if(settings){
    cpu.cancel();await renderTask;
    if(!stop&&!closed){
      report(`${label}: checking a stationary scene`);
      record.finalUpdatedFrameMs=await frame();
      record.stationaryFrameMs=await frame({reuseScene:true});
    }
    cpu.dispose();cpu=null;
  }
  record.inference=stats(record.inferenceMs);record.controlStep=stats(record.stepMs);record.rayFrame=stats(record.rayFrameMs);
  record.displayFps=record.rayFrame.mean?1000/record.rayFrame.mean:null;
  result.runs.push(record);report(`${label} complete`);
  $('summary').innerHTML='<table><tr><th>Mode</th><th>Policy median</th><th>Display render median</th><th>Success</th></tr>'+result.runs.map(r=>`<tr><td>${r.label}</td><td>${r.inference.median?.toFixed(0)} ms</td><td>${r.rayFrame.median?.toFixed(0)??'GPU rasterization'}${r.rayFrame.median?' ms':''}</td><td>${r.firstSuccessStep?'Yes, step '+r.firstSuccessStep:'No'}</td></tr>`).join('')+'</table>';
}
try{
 const manifest=await(await fetch('./assets-manifest.json')).json(),assets=await downloadAssets(manifest,()=>{});
 const spec=decodeJSON(assets.get(manifest.scene.spec)),pm=decodeJSON(assets.get(manifest.policy.manifest)),rm=decodeJSON(assets.get(manifest.runtime.manifest));
 const getAsset=async p=>assets.get(manifest.scene.base+p);
 physics=await createPhysics(await PhysX({wasmBinary:assets.get(manifest.physics.wasm)}),spec,{getAsset});
 view=await createRenderer($('raster'),spec,{getAsset});view.update(physics.getBodyPoses());view.render();
 // A separate Three 0.187 copy satisfies the CPU renderer's peer dependency.
 // The live policy scene and its materials, camera and shadows are untouched.
 const snapshot=view.scene.clone(true);snapshot.environment=null;snapshot.background=null;
 copy=await new ObjectLoader().parseAsync(snapshot.toJSON());
 // Three's clone generates UUIDs: pair by traversal order before deserialization.
 const sourceObjects=[],clonedObjects=[];view.scene.traverse(o=>sourceObjects.push(o));snapshot.traverse(o=>clonedObjects.push(o));
 for(let i=0;i<sourceObjects.length;i++)originals.set(clonedObjects[i].uuid,sourceObjects[i]);
 copy.traverse(o=>{copies.set(o.uuid,o);if(o.isMesh||o.isLight)o.castShadow=true;if(o.isMesh)o.receiveShadow=true;});
 syncScene();serialized=await serializeScene(copy);
 copy.traverseVisible(o=>{if(o.isMesh)meshCopies.push(o);});
 if(meshCopies.length!==serialized.scene.meshes.length)throw Error('CPU mesh/pose mapping mismatch');
 result.meshes=0;result.triangles=0;copy.traverse(o=>{if(o.isMesh){result.meshes++;result.triangles+=(o.geometry.index?.count??o.geometry.attributes.position.count)/3;}});
 const wasm=new Uint8Array(rm.wasm_bytes);let offset=0;for(const part of rm.assets){const bytes=assets.get(manifest.runtime.base+part.path);wasm.set(bytes,offset);offset+=bytes.length;}
 policy=await createPolicyWorker(assets.get(manifest.policy.base+pm.model),pm.external_data.map(p=>({path:p,data:assets.get(manifest.policy.base+p)})),wasm,{backend:'wasm',cpuThreads:8});
 result.policyThreads=policy.threads;assets.clear();
 for(let i=0;i<10;i++)await policy.infer(view.readPolicyRGB(),physics.getProprio());
 $('stop').disabled=false;
 await run('Current rasterization',null);
 if(!stop)await run('CPU ray-traced shadows',{width:640,height:360,gi:false});
 if(!stop)await run('CPU shadows + indirect lighting',{width:640,height:360,gi:true});
 if(!stop)await run('Current rasterization (repeat)',null);
 report(stop?'Stopped':'Comparison complete');result.complete=!stop;$('results').textContent=JSON.stringify(result,null,2);
 $('save-results').href=URL.createObjectURL(new Blob([JSON.stringify(result,null,2)],{type:'application/json'}));$('save-results').hidden=false;
 const proof=document.createElement('canvas');proof.width=1320;proof.height=540;const ctx=proof.getContext('2d');
 ctx.fillStyle='#f5f5f7';ctx.fillRect(0,0,1320,540);ctx.fillStyle='#252527';ctx.font='bold 26px sans-serif';ctx.fillText('Current rasterization / experimental CPU ray-traced lighting',20,38);
 ctx.drawImage($('raster'),20,68,630,355);ctx.drawImage($('cpu'),670,68,630,355);
 ctx.font='20px sans-serif';ctx.fillText('Current WebGL rasterization',20,458);ctx.fillText('CPU shadows + diffuse indirect lighting',670,458);
 ctx.font='17px sans-serif';ctx.fillText('Same 410,746-triangle scene. Policy camera remains rasterized.',20,495);
 ctx.fillText('CPU lighting test: 640 × 360, four render workers. No changes to the live website.',20,521);
 $('save-image').href=proof.toDataURL('image/png');$('save-image').hidden=false;
 policy.dispose();policy=null;$('rerun').disabled=false;$('stop').disabled=true;
}catch(e){result.error=String(e.stack||e);report('Experiment stopped: '+e.message);cpu?.dispose();policy?.dispose();$('rerun').disabled=false;}
