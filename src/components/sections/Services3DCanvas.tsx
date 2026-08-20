"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

interface Services3DCanvasProps {
  activeServiceIndex: number; // 0 to 8
}

export default function Services3DCanvas({ activeServiceIndex }: Services3DCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const meshGroupRef = useRef<THREE.Group | null>(null);
  const targetIndexRef = useRef(activeServiceIndex);

  targetIndexRef.current = activeServiceIndex;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 450;

    // 1. Setup Scene, Camera, Renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.appendChild(renderer.domElement);

    // 2. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.8);
    mainLight.position.set(4, 6, 5);
    scene.add(mainLight);

    const violetPoint = new THREE.PointLight(0x6d3df5, 5, 12);
    violetPoint.position.set(-3, 2, 2);
    scene.add(violetPoint);

    // 3. Central Mesh Group that Morphs/Rebuilds per Active Service
    const meshGroup = new THREE.Group();
    scene.add(meshGroup);
    meshGroupRef.current = meshGroup;

    // Helper to generate service 3D scene elements
    const buildServiceScene = (index: number) => {
      // Clear current group meshes
      while (meshGroup.children.length > 0) {
        const child = meshGroup.children[0];
        meshGroup.remove(child);
      }

      if (index === 0) {
        // 01 SOCIAL MEDIA: Floating 3D Content Cards & Orbit Spheres
        for (let i = 0; i < 4; i++) {
          const cardGeo = new THREE.BoxGeometry(1.6, 1.1, 0.1);
          const cardMat = new THREE.MeshStandardMaterial({
            color: i % 2 === 0 ? 0x6d3df5 : 0xf8f7f4,
            roughness: 0.2,
            metalness: 0.5,
          });
          const card = new THREE.Mesh(cardGeo, cardMat);
          card.position.set((i - 1.5) * 1.0, Math.sin(i) * 0.4, (i - 1.5) * 0.4);
          card.rotation.set(0.1 * i, 0.2 * i, 0);
          meshGroup.add(card);
        }
      } else if (index === 1) {
        // 02 SEO: Rising Ranking Graph Columns & Search Ring
        for (let i = 0; i < 5; i++) {
          const barHeight = 0.8 + i * 0.5;
          const colGeo = new THREE.CylinderGeometry(0.25, 0.25, barHeight, 32);
          const colMat = new THREE.MeshStandardMaterial({
            color: i === 4 ? 0x6d3df5 : 0xa78bfa,
            roughness: 0.3,
            emissive: i === 4 ? 0x5426d9 : 0x000000,
            emissiveIntensity: 0.5,
          });
          const col = new THREE.Mesh(colGeo, colMat);
          col.position.set((i - 2) * 0.7, barHeight / 2 - 1.2, 0);
          meshGroup.add(col);
        }
      } else if (index === 2) {
        // 03 PERFORMANCE MARKETING: 3D Conversion Funnel Geometry
        const funnelGeo = new THREE.CylinderGeometry(1.8, 0.4, 2.2, 32, 1, true);
        const funnelMat = new THREE.MeshStandardMaterial({
          color: 0x6d3df5,
          wireframe: true,
          side: THREE.DoubleSide,
        });
        const funnel = new THREE.Mesh(funnelGeo, funnelMat);
        meshGroup.add(funnel);

        // Core Glowing Sphere at bottom
        const coreGeo = new THREE.SphereGeometry(0.35, 32, 32);
        const coreMat = new THREE.MeshStandardMaterial({
          color: 0x22c55e,
          emissive: 0x22c55e,
          emissiveIntensity: 0.8,
        });
        const core = new THREE.Mesh(coreGeo, coreMat);
        core.position.set(0, -1.2, 0);
        meshGroup.add(core);
      } else if (index === 3) {
        // 04 GOOGLE ADS: Floating Search Query Portal & Ray Rings
        const ringGeo = new THREE.TorusGeometry(1.4, 0.12, 16, 100);
        const ringMat = new THREE.MeshStandardMaterial({ color: 0x6d3df5, metalness: 0.8 });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        meshGroup.add(ring);

        const innerGeo = new THREE.SphereGeometry(0.7, 32, 32);
        const innerMat = new THREE.MeshPhysicalMaterial({
          color: 0xffffff,
          transmission: 0.9,
          roughness: 0.1,
        });
        const inner = new THREE.Mesh(innerGeo, innerMat);
        meshGroup.add(inner);
      } else if (index === 4) {
        // 05 META ADS: Interactive 3D Panel with Engagement Pulse Ring
        const panelGeo = new THREE.BoxGeometry(2.4, 1.5, 0.15);
        const panelMat = new THREE.MeshStandardMaterial({ color: 0x5426d9, roughness: 0.2 });
        const panel = new THREE.Mesh(panelGeo, panelMat);
        meshGroup.add(panel);

        const pulseRing = new THREE.Mesh(
          new THREE.TorusGeometry(1.6, 0.05, 16, 100),
          new THREE.MeshBasicMaterial({ color: 0xa78bfa, wireframe: true })
        );
        meshGroup.add(pulseRing);
      } else {
        // 06 - 08 (Content, Brand, AI): Neural Network / Abstract Polyhedron
        const polyGeo = new THREE.DodecahedronGeometry(1.3, 1);
        const polyMat = new THREE.MeshStandardMaterial({
          color: 0x6d3df5,
          wireframe: true,
          emissive: 0x5426d9,
          emissiveIntensity: 0.3,
        });
        const poly = new THREE.Mesh(polyGeo, polyMat);
        meshGroup.add(poly);
      }
    };

    buildServiceScene(activeServiceIndex);

    // 4. Animation Loop
    let clock = new THREE.Clock();
    let animId: number;
    let currentIdx = activeServiceIndex;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Check if service index changed
      if (currentIdx !== targetIndexRef.current) {
        currentIdx = targetIndexRef.current;
        buildServiceScene(currentIdx);
      }

      // Smooth rotation
      if (meshGroup) {
        meshGroup.rotation.y = elapsedTime * 0.4;
        meshGroup.rotation.x = Math.sin(elapsedTime * 0.5) * 0.15;
      }

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
  }, [activeServiceIndex]);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100%",
        height: "360px",
        position: "relative",
      }}
    />
  );
}
