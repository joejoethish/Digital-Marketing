// Scroll choreography. Every element with `data-kf="<name>"` on the page is an
// anchor: when it is centred in the viewport the scene matches that keyframe.
// Between anchors every parameter is interpolated.

export interface Frame {
  /** Object centre on screen, in half-viewport units (-1 … 1). */
  sx: number;
  sy: number;
  scale: number;
  /** Object rotation, degrees. `ry` spins around the disc axis. */
  rx: number;
  ry: number;
  rz: number;
  /** 0 = assembled puck, 1 = fully exploded layers. */
  explode: number;
  /** Height of the performance bar chart, 0 … 1. */
  bars: number;
  /** Camera elevation / azimuth (degrees), field of view and framing half-height. */
  el: number;
  az: number;
  fov: number;
  frame: number;
  /** 0 = look at the object centre, 1 = look at the bar chart close-up. */
  focus: number;
  /** Backdrop: 0 = cream, 1 = navy. */
  bg: number;
  /** Visibility of the HTML layer annotations. */
  labels: number;
  /** 1 = cancel idle spin and cursor tilt (for precise poses). */
  lock: number;
  /** Visibility of the dial pointer used in the process section. */
  dial: number;
  /** Idle spin speed, radians per second. */
  spin: number;
  /** Drawer: slide an individual layer (top → bottom) out towards the viewer. */
  pull0: number;
  pull1: number;
  pull2: number;
  pull3: number;
  pull4: number;
  /** Fan the layers around a pivot on the rim, like a swatch book. */
  fan: number;
  /** Stand the layers up side by side (a row of discs) … */
  row: number;
  /** … with this disc (0–4) in the centre. */
  rowShift: number;
}

export type FrameKey = keyof Frame;

interface KeyframeDef {
  frame: Partial<Frame>;
  /** Overrides applied on portrait / narrow screens. */
  mobile?: Partial<Frame>;
}

const BASE: Frame = {
  sx: 0,
  sy: 0,
  scale: 1,
  rx: 0,
  ry: 0,
  rz: 0,
  explode: 0,
  bars: 0,
  el: 22,
  az: 0,
  fov: 32,
  frame: 2.35,
  focus: 0,
  bg: 0,
  labels: 0,
  lock: 0,
  dial: 0,
  spin: 0.15,
  pull0: 0,
  pull1: 0,
  pull2: 0,
  pull3: 0,
  pull4: 0,
  fan: 0,
  row: 0,
  rowShift: 2,
};

export const FRAME_KEYS = Object.keys(BASE) as FrameKey[];

const processStep = (i: number): KeyframeDef => ({
  frame: {
    sx: 0.36,
    ry: i * 72,
    el: 89,
    fov: 9,
    frame: 1.95,
    bars: 0,
    bg: 1,
    lock: 1,
    dial: 1,
    spin: 0,
  },
  mobile: { sy: 0.52, scale: 0.58 },
});

