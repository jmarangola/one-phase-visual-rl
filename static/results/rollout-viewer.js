(() => {
  const root=document.getElementById('transfer-rollouts');if(!root)return;
  const tabs=root.querySelector('[data-tasks]'),panels=root.querySelector('[data-panels]');
  const mode=root.querySelector('[data-mode]'),toggle=root.querySelector('[data-play]');
  let catalog,task,players=[],playing=true,inView=false;
  const el=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;};
  const safePlay=v=>{if(playing&&inView&&!document.hidden)v.play().catch(()=>{});};
  function setPlayback(){toggle.textContent=playing?'Ⅱ Pause':'▶ Play';toggle.setAttribute('aria-label',playing?'Pause rollout videos':'Play rollout videos');players.forEach(p=>playing&&inView&&!document.hidden&&!p.fastFinished?safePlay(p.video):p.video.pause());}
  function choose(p,index,autoplay=true){
    if(!p.episodes.length)return;
    p.fastFinished=false;
    p.index=(index+p.episodes.length)%p.episodes.length;const e=p.episodes[p.index];
    p.video.src=e.src;p.video.playbackRate=1;p.video.load();
    p.status.textContent=`Episode ${e.id} · ${e.outcome==='success'?'Success':'Failure'} · ${e.duration.toFixed(2)} s`;
    p.status.dataset.outcome=e.outcome;
    [...p.strip.children].forEach((b,i)=>b.setAttribute('aria-pressed',String(i===p.index)));
    p.select.value=String(p.index);if(autoplay)safePlay(p.video);
  }
  function build(startAt={}){
    players.forEach(p=>{p.video.pause();p.video.removeAttribute('src');p.video.load();});players=[];panels.replaceChildren();
    tabs.querySelectorAll('button').forEach(b=>b.setAttribute('aria-selected',String(b.dataset.task===task.id)));
    task.policies.forEach(policy=>{
      const episodes=mode.value==='fast'?policy.episodes.filter(e=>e.outcome==='success').slice(0,3):mode.value==='failure'?policy.episodes.filter(e=>e.outcome!=='success'):policy.episodes;
      const card=el('section','rollout-card '+policy.id),head=el('div','rollout-card-head');
      head.append(el('h3','',policy.name),el('span','rollout-score',`${policy.successes}/${policy.total} successes`));
      const stage=el('div','rollout-stage'),video=el('video');video.muted=true;video.defaultMuted=true;video.playsInline=true;video.preload='metadata';video.controls=true;video.setAttribute('aria-label',`${task.name} — ${policy.name} real-world rollout`);
      const speed=el('span','rollout-speed','1× speed');
      video.addEventListener('ratechange',()=>{speed.textContent=`${video.playbackRate}× speed`;});
      stage.append(video,speed);
      const status=el('p','rollout-status'),nav=el('div','rollout-nav'),prev=el('button','','‹'),next=el('button','','›'),select=el('select');
      prev.type=next.type='button';prev.setAttribute('aria-label',`Previous ${policy.name} episode`);next.setAttribute('aria-label',`Next ${policy.name} episode`);select.setAttribute('aria-label',`${policy.name} episode`);
      const strip=el('div','rollout-episodes');strip.setAttribute('aria-label',`${policy.name} episodes`);
      const p={video,episodes,index:0,status,strip,select,policyId:policy.id,watched:new Set(),fastFinished:false};players.push(p);
      episodes.forEach((e,i)=>{
        const option=el('option','',`Episode ${e.id} · ${e.outcome==='success'?'Success':'Failure'}`);option.value=i;select.append(option);
        const b=el('button','episode-chip',String(e.id));b.type='button';b.dataset.outcome=e.outcome;b.title=`Episode ${e.id} · ${e.outcome} · ${e.duration.toFixed(2)} s`;b.setAttribute('aria-label',b.title);b.addEventListener('click',()=>choose(p,i));strip.append(b);
      });
      prev.addEventListener('click',()=>choose(p,p.index-1));next.addEventListener('click',()=>choose(p,p.index+1));select.addEventListener('change',()=>choose(p,Number(select.value)));
      video.addEventListener('ended',()=>{
        if(!playing||!players.includes(p))return;
        if(mode.value==='fast'){
          p.watched.add(p.index);
          if(p.watched.size===p.episodes.length){
            p.fastFinished=true;
            // Hold the final frame until both methods finish their fast introduction.
            if(players.every(other=>other.fastFinished||!other.episodes.length)){
              const next=Object.fromEntries(players.map(other=>[other.policyId,other.episodes.length]));
              mode.value='all';build(next);
            }
            return;
          }
        }
        choose(p,p.index+1);
      });
      video.addEventListener('error',()=>{status.textContent='Recording could not load. Select an episode to retry.';});
      nav.append(prev,select,next);card.append(head,stage,status,nav,strip);panels.append(card);
      if(episodes.length)choose(p,startAt[policy.id]??0);else {stage.replaceChildren(el('p','rollout-empty','No failures in these evaluated trials.'));status.textContent=`${policy.total}/${policy.total} successful trials`;nav.hidden=true;}
    });
    root.querySelector('[data-order]').textContent=mode.value==='fast'?'Three fast successes, then all episodes automatically.':mode.value==='all'?'All evaluated trials · successes ordered by duration, then failures.':'All recorded failures.';
  }
  toggle.addEventListener('click',()=>{playing=!playing;setPlayback();});mode.addEventListener('change',build);
  document.addEventListener('visibilitychange',setPlayback);
  new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;setPlayback();},{threshold:.12}).observe(root);
  fetch('static/rollouts/catalog.json?v=1').then(r=>{if(!r.ok)throw Error('catalog');return r.json();}).then(data=>{
    catalog=data;task=data.tasks[0];tabs.setAttribute('role','tablist');tabs.setAttribute('aria-label','Rollout task');
    data.tasks.forEach(t=>{const b=el('button','',t.name);b.type='button';b.setAttribute('role','tab');b.dataset.task=t.id;b.addEventListener('click',()=>{task=t;build();});tabs.append(b);});build();
  }).catch(()=>{panels.textContent='The rollout recordings could not load. Please reload the page.';});
})();
