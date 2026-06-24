"use client";

import { useEffect, useRef, useState } from "react";
import { scrollY } from "@/lib/scrollState";

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useParallax(speed: number) {
  const [y, setY] = useState(0);
  const lastValue = useRef(0);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const onScroll = (v: number) => {
      const next = v * speed;
      if (Math.abs(next - lastValue.current) > 0.5) {
        lastValue.current = next;
        setY(next);
      }
    };

    scrollY._subscribers.add(onScroll);
    return () => { scrollY._subscribers.delete(onScroll); };
  }, [speed]);

  return y;
}
