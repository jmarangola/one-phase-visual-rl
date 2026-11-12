import * as THREE from 'three';
import { GLTFLoader } from './vendor/three/examples/jsm/loaders/GLTFLoader.js';
import { HDRLoader } from './vendor/three/examples/jsm/loaders/HDRLoader.js';
import { OrbitControls } from './vendor/three/examples/jsm/controls/OrbitControls.js';
import { matchNativeMaterial } from './native-materials.js';

function setPose(object, pose) {
  object.position.fromArray(pose.p);
  object.quaternion.fromArray(pose.q);
  object.updateMatrixWorld(true);
}
function matrixFromPose(pose) {
  return new THREE.Matrix4().compose(new THREE.Vector3().fromArray(pose.p),new THREE.Quaternion().fromArray(pose.q),new THREE.Vector3(1,1,1));
}
function boxParts(spec) {
  const group=new THREE.Group();
  for(const part of spec.parts) {
    const [x,y,z]=part.half_extents;
    const color=part.color||spec.color||[0.8,0.17,0.07,1];
    const material=new THREE.MeshStandardMaterial({color:new THREE.Color().setRGB(...color.slice(0,3)),roughness:part.roughness??spec.roughness??0.7,metalness:part.metallic??spec.metallic??0});
    const mesh=new THREE.Mesh(new THREE.BoxGeometry(x*2,y*2,z*2),material);
    setPose(mesh,part.pose);
    group.add(mesh);
  }
  return group;
}

