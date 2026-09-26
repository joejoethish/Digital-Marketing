'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── Types ───────────────────────────────────────────────────────────────────

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
  pulse: number;
  pulseSpeed: number;
}

interface Orb {
  x: number;
  y: number;
  r: number;
  hue: number;
  alpha: number;
  drift: number;
  driftPhase: number;
}

// ─── Scene palette driven by scroll progress (0→1) ───────────────────────────

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

// Colour stops keyed to the 6 journey stages
const STAGES = [
  { bg: '#f7f5f0', orbA: '255,245,230', orbB: '200,189,224' }, // hero — warm cream
  { bg: '#f3f0f8', orbA: '200,189,224', orbB: '139,111,192' }, // strategy — lavender
  { bg: '#eef0fb', orbA: '160,170,220', orbB: '100,120,200' }, // creative — indigo
  { bg: '#f0f5f2', orbA: '150,210,190', orbB: '100,180,150' }, // performance — mint
  { bg: '#f5f0fb', orbA: '210,185,240', orbB: '160,120,200' }, // technology — violet
  { bg: '#f7f5f0', orbA: '255,230,200', orbB: '200,160,120' }, // growth — gold
];

function stageColour(progress: number, key: 'orbA' | 'orbB'): string {
  const total = STAGES.length - 1;
  const scaled = Math.min(progress * total, total - 0.001);
  const idx = Math.floor(scaled);
  const t = easeInOut(scaled - idx);
  const a = STAGES[idx][key].split(',').map(Number);
  const b = STAGES[idx + 1][key].split(',').map(Number);
  return `${Math.round(lerp(a[0], b[0], t))},${Math.round(lerp(a[1], b[1], t))},${Math.round(lerp(a[2], b[2], t))}`;
}

function stageBg(progress: number): string {
  const total = STAGES.length - 1;
  const scaled = Math.min(progress * total, total - 0.001);
  const idx = Math.floor(scaled);
  const t = easeInOut(scaled - idx);

  function hexToRgb(hex: string) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b];
  }
  const a = hexToRgb(STAGES[idx].bg);
  const b = hexToRgb(STAGES[idx + 1].bg);
  const rgb = a.map((v, i) => Math.round(lerp(v, b[i], t)));
  return `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function CinematicCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // ── Resize ──────────────────────────────────────────────────────────────
    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // ── Particles ────────────────────────────────────────────────────────────
    const PARTICLE_COUNT = 80;
    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.5 + 0.1,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.02 + 0.005,
    }));

    // ── Orbs ─────────────────────────────────────────────────────────────────
    const ORB_COUNT = 5;
    const orbs: Orb[] = [
      { x: 0.72, y: 0.22, r: 0.52, hue: 270, alpha: 0.18, drift: 30, driftPhase: 0 },
      { x: 0.15, y: 0.65, r: 0.42, hue: 250, alpha: 0.14, drift: 40, driftPhase: 1.2 },
      { x: 0.85, y: 0.75, r: 0.35, hue: 290, alpha: 0.12, drift: 25, driftPhase: 2.4 },
      { x: 0.42, y: 0.18, r: 0.28, hue: 230, alpha: 0.10, drift: 20, driftPhase: 3.6 },
      { x: 0.55, y: 0.88, r: 0.22, hue: 310, alpha: 0.09, drift: 35, driftPhase: 4.8 },
    ];

    // ── Geometric lines ───────────────────────────────────────────────────────
    const LINE_COUNT = 12;
    const lines = Array.from({ length: LINE_COUNT }, (_, i) => ({
      x1: Math.random(),
      y1: Math.random(),
      x2: Math.random(),
      y2: Math.random(),
      phase: (i / LINE_COUNT) * Math.PI * 2,
      speed: Math.random() * 0.003 + 0.001,
      alpha: Math.random() * 0.06 + 0.02,
    }));

    // ── GSAP ScrollTrigger ────────────────────────────────────────────────────
    const trigger = ScrollTrigger.create({
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        gsap.to(progressRef, {
          current: self.progress,
          duration: 0.6,
          ease: 'power2.out',
        });
      },
    });

    // ── Draw loop ─────────────────────────────────────────────────────────────
    function draw(timestamp: number) {
      if (!canvas || !ctx) return;
      const dt = timestamp - timeRef.current;
      timeRef.current = timestamp;
      const t = timestamp * 0.001; // seconds
      const p = progressRef.current;

      const W = canvas.width;
      const H = canvas.height;

      // Background
      ctx.fillStyle = stageBg(p);
      ctx.fillRect(0, 0, W, H);

      const colorA = stageColour(p, 'orbA');
      const colorB = stageColour(p, 'orbB');

      // ── Orbs ────────────────────────────────────────────────────────────────
      for (let i = 0; i < ORB_COUNT; i++) {
        const orb = orbs[i];
        const ox = orb.x * W + Math.sin(t * 0.3 + orb.driftPhase) * orb.drift;
        const oy = orb.y * H + Math.cos(t * 0.2 + orb.driftPhase) * orb.drift;
        const r = orb.r * Math.min(W, H);

        const grad = ctx.createRadialGradient(ox, oy, 0, ox, oy, r);
        const col = i % 2 === 0 ? colorA : colorB;
        grad.addColorStop(0, `rgba(${col},${orb.alpha})`);
        grad.addColorStop(0.5, `rgba(${col},${orb.alpha * 0.4})`);
        grad.addColorStop(1, `rgba(${col},0)`);

        ctx.beginPath();
        ctx.arc(ox, oy, r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      // ── Geometric line grid ──────────────────────────────────────────────────
      for (const line of lines) {
        const animPhase = Math.sin(t * line.speed * 60 + line.phase);
        const alpha = line.alpha * (0.5 + 0.5 * Math.abs(animPhase)) * (0.3 + p * 0.7);
        ctx.beginPath();
        ctx.moveTo(
          (line.x1 + animPhase * 0.04) * W,
          (line.y1 + Math.cos(t * line.speed * 40 + line.phase) * 0.03) * H,
        );
        ctx.lineTo(
          (line.x2 - animPhase * 0.04) * W,
          (line.y2 - Math.cos(t * line.speed * 40 + line.phase) * 0.03) * H,
        );
        ctx.strokeStyle = `rgba(${colorB},${alpha})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }

      // ── Particles ────────────────────────────────────────────────────────────
      for (const particle of particles) {
        particle.x += particle.vx * (dt / 16);
        particle.y += particle.vy * (dt / 16);
        particle.pulse += particle.pulseSpeed;

        // Wrap around
        if (particle.x < 0) particle.x = W;
        if (particle.x > W) particle.x = 0;
        if (particle.y < 0) particle.y = H;
        if (particle.y > H) particle.y = 0;

        const alpha = particle.alpha * (0.4 + 0.6 * Math.sin(particle.pulse));
        const col = Math.random() > 0.5 ? colorA : colorB;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${col},${alpha})`;
        ctx.fill();
      }

      // ── Vignette ─────────────────────────────────────────────────────────────
      const vignette = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.max(W, H) * 0.7);
      vignette.addColorStop(0, 'rgba(0,0,0,0)');
      vignette.addColorStop(1, 'rgba(0,0,0,0.07)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, W, H);

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      trigger.kill();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="growth-canvas"
      aria-hidden="true"
    />
  );
}
