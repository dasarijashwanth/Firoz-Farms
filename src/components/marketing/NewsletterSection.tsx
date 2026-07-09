"use client";

import { useActionState } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { subscribeToNewsletter, type NewsletterActionState } from "@/actions/newsletter.actions";

const initialState: NewsletterActionState = { status: "idle" };

export function NewsletterSection() {
  const [state, formAction, isPending] = useActionState(subscribeToNewsletter, initialState);

  return (
    <section className="bg-gold/15 py-16">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-gold text-white">
          <Mail className="size-6" />
        </div>
        <h2 className="mt-5 font-heading text-2xl font-bold text-organic-green-dark sm:text-3xl">
          Stay in the Loop
        </h2>
        <p className="mt-2 font-sans text-muted-foreground">
          Farm news, seasonal produce drops, and healthy recipes — straight to your inbox.
        </p>
        <form action={formAction} className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
          <Input
            type="email"
            name="email"
            required
            placeholder="you@example.com"
            className="bg-white"
          />
          <Button
            type="submit"
            disabled={isPending}
            className="bg-organic-green font-button text-white hover:bg-organic-green-dark"
          >
            {isPending ? "Subscribing…" : "Subscribe"}
          </Button>
        </form>
        {state.status !== "idle" && (
          <p
            className={`mt-3 font-sans text-sm ${
              state.status === "success" ? "text-organic-green" : "text-destructive"
            }`}
          >
            {state.message}
          </p>
        )}
      </div>
    </section>
  );
}
