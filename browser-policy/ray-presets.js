// Mirrors ManiSkill PREBUILT_SHADER_CONFIGS['rt-fast'] sampling/path limits.
// Native SAPIEN uses OptiX denoising; this browser renderer uses a spatial filter.
// Different integrators and denoisers mean this is not a pixel-identical port.
export const RT_FAST=Object.freeze({
  id:'rt-fast-browser-v1',samplesPerFrame:2,pathDepth:1,transmissiveBounces:0,
  maxWidth:640,maxHeight:360,
  denoiser:Object.freeze({sigma:2,threshold:.4,kSigma:1}),
});
