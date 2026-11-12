"use strict";
const $ = id => document.getElementById(id);
const FPS = 30, SOURCE_FRAMES = 301, PHONE_START_FRAME = 45, PHONE_FRAMES = 59, PEG_FRAMES = 230;
const KEY = 'one-phase-teaser-v3-trim-r14';
const source = $('source'), phone = $('phone'), recovery = $('recovery'), peg = $('peg');
const canvas = $('opening'), ctx = canvas.getContext('2d'), overlay = $('overlay');
const fmt = frames => (frames / FPS).toFixed(2);
const clamp = (n, low, high) => Math.max(low, Math.min(high, n));
let start = 70, end = 259, selectionPlaying = false, previewPlaying = false, previewStage = 'phone';
let previewTime = 0, raf = 0, launchId = 0;
let mediaLoaded = false;
try {
  const saved = JSON.parse(localStorage.getItem(KEY));
  if (Number.isInteger(saved?.start_frame) && Number.isInteger(saved?.end_frame_exclusive)) {
    start = clamp(saved.start_frame, 0, SOURCE_FRAMES - 1);
    end = clamp(saved.end_frame_exclusive, start + 1, SOURCE_FRAMES);
  }
} catch {}
const totalFrames = () => PHONE_FRAMES + end - start;
const selection = () => ({version:'v3',first_clip:'IMG_2725-motion-start.mp4',
  first_clip_source_start_frame:PHONE_START_FRAME,first_clip_source_end_frame_exclusive:PHONE_START_FRAME+PHONE_FRAMES,
  first_clip_seconds:PHONE_FRAMES/FPS,followup_clip:'R14',fps:FPS,
  start_frame:start,end_frame_exclusive:end,start_seconds:start/FPS,end_seconds:end/FPS,
  opening_seconds:totalFrames()/FPS,right_clips:['P01','P16','P09'],playback_speed:1,
  next_section:'Grid to be selected after this trim'});
