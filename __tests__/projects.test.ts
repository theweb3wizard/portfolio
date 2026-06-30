import { describe, it, expect } from "vitest";
import { projects, featuredProjects } from "@/data/projects";

describe("projects data", () => {
  it("has at least one project", () => {
    expect(projects.length).toBeGreaterThan(0);
  });

  it("every project has required fields", () => {
    projects.forEach((p) => {
      expect(p.id).toBeTruthy();
      expect(p.name).toBeTruthy();
      expect(p.tagline).toBeTruthy();
      expect(p.description).toBeTruthy();
      expect(p.url).toBeTruthy();
      expect(p.stack.length).toBeGreaterThan(0);
      expect(p.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
      expect(["live", "building", "archived"]).toContain(p.status);
    });
  });

  it("all stack items are strings", () => {
    projects.forEach((p) => {
      p.stack.forEach((tech) => {
        expect(typeof tech).toBe("string");
      });
    });
  });

  it("urls are valid", () => {
    projects.forEach((p) => {
      expect(p.url).toMatch(/^https?:\/\//);
    });
  });

  it("has at least one featured project", () => {
    expect(featuredProjects.length).toBeGreaterThan(0);
  });

  it("featured projects are subset of all projects", () => {
    featuredProjects.forEach((fp) => {
      expect(projects.some((p) => p.id === fp.id)).toBe(true);
    });
  });
});
