(() => {
  'use strict';
  const D = window.RESEARCH_RESULTS;
  const $ = id => document.getElementById(id);
  if (!D || !$('transfer-vertical-figure')) return;
  const colors = ['#2a78d6', '#8c7b6f', '#b6bac2'];
  const names = ['Direct RL', 'Distillation'];
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  function node(tag, cls, text) { const n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; }
  function bar(label, value, color, reference = null, sem = null) {
    const row = node('div', 'result-row'); row.style.setProperty('--bar-color', color);
    row.append(node('span', 'result-row-label', label));
    const track = node('div', 'result-track'), fill = node('div', 'result-fill');
    fill.style.width = value + '%'; track.append(fill);
    if (reference != null) { const tick = node('i', 'result-ref'); tick.style.left = reference + '%'; tick.title = 'Simulation / in-distribution reference: ' + reference.toFixed(1) + '%'; track.append(tick); }
    if (sem != null) { const error = node('i', 'result-whisker'); error.style.left = Math.max(0, value - sem) + '%'; error.style.width = (Math.min(100, value + sem) - Math.max(0, value - sem)) + '%'; track.append(error); }
    row.append(track, node('span', 'result-value', value.toFixed(1) + '%'));
    row.title = label + ': ' + value.toFixed(1) + '%' + (sem == null ? '' : ', SEM ' + sem.toFixed(2) + ' percentage points');
    return row;
  }
  const verticalBars = [], verticalRows = [];
  let verticalRaf = 0, verticalElapsed = 0;
  const verticalDuration = 4800;
  const verticalFigure = $('transfer-vertical-figure');
  const simHeading = verticalFigure.querySelector('.vertical-heading-sim');
  const realHeading = verticalFigure.querySelector('.vertical-heading-real');
  D.transfer.forEach(task => {
    const row = node('div', 'vertical-task');
    row.append(node('h3', 'vertical-task-name', task.task));
    const axis = node('div', 'vertical-axis');
    axis.append(node('div', 'vertical-axis-title', 'Success Rate'));
    [0, 50, 100].forEach(value => { const tick = node('span', '', value + '%'); tick.style.bottom = value + '%'; axis.append(tick); });
    row.append(axis);
    const plots = [];
    ['sim', 'real'].forEach(domain => {
      const plot = node('div', 'vertical-plot vertical-' + domain);
      const axes = node('div', 'vertical-chart-axes'); axes.setAttribute('aria-hidden', 'true');
      [50, 100].forEach(value => { const line = node('i', 'vertical-reference'); line.style.bottom = value + '%'; axes.append(line); });
      plot.append(axes);
      names.forEach((name, j) => {
        const slot = node('div', 'vertical-slot');
        const bar = node('div', 'vertical-bar'); bar.style.setProperty('--bar-color', colors[j]);
        const value = task[domain][j];
        const label = node('span', 'vertical-value', value.toFixed(1) + '%');
        const method = node('span', 'vertical-method', name);
        slot.setAttribute('role', 'img');
        slot.setAttribute('aria-label', `${task.task}, ${domain === 'sim' ? 'Simulation' : 'Real world'}, ${name}: ${value.toFixed(1)}% success`);
        slot.append(bar, label, method); plot.append(slot);
        verticalBars.push({bar, label, method, value, simValue: task.sim[j], domain});
      });
      row.append(plot); plots.push(plot);
    });
    $('vertical-transfer-rows').append(row);
    verticalRows.push({axis, sim: plots[0], real: plots[1], shift: 0});
  });
  const unit = t => Math.max(0, Math.min(1, t));
  const smooth = t => { t = unit(t); return t * t * (3 - 2 * t); };
  let headingShift = 0;
  function drawVertical(elapsed) {
    verticalElapsed = elapsed;
    const grow = smooth(elapsed / 700);
    const ghost = smooth((elapsed - 1300) / 400);
    const morph = smooth((elapsed - 1700) / 1200);
    const split = smooth((elapsed - 3250) / 1000);
    verticalFigure.style.setProperty('--axes-opacity', smooth((elapsed - 4400) / 400));
    verticalFigure.dataset.phase = elapsed < 1300 ? 'simulation' : elapsed < 1700 ? 'overlay' : elapsed < 3250 ? 'transfer' : elapsed < 4250 ? 'separate' : elapsed < verticalDuration ? 'axes' : 'complete';
    verticalRows.forEach(({axis, sim, real, shift}) => {
      const dx = shift * (1 - split);
      sim.style.transform = axis.style.transform = `translateX(${dx}px)`;
      real.style.transform = `translateX(${-dx}px)`;
      real.style.opacity = ghost;
    });
    simHeading.style.transform = `translateX(${headingShift * (1 - split)}px)`;
    realHeading.style.transform = `translateX(${-headingShift * (1 - split)}px)`;
    simHeading.style.opacity = 1 - ghost * (1 - split);
    realHeading.style.opacity = ghost;
    verticalBars.forEach(({bar, label, method, value, simValue, domain}) => {
      const isSim = domain === 'sim';
      const height = isSim ? value * grow : simValue + (value - simValue) * morph;
      bar.style.height = height + '%'; label.style.bottom = height + '%';
      label.textContent = height.toFixed(1) + '%';
      bar.style.opacity = isSim ? 1 - .82 * ghost * (1 - split) : .65 + .35 * split;
      label.style.opacity = isSim ? (grow > 0 ? 1 - ghost * (1 - split) : 0) : 1;
      method.style.opacity = isSim ? 1 : split;
    });
  }
  function measureVertical() {
    const layoutLeft = el => el.getBoundingClientRect().left - new DOMMatrixReadOnly(getComputedStyle(el).transform).m41;
    verticalRows.forEach(row => { row.shift = (layoutLeft(row.real) - layoutLeft(row.sim)) / 2; });
    headingShift = (layoutLeft(realHeading) - layoutLeft(simHeading)) / 2;
    drawVertical(verticalElapsed);
  }
  function replayVertical() {
    cancelAnimationFrame(verticalRaf);
    if (motion.matches) { drawVertical(verticalDuration); return; }
    measureVertical(); drawVertical(0);
    const start = performance.now();
    function frame(now) {
      const elapsed = now - start;
      drawVertical(elapsed);
      if (elapsed < verticalDuration && !document.hidden) verticalRaf = requestAnimationFrame(frame);
      else drawVertical(verticalDuration);
    }
    verticalRaf = requestAnimationFrame(frame);
  }
  $('vertical-transfer-replay').onclick = replayVertical;
  verticalElapsed = motion.matches ? verticalDuration : 0;
  measureVertical();
  new ResizeObserver(measureVertical).observe(verticalFigure);
  const verticalObserver = new IntersectionObserver(entries => {
    if (entries.some(e => e.isIntersecting)) { replayVertical(); verticalObserver.disconnect(); }
  }, {threshold: .2});
  verticalObserver.observe(verticalFigure);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { cancelAnimationFrame(verticalRaf); drawVertical(verticalDuration); }
  });

  let task = new URLSearchParams(location.search).get('goal') === 'peg' ? 'peg' : 'pusht', training = 1, outward = 0, raf = 0;
  const canvases = [$('goal-map-rl'), $('goal-map-dagger')];
  const clamp = n => Math.max(0, Math.min(1, n));
  const map = () => task === 'peg' && $('peg-grid-density').value === 'paper' ? D.maps.peg.paperVariant : D.maps[task];
  const green = value => { const t = clamp(value / 100); return `rgb(${244-220*t},${250-119*t},${246-169*t})`; };
  function progress(cell) {
    const m = map(), radius = Math.max(Math.abs(cell.x), Math.abs(cell.y));
    if (radius <= m.trainHalfCm) return training;
    if (outward >= 1) return 1;
    const delay = (radius - m.trainHalfCm) / (m.xs.at(-1) - m.trainHalfCm) * .65;
    return clamp((outward - delay) / .35);
  }
  function drawMaps() {
    const m = map();
    canvases.forEach((canvas, index) => {
      const w = canvas.clientWidth; if (!w) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2); canvas.width = Math.round(w * dpr); canvas.height = Math.round(w * dpr);
      const c = canvas.getContext('2d'); c.scale(dpr, dpr);
      const left = 36, top = 12, size = w - 50, cellSize = size / m.xs.length;
      const x = v => left + (m.xs.indexOf(v)+.5)*cellSize, y = v => top + (m.ys.length-.5-m.ys.indexOf(v))*cellSize;
      const gap = m.displayMode === 'sampled' ? cellSize*.06 : 1;
      for (const cell of m.cells) {
        const p = progress(cell), value = cell.methods[index].percent * p;
        c.fillStyle = p > 0 ? green(value) : '#eef0f2';
        c.fillRect(x(cell.x)-cellSize/2+gap/2, y(cell.y)-cellSize/2+gap/2, cellSize-gap, cellSize-gap);
        if (p > 0 && cellSize >= 22) {
          c.fillStyle = value > 57 ? '#fff' : '#173c29'; c.font = `${m.displayMode === 'sampled' ? '600 ' : ''}${Math.min(m.displayMode === 'sampled' ? 22 : 12, cellSize*.36)}px Inter, sans-serif`; c.textAlign = 'center'; c.textBaseline = 'middle';
          c.fillText(Math.round(value), x(cell.x), y(cell.y));
        }
      }
      const idX = m.xs.filter(v=>Math.abs(v)<=m.trainHalfCm), idY = m.ys.filter(v=>Math.abs(v)<=m.trainHalfCm);
      c.strokeStyle = '#101820'; c.lineWidth = 2.5;
      c.strokeRect(x(idX[0])-cellSize/2, y(idY.at(-1))-cellSize/2, idX.length*cellSize, idY.length*cellSize);
      c.fillStyle = '#737982'; c.font = '11px Inter, sans-serif'; c.textAlign = 'center'; c.textBaseline = 'top';
      for (const tick of (m.displayMode === 'sampled' ? m.xs : [m.xs[0],0,m.xs.at(-1)])) c.fillText(tick, x(tick), top+size+5);
      c.textAlign = 'right'; c.textBaseline = 'middle';
      for (const tick of (m.displayMode === 'sampled' ? m.ys : [m.ys[0],0,m.ys.at(-1)])) c.fillText(tick, left-7, y(tick));
      c.textAlign = 'center'; c.fillText('Goal X offset (cm)', left+size/2, w-6);
      c.save(); c.translate(8, top+size/2); c.rotate(-Math.PI/2); c.fillText('Goal y offset (cm)', 0, 0); c.restore();
      canvas.setAttribute('aria-label', `${index ? 'Distillation' : 'Direct RL'} success map, ${m.xs.length} by ${m.ys.length} ${m.displayMode === 'sampled' ? 'selected evaluation cells' : 'cells'}, black outline marks displayed positions within the training range. Numbers show success percentages.`);
    });
  }
  function stopMap(mode) {
    cancelAnimationFrame(raf); training = 1; outward = mode === 'all' ? 1 : 0;
    drawMaps();
  }
  function replay() {
    cancelAnimationFrame(raf);
    if (motion.matches) { stopMap('all'); return; }
    const start = performance.now(); training = 1; outward = 0; drawMaps();
    function frame(now) {
      const elapsed = now - start; outward = clamp(elapsed/1600); drawMaps();
      if (elapsed < 1600 && !document.hidden) raf = requestAnimationFrame(frame); else stopMap('all');
    }
    raf = requestAnimationFrame(frame);
  }
  function setTask() {
    task = $('research-goal-task').value;
    describeMap();
    replay();
  }
  function describeMap() {
    $('peg-grid-control').hidden = task !== 'peg';
  }
  $('peg-grid-density').onchange = setTask;
  $('research-goal-task').onchange = setTask; $('goal-training').onclick = () => stopMap('training'); $('goal-all').onclick = () => stopMap('all'); $('goal-replay').onclick = replay;
  new ResizeObserver(drawMaps).observe($('goal-figure'));
  // Initialize without spending animation work above the fold.
  $('research-goal-task').value = task; describeMap();
  drawMaps();
  const observer = new IntersectionObserver(entries => { if (entries.some(e=>e.isIntersecting)) { replay(); observer.disconnect(); } }, {threshold:.2}); observer.observe($('goal-figure'));
  document.addEventListener('visibilitychange', () => { if(document.hidden) stopMap('all'); });

  // Four illustrative simulation loops paired with the paper's measured means.
  const robustnessFigure=$('robustness-summary'),robustnessMarks=[],shiftVideos=[];
  const illustrationSpecs=window.OOD_MEDIA||[];
  D.paperRobustness.categories.forEach((category,index)=>{
    const spec=illustrationSpecs[index],panel=node('section','shift-card');
    panel.setAttribute('aria-label',category.name);
    panel.append(node('h3','shift-card-title',category.name));
    const phase=node('div','shift-phase','Training Distribution');
    panel.append(phase);
    const frame=node('div','shift-animation'),video=node('video','shift-video');
    video.muted=true;video.defaultMuted=true;video.loop=true;video.playsInline=true;video.preload='none';
    video.setAttribute('aria-label',spec.alt);video.poster='static/results/ood/'+spec.key+'-poster.jpg';
    video.dataset.src='static/results/ood/'+spec.key+'.mp4';
    frame.append(video);
    const badge=node('span','shift-video-badge',index===3?'No external force':'Simulation');frame.append(badge);panel.append(frame);
    const plot=node('div','shift-plot'),axis=node('div','shift-axis'),grid=node('div','shift-grid'),bars=node('div','shift-bars');
    [0,50,100].forEach(v=>{const tick=node('span','',v+'%'),line=node('i','');tick.style.bottom=v+'%';line.style.bottom=v+'%';axis.append(tick);grid.append(line);});
    category.values.forEach((value,j)=>{const slot=node('div','shift-bar-slot'),fill=node('div','shift-bar'),label=node('span','shift-bar-value');fill.style.background=colors[j];slot.append(fill,label);slot.setAttribute('aria-label',names[j]+': '+value+'% success');bars.append(slot);robustnessMarks.push({fill,label,value});});
    plot.append(axis,grid,bars);panel.append(plot,node('p','shift-card-detail',category.detail));$('robustness-panels').append(panel);
    shiftVideos.push({video,phase,badge,spec,index,frame});
  });
  function drawRobustness(p){robustnessMarks.forEach(({fill,label,value})=>{fill.style.height=value*p+'%';label.style.bottom=value*p+'%';label.textContent=Math.round(value*p)+'%';});}
  let shiftsInView=false,shiftsPaused=false,shiftsStarted=false,shiftsRaf=0,barsFinished=motion.matches;
  const pauseShifts=$('robustness-pause');
  function updateShiftLabels(){shiftVideos.forEach(({video,phase,badge,spec,index})=>{
    const t=video.currentTime,training=spec.trainingIntervals.some(([a,b])=>t>=a&&t<b);
    phase.textContent=training?'Training Distribution':'Out-of-distribution Evaluation';phase.classList.toggle('shift-phase-ood',!training);
    if(index===3)badge.textContent=training?'No external force':t<spec.forceEnd?'80 N · 0.2 s pulse':'After perturbation';
  });}
  function shiftTick(now){
    if(!shiftsInView||shiftsPaused||document.hidden||motion.matches)return;
    updateShiftLabels();
    if(!barsFinished){const p=Math.max(0,Math.min(1,(shiftVideos[0].video.currentTime-1.5)/1.1));drawRobustness(1-(1-p)**3);barsFinished=p===1;}
    shiftsRaf=requestAnimationFrame(shiftTick);
  }
  function stopShifts(){cancelAnimationFrame(shiftsRaf);shiftVideos.forEach(({video})=>video.pause());}
  function startShifts(){
    if(!shiftsInView||shiftsPaused||document.hidden||motion.matches)return;
    if(!shiftsStarted){shiftsStarted=true;}
    shiftVideos.forEach(({video})=>{if(!video.src)video.src=video.dataset.src;video.play().catch(error=>{if(error.name==='AbortError'||!shiftsInView||shiftsPaused||document.hidden)return;pauseShifts.hidden=false;pauseShifts.textContent='▶';pauseShifts.setAttribute('aria-label','Play illustrations');shiftsPaused=true;stopShifts();});});
    cancelAnimationFrame(shiftsRaf);shiftsRaf=requestAnimationFrame(shiftTick);
  }
  function replayRobustness(){stopShifts();barsFinished=motion.matches;shiftVideos.forEach(({video})=>{if(video.readyState)video.currentTime=0;});drawRobustness(motion.matches?1:0);updateShiftLabels();startShifts();}
  $('robustness-replay').onclick=replayRobustness;
  pauseShifts.onclick=()=>{shiftsPaused=!shiftsPaused;pauseShifts.textContent=shiftsPaused?'▶':'Ⅱ';pauseShifts.setAttribute('aria-label',shiftsPaused?'Play illustrations':'Pause illustrations');if(shiftsPaused)stopShifts();else startShifts();};
  drawRobustness(motion.matches?1:0);pauseShifts.hidden=motion.matches;
  new IntersectionObserver(entries=>{shiftsInView=entries.some(e=>e.isIntersecting);if(shiftsInView)startShifts();else stopShifts();},{threshold:.15}).observe(robustnessFigure);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stopShifts();else startShifts();});
  motion.addEventListener('change',()=>{pauseShifts.hidden=motion.matches;if(motion.matches){stopShifts();barsFinished=true;drawRobustness(1);}else startShifts();});

  // Bar length is throughput; subdivision is time allocation, as in the paper.
  const computeColors=['#92C5DE','#2C7BB6','#E08214'],computeMarks=[];
  D.compute.forEach((row,index)=>{
    const div=node('div','compute-row'),label=node('div','compute-label'),track=node('div','compute-track'),stack=node('div','compute-stack');
    const parts=row.label.split(' · ');label.append(node('strong','',parts[0]),node('span','',parts[1]));
    if(index===0)div.classList.add('compute-default');
    stack.style.width=row.relative/5*100+'%';
    row.shares.forEach((share,i)=>{const segment=node('span','');segment.style.width=share+'%';segment.style.background=computeColors[i];segment.append(node('b','',Math.round(share)+'%'));segment.title=['Simulation + rendering','Forward pass','Backpropagation'][i]+': '+share.toFixed(1)+'% of profiled training time';stack.append(segment);});
    const value=node('strong','compute-total',row.relative.toFixed(2)+'×');value.style.left=row.relative/5*100+'%';
    track.append(stack,value);div.append(label,track);$('compute-rows').append(div);computeMarks.push({stack,value,target:row.relative});
  });
  function fitComputeLabels(){document.querySelectorAll('.compute-stack span').forEach(s=>{s.querySelector('b').hidden=s.getBoundingClientRect().width<29;});}
  function drawCompute(progress){computeMarks.forEach(({stack,value,target},i)=>{const p=Array.isArray(progress)?progress[i]:progress;stack.style.width=target*p/5*100+'%';value.style.left=target*p/5*100+'%';value.textContent=(target*p).toFixed(2)+'×';value.style.opacity=p>0?'1':'0';});fitComputeLabels();}
  let computeRaf=0;
  function replayCompute(){cancelAnimationFrame(computeRaf);if(motion.matches){drawCompute(1);return;}drawCompute(0);const start=performance.now();function frame(now){const t=now-start;drawCompute(computeMarks.map((_,i)=>{const p=Math.max(0,Math.min(1,(t-i*100)/1200));return 1-(1-p)**3;}));if(t<1400&&!document.hidden)computeRaf=requestAnimationFrame(frame);else drawCompute(1);}computeRaf=requestAnimationFrame(frame);}
  $('compute-replay').onclick=replayCompute;drawCompute(motion.matches?1:0);
  const computeObserver=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){replayCompute();computeObserver.disconnect();}},{threshold:.3});computeObserver.observe($('compute-figure'));
  new ResizeObserver(fitComputeLabels).observe($('compute-rows'));
  document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(computeRaf);drawCompute(1);}});

  // Seven encoders displayed in the paper; real-world evaluated models first.
  const encoderFigure=$('encoder-figure'),encoderRows=$('encoder-comparison');
  const familyColors={DINOv3:'#A8D5A2',SigLIP2:'#2D8155',ImageNet:'#E6CD4A'},encoderMarks=[];
  D.paperEncoders.forEach(e=>{
    const row=node('div','encoder-row');if(e.id==='dinov3_vits16')row.classList.add('encoder-ours');
    const label=node('div','encoder-name');label.append(node('strong','',e.label),node('span','',`${e.family==='ImageNet'?'ImageNet-1K':e.family} · ${e.parameters}M`));row.append(label);
    ['sim','real'].forEach(domain=>{
      const track=node('div','encoder-track');
      if(e[domain]==null){track.append(node('span','encoder-unreported','—'));track.setAttribute('aria-label','Real-world result not reported');}
      else {const fill=node('div','encoder-fill'+(e.architecture==='CNN'?' encoder-cnn':'')),value=node('span','encoder-value');fill.style.backgroundColor=familyColors[e.family];track.append(fill,value);track.setAttribute('aria-label',`${e.label}, ${domain==='sim'?'simulation':'real world'}: ${e[domain].toFixed(1)}%`);if(e[domain]>=30){value.classList.add('encoder-value-inside');value.style.color=e.family==='SigLIP2'?'white':'#30343b';}encoderMarks.push({fill,value,domain,target:e[domain]});}
      row.append(track);
    });encoderRows.append(row);
  });
  function drawEncoders(sim,real){encoderMarks.forEach(m=>{const p=m.domain==='sim'?sim:real;m.fill.style.width=m.target*p+'%';m.value.style.left=(m.target>=30?m.target*p/2:m.target*p)+'%';m.value.textContent=(m.target*p).toFixed(1)+'%';m.value.style.opacity=p>0?'1':'0';});}
  let encoderRaf=0;
  function replayEncoders(){cancelAnimationFrame(encoderRaf);if(motion.matches){drawEncoders(1,1);return;}drawEncoders(0,0);const start=performance.now();function frame(now){const t=now-start,ease=v=>1-(1-Math.max(0,Math.min(1,v)))**3;drawEncoders(ease((t-650)/900),ease((t-1900)/900));if(t<3400&&!document.hidden)encoderRaf=requestAnimationFrame(frame);else{drawEncoders(1,1);}}encoderRaf=requestAnimationFrame(frame);}
  $('encoder-replay').onclick=replayEncoders;drawEncoders(motion.matches?1:0,motion.matches?1:0);
  const encoderObserver=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){replayEncoders();encoderObserver.disconnect();}},{threshold:.25});encoderObserver.observe(encoderFigure);
  document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(encoderRaf);drawEncoders(1,1);}});
})();
