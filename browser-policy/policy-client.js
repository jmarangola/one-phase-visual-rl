import {detectThreadCapabilities,selectCPUThreads} from './thread-capabilities.js';

/** Keep CPU inference off the UI thread, including on mobile browsers. */
export async function createPolicyWorker(graph,externalData,wasmBinary,{onProgress,backend='auto',cpuThreads='auto',reloadAssets}={}) {
  const capabilities=detectThreadCapabilities(),initialThreads=selectCPUThreads(capabilities,cpuThreads);
  let assets={graph,externalData,wasmBinary};
  // Only buffer sizes are retained for recovery checks; transferred model bytes have one owner.
  const sizes={graph:graph.byteLength,wasmBinary:wasmBinary.byteLength,externalData:externalData.map(file=>({path:file.path,bytes:file.data.byteLength}))};
  const usable=value=>value?.graph?.byteLength===sizes.graph&&value?.wasmBinary?.byteLength===sizes.wasmBinary&&value.externalData?.length===sizes.externalData.length&&sizes.externalData.every((file,i)=>value.externalData[i]?.path===file.path&&value.externalData[i]?.data?.byteLength===file.bytes);
  async function initialize(bytes,threads,fallbackReason=null){
    const worker=new Worker(new URL('./policy-worker.js',import.meta.url),{type:'module'});
    const pending=new Map();let nextId=1,lastInferenceMs=0,selectedBackend,selectedThreads=threads,workerCapabilities=capabilities,closedError=null;
    let readyResolve,readyReject;
    const ready=new Promise((resolve,reject)=>{readyResolve=resolve;readyReject=reject;});
    const fail=error=>{
      if(closedError)return;
      closedError=error instanceof Error?error:new Error(String(error));
      worker.terminate();readyReject(closedError);
      for(const {reject}of pending.values())reject(closedError);
      pending.clear();
    };
    worker.addEventListener('error',event=>{event.preventDefault?.();fail(new Error(event.message||'The policy worker stopped'));});
    worker.addEventListener('messageerror',()=>fail(new Error('The policy worker could not read a message')));
    worker.addEventListener('message',event=>{
      if(closedError)return;
      const message=event.data;
      if(message.type==='ready'){
        selectedBackend=message.backend;selectedThreads=message.threads??threads;workerCapabilities=message.capabilities??capabilities;readyResolve();
      }else if(message.type==='progress')onProgress?.(message.progress);
      else if(message.type==='error'){
        const error=new Error(message.message);
        if(message.phase==='initialize'&&usable(message.retryAssets))error.retryAssets=message.retryAssets;
        fail(error);
      }else if(message.type==='result'){
        selectedBackend=message.backend;selectedThreads=message.threads??selectedThreads;lastInferenceMs=message.inferenceMs;
        const request=pending.get(message.id);pending.delete(message.id);request?.resolve(message.action);
      }
    });
    const transfer=[bytes.graph.buffer,bytes.wasmBinary.buffer,...bytes.externalData.map(file=>file.data.buffer)];
    try{worker.postMessage({type:'init',...bytes,backend,cpuThreads:threads},[...new Set(transfer)]);}catch(error){fail(error);}
    await ready;
    return {
      get backend(){return selectedBackend;},get threads(){return selectedThreads;},get lastInferenceMs(){return lastInferenceMs;},
      get capabilities(){return {...workerCapabilities,selectedThreads,initialThreads,fallbackUsed:!!fallbackReason,fallbackReason};},
      infer(rgb,proprio){
        if(closedError)return Promise.reject(closedError);
        const id=nextId++,pixels=rgb.slice(),joints=proprio.slice();
        return new Promise((resolve,reject)=>{
          pending.set(id,{resolve,reject});
          try{worker.postMessage({type:'infer',id,rgb:pixels,proprio:joints},[pixels.buffer,joints.buffer]);}catch(error){fail(error);}
        });
      },
      reset(){if(!closedError){try{worker.postMessage({type:'reset'});}catch(error){fail(error);throw error;}}},
      dispose(){fail(new Error('Policy closed'));},
    };
  }
  try{
    return await initialize(assets,initialThreads);
  }catch(error){
    if(initialThreads===1)throw error;
    const reason=String(error?.message||error);
    onProgress?.({stage:'fallback',threads:1,capabilities,message:'Retrying policy initialization with one CPU thread'});
    // Caught init errors return transferred buffers. A hard crash needs a verified
    // cache/network reload, supplied by the caller; never retry detached arrays.
    const returned=error.retryAssets;delete error.retryAssets;
    assets=usable(returned)?returned:usable(assets)?assets:reloadAssets?await reloadAssets():null;
    if(!usable(assets))throw new Error(`Policy initialization failed (${reason}). Reload the page to retry with one CPU thread.`);
    return await initialize(assets,1,reason);
  }finally{
    assets=null;graph=null;externalData=null;wasmBinary=null;
  }
}
