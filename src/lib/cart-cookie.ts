import { cookies } from "next/headers";

export const CART_COOKIE = "ff_cart";

export interface GuestCartItem {
  productId: string;
  quantity: number;
}

export interface GuestCart {
  items: GuestCartItem[];
}

export async function readGuestCart(): Promise<GuestCart> {
  const store = await cookies();
  const raw = store.get(CART_COOKIE)?.value;
  if (!raw) return { items: [] };
  try {
    const parsed = JSON.parse(raw) as GuestCart;
    if (!Array.isArray(parsed.items)) return { items: [] };
    return parsed;
  } catch {
    return { items: [] };
  }
}

export async function writeGuestCart(cart: GuestCart) {
  const store = await cookies();
  store.set(CART_COOKIE, JSON.stringify(cart), {
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
    sameSite: "lax",
  });
}

export async function clearGuestCart() {
  const store = await cookies();
  store.delete(CART_COOKIE);
}
