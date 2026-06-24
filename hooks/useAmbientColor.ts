"use client";

import { useEffect, useRef } from "react";
import { SECTION_HUES, lerpHue } from "@/lib/ambient";

const SECTION_IDS = ["hero", "about", "arsenal", "work", "mission", "contact"];

export function useAmbientColor() {
  const currentHue = useRef(239);
  const rafId = useRef<number>(0);
  const activeHue = useRef(239);

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
          scheduleUpdate();
        },
        { threshold: [0, 0.25, 0.5, 0.75, 1] }
      );
      obs.observe(el);
      observers.push(obs);
    });

    let scheduled = false;

    function scheduleUpdate() {
      if (scheduled) return;
      scheduled = true;
      rafId.current = requestAnimationFrame(() => {
        scheduled = false;
        applyHue();
      });
    }

    function applyHue() {
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

      const targetHue = totalWeight > 0
        ? ((weightedHue / totalWeight) % 360 + 360) % 360
        : 239;

      currentHue.current = lerpHue(currentHue.current, targetHue, 0.12);
      activeHue.current = currentHue.current;

      const hue = Math.round(currentHue.current);
      document.documentElement.style.setProperty("--ambient-hue", String(hue));
      document.documentElement.style.setProperty(
        "--ambient-color",
        `hsl(${hue}, 75%, 55%)`
      );
      document.documentElement.style.setProperty(
        "--ambient-glow",
        `hsl(${hue}, 75%, 55%, 0.15)`
      );
      document.documentElement.style.setProperty(
        "--ambient-border",
        `hsl(${hue}, 75%, 55%, 0.25)`
      );
    }

    applyHue();
    scheduleUpdate();

    return () => {
      observers.forEach((o) => o.disconnect());
      cancelAnimationFrame(rafId.current);
    };
  }, []);
}
