import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { db } from "@/lib/db";
import { ProductCard } from "@/components/shop/ProductCard";
import { Button } from "@/components/ui/button";

interface ProductsShowcaseProps {
  title: string;
  subtitle: string;
  filter: "featured" | "bestSeller";
  eyebrow: string;
}

export async function ProductsShowcase({
  title,
  subtitle,
  filter,
  eyebrow,
}: ProductsShowcaseProps) {
  const products = await db.product.findMany({
    where: filter === "featured" ? { isFeatured: true } : { isBestSeller: true },
    include: { category: true, images: { orderBy: { sortOrder: "asc" }, take: 1 } },
    take: 8,
    orderBy: { createdAt: "desc" },
  });

  if (products.length === 0) return null;

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="font-button text-sm font-semibold uppercase tracking-widest text-gold">
              {eyebrow}
            </span>
            <h2 className="mt-3 font-heading text-3xl font-bold text-organic-green-dark sm:text-4xl">
              {title}
            </h2>
            <p className="mt-2 font-sans text-muted-foreground">{subtitle}</p>
          </div>
          <Button render={<Link href="/products" />} variant="link" className="font-button text-organic-green">
            View All Products <ArrowRight className="ml-1 size-4" />
          </Button>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={{
                slug: product.slug,
                name: product.name,
                shortDescription: product.shortDescription,
                price: product.price.toString(),
                compareAtPrice: product.compareAtPrice?.toString() ?? null,
                unit: product.unit,
                avgRating: product.avgRating.toString(),
                reviewCount: product.reviewCount,
                isBestSeller: product.isBestSeller,
                isFeatured: product.isFeatured,
                categorySlug: product.category.slug,
                imageUrl: product.images[0]?.url,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