const DEFS: Record<string, KeyframeDef> = {
  hero: {
    frame: { sx: 0.44, sy: 0.02, rx: -6, rz: 12, explode: 0.08, el: 24, spin: 0.18 },
    mobile: { sy: 0.38, scale: 0.78 },
  },
  engine: {
    frame: { sx: 0.04, sy: -0.06, scale: 0.78, rz: 3, explode: 1, bars: 0.35, el: 13, frame: 2.2, labels: 1, spin: 0.1 },
    mobile: { sy: 0.1, scale: 0.62 },
  },
  measure: {
    frame: { sx: 0.34, ry: -18, explode: 1, bars: 1, el: 16, fov: 26, frame: 0.72, focus: 1, lock: 1, spin: 0 },
    // No macro dive on phones: keep the object small above the copy.
    mobile: { sy: 0.5, scale: 0.7, focus: 0, fov: 32, frame: 2.35, el: 20, explode: 0.7, lock: 0 },
  },
  'process-1': processStep(0),
  'process-2': processStep(1),
  'process-3': processStep(2),
  'process-4': processStep(3),
  'process-5': processStep(4),
  why: {
    frame: { sx: -0.42, rx: 200, rz: -10, ry: 360, explode: 0.14, el: 20, spin: 0.12 },
    mobile: { sy: 0.55, scale: 0.55 },
  },
  faq: {
    frame: { sx: 0.62, sy: 0.08, scale: 0.55, rx: 352, ry: 360, explode: 0.04, el: 26, spin: 0.22 },
    mobile: { sy: 1.6, scale: 0.5 },
  },
  cta: {
    frame: { sy: -0.05, scale: 0.84, rx: 352, ry: 360, rz: 8, explode: 0.45, bars: 0.8, el: 30, frame: 2.4, bg: 1, spin: 0.35 },
    mobile: { sy: 0, scale: 0.7 },
  },

  // ── Services: "drawers" — each service slides its layer out of the stack ──
  'services-hero': {
    frame: { sx: 0.42, sy: -0.02, rx: -8, rz: -14, explode: 0.3, el: 30, spin: 0.16 },
    mobile: { sy: 0.45, scale: 0.68 },
  },
  ...serviceDrawers(),
  'services-cta': {
    frame: { scale: 1.1, rx: -6, explode: 0.5, bars: 0.6, el: 26, spin: 0.4 },
    mobile: { scale: 0.8 },
  },

  // ── Work: dark gallery, the camera orbits the object ──────────────────────
  'work-hero': {
    frame: { sx: 0.4, rz: 6, explode: 0.7, bars: 0.6, el: 20, az: -20, bg: 1, spin: 0.1 },
    mobile: { sy: 0.45, scale: 0.6 },
  },
  'work-step-1': {
    frame: { sx: 0.38, sy: -0.04, rx: -12, ry: 40, rz: 18, explode: 1.05, el: 12, az: 30, frame: 2.7, bg: 1, lock: 0.5, spin: 0.05 },
    mobile: { sy: 0.5, scale: 0.5 },
  },
  'work-step-2': {
    frame: { sx: 0.38, ry: 80, explode: 0.6, bars: 0.3, el: 55, az: 120, bg: 1, lock: 0.5, spin: 0.05 },
    mobile: { sy: 0.5, scale: 0.5 },
  },
  'work-step-3': {
    frame: { sx: 0.38, ry: 120, explode: 0.12, bars: 0.5, el: 25, az: 210, bg: 1, lock: 0.5, spin: 0.05 },
    mobile: { sy: 0.5, scale: 0.5 },
  },
  'work-step-4': {
    frame: { sx: 0.38, ry: 160, explode: 0.5, bars: 1, el: 18, az: 300, bg: 1, lock: 0.5, spin: 0.05 },
    mobile: { sy: 0.5, scale: 0.5 },
  },
  'work-projects': {
    frame: { sy: -0.42, scale: 0.9, ry: 200, explode: 0.6, bars: 1, el: 58, az: 360, bg: 1, spin: 0.08 },
    mobile: { scale: 0.8 },
  },
  'work-cta': {
    frame: { scale: 0.95, ry: 200, explode: 0.45, bars: 0.8, el: 30, az: 360, bg: 1, spin: 0.35 },
    mobile: { scale: 0.7 },
  },

  // ── About: flat monogram → fanned deck → rolling wheel ────────────────────
  'about-hero': {
    frame: { sx: 0.4, el: 89, fov: 9, frame: 1.9, spin: 0.06 },
    mobile: { sy: 0.48, scale: 0.55 },
  },
  'about-think': {
    frame: { sx: 0.4, sy: -0.02, scale: 0.8, explode: 0.22, fan: 1, el: 48, ry: 30, lock: 0.6, spin: 0.05 },
    mobile: { sy: 0.64, scale: 0.4 },
  },
  'about-approach-start': {
    frame: { sx: -0.6, sy: -0.1, scale: 0.45, rx: 90, explode: 0.04, el: 6, lock: 1, spin: 0 },
    mobile: { sx: 0, sy: 0.3, scale: 0.4 },
  },
  'about-approach-end': {
    frame: { sx: 0.6, sy: -0.1, scale: 0.45, rx: 90, ry: -540, explode: 0.04, el: 6, lock: 1, spin: 0 },
    mobile: { sx: 0, sy: 0.3, scale: 0.4 },
  },
  'about-promise': {
    frame: { scale: 1.05, ry: -540, explode: 0.3, bars: 0.5, el: 28, spin: 0.25 },
    mobile: { scale: 0.75 },
  },

  // ── Insights: the layers stand in a row like records on a shelf ───────────
  'insights-hero': {
    frame: { sx: 0.4, scale: 0.5, row: 1, rowShift: 1, el: 8, az: 40, lock: 1, spin: 0 },
    mobile: { sy: 0.45, scale: 0.45 },
  },
  ...insightRow(),
  'insights-cta': {
    frame: { scale: 1.05, explode: 0.3, bars: 0.4, el: 26, spin: 0.3 },
    mobile: { scale: 0.75 },
  },

  // ── Contact: calm, and it reacts while you type ───────────────────────────
  'contact-hero': {
    frame: { sx: 0.52, sy: 0.24, scale: 0.62, rz: -12, explode: 0.12, el: 26, spin: 0.2 },
    mobile: { sy: 0.62, scale: 0.42 },
  },
  'contact-form': {
    frame: { sx: 0.8, sy: -0.45, scale: 0.55, rz: -12, explode: 0.1, el: 30, spin: 0.15 },
    mobile: { sy: 1.6, scale: 0.4 },
  },
  'contact-faq': {
    frame: { sx: 0.62, sy: 0.08, scale: 0.55, explode: 0.04, el: 26, spin: 0.22 },
    mobile: { sy: 1.6, scale: 0.5 },
  },

  /** Used when a page declares no anchors: the object glides out of view. */
  offstage: {
    frame: { sy: 1.9, scale: 0.4, spin: 0.2 },
  },
};

