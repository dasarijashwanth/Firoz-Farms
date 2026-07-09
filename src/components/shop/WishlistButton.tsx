"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toggleWishlist } from "@/actions/wishlist.actions";
import { cn } from "@/lib/utils";

interface WishlistButtonProps {
  productId: string;
  initialWishlisted: boolean;
}

export function WishlistButton({ productId, initialWishlisted }: WishlistButtonProps) {
  const [wishlisted, setWishlisted] = useState(initialWishlisted);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  async function handleClick() {
    setIsPending(true);
    try {
      const result = await toggleWishlist(productId);
      if (result.status === "unauthenticated") {
        toast.info("Sign in to save items to your wishlist.");
        router.push("/login");
        return;
      }
      setWishlisted(result.status === "added");
      toast.success(result.status === "added" ? "Added to wishlist" : "Removed from wishlist");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleClick}
      disabled={isPending}
      aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
      className={cn("rounded-full", wishlisted && "border-destructive text-destructive")}
    >
      <Heart className={cn("size-4", wishlisted && "fill-destructive")} />
    </Button>
  );
}
