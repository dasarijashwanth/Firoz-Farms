"use server";

import { db } from "@/lib/db";
import { readGuestCart, clearGuestCart } from "@/lib/cart-cookie";

export async function mergeGuestCartIntoUserCart(userId: string) {
  const guestCart = await readGuestCart();
  if (guestCart.items.length === 0) return;

  const cart = await db.cart.upsert({
    where: { userId },
    update: {},
    create: { userId },
  });

  for (const item of guestCart.items) {
    const product = await db.product.findUnique({ where: { id: item.productId } });
    if (!product) continue;

    const existing = await db.cartItem.findUnique({
      where: { cartId_productId: { cartId: cart.id, productId: item.productId } },
    });

    const desiredQuantity = (existing?.quantity ?? 0) + item.quantity;
    const quantity = Math.min(desiredQuantity, product.stock);

    await db.cartItem.upsert({
      where: { cartId_productId: { cartId: cart.id, productId: item.productId } },
      update: { quantity },
      create: { cartId: cart.id, productId: item.productId, quantity },
    });
  }

  await clearGuestCart();
}