export async function createRenderer(canvas,spec,{getAsset}) {
  const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:false,powerPreference:'high-performance'});
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.toneMapping=THREE.NoToneMapping;
  renderer.setPixelRatio(Math.min(devicePixelRatio||1,2));
  const scene=new THREE.Scene();
  let environment=null,target=null;
  let controls=null,desktopInput=null,updateCameraControls=null,forceOverlay=null,cameraInteractionEnabled=true;
  let introFrame=0,introRunning=false,introStarted=false;
  const tableTextures=[];let tableTextureIndex=0;
  function dispose() {
    cancelAnimationFrame(introFrame);introRunning=false;
    desktopInput?.removeEventListener('change',updateCameraControls);
    controls?.dispose();
    const textures=new Set(tableTextures.map(entry=>entry.texture));
    scene.traverse(object=>{object.geometry?.dispose();for(const material of Array.isArray(object.material)?object.material:object.material?[object.material]:[]){for(const value of Object.values(material))if(value?.isTexture)textures.add(value);material.dispose();}});
    for(const texture of textures)texture.dispose();
    target?.dispose();environment?.dispose();renderer.dispose();
  }
  try {
  scene.background=new THREE.Color(0xe9e9e7);
  const groups=new Map();
  const loader=new GLTFLoader();
  async function imageTexture(path) {
    const bytes=await getAsset(path),url=URL.createObjectURL(new Blob([bytes]));
    try {const texture=await new THREE.TextureLoader().loadAsync(url);texture.colorSpace=THREE.SRGBColorSpace;texture.flipY=false;texture.wrapS=texture.wrapT=THREE.RepeatWrapping;return texture;} finally {URL.revokeObjectURL(url);}
  }
  function nativeMaterials(model,materials,texture=null,matchColors=false) {
    if(!materials?.length)return;
    let index=0;
    model.traverse(object=>{if(!object.isMesh)return;const original=Array.isArray(object.material)?object.material:[object.material];
      const result=original.map(material=>{const native=matchColors?matchNativeMaterial(materials,material.color.toArray()):materials[Math.min(index++,materials.length-1)];const out=material.clone();if(native.base_color)out.color.setRGB(...native.base_color.slice(0,3));out.roughness=native.roughness??out.roughness;out.metalness=native.metallic??out.metalness;if(texture)out.map=texture;return out;});object.material=Array.isArray(object.material)?result:result[0];});
  }
  async function glb(path) {
    const bytes=await getAsset(path);
    const array=bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength);
    const result=await new Promise((resolve,reject)=>loader.parse(array,'',resolve,reject));
    result.scene.traverse(object=>{
      if(!object.isMesh)return;
      const association=result.parser.associations.get(object);
      if(association)object.userData.rayLOD={source:'assets/scene/'+path,mesh:association.meshes,primitive:association.primitives};
    });
    return result.scene;
  }
  const models=await Promise.allSettled(spec.robot.links.filter(link=>link.visual_glb).map(async(link)=>{
    const model=await glb(link.visual_glb);
    // The GLB exporter reverses some submesh orders. Its embedded colors retain
    // the correct surface identity; positional pairing can paint white shells black.
    nativeMaterials(model,link.native_materials,null,true);
    scene.add(model);
    groups.set(link.name,model);
  }));
  const modelFailure=models.find(result=>result.status==='rejected');if(modelFailure)throw modelFailure.reason;
  const tee=boxParts(spec.task.tee),goal=boxParts(spec.task.goal);
  scene.add(tee,goal);
  groups.set('tee',tee);groups.set('goal',goal);
  tee.userData.forceTarget='tee';
  for(const name of ['fr3_gripper_base','fr3_left_finger','fr3_right_finger']){
    const group=groups.get(name);if(group)group.userData.forceTarget='gripper';
  }
  const tableSpec=spec.task.table??spec.table;
  const tableRoot=new THREE.Group();
  if(tableSpec.visual_glb) {
    const table=await glb(tableSpec.visual_glb);
    nativeMaterials(table,tableSpec.native_materials,tableSpec.texture_asset?await imageTexture(tableSpec.texture_asset):null);
    if(tableSpec.visual_pose) setPose(table,tableSpec.visual_pose);
    // Exported table geometry carries its scale; use an explicit visual_scale only.
    if(tableSpec.visual_scale) table.scale.fromArray(tableSpec.visual_scale);
    tableRoot.add(table);
  } else {
    const h=tableSpec.collision.half_extents;
    const table=new THREE.Mesh(new THREE.BoxGeometry(h[0]*2,h[1]*2,h[2]*2),new THREE.MeshStandardMaterial({color:0xb8a28c,roughness:.8}));
    setPose(table,tableSpec.collision.pose);
    tableRoot.add(table);
  }
  scene.add(tableRoot);groups.set('table',tableRoot);
  const tableMaterials=[];
  tableRoot.traverse(object=>{if(object.isMesh)for(const material of Array.isArray(object.material)?object.material:[object.material])if(material.map)tableMaterials.push(material);});
  if(tableMaterials.length){
    tableTextures.push({name:'Original dark wood',texture:tableMaterials[0].map});
    // Preload small, cached textures so reset never waits for a download.
    for(const entry of tableSpec.demo_textures??[])tableTextures.push({name:entry.name,texture:await imageTexture(entry.asset)});
    canvas.dataset.tableTexture=tableTextures[0].name;
  }
  function nextTableTexture(){
    if(tableTextures.length<2)return;
    tableTextureIndex=(tableTextureIndex+1)%tableTextures.length;
    const entry=tableTextures[tableTextureIndex];
    for(const material of tableMaterials){material.map=entry.texture;material.needsUpdate=true;}
    canvas.dataset.tableTexture=entry.name;
  }
  const environmentPath=spec.lighting?.environment_hdr;
  if(environmentPath) {
    const bytes=await getAsset(environmentPath);
    const parsed=new HDRLoader().parse(bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength));
    const texture=new THREE.DataTexture(parsed.data,parsed.width,parsed.height,THREE.RGBAFormat,parsed.type);
    texture.mapping=THREE.EquirectangularReflectionMapping;
    texture.minFilter=THREE.LinearFilter;texture.magFilter=THREE.LinearFilter;texture.flipY=true;texture.needsUpdate=true;
    const pmrem=new THREE.PMREMGenerator(renderer);
    environment=pmrem.fromEquirectangular(texture);
    scene.environment=environment.texture;
    scene.background=environment.texture;
    scene.backgroundBlurriness=0;
    texture.dispose();pmrem.dispose();
    const ambient=spec.lighting.ambient??0.15;
    scene.add(new THREE.AmbientLight(0xffffff,Array.isArray(ambient)?ambient[0]:ambient));
  } else {
    scene.add(new THREE.HemisphereLight(0xffffff,0x666056,1.5));
    const light=new THREE.DirectionalLight(0xffffff,1.7);light.position.set(1,2,3);scene.add(light);
  }
  for(const source of spec.lighting?.directional??[]) {
    const light=new THREE.DirectionalLight(new THREE.Color().setRGB(...source.color),1);
    light.position.fromArray(source.direction).multiplyScalar(-5);
    scene.add(light);scene.add(light.target);
  }
  const viewCamera=new THREE.PerspectiveCamera(0.95*180/Math.PI,16/9,0.01,100);
  viewCamera.up.set(0,0,1);
  const focus=new THREE.Vector3(-.2,.7,.15);
  const settledEye=new THREE.Vector3(.4,1.6,.8);
  viewCamera.position.copy(settledEye);viewCamera.lookAt(focus);
  const forceRay=new THREE.Raycaster(),pointer=new THREE.Vector2();
  const tablePlaneZ=(spec.task.goal.nominal_pose??spec.task.goal.pose).p[2]-.001;
  function setPointerRay(x,y){
    const rect=canvas.getBoundingClientRect();if(!rect.width||!rect.height)return false;
    pointer.set((x-rect.left)/rect.width*2-1,1-(y-rect.top)/rect.height*2);
    scene.updateMatrixWorld(true);viewCamera.updateMatrixWorld(true);forceRay.setFromCamera(pointer,viewCamera);return true;
  }
  function pickForceTarget(x,y){
    if(!setPointerRay(x,y))return null;
    // Test the entire scene so an occluding table/arm cannot select a target behind it.
    const hit=forceRay.intersectObjects(scene.children,true).find(hit=>{
      for(let node=hit.object;node;node=node.parent)if(!node.visible)return false;
      return true;
    });
    if(!hit)return null;
    let target=null;for(let node=hit.object;node;node=node.parent)if(node.userData.forceTarget){target=node.userData.forceTarget;break;}
    return target?{target,object:hit.object,localPoint:hit.object.worldToLocal(hit.point.clone())}:null;
  }
  function forcePlanePoint(x,y,z=tablePlaneZ){
    if(!setPointerRay(x,y)||Math.abs(forceRay.ray.direction.z)<1e-5)return null;
    return forceRay.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0,0,1),-z),new THREE.Vector3());
  }
  function forceAnchor(hit){return hit.object.localToWorld(hit.localPoint.clone());}
  function projectForcePoint(point){
    const ndc=point.clone().project(viewCamera);if(ndc.z<-1||ndc.z>1)return null;
    const rect=canvas.getBoundingClientRect();return{x:(ndc.x+1)*rect.width/2,y:(1-ndc.y)*rect.height/2};
  }
  const cameraSpec=spec.camera;
  const wrist=new THREE.PerspectiveCamera();
  const width=cameraSpec.width,height=cameraSpec.height;
  const K=cameraSpec.K;
  const fx=Array.isArray(K[0])?K[0][0]:K[0],fy=Array.isArray(K[0])?K[1][1]:K[4];
  const cx=Array.isArray(K[0])?K[0][2]:K[2],cy=Array.isArray(K[0])?K[1][2]:K[5];
  const near=.01,far=100;
  wrist.projectionMatrix.set(2*fx/width,0,1-2*cx/width,0,0,2*fy/height,2*cy/height-1,0,0,0,-(far+near)/(far-near),-2*far*near/(far-near),0,0,-1,0);
  wrist.projectionMatrixInverse.copy(wrist.projectionMatrix).invert();
  wrist.matrixAutoUpdate=false;
  const matrix=cameraSpec.T_parent_camera_opencv;
  const parentToCv=new THREE.Matrix4().set(...matrix.flat());
  const cvToThree=new THREE.Matrix4().makeScale(1,-1,-1);
  target=new THREE.WebGLRenderTarget(width,height,{type:THREE.UnsignedByteType,format:THREE.RGBAFormat,depthBuffer:true});
  target.texture.colorSpace=THREE.SRGBColorSpace;
  const rgba=new Uint8Array(width*height*4),rgb=new Uint8Array(width*height*3);
  let lastPoses=null,display=null;
  function update(poses) {
    lastPoses=poses;display?.markDirty();
    for(const [name,mesh] of groups) { if(poses[name]) setPose(mesh,poses[name]); }
    const parent=poses[cameraSpec.parent_link];
    if(!parent) throw new Error(`Missing policy camera link: ${cameraSpec.parent_link}`);
    wrist.matrixWorld.copy(matrixFromPose(parent)).multiply(parentToCv).multiply(cvToThree);
    wrist.matrixWorldInverse.copy(wrist.matrixWorld).invert();
    // Keep the matrix used by WebGLRenderer consistent with the explicit world transform.
    wrist.matrix.copy(wrist.matrixWorld);
  }
  function render() {
    const rect=canvas.getBoundingClientRect();
    const w=Math.max(1,Math.round(rect.width)),h=Math.max(1,Math.round(rect.height));
    const size=new THREE.Vector2();renderer.getSize(size);
    if(size.x!==w||size.y!==h){renderer.setSize(w,h,false);viewCamera.aspect=w/h;viewCamera.updateProjectionMatrix();}
    renderer.setRenderTarget(null);
    if(display)display.render();else renderer.render(scene,viewCamera);
    forceOverlay?.();
  }
  function readPolicyRGB() {
    if(!lastPoses) throw new Error('Scene has not been initialized');
    renderer.setRenderTarget(target);
    renderer.render(scene,wrist);
    renderer.readRenderTargetPixels(target,0,0,width,height,rgba);
    renderer.setRenderTarget(null);
    for(let y=0;y<height;y++)for(let x=0;x<width;x++){
      const source=((height-1-y)*width+x)*4,dest=(y*width+x)*3;
      rgb[dest]=rgba[source];rgb[dest+1]=rgba[source+1];rgb[dest+2]=rgba[source+2];
    }
    return rgb;
  }
  function configureCameraControls() {
    controls?.dispose();controls=null;
    canvas.style.touchAction='auto';
    canvas.classList.toggle('camera-controls',desktopInput.matches);
    if(!desktopInput.matches){canvas.removeAttribute('title');return;}
    // Only the spectator camera is attached. The wrist-camera transforms above
    // remain driven exclusively by physics and the calibrated camera extrinsics.
    controls=new OrbitControls(viewCamera,canvas);
    controls.enabled=cameraInteractionEnabled;
    controls.target.copy(focus);
    controls.enableDamping=false;
    controls.minDistance=.35;controls.maxDistance=3.5;
    controls.minPolarAngle=.08;controls.maxPolarAngle=Math.PI/2-.04;
    controls.rotateSpeed=.7;controls.zoomSpeed=.75;controls.panSpeed=.7;
    controls.touches.ONE=null;controls.touches.TWO=null;
    canvas.style.touchAction='auto';
    canvas.title='Drag the Tee or gripper, then release to push · Drag elsewhere to orbit · Shift-drag to pan · Scroll to zoom';
    controls.update();controls.saveState();
    controls.addEventListener('change',render);
  }
  desktopInput=matchMedia('(hover: hover) and (pointer: fine)');
  updateCameraControls=configureCameraControls;
  configureCameraControls();
  desktopInput.addEventListener('change',configureCameraControls);
  function finishIntro(){
    cancelAnimationFrame(introFrame);introFrame=0;introRunning=false;cameraInteractionEnabled=true;
    viewCamera.up.set(0,0,1);viewCamera.position.copy(settledEye);viewCamera.lookAt(focus);
    if(controls){controls.target.copy(focus);controls.enabled=true;controls.update();controls.saveState();}
    canvas.dataset.cameraIntro='complete';render();
  }
  function startIntro({shouldAdvance=()=>true}={}){
    if(introStarted)return;introStarted=true;
    if(matchMedia('(prefers-reduced-motion: reduce)').matches){finishIntro();return;}
    introRunning=true;cameraInteractionEnabled=false;if(controls)controls.enabled=false;
    let elapsed=0,last=performance.now();canvas.dataset.cameraIntro='wide-front';
    function frame(now){
      if(!introRunning)return;
      const dt=Math.min(100,now-last);last=now;
      if(!document.hidden&&shouldAdvance()){
        elapsed+=dt;const raw=Math.min(1,Math.max(0,(elapsed-350)/2500)),u=raw*raw*(3-2*raw);
        const dx=settledEye.x-focus.x,dy=settledEye.y-focus.y,dz=settledEye.z-focus.z;
        const endRadius=settledEye.distanceTo(focus),radius=2.6+(endRadius-2.6)*u;
        const endAngle=Math.atan2(Math.hypot(dx,dy),dz),angle=1.18+(endAngle-1.18)*u;
        // A level, front-facing establishing view glides into the familiar angle.
        const yaw=Math.atan2(dy,dx)*u;
        viewCamera.position.set(focus.x+radius*Math.sin(angle)*Math.cos(yaw),focus.y+radius*Math.sin(angle)*Math.sin(yaw),focus.z+radius*Math.cos(angle));
        viewCamera.up.set(0,0,1);viewCamera.lookAt(focus);
        canvas.dataset.cameraIntro=raw>0?'flying-in':'wide-front';render();
        if(raw===1){finishIntro();return;}
      }
      introFrame=requestAnimationFrame(frame);
    }
    frame(performance.now());
  }
  function resetCamera(){finishIntro();}
  return {update,render,readPolicyRGB,resetCamera,startIntro,nextTableTexture,introActive:()=>introRunning,dispose,renderer,scene,wrist,viewCamera,
    pickForceTarget,forcePlanePoint,forceAnchor,projectForcePoint,tablePlaneZ,
    setCameraInteractionEnabled(value){cameraInteractionEnabled=value;if(controls)controls.enabled=value;},
    setForceOverlay(value){forceOverlay=value;},setDisplay(value){display=value;}};
  } catch(error) { dispose();throw error; }
}
