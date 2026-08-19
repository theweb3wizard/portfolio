import { describe, expect, it } from "vitest";
import { projects, insights, services } from "./site";

describe("founder-built portfolio safeguards", () => {
  it("marks every project as a personal project owned by The Web3 Wizard", () => {
    expect(projects.length).toBeGreaterThan(0);
    for (const project of projects) {
      expect(project.isPersonalProject).toBe(true);
      expect(project.builtBy).toBe("The Web3 Wizard");
      expect(project.limitations.length).toBeGreaterThan(0);
    }
  });

  it("every project has a slug, summary, and valid status", () => {
    const validStatuses = ["deployed", "building", "concept"];
    for (const project of projects) {
      expect(project.slug).toBeTruthy();
      expect(project.summary.length).toBeGreaterThan(10);
      expect(validStatuses).toContain(project.status);
    }
  });

  it("featured projects have live or repo URLs as evidence", () => {
    const featured = projects.filter((p) => p.featured);
    expect(featured.length).toBeGreaterThan(0);
    for (const project of featured) {
      const hasEvidence = project.liveUrl || project.repoUrl;
      expect(hasEvidence).toBeTruthy();
    }
  });
});

describe("insights data integrity", () => {
  it("every insight has a slug, datePublished, and a relatedService", () => {
    expect(insights.length).toBeGreaterThan(0);
    for (const insight of insights) {
      expect(insight.slug).toBeTruthy();
      expect(insight.datePublished).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(insight.relatedService.startsWith("/services/")).toBe(true);
    }
  });

  it("no insights are marked as draft (all published)", () => {
    for (const insight of insights) {
      expect(insight.draft).toBe(false);
    }
  });
});

describe("services data integrity", () => {
  it("all three services use the new architecture slugs", () => {
    expect(services.productDiscovery.slug).toBe("product-discovery");
    expect(services.web3MvpDevelopment.slug).toBe("web3-mvp-development");
    expect(services.aiAgentSolanaEngineering.slug).toBe("ai-agent-solana-engineering");
  });
});
