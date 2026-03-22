"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { useLenis } from "@/hooks/useLenis";
import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Arsenal from "@/components/sections/Arsenal";
import Work from "@/components/sections/Work";
import Mission from "@/components/sections/Mission";
import Contact from "@/components/sections/Contact";

const ParticleUniverse = dynamic(
  () => import("@/components/canvas/ParticleUniverse"),
  { ssr: false }
);

export default function Home() {
  useLenis();

  useEffect(() => {
    const cursor = document.createElement("div");
    cursor.className = "cursor";
    const follower = document.createElement("div");
    follower.className = "cursor-follower";
    document.body.appendChild(cursor);
    document.body.appendChild(follower);

    let followerX = 0;
    let followerY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = `${mouseX}px`;
      cursor.style.top = `${mouseY}px`;
    };

    const animateFollower = () => {
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;
      follower.style.left = `${followerX}px`;
      follower.style.top = `${followerY}px`;
      requestAnimationFrame(animateFollower);
    };

    window.addEventListener("mousemove", onMove);
    animateFollower();

    return () => {
      window.removeEventListener("mousemove", onMove);
      cursor.remove();
      follower.remove();
    };
  }, []);

  return (
    <>
      <ParticleUniverse />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Arsenal />
        <Work />
        <Mission />
        <Contact />
      </main>
    </>
  );
}