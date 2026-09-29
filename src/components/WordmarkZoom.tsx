'use client';

import './wordmark-zoom.css';
import { useEffect, useRef } from 'react';
import { compositeGlyph, signedDistance } from '@/lib/sdf';
import { stageStore } from '@/components/experience/stageStore';

// The footer finale: the "Deeyora" wordmark arrives zoomed to 400% through a
// fish-eye lens and, over the last stretch of scroll, pulls back and flattens
// until it lands at its natural size exactly at the bottom of the page.
//
// Built for smoothness: the letters are turned into a small signed-distance-
// field atlas once (glyphs rasterised in idle time, the distance transform in a
// Web Worker), so every frame is just a few uniforms and one full-screen draw —
// no canvas redraws, texture uploads or layout reads while scrolling. The real HTML wordmark stays in place for
// layout, accessibility and the final, pixel-sharp state.

/** Zoom when the stage pins (4 = 400%). */
const START_ZOOM = 4;
/** Fish-eye strength at the start: the centre is magnified a further 1 / (1 − LENS). */
const LENS = 0.45;
const MAX_DPR = 2;
/** Distance-field spread, in atlas texels. */
const SPREAD = 6;
const ATLAS_MAX = 2048;
/** Atlas texels per CSS pixel of the wordmark; distance fields stay sharp far beyond it. */
const ATLAS_SCALE = 1.25;
/** …but never fewer than this many texels per em, so small (phone) wordmarks keep crisp corners at 400%. */
const MIN_TEXELS_PER_EM = 400;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const idle = (fn: () => void) =>
  typeof window.requestIdleCallback === 'function'
    ? window.requestIdleCallback(fn, { timeout: 500 })
    : window.setTimeout(fn, 16);
const cancelIdle = (id: number) =>
  typeof window.cancelIdleCallback === 'function' ? window.cancelIdleCallback(id) : window.clearTimeout(id);

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

// For each output pixel: undo the fish-eye (barrel) lens, undo the zoom, then
// read the distance field — 3 texture reads per pixel, including a faint colour
// fringe towards the rim. Anti-aliasing uses the exact screen footprint.
const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform sampler2D uSdf;
uniform vec2 uView;
uniform float uK;
uniform float uZoom;
uniform vec2 uFocus;
uniform vec2 uShift;
uniform vec2 uAtlasOrigin;
uniform vec2 uAtlasSize;
uniform float uSpread;
uniform float uPx;
uniform vec3 uColorA;
uniform vec3 uColorB;
varying vec2 vUv;

vec2 coverage(vec2 uv) {
  float aspect = uView.x / uView.y;
  vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
  float r2 = dot(p, p) / (0.25 * (aspect * aspect + 1.0));
  vec2 q = p * (1.0 - uK + uK * r2);
  vec2 s = (q / vec2(aspect, 1.0) + 0.5) * uView;
  s.y = uView.y - s.y;
  vec2 P = uFocus + (s - uFocus - uShift) / uZoom;
  vec4 t = texture2D(uSdf, (P - uAtlasOrigin) / uAtlasSize);
  vec2 d = (vec2(t.r, t.a) - 0.5) * 2.0 * uSpread;
  float footprint = uPx * (1.0 - uK + 3.0 * uK * r2) / uZoom;
  return clamp(d / footprint + 0.5, 0.0, 1.0);
}

