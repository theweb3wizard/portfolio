"use client";

import { useEffect, useRef, useState } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#________";

interface TextScrambleProps {
  text: string;
  className?: string;
  as?: "span" | "a" | "button";
  href?: string;
  onClick?: (e: React.MouseEvent<Element, MouseEvent>) => void;
}

export default function TextScramble({
  text,
  className = "",
  as: Tag = "span",
  href,
  onClick,
}: TextScrambleProps) {
  const [displayed, setDisplayed] = useState(text);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const isHovering = useRef(false);

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  function startScramble() {
    if (isHovering.current) return;
    isHovering.current = true;

    let frame = 0;
    const totalFrames = 12;

    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (frame >= totalFrames) {
        clearInterval(intervalRef.current);
        setDisplayed(text);
        isHovering.current = false;
        return;
      }

      setDisplayed(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (frame > i * 0.8) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );
      frame++;
    }, 40);
  }

  return (
    <Tag
      className={className}
      href={href}
      onClick={onClick}
      onMouseEnter={startScramble}
    >
      {displayed}
    </Tag>
  );
}
