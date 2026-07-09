"use server";

import { z } from "zod";
import { db } from "@/lib/db";

const emailSchema = z.string().email();

export type NewsletterActionState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function subscribeToNewsletter(
  _prevState: NewsletterActionState,
  formData: FormData
): Promise<NewsletterActionState> {
  const email = formData.get("email");
  const parsed = emailSchema.safeParse(email);

  if (!parsed.success) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  try {
    await db.newsletterSubscriber.upsert({
      where: { email: parsed.data },
      update: {},
      create: { email: parsed.data },
    });
    return { status: "success", message: "You're subscribed! Watch your inbox for farm updates." };
  } catch {
    return { status: "error", message: "Something went wrong. Please try again." };
  }
}
