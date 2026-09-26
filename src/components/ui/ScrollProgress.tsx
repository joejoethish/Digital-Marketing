'use client';

import { useEffect, useRef } from 'react';

/**
 * Thin scroll-progress bar fixed at the very top of the viewport.
 * Gradient animates across it continuously for a cinematic feel.
 * Uses scaleX transform so only compositing is needed (no layout).
 */
export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const update = () => {
      const scrolled = window.scrollY;
      const total    = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? Math.min(scrolled / total, 1) : 0;
      bar.style.transform = `scaleX(${progress})`;
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div className="sp-wrap" aria-hidden="true">
      <div ref={barRef} className="sp-bar" />
    </div>
  );
}
