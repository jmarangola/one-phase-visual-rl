import * as THREE from 'three';
import {RT_FAST} from './ray-presets.js';
import {HDRLoader} from './vendor/three/examples/jsm/loaders/HDRLoader.js';
import {WebGLPathTracer,DenoiseMaterial,FullScreenQuad} from './vendor/pathtracer/pathtracer.js';

import {loadRayLod} from './ray-lod.js';
import {createOwnedPathTracer} from './pathtracer-cleanup.js';

// Browser GPU shader tracing. This does not detect or invoke native RT cores.
export async function createSpectatorPathTracer(view,spec,{getAsset,getOptionalAsset=async path=>{const r=await fetch(path);if(!r.ok)throw Error(`Missing optional asset ${path}`);return new Uint8Array(await r.arrayBuffer());}}) {
  const lod=await loadRayLod({THREE,getAsset:getOptionalAsset});
  const scene=view.scene.clone(true),pairs=[];
  const source=[],copy=[];view.scene.traverse(o=>source.push(o));scene.traverse(o=>copy.push(o));
  for(let i=0;i<source.length;i++){
    pairs.push([source[i],copy[i]]);
    if(copy[i].geometry){
      const id=copy[i].userData.rayLOD;
      copy[i].geometry=(id&&lod.createGeometry(id.source,id.mesh,id.primitive))||copy[i].geometry.clone();
      if(!copy[i].geometry.attributes.normal)copy[i].geometry.computeVertexNormals();
    }
    if(copy[i].material)copy[i].material=Array.isArray(copy[i].material)?copy[i].material.map(m=>m.clone()):copy[i].material.clone();
  }
  let texture=null,tracer=null,denoise=null,disposeTracer=null,disposed=false;
  const dispose=()=>{
    if(disposed)return;
    disposed=true;
    denoise?.material.dispose();denoise?.dispose();
    disposeTracer?.();texture?.dispose();
    scene.traverse(o=>{o.geometry?.dispose();for(const m of Array.isArray(o.material)?o.material:o.material?[o.material]:[])m.dispose();});
  };
  try{
    if(spec.lighting?.environment_hdr){
      const bytes=await getAsset(spec.lighting.environment_hdr);
      const hdr=new HDRLoader().setDataType(THREE.FloatType).parse(bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength));
      texture=new THREE.DataTexture(hdr.data,hdr.width,hdr.height,THREE.RGBAFormat,THREE.FloatType);
      texture.mapping=THREE.EquirectangularReflectionMapping;texture.flipY=true;
      texture.minFilter=THREE.LinearFilter;texture.magFilter=THREE.LinearFilter;texture.needsUpdate=true;
      scene.environment=texture;scene.background=texture;
    }
    ({tracer,dispose:disposeTracer}=createOwnedPathTracer(WebGLPathTracer,view.renderer));
    tracer.bounces=RT_FAST.pathDepth;tracer.transmissiveBounces=RT_FAST.transmissiveBounces;tracer.tiles.set(1,1);
    tracer.renderDelay=0;tracer.minSamples=1;tracer.fadeDuration=0;
    tracer.rasterizeScene=false;tracer.dynamicLowRes=false;tracer.stableNoise=true;
    tracer.textureSize.set(512,512);
    tracer.renderToCanvas=false;
    denoise=new FullScreenQuad(new DenoiseMaterial(RT_FAST.denoiser));
    // Keep the experimental framebuffer modest even on high-DPI displays.
    const size=view.renderer.getDrawingBufferSize(new THREE.Vector2());
    tracer.renderScale=Math.min(1,RT_FAST.maxWidth/size.x,RT_FAST.maxHeight/size.y);
    let dirty=true;
    const lastCamera=new THREE.Matrix4(),lastProjection=new THREE.Matrix4();
    function sync(){
      view.scene.updateMatrixWorld(true);
      for(const [from,to]of pairs){to.matrixAutoUpdate=false;to.matrix.copy(from.matrix);}
      scene.updateMatrixWorld(true);
    }
    function render(benchmarkOffset=0,accumulate=false){
      view.viewCamera.updateMatrixWorld();
      const cameraChanged=!lastCamera.equals(view.viewCamera.matrixWorld)||!lastProjection.equals(view.viewCamera.projectionMatrix);
      if(dirty){
        sync();
        // Exercise moving-geometry work on the clone, never on physics or policy inputs.
        if(benchmarkOffset){for(const [,to]of pairs)if(to.isMesh)to.matrix.elements[12]+=benchmarkOffset;scene.updateMatrixWorld(true);}
        tracer.setScene(scene,view.viewCamera);dirty=false;
      }else if(!accumulate||cameraChanged)tracer.updateCamera();
      lastCamera.copy(view.viewCamera.matrixWorld);lastProjection.copy(view.viewCamera.projectionMatrix);
      const size=view.renderer.getDrawingBufferSize(new THREE.Vector2());
      tracer.renderScale=Math.min(1,RT_FAST.maxWidth/size.x,RT_FAST.maxHeight/size.y);
      for(let i=0;i<RT_FAST.samplesPerFrame;i++)tracer.renderSample();
      if(!tracer.isCompiling){
        denoise.material.map=tracer.target.texture;
        view.renderer.setRenderTarget(null);denoise.render(view.renderer);
      }
    }
    return {render,refine(){render(0,true);},dispose,markDirty(){dirty=true;},updateCamera(){tracer.updateCamera();},get compiling(){return tracer.isCompiling;},get samples(){return tracer.samples;},get tracer(){return tracer;}};
  }catch(e){dispose();throw e;}
}
