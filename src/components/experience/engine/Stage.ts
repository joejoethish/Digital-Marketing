import * as THREE from 'three';
import gsap from 'gsap';
import { GrowthEngine } from './GrowthEngine';
import { createStudioEnvironment, FastPMREMGenerator, resolveFont } from './textures';
import { FRAME_KEYS, getKeyframe, type Frame } from './keyframes';
import { PULSE_EVENT, navStore, stageStore } from '../stageStore';

const DEG = THREE.MathUtils.DEG2RAD;
const PULL_KEYS = ['pull0', 'pull1', 'pull2', 'pull3', 'pull4'] as const;
const HOLD = 0.16;
const CREAM = new THREE.Color('#f7f5f0');
const NAVY = new THREE.Color('#11131a');

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

interface StageOptions {
  canvas: HTMLCanvasElement;
  labels: HTMLElement[];
  reducedMotion: boolean;
  onReady: () => void;
}

interface Anchor {
  pos: number;
  frame: Frame;
}

/**
 * Owns the renderer, camera and Growth Engine, and maps page scroll onto the
 * keyframes declared with `data-kf` anchors.
 */
export class Stage {
  private readonly renderer: THREE.WebGLRenderer;
  private readonly scene = new THREE.Scene();
  private readonly camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  private readonly engine: GrowthEngine;
  private readonly key: THREE.DirectionalLight;
  private readonly envTexture: THREE.Texture;
  private readonly timer = new THREE.Timer();
  private readonly background = new THREE.Color();

  private anchors: Anchor[] = [];
  private cur: Frame | null = null;
  private readonly tgt = getKeyframe('hero', false);
  private mobile = false;
  private width = 1;
  private height = 1;

  private readonly pointer = { x: 0, y: 0, sx: 0, sy: 0 };
  private idleRy = 0;
  private pulse = 0;
  private readonly intro = { v: 0 };
  private theme = '';
  private raf = 0;
  private ready = false;
  /** Rendering is paused behind the preloader (after the first warm-up frame). */
  private playing = false;
  private resizeObserver?: ResizeObserver;

  // Adaptive quality: resolution steps down if frames get slow.
  private dpr = 1;
  private perfTime = 0;
  private perfFrames = 0;

  private readonly v1 = new THREE.Vector3();
  private readonly v2 = new THREE.Vector3();

  static async create(opts: StageOptions) {
    const font = await resolveFont('--font-space-grotesk');
    const stage = new Stage(opts, font);
    // Compile every shader up-front (in parallel where supported) so scrolling never hitches.
    await stage.renderer.compileAsync(stage.scene, stage.camera);
    stage.raf = requestAnimationFrame(stage.tick);
    return stage;
  }

