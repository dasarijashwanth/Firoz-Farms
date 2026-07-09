import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { ProductCard } from "@/components/shop/ProductCard";
import { ChevronRight } from "lucide-react";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const categories = await db.category.findMany({ select: { slug: true } });
  return categories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const category = await db.category.findUnique({ where: { slug: categorySlug } });
  if (!category) return {};
  return {
    title: category.name,
    description: category.description ?? undefined,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;

  const [category, categories] = await Promise.all([
    db.category.findUnique({ where: { slug: categorySlug } }),
    db.category.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);

  if (!category) notFound();

  const products = await db.product.findMany({
    where: { categoryId: category.id, isActive: true },
    include: { category: true, images: { orderBy: { sortOrder: "asc" }, take: 1 } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <nav className="flex items-center gap-1.5 font-sans text-sm text-muted-foreground">
        <Link href="/products" className="hover:text-organic-green">
          Products
        </Link>
        <ChevronRight className="size-3.5" />
        <span className="text-foreground">{category.name}</span>
      </nav>

      <div className="mt-4 max-w-2xl">
        <h1 className="font-heading text-3xl font-bold text-organic-green-dark sm:text-4xl">
          {category.name}
        </h1>
        {category.description && (
          <p className="mt-2 font-sans text-muted-foreground">{category.description}</p>
        )}
      </div>

      <div className="mt-8 flex flex-wrap gap-2 border-b border-border pb-6">
        <Link
          href="/products"
          className="rounded-full border border-border px-4 py-1.5 font-button text-sm text-foreground hover:border-organic-green hover:text-organic-green"
        >
          All
        </Link>
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={`/products/${c.slug}`}
            className={
              c.slug === category.slug
                ? "rounded-full border border-organic-green bg-organic-green px-4 py-1.5 font-button text-sm text-white"
                : "rounded-full border border-border px-4 py-1.5 font-button text-sm text-foreground hover:border-organic-green hover:text-organic-green"
            }
          >
            {c.name}
          </Link>
        ))}
      </div>

      {products.length === 0 ? (
        <p className="mt-12 text-center font-sans text-muted-foreground">
          No products in this category yet — check back soon.
        </p>
      ) : (
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
      )}
    </div>
  );
}
