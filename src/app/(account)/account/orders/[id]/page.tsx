import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { ChevronLeft } from "lucide-react";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { formatPrice, toPlainNumber } from "@/lib/format";

const STATUS_LABELS: Record<string, string> = {
  PLACED: "Placed",
  CONFIRMED: "Confirmed",
  PACKED: "Packed",
  SHIPPED: "Shipped",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

interface OrderDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { id } = await params;
  const session = await auth();

  const order = await db.order.findUnique({
    where: { id },
    include: { items: true, address: true },
  });

  if (!order || order.userId !== session!.user.id) notFound();

  return (
    <div>
      <Link
        href="/account/orders"
        className="inline-flex items-center gap-1 font-sans text-sm text-muted-foreground hover:text-organic-green"
      >
        <ChevronLeft className="size-4" /> Back to Orders
      </Link>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-bold text-organic-green-dark">
            Order #{order.orderNumber}
          </h1>
          <p className="mt-1 font-sans text-sm text-muted-foreground">
            Placed on {format(order.createdAt, "MMMM d, yyyy 'at' h:mm a")}
          </p>
        </div>
        <Badge className="bg-beige text-organic-green-dark">{STATUS_LABELS[order.status]}</Badge>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5 lg:col-span-2">
          <h2 className="font-heading text-base font-semibold text-foreground">Items</h2>
          <div className="mt-3 divide-y divide-border">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-3">
                <div>
                  <p className="font-sans text-sm font-medium text-foreground">{item.name}</p>
                  <p className="font-sans text-xs text-muted-foreground">Qty: {item.quantity}</p>
                </div>
                <p className="font-sans text-sm text-foreground">
                  {formatPrice(toPlainNumber(item.price) * item.quantity)}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-3 space-y-1.5 border-t border-border pt-3 font-sans text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>{formatPrice(toPlainNumber(order.subtotal))}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Delivery Fee</span>
              <span>{formatPrice(toPlainNumber(order.deliveryFee))}</span>
            </div>
            {toPlainNumber(order.discount) > 0 && (
              <div className="flex justify-between text-muted-foreground">
                <span>Discount</span>
                <span>-{formatPrice(toPlainNumber(order.discount))}</span>
              </div>
            )}
            <div className="flex justify-between font-heading text-base font-semibold text-foreground">
              <span>Total</span>
              <span>{formatPrice(toPlainNumber(order.total))}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-5">
            <h2 className="font-heading text-sm font-semibold text-foreground">
              Delivery Address
            </h2>
            <p className="mt-2 font-sans text-sm text-foreground">
              {order.address.line1}
              {order.address.line2 ? `, ${order.address.line2}` : ""}
            </p>
            <p className="font-sans text-sm text-foreground">
              {order.address.city}, {order.address.state} – {order.address.pincode}
            </p>
            <p className="mt-1 font-sans text-sm text-muted-foreground">{order.address.phone}</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <h2 className="font-heading text-sm font-semibold text-foreground">Payment</h2>
            <p className="mt-2 font-sans text-sm text-foreground">
              {order.paymentMethod === "COD" ? "Cash on Delivery" : "Razorpay"}
            </p>
            <p className="font-sans text-xs text-muted-foreground">
              Status: {order.paymentStatus}
            </p>
          </div>
          {order.deliverySlot && (
            <div className="rounded-2xl border border-border bg-card p-5">
              <h2 className="font-heading text-sm font-semibold text-foreground">
                Delivery Slot
              </h2>
              <p className="mt-2 font-sans text-sm text-foreground">{order.deliverySlot}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
