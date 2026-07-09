"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { createOrder, type CheckoutActionState } from "@/actions/order.actions";
import type { AddressData } from "@/components/account/AddressList";

const DELIVERY_SLOTS = [
  "Tomorrow, 7:00 AM – 9:00 AM",
  "Tomorrow, 9:00 AM – 11:00 AM",
  "Today, 5:00 PM – 7:00 PM",
];

const initialState: CheckoutActionState = { status: "idle" };

interface CheckoutFormProps {
  addresses: AddressData[];
  razorpayAvailable: boolean;
}

export function CheckoutForm({ addresses, razorpayAvailable }: CheckoutFormProps) {
  const [state, formAction, isPending] = useActionState(createOrder, initialState);
  const defaultAddress = addresses.find((a) => a.isDefault) ?? addresses[0];

  return (
    <form action={formAction} className="space-y-6">
      <div className="rounded-2xl border border-border bg-card p-5">
        <h2 className="font-heading text-base font-semibold text-foreground">
          Delivery Address
        </h2>
        <div className="mt-3 space-y-2">
          {addresses.map((address) => (
            <label
              key={address.id}
              className="flex cursor-pointer items-start gap-3 rounded-xl border border-border p-3 hover:border-organic-green"
            >
              <input
                type="radio"
                name="addressId"
                value={address.id}
                defaultChecked={address.id === defaultAddress?.id}
                className="mt-1 accent-organic-green"
              />
              <span className="font-sans text-sm text-foreground">
                <span className="font-medium">{address.label || "Address"}</span> —{" "}
                {address.line1}
                {address.line2 ? `, ${address.line2}` : ""}, {address.city}, {address.state} –{" "}
                {address.pincode} · {address.phone}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5">
        <h2 className="font-heading text-base font-semibold text-foreground">Delivery Slot</h2>
        <div className="mt-3 space-y-2">
          {DELIVERY_SLOTS.map((slot, i) => (
            <label
              key={slot}
              className="flex cursor-pointer items-center gap-3 rounded-xl border border-border p-3 hover:border-organic-green"
            >
              <input
                type="radio"
                name="deliverySlot"
                value={slot}
                defaultChecked={i === 0}
                className="accent-organic-green"
              />
              <span className="font-sans text-sm text-foreground">{slot}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5">
        <h2 className="font-heading text-base font-semibold text-foreground">Payment Method</h2>
        <div className="mt-3 space-y-2">
          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-border p-3 hover:border-organic-green">
            <input
              type="radio"
              name="paymentMethod"
              value="COD"
              defaultChecked
              className="accent-organic-green"
            />
            <span className="font-sans text-sm text-foreground">Cash on Delivery</span>
          </label>
          <label
            className={
              "flex cursor-pointer items-center gap-3 rounded-xl border border-border p-3" +
              (razorpayAvailable ? " hover:border-organic-green" : " cursor-not-allowed opacity-50")
            }
          >
            <input
              type="radio"
              name="paymentMethod"
              value="RAZORPAY"
              disabled={!razorpayAvailable}
              className="accent-organic-green"
            />
            <span className="font-sans text-sm text-foreground">
              Pay Online (Razorpay){!razorpayAvailable && " — Coming Soon"}
            </span>
          </label>
        </div>
      </div>

      {state.status === "error" && (
        <p className="font-sans text-sm text-destructive">{state.message}</p>
      )}

      <Button
        type="submit"
        disabled={isPending || addresses.length === 0}
        className="w-full bg-organic-green font-button text-white hover:bg-organic-green-dark"
      >
        {isPending ? "Placing Order…" : "Place Order"}
      </Button>
    </form>
  );
}
