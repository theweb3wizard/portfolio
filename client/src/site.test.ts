import { describe, expect, it } from "vitest";
import { projects } from "./site";

describe("founder-built portfolio safeguards", () => {
  it("marks every project as a personal project owned by Khalid", () => {
    expect(projects.length).toBeGreaterThan(0);
    for (const project of projects) {
      expect(project.isPersonalProject).toBe(true);
      expect(project.builtBy).toBe("The Web3 Wizard");
      expect(project.limitations.length).toBeGreaterThan(0);
    }
  });
});
