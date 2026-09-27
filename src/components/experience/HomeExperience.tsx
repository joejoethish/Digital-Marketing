'use client';

import { useEffect, useRef, useState } from 'react';
import { startWarmup, subscribeWarmup } from '@/lib/offline';
import { stageStore } from './stageStore';

const MIN_LOADER_MS = 900;
/** On very slow networks, stop waiting for the offline cache (it keeps filling in the background). */
const MAX_ASSET_WAIT_MS = 15000;
const STAGE_WEIGHT = 0.3;

/**
 * Client shell for the immersive home page: preloader, film grain and
 * scroll-triggered text reveals. The WebGL stage itself lives in the root
 * layout. The preloader shows real progress: the whole site is downloaded for
 * offline use while the 3D scene compiles. It only runs on a fresh page load —
 * navigating back to home later skips it.
 */
export default function HomeExperience() {
  const [loaded, setLoaded] = useState(() => stageStore.hasPlayedIntro());
  const [count, setCount] = useState(0);
  const [status, setStatus] = useState('Preparing the experience');
  const state = useRef({ stage: false, assets: 0, assetsDone: false });

  useEffect(() => {
    if (loaded) return;
    const offReady = stageStore.onReady(() => {
      state.current.stage = true;
    });
    const unsubscribe = subscribeWarmup((p, done) => {
      state.current.assets = p;
      state.current.assetsDone = done;
    });
    startWarmup();

    const start = performance.now();
    let last = start;
    let raf = 0;
    let shown = 0;
    let finished = false;
    const loop = () => {
      const s = state.current;
      const now = performance.now();
      const elapsed = now - start;
      const dt = Math.min(now - last, 250) / 1000;
      last = now;
      const assetsReady = s.assetsDone || elapsed > MAX_ASSET_WAIT_MS;
      const target = (s.stage ? STAGE_WEIGHT : 0) + (assetsReady ? 1 : s.assets) * (1 - STAGE_WEIGHT);
      shown += (target * 100 - shown) * (1 - Math.exp(-dt * 7));
      if (s.stage && assetsReady && elapsed > MIN_LOADER_MS && shown > 99.4) shown = 100;
      setCount(Math.floor(shown));
      setStatus(!assetsReady ? 'Downloading the site for offline use' : !s.stage ? 'Building the growth engine' : 'Ready');

      if (shown >= 100 && !finished) {
        finished = true;
        setTimeout(() => setLoaded(true), 150);
        return;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      unsubscribe();
      offReady();
    };
    // Runs once per mount; `loaded` only matters for the initial value.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Page chrome state + text reveals start after the loader clears.
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('exp-home');
    return () => {
      root.classList.remove('exp-home', 'is-ready');
    };
  }, []);

  useEffect(() => {
    if (!loaded) return;
    stageStore.playIntro();
    document.documentElement.classList.add('is-ready');
    const targets = document.querySelectorAll<HTMLElement>('[data-reveal]');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [loaded]);

  return (
    <>
      <div className={`exp-loader ${loaded ? 'is-done' : ''}`} aria-hidden={loaded} role="status">
        <div className="exp-loader-brand">
          <span className="accent">D</span>EEYORA
        </div>
        <div className="exp-loader-meta">
          <span>{status}</span>
          <span className="exp-loader-count">{String(count).padStart(3, '0')}</span>
        </div>
        <div className="exp-loader-bar">
          <span style={{ transform: `scaleX(${count / 100})` }} />
        </div>
      </div>
    </>
  );
}
