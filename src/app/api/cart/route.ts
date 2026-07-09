import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { readGuestCart, writeGuestCart, type GuestCart } from "@/lib/cart-cookie";

async function getOrCreateUserCartId(userId: string) {
  const cart = await db.cart.upsert({
    where: { userId },
    update: {},
    create: { userId },
  });
  return cart.id;
}

async function buildCartResponse(items: { productId: string; quantity: number }[]) {
  const productIds = items.map((i) => i.productId);
  const products = productIds.length
    ? await db.product.findMany({
        where: { id: { in: productIds } },
        include: { category: true, images: { orderBy: { sortOrder: "asc" }, take: 1 } },
      })
    : [];

  const resolved = items
    .map((item) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) return null;
      const quantity = Math.min(item.quantity, product.stock);
      return {
        productId: product.id,
        name: product.name,
        slug: product.slug,
        categorySlug: product.category.slug,
        unit: product.unit,
        price: product.price.toString(),
        imageUrl: product.images[0]?.url ?? null,
        quantity,
        stock: product.stock,
      };
    })
    .filter((i): i is NonNullable<typeof i> => i !== null);

  const subtotal = resolved.reduce((sum, i) => sum + parseFloat(i.price) * i.quantity, 0);
  const count = resolved.reduce((sum, i) => sum + i.quantity, 0);

  return { items: resolved, subtotal, count };
}

async function readItems(userId: string | undefined): Promise<{
  items: { productId: string; quantity: number }[];
  guestCart: GuestCart | null;
  cartId: string | null;
}> {
  if (userId) {
    const cartId = await getOrCreateUserCartId(userId);
    const cartItems = await db.cartItem.findMany({ where: { cartId } });
    return {
      items: cartItems.map((i) => ({ productId: i.productId, quantity: i.quantity })),
      guestCart: null,
      cartId,
    };
  }
  const guestCart = await readGuestCart();
  return { items: guestCart.items, guestCart, cartId: null };
}

export async function GET() {
  const session = await auth();
  const { items } = await readItems(session?.user?.id);
  return NextResponse.json(await buildCartResponse(items));
}

export async function POST(request: NextRequest) {
  const { productId, quantity = 1 } = await request.json();
  if (!productId) {
    return NextResponse.json({ error: "productId is required" }, { status: 400 });
  }

  const session = await auth();

  if (session?.user?.id) {
    const cartId = await getOrCreateUserCartId(session.user.id);
    const existing = await db.cartItem.findUnique({
      where: { cartId_productId: { cartId, productId } },
    });
    await db.cartItem.upsert({
      where: { cartId_productId: { cartId, productId } },
      update: { quantity: (existing?.quantity ?? 0) + quantity },
      create: { cartId, productId, quantity },
    });
    const { items } = await readItems(session.user.id);
    return NextResponse.json(await buildCartResponse(items));
  }

  const cart = await readGuestCart();
  const existing = cart.items.find((i) => i.productId === productId);
  if (existing) existing.quantity += quantity;
  else cart.items.push({ productId, quantity });
  await writeGuestCart(cart);
  return NextResponse.json(await buildCartResponse(cart.items));
}

export async function PATCH(request: NextRequest) {
  const { productId, quantity } = await request.json();
  if (!productId || typeof quantity !== "number") {
    return NextResponse.json({ error: "productId and quantity are required" }, { status: 400 });
  }

  const session = await auth();

  if (session?.user?.id) {
    const cartId = await getOrCreateUserCartId(session.user.id);
    if (quantity <= 0) {
      await db.cartItem.deleteMany({ where: { cartId, productId } });
    } else {
      await db.cartItem.upsert({
        where: { cartId_productId: { cartId, productId } },
        update: { quantity },
        create: { cartId, productId, quantity },
      });
    }
    const { items } = await readItems(session.user.id);
    return NextResponse.json(await buildCartResponse(items));
  }

  const cart = await readGuestCart();
  if (quantity <= 0) {
    cart.items = cart.items.filter((i) => i.productId !== productId);
  } else {
    const existing = cart.items.find((i) => i.productId === productId);
    if (existing) existing.quantity = quantity;
    else cart.items.push({ productId, quantity });
  }
  await writeGuestCart(cart);
  return NextResponse.json(await buildCartResponse(cart.items));
}

export async function DELETE(request: NextRequest) {
  const { productId } = await request.json();
  const session = await auth();

  if (session?.user?.id) {
    const cartId = await getOrCreateUserCartId(session.user.id);
    await db.cartItem.deleteMany({ where: { cartId, productId } });
    const { items } = await readItems(session.user.id);
    return NextResponse.json(await buildCartResponse(items));
  }

  const cart = await readGuestCart();
  cart.items = cart.items.filter((i) => i.productId !== productId);
  await writeGuestCart(cart);
  return NextResponse.json(await buildCartResponse(cart.items));
}
