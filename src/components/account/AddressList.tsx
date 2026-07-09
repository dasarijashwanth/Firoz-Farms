"use client";

import { useTransition } from "react";
import { Star, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { deleteAddress, setDefaultAddress } from "@/actions/address.actions";

export interface AddressData {
  id: string;
  label: string | null;
  line1: string;
  line2: string | null;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  isDefault: boolean;
}

export function AddressList({ addresses }: { addresses: AddressData[] }) {
  const [isPending, startTransition] = useTransition();

  if (addresses.length === 0) {
    return (
      <p className="font-sans text-sm text-muted-foreground">
        You haven&apos;t saved any addresses yet.
      </p>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {addresses.map((address) => (
        <div key={address.id} className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-heading text-sm font-semibold text-foreground">
                {address.label || "Address"}
              </p>
              {address.isDefault && (
                <Badge className="mt-1 bg-gold text-organic-green-dark">Default</Badge>
              )}
            </div>
            <div className="flex gap-1">
              {!address.isDefault && (
                <Button
                  variant="ghost"
                  size="icon"
                  disabled={isPending}
                  onClick={() => startTransition(() => setDefaultAddress(address.id))}
                  aria-label="Set as default"
                >
                  <Star className="size-4" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                disabled={isPending}
                onClick={() => startTransition(() => deleteAddress(address.id))}
                aria-label="Delete address"
                className="text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          </div>
          <p className="mt-3 font-sans text-sm text-foreground">
            {address.line1}
            {address.line2 ? `, ${address.line2}` : ""}
          </p>
          <p className="font-sans text-sm text-foreground">
            {address.city}, {address.state} – {address.pincode}
          </p>
          <p className="mt-1 font-sans text-sm text-muted-foreground">{address.phone}</p>
        </div>
      ))}
    </div>
  );
}