function serviceDrawers(): Record<string, KeyframeDef> {
  const base: Partial<Frame> = { sx: 0.42, sy: 0.04, scale: 0.9, rz: -4, explode: 0.3, el: 26, lock: 1, spin: 0 };
  const mobile: Partial<Frame> = { sy: 0.52, scale: 0.5 };
  const drawer = (frame: Partial<Frame>): KeyframeDef => ({ frame: { ...base, ...frame }, mobile });
  return {
    'service-brand-strategy': drawer({ pull0: 1, ry: -10 }),
    'service-social-content': drawer({ pull1: 1, ry: 20 }),
    'service-performance-marketing': drawer({ pull2: 1, bars: 0.9, ry: 50 }),
    'service-website-conversion': drawer({ pull3: 1, ry: 80 }),
    // Compounding visibility: every layer steps out a little further than the one above.
    'service-seo-organic': drawer({ pull0: 0.12, pull1: 0.28, pull2: 0.44, pull3: 0.6, pull4: 0.76, bars: 0.6, ry: 110 }),
    // Flipped over so the engraved data base faces up, then slid out.
    'service-analytics-reporting': drawer({ pull4: 0.55, rx: 160, explode: 0.35, el: 30, ry: 140 }),
  };
}

function insightRow(): Record<string, KeyframeDef> {
  const out: Record<string, KeyframeDef> = {};
  for (let i = 0; i < 4; i++) {
    out[`insights-article-${i + 1}`] = {
      frame: { sx: 0.44, scale: 0.62, row: 1, rowShift: i, bars: i === 2 ? 1 : 0.3, el: 6, az: 62, frame: 1.9, lock: 1, spin: 0 },
      mobile: { sy: 0.5, scale: 0.4 },
    };
  }
  return out;
}

export function getKeyframe(name: string, mobile: boolean): Frame {
  const def = DEFS[name];
  if (!def) return { ...BASE };
  return { ...BASE, ...def.frame, ...(mobile ? def.mobile : undefined) };
}
