import * as THREE from 'three';
import { createBaseTexture, createDialTexture, createShadowTexture } from './textures';

// The DEEYORA Growth Engine: a tactile five-layer puck built entirely from
// primitives. Layers (top → bottom): Strategy dial, Creative glass,
// Performance bar chart, Conversion funnel, Data base.

const R = 1.25;
const LAYER_HEIGHTS = [0.1, 0.2, 0.05, 0.14, 0.16];
const LAYER_GAP = 0.012;
const EXPLODE_SPACING = 0.62;
const PERF = 2; // index of the performance layer (stays put when exploding)
/** Direction a layer slides out when "pulled" like a drawer (local space). */
const PULL_DIR = new THREE.Vector3(0.45, -0.05, 1.35);
const FAN_PIVOT_X = -1.15;
const ROW_SPACING = 2.8;

export interface LayoutParams {
  explode: number;
  /** Per-layer drawer amount, top → bottom. */
  pulls: number[];
  fan: number;
  row: number;
  /** Which disc (0–4, fractional) sits at the centre of the row. */
  rowShift: number;
}

/** Planar top-down UVs so canvas textures read correctly on both faces. */
function planarUV(geo: THREE.BufferGeometry, radius: number) {
  const pos = geo.attributes.position;
  const uv = geo.attributes.uv;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);
    const flip = y < 0 ? -1 : 1;
    uv.setXY(i, x / (2 * radius) + 0.5, 0.5 - (flip * z) / (2 * radius));
  }
  uv.needsUpdate = true;
}

function arc(pts: THREE.Vector2[], cx: number, cy: number, r: number, a0: number, a1: number, steps = 8) {
  for (let i = 0; i <= steps; i++) {
    const a = a0 + ((a1 - a0) * i) / steps;
    pts.push(new THREE.Vector2(cx + Math.cos(a) * r, cy + Math.sin(a) * r));
  }
}

function roundedDisc(radius: number, height: number, bevel: number, segments = 128) {
  const h = height / 2;
  const b = Math.min(bevel, h);
  const pts: THREE.Vector2[] = [new THREE.Vector2(0, -h)];
  arc(pts, radius - b, -h + b, b, -Math.PI / 2, 0);
  arc(pts, radius - b, h - b, b, 0, Math.PI / 2);
  pts.push(new THREE.Vector2(0, h));
  const geo = new THREE.LatheGeometry(pts, segments);
  planarUV(geo, radius);
  return geo;
}

function funnelRing(radius: number, height: number, hole: number) {
  const h = height / 2;
  const b = 0.035;
  const pts: THREE.Vector2[] = [new THREE.Vector2(hole, -h)];
  arc(pts, radius - b, -h + b, b, -Math.PI / 2, 0);
  arc(pts, radius - b, h - b, b, 0, Math.PI / 2);
  const rim = radius - 0.1;
  for (let i = 0; i <= 20; i++) {
    const t = i / 20;
    const r = rim + (hole - rim) * t;
    const y = h - (2 * h - 0.03) * Math.pow(t, 2.2);
    pts.push(new THREE.Vector2(r, y));
  }
  pts.push(new THREE.Vector2(hole, -h));
  return new THREE.LatheGeometry(pts, 128);
}

interface Options {
  font: string;
  anisotropy: number;
}

export class GrowthEngine {
  /** Position / scale / float. */
  readonly root = new THREE.Group();
  /** Rotation of the whole stack. */
  readonly tilt = new THREE.Group();
  /** Layer groups, top → bottom. */
  readonly layers: THREE.Group[] = [];

  private readonly baseY: number[] = [];
  private readonly bars: { mesh: THREE.InstancedMesh; heights: number[]; radius: number }[] = [];
  private readonly ideas: THREE.Mesh[] = [];
  private readonly shadow: THREE.Mesh;
  private readonly pointer: THREE.Mesh;
  private readonly disposables: { dispose(): void }[] = [];
  private barLevel = -1;
  private readonly dummy = new THREE.Object3D();

