const query=new URLSearchParams(location.search),variants=(query.get('threads')||'1,2,4,8').split(',').map(Number),warmup=Number(query.get('warmup')||10),iterations=Number(query.get('iterations')||20),status=document.getElementById('status'),output=document.getElementById('results');
const report={source:'10 real recorded native SAPIEN observations, unmodified float32 checkpoint',userAgent:navigator.userAgent,crossOriginIsolated,hardwareConcurrency:navigator.hardwareConcurrency,results:[],errors:[],done:false};
window.__threadingBenchmark=report;
function show(){output.textContent=JSON.stringify(report,null,2);}
let currentWorker=null;addEventListener('pagehide',()=>currentWorker?.terminate());
show();
for(const threads of variants){
  try{
    const result=await new Promise((resolve,reject)=>{
      const worker=currentWorker=new Worker(new URL('./threading-benchmark-worker.js',import.meta.url),{type:'module'});
      const timeout=setTimeout(()=>{worker.terminate();reject(Error(`Benchmark exceeded 180 seconds (${threads} threads)`));},180000);
      const cleanup=()=>{clearTimeout(timeout);worker.terminate();currentWorker=null;};
      worker.onerror=event=>{cleanup();reject(Error(event.message));};
      worker.onmessage=({data})=>{if(data.type==='progress'){report.progress=data.progress;status.textContent=`${threads} threads · ${data.progress.stage} ${data.progress.completed||''}/${data.progress.total||''}`;show();}else if(data.type==='result'){cleanup();resolve(data.result);}else if(data.type==='error'){cleanup();reject(Error(data.message));}};
      worker.postMessage({threads,warmup,iterations});
    });
    report.results.push(result);show();
  }catch(error){report.errors.push({threads,error:String(error.stack||error)});show();}
}
report.done=true;delete report.progress;status.textContent='Benchmark complete';show();
const link=document.getElementById('download');link.href=URL.createObjectURL(new Blob([JSON.stringify(report,null,2)],{type:'application/json'}));link.hidden=false;
