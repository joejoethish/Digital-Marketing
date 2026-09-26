'use client';

import { useEffect, useRef, useState } from 'react';

type CursorCtx = 'default' | 'link' | 'cta' | 'card';

const CTX_MAP: Record<string, CursorCtx> = {
  A:      'link',
  BUTTON: 'cta',
};

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos     = useRef({ x: -200, y: -200 });
  const ring    = useRef({ x: -200, y: -200 });
  const rafRef  = useRef<number | null>(null);
  const [ctx, setCtx]     = useState<CursorCtx>('default');
  const [label, setLabel] = useState('');
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const EASE = 0.10; // ring lag (lower = more lag)

    /* ── RAF loop — zero React state updates for position ─────────── */
    const tick = () => {
      const mx = pos.current.x;
      const my = pos.current.y;
      ring.current.x += (mx - ring.current.x) * EASE;
      ring.current.y += (my - ring.current.y) * EASE;

      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${mx}px,${my}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate(${ring.current.x.toFixed(1)}px,${ring.current.y.toFixed(1)}px)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    /* ── Mouse position ────────────────────────────────────────────── */
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    /* ── Context detection — reads nearest interactive ancestor ───── */
    const detect = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        'a, button, [data-cursor-label], [data-cursor]'
      ) as HTMLElement | null;

      if (interactive) {
        const tag  = interactive.tagName as keyof typeof CTX_MAP;
        const lbl  = interactive.dataset.cursorLabel ?? '';
        const ctxVal: CursorCtx = (CTX_MAP[tag] as CursorCtx) ?? 'link';
        setCtx(ctxVal);
        setLabel(lbl);
      } else {
        setCtx('default');
        setLabel('');
      }
    };

    /* ── Press ─────────────────────────────────────────────────────── */
    const onDown = () => setPressed(true);
    const onUp   = () => setPressed(false);

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', detect);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup',   onUp);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', detect);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup',   onUp);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const isHover = ctx !== 'default';

  return (
    <>
      {/* Primary: snaps instantly to cursor */}
      <div
        ref={dotRef}
        className={[
          'cd',
          isHover  ? 'cd--hover'   : '',
          pressed  ? 'cd--pressed' : '',
        ].join(' ')}
        aria-hidden="true"
      />

      {/* Secondary: lags behind with spring ease */}
      <div
        ref={ringRef}
        className={[
          'cr',
          isHover  ? 'cr--hover'   : '',
          pressed  ? 'cr--pressed' : '',
        ].join(' ')}
        aria-hidden="true"
      >
        {label && <span className="cr-label">{label}</span>}
      </div>
    </>
  );
}
