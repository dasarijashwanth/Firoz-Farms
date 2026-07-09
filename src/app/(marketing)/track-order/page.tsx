"use client";

import { useActionState } from "react";
import { format } from "date-fns";
import { Package, Search } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice, toPlainNumber } from "@/lib/format";
import { trackOrder, type TrackOrderState } from "@/actions/track-order.actions";

const initialState: TrackOrderState = { status: "idle" };

export default function TrackOrderPage() {
  const [state, formAction, isPending] = useActionState(trackOrder, initialState);

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <span className="font-button text-sm font-semibold uppercase tracking-widest text-gold">
          Order Status
        </span>
        <h1 className="mt-3 font-heading text-3xl font-bold text-organic-green-dark">
          Track Your Order
        </h1>
        <p className="mt-2 font-sans text-muted-foreground">
          Enter your order number and the email used at checkout.
        </p>
      </div>

      <form action={formAction} className="mt-8 space-y-4 rounded-2xl border border-border bg-card p-6">
        <div className="space-y-1.5">
          <Label htmlFor="orderNumber">Order Number</Label>
          <Input id="orderNumber" name="orderNumber" required placeholder="FF-123456" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required placeholder="you@example.com" />
        </div>
        <Button
          type="submit"
          disabled={isPending}
          className="w-full bg-organic-green font-button text-white hover:bg-organic-green-dark"
        >
          <Search className="size-4" />
          {isPending ? "Searching…" : "Track Order"}
        </Button>
        {state.status === "error" && (
          <p className="font-sans text-sm text-destructive">{state.message}</p>
        )}
      </form>

      {state.status === "success" && state.order && (
        <div className="mt-6 rounded-2xl border border-border bg-cream p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package className="size-5 text-organic-green" />
              <span className="font-heading text-base font-semibold text-foreground">
                #{state.order.orderNumber}
              </span>
            </div>
            <Badge className="bg-organic-green text-white">{state.order.status}</Badge>
          </div>
          <p className="mt-2 font-sans text-sm text-muted-foreground">
            Placed on {format(new Date(state.order.createdAt), "MMMM d, yyyy")}
          </p>
          {state.order.deliverySlot && (
            <p className="mt-1 font-sans text-sm text-muted-foreground">
              Delivery Slot: {state.order.deliverySlot}
            </p>
          )}
          <div className="mt-4 divide-y divide-border">
            {state.order.items.map((item, i) => (
              <div key={i} className="flex justify-between py-2 font-sans text-sm">
                <span className="text-foreground">{item.name}</span>
                <span className="text-muted-foreground">Qty {item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 flex justify-between border-t border-border pt-3 font-heading text-base font-semibold text-foreground">
            <span>Total</span>
            <span>{formatPrice(toPlainNumber(state.order.total))}</span>
          </div>
        </div>
      )}
    </div>
  );
}
