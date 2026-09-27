// Offline warm-up: downloads every page and static asset listed in
// /precache-manifest.json (generated after `next build`) into Cache Storage,
// and registers the service worker that serves them when the network is gone.
// Progress is observable so the home preloader can show real numbers.

type Listener = (progress: number, done: boolean) => void;

const CACHE_PREFIX = 'deeyora-';
const RUNTIME_CACHE = `${CACHE_PREFIX}runtime`;
const CONCURRENCY = 6;

interface PrecacheManifest {
  version: string;
  pages: string[];
  assets: string[];
}

let progress = 0;
let done = false;
let started: Promise<void> | null = null;
const listeners = new Set<Listener>();

function emit(p: number, finished = false) {
  progress = Math.max(progress, Math.min(1, p));
  done = done || finished;
  listeners.forEach((fn) => fn(progress, done));
}

export function subscribeWarmup(fn: Listener) {
  listeners.add(fn);
  fn(progress, done);
  return () => {
    listeners.delete(fn);
  };
}

export function offlineSupported() {
  return (
    process.env.NODE_ENV === 'production' &&
    typeof window !== 'undefined' &&
    'caches' in window &&
    'serviceWorker' in navigator
  );
}

/** Removes any service worker left over from a production run (dev only). */
export async function unregisterServiceWorkers() {
  if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) return;
  const regs = await navigator.serviceWorker.getRegistrations();
  await Promise.all(regs.map((r) => r.unregister()));
}

async function precache(manifest: PrecacheManifest) {
  const cacheName = `${CACHE_PREFIX}${manifest.version}`;
  const cache = await caches.open(cacheName);
  const queue = [...manifest.pages, ...manifest.assets];
  const total = queue.length || 1;
  let completed = 0;

  const worker = async () => {
    for (let url = queue.shift(); url; url = queue.shift()) {
      try {
        if (!(await cache.match(url))) {
          const res = await fetch(url, { cache: 'no-cache', headers: { 'x-deeyora-precache': '1' } });
          if (res.ok) await cache.put(url, res);
        }
      } catch {
        /* one failed file must not block the rest */
      }
      completed++;
      emit(completed / total);
    }
  };
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));

  // Drop caches from previous builds.
  const keys = await caches.keys();
  await Promise.all(
    keys
      .filter((k) => k.startsWith(CACHE_PREFIX) && k !== cacheName && k !== RUNTIME_CACHE)
      .map((k) => caches.delete(k)),
  );
}

export function startWarmup() {
  if (started) return started;
  started = (async () => {
    if (!offlineSupported()) return emit(1, true);

    navigator.serviceWorker.register('/sw.js').catch(() => {});

    try {
      const res = await fetch('/precache-manifest.json', { cache: 'no-store' });
      if (!res.ok) throw new Error(`manifest ${res.status}`);
      await precache((await res.json()) as PrecacheManifest);
    } catch {
      // Offline or no manifest: whatever is already cached keeps working.
    }
    emit(1, true);
  })();
  return started;
}
