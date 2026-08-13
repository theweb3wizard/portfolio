import { publicProcedure, router } from "./_core/trpc.js";
import { z } from "zod";
import { ENV } from "./_core/env.js";

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

export function buildTelegramMessage(input: z.infer<typeof inquiryInputSchema>): string {
  const line = (emoji: string, label: string, value: string) =>
    `${emoji} *${label}:* ${value || "—"}`;

  return [
    "🔔 *New Inquiry — Web3 Wizard Labs*",
    "",
    line("👤", "Name", input.name),
    line("📧", "Email", input.email),
    line("🏢", "Company", input.company),
    line("🔗", "URL", input.projectUrl || ""),
    "",
    line("📌", "Situation", input.situation),
    line("📍", "Stage", input.stage),
    line("⏱", "Timeline", input.timeline),
    line("💰", "Budget", input.budget),
    "",
    "📝 *What they want to build:*",
    input.description,
    "",
    "✅ *What success looks like:*",
    input.success || "—",
  ].join("\n");
}

export async function sendTelegramNotification(input: z.infer<typeof inquiryInputSchema>) {
  if (!ENV.telegramBotToken || !ENV.telegramChatId) {
    throw new Error("Telegram notification configuration is incomplete");
  }

  const response = await fetch(
    `https://api.telegram.org/bot${ENV.telegramBotToken}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: ENV.telegramChatId,
        text: buildTelegramMessage(input),
        parse_mode: "Markdown",
      }),
    }
  );

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Telegram notification failed (${response.status}): ${detail}`);
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
        const notificationSent = await sendTelegramNotification(input);
        return { success: true, notificationSent } as const;
      }),
  }),
});

export type AppRouter = typeof appRouter;
