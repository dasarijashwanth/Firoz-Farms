import Link from "next/link";
import { Star } from "lucide-react";
import { SmartImage } from "@/components/shared/SmartImage";
import { Badge } from "@/components/ui/badge";
import { formatPrice, toPlainNumber } from "@/lib/format";

export interface ProductCardData {
  slug: string;
  name: string;
  shortDescription: string | null;
  price: number | string;
  compareAtPrice: number | string | null;
  unit: string;
  avgRating: number | string;
  reviewCount: number;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  categorySlug: string;
  imageUrl?: string | null;
}

export function ProductCard({ product }: { product: ProductCardData }) {
  const price = toPlainNumber(product.price);
  const compareAt = product.compareAtPrice ? toPlainNumber(product.compareAtPrice) : null;
  const rating = toPlainNumber(product.avgRating);

  return (
    <Link
      href={`/products/${product.categorySlug}/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-square overflow-hidden bg-beige">
        <SmartImage
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex gap-1.5">
          {product.isBestSeller && (
            <Badge className="bg-gold text-organic-green-dark">Best Seller</Badge>
          )}
          {product.isFeatured && !product.isBestSeller && (
            <Badge className="bg-organic-green text-white">Featured</Badge>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <h3 className="font-heading text-base font-semibold text-foreground">
          {product.name}
        </h3>
        {product.shortDescription && (
          <p className="line-clamp-2 font-sans text-sm text-muted-foreground">
            {product.shortDescription}
          </p>
        )}
        <div className="flex items-center gap-1 pt-1 text-xs text-muted-foreground">
          <Star className="size-3.5 fill-gold text-gold" />
          <span>{rating.toFixed(1)}</span>
          <span>({product.reviewCount})</span>
        </div>
        <div className="mt-auto flex items-baseline gap-2 pt-2">
          <span className="font-heading text-lg font-semibold text-organic-green">
            {formatPrice(price)}
          </span>
          {compareAt && compareAt > price && (
            <span className="font-sans text-sm text-muted-foreground line-through">
              {formatPrice(compareAt)}
            </span>
          )}
          <span className="font-sans text-xs text-muted-foreground">/ {product.unit}</span>
        </div>
      </div>
    </Link>
  );
}
