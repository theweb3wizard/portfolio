"use client";

import { useEffect, useRef, useState } from "react";
import { scrollY } from "@/lib/scrollState";

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useParallax(speed: number) {
  const [y, setY] = useState(0);
  const rafId = useRef<number>(0);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const tick = () => {
      setY(scrollY.current * speed);
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
  }, [speed]);

  return y;
}
