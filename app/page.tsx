"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { useLenis } from "@/hooks/useLenis";
import { useAmbientColor } from "@/hooks/useAmbientColor";
import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Arsenal from "@/components/sections/Arsenal";
import Work from "@/components/sections/Work";
import Mission from "@/components/sections/Mission";
import Grimoire from "@/components/sections/Grimoire";
import Contact from "@/components/sections/Contact";
import CryptoFloat from "@/components/canvas/CryptoFloat";
import ScrollWand from "@/components/ui/ScrollWand";
import SectionPortal from "@/components/ui/SectionPortal";
import MobileNav from "@/components/ui/MobileNav";
import LoadingVeil from "@/components/ui/LoadingVeil";

// Load Three.js canvas client-side only
const ParticleUniverse = dynamic(
  () => import("@/components/canvas/ParticleUniverse"),
  { ssr: false }
);

export default function Home() {
  useLenis();
  useAmbientColor();

  // Custom cursor — desktop only (no touch devices)
  useEffect(() => {
    if ("ontouchstart" in window || window.innerWidth < 768) return;

    const cursor = document.createElement("div");
    cursor.className = "cursor";
    const follower = document.createElement("div");
    follower.className = "cursor-follower";
    document.body.appendChild(cursor);
    document.body.appendChild(follower);

    // Ambient cursor trail
    const trailCount = 8;
    const trailDots: HTMLDivElement[] = [];
    for (let i = 0; i < trailCount; i++) {
      const dot = document.createElement("div");
      dot.className = "cursor-trail-dot";
      dot.style.cssText = `
        width: 4px; height: 4px; border-radius: 50%;
        background: var(--ambient-color, #6366F1);
        position: fixed; pointer-events: none; z-index: 9997;
        opacity: ${0.15 - i * 0.015};
        transform: translate(-50%, -50%);
        transition: opacity 0.3s ease;
        will-change: transform;
      `;
      document.body.appendChild(dot);
      trailDots.push(dot);
    }

    let followerX = 0;
    let followerY = 0;
    let mouseX = 0;
    let mouseY = 0;
    const trailPositions = Array.from({ length: trailCount }, () => ({ x: 0, y: 0 }));
    let running = true;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = `${mouseX}px`;
      cursor.style.top = `${mouseY}px`;
    };

    const animateFollower = () => {
      if (!running) return;
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;
      follower.style.left = `${followerX}px`;
      follower.style.top = `${followerY}px`;

      // Update trail: each dot follows the previous with more lag
      let prevX = followerX;
      let prevY = followerY;
      for (let i = 0; i < trailCount; i++) {
        const tp = trailPositions[i];
        tp.x += (prevX - tp.x) * 0.08;
        tp.y += (prevY - tp.y) * 0.08;
        trailDots[i].style.left = `${tp.x}px`;
        trailDots[i].style.top = `${tp.y}px`;
        prevX = tp.x;
        prevY = tp.y;
      }

      requestAnimationFrame(animateFollower);
    };

    window.addEventListener("mousemove", onMove);
    animateFollower();

    return () => {
      running = false;
      window.removeEventListener("mousemove", onMove);
      cursor.remove();
      follower.remove();
      trailDots.forEach((d) => d.remove());
    };
  }, []);

  return (
    <>
      {/* Loading veil */}
      <LoadingVeil />

      {/* Layer 1 — Three.js particle universe */}
      <ParticleUniverse />

      {/* Layer 2 — Floating crypto symbols */}
      <CryptoFloat />

      {/* Scroll progress wand */}
      <ScrollWand />

      {/* Section portal transitions */}
      <SectionPortal />

      {/* Navigation */}
      <Navbar />

      {/* Mobile bottom nav */}
      <MobileNav />

      {/* Main content */}
      <main className="relative z-10 pb-20 md:pb-0">
        <Hero />
        <About />
        <Arsenal />
        <Work />
        <Grimoire />
        <Mission />
        <Contact />
      </main>
    </>
  );
}