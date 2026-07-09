"use client";

import { useActionState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitContactForm, type ContactActionState } from "@/actions/contact.actions";

const initialState: ContactActionState = { status: "idle" };

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState);

  return (
    <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
      <h2 className="font-heading text-2xl font-bold text-organic-green-dark">
        Send Us a Message
      </h2>
      <p className="mt-2 font-sans text-sm text-muted-foreground">
        Fill out the form below and our team will get back to you within one business
        day.
      </p>

      <form action={formAction} className="mt-6 flex flex-col gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" required placeholder="Your full name" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="phone">Phone (optional)</Label>
            <Input id="phone" name="phone" type="tel" placeholder="+91 90000 00000" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="subject">Subject (optional)</Label>
            <Input id="subject" name="subject" placeholder="What's this about?" />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            name="message"
            required
            minLength={10}
            rows={5}
            placeholder="Tell us how we can help…"
          />
        </div>

        <Button
          type="submit"
          disabled={isPending}
          size="lg"
          className="w-full bg-organic-green font-button text-white hover:bg-organic-green-dark sm:w-fit"
        >
          <Send data-icon="inline-start" />
          {isPending ? "Sending…" : "Send Message"}
        </Button>

        {state.status !== "idle" && (
          <p
            role="status"
            className={`font-sans text-sm ${
              state.status === "success" ? "text-organic-green" : "text-destructive"
            }`}
          >
            {state.message}
          </p>
        )}
      </form>
    </div>
  );
}
