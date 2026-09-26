'use client';

import { useEffect, useRef } from 'react';

/* ── Constants ─────────────────────────────────────────────────────── */
const COLS = 12;
const ROWS = 8;
const RADIUS = 160; // px — interaction radius around cursor

const V_BASE  = 0.045; // vertical line base opacity
const V_PEAK  = 0.20;  // vertical line peak opacity (on cursor)
const H_BASE  = 0.020; // horizontal line base opacity
const H_PEAK  = 0.09;  // horizontal line peak opacity
const DOT_BASE = 0.055;
const DOT_PEAK = 0.38;

// purple rgb for lines, violet for dots
const P = [139, 111, 192] as const;
const V = [169, 155, 199] as const;

export default function InteractiveGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef  = useRef({ x: -9999, y: -9999 });
  const rafRef    = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    // Disable on touch (no cursor to track)
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const ctx  = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    /* ── Resize ────────────────────────────────────────────────── */
    const resize = () => {
      const W = window.innerWidth;
      const H = window.innerHeight;
      canvas.width  = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width  = W + 'px';
      canvas.style.height = H + 'px';
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    /* ── Mouse tracking ────────────────────────────────────────── */
    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    /* ── Draw loop ─────────────────────────────────────────────── */
    function draw() {
      if (!canvas || !ctx) return;

      const W  = window.innerWidth;
      const H  = window.innerHeight;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      ctx.clearRect(0, 0, W, H);

      const cW = W / COLS;
      const rH = H / ROWS;

      // Vertical lines
      ctx.lineWidth = 0.5;
      for (let c = 1; c < COLS; c++) {
        const x    = c * cW;
        const dist = Math.abs(mx - x);
        const p    = dist < RADIUS ? Math.max(0, 1 - dist / RADIUS) : 0;
        const a    = V_BASE + (V_PEAK - V_BASE) * p * p;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.strokeStyle = `rgba(${P[0]},${P[1]},${P[2]},${a.toFixed(3)})`;
        ctx.stroke();
      }

      // Horizontal lines
      ctx.lineWidth = 0.3;
      for (let r = 1; r < ROWS; r++) {
        const y    = r * rH;
        const dist = Math.abs(my - y);
        const p    = dist < RADIUS ? Math.max(0, 1 - dist / RADIUS) : 0;
        const a    = H_BASE + (H_PEAK - H_BASE) * p * p;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.strokeStyle = `rgba(${P[0]},${P[1]},${P[2]},${a.toFixed(3)})`;
        ctx.stroke();
      }

      // Intersection dots
      for (let c = 1; c < COLS; c++) {
        for (let r = 1; r < ROWS; r++) {
          const x    = c * cW;
          const y    = r * rH;
          const dist = Math.sqrt((mx - x) ** 2 + (my - y) ** 2);
          const p    = dist < RADIUS ? Math.max(0, 1 - dist / RADIUS) : 0;
          const a    = DOT_BASE + (DOT_PEAK - DOT_BASE) * p * p;
          const rad  = 1 + p * 1.4;

          ctx.beginPath();
          ctx.arc(x, y, rad, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${V[0]},${V[1]},${V[2]},${a.toFixed(3)})`;
          ctx.fill();
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="ig-canvas"
      aria-hidden="true"
    />
  );
}
