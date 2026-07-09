"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface WishlistButtonProps {
  productId: string;
  initialWishlisted: boolean;
}

// Static preview build: no auth/backend, so this just shows what the
// control looks like without persisting anything.
export function WishlistButton({ initialWishlisted }: WishlistButtonProps) {
  const [wishlisted, setWishlisted] = useState(initialWishlisted);

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => {
        setWishlisted((w) => !w);
        toast.info("This is a static preview — wishlist syncing runs on the deployed app.");
      }}
      aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
      className={cn("rounded-full", wishlisted && "border-destructive text-destructive")}
    >
      <Heart className={cn("size-4", wishlisted && "fill-destructive")} />
    </Button>
  );
}
