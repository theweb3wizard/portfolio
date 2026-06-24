"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { scrollY } from "@/lib/scrollState";

export function useLenis() {
  useEffect(() => {
    let rafId: number;

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });

    lenis.on("scroll", (e) => {
      scrollY.current = e.animatedScroll;
      scrollY._subscribers.forEach((fn) => fn(e.animatedScroll));
    });

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);
}
