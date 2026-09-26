import * as THREE from 'three';

export interface CameraRigOptions {
  fov?: number;
  near?: number;
  far?: number;
  baseZ?: number;
  tiltIntensityX?: number;
  tiltIntensityY?: number;
  lerpFactor?: number;
}

export class CameraRig {
  public camera: THREE.PerspectiveCamera;
  private baseZ: number;
  private tiltIntensityX: number;
  private tiltIntensityY: number;
  private lerpFactor: number;

  public mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
  public isReducedMotion = false;
  public isMobile = false;

  constructor(options: CameraRigOptions = {}) {
    const fov = options.fov ?? 45;
    const aspect = typeof window !== 'undefined' ? window.innerWidth / window.innerHeight : 16 / 9;
    const near = options.near ?? 0.1;
    const far = options.far ?? 100;

    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this.baseZ = options.baseZ ?? 5.5;
    this.tiltIntensityX = options.tiltIntensityX ?? 0.4;
    this.tiltIntensityY = options.tiltIntensityY ?? 0.25;
    this.lerpFactor = options.lerpFactor ?? 0.05;

    this.camera.position.set(0, 0, this.baseZ);
    this.checkEnvironment();
  }

  private checkEnvironment(): void {
    if (typeof window === 'undefined') return;

    // Check media query for reduced motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.isReducedMotion = motionQuery.matches;

    // Check mobile viewport
    this.isMobile = window.innerWidth <= 768;

    if (this.isReducedMotion) {
      this.tiltIntensityX = 0;
      this.tiltIntensityY = 0;
    } else if (this.isMobile) {
      this.tiltIntensityX *= 0.3;
      this.tiltIntensityY *= 0.3;
    }
  }

  public setMouseTarget(normalizedX: number, normalizedY: number): void {
    if (this.isReducedMotion) return;
    this.mouse.targetX = normalizedX;
    this.mouse.targetY = normalizedY;
  }

  public update(extraOffsetZ: number = 0, extraOffsetY: number = 0): void {
    // Damped spring lerp
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * this.lerpFactor;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * this.lerpFactor;

    // Apply parallax tilt and scroll-driven depth positioning
    this.camera.position.x = this.mouse.x * this.tiltIntensityX;
    this.camera.position.y = this.mouse.y * this.tiltIntensityY + extraOffsetY;
    this.camera.position.z = this.baseZ + extraOffsetZ;

    this.camera.lookAt(0, extraOffsetY * 0.5, 0);
  }

  public handleResize(width: number, height: number): void {
    this.isMobile = width <= 768;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }
}
