// Ownership adapter for pinned three-gpu-pathtracer 0.0.24. Its public dispose
// omits the low-resolution renderer, shader materials and uniform textures.
// Do not recursively dispose arbitrary material values: backgroundMap and the
// scene materials' texture maps can belong to the original rasterized scene.
export function createOwnedPathTracer(Factory,renderer) {
  const bootstrapMaterials=new Set(),render=renderer.render;
  // The pinned constructor renders temporary Sobol generators, then drops their
  // materials without disposing them. Capture only this synchronous constructor.
  renderer.render=function(object,...args){
    for(const material of Array.isArray(object.material)?object.material:object.material?[object.material]:[])bootstrapMaterials.add(material);
    return render.call(this,object,...args);
  };
  try {
    const tracer=new Factory(renderer);
    return {tracer,dispose:createPathTracerDisposer(tracer,{bootstrapMaterials})};
  }catch(error){for(const material of bootstrapMaterials)material.dispose();throw error;}
  finally{renderer.render=render;}
}

export function createPathTracerDisposer(tracer,{bootstrapMaterials=[]}={}) {
  let disposed=false;
  const released=new Set(),compiling=new Set(),arrayOwners=new Map();
  const renderers=[tracer._pathTracer,tracer._lowResPathTracer].filter(Boolean);
  const release=value=>{
    if(!value||released.has(value))return;
    released.add(value);value.dispose?.();
  };
  function track(promise) {
    if(!promise?.then)return promise;
    compiling.add(promise);
    promise.then(()=>compiling.delete(promise),()=>compiling.delete(promise));
    return promise;
  }
  for(const renderer of renderers) {
    track(renderer._compilePromise);
    const compile=renderer.compileMaterial;
    renderer.compileMaterial=function(...args){return disposed?Promise.resolve():track(compile.apply(this,args));};
    for(const texture of [renderer.material?.textures,renderer.material?.iesProfiles]) {
      if(!texture?.setTextures)continue;
      const setTextures=texture.setTextures;
      texture.setTextures=function(glRenderer,...args){
        const setTarget=glRenderer.setRenderTarget;
        // This Three revision drops renderTarget when WebGLArrayRenderTarget
        // replaces its texture. Recover its owner when the atlas is first used.
        glRenderer.setRenderTarget=function(target,...rest){
          if(target?.texture===texture)arrayOwners.set(texture,target);
          return setTarget.call(this,target,...rest);
        };
        try{return setTextures.call(this,glRenderer,...args);}
        finally{glRenderer.setRenderTarget=setTarget;}
      };
    }
  }
  function releaseArrayTarget(texture) {
    // Disposing only the texture leaves its framebuffer allocated. Three's
    // renderTarget back-reference also exposes the atlas copy material.
    const owner=texture?.renderTarget||arrayOwners.get(texture);
    if(owner){release(owner.fsQuad?.material);release(owner);}
    else release(texture);
  }
  function releaseUniforms(material) {
    if(!material||released.has(material))return;
    for(const name of ['index','position','bvhBounds','bvhContents'])release(material.bvh?.[name]);
    for(const texture of material.attributesArray?._textures||[])release(texture);
    for(const name of ['attributesArray','materialIndexAttribute','materials','stratifiedTexture','stratifiedOffsetTexture'])release(material[name]);
    release(material.lights?.tex);
    releaseArrayTarget(material.textures);releaseArrayTarget(material.iesProfiles);
    for(const name of ['marginalWeights','conditionalWeights','map'])release(material.envMapInfo?.[name]);
  }
  return function dispose() {
    if(disposed)return;
    disposed=true;
    const shaderMaterials=new Set(bootstrapMaterials);
    for(const renderer of renderers) {
      renderer.material?.removeEventListener('recompilation',renderer._compileFunction);
      shaderMaterials.add(renderer.material);shaderMaterials.add(renderer._blendQuad?.material);
      releaseUniforms(renderer.material);
    }
    release(tracer._internalBackground);release(tracer._colorBackground);
    const generator=tracer._generator;
    release(generator?.geometry);
    for(const geometry of generator?.staticGeometryGenerator?._intermediateGeometry?.values()||[])release(geometry);
    const dummy=generator?.staticGeometryGenerator?._dummyMesh;
    release(dummy?.geometry);release(dummy?.material);
    // These methods release their own render targets and fullscreen geometry.
    tracer._lowResPathTracer?.dispose();tracer.dispose();
    // compileAsync polls properties.currentProgram until ready; disposing the
    // material before that finishes makes the polling callback throw. Track all
    // outstanding compilations, including superseded recompilation promises.
    const releaseMaterials=()=>{for(const material of shaderMaterials)release(material);};
    if(compiling.size)Promise.allSettled([...compiling]).then(releaseMaterials);
    else releaseMaterials();
  };
}
