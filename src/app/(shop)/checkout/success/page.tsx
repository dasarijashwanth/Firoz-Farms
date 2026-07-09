import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { formatPrice, toPlainNumber } from "@/lib/format";

interface CheckoutSuccessPageProps {
  searchParams: Promise<{ order?: string }>;
}

export default async function CheckoutSuccessPage({ searchParams }: CheckoutSuccessPageProps) {
  const { order: orderNumber } = await searchParams;
  const order = orderNumber
    ? await db.order.findUnique({ where: { orderNumber }, include: { items: true } })
    : null;

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-20 text-center sm:px-6">
      <CheckCircle2 className="size-16 text-organic-green" />
      <h1 className="mt-6 font-heading text-3xl font-bold text-organic-green-dark">
        Order Placed!
      </h1>
      <p className="mt-2 font-sans text-muted-foreground">
        Thank you for choosing Firoz Farms. We&apos;re preparing your order for delivery.
      </p>

      {order && (
        <div className="mt-8 w-full rounded-2xl border border-border bg-card p-6 text-left">
          <div className="flex justify-between font-sans text-sm">
            <span className="text-muted-foreground">Order Number</span>
            <span className="font-medium text-foreground">#{order.orderNumber}</span>
          </div>
          <div className="mt-2 flex justify-between font-sans text-sm">
            <span className="text-muted-foreground">Items</span>
            <span className="font-medium text-foreground">{order.items.length}</span>
          </div>
          <div className="mt-2 flex justify-between font-heading text-base font-semibold text-foreground">
            <span>Total</span>
            <span>{formatPrice(toPlainNumber(order.total))}</span>
          </div>
        </div>
      )}

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button
          render={<Link href="/account/orders" />}
          className="bg-organic-green font-button text-white hover:bg-organic-green-dark"
        >
          View My Orders
        </Button>
        <Button render={<Link href="/products" />} variant="outline" className="font-button">
          Continue Shopping
        </Button>
      </div>
    </div>
  );
}
