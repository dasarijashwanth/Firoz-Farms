"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export interface CartItem {
  productId: string;
  name: string;
  slug: string;
  categorySlug: string;
  unit: string;
  price: string;
  imageUrl: string | null;
  quantity: number;
  stock: number;
}

interface CartState {
  items: CartItem[];
  subtotal: number;
  count: number;
}

interface CartContextValue extends CartState {
  isLoading: boolean;
  addItem: (productId: string, quantity?: number) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  refresh: () => Promise<void>;
}

const CartContext = createContext<CartContextValue | null>(null);

const EMPTY_STATE: CartState = { items: [], subtotal: 0, count: 0 };

// This static preview build has no backend — /api/cart doesn't exist here,
// so every call below fails soft and the cart just stays empty.
async function safeCartRequest(input: RequestInfo, init?: RequestInit): Promise<CartState> {
  try {
    const res = await fetch(input, init);
    if (!res.ok) return EMPTY_STATE;
    return await res.json();
  } catch {
    return EMPTY_STATE;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CartState>(EMPTY_STATE);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(async () => {
    setState(await safeCartRequest("/api/cart"));
  }, []);

  useEffect(() => {
    refresh().finally(() => setIsLoading(false));
  }, [refresh]);

  const addItem = useCallback(async (productId: string, quantity = 1) => {
    setState(
      await safeCartRequest("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity }),
      })
    );
  }, []);

  const updateQuantity = useCallback(async (productId: string, quantity: number) => {
    setState(
      await safeCartRequest("/api/cart", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity }),
      })
    );
  }, []);

  const removeItem = useCallback(async (productId: string) => {
    setState(
      await safeCartRequest("/api/cart", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      })
    );
  }, []);

  return (
    <CartContext.Provider
      value={{ ...state, isLoading, addItem, updateQuantity, removeItem, refresh }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