function stopPreview() {
  launchId++;
  previewPlaying = false;
  cancelAnimationFrame(raf);
  [phone,recovery,peg].forEach(v => v.pause());
  $('play-opening').disabled = !mediaLoaded;
}
function paint(left = phone) {
  ctx.fillStyle = '#080a09';ctx.fillRect(0,0,1600,720);
  if (left.readyState >= 2) ctx.drawImage(left,0,0,798,720);
  if (peg.readyState >= 2) ctx.drawImage(peg,802,0,798,720);
  if (overlay.complete && overlay.naturalWidth) ctx.drawImage(overlay,0,0,1600,720);
}
function update(syncFields = true) {
  stopPreview();selectionPlaying = false;source.pause();
  if(syncFields){$('start').value = fmt(start);$('end').value = fmt(end);}
  $('start-range').value = start;$('end-range').value = end;
  $('start-label').textContent = `${fmt(start)} s`;$('end-label').textContent = `${fmt(end)} s`;
  $('selected-duration').textContent = `${fmt(end-start)} s`;
  $('total-duration').textContent = `${fmt(totalFrames())} s`;
  $('window').style.left = `${100*start/SOURCE_FRAMES}%`;
  $('window').style.width = `${100*(end-start)/SOURCE_FRAMES}%`;
  const within = totalFrames() >= 180 && totalFrames() <= 240;
  $('target').textContent = within ? 'Within your 6–8 second target.' : `Opening is ${fmt(totalFrames())} s. Choose a ${fmt(180-PHONE_FRAMES)}–${fmt(240-PHONE_FRAMES)} s excerpt to stay within 6–8 s.`;
  $('target').classList.toggle('outside',!within);
  $('choice').value = `For teaser v3, use the motion-start cut of IMG_2725 first on the left (original frames ${PHONE_START_FRAME}–${PHONE_START_FRAME+PHONE_FRAMES}, ${fmt(PHONE_FRAMES)} s; idle lead-in removed), then use Push-T R14 from ${fmt(start)} s to ${fmt(end)} s (frames ${start}–${end}, end exclusive, 30 fps). The opening is ${fmt(totalFrames())} s. Keep fast peg insertions on the right, then add the grid for a 10–15 second teaser.`;
  $('progress').max = totalFrames()/FPS;$('progress').value = 0;
  $('preview-time').textContent = `0.00 / ${fmt(totalFrames())} s`;
  $('phase').textContent = 'Ready · play opening to see your latest trim';
  $('status').textContent = 'Selection saved in this browser. Copy it into the chat when ready.';
  try { localStorage.setItem(KEY,JSON.stringify(selection())); } catch {}
  // Reset the displayed preview when the range changes.
  phone.currentTime=0;peg.currentTime=0;recovery.currentTime=start/FPS;
  previewTime=0;previewStage='phone';paint();
}
function change(which, raw, syncFields = true) {
  if (!Number.isFinite(raw)) return update();
  if(which==='start')start=clamp(Math.round(raw),0,end-1);
  else end=clamp(Math.round(raw),start+1,SOURCE_FRAMES);
  update(syncFields);
}
for(const which of ['start','end']) {
  $(which).addEventListener('input',e=>{if(e.target.value!=='' && Number.isFinite(e.target.valueAsNumber))change(which,e.target.valueAsNumber*FPS,false);});
  $(which).addEventListener('change',e=>change(which,Number(e.target.value)*FPS));
  $(`${which}-range`).addEventListener('input',e=>change(which,Number(e.target.value)));
}
function sourceClock() {
  $('time').textContent=`${source.currentTime.toFixed(2)} / ${fmt(SOURCE_FRAMES)} s`;
  $('seek').value=clamp(Math.round(source.currentTime*FPS),0,SOURCE_FRAMES-1);
  $('playhead').style.left=`${Math.min(100,100*source.currentTime/(SOURCE_FRAMES/FPS))}%`;
  if(selectionPlaying && source.currentTime >= (end-.25)/FPS) {
    source.pause();source.currentTime=(end-1)/FPS;selectionPlaying=false;
    $('status').textContent='Selected excerpt finished. Adjust the range or copy it into the chat.';
  }
}
source.addEventListener('timeupdate',sourceClock);
source.addEventListener('seeked',sourceClock);
source.addEventListener('play',()=>{stopPreview();const tick=()=>{sourceClock();if(!source.paused)requestAnimationFrame(tick);};tick();});
function scrub(frame) {selectionPlaying=false;source.pause();source.currentTime=clamp(frame,0,SOURCE_FRAMES-1)/FPS;}
$('seek').addEventListener('input',e=>scrub(Number(e.target.value)));
$('back').addEventListener('click',()=>scrub(Math.round(source.currentTime*FPS)-1));
$('forward').addEventListener('click',()=>scrub(Math.round(source.currentTime*FPS)+1));
$('mark-start').addEventListener('click',()=>change('start',source.currentTime*FPS));
// Include the visible frame when marking an exclusive end boundary.
$('mark-end').addEventListener('click',()=>change('end',Math.round(source.currentTime*FPS)+1));
$('play-selection').addEventListener('click',async()=>{
  stopPreview();
  try{await mediaReady;await seekTo(source,start/FPS);selectionPlaying=true;await source.play();$('status').textContent='Playing the selected excerpt at 1×.';}
  catch{selectionPlaying=false;$('status').textContent='Press play on the recovery video to begin.';}
});
$('reset').addEventListener('click',()=>{start=70;end=259;update();});
function ready(v) {
  if(v.readyState>=2)return Promise.resolve();
  return new Promise((resolve,reject)=>{
    const done=()=>{clearTimeout(timer);v.removeEventListener('loadeddata',ok);v.removeEventListener('error',bad);};
    const ok=()=>{done();resolve();},bad=()=>{done();reject(new Error('Video could not load.'));};
    const timer=setTimeout(bad,20000);
    v.addEventListener('loadeddata',ok,{once:true});v.addEventListener('error',bad,{once:true});
  });
}
function seekTo(v,time) {
  if(Math.abs(v.currentTime-time)<.001 && !v.seeking)return Promise.resolve();
  return new Promise((resolve,reject)=>{
    const done=()=>{clearTimeout(timer);v.removeEventListener('seeked',ok);};
    const ok=()=>{done();resolve();};const timer=setTimeout(()=>{done();reject(new Error('Video seek timed out.'));},10000);
    v.addEventListener('seeked',ok,{once:true});v.currentTime=time;
  });
}
function previewTick() {
  if(!previewPlaying)return;
  if(previewStage==='phone' && (phone.ended || phone.currentTime >= (PHONE_FRAMES-.3)/FPS)) {
    phone.pause();previewStage='recovery';
    recovery.play().catch(()=>{stopPreview();$('phase').textContent='Playback paused. Press Play opening to retry.';});
  }
  const left=previewStage==='phone'?phone:recovery;
  previewTime=previewStage==='phone'?phone.currentTime:PHONE_FRAMES/FPS+Math.max(0,recovery.currentTime-start/FPS);
  if(previewStage==='recovery' && recovery.currentTime >= (end-.25)/FPS) {
    previewTime=totalFrames()/FPS;stopPreview();$('phase').textContent='Opening complete · grid follows here';
  } else {
    $('phase').textContent=previewStage==='phone'?'Left: new clip · Right: fast peg insertions':'Left: selected recovery excerpt · Right: fast peg insertions';
    const target=Math.min(previewTime,(PEG_FRAMES-1)/FPS);
    if(!peg.seeking && Math.abs(peg.currentTime-target)>.14)peg.currentTime=target;
  }
  paint(left);$('progress').value=previewTime;
  $('preview-time').textContent=`${Math.min(previewTime,totalFrames()/FPS).toFixed(2)} / ${fmt(totalFrames())} s`;
  if(previewPlaying)raf=requestAnimationFrame(previewTick);
}
$('play-opening').addEventListener('click',async()=>{
  stopPreview();source.pause();selectionPlaying=false;
  const id=launchId;$('play-opening').disabled=true;$('phase').textContent='Loading opening…';
  try {
    await mediaReady;
    if(id!==launchId)return;
    await Promise.all([seekTo(phone,0),seekTo(recovery,start/FPS),seekTo(peg,0)]);
    if(id!==launchId)return;
    previewStage='phone';previewTime=0;previewPlaying=true;
    await Promise.all([phone.play(),peg.play()]);
    if(id!==launchId){[phone,recovery,peg].forEach(v=>v.pause());return;}
    $('play-opening').disabled=false;previewTick();
  } catch(error) {stopPreview();$('phase').textContent='Unable to play the preview. Reload this page and try again.';}
});
$('stop-opening').addEventListener('click',()=>{stopPreview();$('phase').textContent='Paused · Play opening restarts from the beginning';});
document.addEventListener('visibilitychange',()=>{if(document.hidden){stopPreview();source.pause();}});
[phone,peg].forEach(v=>{v.addEventListener('loadeddata',()=>{if(!previewPlaying)paint();});v.addEventListener('seeked',()=>{if(!previewPlaying && previewTime===0)paint();});});
overlay.addEventListener('load',()=>{if(!previewPlaying)paint();});
$('copy').addEventListener('click',async()=>{
  try{await navigator.clipboard.writeText($('choice').value);$('status').textContent='Copied. Paste your selection into the chat.';}
  catch{$('choice').focus();$('choice').select();$('status').textContent='Selection highlighted. Press Ctrl+C or Command+C, then paste into the chat.';}
});
$('download').addEventListener('click',()=>{
  const url=URL.createObjectURL(new Blob([JSON.stringify(selection(),null,2)+'\n'],{type:'application/json'}));
  const a=document.createElement('a');a.href=url;a.download='teaser-v3-pusht-selection.json';a.click();
  setTimeout(()=>URL.revokeObjectURL(url),1000);$('status').textContent='Selection downloaded. You can attach it in the chat.';
});
// Some private hosting proxies serve whole videos without byte-range seeking.
// Same-origin Blob URLs make the downloaded clips seekable in every preview.
const mediaButtons=['seek','back','forward','mark-start','mark-end','play-selection','play-opening'];
mediaButtons.forEach(id=>$(id).disabled=true);source.controls=false;
const mediaReady=Promise.all([source,phone,recovery,peg].map(async v=>{
  const response=await fetch(v.src,{credentials:'same-origin'});
  if(!response.ok)throw new Error('Video download failed.');
  v.src=URL.createObjectURL(await response.blob());v.load();await ready(v);
}));
update();
$('status').textContent='Preparing videos for frame-by-frame seeking…';
mediaReady.then(()=>{
  mediaLoaded=true;source.controls=true;
  mediaButtons.forEach(id=>$(id).disabled=false);
  recovery.currentTime=start/FPS;paint();
  $('status').textContent='Ready. Adjust the excerpt and copy your selection into the chat.';
}).catch(()=>{
  $('status').textContent='A video could not load. Reload the page to try again.';
  $('phase').textContent='Preview unavailable until all clips load.';
});
