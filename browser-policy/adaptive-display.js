import {RT_FAST} from './ray-presets.js';
import {acceptsScene,deviceKey,probeGPU,readDecision,writeDecision,waitForGPU,LIMITS} from './graphics-selection.js';

function bounded(promise,ms,signal,onLate=()=>{}){
  return new Promise((resolve,reject)=>{
    let done=false;
    const finish=(fn,value)=>{if(done)return;done=true;clearTimeout(timer);signal?.removeEventListener('abort',abort);fn(value);};
    const abort=()=>finish(reject,new DOMException('Stopped','AbortError'));
    const timer=setTimeout(()=>finish(reject,Error('Enhanced lighting took too long to prepare')),Math.max(1,ms));
    signal?.addEventListener('abort',abort,{once:true});
    if(signal?.aborted)abort();
    Promise.resolve(promise).then(value=>{if(done){try{onLate(value);}catch(error){console.warn(error);}}else finish(resolve,value);},error=>finish(reject,error));
  });
}

// The benchmark measures completed GPU work, including CPU geometry updates.
// Selection changes only the spectator renderer. Policy observations stay rasterized.
export async function createAdaptiveDisplay(view,spec,{getAsset,signal,onProgress=()=>{},onDecision=()=>{},mode='auto',
  storage,probe=probeGPU,loadCandidate=async()=>import('./spectator-pathtracer.js'),now=()=>performance.now(),waitGPU=waitForGPU,prepareTimeoutMs=2500,
}={}) {
  try{if(storage===undefined)storage=globalThis.localStorage;}catch{storage=null;}
  const gl=view.renderer.getContext(),canvas=view.renderer.domElement;
  const key=deviceKey(gl,canvas.width,canvas.height);
  let candidate=null,disposed=false,pending=false,queued=false,slowFrames=0,selected='rasterized';
  function announce(mode,reason,extra={}){selected=mode;onDecision({mode,reason,...extra});}
  function fallback(reason,extra={}){
    const wasRunning=selected==='ray-traced';
    view.setDisplay(null);candidate?.dispose();candidate=null;
    if(!disposed){writeDecision(storage,key,'rasterized',reason);announce('rasterized',reason,extra);if(!wasRunning)onProgress('Starting the demo','Using rasterized rendering for smooth playback');view.render();}
  }
  const controller={
    get mode(){return selected;},
    dispose(){disposed=true;view.setDisplay(null);candidate?.dispose();candidate=null;},
  };
  if(mode==='raster'){announce('rasterized','Rasterization selected');return controller;}
  const cached=mode==='auto'?readDecision(storage,key):null;
  if(cached?.mode==='rasterized'){
    announce('rasterized',cached.reason,{cached:true});
    onProgress('Starting the demo','Using saved graphics settings');return controller;
  }
  onProgress('Checking graphics performance','Choosing a smooth rendering mode');
  let result;
  try{result=await probe({signal});}catch(error){result={eligible:false,reason:'Graphics check unavailable'};}
  if(signal?.aborted){controller.dispose();return controller;}
  if(!result.eligible){fallback(result.reason,{probe:result});return controller;}
  // A reload or GPU failure during initialization must not repeat expensive work.
  writeDecision(storage,key,'rasterized','Previous graphics check did not complete');
  onProgress('Preparing enhanced lighting','Checking the moving scene');
  const deadline=now()+prepareTimeoutMs;
  const requireTime=()=>{if(signal?.aborted)throw new DOMException('Stopped','AbortError');if(now()>deadline)throw Error('Enhanced lighting took too long to prepare');};
  try{
    const module=await bounded(loadCandidate(),deadline-now(),signal);requireTime();
    candidate=await bounded(module.createSpectatorPathTracer(view,spec,{getAsset,getOptionalAsset:async path=>{
      const request=new AbortController(),abort=()=>request.abort();
      signal?.addEventListener('abort',abort,{once:true});
      const timeout=setTimeout(abort,Math.max(1,Math.min(2000,deadline-now())));
      try{
        if(signal?.aborted)request.abort();
        const response=await fetch(path,{signal:request.signal});
        if(!response.ok)throw Error('Enhanced lighting assets unavailable');
        return new Uint8Array(await response.arrayBuffer());
      }finally{clearTimeout(timeout);signal?.removeEventListener('abort',abort);}
    }}),deadline-now(),signal,late=>late.dispose());requireTime();
    candidate.render();
    while(candidate.compiling){requireTime();await new Promise(resolve=>setTimeout(resolve,16));}
    requireTime();candidate.render();await waitGPU(gl,{signal});requireTime();
    if(candidate.samples<RT_FAST.samplesPerFrame)throw Error('Enhanced lighting did not reach its quality target');
    const frames=[];
    for(let i=1;i<=4;i++){
      requireTime();candidate.markDirty();const t=now();candidate.render(i*.001);
      await waitGPU(gl,{signal});frames.push(now()-t);
    }
    if(!acceptsScene(frames)) {fallback('Moving scene exceeded its rendering budget',{frames,probe:result});return controller;}
    candidate.markDirty();
    view.setDisplay({
      markDirty(){candidate?.markDirty();},
      render(){
        if(disposed||!candidate)return;
        if(pending){queued=true;return;}
        const t=now();pending=true;
        try{candidate.render();}catch(error){pending=false;fallback('Enhanced lighting failed');return;}
        waitGPU(gl,{timeoutMs:120,signal}).then(()=>{
          if(disposed||!candidate)return;
          const elapsed=now()-t;slowFrames=elapsed>LIMITS.sceneP95Ms?slowFrames+1:0;
          if(slowFrames>=3)fallback('Rendering slowed down during playback');
        }).catch(()=>{if(!disposed)fallback('Graphics work exceeded its time budget');}).finally(()=>{pending=false;if(queued&&!disposed&&candidate){queued=false;view.render();}});
      },
    });
    writeDecision(storage,key,'ray-traced','Moving scene passed');
    announce('ray-traced','Moving scene passed',{frames,probe:result,cached:!!cached});
    onProgress('Starting the demo','GPU ray tracing enabled');
    view.render();
  }catch(error){if(signal?.aborted)controller.dispose();else fallback(error.message||'Enhanced lighting unavailable',{probe:result});}
  return controller;
}
