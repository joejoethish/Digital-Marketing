'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { CameraRig } from './CameraRig';
import { SceneManager } from './SceneManager';
import { Particles } from './Particles';
import { SceneTransition } from './SceneTransition';

gsap.registerPlugin(ScrollTrigger);

export default function CinematicCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // ── 1. WebGL Renderer Setup ──────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // ── 2. Scene & Modular Sub-systems ───────────────────────────────────────
    const scene = new THREE.Scene();
    const cameraRig = new CameraRig({ fov: 45, baseZ: 5.5 });
    const sceneManager = new SceneManager();

    // Atmospheric Micro-dust Particles
    const particles = new Particles({
      count: 65,
      size: 0.045,
      color: 0x8b6fc0,
      opacity: 0.55,
    });
    scene.add(particles.points);

    // Ambient & Directional Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x8b6fc0, 2.2);
    dirLight.position.set(4, 5, 4);
    scene.add(dirLight);

    const mousePointLight = new THREE.PointLight(0xa99bc7, 3.5, 14);
    mousePointLight.position.set(0, 0, 2);
    scene.add(mousePointLight);

    // ── 3. Mouse & Scroll Interactivity ─────────────────────────────────────
    const handleMouseMove = (e: MouseEvent) => {
      const normalizedX = (e.clientX / window.innerWidth - 0.5) * 2;
      const normalizedY = -(e.clientY / window.innerHeight - 0.5) * 2;
      cameraRig.setMouseTarget(normalizedX, normalizedY);
    };
    window.addEventListener('mousemove', handleMouseMove);

    // GSAP ScrollTrigger for continuous journey progress
    const scrollTrigger = ScrollTrigger.create({
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        sceneManager.updateScroll(self.progress);
      },
    });

    // ── 4. Responsive Viewport Handler ───────────────────────────────────────
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, w <= 768 ? 1.0 : 2.0));
      cameraRig.handleResize(w, h);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // ── 5. Render Loop ───────────────────────────────────────────────────────
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Update Scene state based on continuous scroll progress
      const state01 = SceneTransition.getSceneState(0, sceneManager.progress, 6);

      // Camera motion: mouse parallax spring tilt + subtle scroll depth drift
      cameraRig.update(state01.depthOffset * 0.3, state01.dist * -0.2);

      // Update PointLight following cursor
      mousePointLight.position.x = cameraRig.mouse.x * 3.5;
      mousePointLight.position.y = cameraRig.mouse.y * 2.5;

      // Update atmospheric particles
      particles.update(elapsedTime, cameraRig.mouse.x, cameraRig.mouse.y);

      // Render 3D Scene
      renderer.render(scene, cameraRig.camera);
    };

    animate();

    // ── 6. Resource Disposal ─────────────────────────────────────────────────
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      scrollTrigger.kill();

      particles.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="growth-canvas"
      aria-hidden="true"
    />
  );
}
