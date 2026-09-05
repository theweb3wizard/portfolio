import { afterEach, describe, expect, it, vi } from "vitest";

// Mock ENV so sendTelegramNotification sees valid config
vi.mock("./_core/env.js", () => ({
  ENV: { telegramBotToken: "test-token", telegramChatId: "test-chat-id" },
}));

import { buildTelegramMessage, inquiryInputSchema, sendTelegramNotification } from "./routers";

const valid = {
  name: "Khalid Test",
  email: "founder@example.com",
  company: "Example Labs",
  projectUrl: "",
  description: "I need a focused Web3 product with a clear first user journey and an AI agent component.",
  situation: "web3-mvp-development",
  stage: "prototype",
  timeline: "1-3-months",
  budget: "2k-10k",
  success: "A deployed AI agent and Solana integration with documented handover.",
  consent: true,
  website: "",
};

afterEach(() => {
  vi.restoreAllMocks();
});

describe("inquiryInputSchema", () => {
  it("accepts a complete inquiry", () => {
    expect(inquiryInputSchema.parse(valid)).toMatchObject(valid);
  });

  it("rejects missing consent", () => {
    expect(() => inquiryInputSchema.parse({ ...valid, consent: false })).toThrow();
  });

  it("accepts a honeypot value for the server to short-circuit safely", () => {
    expect(inquiryInputSchema.parse({ ...valid, website: "bot-filled" }).website).toBe("bot-filled");
  });

  it("rejects short project descriptions", () => {
    expect(() => inquiryInputSchema.parse({ ...valid, description: "Too short" })).toThrow();
  });

  it("rejects invalid email", () => {
    expect(() => inquiryInputSchema.parse({ ...valid, email: "not-an-email" })).toThrow();
  });
});

describe("buildTelegramMessage", () => {
  it("builds a Telegram message containing all key inquiry fields", () => {
    const input = inquiryInputSchema.parse(valid);
    const message = buildTelegramMessage(input);

    expect(message).toContain("New Inquiry — The Web3 Wizard Labs");
    expect(message).toContain("Khalid Test");
    expect(message).toContain("founder@example.com");
    expect(message).toContain("What they want to build:");
    expect(message).not.toContain("notificationSent");
  });
});

describe("sendTelegramNotification", () => {
  it("sends the message through the Telegram Bot API and returns true", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ ok: true, result: { message_id: 42 } }), { status: 200 }),
    );

    const input = inquiryInputSchema.parse(valid);
    await expect(sendTelegramNotification(input)).resolves.toBe(true);
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining("api.telegram.org"),
      expect.objectContaining({ method: "POST" }),
    );
  });

  it("throws a useful error when Telegram rejects the request", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response("Unauthorized", { status: 401 }),
    );

    const input = inquiryInputSchema.parse(valid);
    await expect(sendTelegramNotification(input)).rejects.toThrow("Telegram notification failed (401)");
  });
});
