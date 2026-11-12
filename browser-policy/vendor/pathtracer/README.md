Optional spectator-only GPU shader path tracer. It does not expose native RT cores.

Bundled with esbuild from npm three-gpu-pathtracer@0.0.24 (MIT),
three-mesh-bvh@0.9.1 (MIT), and Three@0.181.0 (MIT, licensed in ../three).
The denoising shader incorporates glslSmartDeNoise (Michele Morrone, BSD-2-Clause).
License texts accompany this bundle. The Three import stays external and uses
this demo's import map, ensuring a single Three instance. The Three Pass.js helper
is included in the bundle.

Entry exports:
- WebGLPathTracer from three-gpu-pathtracer/src/core/WebGLPathTracer.js
- DenoiseMaterial from three-gpu-pathtracer/src/materials/fullscreen/DenoiseMaterial.js
- FullScreenQuad from three/examples/jsm/postprocessing/Pass.js

Build with esbuild --bundle --format=esm --platform=browser --external:three.
Resolve three/examples/jsm/postprocessing/Pass.js to the pinned Three version.
Do not replace with current upstream main: it has a different WebGPU API.
