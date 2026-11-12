import * as ort from './vendor/ort/ort.webgpu.mjs';
import {detectThreadCapabilities,selectCPUThreads} from './thread-capabilities.js';

/** Exact, stateless DINOv3 + trained Push-T actor; inputs are not resized here. */
export const POLICY_INPUT = Object.freeze({
  width: 224, height: 224, channels: 3, proprio: 14, actions: 8,
  rgbType: 'uint8', rgbLayout: 'NHWC', proprioType: 'float32',
});

const runtimeBase = new URL('./vendor/ort/', import.meta.url);
let runtimePromise;

function asBytes(value, label) {
  if (value instanceof Uint8Array) return value;
  if (value instanceof ArrayBuffer) return new Uint8Array(value);
  throw new TypeError(`${label} must be Uint8Array or ArrayBuffer`);
}

async function cachedFetch(url) {
  let cache;
  try {
    if (typeof caches !== 'undefined') {
      cache = await caches.open('one-phase-ort-1.31.1');
      const cached = await cache.match(url);
      if (cached) return cached;
    }
  } catch { /* Inference still works when storage is unavailable or full. */ }
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Runtime download failed (${response.status}): ${url}`);
  if (cache) {
    try { await cache.put(url, response.clone()); } catch { /* Cache eviction is recoverable. */ }
  }
  return response;
}

async function runtimeBytes(onProgress) {
  const response = await cachedFetch(new URL('runtime-manifest.json', runtimeBase).href);
  const manifest = await response.json();
  const result = new Uint8Array(manifest.wasm_bytes);
  let offset = 0;
  for (const asset of manifest.assets) {
    const response = await cachedFetch(new URL(asset.path, runtimeBase).href);
    const data = new Uint8Array(await response.arrayBuffer());
    if (data.byteLength !== asset.bytes) throw new Error(`Incomplete runtime asset: ${asset.path}`);
    if (globalThis.crypto?.subtle) {
      const digest = new Uint8Array(await crypto.subtle.digest('SHA-256', data));
      const hash = Array.from(digest, (byte) => byte.toString(16).padStart(2, '0')).join('');
      if (hash !== asset.sha256) throw new Error(`Runtime asset checksum failed: ${asset.path}`);
    }
    result.set(data, offset);
    offset += data.byteLength;
    onProgress({ stage: 'runtime', loaded: offset, total: result.byteLength, message: 'Loading browser inference runtime' });
  }
  return result;
}

/**
 * @param {Uint8Array|ArrayBuffer} modelBytes The small ONNX graph file.
 * @param {object} options
 * @param {Array<{path:string,data:Uint8Array|ArrayBuffer}>} options.externalData
 *   Exact filenames and downloaded buffers from manifest.external_data.
 * @param {'auto'|'webgpu'|'wasm'} [options.backend='auto']
 * @param {'auto'|number} [options.cpuThreads='auto'] Feature-gated CPU threads, capped at eight.
 * @param {Uint8Array|ArrayBuffer} [options.wasmBinary] Optional preloaded joined runtime chunks.
 * @param {Function} [options.onProgress] Receives {stage,message,loaded?,total?}.
 * @returns {Promise<{infer:Function,dispose:Function,backend:string,lastInferenceMs:number}>}
 *
 * infer(rgb, proprio) returns Float32Array(8), clipped in graph. RGB is packed
 * RGB uint8 [224,224,3], top row first. Proprio is arm qpos[0:7] followed by
 * arm qvel[0:7], radians and radians/s. No previous-action input or history.
 * Call this adapter inside a module worker to keep CPU inference off the UI.
 */
export async function createPolicy(modelBytes, options = {}) {
  const backend = options.backend || (options.preferWebGPU === false ? 'wasm' : 'auto');
  const onStatus = options.onStatus;
  const onProgress = options.onProgress || ((event) => onStatus?.(event.message));
  if (!['auto', 'webgpu', 'wasm'].includes(backend)) throw new TypeError(`Unknown inference backend: ${backend}`);
  let graph = asBytes(modelBytes, 'modelBytes');
  let externalData = (options.externalData || []).map(({ path, data }) => ({ path, data: asBytes(data, path) }));
  ort.env.logLevel = 'warning';
  const capabilities = detectThreadCapabilities();
  const cpuThreads = selectCPUThreads(capabilities, options.cpuThreads ?? 'auto');
  ort.env.wasm.numThreads = cpuThreads;
  ort.env.wasm.proxy = false; // The caller may already run this module in a dedicated worker.
  ort.env.wasm.wasmPaths = { mjs: new URL('ort-wasm-simd-threaded.asyncify.mjs', runtimeBase).href };
  if (!runtimePromise) {
    runtimePromise = options.wasmBinary
      ? Promise.resolve(asBytes(options.wasmBinary, 'wasmBinary'))
      : runtimeBytes(onProgress);
  }
  try { ort.env.wasm.wasmBinary = await runtimePromise; }
  catch (error) { runtimePromise = null; throw error; }

  let useGPU = false;
  if (backend !== 'wasm' && globalThis.navigator?.gpu) {
    try { useGPU = Boolean(await navigator.gpu.requestAdapter()); } catch { useGPU = false; }
  }
  if (backend === 'webgpu' && !useGPU) throw new Error('WebGPU is unavailable on this device. Use the automatic or WASM backend.');
  let actualBackend = useGPU ? 'webgpu' : 'wasm';
  let session;
  const makeSession = (provider) => ort.InferenceSession.create(graph, {
    executionProviders: provider === 'webgpu' ? ['webgpu', 'wasm'] : ['wasm'],
    externalData, graphOptimizationLevel: 'all',
  });
  onProgress({ stage: 'initialize', threads: cpuThreads, capabilities, message: `Preparing ${actualBackend === 'webgpu' ? 'WebGPU' : `CPU WebAssembly (${cpuThreads} thread${cpuThreads === 1 ? '' : 's'})`} policy` });
  try { session = await makeSession(actualBackend); }
  catch (error) {
    if (actualBackend !== 'webgpu' || backend === 'webgpu') throw error;
    actualBackend = 'wasm';
    onProgress({ stage: 'fallback', message: 'WebGPU initialization failed; using CPU WebAssembly' });
    session = await makeSession('wasm');
  }
  // WASM has no further backend to fall back to. Release our source-weight
  // references after ORT has loaded them, avoiding a persistent duplicate.
  if (actualBackend === 'wasm') { graph = null; externalData = []; }
  let busy = false;
  let disposed = false;
  let lastInferenceMs = 0;
  let lastActionMean = null;
  return {
    get backend() { return actualBackend; },
    get threads() { return ort.env.wasm.numThreads; },
    get capabilities() { return {...capabilities, selectedThreads: ort.env.wasm.numThreads}; },
    get lastInferenceMs() { return lastInferenceMs; },
    get lastActionMean() { return lastActionMean; },
    async infer(rgb, proprio) {
      if (disposed) throw new Error('Policy has been disposed');
      if (busy) throw new Error('Wait for the previous policy inference to finish');
      if (!(rgb instanceof Uint8Array) || rgb.length !== 224 * 224 * 3) throw new TypeError('rgb must be Uint8Array(224*224*3), RGB order');
      if (!(proprio instanceof Float32Array) || proprio.length !== 14 || !proprio.every(Number.isFinite)) throw new TypeError('proprio must contain 14 finite Float32 values');
      busy = true;
      const inputs = {
        rgb: new ort.Tensor('uint8', rgb, [1, 224, 224, 3]),
        proprio: new ort.Tensor('float32', proprio, [1, 14]),
      };
      let outputs;
      const start = performance.now();
      try {
        try { outputs = await session.run(inputs); }
        catch (error) {
          if (actualBackend !== 'webgpu' || backend === 'webgpu') throw error;
          await session.release();
          actualBackend = 'wasm';
          onProgress({ stage: 'fallback', message: 'WebGPU inference failed; using CPU WebAssembly' });
          session = await makeSession('wasm');
          graph = null;
          externalData = [];
          outputs = await session.run(inputs);
        }
        const action = new Float32Array(outputs.action.data);
        if (action.length !== 8 || !action.every(Number.isFinite)) throw new Error('Policy produced invalid actions');
        lastActionMean = new Float32Array(outputs.action_mean.data);
        lastInferenceMs = performance.now() - start;
        return action;
      } finally {
        for (const tensor of Object.values(outputs || {})) tensor.dispose();
        for (const tensor of Object.values(inputs)) tensor.dispose();
        busy = false;
      }
    },
    reset() { /* This checkpoint is stateless: history length 1, no prior actions. */ },
    async dispose() {
      if (busy) throw new Error('Wait for the current inference before disposing');
      if (!disposed) { disposed = true; await session.release(); }
    },
  };
}
