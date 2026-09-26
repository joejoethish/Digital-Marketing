'use client';

import { useRef, useEffect, ReactNode } from 'react';

interface MagneticElementProps {
  children: ReactNode;
  strength?: number;   // 0–1, how far the element drifts
  className?: string;
}

/**
 * Wraps any element in a magnetic hover interaction.
 * On mouseenter the element starts lerp-following the cursor
 * at the configured strength; on mouseleave it springs back.
 * Uses a single shared RAF — stops the loop automatically when idle.
 * Disabled on touch devices and prefers-reduced-motion.
 */
export default function MagneticElement({
  children,
  strength = 0.32,
  className = '',
}: MagneticElementProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const rafRef  = useRef<number | null>(null);
  const s       = useRef({ tx: 0, ty: 0, cx: 0, cy: 0, active: false });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const el = wrapRef.current;
    if (!el) return;

    const EASE = 0.11;

    const tick = () => {
      const { tx, ty, cx, cy, active } = s.current;
      s.current.cx += (tx - cx) * EASE;
      s.current.cy += (ty - cy) * EASE;

      el.style.transform = `translate(${s.current.cx.toFixed(2)}px,${s.current.cy.toFixed(2)}px)`;

      const idle =
        !active &&
        Math.abs(s.current.tx - s.current.cx) < 0.04 &&
        Math.abs(s.current.ty - s.current.cy) < 0.04;

      if (idle) {
        el.style.transform = '';
        rafRef.current = null;
      } else {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    const start = () => {
      if (!rafRef.current) rafRef.current = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      const r  = el.getBoundingClientRect();
      s.current.tx = (e.clientX - (r.left + r.width  / 2)) * strength;
      s.current.ty = (e.clientY - (r.top  + r.height / 2)) * strength;
      start();
    };

    const onEnter = () => {
      s.current.active = true;
      el.addEventListener('mousemove', onMove);
      start();
    };

    const onLeave = () => {
      s.current.active = false;
      s.current.tx = 0;
      s.current.ty = 0;
      el.removeEventListener('mousemove', onMove);
      start();
    };

    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);

    return () => {
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
      el.removeEventListener('mousemove', onMove);
      if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
      el.style.transform = '';
    };
  }, [strength]);

  return (
    <div ref={wrapRef} className={`mag-wrap ${className}`}>
      {children}
    </div>
  );
}