void main() {
  float aspect = uView.x / uView.y;
  vec2 c = vUv - 0.5;
  vec2 ca = c * vec2(aspect, 1.0);
  float r2 = dot(ca, ca) / (0.25 * (aspect * aspect + 1.0));
  vec2 fringe = c * uK * 0.014 * sqrt(r2);
  vec2 a = coverage(vUv + fringe);
  vec2 b = coverage(vUv);
  vec2 e = coverage(vUv - fringe);
  vec3 col = vec3(
    uColorA.r * a.x + uColorB.r * a.y,
    uColorA.g * b.x + uColorB.g * b.y,
    uColorA.b * e.x + uColorB.b * e.y);
  float alpha = min(max(max(a.x + a.y, b.x + b.y), e.x + e.y), 1.0);
  // Darken towards the rim of the lens; letters rise softly out of the stage's top edge.
  float shade = (1.0 - 0.18 * uK * r2) * smoothstep(0.0, 0.14, 1.0 - vUv.y);
  gl_FragColor = vec4(col, alpha) * shade;
}`;

interface Glyph {
  ch: string;
  /** Origin and baseline, CSS px relative to the wordmark box. */
  x: number;
  y: number;
  /** 0 = main colour, 1 = accent colour. */
  channel: 0 | 1;
}

interface Layout {
  font: string;
  fontSize: number;
  glyphs: Glyph[];
  colors: [number[], number[]];
  /** Wordmark box relative to the stage, CSS px. */
  markLeft: number;
  markTop: number;
  /** Zoom focus (the floating letter), stage CSS px. */
  focus: { x: number; y: number };
}

interface Atlas {
  data: Uint8Array;
  width: number;
  height: number;
  /** Geometry in em of the font size it was built at, so it scales with the wordmark. */
  originEm: [number, number];
  sizeEm: [number, number];
  spreadEm: number;
  fontSize: number;
  /** Glyph origins (em) the atlas was baked with; a mismatch with the live layout triggers a rebuild. */
  glyphsEm: [number, number][];
}

const parseColor = (css: string) => {
  const m = css.match(/[\d.]+/g) ?? ['0', '0', '0'];
  return [Number(m[0]) / 255, Number(m[1]) / 255, Number(m[2]) / 255];
};

/** Measures the real wordmark: glyph origins, baselines and colours. */
function measureLayout(stage: HTMLElement, mark: HTMLElement): Layout {
  const s = stage.getBoundingClientRect();
  const m = mark.getBoundingClientRect();
  const cs = getComputedStyle(mark);
  const spans = Array.from(mark.children) as HTMLElement[];
  const colors: string[] = [];
  const glyphs = spans.map((span) => {
    // A zero-height inline-block sits exactly on the baseline (lifted letters included).
    const probe = document.createElement('i');
    probe.style.cssText = 'display:inline-block;width:0;height:0;vertical-align:baseline';
    span.appendChild(probe);
    const baseline = probe.getBoundingClientRect().top;
    probe.remove();
    const r = span.getBoundingClientRect();
    const color = getComputedStyle(span).color;
    if (!colors.includes(color)) colors.push(color);
    return {
      ch: span.textContent ?? '',
      x: r.left - m.left,
      y: baseline - m.top,
      channel: (colors.indexOf(color) === 0 ? 0 : 1) as 0 | 1,
    };
  });
  const target = spans.find((el) => el.classList.contains('is-lifted')) ?? mark;
  const t = target.getBoundingClientRect();
  return {
    font: `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`,
    fontSize: parseFloat(cs.fontSize),
    glyphs,
    colors: [parseColor(colors[0] ?? cs.color), parseColor(colors[1] ?? colors[0] ?? cs.color)],
    markLeft: m.left - s.left,
    markTop: m.top - s.top,
    focus: { x: t.left - s.left + t.width / 2, y: t.top - s.top + t.height / 2 },
  };
}

/**
 * Builds the distance-field atlas. Each glyph is rasterised in its own idle slot
 * (a few ms); the distance transform runs in a Web Worker, or — if workers are
 * unavailable — on the main thread, still one glyph per idle slot. Returns a
 * cancel function.
 */
function buildAtlas(layout: Layout, done: (atlas: Atlas) => void, useWorker = true): () => void {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return () => {};
  ctx.font = layout.font;
  const ink = layout.glyphs.map((g) => {
    const m = ctx.measureText(g.ch);
    return { l: m.actualBoundingBoxLeft, r: m.actualBoundingBoxRight, a: m.actualBoundingBoxAscent, d: m.actualBoundingBoxDescent };
  });
  const minX = Math.min(...layout.glyphs.map((g, i) => g.x - ink[i].l));
  const maxX = Math.max(...layout.glyphs.map((g, i) => g.x + ink[i].r));
  const minY = Math.min(...layout.glyphs.map((g, i) => g.y - ink[i].a));
  const maxY = Math.max(...layout.glyphs.map((g, i) => g.y + ink[i].d));
  const scale = Math.min(
    Math.max(ATLAS_SCALE, MIN_TEXELS_PER_EM / layout.fontSize),
    (ATLAS_MAX - 4 * (SPREAD + 2)) / Math.max(1, maxX - minX),
  );
  const pad = (SPREAD + 2) / scale;
  const ox = minX - pad;
  const oy = minY - pad;
  const width = Math.ceil((maxX - minX + 2 * pad) * scale);
  const height = Math.ceil((maxY - minY + 2 * pad) * scale);
  const em = layout.fontSize;
  const finish = (data: Uint8Array) =>
    done({
      data,
      width,
      height,
      originEm: [ox / em, oy / em],
      sizeEm: [width / scale / em, height / scale / em],
      spreadEm: SPREAD / scale / em,
      fontSize: em,
      glyphsEm: layout.glyphs.map((g) => [g.x / em, g.y / em]),
    });

  let worker: Worker | null = null;
  if (useWorker && typeof Worker !== 'undefined') {
    try {
      worker = new Worker(new URL('../lib/sdf.worker.ts', import.meta.url));
    } catch {
      worker = null;
    }
  }
  const data = worker ? null : new Uint8Array(width * height * 2);
  let cancelled = false;
  let restart: (() => void) | null = null;
  if (worker) {
    worker.postMessage({ type: 'init', width, height, spread: SPREAD });
    worker.onmessage = (e) => {
      if (e.data?.type !== 'done' || cancelled) return;
      worker?.terminate();
      finish(e.data.data as Uint8Array);
    };
    worker.onerror = () => {
      // Worker failed to load or run: redo the build on the main thread.
      worker?.terminate();
      cancelIdle(handle);
      if (!cancelled) restart = buildAtlas(layout, done, false);
    };
  }

  let i = 0;
  let handle = 0;
  const step = () => {
    const g = layout.glyphs[i];
    const box = ink[i];
    // Texel box around the glyph's ink, with room for the spread.
    const x0 = Math.max(0, Math.floor((g.x - box.l - ox) * scale) - SPREAD - 1);
    const y0 = Math.max(0, Math.floor((g.y - box.a - oy) * scale) - SPREAD - 1);
    const w = Math.min(width - x0, Math.ceil((box.l + box.r) * scale) + 2 * SPREAD + 3);
    const h = Math.min(height - y0, Math.ceil((box.a + box.d) * scale) + 2 * SPREAD + 3);
    if (w > 0 && h > 0) {
      canvas.width = w;
      canvas.height = h;
      ctx.setTransform(scale, 0, 0, scale, -x0 - ox * scale, -y0 - oy * scale);
      ctx.font = layout.font;
      ctx.textBaseline = 'alphabetic';
      ctx.fillStyle = '#000';
      ctx.fillText(g.ch, g.x, g.y);
      const rgba = ctx.getImageData(0, 0, w, h).data;
      if (worker) {
        worker.postMessage({ type: 'glyph', rgba, width: w, height: h, x0, y0, channel: g.channel }, [rgba.buffer]);
      } else if (data) {
        compositeGlyph(data, width, signedDistance(rgba, w, h), w, h, x0, y0, g.channel, SPREAD);
      }
    }
    if (++i < layout.glyphs.length) {
      handle = idle(step);
      return;
    }
    canvas.width = canvas.height = 0;
    if (worker) worker.postMessage({ type: 'finish' });
    else if (data) finish(data);
  };
  handle = idle(step);
  return () => {
    cancelled = true;
    cancelIdle(handle);
    worker?.terminate();
    restart?.();
  };
}

/**
 * WebGL side of the lens. Creation never blocks on shader compilation: with
 * KHR_parallel_shader_compile the driver compiles in the background and
 * `ready()` just polls; the remaining setup runs once it reports done.
 */
function createLens(canvas: HTMLCanvasElement) {
  const gl = canvas.getContext('webgl', {
    alpha: true,
    premultipliedAlpha: true,
    antialias: false,
    depth: false,
    stencil: false,
    preserveDrawingBuffer: false,
  });
  if (!gl) return null;
  const parallel = gl.getExtension('KHR_parallel_shader_compile');

  const shader = (type: number, src: string) => {
    const s = gl.createShader(type);
    if (!s) throw new Error('createShader failed');
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return s;
  };
  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, shader(gl.VERTEX_SHADER, VERT));
  gl.attachShader(program, shader(gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(program);

  type Uniform = 'view' | 'k' | 'zoom' | 'focus' | 'shift' | 'origin' | 'size' | 'spread' | 'px' | 'colorA' | 'colorB';
  let uni: Record<Uniform, WebGLUniformLocation | null> | null = null;
  let buffer: WebGLBuffer | null = null;
  let texture: WebGLTexture | null = null;

  const finishLink = () => {
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program) || 'link failed');
    gl.useProgram(program);

    buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, 'aPos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    const u = (name: string) => gl.getUniformLocation(program, name);
    uni = {
      view: u('uView'),
      k: u('uK'),
      zoom: u('uZoom'),
      focus: u('uFocus'),
      shift: u('uShift'),
      origin: u('uAtlasOrigin'),
      size: u('uAtlasSize'),
      spread: u('uSpread'),
      px: u('uPx'),
      colorA: u('uColorA'),
      colorB: u('uColorB'),
    };
  };

  return {
    /** True once the program is linked and set up (non-blocking with KHR_parallel_shader_compile). */
    ready() {
      if (uni) return true;
      if (parallel && !gl.getProgramParameter(program, parallel.COMPLETION_STATUS_KHR)) return false;
      finishLink();
      return true;
    },
    upload(atlas: Atlas) {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.LUMINANCE_ALPHA,
        atlas.width,
        atlas.height,
        0,
        gl.LUMINANCE_ALPHA,
        gl.UNSIGNED_BYTE,
        atlas.data,
      );
    },
    /** Static geometry: only changes on resize or when the atlas is (re)built. */
    setGeometry(layout: Layout, atlas: Atlas, width: number, height: number, dpr: number) {
      if (!uni) return;
      const em = layout.fontSize;
      gl.useProgram(program);
      gl.uniform2f(uni.view, width, height);
      gl.uniform2f(uni.focus, layout.focus.x, layout.focus.y);
      gl.uniform2f(uni.origin, layout.markLeft + atlas.originEm[0] * em, layout.markTop + atlas.originEm[1] * em);
      gl.uniform2f(uni.size, atlas.sizeEm[0] * em, atlas.sizeEm[1] * em);
      gl.uniform1f(uni.spread, atlas.spreadEm * em);
      gl.uniform1f(uni.px, 1 / dpr);
      gl.uniform3fv(uni.colorA, layout.colors[0]);
      gl.uniform3fv(uni.colorB, layout.colors[1]);
      gl.viewport(0, 0, canvas.width, canvas.height);
    },
    /** Per frame: three uniforms and one draw. */
    draw(zoom: number, k: number, shiftX: number, shiftY: number) {
      if (!uni) return;
      gl.useProgram(program);
      gl.uniform1f(uni.zoom, zoom);
      gl.uniform1f(uni.k, k);
      gl.uniform2f(uni.shift, shiftX, shiftY);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    },
    // No loseContext(): the canvas keeps its context, so a re-run effect (e.g.
    // React Strict Mode's double mount) gets a working one back.
    dispose() {
      if (texture) gl.deleteTexture(texture);
      if (buffer) gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    },
  };
}

export default function WordmarkZoom({ children }: { children: React.ReactNode }) {
  const runwayRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const runway = runwayRef.current;
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    const mark = stage?.querySelector<HTMLElement>('.footer-wordmark');
    const footer = runway?.closest('footer') ?? runway;
    if (!runway || !stage || !canvas || !mark || !footer) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let lens: ReturnType<typeof createLens> = null;
    /** Lens program linked and atlas uploaded: the fish-eye can draw. */
    let lensReady = false;
    let uploaded = false;
    let lensPoll = 0;
    let layout: Layout | null = null;
    let atlas: Atlas | null = null;
    let cancelBuild: (() => void) | null = null;
    let building = false;
    let staleAtlas = false;
    /** Set on cleanup: async work (font load, atlas build) must not touch a dead instance. */
    let disposed = false;

    // Cached geometry (refreshed on resize / layout changes, never read per frame).
    let runwayTop = 0;
    let runwayHeight = 0;
    let footerTop = 0;
    let width = 1;
    let height = 1;
    let dpr = 1;
    let pinned = true;
    let stickyChecked = false;

    let frame = 0;
    let lastP = -1;
    let dirty = true;
    let geometryDirty = true;
    let near = false;
    let sizing = 0;
    let canvasOpacity = '';
    let markOpacity = '';

    const setCanvasOpacity = (v: string) => {
      if (v === canvasOpacity) return;
      canvasOpacity = v;
      canvas.style.opacity = v;
      canvas.style.visibility = v === '0' ? 'hidden' : 'visible';
    };
    const setMarkOpacity = (v: string) => {
      if (v === markOpacity) return;
      markOpacity = v;
      mark.style.opacity = v;
    };
    const clearMarkTransform = () => {
      if (!mark.style.transform) return;
      mark.style.transform = '';
      mark.style.willChange = '';
    };
    /** The real text at rest: nothing of the finale on screen. */
    const rest = () => {
      setCanvasOpacity('0');
      setMarkOpacity('');
      clearMarkTransform();
    };

    function schedule() {
      if (!frame) frame = requestAnimationFrame(render);
    }
    function invalidate() {
      dirty = true;
      geometryDirty = true;
      schedule();
    }

    /** Gives the lens canvas its full-size drawing buffer; returns true if it changed. */
    const sizeCanvas = () => {
      const cw = Math.round(width * dpr);
      const ch = Math.round(height * dpr);
      if (canvas.width === cw && canvas.height === ch) return false;
      canvas.width = cw;
      canvas.height = ch;
      geometryDirty = true;
      return true;
    };
    // After a resize the buffer needs re-allocating (~20–60 ms): do it in idle time
    // while the finale approaches rather than in its first frame.
    const sizeCanvasWhenIdle = () => {
      if (sizing) return;
      sizing = idle(() => {
        sizing = 0;
        if (!disposed && near && sizeCanvas()) invalidate();
      });
    };

    const upload = () => {
      if (!lens || !lensReady || !atlas || uploaded) return;
      lens.upload(atlas);
      uploaded = true;
      invalidate();
    };

    // The lens's context is created during page load, already at full size (the
    // first surface allocation costs 20–60 ms, which must never land mid-scroll),
    // and its shaders compile in the background; readiness is polled in idle slots.
    const startLens = () => {
      lensReady = false;
      uploaded = false;
      sizeCanvas();
      try {
        lens = createLens(canvas);
      } catch (err) {
        lens = null;
        console.warn('[DEEYORA] Fish-eye lens unavailable, using a plain zoom:', err);
      }
      const poll = () => {
        lensPoll = 0;
        if (disposed || !lens) return;
        try {
          if (!lens.ready()) {
            lensPoll = idle(poll);
            return;
          }
          lensReady = true;
          upload();
        } catch (err) {
          lens = null;
          console.warn('[DEEYORA] Fish-eye lens unavailable, using a plain zoom:', err);
        }
      };
      if (lens) lensPoll = idle(poll);
    };

    const atlasMatches = (l: Layout, a: Atlas) =>
      l.fontSize <= a.fontSize * 1.35 &&
      l.glyphs.length === a.glyphsEm.length &&
      l.glyphs.every(
        (g, i) =>
          Math.abs(g.x / l.fontSize - a.glyphsEm[i][0]) < 0.004 &&
          Math.abs(g.y / l.fontSize - a.glyphsEm[i][1]) < 0.004,
      );

    const ensureAtlas = () => {
      if (!layout) return;
      if (building) {
        staleAtlas = true;
        return;
      }
      // Distance fields scale cleanly: rebuild only if the letters moved or the wordmark grew a lot.
      if (atlas && atlasMatches(layout, atlas)) return;
      building = true;
      staleAtlas = false;
      // Wait for the primary face only: loading the whole family list rejects at
      // once when a fallback face is missing (e.g. next/font's local("Arial") on Android).
      const primary = layout.font.split(',')[0];
      const fontsReady = document.fonts?.load(primary).catch(() => []) ?? Promise.resolve([]);
      fontsReady.then(() => {
        if (disposed) return;
        // The font may have swapped in since the last measure: bake current positions.
        measure();
        const source = layout;
        if (!source) return;
        cancelBuild = buildAtlas(source, (built) => {
          if (disposed) return;
          building = false;
          atlas = built;
          uploaded = false;
          upload();
          if (staleAtlas) ensureAtlas();
        });
      });
    };

    const measure = () => {
      // Measure the untransformed wordmark, but put any plain-zoom transform
      // straight back so it never flashes at its resting size.
      const transform = mark.style.transform;
      mark.style.transform = '';
      const r = runway.getBoundingClientRect();
      runwayTop = r.top + window.scrollY;
      runwayHeight = r.height;
      footerTop = footer.getBoundingClientRect().top + window.scrollY;
      width = Math.max(1, stage.clientWidth);
      height = Math.max(1, stage.clientHeight);
      dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      layout = measureLayout(stage, mark);
      mark.style.transform = transform;
      // Once scrolled past the footer's top, the opaque footer covers the whole
      // viewport: the 3D stage behind checks this each frame and rests.
      stageStore.setOccluderTop(footerTop);
      ensureAtlas();
      invalidate();
    };

    /** 0 while the stage arrives, 1 at the very bottom of the page. */
    const progress = (scrollY: number, vh: number) => {
      if (pinned) return clamp01((scrollY - runwayTop) / Math.max(1, runwayHeight - vh));
      return clamp01((scrollY + vh - runwayTop) / vh);
    };

    const render = () => {
      frame = 0;
      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      // Nothing to do until the finale is within a couple of screens.
      if (scrollY + vh * 2 < runwayTop) {
        if (near) {
          near = false;
          lastP = -1;
          rest();
        }
        return;
      }
      near = true;
      if (lensReady) sizeCanvasWhenIdle();
      const p = progress(scrollY, vh);

      // One-time check that the stage really pins (sticky can be defeated by
      // an ancestor's overflow); otherwise play the zoom while it scrolls in.
      if (pinned && !stickyChecked && p > 0.05 && p < 0.95) {
        stickyChecked = true;
        if (Math.abs(stage.getBoundingClientRect().top) > 2) {
          pinned = false;
          runway.classList.add('wm-nopin');
          measure();
          return;
        }
      }

      if (!dirty && Math.abs(p - lastP) < 0.0002) return;
      dirty = false;
      lastP = p;

      const inv = 1 - easeInOutCubic(p);
      const zoom = Math.pow(START_ZOOM, inv);
      const focus = layout?.focus ?? { x: width / 2, y: height / 2 };
      // The focus letter drifts from the middle of the screen back to its place.
      const shiftX = (width / 2 - focus.x) * inv;
      const shiftY = (height / 2 - focus.y) * inv;
      // Hand over to the real text; completes just before p = 1 so sub-pixel scroll limits still land.
      const fade = clamp01((p - 0.96) / 0.038);

      if (lens && lensReady && uploaded && atlas && layout) {
        clearMarkTransform();
        if (fade < 1) {
          // Normally sized in idle time already; after a jump or resize, size it in
          // the same frame as the draw (never a blank frame).
          sizeCanvas();
          if (geometryDirty) {
            lens.setGeometry(layout, atlas, width, height, dpr);
            geometryDirty = false;
          }
          lens.draw(zoom, LENS * inv, shiftX, shiftY);
        }
        // The canvas sits above the real text: show the text at full strength
        // beneath it and fade only the canvas, so the hand-off never dims.
        setCanvasOpacity(fade >= 1 ? '0' : String(1 - fade));
        setMarkOpacity(fade > 0 ? '' : '0');
      } else {
        // Plain zoom until the lens is ready (or without WebGL).
        setCanvasOpacity('0');
        setMarkOpacity('');
        mark.style.transformOrigin = `${focus.x - mark.offsetLeft}px ${focus.y - mark.offsetTop}px`;
        mark.style.willChange = inv > 0.0005 ? 'transform' : '';
        mark.style.transform = inv > 0.0005 ? `translate(${shiftX}px, ${shiftY}px) scale(${zoom})` : '';
      }
    };

    let remeasure = 0;
    const queueMeasure = () => {
      cancelAnimationFrame(remeasure);
      remeasure = requestAnimationFrame(measure);
    };

    const onContextLost = (e: Event) => {
      e.preventDefault(); // allows 'webglcontextrestored'
      cancelIdle(lensPoll);
      lens = null;
      lensReady = false;
      uploaded = false;
      invalidate();
    };
    const onContextRestored = () => {
      // The atlas stays on the CPU and is re-uploaded once the new program is ready.
      if (!disposed) startLens();
    };

    measure();
    startLens();
    // No reads in the scroll handler: the position is read once per frame in render().
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', queueMeasure);
    canvas.addEventListener('webglcontextlost', onContextLost);
    canvas.addEventListener('webglcontextrestored', onContextRestored);
    const resizeObserver = new ResizeObserver(queueMeasure);
    resizeObserver.observe(document.body);
    resizeObserver.observe(stage);
    document.fonts?.addEventListener?.('loadingdone', queueMeasure);

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      cancelAnimationFrame(remeasure);
      cancelIdle(lensPoll);
      cancelIdle(sizing);
      cancelBuild?.();
      resizeObserver.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', queueMeasure);
      canvas.removeEventListener('webglcontextlost', onContextLost);
      canvas.removeEventListener('webglcontextrestored', onContextRestored);
      document.fonts?.removeEventListener?.('loadingdone', queueMeasure);
      lens?.dispose();
      stageStore.setOccluderTop(null);
      runway.classList.remove('wm-nopin');
      mark.style.transform = '';
      mark.style.transformOrigin = '';
      mark.style.willChange = '';
      mark.style.opacity = '';
    };
  }, []);

  return (
    <div ref={runwayRef} className="wm-runway">
      <div ref={stageRef} className="wm-stage">
        <canvas ref={canvasRef} className="wm-lens" aria-hidden="true" />
        {children}
      </div>
    </div>
  );
}