  private constructor(private readonly opts: StageOptions, font: string) {
    const renderer = new THREE.WebGLRenderer({
      canvas: opts.canvas,
      antialias: true,
      powerPreference: 'high-performance',
    });
    const lowPower = window.innerWidth < 760 || (navigator.hardwareConcurrency || 8) <= 4;
    this.dpr = Math.min(window.devicePixelRatio, lowPower ? 1.5 : 1.75);
    renderer.setPixelRatio(this.dpr);
    renderer.toneMapping = THREE.NeutralToneMapping;
    renderer.toneMappingExposure = 0.95;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    this.renderer = renderer;

    // Skip per-shader error queries in production: each one forces a synchronous compile.
    renderer.debug.checkShaderErrors = process.env.NODE_ENV !== 'production';

    const pmrem = new FastPMREMGenerator(renderer);
    const studio = createStudioEnvironment();
    this.envTexture = pmrem.fromEquirectangular(studio).texture;
    studio.dispose();
    pmrem.dispose();
    this.scene.environment = this.envTexture;
    this.scene.environmentIntensity = 1.25;
    this.scene.background = this.background;

    this.key = new THREE.DirectionalLight('#fff6ec', 2.4);
    this.key.position.set(3, 6, 4);
    this.key.castShadow = true;
    const shadowSize = lowPower ? 1024 : 2048;
    this.key.shadow.mapSize.set(shadowSize, shadowSize);
    this.key.shadow.camera.left = this.key.shadow.camera.bottom = -3;
    this.key.shadow.camera.right = this.key.shadow.camera.top = 3;
    this.key.shadow.camera.near = 1;
    this.key.shadow.camera.far = 20;
    this.key.shadow.bias = -0.0004;
    this.key.shadow.normalBias = 0.02;
    this.key.shadow.radius = 6;
    this.scene.add(this.key);

    const rim = new THREE.DirectionalLight('#b89de8', 1.6);
    rim.position.set(-4, 2, -5);
    this.scene.add(rim);
    this.scene.add(new THREE.HemisphereLight('#ffffff', '#c8bde0', 0.35));

    this.engine = new GrowthEngine({ font, anisotropy: renderer.capabilities.getMaxAnisotropy() });
    this.scene.add(this.engine.root);

    this.resize();
    this.measure();
    window.addEventListener('resize', this.onResize);
    window.addEventListener('pointermove', this.onPointer, { passive: true });
    window.addEventListener(PULSE_EVENT, this.onPulse);
    this.resizeObserver = new ResizeObserver(() => this.measure());
    this.resizeObserver.observe(document.body);

    this.timer.connect(document);
  }

  /** Re-reads the page's `data-kf` anchors (call after client-side navigation). */
  refresh() {
    this.measure();
  }

  /** Plays the assembly intro once the preloader has cleared. */
  playIntro() {
    this.playing = true;
    if (this.opts.reducedMotion) {
      this.intro.v = 1;
      return;
    }
    gsap.to(this.intro, { v: 1, duration: 2.6, ease: 'expo.out' });
  }

  private onResize = () => {
    this.resize();
    this.measure();
  };

  /** Page interactions (e.g. typing in the contact form) give the object a nudge. */
  private onPulse = (e: Event) => {
    const strength = (e as CustomEvent<number>).detail ?? 0.2;
    this.pulse = Math.min(2, this.pulse + strength);
  };

  private onPointer = (e: PointerEvent) => {
    this.pointer.x = (e.clientX / this.width) * 2 - 1;
    this.pointer.y = (e.clientY / this.height) * 2 - 1;
  };

