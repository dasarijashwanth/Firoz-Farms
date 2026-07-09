"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterSection() {
  const [message, setMessage] = useState<string | null>(null);

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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setMessage("This is a static preview — subscribing runs on the deployed app.");
          }}
          className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
        >
          <Input type="email" required placeholder="you@example.com" className="bg-white" />
          <Button
            type="submit"
            className="bg-organic-green font-button text-white hover:bg-organic-green-dark"
          >
            Subscribe
          </Button>
        </form>
        {message && <p className="mt-3 font-sans text-sm text-muted-foreground">{message}</p>}
      </div>
    </section>
  );
}
