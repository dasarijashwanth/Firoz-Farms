import Link from "next/link";
import { db } from "@/lib/db";
import { ProductCard } from "@/components/shop/ProductCard";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Shop All Products",
  description:
    "Browse farm-fresh milk, dairy, eggs, honey, organic produce, grains and gift boxes from Firoz Farms.",
};

export default async function ProductsPage() {
  // Static preview build: sort-by-query-param needs a server, so this page
  // always renders the newest-first ordering baked in at build time.
  const sort = "newest";

  const [categories, products] = await Promise.all([
    db.category.findMany({ orderBy: { sortOrder: "asc" } }),
    db.product.findMany({
      where: { isActive: true },
      include: { category: true, images: { orderBy: { sortOrder: "asc" }, take: 1 } },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  const sortOptions = [{ value: "newest", label: "Newest" }];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <span className="font-button text-sm font-semibold uppercase tracking-widest text-gold">
          Farm to Home
        </span>
        <h1 className="mt-3 font-heading text-3xl font-bold text-organic-green-dark sm:text-4xl">
          Shop All Products
        </h1>
        <p className="mt-2 font-sans text-muted-foreground">
          Fresh dairy, produce, and pantry staples — delivered straight from our farm.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
        <Link
          href="/products"
          className="rounded-full border border-organic-green bg-organic-green px-4 py-1.5 font-button text-sm text-white"
        >
          All
        </Link>
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/products/${category.slug}`}
            className="rounded-full border border-border px-4 py-1.5 font-button text-sm text-foreground transition-colors hover:border-organic-green hover:text-organic-green"
          >
            {category.name}
          </Link>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
        <p className="font-sans text-sm text-muted-foreground">
          {products.length} products
        </p>
        <div className="flex flex-wrap gap-2">
          {sortOptions.map((opt) => (
            <Link
              key={opt.value}
              href={opt.value === "newest" ? "/products" : `/products?sort=${opt.value}`}
              className={cn(
                "rounded-full px-3 py-1 font-sans text-xs transition-colors",
                (sort ?? "newest") === opt.value
                  ? "bg-beige text-organic-green-dark"
                  : "text-muted-foreground hover:text-organic-green"
              )}
            >
              {opt.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
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
  );
}