  constructor({ font, anisotropy }: Options) {
    this.root.add(this.tilt);

    // Stack layout, centred on y = 0
    const total = LAYER_HEIGHTS.reduce((a, b) => a + b, 0) + LAYER_GAP * (LAYER_HEIGHTS.length - 1);
    let y = total / 2;
    LAYER_HEIGHTS.forEach((h) => {
      this.baseY.push(y - h / 2);
      y -= h + LAYER_GAP;
    });

    const dialTex = this.track(createDialTexture(font, anisotropy));
    const baseTex = this.track(createBaseTexture(font, anisotropy));

    // Only the glass needs MeshPhysicalMaterial; everything else shares the
    // lighter standard shader so the scene compiles quickly on first load.

    // 01 — Strategy: ceramic dial cap
    const cap = this.mesh(
      roundedDisc(R, LAYER_HEIGHTS[0], 0.035),
      new THREE.MeshStandardMaterial({ map: dialTex, roughness: 0.48, envMapIntensity: 0.75 }),
    );

    // 02 — Creative: frosted lavender glass with floating "ideas" inside
    const glass = this.mesh(
      roundedDisc(1.2, LAYER_HEIGHTS[1], 0.07),
      new THREE.MeshPhysicalMaterial({
        color: '#e6defa',
        transmission: 1,
        thickness: 0.6,
        roughness: 0.16,
        ior: 1.45,
        attenuationColor: new THREE.Color('#9c84d4'),
        attenuationDistance: 1.4,
        clearcoat: 1,
        clearcoatRoughness: 0.05,
        specularIntensity: 1,
      }),
    );
    glass.castShadow = false;
    const ideaGroup = new THREE.Group();
    const ideaGeos: THREE.BufferGeometry[] = [
      new THREE.IcosahedronGeometry(0.075, 0),
      new THREE.TorusGeometry(0.06, 0.022, 12, 32),
      new THREE.SphereGeometry(0.06, 24, 16),
      new THREE.OctahedronGeometry(0.075, 0),
      new THREE.TorusKnotGeometry(0.045, 0.016, 64, 8),
    ];
    ideaGeos.forEach((g) => this.track(g));
    const ideaColors = ['#8b6fc0', '#11131a', '#f0a868', '#b89de8', '#f7f5f0', '#6040a0', '#c8bde0'];
    for (let i = 0; i < 9; i++) {
      const a = (i / 9) * Math.PI * 2 + 0.4;
      const r = 0.35 + ((i * 37) % 10) / 18;
      const mesh = new THREE.Mesh(
        ideaGeos[i % ideaGeos.length],
        this.track(
          new THREE.MeshStandardMaterial({ color: ideaColors[i % ideaColors.length], roughness: 0.3, metalness: 0.2 }),
        ),
      );
      mesh.position.set(Math.sin(a) * r, 0, Math.cos(a) * r);
      mesh.userData.phase = i * 1.7;
      ideaGroup.add(mesh);
      this.ideas.push(mesh);
    }

    // 03 — Performance: brushed plate + radial bar chart
    const plate = this.mesh(
      roundedDisc(1.2, LAYER_HEIGHTS[2], 0.02),
      new THREE.MeshStandardMaterial({ color: '#d9d6e2', metalness: 1, roughness: 0.32 }),
    );
    const barGroup = new THREE.Group();
    barGroup.position.y = LAYER_HEIGHTS[2] / 2;
    const barGeo = this.track(new THREE.BoxGeometry(1, 1, 1).translate(0, 0.5, 0));
    const barMat = this.track(new THREE.MeshStandardMaterial({ roughness: 0.28, metalness: 0.35 }));
    const low = new THREE.Color('#d9cff2');
    const mid = new THREE.Color('#8b6fc0');
    const high = new THREE.Color('#3b2a66');
    [
      { count: 72, radius: 0.99, width: 0.045, depth: 0.12, scale: 1 },
      { count: 44, radius: 0.74, width: 0.05, depth: 0.1, scale: 0.62 },
    ].forEach((ring) => {
      const mesh = new THREE.InstancedMesh(barGeo, barMat, ring.count);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      const heights: number[] = [];
      const color = new THREE.Color();
      for (let i = 0; i < ring.count; i++) {
        const t = i / ring.count;
        // Rising trend with some noise — a growth curve wrapped into a circle.
        const noise = 0.12 * Math.sin(i * 2.3) * Math.sin(i * 0.7);
        heights.push(Math.max(0.04, (0.08 + 0.92 * Math.pow(t, 1.6) + noise) * ring.scale));
        color.copy(t < 0.5 ? low : mid).lerp(t < 0.5 ? mid : high, t < 0.5 ? t * 2 : (t - 0.5) * 2);
        mesh.setColorAt(i, color);
      }
      mesh.userData = { ...ring };
      barGroup.add(mesh);
      this.bars.push({ mesh, heights, radius: ring.radius });
    });

    // 04 — Conversion: satin funnel ring
    const funnel = this.mesh(
      funnelRing(1.22, LAYER_HEIGHTS[3], 0.2),
      new THREE.MeshStandardMaterial({ color: '#b7a6dc', metalness: 1, roughness: 0.24 }),
    );

    // 05 — Data: dark anodised base
    const base = this.mesh(
      roundedDisc(R, LAYER_HEIGHTS[4], 0.05),
      new THREE.MeshStandardMaterial({ map: baseTex, metalness: 0.55, roughness: 0.34 }),
    );

    [[cap], [glass, ideaGroup], [plate, barGroup], [funnel], [base]].forEach((parts, i) => {
      const g = new THREE.Group();
      parts.forEach((p) => g.add(p));
      g.position.y = this.baseY[i];
      this.layers.push(g);
      this.tilt.add(g);
    });

    // Contact shadow (not rotated with the stack)
    this.shadow = new THREE.Mesh(
      this.track(new THREE.PlaneGeometry(4.4, 4.4)),
      this.track(
        new THREE.MeshBasicMaterial({
          map: this.track(createShadowTexture()),
          transparent: true,
          depthWrite: false,
          opacity: 0.6,
        }),
      ),
    );
    this.shadow.rotation.x = -Math.PI / 2;
    this.shadow.position.y = -1.15;
    this.shadow.renderOrder = -1;
    this.root.add(this.shadow);

    // Dial pointer for the top-down process view
    this.pointer = new THREE.Mesh(
      this.track(new THREE.ConeGeometry(0.07, 0.16, 3).rotateX(Math.PI / 2)),
      this.track(new THREE.MeshStandardMaterial({ color: '#8b6fc0', roughness: 0.3, metalness: 0.4 })),
    );
    this.pointer.position.set(0, 0, -1.42);
    this.root.add(this.pointer);

    this.setBars(0);
  }

