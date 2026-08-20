"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

interface GrowthSystem3DCanvasProps {
  activeStageIndex: number; // 0 to 5
}

export default function GrowthSystem3DCanvas({ activeStageIndex }: GrowthSystem3DCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const targetStageRef = useRef(activeStageIndex);

  targetStageRef.current = activeStageIndex;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambient);

    const violetPoint = new THREE.PointLight(0x6d3df5, 8, 15);
    violetPoint.position.set(2, 3, 4);
    scene.add(violetPoint);

    const group = new THREE.Group();
    scene.add(group);

    // Build stage elements
    const buildStageScene = (idx: number) => {
      while (group.children.length > 0) {
        group.remove(group.children[0]);
      }

      if (idx === 0) {
        // BRAND: Concentric glowing rings
        for (let i = 1; i <= 3; i++) {
          const ring = new THREE.Mesh(
            new THREE.TorusGeometry(i * 0.75, 0.06, 16, 100),
            new THREE.MeshStandardMaterial({
              color: i === 1 ? 0x6d3df5 : 0xa78bfa,
              emissive: i === 1 ? 0x5426d9 : 0x000000,
              emissiveIntensity: 0.8,
            })
          );
          group.add(ring);
        }
      } else if (idx === 1) {
        // CONTENT: Floating layered sheets
        for (let i = 0; i < 5; i++) {
          const sheet = new THREE.Mesh(
            new THREE.BoxGeometry(1.6, 2.0, 0.05),
            new THREE.MeshStandardMaterial({ color: 0x6d3df5, roughness: 0.3 })
          );
          sheet.position.set((i - 2) * 0.4, (i - 2) * 0.2, (i - 2) * -0.3);
          sheet.rotation.y = 0.2 * i;
          group.add(sheet);
        }
      } else if (idx === 2) {
        // TRAFFIC: Stream particles
        const pCount = 150;
        const pGeo = new THREE.BufferGeometry();
        const pPos = new Float32Array(pCount * 3);
        for (let i = 0; i < pCount * 3; i += 3) {
          pPos[i] = (Math.random() - 0.5) * 6;
          pPos[i + 1] = (Math.random() - 0.5) * 6;
          pPos[i + 2] = (Math.random() - 0.5) * 6;
        }
        pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
        const pMat = new THREE.PointsMaterial({ color: 0xa78bfa, size: 0.1, transparent: true, opacity: 0.8 });
        group.add(new THREE.Points(pGeo, pMat));
      } else if (idx === 3) {
        // LEADS: Funnel geometry
        const funnel = new THREE.Mesh(
          new THREE.CylinderGeometry(1.6, 0.4, 2.2, 32, 1, true),
          new THREE.MeshStandardMaterial({ color: 0x6d3df5, wireframe: true, side: THREE.DoubleSide })
        );
        group.add(funnel);
      } else if (idx === 4) {
        // SALES: High contrast bars
        for (let i = 0; i < 4; i++) {
          const bar = new THREE.Mesh(
            new THREE.BoxGeometry(0.5, (i + 1) * 0.7, 0.5),
            new THREE.MeshStandardMaterial({ color: 0x22c55e, emissive: 0x22c55e, emissiveIntensity: 0.3 })
          );
          bar.position.set((i - 1.5) * 0.8, ((i + 1) * 0.7) / 2 - 1.2, 0);
          group.add(bar);
        }
      } else {
        // GROWTH: Unified Glowing Core
        const core = new THREE.Mesh(
          new THREE.IcosahedronGeometry(1.5, 2),
          new THREE.MeshStandardMaterial({ color: 0x6d3df5, emissive: 0x5426d9, emissiveIntensity: 0.8, wireframe: true })
        );
        group.add(core);
      }
    };

    buildStageScene(activeStageIndex);

    let clock = new THREE.Clock();
    let animId: number;
    let currentIdx = activeStageIndex;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (currentIdx !== targetStageRef.current) {
        currentIdx = targetStageRef.current;
        buildStageScene(currentIdx);
      }

      group.rotation.y = elapsed * 0.4;
      group.rotation.x = Math.sin(elapsed * 0.3) * 0.1;

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
  }, [activeStageIndex]);

  return <div ref={mountRef} style={{ width: "100%", height: "350px", position: "relative" }} />;
}
