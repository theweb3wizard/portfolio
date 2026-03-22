"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ParticleUniverse() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 3;

    const COUNT = 2500;
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);

    const colorA = new THREE.Color("#6366F1");
    const colorB = new THREE.Color("#06B6D4");
    const colorC = new THREE.Color("#1A1A2E");

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      const radius = Math.random() * 4 + 0.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      const t = Math.random();
      let col: THREE.Color;
      if (t < 0.45) {
        col = colorA.clone().lerp(colorB, t * 2);
      } else if (t < 0.75) {
        col = colorB.clone().lerp(colorC, (t - 0.45) * 3.3);
      } else {
        col = colorC.clone();
      }

      colors[i3] = col.r;
      colors[i3 + 1] = col.g;
      colors[i3 + 2] = col.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Use PointsMaterial instead of custom ShaderMaterial — fully compatible
    const material = new THREE.PointsMaterial({
      size: 0.025,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Mouse tracking
    const mouse = { x: 0, y: 0 };
    const targetRotation = { x: 0, y: 0 };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    let frameId: number;
    let elapsed = 0;
    let lastTime = performance.now();

    const animate = () => {
      frameId = requestAnimationFrame(animate);

      const now = performance.now();
      const delta = (now - lastTime) / 1000;
      lastTime = now;
      elapsed += delta;

      // Smooth mouse follow
      targetRotation.x += (mouse.y * 0.3 - targetRotation.x) * 0.05;
      targetRotation.y += (mouse.x * 0.3 - targetRotation.y) * 0.05;

      particles.rotation.x = targetRotation.x + elapsed * 0.02;
      particles.rotation.y = targetRotation.y + elapsed * 0.03;

      // Breathing
      const breathe = 1 + Math.sin(elapsed * 0.5) * 0.02;
      particles.scale.setScalar(breathe);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, opacity: 0.75 }}
    />
  );
}