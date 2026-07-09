"use client";

import { useActionState, useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { submitReview, type ReviewActionState } from "@/actions/review.actions";

const initialState: ReviewActionState = { status: "idle" };

export function ReviewForm({ productId }: { productId: string }) {
  const [state, formAction, isPending] = useActionState(submitReview, initialState);
  const [rating, setRating] = useState(5);

  if (state.status === "success") {
    return (
      <div className="rounded-2xl border border-organic-green/30 bg-organic-green/10 p-4">
        <p className="font-sans text-sm text-organic-green-dark">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4 rounded-2xl border border-border bg-cream p-5">
      <input type="hidden" name="productId" value={productId} />
      <div>
        <Label>Your Rating</Label>
        <div className="mt-1.5 flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setRating(n)}
              aria-label={`Rate ${n} stars`}
            >
              <Star className={cn("size-6", n <= rating ? "fill-gold text-gold" : "text-border")} />
            </button>
          ))}
        </div>
        <input type="hidden" name="rating" value={rating} />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="title">Title (optional)</Label>
        <Input id="title" name="title" placeholder="Great quality!" />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="comment">Your Review</Label>
        <Textarea id="comment" name="comment" required placeholder="Tell us what you think…" />
      </div>
      {state.status === "error" && (
        <p className="font-sans text-sm text-destructive">{state.message}</p>
      )}
      <Button
        type="submit"
        disabled={isPending}
        className="bg-organic-green font-button text-white hover:bg-organic-green-dark"
      >
        {isPending ? "Submitting…" : "Submit Review"}
      </Button>
    </form>
  );
}
