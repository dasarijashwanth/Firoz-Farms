"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { registerUser, type RegisterActionState } from "@/actions/auth.actions";

const initialState: RegisterActionState = { status: "idle" };

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(registerUser, initialState);

  return (
    <>
      <h1 className="font-heading text-2xl font-bold text-organic-green-dark">
        Create Your Account
      </h1>
      <p className="mt-1 font-sans text-sm text-muted-foreground">
        Join Firoz Farms for daily milk subscriptions, order tracking, and more.
      </p>

      {state.status === "success" ? (
        <div className="mt-6 rounded-xl border border-organic-green/30 bg-organic-green/10 p-4">
          <p className="font-sans text-sm text-organic-green-dark">{state.message}</p>
          <Button
            render={<Link href="/login" />}
            className="mt-4 w-full bg-organic-green font-button text-white hover:bg-organic-green-dark"
          >
            Go to Sign In
          </Button>
        </div>
      ) : (
        <form action={formAction} className="mt-6 space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" name="name" required placeholder="Anitha Reddy" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required placeholder="you@example.com" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" name="phone" type="tel" required placeholder="9876543210" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              placeholder="At least 6 characters"
            />
          </div>

          {state.status === "error" && (
            <p className="font-sans text-sm text-destructive">{state.message}</p>
          )}

          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-organic-green font-button text-white hover:bg-organic-green-dark"
          >
            {isPending ? "Creating account…" : "Create Account"}
          </Button>
        </form>
      )}

      <p className="mt-6 text-center font-sans text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-organic-green hover:underline">
          Sign in
        </Link>
      </p>
    </>
  );
}
