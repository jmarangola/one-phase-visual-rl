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

  // One shared scale; values transcribed from the selected paper artifact.
  const robustnessFigure = $('robustness-summary'), robustnessMarks = [];
  const chart = $('robustness-chart'), axis = node('div','robustness-axis');
  axis.append(node('span','robustness-axis-title','Success rate'));
  [0,50,100].forEach(v=>{const t=node('span','robustness-tick',v+'%');t.style.bottom=v+'%';axis.append(t);});chart.append(axis);
  const grid = node('div','robustness-grid');
  [0,50,100].forEach(v=>{const l=node('i','');l.style.bottom=v+'%';grid.append(l);});chart.append(grid);
  const groups=node('div','robustness-groups'), labels=node('div','robustness-labels');
  D.paperRobustness.categories.forEach(category=>{
    const group=node('div','robustness-group');
    category.values.forEach((value,j)=>{
      const slot=node('div','robustness-slot'),fill=node('div','robustness-bar'),label=node('span','robustness-value');
      fill.style.background=colors[j];slot.append(fill,label);
      slot.setAttribute('aria-label',`${category.name}, ${names[j]}: ${value}% success`);
      robustnessMarks.push({fill,label,value});group.append(slot);
    });groups.append(group);
    const label=node('div','');label.append(node('strong','',category.name),node('span','',category.detail));labels.append(label);
  });chart.append(groups,labels);
  function drawRobustness(p){robustnessMarks.forEach(({fill,label,value})=>{fill.style.height=value*p+'%';label.style.bottom=value*p+'%';label.textContent=Math.round(value*p)+'%';});}
  let robustnessRaf=0;
  function replayRobustness(){cancelAnimationFrame(robustnessRaf);if(motion.matches){drawRobustness(1);return;}const start=performance.now();function frame(now){const p=Math.min(1,(now-start)/1100);drawRobustness(1-(1-p)**3);if(p<1&&!document.hidden)robustnessRaf=requestAnimationFrame(frame);}drawRobustness(0);robustnessRaf=requestAnimationFrame(frame);}
  $('robustness-replay').onclick=replayRobustness;drawRobustness(motion.matches?1:0);
  const robustnessObserver=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){replayRobustness();robustnessObserver.disconnect();}},{threshold:.25});robustnessObserver.observe(robustnessFigure);
  document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(robustnessRaf);drawRobustness(1);}});

  // Bar length is throughput; subdivision is time allocation, as in the paper.
  const computeColors=['#92C5DE','#2C7BB6','#E08214'];
  D.compute.forEach((row,index)=>{
    const div=node('div','compute-row'),label=node('div','compute-label'),track=node('div','compute-track'),stack=node('div','compute-stack');
    const parts=row.label.split(' · ');label.append(node('strong','',parts[0]),node('span','',parts[1]));
    if(index===0)div.classList.add('compute-default');
    stack.style.width=row.relative/5*100+'%';
    row.shares.forEach((share,i)=>{const segment=node('span','');segment.style.width=share+'%';segment.style.background=computeColors[i];segment.append(node('b','',Math.round(share)+'%'));segment.title=['Simulation + rendering','Forward pass','Backpropagation'][i]+': '+share.toFixed(1)+'% of profiled training time';stack.append(segment);});
    const value=node('strong','compute-total',row.relative.toFixed(2)+'×');value.style.left=row.relative/5*100+'%';
    track.append(stack,value);div.append(label,track);$('compute-rows').append(div);
  });
  new ResizeObserver(()=>document.querySelectorAll('.compute-stack span').forEach(s=>{s.querySelector('b').hidden=s.getBoundingClientRect().width<29;})).observe($('compute-rows'));

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
