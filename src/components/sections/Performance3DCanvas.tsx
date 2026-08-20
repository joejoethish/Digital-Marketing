"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Performance3DCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 380;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambient);

    const mainLight = new THREE.DirectionalLight(0xffffff, 2.0);
    mainLight.position.set(5, 5, 5);
    scene.add(mainLight);

    const violetLight = new THREE.PointLight(0x6d3df5, 6, 12);
    violetLight.position.set(-3, 2, 3);
    scene.add(violetLight);

    const group = new THREE.Group();
    scene.add(group);

    // 1. Conversion Funnel (Top wide, bottom narrow)
    const funnelGeo = new THREE.CylinderGeometry(2.0, 0.5, 2.5, 32, 1, true);
    const funnelMat = new THREE.MeshStandardMaterial({
      color: 0x6d3df5,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide,
    });
    const funnelMesh = new THREE.Mesh(funnelGeo, funnelMat);
    funnelMesh.position.set(-1.8, 0, 0);
    group.add(funnelMesh);

    // 2. Rising Bar Graph Columns (Analytics)
    const barsGroup = new THREE.Group();
    barsGroup.position.set(1.6, -1.0, 0);
    group.add(barsGroup);

    const barHeights = [0.8, 1.4, 2.0, 2.8];
    barHeights.forEach((h, idx) => {
      const barGeo = new THREE.BoxGeometry(0.5, h, 0.5);
      const barMat = new THREE.MeshStandardMaterial({
        color: idx === 3 ? 0x22c55e : 0x6d3df5,
        roughness: 0.2,
        emissive: idx === 3 ? 0x22c55e : 0x5426d9,
        emissiveIntensity: 0.4,
      });
      const bar = new THREE.Mesh(barGeo, barMat);
      bar.position.set((idx - 1.5) * 0.7, h / 2, 0);
      barsGroup.add(bar);
    });

    // 3. Flowing Funnel Particles
    const pCount = 80;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount * 3; i += 3) {
      pPos[i] = (Math.random() - 0.5) * 1.5 - 1.8;
      pPos[i + 1] = (Math.random() - 0.5) * 2.5;
      pPos[i + 2] = (Math.random() - 0.5) * 1.5;
    }
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({ color: 0xa78bfa, size: 0.09, transparent: true, opacity: 0.8 });
    const particles = new THREE.Points(pGeo, pMat);
    group.add(particles);

    // Animation loop
    let clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      funnelMesh.rotation.y = elapsed * 0.3;
      barsGroup.rotation.y = elapsed * 0.2;

      // Move funnel particles downward
      const pos = pGeo.attributes.position.array as Float32Array;
      for (let i = 1; i < pCount * 3; i += 3) {
        pos[i] -= 0.02;
        if (pos[i] < -1.3) pos[i] = 1.3;
      }
      pGeo.attributes.position.needsUpdate = true;

      group.rotation.y = Math.sin(elapsed * 0.2) * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "350px", position: "relative" }} />;
}
