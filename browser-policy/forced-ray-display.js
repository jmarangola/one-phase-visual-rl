import {waitForGPU} from './graphics-selection.js';
import {RT_FAST} from './ray-presets.js';

// Explicit visual preview: no benchmark, cached decision, or speed fallback.
// Graphics errors are surfaced instead of silently showing rasterization.
export async function createForcedRayDisplay(view,spec,{getAsset,signal,onProgress=()=>{},onDecision=()=>{},onError=()=>{},onSamples=()=>{},
  loadCandidate=async()=>import('./spectator-pathtracer.js'),waitGPU=waitForGPU,
}={}){
  let candidate=null,disposed=false,pending=null,queued=false;
  const gl=view.renderer.getContext();
  const tick=()=>new Promise(resolve=>setTimeout(resolve,16));
  const check=()=>{if(signal?.aborted)throw new DOMException('Stopped','AbortError');};
  function dispose(){if(disposed)return;disposed=true;view.setDisplay(null);candidate?.dispose();candidate=null;}
  async function complete(){await waitGPU(gl,{timeoutMs:30000,signal});if(!disposed)onSamples(candidate.samples);}
  function request(refine=false){
    if(disposed)return Promise.resolve();
    if(pending){if(!refine)queued=true;return pending;}
    try{if(refine)candidate.refine();else candidate.render();}
    catch(error){dispose();onError(error);return Promise.resolve();}
    pending=complete().catch(error=>{if(!disposed){dispose();onError(error);}}).finally(()=>{
      pending=null;if(queued&&!disposed){queued=false;view.render();}
    });
    return pending;
  }
  try{
    onProgress('Preparing rt-fast preview','Loading the ray tracer');
    const module=await loadCandidate();check();
    candidate=await module.createSpectatorPathTracer(view,spec,{getAsset,getOptionalAsset:async path=>{
      const response=await fetch(path,{signal});if(!response.ok)throw Error('Ray-tracing assets unavailable');return new Uint8Array(await response.arrayBuffer());
    }});check();
    onProgress('Preparing rt-fast preview','Compiling the ray-tracing shaders');
    candidate.render();
    while(candidate.compiling){check();await tick();}
    check();candidate.render();await complete();
    if(candidate.samples<RT_FAST.samplesPerFrame)throw Error('The ray tracer did not produce its first image');
    view.setDisplay({markDirty(){candidate?.markDirty();},render(){request();}});
    onDecision({mode:'ray-traced',forced:true,preset:RT_FAST.id,samplesPerFrame:RT_FAST.samplesPerFrame,pathDepth:RT_FAST.pathDepth,denoiser:'spatial bilateral (not OptiX)'});
    return {dispose,async idle(){while(pending&&!disposed)await pending;},async refine(){await request(true);},get samples(){return candidate?.samples||0;}};
  }catch(error){dispose();throw error;}
}
