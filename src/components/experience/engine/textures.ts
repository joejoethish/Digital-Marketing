import * as THREE from 'three';
import { PROCESS_STEPS } from '../layers';

// Procedural canvas textures for the Growth Engine. Everything is drawn at
// runtime so the experience ships without any model or image assets.

const CREAM = '#efe9df';
const NAVY = '#11131a';
const PURPLE = '#8b6fc0';
const LAV = '#c8bde0';

function makeCanvas(size: number) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  return { canvas, ctx };
}

function toTexture(canvas: HTMLCanvasElement, anisotropy: number) {
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = anisotropy;
  return tex;
}

/** Resolves the family name next/font registered for a CSS variable. */
export async function resolveFont(cssVar: string, fallback = 'sans-serif') {
  const value = getComputedStyle(document.documentElement).getPropertyValue(cssVar).trim();
  const family = value || fallback;
  try {
    await Promise.all([
      document.fonts.load(`700 64px ${family}`),
      document.fonts.load(`500 64px ${family}`),
    ]);
  } catch {
    /* fall back silently */
  }
  return family;
}

function circularText(
  ctx: CanvasRenderingContext2D,
  text: string,
  cx: number,
  cy: number,
  radius: number,
  startAngle: number,
) {
  const chars = [...text];
  const step = (Math.PI * 2) / chars.length;
  chars.forEach((ch, i) => {
    const a = startAngle + i * step;
    ctx.save();
    ctx.translate(cx + Math.cos(a) * radius, cy + Math.sin(a) * radius);
    ctx.rotate(a + Math.PI / 2);
    ctx.fillText(ch, 0, 0);
    ctx.restore();
  });
}

/**
 * Top cap: a compass-like dial. Seen from above (process section) it reads as
 * a flat diagram, with the five process steps placed every 72°.
 */
