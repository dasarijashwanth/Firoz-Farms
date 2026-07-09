"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SmartImage } from "@/components/shared/SmartImage";

export interface TestimonialData {
  id: string;
  name: string;
  location: string | null;
  rating: number;
  quote: string;
  avatarUrl: string | null;
}

export function TestimonialsCarousel({ testimonials }: { testimonials: TestimonialData[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  return (
    <div className="relative">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {testimonials.map((t) => (
            <div key={t.id} className="min-w-0 shrink-0 grow-0 basis-full px-2 sm:basis-1/2 lg:basis-1/3">
              <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6">
                <Quote className="size-6 text-gold" />
                <p className="mt-4 flex-1 font-sans text-sm leading-relaxed text-foreground">
                  “{t.quote}”
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="size-10 shrink-0 overflow-hidden rounded-full">
                    <SmartImage src={t.avatarUrl} alt={t.name} className="object-cover" />
                  </div>
                  <div>
                    <p className="font-heading text-sm font-semibold text-foreground">{t.name}</p>
                    {t.location && (
                      <p className="font-sans text-xs text-muted-foreground">{t.location}</p>
                    )}
                  </div>
                  <div className="ml-auto flex items-center gap-0.5">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="size-3.5 fill-gold text-gold" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-3">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full border-organic-green text-organic-green"
          onClick={() => emblaApi?.scrollPrev()}
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="size-4" />
        </Button>
        <div className="flex gap-1.5">
          {testimonials.map((_, i) => (
            <span
              key={i}
              className={`size-1.5 rounded-full transition-colors ${
                i === selected ? "bg-organic-green" : "bg-border"
              }`}
            />
          ))}
        </div>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full border-organic-green text-organic-green"
          onClick={() => emblaApi?.scrollNext()}
          aria-label="Next testimonial"
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
