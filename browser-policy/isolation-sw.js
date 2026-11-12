/* First-party isolation shim for static hosting. No caching, offline HTML, or inference. */
self.addEventListener('install', event => event.waitUntil(self.skipWaiting()));
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));
self.addEventListener('fetch', event => {
  const request = event.request;
  let url;
  try { url = new URL(request.url); } catch { return; }
  if (url.origin !== self.location.origin || !['http:', 'https:'].includes(url.protocol)) return;
  // Chromium can emit this invalid Request combination; leave native handling untouched.
  if (request.cache === 'only-if-cached' && request.mode !== 'same-origin') return;
  event.respondWith((async () => {
    // Preserve credentials, auth cookies, redirect mode, Range headers and body exactly.
    const response = await fetch(request);
    if (!['basic', 'default'].includes(response.type) || response.status === 0 || response.redirected || (response.status >= 300 && response.status < 400 && response.status !== 304)) return response;
    if (response.url && new URL(response.url).origin !== self.location.origin) return response;
    const headers = new Headers(response.headers);
    headers.set('Cross-Origin-Opener-Policy', 'same-origin');
    headers.set('Cross-Origin-Embedder-Policy', 'require-corp');
    headers.set('Cross-Origin-Resource-Policy', 'same-origin');
    return new Response(response.body, {status: response.status, statusText: response.statusText, headers});
  })());
});
