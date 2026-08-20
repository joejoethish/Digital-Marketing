"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface NodeItem {
  id: string;
  label: string;
  desc: string;
  color: string;
  angle: number;
  radius: number;
  yOffset: number;
}

const nodeData: NodeItem[] = [
  { id: "brand",     label: "BRAND",     desc: "Identity & Positioning", color: "#6D3DF5", angle: 0,                radius: 4.5, yOffset: 0.8 },
  { id: "content",   label: "CONTENT",   desc: "Editorial & Strategy",   color: "#A78BFA", angle: (Math.PI / 4) * 1, radius: 4.8, yOffset: -0.6 },
  { id: "seo",       label: "SEO",       desc: "Organic & Technical",    color: "#6D3DF5", angle: (Math.PI / 4) * 2, radius: 4.3, yOffset: 1.1 },
  { id: "social",    label: "SOCIAL",    desc: "Community & Viral",      color: "#A78BFA", angle: (Math.PI / 4) * 3, radius: 4.7, yOffset: -0.9 },
  { id: "ads",       label: "ADS",       desc: "Meta & Google Ads",      color: "#6D3DF5", angle: (Math.PI / 4) * 4, radius: 4.4, yOffset: 0.5 },
  { id: "ai",        label: "AI",        desc: "Automated Optimization", color: "#5426D9", angle: (Math.PI / 4) * 5, radius: 4.6, yOffset: -0.7 },
  { id: "analytics", label: "ANALYTICS", desc: "Data & Attribution",     color: "#A78BFA", angle: (Math.PI / 4) * 6, radius: 4.2, yOffset: 0.9 },
  { id: "leads",     label: "LEADS",     desc: "Funnel Conversion",      color: "#6D3DF5", angle: (Math.PI / 4) * 7, radius: 4.9, yOffset: -0.4 },
];

