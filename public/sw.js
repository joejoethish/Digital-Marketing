/* DEEYORA service worker — serves the precached site when offline.
 * Pages and assets are downloaded into Cache Storage by src/lib/offline.ts. */

const RUNTIME_CACHE = 'deeyora-runtime';
const NAV_TIMEOUT_MS = 4000;

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));

const isStaticAsset = (url) =>
  url.pathname.startsWith('/_next/static/') ||
  /\.(?:png|jpe?g|webp|avif|gif|svg|ico|woff2?)$/.test(url.pathname);

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  // Warm-up downloads write straight into the versioned cache themselves.
  if (request.headers.get('x-deeyora-precache')) return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname === '/sw.js' || url.pathname === '/precache-manifest.json') return;
  // RSC payloads depend on router state; let them hit the network. When
  // offline, Next.js falls back to a full navigation, which is served below.
  if (request.headers.get('RSC') === '1' || url.searchParams.has('_rsc')) return;

  if (request.mode === 'navigate') {
    event.respondWith(navigate(request, url));
  } else if (isStaticAsset(url)) {
    event.respondWith(cacheFirst(request));
  }
});

// Static assets are content-hashed, so cache-first is always safe.
async function cacheFirst(request) {
  const hit = await caches.match(request);
  if (hit) return hit;
  const res = await fetch(request);
  if (res.ok) {
    const cache = await caches.open(RUNTIME_CACHE);
    cache.put(request, res.clone());
  }
  return res;
}

// Pages: fresh from the network when possible, cached copy when offline or slow.
async function navigate(request, url) {
  const network = fetch(request);
  const timeout = new Promise((resolve) => setTimeout(() => resolve(null), NAV_TIMEOUT_MS));
  try {
    const res = await Promise.race([network, timeout]);
    if (res) return res;
  } catch {
    /* offline — fall through to cache */
  }
  const cached =
    (await caches.match(url.pathname, { ignoreSearch: true })) ||
    (await caches.match(url.pathname.replace(/\/$/, '') || '/', { ignoreSearch: true }));
  if (cached) return cached;
  try {
    return await network;
  } catch {
    return (
      (await caches.match('/')) ||
      new Response('<h1>You are offline</h1>', { status: 503, headers: { 'Content-Type': 'text/html' } })
    );
  }
}
