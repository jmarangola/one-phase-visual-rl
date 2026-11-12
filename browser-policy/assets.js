const CACHE_NAME = 'one-phase-browser-assets-v1';

export async function downloadAssets(manifest, onProgress, signal) {
  const files = manifest.files;
  const total = files.reduce((sum, file) => sum + file.bytes, 0);
  const loaded = new Map(files.map(file => [file.url, 0]));
  const buffers = new Map();
  const controller = new AbortController();
  const abort = () => controller.abort(signal?.reason);
  if (signal?.aborted) abort();
  else signal?.addEventListener('abort', abort, {once: true});
  let cachedBytes = 0, persistedBytes = 0, cacheWriteFailed = false, cache = null;
  try { if ('caches' in globalThis) cache = await caches.open(CACHE_NAME); } catch {}
  const report = () => onProgress?.({
    loaded: [...loaded.values()].reduce((a, b) => a + b, 0), total,
    cachedBytes, persistedBytes, cacheAvailable: !!cache, cacheWriteFailed,
  });
  const checkAbort = () => {
    if (controller.signal.aborted) throw controller.signal.reason || new DOMException('Download cancelled', 'AbortError');
  };
  const evict = async url => { try { await cache?.delete(url); } catch {} };
  const verify = async (bytes, file) => {
    if (bytes.byteLength !== file.bytes) throw new Error(`Incomplete download: ${file.url}`);
    const digest = await crypto.subtle.digest('SHA-256', bytes);
    const hash = Array.from(new Uint8Array(digest), b => b.toString(16).padStart(2, '0')).join('');
    if (hash !== file.sha256) throw new Error(`Asset verification failed: ${file.url}`);
    checkAbort();
  };
  let index = 0;
  async function worker() {
    while (index < files.length) {
      checkAbort();
      const file = files[index++];
      const url = new URL(file.url, import.meta.url);
      url.searchParams.set('v', file.sha256);
      let bytes = null;
      // An evicted, unreadable or corrupt entry is a cache miss, not a permanent startup failure.
      try {
        const cached = cache && await cache.match(url.href);
        if (cached) {
          const candidate = new Uint8Array(await cached.arrayBuffer());
          await verify(candidate, file);
          bytes = candidate;
        }
      } catch { await evict(url.href); }
      checkAbort();
      if (bytes) {
        cachedBytes += bytes.byteLength;
        persistedBytes += bytes.byteLength;
        loaded.set(file.url, bytes.byteLength);
        buffers.set(file.url, bytes);
        report();
        continue;
      }
      const response = await fetch(url, {signal: controller.signal});
      if (!response.ok) throw new Error(`Could not download ${file.url} (${response.status})`);
      if (response.body) {
        const reader = response.body.getReader();
        // Avoid retaining all stream chunks alongside a second, combined model buffer on mobile.
        bytes = new Uint8Array(file.bytes);
        let length = 0, complete = false;
        try {
          while (true) {
            checkAbort();
            const {done, value} = await reader.read();
            if (done) { complete = true; break; }
            if (length + value.byteLength > file.bytes) throw new Error(`Unexpected download size: ${file.url}`);
            bytes.set(value, length);
            length += value.byteLength;
            loaded.set(file.url, length);
            report();
          }
          if (length !== file.bytes) throw new Error(`Incomplete download: ${file.url}`);
        } finally {
          if (!complete) { try { await reader.cancel(); } catch {} }
          reader.releaseLock();
        }
      } else {
        bytes = new Uint8Array(await response.arrayBuffer());
        loaded.set(file.url, bytes.byteLength);
        report();
      }
      await verify(bytes, file);
      buffers.set(file.url, bytes);
      if (cache) {
        try {
          await cache.put(url.href, new Response(bytes, {headers: {'Content-Type': 'application/octet-stream'}}));
          persistedBytes += bytes.byteLength;
        } catch { cacheWriteFailed = true; }
      }
      report();
    }
  }
  const workers = Array.from({length: Math.min(4, files.length)}, () => worker().catch(error => {
    controller.abort(error);
    throw error;
  }));
  try {
    report();
    await Promise.all(workers);
    // Remove superseded hashes only after this version has loaded successfully.
    // A failed/denied cache operation must never prevent a live browser rollout.
    if (cache && persistedBytes === total) {
      try {
        const current = new Map(files.map(file => {
          const url = new URL(file.url, import.meta.url); url.searchParams.set('v', file.sha256);
          return [url.origin + url.pathname, url.href];
        }));
        for (const request of await cache.keys()) {
          const url = new URL(request.url), expected = current.get(url.origin + url.pathname);
          if (expected && expected !== url.href) await evict(url.href);
        }
      } catch {}
    }
    return buffers;
  } catch (error) {
    controller.abort(error);
    await Promise.allSettled(workers);
    buffers.clear();
    throw error;
  } finally {
    signal?.removeEventListener('abort', abort);
  }
}

export function decodeJSON(bytes) { return JSON.parse(new TextDecoder().decode(bytes)); }
