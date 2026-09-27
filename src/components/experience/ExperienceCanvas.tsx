'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { ENGINE_LAYERS } from './layers';
import { stageStore } from './stageStore';
import type { Stage } from './engine/Stage';

/**
 * The site-wide WebGL stage. Mounted once in the root layout so the Growth
 * Engine survives page navigation and glides into each page's first pose;
 * every page describes its own choreography with `data-kf` anchors.
 */
export default function ExperienceCanvas() {
  const pathname = usePathname();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labelRefs = useRef<HTMLDivElement[]>([]);
  const stageRef = useRef<Stage | null>(null);
  const pathRef = useRef(pathname);
  pathRef.current = pathname;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let disposed = false;

    const ready = () => {
      document.documentElement.classList.add('stage-ready');
      stageStore.markReady();
      // The home page plays the intro after its preloader; elsewhere, straight away.
      if (pathRef.current !== '/') stageStore.playIntro();
    };

    import('./engine/Stage')
      .then(({ Stage }) =>
        Stage.create({
          canvas,
          labels: labelRefs.current,
          reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
          onReady: ready,
        }),
      )
      .then((stage) => {
        if (disposed) return stage.dispose();
        stageRef.current = stage;
        stageStore.setPlayer(() => stage.playIntro());
      })
      .catch((err) => {
        console.error('[DEEYORA] WebGL experience unavailable:', err);
        if (disposed) return;
        document.documentElement.classList.add('no-webgl');
        stageStore.markReady();
      });

    return () => {
      disposed = true;
      stageStore.setPlayer(null);
      stageRef.current?.dispose();
      stageRef.current = null;
      document.documentElement.classList.remove('no-webgl');
    };
  }, []);

  // New page: re-read its anchors once the DOM has settled.
  useEffect(() => {
    let raf = requestAnimationFrame(() => {
      raf = requestAnimationFrame(() => stageRef.current?.refresh());
    });
    const late = setTimeout(() => stageRef.current?.refresh(), 600);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(late);
    };
  }, [pathname]);

  // Text reveals on every page except home (which waits for its preloader).
  useEffect(() => {
    if (pathname === '/') return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    );
    const raf = requestAnimationFrame(() =>
      document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => io.observe(el)),
    );
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [pathname]);

  return (
    <>
      <canvas ref={canvasRef} className="exp-canvas" aria-hidden="true" />
      <div className="exp-grain" aria-hidden="true" />
      <div className="exp-labels" aria-hidden="true">
        {ENGINE_LAYERS.map((layer, i) => (
          <div
            key={layer.n}
            className="exp-label"
            ref={(el) => {
              if (el) labelRefs.current[i] = el;
            }}
          >
            <span className="exp-label-line" />
            <span className="exp-label-num">{layer.n}</span>
            <div className="exp-label-body">
              <strong>{layer.title}</strong>
              <p>{layer.description}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