export default function Hero3DCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useState<NodeItem | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 500;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 11);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 2. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 2.0);
    mainLight.position.set(5, 8, 6);
    scene.add(mainLight);

    const violetRimLight = new THREE.PointLight(0x6d3df5, 6, 15);
    violetRimLight.position.set(-5, 3, -2);
    scene.add(violetRimLight);

    const lavenderLight = new THREE.PointLight(0xa78bfa, 4, 12);
    lavenderLight.position.set(4, -4, 3);
    scene.add(lavenderLight);

    // 3. DEEYORA Growth Core (Center Object)
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Inner Glowing Core (Torus Knot)
    const innerGeo = new THREE.TorusKnotGeometry(0.85, 0.28, 128, 32);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x6d3df5,
      roughness: 0.2,
      metalness: 0.8,
      emissive: 0x5426d9,
      emissiveIntensity: 0.6,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerMesh);

    // Outer Glass Shell (Icosahedron)
    const outerGeo = new THREE.IcosahedronGeometry(1.6, 2);
    const outerMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.85,
      opacity: 1,
      transparent: true,
      roughness: 0.15,
      ior: 1.5,
      reflectivity: 0.6,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    coreGroup.add(outerMesh);

    // Wireframe Cage Accent
    const wireGeo = new THREE.IcosahedronGeometry(1.68, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xa78bfa,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    coreGroup.add(wireMesh);

    // 4. Orbiting 3D Nodes
    const nodesGroup = new THREE.Group();
    scene.add(nodesGroup);

    const nodeMeshes: { mesh: THREE.Mesh; item: NodeItem; initialPos: THREE.Vector3 }[] = [];
    const connectionLines: THREE.Line[] = [];

    nodeData.forEach((item) => {
      const nodeGeo = new THREE.SphereGeometry(0.24, 32, 32);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(item.color),
        roughness: 0.3,
        metalness: 0.6,
        emissive: new THREE.Color(item.color),
        emissiveIntensity: 0.4,
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);

      const x = Math.cos(item.angle) * item.radius;
      const z = Math.sin(item.angle) * item.radius;
      const y = item.yOffset;

      nodeMesh.position.set(x, y, z);
      nodeMesh.userData = { id: item.id, item };
      nodesGroup.add(nodeMesh);

      nodeMeshes.push({
        mesh: nodeMesh,
        item,
        initialPos: new THREE.Vector3(x, y, z),
      });

      // Line connecting node to core
      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(x, y, z),
      ]);
      const lineMat = new THREE.LineDashedMaterial({
        color: 0x6d3df5,
        dashSize: 0.2,
        gapSize: 0.15,
        transparent: true,
        opacity: 0.3,
      });
      const line = new THREE.Line(lineGeo, lineMat);
      line.computeLineDistances();
      scene.add(line);
      connectionLines.push(line);
    });

    // 5. Lightweight Particle Field (100 Data Particles)
    const particleCount = 100;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 16;
      particlePositions[i + 1] = (Math.random() - 0.5) * 12;
      particlePositions[i + 2] = (Math.random() - 0.5) * 10;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x6d3df5,
      size: 0.08,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // 6. Interaction & Parallax Variables
    let mouseX = 0;
    let mouseY = 0;
    let targetCamX = 0;
    let targetCamY = 0;

    const raycaster = new THREE.Raycaster();
    const mouseVec = new THREE.Vector2(-100, -100);

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      mouseVec.x = (x / rect.width) * 2 - 1;
      mouseVec.y = -(y / rect.height) * 2 + 1;

      mouseX = (x / rect.width - 0.5) * 2;
      mouseY = (y / rect.height - 0.5) * 2;

      setTooltipPos({ x: e.clientX, y: e.clientY });
    };

    const onScroll = () => {
      const scrolled = window.scrollY;
      const progress = Math.min(1, scrolled / 600);
      camera.position.z = 11 - progress * 2.5;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    // 7. Animation Loop
    let clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Rotate Growth Core
      innerMesh.rotation.x = elapsedTime * 0.3;
      innerMesh.rotation.y = elapsedTime * 0.5;
      outerMesh.rotation.y = -elapsedTime * 0.15;
      wireMesh.rotation.z = elapsedTime * 0.1;

      // Pulse breathing
      const scale = 1 + Math.sin(elapsedTime * 1.5) * 0.04;
      coreGroup.scale.set(scale, scale, scale);

      // Orbiting Nodes Movement
      nodeMeshes.forEach(({ mesh, initialPos }, idx) => {
        const orbitAngle = elapsedTime * 0.2 + idx * ((Math.PI * 2) / nodeMeshes.length);
        const radius = initialPos.length();
        mesh.position.x = Math.cos(orbitAngle) * radius;
        mesh.position.z = Math.sin(orbitAngle) * radius;
        mesh.position.y = initialPos.y + Math.sin(elapsedTime * 1.2 + idx) * 0.15;

        // Update connection line endpoints
        if (connectionLines[idx]) {
          const lineGeo = connectionLines[idx].geometry;
          const positions = lineGeo.attributes.position.array as Float32Array;
          positions[3] = mesh.position.x;
          positions[4] = mesh.position.y;
          positions[5] = mesh.position.z;
          lineGeo.attributes.position.needsUpdate = true;
        }
      });

      // Particle float
      particleSystem.rotation.y = elapsedTime * 0.04;

      // Mouse Parallax smooth lerp
      targetCamX += (mouseX * 1.2 - targetCamX) * 0.05;
      targetCamY += (-mouseY * 0.8 - targetCamY) * 0.05;
      camera.position.x = targetCamX;
      camera.position.y = targetCamY;
      camera.lookAt(0, 0, 0);

      // Raycasting for hover node detection
      raycaster.setFromCamera(mouseVec, camera);
      const intersects = raycaster.intersectObjects(nodeMeshes.map((n) => n.mesh));

      if (intersects.length > 0) {
        const hit = intersects[0].object as THREE.Mesh;
        const item = hit.userData.item as NodeItem;
        setHoveredNode(item);
        hit.scale.set(1.4, 1.4, 1.4);
      } else {
        setHoveredNode(null);
        nodeMeshes.forEach((n) => n.mesh.scale.set(1, 1, 1));
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
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "480px" }}>
      {/* Three.js Canvas Container */}
      <div ref={mountRef} style={{ width: "100%", height: "100%", cursor: "pointer" }} data-cursor="explore" />

      {/* HTML Tooltip Overlay when 3D node is hovered */}
      {hoveredNode && (
        <div
          style={{
            position: "fixed",
            left: `${tooltipPos.x + 15}px`,
            top: `${tooltipPos.y + 15}px`,
            background: "rgba(17, 17, 19, 0.92)",
            color: "#FFFFFF",
            padding: "0.625rem 1rem",
            borderRadius: "var(--radius-md)",
            border: "1px solid rgba(167, 139, 250, 0.4)",
            boxShadow: "0 16px 36px rgba(109, 61, 245, 0.35)",
            backdropFilter: "blur(12px)",
            pointerEvents: "none",
            zIndex: 99,
            animation: "heroFadeIn 0.2s ease forwards",
          }}
        >
          <div style={{ fontSize: "0.6875rem", fontWeight: 800, color: "#A78BFA", letterSpacing: "0.12em" }}>
            DEEYORA NODE 3D
          </div>
          <div style={{ fontSize: "0.9375rem", fontWeight: 800, color: "#FFFFFF", margin: "0.1rem 0" }}>
            {hoveredNode.label}
          </div>
          <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.7)" }}>
            {hoveredNode.desc}
          </div>
        </div>
      )}
    </div>
  );
}
