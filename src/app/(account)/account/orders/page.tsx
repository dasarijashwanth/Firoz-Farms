import Link from "next/link";
import { format } from "date-fns";
import { Package } from "lucide-react";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPrice, toPlainNumber } from "@/lib/format";

const STATUS_LABELS: Record<string, string> = {
  PLACED: "Placed",
  CONFIRMED: "Confirmed",
  PACKED: "Packed",
  SHIPPED: "Shipped",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

export default async function OrdersPage() {
  const session = await auth();
  const orders = await db.order.findMany({
    where: { userId: session!.user.id },
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-organic-green-dark">My Orders</h1>
      <p className="mt-1 font-sans text-sm text-muted-foreground">
        Track and review your past orders.
      </p>

      {orders.length === 0 ? (
        <div className="mt-10 flex flex-col items-center rounded-2xl border border-dashed border-border py-16 text-center">
          <Package className="size-10 text-muted-foreground" />
          <p className="mt-4 font-sans text-muted-foreground">You haven&apos;t placed any orders yet.</p>
          <Button
            render={<Link href="/products" />}
            className="mt-4 bg-organic-green font-button text-white hover:bg-organic-green-dark"
          >
            Start Shopping
          </Button>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {orders.map((order) => (
            <Link
              key={order.id}
              href={`/account/orders/${order.id}`}
              className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card p-5 transition-shadow hover:shadow-md"
            >
              <div>
                <p className="font-heading text-sm font-semibold text-foreground">
                  #{order.orderNumber}
                </p>
                <p className="font-sans text-xs text-muted-foreground">
                  {format(order.createdAt, "MMM d, yyyy")} · {order.items.length} item
                  {order.items.length !== 1 ? "s" : ""}
                </p>
              </div>
              <Badge className="bg-beige text-organic-green-dark">
                {STATUS_LABELS[order.status]}
              </Badge>
              <p className="font-heading text-sm font-semibold text-organic-green">
                {formatPrice(toPlainNumber(order.total))}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
