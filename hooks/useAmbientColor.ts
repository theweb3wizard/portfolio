"use client";

import { useEffect, useRef } from "react";
import { SECTION_HUES, lerpHue } from "@/lib/ambient";

const SECTION_IDS = ["hero", "about", "arsenal", "work", "mission", "contact"];

export function useAmbientColor() {
  const currentHue = useRef(239);
  const rafId = useRef<number>(0);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const ratios: Record<string, number> = {};
    SECTION_IDS.forEach((id) => (ratios[id] = 0));

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          ratios[id] = entry.intersectionRatio;
        },
        { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] }
      );
      obs.observe(el);
      observers.push(obs);
    });

    let targetHue = 239;

    const tick = () => {
      let totalWeight = 0;
      let weightedHue = 0;

      SECTION_IDS.forEach((id) => {
        const r = ratios[id] || 0;
        if (r > 0) {
          const h = SECTION_HUES[id];
          let diff = h - weightedHue;
          if (diff > 180) diff -= 360;
          if (diff < -180) diff += 360;
          weightedHue += diff * r;
          totalWeight += r;
        }
      });

      if (totalWeight > 0) {
        targetHue = ((weightedHue / totalWeight) % 360 + 360) % 360;
      }

      currentHue.current = lerpHue(currentHue.current, targetHue, 0.08);

      document.documentElement.style.setProperty(
        "--ambient-hue",
        String(Math.round(currentHue.current))
      );

      const sat = 75;
      const light = 55;
      document.documentElement.style.setProperty(
        "--ambient-color",
        `hsl(${Math.round(currentHue.current)}, ${sat}%, ${light}%)`
      );
      document.documentElement.style.setProperty(
        "--ambient-glow",
        `hsl(${Math.round(currentHue.current)}, ${sat}%, ${light}%, 0.15)`
      );
      document.documentElement.style.setProperty(
        "--ambient-border",
        `hsl(${Math.round(currentHue.current)}, ${sat}%, ${light}%, 0.25)`
      );

      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);

    return () => {
      observers.forEach((o) => o.disconnect());
      cancelAnimationFrame(rafId.current);
    };
  }, []);
}
