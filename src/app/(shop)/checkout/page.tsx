import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { isRazorpayConfigured } from "@/lib/razorpay";
import { CheckoutForm } from "@/components/shop/CheckoutForm";
import { AddAddressForm } from "@/components/account/AddAddressForm";
import { SmartImage } from "@/components/shared/SmartImage";
import { formatPrice, toPlainNumber } from "@/lib/format";

const DELIVERY_FEE = 40;
const FREE_DELIVERY_THRESHOLD = 500;

export default async function CheckoutPage() {
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/checkout");

  const [addresses, cart] = await Promise.all([
    db.address.findMany({ where: { userId: session.user.id }, orderBy: { isDefault: "desc" } }),
    db.cart.findUnique({
      where: { userId: session.user.id },
      include: {
        items: {
          include: { product: { include: { images: { take: 1, orderBy: { sortOrder: "asc" } } } } },
        },
      },
    }),
  ]);

  const items = cart?.items ?? [];

  if (items.length === 0) {
    redirect("/cart");
  }

  const subtotal = items.reduce(
    (sum, item) => sum + toPlainNumber(item.product.price) * item.quantity,
    0
  );
  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const total = subtotal + deliveryFee;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-heading text-3xl font-bold text-organic-green-dark">Checkout</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {addresses.length === 0 ? (
            <div className="rounded-2xl border border-border bg-cream p-5">
              <h2 className="font-heading text-base font-semibold text-foreground">
                Add a Delivery Address
              </h2>
              <p className="mt-1 font-sans text-sm text-muted-foreground">
                You need at least one saved address to place an order.
              </p>
              <AddAddressForm />
            </div>
          ) : (
            <CheckoutForm addresses={addresses} razorpayAvailable={isRazorpayConfigured} />
          )}
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-heading text-lg font-semibold text-foreground">Order Summary</h2>
          <div className="mt-4 max-h-64 space-y-3 overflow-y-auto">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-beige">
                  <SmartImage
                    src={item.product.images[0]?.url}
                    alt={item.product.name}
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-sans text-sm text-foreground">
                    {item.product.name}
                  </p>
                  <p className="font-sans text-xs text-muted-foreground">Qty: {item.quantity}</p>
                </div>
                <p className="font-sans text-sm text-foreground">
                  {formatPrice(toPlainNumber(item.product.price) * item.quantity)}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4 space-y-1.5 border-t border-border pt-4 font-sans text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Delivery Fee</span>
              <span>{deliveryFee === 0 ? "Free" : formatPrice(deliveryFee)}</span>
            </div>
            <div className="flex justify-between font-heading text-base font-semibold text-foreground">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
          <p className="mt-3 font-sans text-xs text-muted-foreground">
            Need to change items?{" "}
            <Link href="/cart" className="text-organic-green hover:underline">
              Edit cart
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
