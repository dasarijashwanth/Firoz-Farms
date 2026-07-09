"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function toggleWishlist(productId: string) {
  const session = await auth();
  if (!session?.user) {
    return { status: "unauthenticated" as const };
  }

  const userId = session.user.id;
  const existing = await db.wishlistItem.findUnique({
    where: { userId_productId: { userId, productId } },
  });

  if (existing) {
    await db.wishlistItem.delete({ where: { id: existing.id } });
    revalidatePath("/account/wishlist");
    return { status: "removed" as const };
  }

  await db.wishlistItem.create({ data: { userId, productId } });
  revalidatePath("/account/wishlist");
  return { status: "added" as const };
}

export async function removeFromWishlist(productId: string) {
  const session = await auth();
  if (!session?.user) return;

  await db.wishlistItem.deleteMany({
    where: { userId: session.user.id, productId },
  });
  revalidatePath("/account/wishlist");
}

export async function isProductWishlisted(productId: string) {
  const session = await auth();
  if (!session?.user) return false;

  const existing = await db.wishlistItem.findUnique({
    where: { userId_productId: { userId: session.user.id, productId } },
  });
  return !!existing;
}
