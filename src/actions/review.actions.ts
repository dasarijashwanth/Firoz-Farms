"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

const reviewSchema = z.object({
  productId: z.string(),
  rating: z.coerce.number().min(1).max(5),
  title: z.string().optional(),
  comment: z.string().min(5, "Please share a few words about this product"),
});

export type ReviewActionState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function submitReview(
  _prevState: ReviewActionState,
  formData: FormData
): Promise<ReviewActionState> {
  const session = await auth();
  if (!session?.user) {
    return { status: "error", message: "Please sign in to leave a review." };
  }

  const parsed = reviewSchema.safeParse({
    productId: formData.get("productId"),
    rating: formData.get("rating"),
    title: formData.get("title") || undefined,
    comment: formData.get("comment"),
  });

  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Invalid review" };
  }

  const { productId, rating, title, comment } = parsed.data;

  await db.review.create({
    data: { productId, userId: session.user.id, rating, title, comment },
  });

  const aggregate = await db.review.aggregate({
    where: { productId, isApproved: true },
    _avg: { rating: true },
    _count: true,
  });

  await db.product.update({
    where: { id: productId },
    data: {
      avgRating: aggregate._avg.rating ?? 0,
      reviewCount: aggregate._count,
    },
  });

  const product = await db.product.findUnique({ where: { id: productId }, include: { category: true } });
  if (product) {
    revalidatePath(`/products/${product.category.slug}/${product.slug}`);
  }

  return { status: "success", message: "Thank you for your review!" };
}
