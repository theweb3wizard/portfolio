import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";
import { lerpHue, SECTION_HUES } from "@/lib/ambient";

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("px-4", "py-2")).toBe("px-4 py-2");
  });

  it("handles conditional classes", () => {
    expect(cn("base", false && "hidden", "visible")).toBe("base visible");
  });

  it("merges tailwind classes correctly", () => {
    expect(cn("px-4", "px-6")).toBe("px-6");
  });
});

describe("lerpHue", () => {
  it("interpolates between two hues", () => {
    const result = lerpHue(0, 100, 0.5);
    expect(result).toBe(50);
  });

  it("handles hue wrap-around (360 -> 0)", () => {
    const result = lerpHue(350, 10, 0.5);
    expect(result).toBe(0);
  });

  it("returns start hue at t=0", () => {
    expect(lerpHue(100, 200, 0)).toBe(100);
  });

  it("returns end hue at t=1", () => {
    expect(lerpHue(100, 200, 1)).toBe(200);
  });
});

describe("SECTION_HUES", () => {
  it("has all required sections", () => {
    expect(Object.keys(SECTION_HUES)).toEqual([
      "hero", "about", "arsenal", "work", "mission", "contact",
    ]);
  });

  it("has valid hue values (0-360)", () => {
    Object.values(SECTION_HUES).forEach((hue) => {
      expect(hue).toBeGreaterThanOrEqual(0);
      expect(hue).toBeLessThan(360);
    });
  });
});
