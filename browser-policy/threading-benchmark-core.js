
const runtimeBase=new URL('./vendor/ort/',import.meta.url),modelBase=new URL('./assets/policy/',import.meta.url);
const readJSON=async(read,url)=>JSON.parse(new TextDecoder().decode(await read(url)));
const percentile=(values,p)=>{const sorted=[...values].sort((a,b)=>a-b);return sorted[Math.min(sorted.length-1,Math.ceil(p*sorted.length)-1)];};
export async function runThreadingBenchmark({threads=1,warmup=10,iterations=20,onProgress=()=>{},readBytes,runtime}={}){
  const ort=runtime||await import('./vendor/ort/ort.webgpu.mjs');
  const read=readBytes||(async(url)=>{const response=await fetch(url,{cache:'force-cache'});if(!response.ok)throw Error(`${response.status}: ${url}`);return new Uint8Array(await response.arrayBuffer());});
  if(![1,2,4,8].includes(threads))throw Error('Expected threads=1,2,4,8');
  const isNode=!!globalThis.process?.versions?.node;
  if(threads>1&&!isNode&&(!globalThis.crossOriginIsolated||typeof SharedArrayBuffer==='undefined'))throw Error('Threads require cross-origin isolation and SharedArrayBuffer. Open the COOP/COEP benchmark server on localhost:8769.');
  onProgress({stage:'loading',threads});
  const [manifest,runtimeManifest,reference,rgb]=await Promise.all([
    readJSON(read,new URL('manifest.json',modelBase)),readJSON(read,new URL('runtime-manifest.json',runtimeBase)),
    readJSON(read,new URL('./threading-data/recorded-inputs.json',import.meta.url)),read(new URL('./threading-data/recorded-inputs.rgb',import.meta.url)),
  ]);
  const graph=await read(new URL(manifest.model,modelBase));
  const externalData=await Promise.all(manifest.external_data.map(async path=>({path,data:await read(new URL(path,modelBase))})));
  const wasmBinary=new Uint8Array(runtimeManifest.wasm_bytes);let offset=0;
  for(const chunk of runtimeManifest.assets){const bytes=await read(new URL(chunk.path,runtimeBase));wasmBinary.set(bytes,offset);offset+=bytes.byteLength;}
  ort.env.logLevel='warning';ort.env.wasm.numThreads=threads;ort.env.wasm.proxy=false;
  ort.env.wasm.wasmPaths={mjs:new URL('ort-wasm-simd-threaded.asyncify.mjs',runtimeBase).href};
  ort.env.wasm.wasmBinary=wasmBinary;
  const initialized=performance.now();
  onProgress({stage:'initializing',threads});
  const session=await ort.InferenceSession.create(graph,{executionProviders:['wasm'],externalData,graphOptimizationLevel:'all'});
  const initializeMs=performance.now()-initialized,timings=[],warmupTimings=[];let maxActionError=0,maxMeanError=0;
  const measuredActions=[];
  try{
    for(let i=0;i<warmup+iterations;i++){
      const sample=i%reference.proprio.length,inputs={rgb:new ort.Tensor('uint8',rgb.subarray(sample*224*224*3,(sample+1)*224*224*3),[1,224,224,3]),proprio:new ort.Tensor('float32',new Float32Array(reference.proprio[sample]),[1,14])};
      let outputs;const start=performance.now();
      try{
        outputs=await session.run(inputs);const elapsed=performance.now()-start;
        (i<warmup?warmupTimings:timings).push(elapsed);
        const action=Array.from(outputs.action.data),mean=Array.from(outputs.action_mean.data);
        for(let j=0;j<8;j++){maxActionError=Math.max(maxActionError,Math.abs(action[j]-reference.action[sample][j]));maxMeanError=Math.max(maxMeanError,Math.abs(mean[j]-reference.action_mean[sample][j]));}
        if(i>=warmup)measuredActions.push({sample,action});
        onProgress({stage:i<warmup?'warmup':'timing',threads,completed:i+1,total:warmup+iterations,lastMs:elapsed});
      }finally{for(const tensor of Object.values(outputs||{}))tensor.dispose();for(const tensor of Object.values(inputs))tensor.dispose();}
    }
  }finally{await session.release();}
  return{runtime:'Actual ONNX Runtime Web 1.31.1 SIMD/threads WASM; exact exported float32 DINOv3 + actor',environment:isNode?'Node worker_threads':'browser module worker',threadsRequested:threads,threadsConfigured:ort.env.wasm.numThreads,crossOriginIsolated:globalThis.crossOriginIsolated??null,hardwareConcurrency:globalThis.navigator?.hardwareConcurrency??null,warmup,iterations,samples:reference.proprio.length,initializeMs,warmupTimingsMs:warmupTimings,timingsMs:timings,medianMs:percentile(timings,.5),p90Ms:percentile(timings,.9),meanMs:timings.reduce((a,b)=>a+b,0)/timings.length,minMs:Math.min(...timings),maxMs:Math.max(...timings),maxActionError,maxMeanError,parityPassed:maxActionError<1e-3&&maxMeanError<1e-3,actions:measuredActions,memory:isNode?process.memoryUsage():null};
}
