// Tiny coordination layer between the site-wide WebGL stage (mounted once in
// the root layout) and page components. Kept free of three.js imports so any
// page can use it without pulling the 3D bundle.

/** Dispatch `new CustomEvent(PULSE_EVENT, { detail: strength })` to nudge the object. */
export const PULSE_EVENT = 'deeyora:pulse';

export function pulseStage(strength = 0.2) {
  window.dispatchEvent(new CustomEvent(PULSE_EVENT, { detail: strength }));
}

type Fn = () => void;

/** Hovered header link (0 = Home, 1–5 = the other pages, -1 = none). */
let navHover = -1;

export const navStore = {
  getHover: () => navHover,
  setHover(i: number) {
    navHover = i;
  },
};

let ready = false;
let introPlayed = false;
let occluderTop: number | null = null;
let player: Fn | null = null;
const readyListeners = new Set<Fn>();

export const stageStore = {
  isReady: () => ready,
  hasPlayedIntro: () => introPlayed,

  /**
   * Document y from which opaque page content (the footer finale) covers the
   * whole stage; the stage checks it against the live scroll position each
   * frame and skips rendering past it.
   */
  setOccluderTop(top: number | null) {
    occluderTop = top;
  },
  isOccluded: (scrollY: number) => occluderTop !== null && scrollY >= occluderTop,

  /** Called by the stage once its first frame has rendered. */
  markReady() {
    ready = true;
    readyListeners.forEach((fn) => fn());
    readyListeners.clear();
  },

  /** Runs `fn` once the stage is ready (immediately if it already is). */
  onReady(fn: Fn) {
    if (ready) {
      fn();
      return () => {};
    }
    readyListeners.add(fn);
    return () => {
      readyListeners.delete(fn);
    };
  },

  /** Registered by the stage: starts the assembly intro. */
  setPlayer(fn: Fn | null) {
    player = fn;
    if (fn && introPlayed) fn();
  },

  /** Requests the intro (after the home preloader, or straight away elsewhere). */
  playIntro() {
    introPlayed = true;
    player?.();
  },
};