  private resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.renderer.setSize(this.width, this.height, false);
    this.camera.aspect = this.width / this.height;
    this.mobile = this.width < 760 || this.camera.aspect < 0.85;
  }

  private measure() {
    const vh = window.innerHeight;
    const scroll = window.scrollY;
    const max = Math.max(0, document.documentElement.scrollHeight - vh);
    this.anchors = Array.from(document.querySelectorAll<HTMLElement>('[data-kf]'))
      .map((el) => {
        const r = el.getBoundingClientRect();
        const centre = r.top + scroll + r.height / 2 - vh / 2;
        return {
          pos: Math.min(max, Math.max(0, centre)),
          frame: getKeyframe(el.dataset.kf ?? '', this.mobile),
        };
      })
      .sort((a, b) => a.pos - b.pos);
    if (!this.anchors.length) this.anchors = [{ pos: 0, frame: getKeyframe('offstage', this.mobile) }];
  }

  private computeTarget(scroll: number) {
    const A = this.anchors;
    if (!A.length) return;
    let i = 0;
    while (i < A.length - 1 && scroll >= A[i + 1].pos) i++;
    const from = A[i].frame;
    const to = A[Math.min(i + 1, A.length - 1)].frame;
    const span = i < A.length - 1 ? A[i + 1].pos - A[i].pos : 0;
    const raw = span > 0 ? clamp01((scroll - A[i].pos) / span) : 0;
    const t = easeInOutCubic(clamp01((raw - HOLD) / (1 - 2 * HOLD)));
    // The backdrop flips quickly around the midpoint so text never sits on mid-grey for long.
    const tBg = easeInOutCubic(clamp01((raw - 0.38) / 0.24));
    for (const k of FRAME_KEYS) {
      this.tgt[k] = from[k] + (to[k] - from[k]) * (k === 'bg' ? tBg : t);
    }
  }

  /**
   * Hovering a header link previews that page on the engine: Home opens every
   * layer, each other page slides its own layer out. Damping smooths it.
   */
  private applyNavHover() {
    const hover = navStore.getHover();
    if (hover === 0) this.tgt.explode += 0.4;
    else if (hover > 0) this.tgt[PULL_KEYS[hover - 1]] += 0.6;
  }

  private tick = (now: number) => {
    this.raf = requestAnimationFrame(this.tick);
    // Paused behind the preloader.
    if (this.ready && !this.playing) return;
    // Page content hides the whole stage: skip the 3D work, but keep the cheap
    // DOM state (header theme, labels) where the running stage would settle.
    if (this.ready && stageStore.isOccluded(window.scrollY)) {
      this.timer.update(now); // no giant frame delta when rendering resumes
      this.computeTarget(window.scrollY);
      if (this.cur) Object.assign(this.cur, this.tgt); // resume from the settled pose
      const theme = this.tgt.bg > 0.5 ? 'dark' : 'light';
      if (theme !== this.theme) {
        this.theme = theme;
        document.documentElement.dataset.expTheme = theme;
      }
      this.updateLabels(0); // nothing of the stage shows, so neither do its labels
      return;
    }
    this.timer.update(now);
    const rawDt = this.timer.getDelta();
    const dt = Math.min(rawDt, 1 / 20);
    this.adaptQuality(rawDt);
    const time = this.timer.getElapsed();

    this.computeTarget(window.scrollY);
    this.applyNavHover();
    if (!this.cur) this.cur = { ...this.tgt };
    const c = this.cur;
    const damp = this.opts.reducedMotion ? 1 : 1 - Math.exp(-dt * 5);
    for (const k of FRAME_KEYS) c[k] += (this.tgt[k] - c[k]) * damp;

    const p = this.pointer;
    const pd = 1 - Math.exp(-dt * 3);
    p.sx += (p.x - p.sx) * pd;
    p.sy += (p.y - p.sy) * pd;

    const intro = this.intro.v;
    const inv = 1 - intro;
    const free = 1 - c.lock;
    const motion = this.opts.reducedMotion ? 0 : 1;

    // ── Object ────────────────────────────────────────────────────────────
    this.pulse *= Math.exp(-dt * 2.2);
    this.idleRy += (c.spin + this.pulse * 3.5) * dt * motion;
    if (free > 0.999) this.idleRy %= Math.PI * 2;

    const { engine } = this;
    engine.tilt.rotation.set(
      c.rx * DEG + p.sy * 0.14 * free * motion + inv * 0.6,
      c.ry * DEG + this.idleRy * free + p.sx * 0.24 * free * motion - inv * 2.8,
      c.rz * DEG,
      'XZY',
    );
    engine.root.scale.setScalar(c.scale * (0.7 + 0.3 * intro));
    engine.root.position.y = Math.sin(time * 0.9) * 0.035 * free * motion - inv * 0.3;
    engine.setLayout({
      explode: c.explode + inv * 1.4 + this.pulse * 0.22 * motion,
      pulls: [c.pull0, c.pull1, c.pull2, c.pull3, c.pull4],
      fan: c.fan,
      row: c.row,
      rowShift: c.rowShift,
    });
    engine.setBars(c.bars);
    engine.setDial(c.dial);
    engine.setShadow(0.6 * (1 - c.bg) * (1 - Math.min(1, c.explode * 0.7)) * (1 - c.row) * intro);
    engine.update(time * motion);

    this.key.position.set(3 + p.sx * 2, 6, 4 - p.sy * 1.5);

    // ── Camera ────────────────────────────────────────────────────────────
    const { camera } = this;
    const aspect = camera.aspect;
    let frame = c.frame;
    if (aspect < 1) frame /= Math.max(aspect, 0.55);
    camera.fov = c.fov;
    const dist = frame / Math.tan((c.fov * DEG) / 2);

    const target = this.v1.set(0, 0, 0);
    if (c.focus > 0.001) {
      engine.root.updateMatrixWorld(true);
      target.lerp(engine.getFocusPoint(this.v2), c.focus);
    }
    const el = Math.min(c.el, 89.5) * DEG;
    const az = c.az * DEG;
    camera.position.set(
      target.x + dist * Math.cos(el) * Math.sin(az),
      target.y + dist * Math.sin(el),
      target.z + dist * Math.cos(el) * Math.cos(az),
    );
    camera.lookAt(target);
    camera.near = Math.max(0.05, dist - 6);
    camera.far = dist + 8;

    const sx = this.mobile ? 0 : c.sx;
    const w = this.width;
    const h = this.height;
    camera.setViewOffset(w, h, (-sx * w) / 2, (c.sy * h) / 2, w, h);
    camera.updateProjectionMatrix();
    camera.updateMatrixWorld();

    // ── Backdrop & theme ──────────────────────────────────────────────────
    this.background.copy(CREAM).lerp(NAVY, c.bg);
    const theme = c.bg > 0.5 ? 'dark' : 'light';
    if (theme !== this.theme) {
      this.theme = theme;
      document.documentElement.dataset.expTheme = theme;
    }

    this.updateLabels(c.labels * intro);
    this.renderer.render(this.scene, camera);

    if (!this.ready) {
      this.ready = true;
      this.opts.onReady();
    }
  };

  private adaptQuality(frameTime: number) {
    if (!this.ready || frameTime > 0.25) return; // ignore tab switches / hitches
    this.perfTime += frameTime;
    if (++this.perfFrames < 90) return;
    const avg = this.perfTime / this.perfFrames;
    this.perfTime = 0;
    this.perfFrames = 0;
    if (avg > 1 / 45 && this.dpr > 1) {
      this.dpr = Math.max(1, this.dpr - 0.25);
      this.renderer.setPixelRatio(this.dpr);
      this.renderer.setSize(this.width, this.height, false);
    } else if (avg > 1 / 30 && this.renderer.shadowMap.enabled) {
      this.renderer.shadowMap.enabled = false;
      this.scene.traverse((o) => {
        const mat = (o as THREE.Mesh).material as THREE.Material | undefined;
        if (mat) mat.needsUpdate = true;
      });
    }
  }

  private updateLabels(visibility: number) {
    const { labels } = this.opts;
    if (!labels.length) return;
    const hidden = visibility < 0.01 || this.mobile;
    const right = this.v2.setFromMatrixColumn(this.camera.matrixWorld, 0);
    const reach = 1.3 * this.engine.root.scale.x;
    labels.forEach((el, i) => {
      if (hidden) {
        if (el.style.visibility !== 'hidden') el.style.visibility = 'hidden';
        return;
      }
      const pt = this.engine.getLayerWorldPosition(i, this.v1).addScaledVector(right, reach).project(this.camera);
      const x = (pt.x * 0.5 + 0.5) * this.width;
      const y = (-pt.y * 0.5 + 0.5) * this.height;
      el.style.visibility = 'visible';
      el.style.opacity = String(clamp01(visibility * 1.8 - i * 0.14));
      el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
    });
  }

  dispose() {
    cancelAnimationFrame(this.raf);
    gsap.killTweensOf(this.intro);
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('pointermove', this.onPointer);
    window.removeEventListener(PULSE_EVENT, this.onPulse);
    this.resizeObserver?.disconnect();
    this.timer.dispose();
    this.engine.dispose();
    this.envTexture.dispose();
    this.renderer.dispose();
    delete document.documentElement.dataset.expTheme;
  }
}
