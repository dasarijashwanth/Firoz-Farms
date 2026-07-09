"use client";

import { Quote, Star } from "lucide-react";
import { SmartImage } from "@/components/shared/SmartImage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { TestimonialData } from "./TestimonialsCarousel";

export function TestimonialsGrid({ testimonials }: { testimonials: TestimonialData[] }) {
  const ratings = Array.from(new Set(testimonials.map((t) => t.rating))).sort((a, b) => b - a);
  const tabs = [
    { value: "all", label: "All", data: testimonials },
    ...ratings.map((rating) => ({
      value: String(rating),
      label: `${rating} Star`,
      data: testimonials.filter((t) => t.rating === rating),
    })),
  ];

  return (
    <Tabs defaultValue="all">
      <TabsList className="mx-auto h-10 gap-1 rounded-full bg-beige p-1">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="rounded-full px-4 font-button text-xs font-semibold uppercase tracking-wide data-active:bg-organic-green data-active:text-white"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="mt-10">
          {tab.data.length === 0 ? (
            <p className="text-center font-sans text-sm text-muted-foreground">
              No testimonials in this category yet.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {tab.data.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
}

function TestimonialCard({ testimonial }: { testimonial: TestimonialData }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-transform hover:-translate-y-1">
      <Quote className="size-6 text-gold" />
      <p className="mt-4 flex-1 font-sans text-sm leading-relaxed text-foreground">
        “{testimonial.quote}”
      </p>
      <div className="mt-5 flex items-center gap-3">
        <div className="size-11 shrink-0 overflow-hidden rounded-full border border-border">
          <SmartImage
            src={testimonial.avatarUrl}
            alt={testimonial.name}
            className="object-cover"
          />
        </div>
        <div>
          <p className="font-heading text-sm font-semibold text-foreground">
            {testimonial.name}
          </p>
          {testimonial.location && (
            <p className="font-sans text-xs text-muted-foreground">{testimonial.location}</p>
          )}
        </div>
        <div className="ml-auto flex items-center gap-0.5">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star key={i} className="size-3.5 fill-gold text-gold" />
          ))}
        </div>
      </div>
    </div>
  );
}
