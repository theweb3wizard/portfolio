"use client";

import { useRef, useCallback, type ReactNode } from "react";

interface Tilt3DProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  perspective?: number;
  scale?: number;
  speed?: number;
  glare?: boolean;
}

export default function Tilt3D({
  children,
  className = "",
  maxTilt = 8,
  perspective = 1000,
  scale = 1.02,
  speed = 400,
}: Tilt3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isHovering = useRef(false);
  const frameId = useRef<number>(0);
  const current = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  const animate = useCallback(() => {
    current.current.x += (target.current.x - current.current.x) * 0.08;
    current.current.y += (target.current.y - current.current.y) * 0.08;

    const el = ref.current;
    if (el) {
      el.style.transform = `perspective(${perspective}px) rotateX(${current.current.x}deg) rotateY(${current.current.y}deg) scale3d(${isHovering.current ? scale : 1}, ${isHovering.current ? scale : 1}, 1)`;
    }

    if (
      Math.abs(current.current.x - target.current.x) > 0.01 ||
      Math.abs(current.current.y - target.current.y) > 0.01 ||
      isHovering.current
    ) {
      frameId.current = requestAnimationFrame(animate);
    }
  }, [perspective, scale]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      isHovering.current = true;

      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      target.current.x = (y - 0.5) * -maxTilt;
      target.current.y = (x - 0.5) * maxTilt;

      cancelAnimationFrame(frameId.current);
      frameId.current = requestAnimationFrame(animate);
    },
    [maxTilt, animate]
  );

  const handleMouseLeave = useCallback(() => {
    isHovering.current = false;
    target.current = { x: 0, y: 0 };
    cancelAnimationFrame(frameId.current);
    frameId.current = requestAnimationFrame(animate);
  }, [animate]);

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        willChange: "transform",
        transformStyle: "preserve-3d",
        transition: `transform ${speed}ms ease-out`,
      }}
    >
      {children}
    </div>
  );
}
