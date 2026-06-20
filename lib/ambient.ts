export const SECTION_HUES: Record<string, number> = {
  hero: 239,
  about: 258,
  arsenal: 188,
  work: 160,
  mission: 38,
  contact: 239,
};

export function lerpHue(h1: number, h2: number, t: number): number {
  let diff = h2 - h1;
  if (diff > 180) diff -= 360;
  if (diff < -180) diff += 360;
  return ((h1 + diff * t) % 360 + 360) % 360;
}