export function createDialTexture(font: string, anisotropy: number) {
  const S = 2048;
  const { canvas, ctx } = makeCanvas(S);
  const c = S / 2;
  const R = S / 2;

  const g = ctx.createRadialGradient(c, c, 0, c, c, R);
  g.addColorStop(0, '#f7f3ec');
  g.addColorStop(1, CREAM);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, S, S);

  ctx.strokeStyle = NAVY;
  ctx.lineCap = 'round';

  // Outer rings
  ctx.lineWidth = 5;
  [0.955, 0.86].forEach((r) => {
    ctx.beginPath();
    ctx.arc(c, c, R * r, 0, Math.PI * 2);
    ctx.stroke();
  });

  // Tick marks
  for (let i = 0; i < 120; i++) {
    const a = (i / 120) * Math.PI * 2 - Math.PI / 2;
    const major = i % 24 === 0;
    const mid = i % 6 === 0;
    const r1 = R * 0.945;
    const r0 = R * (major ? 0.875 : mid ? 0.9 : 0.915);
    ctx.lineWidth = major ? 9 : mid ? 5 : 3;
    ctx.strokeStyle = major ? PURPLE : NAVY;
    ctx.beginPath();
    ctx.moveTo(c + Math.cos(a) * r0, c + Math.sin(a) * r0);
    ctx.lineTo(c + Math.cos(a) * r1, c + Math.sin(a) * r1);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  // Process steps around the dial
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  PROCESS_STEPS.forEach((step, i) => {
    const a = (i / PROCESS_STEPS.length) * Math.PI * 2 - Math.PI / 2;
    ctx.save();
    ctx.translate(c, c);
    ctx.rotate(a + Math.PI / 2);

    ctx.fillStyle = PURPLE;
    ctx.beginPath();
    ctx.arc(0, -R * 0.8, 20, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = NAVY;
    ctx.font = `700 120px ${font}`;
    ctx.fillText(step.n, 0, -R * 0.68);
    ctx.font = `700 46px ${font}`;
    ctx.fillText(step.title.split('').join(String.fromCharCode(8202)), 0, -R * 0.585);
      ctx.restore();
  });

  // Inner guides
  ctx.strokeStyle = NAVY;
  ctx.globalAlpha = 0.55;
  ctx.lineWidth = 3;
  ctx.setLineDash([12, 14]);
  ctx.beginPath();
  ctx.arc(c, c, R * 0.5, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(c - R * 0.46, c);
  ctx.lineTo(c + R * 0.46, c);
  ctx.moveTo(c, c - R * 0.46);
  ctx.lineTo(c, c + R * 0.46);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.globalAlpha = 1;

  // Centre monogram
  ctx.fillStyle = CREAM;
  ctx.beginPath();
  ctx.arc(c, c, R * 0.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = NAVY;
  ctx.lineWidth = 6;
  ctx.stroke();

  const mono = ctx.createLinearGradient(c - 200, c - 200, c + 200, c + 200);
  mono.addColorStop(0, PURPLE);
  mono.addColorStop(1, '#5a3d96');
  ctx.fillStyle = mono;
  ctx.font = `700 400px ${font}`;
  ctx.fillText('D', c, c - 20);

  ctx.fillStyle = NAVY;
  ctx.font = `700 44px ${font}`;
  ctx.fillText('D E E Y O R A', c, c + R * 0.19);

  return toTexture(canvas, anisotropy);
}

/** Base: dark anodised plate engraved with a data grid and a rim inscription. */
export function createBaseTexture(font: string, anisotropy: number) {
  const S = 1024;
  const { canvas, ctx } = makeCanvas(S);
  const c = S / 2;
  const R = S / 2;

  ctx.fillStyle = '#1b1c24';
  ctx.fillRect(0, 0, S, S);

  // Data grid
  ctx.strokeStyle = LAV;
  ctx.globalAlpha = 0.14;
  ctx.lineWidth = 1.5;
  for (let x = 0; x <= S; x += 32) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, S);
    ctx.moveTo(0, x);
    ctx.lineTo(S, x);
    ctx.stroke();
  }

  // Concentric rings
  ctx.globalAlpha = 0.45;
  for (let r = 0.2; r < 0.8; r += 0.12) {
    ctx.beginPath();
    ctx.arc(c, c, R * r, 0, Math.PI * 2);
    ctx.stroke();
  }

  // A rising data line through the grid
  ctx.globalAlpha = 1;
  ctx.strokeStyle = '#b89de8';
  ctx.lineWidth = 5;
  ctx.beginPath();
  for (let i = 0; i <= 40; i++) {
    const t = i / 40;
    const x = c - R * 0.55 + t * R * 1.1;
    const y = c + R * 0.3 - Math.pow(t, 1.8) * R * 0.6 + Math.sin(t * 18) * 10;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // Rim inscription
  ctx.fillStyle = LAV;
  ctx.globalAlpha = 0.9;
  ctx.font = `600 34px ${font}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  circularText(
    ctx,
    'DEEYORA  ·  DIGITAL GROWTH  ·  DESIGNED TO PERFORM  ·  STRATEGY  ·  CREATIVE  ·  DATA  ·  ',
    c,
    c,
    R * 0.88,
    -Math.PI / 2,
  );
  ctx.globalAlpha = 1;

  return toTexture(canvas, anisotropy);
}

/** Soft radial blob used as a contact shadow under the object. */
export function createShadowTexture() {
  const S = 256;
  const { canvas, ctx } = makeCanvas(S);
  const g = ctx.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
  g.addColorStop(0, 'rgba(17,19,26,0.55)');
  g.addColorStop(0.45, 'rgba(17,19,26,0.22)');
  g.addColorStop(1, 'rgba(17,19,26,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, S, S);
  return new THREE.CanvasTexture(canvas);
}

/**
 * Lightweight studio environment (equirectangular) for PBR reflections.
 * Drawn on a canvas instead of rendering RoomEnvironment, which needs extra
 * heavy shaders compiled synchronously on first load.
 */
export function createStudioEnvironment() {
  const W = 1024;
  const H = 512;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d')!;

  const sky = ctx.createLinearGradient(0, 0, 0, H);
  sky.addColorStop(0, '#ffffff');
  sky.addColorStop(0.45, '#e9e5ee');
  sky.addColorStop(0.55, '#b9b4c4');
  sky.addColorStop(1, '#4a4756');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, H);

  // Soft boxes: [centre u, centre v, width, height, opacity]
  const boxes: [number, number, number, number, number][] = [
    [0.62, 0.22, 0.2, 0.16, 1], // key, above-right of the viewer
    [0.3, 0.3, 0.12, 0.1, 0.85], // fill, left
    [0.08, 0.4, 0.05, 0.3, 0.9], // rim strip, behind
    [0.88, 0.4, 0.05, 0.3, 0.7],
  ];
  ctx.filter = 'blur(10px)';
  ctx.fillStyle = '#ffffff';
  boxes.forEach(([u, v, w, h, a]) => {
    ctx.globalAlpha = a;
    ctx.fillRect((u - w / 2) * W, (v - h / 2) * H, w * W, h * H);
  });
  ctx.globalAlpha = 1;
  ctx.filter = 'none';

  const tex = new THREE.CanvasTexture(canvas);
  tex.mapping = THREE.EquirectangularReflectionMapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

interface PMREMInternals {
  _renderer: THREE.WebGLRenderer;
  _lodMeshes: unknown[];
  _blur(target: THREE.WebGLRenderTarget, lodIn: number, lodOut: number, sigma: number): void;
}

/**
 * PMREM generator that pre-filters roughness levels with three's cheap blur
 * shader instead of the 256-sample GGX shader, which alone can take ~2 s to
 * compile on integrated GPUs. Our soft studio environment looks the same.
 */
export class FastPMREMGenerator extends THREE.PMREMGenerator {
  _applyPMREM(target: THREE.WebGLRenderTarget) {
    const self = this as unknown as PMREMInternals;
    const renderer = self._renderer;
    const autoClear = renderer.autoClear;
    renderer.autoClear = false;
    const n = self._lodMeshes.length;
    const sigma = (i: number) => 0.04 + (i / (n - 1)) * 1.1;
    for (let i = 1; i < n; i++) {
      self._blur(target, i - 1, i, Math.sqrt(sigma(i) ** 2 - sigma(i - 1) ** 2));
    }
    renderer.autoClear = autoClear;
  }
}
