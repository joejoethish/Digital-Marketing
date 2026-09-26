import * as THREE from 'three';

export interface ParticlesOptions {
  count?: number;
  size?: number;
  color?: number;
  opacity?: number;
}

export class Particles {
  public points: THREE.Points;
  private geometry: THREE.BufferGeometry;
  private material: THREE.PointsMaterial;
  private count: number;

  constructor(options: ParticlesOptions = {}) {
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    const isReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Strict performance rules: keep particle count low and subtle
    if (isReducedMotion) {
      this.count = 0;
    } else if (isMobile) {
      this.count = options.count ? Math.floor(options.count * 0.3) : 20;
    } else {
      this.count = options.count ?? 60;
    }

    const positions = new Float32Array(this.count * 3);
    for (let i = 0; i < this.count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }

    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    this.material = new THREE.PointsMaterial({
      color: options.color ?? 0xc8bde0,
      size: options.size ?? 0.04,
      transparent: true,
      opacity: options.opacity ?? 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    this.points = new THREE.Points(this.geometry, this.material);
  }

  public update(time: number, mouseX: number, mouseY: number): void {
    if (this.count === 0) return;
    this.points.rotation.y = time * 0.015;
    this.points.rotation.x = mouseY * 0.02;
  }

  public setColor(colorHex: number): void {
    this.material.color.setHex(colorHex);
  }

  public dispose(): void {
    this.geometry.dispose();
    this.material.dispose();
  }
}
