"use client";

import { useState } from "react";
import { SmartImage } from "@/components/shared/SmartImage";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export interface GalleryItem {
  seed: string;
  alt: string;
  category: string;
  /** Controls how much space the tile takes up in the grid, for visual rhythm. */
  size?: "normal" | "wide" | "large";
}

const sizeClasses: Record<NonNullable<GalleryItem["size"]>, string> = {
  normal: "",
  wide: "sm:col-span-2",
  large: "sm:col-span-2 sm:row-span-2",
};

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const categories = ["All", ...Array.from(new Set(items.map((item) => item.category)))];
  const [activeCategory, setActiveCategory] = useState("All");
  const [selected, setSelected] = useState<GalleryItem | null>(null);

  const filtered =
    activeCategory === "All" ? items : items.filter((item) => item.category === activeCategory);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className={cn(
              "rounded-full border px-4 py-1.5 font-button text-xs font-semibold uppercase tracking-wide transition-colors",
              activeCategory === category
                ? "border-organic-green bg-organic-green text-white"
                : "border-border bg-card text-muted-foreground hover:border-organic-green hover:text-organic-green"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:[grid-auto-flow:dense] sm:auto-rows-[180px] lg:grid-cols-4 lg:auto-rows-[200px]">
        {filtered.map((item, i) => (
          <button
            key={`${item.seed}-${i}`}
            type="button"
            onClick={() => setSelected(item)}
            className={cn(
              "group relative aspect-square overflow-hidden rounded-2xl border border-border sm:aspect-auto",
              sizeClasses[item.size ?? "normal"]
            )}
          >
            <SmartImage
              src={`placeholder:${item.seed}`}
              alt={item.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <Badge className="absolute bottom-3 left-3 bg-white/90 text-organic-green-dark shadow-sm">
              {item.category}
            </Badge>
          </button>
        ))}
      </div>

      <Dialog open={selected !== null} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="overflow-hidden bg-card p-0 sm:max-w-2xl">
          {selected && (
            <>
              <div className="relative aspect-[16/10]">
                <SmartImage
                  src={`placeholder:${selected.seed}`}
                  alt={selected.alt}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <Badge className="bg-organic-green text-white">{selected.category}</Badge>
                <DialogTitle className="mt-3 font-heading text-xl font-semibold text-foreground">
                  {selected.alt}
                </DialogTitle>
                <DialogDescription className="mt-1 font-sans text-sm text-muted-foreground">
                  A glimpse into life at Firoz Farms — {selected.category.toLowerCase()}.
                </DialogDescription>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
