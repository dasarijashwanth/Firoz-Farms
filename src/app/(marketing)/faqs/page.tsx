import Link from "next/link";
import { HelpCircle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqCategories, faqs } from "@/data/placeholder/faqs";

export const metadata = {
  title: "FAQs | Firoz Farms",
  description:
    "Answers to common questions about ordering, delivery, subscriptions, product quality, payments, and support at Firoz Farms.",
};

export default function FaqsPage() {
  return (
    <>
      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <span className="font-button text-sm font-semibold uppercase tracking-widest text-gold">
            Need Help?
          </span>
          <h1 className="mt-3 font-heading text-4xl font-bold text-organic-green-dark sm:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 font-sans text-muted-foreground">
            Everything you need to know about ordering, delivery, subscriptions, and
            the quality behind every Firoz Farms product. Can&apos;t find your answer?
            Reach out and we&apos;ll help directly.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-12">
            {faqCategories.map((category) => {
              const items = faqs.filter((faq) => faq.category === category);
              if (items.length === 0) return null;

              return (
                <div key={category}>
                  <h2 className="font-heading text-2xl font-bold text-organic-green-dark">
                    {category}
                  </h2>
                  <div className="mt-4 rounded-2xl border border-border bg-card px-5 sm:px-6">
                    <Accordion multiple>
                      {items.map((faq) => (
                        <AccordionItem key={faq.question}>
                          <AccordionTrigger className="font-heading text-base font-semibold text-foreground sm:text-lg">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent>
                            <p className="font-sans text-sm leading-relaxed text-muted-foreground sm:text-base">
                              {faq.answer}
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-16 flex flex-col items-center gap-4 rounded-2xl border border-border bg-organic-green/10 px-6 py-10 text-center sm:px-10">
            <div className="flex size-14 items-center justify-center rounded-full bg-organic-green text-white">
              <HelpCircle className="size-6" />
            </div>
            <h3 className="font-heading text-2xl font-bold text-organic-green-dark">
              Still Have Questions?
            </h3>
            <p className="max-w-md font-sans text-muted-foreground">
              Our team is happy to help with anything not covered here — delivery,
              subscriptions, or your order.
            </p>
            <Button
              render={<Link href="/contact" />}
              className="bg-organic-green font-button text-white hover:bg-organic-green-dark"
            >
              <MessageCircle data-icon="inline-start" />
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
