'use client';

import { useEffect } from 'react';
import { offlineSupported, startWarmup, unregisterServiceWorkers } from '@/lib/offline';
import { flushOutbox } from '@/lib/enquiry';

/**
 * Site-wide: caches the whole site for offline use, and sends any contact
 * enquiries that were written while offline. The home page preloader starts
 * the cache warm-up itself (to show progress); on other pages it runs once idle.
 */
export default function OfflineCache() {
  useEffect(() => {
    flushOutbox();
    const onOnline = () => flushOutbox();
    window.addEventListener('online', onOnline);
    return () => window.removeEventListener('online', onOnline);
  }, []);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      unregisterServiceWorkers();
      return;
    }
    if (!offlineSupported()) return;
    const run = () => startWarmup();
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(run, { timeout: 3000 });
      return () => window.cancelIdleCallback(id);
    }
    const t = setTimeout(run, 1500);
    return () => clearTimeout(t);
  }, []);

  return null;
}