  private track<T extends { dispose(): void }>(item: T): T {
    this.disposables.push(item);
    return item;
  }

  private mesh(geo: THREE.BufferGeometry, mat: THREE.Material) {
    const m = new THREE.Mesh(this.track(geo), this.track(mat));
    m.castShadow = true;
    m.receiveShadow = true;
    return m;
  }

  /**
   * Positions every layer from a blend of arrangements:
   * exploded stack → drawer pulls → fanned deck → standing row.
   */
  setLayout({ explode, pulls, fan, row, rowShift }: LayoutParams) {
    this.layers.forEach((layer, i) => {
      const k = PERF - i;

      // Exploded stack
      let x = 0;
      let y = this.baseY[i] + explode * EXPLODE_SPACING * k;
      let z = 0;
      let rx = 0;
      let ry = explode * k * 0.14;

      // Drawer: slide one layer out towards the viewer, tilting its face up
      const p = pulls[i] ?? 0;
      x += p * PULL_DIR.x;
      y += p * PULL_DIR.y;
      z += p * PULL_DIR.z;
      rx += p * 0.4;

      // Fan: swing layers around a shared pivot on the rim, like a swatch book
      if (fan > 0.0001) {
        const a = fan * k * 0.62;
        const c = Math.cos(a);
        const s = Math.sin(a);
        const dx = x - FAN_PIVOT_X;
        x = FAN_PIVOT_X + dx * c + z * s;
        z = -dx * s + z * c;
        ry += a;
      }

      // Row: discs stand up side by side, facing the camera
      if (row > 0.0001) {
        const lerp = (a: number, b: number) => a + (b - a) * row;
        x = lerp(x, (i - rowShift) * ROW_SPACING);
        y = lerp(y, 0);
        z = lerp(z, 0);
        rx = lerp(rx, Math.PI / 2);
        ry = lerp(ry, 0);
      }

      layer.position.set(x, y, z);
      layer.rotation.set(rx, ry, 0);
    });
  }

  setBars(level: number) {
    const v = Math.max(0, Math.min(1, level));
    if (Math.abs(v - this.barLevel) < 0.0005) return;
    this.barLevel = v;
    this.bars.forEach(({ mesh, heights, radius }) => {
      const { width, depth, count } = mesh.userData as { width: number; depth: number; count: number };
      for (let i = 0; i < count; i++) {
        // Start the ramp at the back (-z) so the front shows a clean rising slope.
        const a = Math.PI + (i / count) * Math.PI * 2;
        this.dummy.position.set(Math.sin(a) * radius, 0, Math.cos(a) * radius);
        this.dummy.rotation.set(0, a, 0);
        this.dummy.scale.set(width, 0.012 + v * heights[i] * 0.44, depth);
        this.dummy.updateMatrix();
        mesh.setMatrixAt(i, this.dummy.matrix);
      }
      mesh.instanceMatrix.needsUpdate = true;
    });
  }

  /** 0 hides / 1 shows the dial pointer and fades the contact shadow accordingly. */
  setDial(v: number) {
    const s = Math.max(0.0001, v);
    this.pointer.scale.setScalar(s);
    this.pointer.visible = v > 0.01;
    this.pointer.position.y = this.layers[0].position.y + 0.02;
  }

  setShadow(opacity: number) {
    (this.shadow.material as THREE.MeshBasicMaterial).opacity = opacity;
    this.shadow.visible = opacity > 0.005;
  }

  /** World-space point the camera dives into for the performance close-up. */
  getFocusPoint(target: THREE.Vector3) {
    const perf = this.layers[PERF];
    target.set(0, perf.position.y + 0.16, 0.9);
    return this.tilt.localToWorld(target);
  }

  getLayerWorldPosition(i: number, target: THREE.Vector3) {
    return this.layers[i].getWorldPosition(target);
  }

  update(time: number) {
    this.ideas.forEach((m) => {
      const p = m.userData.phase as number;
      m.rotation.set(time * 0.6 + p, time * 0.4 + p, 0);
      m.position.y = Math.sin(time * 1.2 + p) * 0.025;
    });
  }

  dispose() {
    this.disposables.forEach((d) => d.dispose());
    this.bars.forEach(({ mesh }) => mesh.dispose());
  }
}
