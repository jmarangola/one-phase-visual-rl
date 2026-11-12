import {FORCE_LIMITS,MAX_DRAG_METERS,dragForce} from './planar-forces.js';

/** Pointer-only spectator overlay. No geometry is added to the policy's scene. */
export function createForceInteraction(canvas,view,{onRelease,getPulses,enabled=()=>true}){
  const root=canvas.parentElement,document=canvas.ownerDocument,window=document.defaultView;
  const overlay=document.createElement('div');overlay.className='force-overlay';overlay.hidden=true;
  overlay.innerHTML='<svg aria-hidden="true"><defs><marker id="force-arrowhead" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z"/></marker></defs><circle r="4"/><line marker-end="url(#force-arrowhead)"/></svg><span class="force-label"></span>';
  root.append(overlay);
  const svg=overlay.querySelector('svg'),line=overlay.querySelector('line'),circle=overlay.querySelector('circle'),label=overlay.querySelector('.force-label');
  let drag=null,released=null;
  const consume=event=>{event.preventDefault();event.stopImmediatePropagation();};
  function finishDrag(){
    if(!drag)return;
    const id=drag.pointerId;drag=null;view.setCameraInteractionEnabled(true);canvas.classList.remove('force-dragging');
    if(canvas.hasPointerCapture(id))canvas.releasePointerCapture(id);
  }
  function cancel(){finishDrag();released=null;overlay.hidden=true;}
  function sample(event){
    const point=view.forcePlanePoint(event.clientX,event.clientY,drag.planeZ);
    drag.force=point?dragForce(drag.hit.target,[point.x-drag.start.x,point.y-drag.start.y],Math.hypot(event.clientX-drag.x,event.clientY-drag.y)):null;
  }
  function refresh(){
    let selection=drag,force=drag?.force;
    if(!selection&&released){const pulse=getPulses().find(pulse=>pulse.id===released.id);if(pulse){selection=released;force=pulse.force;}else released=null;}
    if(!selection){overlay.hidden=true;return;}
    const anchor=view.forceAnchor(selection.hit),magnitude=force?Math.hypot(force[0],force[1]):0;
    const tip=anchor.clone();if(force){const scale=MAX_DRAG_METERS/FORCE_LIMITS[selection.hit.target];tip.x+=force[0]*scale;tip.y+=force[1]*scale;}
    const a=view.projectForcePoint(anchor),b=view.projectForcePoint(tip);if(!a||!b){overlay.hidden=true;return;}
    const rect=canvas.getBoundingClientRect();svg.setAttribute('viewBox',`0 0 ${rect.width} ${rect.height}`);
    circle.setAttribute('cx',a.x);circle.setAttribute('cy',a.y);
    line.setAttribute('x1',a.x);line.setAttribute('y1',a.y);line.setAttribute('x2',b.x);line.setAttribute('y2',b.y);line.style.visibility=force?'visible':'hidden';
    label.textContent=`${selection.hit.target==='tee'?'Tee':'Gripper'} · ${magnitude.toFixed(1)} N`;
    label.style.left=`${Math.max(66,Math.min(rect.width-66,b.x))}px`;label.style.top=`${Math.max(12,Math.min(rect.height-34,b.y-34))}px`;
    overlay.dataset.target=selection.hit.target;overlay.dataset.magnitude=String(magnitude);overlay.dataset.phase=drag?'selecting':'applying';overlay.hidden=false;
  }
  function down(event){
    if(drag||!enabled()||event.button!==0||event.isPrimary===false||event.pointerType==='touch'||event.shiftKey||event.ctrlKey||event.metaKey||event.altKey)return;
    const hit=view.pickForceTarget(event.clientX,event.clientY);if(!hit)return;
    const planeZ=view.tablePlaneZ,start=view.forcePlanePoint(event.clientX,event.clientY,planeZ);if(!start)return;
    consume(event);released=null;
    drag={pointerId:event.pointerId,hit,planeZ,start,x:event.clientX,y:event.clientY,force:null};
    view.setCameraInteractionEnabled(false);canvas.classList.add('force-dragging');canvas.setPointerCapture(event.pointerId);refresh();
  }
  function move(event){
    if(!drag||event.pointerId!==drag.pointerId)return;
    consume(event);sample(event);refresh();
  }
  function up(event){
    if(!drag||event.pointerId!==drag.pointerId)return;
    consume(event);sample(event);const {hit,force}=drag;finishDrag();
    if(force&&enabled()){const pulse=onRelease(hit.target,force);if(pulse)released={hit,id:pulse.id};}
    refresh();
  }
  function interrupted(event){if(drag&&event.pointerId===drag.pointerId)cancel();}
  function wheel(event){if(drag)consume(event);}
  function hidden(){if(document.hidden)cancel();}
  const listeners=[['pointerdown',down],['pointermove',move],['pointerup',up],['pointercancel',interrupted],['lostpointercapture',interrupted],['wheel',wheel]];
  for(const [name,fn] of listeners)canvas.addEventListener(name,fn,{capture:true,passive:false});
  window.addEventListener('blur',cancel);document.addEventListener('visibilitychange',hidden);
  view.setForceOverlay(refresh);
  return {refresh,cancel,get dragging(){return !!drag;},dispose(){cancel();view.setForceOverlay(null);for(const [name,fn] of listeners)canvas.removeEventListener(name,fn,true);window.removeEventListener('blur',cancel);document.removeEventListener('visibilitychange',hidden);overlay.remove();}};
}
