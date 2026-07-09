"use client";

import { useActionState, useEffect, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createAddress, type AddressActionState } from "@/actions/address.actions";

const initialState: AddressActionState = { status: "idle" };

export function AddAddressForm() {
  const [state, formAction, isPending] = useActionState(createAddress, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
  }, [state.status]);

  return (
    <form ref={formRef} action={formAction} className="mt-4 grid gap-3 sm:grid-cols-2">
      <div className="space-y-1.5">
        <Label htmlFor="label">Label (Home, Office...)</Label>
        <Input id="label" name="label" placeholder="Home" />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" name="phone" type="tel" required placeholder="9876543210" />
      </div>
      <div className="space-y-1.5 sm:col-span-2">
        <Label htmlFor="line1">Address Line 1</Label>
        <Input id="line1" name="line1" required placeholder="House no, street" />
      </div>
      <div className="space-y-1.5 sm:col-span-2">
        <Label htmlFor="line2">Address Line 2 (optional)</Label>
        <Input id="line2" name="line2" placeholder="Landmark, area" />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="city">City</Label>
        <Input id="city" name="city" required placeholder="Khammam" />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="state">State</Label>
        <Input id="state" name="state" required placeholder="Telangana" />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="pincode">PIN Code</Label>
        <Input id="pincode" name="pincode" required placeholder="507316" maxLength={6} />
      </div>

      {state.status === "error" && (
        <p className="font-sans text-sm text-destructive sm:col-span-2">{state.message}</p>
      )}

      <div className="sm:col-span-2">
        <Button
          type="submit"
          disabled={isPending}
          className="bg-organic-green font-button text-white hover:bg-organic-green-dark"
        >
          {isPending ? "Saving…" : "Save Address"}
        </Button>
      </div>
    </form>
  );
}
