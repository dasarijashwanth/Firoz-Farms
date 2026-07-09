import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Leaf, Star, User } from "lucide-react";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { ProductGallery } from "@/components/shop/ProductGallery";
import { AddToCartButton } from "@/components/shop/AddToCartButton";
import { WishlistButton } from "@/components/shop/WishlistButton";
import { ReviewForm } from "@/components/shop/ReviewForm";
import { ProductCard } from "@/components/shop/ProductCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPrice, toPlainNumber } from "@/lib/format";

interface ProductPageProps {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await db.product.findUnique({ where: { slug } });
  if (!product) return {};
  return {
    title: product.name,
    description: product.shortDescription ?? product.description.slice(0, 150),
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { category: categorySlug, slug } = await params;

  const product = await db.product.findUnique({
    where: { slug },
    include: {
      category: true,
      images: { orderBy: { sortOrder: "asc" } },
      reviews: {
        where: { isApproved: true },
        include: { user: true },
        orderBy: { createdAt: "desc" },
        take: 10,
      },
    },
  });

  if (!product || product.category.slug !== categorySlug) notFound();

  const session = await auth();
  const isWishlisted = session?.user
    ? !!(await db.wishlistItem.findUnique({
        where: { userId_productId: { userId: session.user.id, productId: product.id } },
      }))
    : false;

  const relatedProducts = await db.product.findMany({
    where: { categoryId: product.categoryId, id: { not: product.id }, isActive: true },
    include: { category: true, images: { orderBy: { sortOrder: "asc" }, take: 1 } },
    take: 4,
  });

  const price = toPlainNumber(product.price);
  const compareAt = product.compareAtPrice ? toPlainNumber(product.compareAtPrice) : null;
  const nutritionFacts = product.nutritionFacts as Record<string, string> | null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <nav className="flex items-center gap-1.5 font-sans text-sm text-muted-foreground">
        <Link href="/products" className="hover:text-organic-green">
          Products
        </Link>
        <ChevronRight className="size-3.5" />
        <Link href={`/products/${product.category.slug}`} className="hover:text-organic-green">
          {product.category.name}
        </Link>
        <ChevronRight className="size-3.5" />
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <ProductGallery
          images={product.images.map((img) => ({ url: img.url, alt: img.alt ?? product.name }))}
          name={product.name}
        />

        <div>
          <div className="flex flex-wrap gap-1.5">
            {product.isBestSeller && (
              <Badge className="bg-gold text-organic-green-dark">Best Seller</Badge>
            )}
            {product.isOrganicCertified && (
              <Badge className="bg-organic-green text-white">
                <Leaf className="size-3" /> Organic Certified
              </Badge>
            )}
          </div>
          <h1 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">
            {product.name}
          </h1>
          {product.shortDescription && (
            <p className="mt-2 font-sans text-muted-foreground">{product.shortDescription}</p>
          )}

          <div className="mt-3 flex items-center gap-1.5">
            <Star className="size-4 fill-gold text-gold" />
            <span className="font-sans text-sm font-medium text-foreground">
              {toPlainNumber(product.avgRating).toFixed(1)}
            </span>
            <span className="font-sans text-sm text-muted-foreground">
              ({product.reviewCount} reviews)
            </span>
          </div>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="font-heading text-3xl font-bold text-organic-green">
              {formatPrice(price)}
            </span>
            {compareAt && compareAt > price && (
              <span className="font-sans text-lg text-muted-foreground line-through">
                {formatPrice(compareAt)}
              </span>
            )}
            <span className="font-sans text-sm text-muted-foreground">/ {product.unit}</span>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <AddToCartButton productId={product.id} name={product.name} stock={product.stock} />
            <WishlistButton productId={product.id} initialWishlisted={isWishlisted} />
          </div>

          {product.farmerName && (
            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-border bg-cream p-4">
              <User className="mt-0.5 size-5 shrink-0 text-organic-green" />
              <div>
                <p className="font-heading text-sm font-semibold text-foreground">
                  Cared for by {product.farmerName}
                </p>
                {product.sourceFarmNote && (
                  <p className="mt-1 font-sans text-sm text-muted-foreground">
                    {product.sourceFarmNote}
                  </p>
                )}
              </div>
            </div>
          )}

          {product.benefits.length > 0 && (
            <div className="mt-6">
              <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-earth-brown">
                Benefits
              </h3>
              <ul className="mt-2 grid grid-cols-2 gap-2">
                {product.benefits.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-1.5 font-sans text-sm text-foreground"
                  >
                    <Leaf className="mt-0.5 size-3.5 shrink-0 text-organic-green" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="mt-16 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="font-heading text-xl font-bold text-organic-green-dark">Description</h2>
          <p className="mt-3 font-sans leading-relaxed text-foreground">{product.description}</p>

          {product.ingredients && (
            <div className="mt-6">
              <h3 className="font-heading text-base font-semibold text-foreground">
                Ingredients
              </h3>
              <p className="mt-1 font-sans text-sm text-muted-foreground">{product.ingredients}</p>
            </div>
          )}

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {product.storageInfo && (
              <div className="rounded-2xl border border-border bg-card p-4">
                <h3 className="font-heading text-sm font-semibold text-foreground">
                  Storage Instructions
                </h3>
                <p className="mt-1 font-sans text-sm text-muted-foreground">
                  {product.storageInfo}
                </p>
              </div>
            )}
            {product.shelfLife && (
              <div className="rounded-2xl border border-border bg-card p-4">
                <h3 className="font-heading text-sm font-semibold text-foreground">Shelf Life</h3>
                <p className="mt-1 font-sans text-sm text-muted-foreground">{product.shelfLife}</p>
              </div>
            )}
          </div>
        </div>

        {nutritionFacts && (
          <div className="rounded-2xl border border-border bg-cream p-6">
            <h2 className="font-heading text-lg font-bold text-organic-green-dark">
              Nutrition Facts
            </h2>
            <dl className="mt-4 divide-y divide-border">
              {Object.entries(nutritionFacts).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 font-sans text-sm">
                  <dt className="text-muted-foreground">{key}</dt>
                  <dd className="font-medium text-foreground">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>

      <div className="mt-16 border-t border-border pt-12">
        <h2 className="font-heading text-xl font-bold text-organic-green-dark">
          Customer Reviews
        </h2>
        {product.reviews.length === 0 ? (
          <p className="mt-3 font-sans text-sm text-muted-foreground">
            No reviews yet — be the first to review this product.
          </p>
        ) : (
          <div className="mt-6 space-y-6">
            {product.reviews.map((review) => (
              <div key={review.id} className="border-b border-border pb-6 last:border-0">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="size-3.5 fill-gold text-gold" />
                    ))}
                  </div>
                  {review.title && (
                    <span className="font-heading text-sm font-semibold text-foreground">
                      {review.title}
                    </span>
                  )}
                </div>
                {review.comment && (
                  <p className="mt-2 font-sans text-sm text-foreground">{review.comment}</p>
                )}
                <p className="mt-1 font-sans text-xs text-muted-foreground">
                  {review.user.name ?? "Verified Customer"}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 max-w-lg">
          <h3 className="font-heading text-base font-semibold text-foreground">
            {session?.user ? "Write a Review" : "Sign in to write a review"}
          </h3>
          {session?.user ? (
            <div className="mt-3">
              <ReviewForm productId={product.id} />
            </div>
          ) : (
            <Button
              render={<Link href="/login" />}
              variant="outline"
              className="mt-3 font-button"
            >
              Sign In
            </Button>
          )}
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-16 border-t border-border pt-12">
          <h2 className="font-heading text-xl font-bold text-organic-green-dark">
            You May Also Like
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-4">
            {relatedProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={{
                  slug: p.slug,
                  name: p.name,
                  shortDescription: p.shortDescription,
                  price: p.price.toString(),
                  compareAtPrice: p.compareAtPrice?.toString() ?? null,
                  unit: p.unit,
                  avgRating: p.avgRating.toString(),
                  reviewCount: p.reviewCount,
                  isBestSeller: p.isBestSeller,
                  isFeatured: p.isFeatured,
                  categorySlug: p.category.slug,
                  imageUrl: p.images[0]?.url,
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
