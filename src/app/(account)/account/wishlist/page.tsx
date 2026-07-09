import Link from "next/link";
import { Heart } from "lucide-react";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { ProductCard } from "@/components/shop/ProductCard";
import { Button } from "@/components/ui/button";

export default async function WishlistPage() {
  const session = await auth();
  const wishlistItems = await db.wishlistItem.findMany({
    where: { userId: session!.user.id },
    include: {
      product: {
        include: { category: true, images: { orderBy: { sortOrder: "asc" }, take: 1 } },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-organic-green-dark">My Wishlist</h1>
      <p className="mt-1 font-sans text-sm text-muted-foreground">
        Products you&apos;ve saved for later.
      </p>

      {wishlistItems.length === 0 ? (
        <div className="mt-10 flex flex-col items-center rounded-2xl border border-dashed border-border py-16 text-center">
          <Heart className="size-10 text-muted-foreground" />
          <p className="mt-4 font-sans text-muted-foreground">Your wishlist is empty.</p>
          <Button
            render={<Link href="/products" />}
            className="mt-4 bg-organic-green font-button text-white hover:bg-organic-green-dark"
          >
            Browse Products
          </Button>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3">
          {wishlistItems.map(({ product }) => (
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
