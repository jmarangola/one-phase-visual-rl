import {runThreadingBenchmark} from './threading-benchmark-core.js';
self.onmessage=async({data})=>{try{const result=await runThreadingBenchmark({...data,onProgress:progress=>self.postMessage({type:'progress',progress})});self.postMessage({type:'result',result});}catch(error){self.postMessage({type:'error',message:error.message,stack:error.stack});}};
