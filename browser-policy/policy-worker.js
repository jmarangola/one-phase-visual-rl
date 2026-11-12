import { createPolicy } from './policy.js';
let policy;
self.addEventListener('message',async(event)=>{
  const message=event.data;
  try {
    if(message.type==='init') {
      policy=await createPolicy(message.graph,{externalData:message.externalData,wasmBinary:message.wasmBinary,
        backend:message.backend||'auto',cpuThreads:message.cpuThreads??'auto',onProgress:progress=>self.postMessage({type:'progress',progress})});
      self.postMessage({type:'ready',backend:policy.backend,threads:policy.threads,capabilities:policy.capabilities});
    } else if(message.type==='infer') {
      if(!policy)throw new Error('Policy has not initialized');
      const action=await policy.infer(message.rgb,message.proprio);
      const copy=Float32Array.from(action);
      self.postMessage({type:'result',id:message.id,action:copy,inferenceMs:policy.lastInferenceMs,backend:policy.backend,threads:policy.threads},[copy.buffer]);
    } else if(message.type==='reset') policy?.reset();
    else if(message.type==='dispose') { await policy?.dispose();self.close(); }
  } catch(error) {
    const failure={type:'error',phase:message.type==='init'?'initialize':'inference',id:message.id,message:String(error?.message||error),stack:error?.stack};
    // ORT cannot reinitialize a failed thread pool in this worker. Return ownership
    // of original bytes for a fresh worker instead of keeping a second weight copy.
    if(message.type==='init'&&message.cpuThreads>1) {
      const retryAssets={graph:message.graph,externalData:message.externalData,wasmBinary:message.wasmBinary};
      const buffers=[retryAssets.graph.buffer,retryAssets.wasmBinary.buffer,...retryAssets.externalData.map(file=>file.data.buffer)];
      try {self.postMessage({...failure,retryAssets},[...new Set(buffers)]);return;}catch{}
    }
    self.postMessage(failure);
  }
});
