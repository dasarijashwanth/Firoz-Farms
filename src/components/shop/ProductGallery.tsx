"use client";

import { useState } from "react";
import { SmartImage } from "@/components/shared/SmartImage";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: { url: string; alt: string }[];
  name: string;
}

export function ProductGallery({ images, name }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const gallery = images.length > 0 ? images : [{ url: `placeholder:${name}`, alt: name }];

  return (
    <div>
      <div className="aspect-square overflow-hidden rounded-2xl bg-beige">
        <SmartImage
          src={gallery[active].url}
          alt={gallery[active].alt}
          className="h-full w-full object-cover"
        />
      </div>
      {gallery.length > 1 && (
        <div className="mt-4 flex gap-3">
          {gallery.map((img, i) => (
            <button
              key={img.url + i}
              onClick={() => setActive(i)}
              className={cn(
                "size-16 shrink-0 overflow-hidden rounded-xl bg-beige ring-2 ring-transparent transition-all",
                active === i && "ring-organic-green"
              )}
              aria-label={`View image ${i + 1}`}
            >
              <SmartImage src={img.url} alt={img.alt} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
