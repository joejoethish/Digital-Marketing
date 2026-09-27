'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

/** Site-wide inertial scrolling. Disabled for users who prefer reduced motion. */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true, autoRaf: true });
    return () => lenis.destroy();
  }, []);

  return null;
}
