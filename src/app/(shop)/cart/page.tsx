"use client";

import Link from "next/link";
import { Minus, Plus, ShoppingBasket, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SmartImage } from "@/components/shared/SmartImage";
import { formatPrice, toPlainNumber } from "@/lib/format";
import { useCart } from "@/components/shop/CartProvider";

export default function CartPage() {
  const { items, subtotal, isLoading, updateQuantity, removeItem } = useCart();

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <p className="font-sans text-muted-foreground">Loading your cart…</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-4xl flex-col items-center px-4 py-24 text-center sm:px-6 lg:px-8">
        <ShoppingBasket className="size-14 text-muted-foreground" />
        <h1 className="mt-6 font-heading text-2xl font-bold text-organic-green-dark">
          Your cart is empty
        </h1>
        <p className="mt-2 font-sans text-muted-foreground">
          Explore our farm-fresh products and add something wholesome.
        </p>
        <Button
          render={<Link href="/products" />}
          className="mt-6 bg-organic-green font-button text-white hover:bg-organic-green-dark"
        >
          Shop Products
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-heading text-3xl font-bold text-organic-green-dark">Your Cart</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {items.map((item) => (
            <div
              key={item.productId}
              className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4"
            >
              <Link
                href={`/products/${item.categorySlug}/${item.slug}`}
                className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-beige"
              >
                <SmartImage src={item.imageUrl} alt={item.name} className="object-cover" />
              </Link>
              <div className="min-w-0 flex-1">
                <Link
                  href={`/products/${item.categorySlug}/${item.slug}`}
                  className="font-heading text-base font-semibold text-foreground hover:text-organic-green"
                >
                  {item.name}
                </Link>
                <p className="font-sans text-sm text-muted-foreground">{item.unit}</p>
                <p className="mt-1 font-heading text-sm font-semibold text-organic-green">
                  {formatPrice(item.price)}
                </p>
              </div>
              <div className="flex items-center rounded-full border border-border">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                  aria-label="Decrease quantity"
                >
                  <Minus className="size-3.5" />
                </Button>
                <span className="w-6 text-center font-sans text-sm">{item.quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                  disabled={item.quantity >= item.stock}
                  aria-label="Increase quantity"
                >
                  <Plus className="size-3.5" />
                </Button>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-destructive"
                onClick={() => removeItem(item.productId)}
                aria-label="Remove item"
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-heading text-lg font-semibold text-foreground">Order Summary</h2>
          <div className="mt-4 flex items-center justify-between font-sans text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium text-foreground">{formatPrice(toPlainNumber(subtotal))}</span>
          </div>
          <p className="mt-1 font-sans text-xs text-muted-foreground">
            Delivery fee and any discounts are calculated at checkout.
          </p>
          <Button
            render={<Link href="/checkout" />}
            className="mt-6 w-full bg-organic-green font-button text-white hover:bg-organic-green-dark"
          >
            Proceed to Checkout
          </Button>
          <Button
            render={<Link href="/products" />}
            variant="outline"
            className="mt-3 w-full font-button"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
}
