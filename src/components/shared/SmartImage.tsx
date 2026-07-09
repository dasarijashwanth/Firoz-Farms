import Image from "next/image";
import { cn } from "@/lib/utils";
import { SVGPlaceholder } from "./SVGPlaceholder";

interface SmartImageProps {
  src?: string | null;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
}

/**
 * Renders a real next/image when `src` is a real URL, or a deterministic
 * brand-palette SVG placeholder when `src` is missing or prefixed
 * "placeholder:<seed>". Swapping in real photography later only requires
 * updating the stored URL — no component changes.
 */
export function SmartImage({
  src,
  alt,
  className,
  fill,
  width,
  height,
  sizes,
}: SmartImageProps) {
  if (!src || src.startsWith("placeholder:")) {
    const seed = src ? src.slice("placeholder:".length) : alt;
    return (
      <SVGPlaceholder
        seed={seed}
        label={undefined}
        className={cn("h-full w-full", className)}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      sizes={sizes}
      className={className}
    />
  );
}
