import * as THREE from 'three';

export interface ParallaxLayerOptions {
  textureUrl: string;
  width?: number;
  height?: number;
  zDepth?: number;
}

export class ParallaxLayer {
  public mesh: THREE.Mesh;
  public material: THREE.MeshBasicMaterial;
  private geometry: THREE.PlaneGeometry;
  private texture: THREE.Texture | null = null;
  private aspect: number = 16 / 9;

  constructor(options: ParallaxLayerOptions) {
    this.geometry = new THREE.PlaneGeometry(1, 1, 16, 16);
    this.material = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0,
      depthWrite: false,
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.z = options.zDepth ?? -1.0;

    this.loadTexture(options.textureUrl);
  }

  private loadTexture(url: string): void {
    const loader = new THREE.TextureLoader();
    loader.load(
      url,
      (tex) => {
        tex.generateMipmaps = true;
        tex.minFilter = THREE.LinearFilter;
        tex.magFilter = THREE.LinearFilter;
        this.texture = tex;
        this.material.map = tex;
        this.material.opacity = 1;
        this.material.needsUpdate = true;

        if (tex.image) {
          this.aspect = tex.image.width / tex.image.height;
        }
      },
      undefined,
      (err) => console.warn(`Failed loading ParallaxLayer texture ${url}:`, err)
    );
  }

  public updateAspect(camera: THREE.PerspectiveCamera, viewportWidth: number, viewportHeight: number): void {
    const distance = Math.abs(camera.position.z - this.mesh.position.z);
    const fovRad = (camera.fov * Math.PI) / 180;
    const vHeight = 2 * Math.tan(fovRad / 2) * distance;
    const vWidth = vHeight * (viewportWidth / viewportHeight);

    // Cover scale calculation to preserve photograph aspect ratio without stretching
    let scaleX = vWidth;
    let scaleY = vHeight;

    const screenAspect = viewportWidth / viewportHeight;
    if (screenAspect > this.aspect) {
      scaleY = scaleX / this.aspect;
    } else {
      scaleX = scaleY * this.aspect;
    }

    // Apply slight overscale (+15%) to allow 2.5D parallax tilt without showing canvas edges
    this.mesh.scale.set(scaleX * 1.15, scaleY * 1.15, 1);
  }

  public setOpacity(opacity: number): void {
    this.material.opacity = Math.max(0, Math.min(1, opacity));
  }

  public dispose(): void {
    this.geometry.dispose();
    this.material.dispose();
    if (this.texture) this.texture.dispose();
  }
}
