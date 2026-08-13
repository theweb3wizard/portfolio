import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { ENV } from "./_core/env";

export const inquiryInputSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(320),
  company: z.string().trim().max(160).optional().default(""),
  projectUrl: z.string().trim().url().max(500).optional().or(z.literal("")),
  description: z.string().trim().min(30).max(2000),
  situation: z.string().trim().min(1).max(50),
  stage: z.string().trim().min(1).max(50),
  timeline: z.string().trim().max(80).optional().default(""),
  budget: z.string().trim().max(80).optional().default(""),
  success: z.string().trim().max(2000).optional().default(""),
  consent: z.boolean().refine((value) => value === true, "Consent is required."),
  website: z.string().max(200).optional().default(""),
});

export function buildInquiryNotification(input: z.infer<typeof inquiryInputSchema>) {
  const subject = `New Web3 Wizard Labs inquiry from ${input.name}`;
  const text = [
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Company or project: ${input.company || "Not provided"}`,
    `Project URL: ${input.projectUrl || "Not provided"}`,
    `Situation: ${input.situation}`,
    `Stage: ${input.stage}`,
    `Timeline: ${input.timeline || "Not provided"}`,
    `Budget: ${input.budget || "Not provided"}`,
    "",
    "What they are trying to build:",
    input.description,
    "",
    "What success would look like:",
    input.success || "Not provided",
  ].join("\n");

  return {
    from: ENV.resendFromEmail,
    to: ENV.inquiryNotificationEmail,
    replyTo: input.email,
    subject,
    text,
  };
}

export async function sendInquiryEmail(input: z.infer<typeof inquiryInputSchema>) {
  if (!ENV.resendApiKey || !ENV.resendFromEmail || !ENV.inquiryNotificationEmail) {
    throw new Error("Resend inquiry email configuration is incomplete");
  }

  const email = buildInquiryNotification(input);
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${ENV.resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(email),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Resend email delivery failed (${response.status}): ${detail}`);
  }

  return true;
}

export const appRouter = router({
  inquiries: router({
    create: publicProcedure
      .input(inquiryInputSchema)
      .mutation(async ({ input }) => {
        // Honeypot: if the hidden "website" field is filled, silently succeed
        if (input.website.trim()) return { success: true, notificationSent: false } as const;
        const notificationSent = await sendInquiryEmail(input);
        return { success: true, notificationSent } as const;
      }),
  }),
});

export type AppRouter = typeof appRouter;
