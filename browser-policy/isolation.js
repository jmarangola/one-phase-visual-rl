/** First-party static-host fallback for shared-memory WASM; never required to run the demo. */
const ATTEMPT_KEY = 'one-phase-isolation-attempt-v2';

export function createIsolationBootstrap(environment = globalThis) {
  let pending;
  return function ensureIsolation({workerURL = '/isolation-sw.js', timeoutMs = 5000} = {}) {
    if (pending) return pending;
    pending = attempt(workerURL, timeoutMs);
    return pending;
  };

  async function attempt(workerURL, timeoutMs) {
    const env = environment;
    try {
      // A child cannot make a non-isolated parent isolated. Let the parent bootstrap once.
      if (env.top && env.top !== env) return false;
      const serviceWorker = env.navigator?.serviceWorker;
      if (env.crossOriginIsolated || !env.isSecureContext || !serviceWorker || serviceWorker.controller) return false;
      const script = new URL(workerURL, env.location.href);
      script.hash = '';
      const scope = new URL('./', script).pathname;
      const attemptKey = ATTEMPT_KEY + ':' + scope;
      if (script.origin !== env.location.origin || !['http:', 'https:'].includes(script.protocol)) return false;
      // Without reliable session storage, skip automatic reload rather than risk a loop.
      if (env.sessionStorage.getItem(attemptKey)) return false;
      env.sessionStorage.setItem(attemptKey, 'attempted');
      if (env.sessionStorage.getItem(attemptKey) !== 'attempted') return false;
      const controlled = await new Promise(resolve => {
        let finished = false;
        const finish = value => {
          if (finished) return;
          finished = true;
          env.clearTimeout(timer);
          serviceWorker.removeEventListener('controllerchange', check);
          resolve(value);
        };
        const check = () => {
          if (serviceWorker.controller?.scriptURL === script.href) finish(true);
        };
        const timer = env.setTimeout(() => finish(false), Math.max(1, Math.min(15000, timeoutMs)));
        serviceWorker.addEventListener('controllerchange', check);
        // Do not replace another application's service worker in this scope.
        Promise.resolve().then(() => serviceWorker.getRegistration?.(scope)).then(existing => {
          if (finished) return;
          const owner = existing?.active || existing?.waiting || existing?.installing;
          if (owner && owner.scriptURL !== script.href) { finish(false); return; }
          return serviceWorker.register(script.href, {scope, updateViaCache: 'none'}).then(check);
        }).catch(() => finish(false));
      });
      if (!controlled) return false;
      env.location.reload();
      return true;
    } catch {
      return false; // Unsupported/blocked service workers or storage keep the single-thread path.
    }
  }
}

/** Resolve true only when a one-time top-level reload has been requested. */
export const ensureIsolation = createIsolationBootstrap();
