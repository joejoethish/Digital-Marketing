"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function CTA3DCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 300;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambient);

    const violetPoint = new THREE.PointLight(0xa78bfa, 8, 15);
    violetPoint.position.set(0, 0, 3);
    scene.add(violetPoint);

    // Core Glowing Icosahedron
    const coreGeo = new THREE.IcosahedronGeometry(1.2, 2);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0x6d3df5,
      emissiveIntensity: 0.8,
      wireframe: true,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    scene.add(coreMesh);

    // Converging Node Spheres
    const nodeGroup = new THREE.Group();
    scene.add(nodeGroup);

    const nodes: THREE.Mesh[] = [];
    for (let i = 0; i < 6; i++) {
      const node = new THREE.Mesh(
        new THREE.SphereGeometry(0.18, 16, 16),
        new THREE.MeshStandardMaterial({ color: 0xa78bfa, emissive: 0x6d3df5, emissiveIntensity: 0.6 })
      );
      nodeGroup.add(node);
      nodes.push(node);
    }

    // Animation Loop
    let clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      coreMesh.rotation.y = elapsed * 0.4;
      coreMesh.rotation.x = Math.sin(elapsed * 0.3) * 0.2;

      // Pulse scaling
      const s = 1 + Math.sin(elapsed * 2) * 0.05;
      coreMesh.scale.set(s, s, s);

      // Nodes converge and pulse
      nodes.forEach((n, idx) => {
        const angle = elapsed * 0.5 + (idx * Math.PI) / 3;
        const radius = 2.2 + Math.sin(elapsed * 1.5 + idx) * 0.3;
        n.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, Math.sin(elapsed + idx) * 0.4);
      });

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

  return <div ref={mountRef} style={{ width: "100%", height: "260px", position: "relative" }} />;
}
