// GPU names and native RT-core branding are not browser capability tests.
// This cheap shader probe is only a prefilter; the real moving scene must pass too.
export const GRAPHICS_VERSION='gpu-tracing-rt-fast-v1';
export const LIMITS={proxyMs:8,sceneMedianMs:20,sceneP95Ms:32,probeDeadlineMs:600,cacheAgeMs:7*24*60*60*1000};
const CACHE_KEY='one-phase-graphics-selection';
const pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));
export function summarize(samples){
  if(!samples.length||samples.some(v=>!Number.isFinite(v)||v<0))return {median:Infinity,p95:Infinity};
  const s=[...samples].sort((a,b)=>a-b);
  return {median:s[Math.floor(s.length*.5)],p95:s[Math.min(s.length-1,Math.floor(s.length*.95))]};
}
export function acceptsScene(samples){const s=summarize(samples);return samples.length>=3&&s.median<=LIMITS.sceneMedianMs&&s.p95<=LIMITS.sceneP95Ms;}
export function readDecision(storage,key,now=Date.now()){
  try{const x=JSON.parse(storage.getItem(CACHE_KEY));return x?.version===GRAPHICS_VERSION&&x.key===key&&x.time<=now&&now-x.time<LIMITS.cacheAgeMs&&['rasterized','ray-traced'].includes(x.mode)?x:null;}catch{return null;}
}
export function writeDecision(storage,key,mode,reason,now=Date.now()){
  try{storage.setItem(CACHE_KEY,JSON.stringify({version:GRAPHICS_VERSION,key,mode,reason,time:now}));}catch{/* Storage is optional. */}
}
export function deviceKey(gl,width,height){
  let renderer='hidden';try{const ext=gl.getExtension('WEBGL_debug_renderer_info');if(ext)renderer=gl.getParameter(ext.UNMASKED_RENDERER_WEBGL);}catch{}
  // Local-only cache. Never send device names or benchmark results anywhere.
  return [renderer,gl.getParameter(gl.MAX_TEXTURE_SIZE),Math.ceil(width/160),Math.ceil(height/90)].join('|');
}
export async function waitForGPU(gl,{timeoutMs=150,signal}={}){
  const sync=gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE,0);if(!sync)throw Error('GPU synchronization unavailable');
  gl.flush();const deadline=performance.now()+timeoutMs;
  try{for(;;){
    if(signal?.aborted)throw new DOMException('Stopped','AbortError');
    if(gl.isContextLost())throw Error('Graphics context lost');
    const status=gl.clientWaitSync(sync,0,0);
    if(status===gl.ALREADY_SIGNALED||status===gl.CONDITION_SATISFIED)return;
    if(status===gl.WAIT_FAILED||performance.now()>deadline)throw Error('GPU did not finish within the frame budget');
    await pause(1);
  }}finally{gl.deleteSync(sync);}
}
export async function probeGPU({signal}={}){
  const canvas=typeof OffscreenCanvas==='function'?new OffscreenCanvas(320,180):document.createElement('canvas');canvas.width=320;canvas.height=180;
  const gl=canvas.getContext('webgl2',{antialias:false,depth:false,stencil:false,powerPreference:'high-performance'});
  if(!gl)return {eligible:false,reason:'WebGL2 unavailable'};
  let program,vertex,fragment;
  const start=performance.now(),samples=[];
  try{
    if(!gl.getExtension('EXT_color_buffer_float')||!gl.getExtension('OES_texture_float_linear'))return {eligible:false,reason:'Required graphics features unavailable'};
    function compile(type,source){const shader=gl.createShader(type);gl.shaderSource(shader,source);gl.compileShader(shader);if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)){const error=gl.getShaderInfoLog(shader);gl.deleteShader(shader);throw Error(error);}return shader;}
    vertex=compile(gl.VERTEX_SHADER,`#version 300 es
      void main(){vec2 p=vec2((gl_VertexID<<1)&2,gl_VertexID&2);gl_Position=vec4(p*2.-1.,0.,1.);}`);
    fragment=compile(gl.FRAGMENT_SHADER,`#version 300 es
      precision highp float;uniform float seed;out vec4 color;
      float sphere(vec3 o,vec3 d,vec3 c){vec3 v=o-c;float b=dot(v,d),h=b*b-dot(v,v)+.16;return h>0.?max(0.,-b-sqrt(h)):1e5;}
      void main(){vec3 sum=vec3(0.);for(int sampleId=0;sampleId<4;sampleId++){
        vec2 uv=(gl_FragCoord.xy+vec2(float(sampleId)*.13,seed)) / vec2(320.,180.);
        vec3 o=vec3(0.,0.,4.),d=normalize(vec3((uv-.5)*vec2(2.,1.125),-1.));
        for(int bounce=0;bounce<2;bounce++){float nearest=1e5;vec3 center=vec3(0.);
          for(int i=0;i<32;i++){float f=float(i);vec3 c=vec3(mod(f,8.)*.8-2.8,floor(f/8.)*.8-1.2,sin(f+seed)*.2);float t=sphere(o,d,c);if(t>.001&&t<nearest){nearest=t;center=c;}}
          if(nearest>1e4){sum+=vec3(.05,.08,.12);break;}o+=d*nearest;vec3 n=normalize(o-center);sum+=vec3(.2,.3,.4)*max(0.,dot(n,normalize(vec3(1.,2.,3.))));o+=n*.001;d=reflect(d,n);
        }}color=vec4(sum/4.,1.);}`);
    program=gl.createProgram();gl.attachShader(program,vertex);gl.attachShader(program,fragment);gl.linkProgram(program);
    if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(program));
    gl.useProgram(program);gl.viewport(0,0,320,180);const seed=gl.getUniformLocation(program,'seed');
    for(let i=0;i<5;i++){
      if(signal?.aborted)throw new DOMException('Stopped','AbortError');
      if(performance.now()-start>LIMITS.probeDeadlineMs)return {eligible:false,reason:'Graphics check exceeded its time budget',samples};
      gl.uniform1f(seed,i*.01);const t=performance.now();gl.drawArrays(gl.TRIANGLES,0,3);await waitForGPU(gl,{signal});
      if(i>0)samples.push(performance.now()-t);
    }
    const timings=summarize(samples);
    return {eligible:timings.median<=LIMITS.proxyMs&&timings.p95<=LIMITS.proxyMs*2,reason:'GPU shader benchmark',...timings,samples,totalMs:performance.now()-start};
  }catch(error){return {eligible:false,reason:String(error.message||error),samples};}
  finally{if(program)gl.deleteProgram(program);if(vertex)gl.deleteShader(vertex);if(fragment)gl.deleteShader(fragment);gl.getExtension('WEBGL_lose_context')?.loseContext();}
}
