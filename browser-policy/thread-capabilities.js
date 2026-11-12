/** Feature-based selection; no browser-name or operating-system assumptions. */
export function selectCPUThreads(capabilities, requested = 'auto') {
  if (!capabilities.crossOriginIsolated || !capabilities.sharedArrayBuffer || !capabilities.sharedWasmMemory) return 1;
  const cores = Number(capabilities.hardwareConcurrency);
  if (!Number.isFinite(cores) || cores < 2) return 1;
  const automatic = Math.max(1, Math.min(8, Math.floor(cores / 2)));
  if (requested === undefined || requested === 'auto') return automatic;
  const count = Number(requested);
  return Number.isInteger(count) && count >= 1 ? Math.min(automatic, count) : 1;
}

export function detectThreadCapabilities(scope = globalThis) {
  const hardwareConcurrency = Number(scope.navigator?.hardwareConcurrency);
  const capabilities = {
    hardwareConcurrency: Number.isFinite(hardwareConcurrency) && hardwareConcurrency >= 1 ? Math.floor(hardwareConcurrency) : null,
    crossOriginIsolated: scope.crossOriginIsolated === true,
    sharedArrayBuffer: typeof scope.SharedArrayBuffer === 'function',
    sharedWasmMemory: false,
  };
  if (capabilities.crossOriginIsolated && capabilities.sharedArrayBuffer && typeof scope.WebAssembly?.Memory === 'function') {
    try {
      const memory = new scope.WebAssembly.Memory({initial: 1, maximum: 1, shared: true});
      capabilities.sharedWasmMemory = memory.buffer instanceof scope.SharedArrayBuffer;
    } catch { /* A browser can expose SharedArrayBuffer but deny shared WASM memory. */ }
  }
  return {...capabilities, automaticThreads: selectCPUThreads(capabilities)};
}
