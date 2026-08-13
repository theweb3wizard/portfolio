import { afterEach, describe, expect, it, vi } from "vitest";
import { buildInquiryNotification, inquiryInputSchema, sendInquiryEmail } from "./routers";

const valid = {
  name: "Khalid Test",
  email: "founder@example.com",
  company: "Example Labs",
  projectUrl: "",
  description: "I need a focused Web3 product with a clear first user journey.",
  situation: "product-builds",
  stage: "prototype",
  timeline: "next-1-3-months",
  budget: "2k-10k",
  success: "A usable first version with a documented handover.",
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
});

describe("Resend inquiry delivery", () => {
  it("builds a replyable email payload without persistence metadata", () => {
    const input = inquiryInputSchema.parse(valid);
    const email = buildInquiryNotification(input);

    expect(email).toMatchObject({
      from: "inquiries@theweb3wizard.xyz",
      to: "theweb3wizard00@gmail.com",
      replyTo: "founder@example.com",
      subject: "New Web3 Wizard Labs inquiry from Khalid Test",
    });
    expect(email.text).toContain("What they are trying to build:");
    expect(email.text).not.toContain("notificationSent");
  });

  it("sends the email through Resend and returns success", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ id: "email_123" }), { status: 200 }),
    );

    const input = inquiryInputSchema.parse(valid);
    await expect(sendInquiryEmail(input)).resolves.toBe(true);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.resend.com/emails",
      expect.objectContaining({ method: "POST" }),
    );
  });

  it("surfaces a useful error when Resend rejects delivery", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response("invalid sender", { status: 422 }),
    );

    const input = inquiryInputSchema.parse(valid);
    await expect(sendInquiryEmail(input)).rejects.toThrow("Resend email delivery failed (422)");
  });
});
