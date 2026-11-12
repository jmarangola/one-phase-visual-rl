import {ensureIsolation} from '../../browser-policy/isolation.js';
(async () => {
  const frame=document.getElementById('robustness-demo');
  if(!frame)return;
  addEventListener('message',event=>{
    if(event.origin!==location.origin||event.source!==frame.contentWindow)return;
    if(event.data?.type==='one-phase-demo-resize'&&Number.isFinite(event.data.height))frame.style.height=`${Math.ceil(Math.max(240,Math.min(1600,event.data.height)))}px`;
  });
  if(await ensureIsolation({workerURL:new URL('../../isolation-sw.js',import.meta.url)}))return;
  frame.src=frame.dataset.src||'browser-policy/';
})();
