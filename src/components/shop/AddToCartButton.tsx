"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Minus, Plus, ShoppingBasket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "./CartProvider";

interface AddToCartButtonProps {
  productId: string;
  name: string;
  stock: number;
}

export function AddToCartButton({ productId, name, stock }: AddToCartButtonProps) {
  const { addItem, items } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isPending, setIsPending] = useState(false);

  const inCart = items.find((i) => i.productId === productId)?.quantity ?? 0;
  const outOfStock = stock <= 0;

  async function handleAdd() {
    setIsPending(true);
    try {
      await addItem(productId, quantity);
      toast.success(`Added ${quantity} × ${name} to your cart`);
      setQuantity(1);
    } finally {
      setIsPending(false);
    }
  }

  if (outOfStock) {
    return (
      <Button disabled className="bg-muted font-button text-muted-foreground">
        Out of Stock
      </Button>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center rounded-full border border-border">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          aria-label="Decrease quantity"
        >
          <Minus className="size-4" />
        </Button>
        <span className="w-8 text-center font-sans text-sm">{quantity}</span>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={() => setQuantity((q) => Math.min(stock, q + 1))}
          aria-label="Increase quantity"
        >
          <Plus className="size-4" />
        </Button>
      </div>
      <Button
        onClick={handleAdd}
        disabled={isPending}
        className="flex-1 bg-organic-green font-button text-white hover:bg-organic-green-dark sm:flex-none"
      >
        <ShoppingBasket className="size-4" />
        {isPending ? "Adding…" : "Add to Cart"}
      </Button>
      {inCart > 0 && (
        <span className="font-sans text-xs text-muted-foreground">
          {inCart} already in your cart
        </span>
      )}
    </div>
  );
}
