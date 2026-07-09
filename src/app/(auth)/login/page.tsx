"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginWithCredentials, type LoginActionState } from "@/actions/auth.actions";

const initialState: LoginActionState = { status: "idle" };

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginWithCredentials, initialState);

  return (
    <>
      <h1 className="font-heading text-2xl font-bold text-organic-green-dark">Welcome Back</h1>
      <p className="mt-1 font-sans text-sm text-muted-foreground">
        Sign in to manage your orders, subscriptions, and wishlist.
      </p>

      <form action={formAction} className="mt-6 space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required placeholder="you@example.com" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" required placeholder="••••••••" />
        </div>

        {state.status === "error" && (
          <p className="font-sans text-sm text-destructive">{state.message}</p>
        )}

        <Button
          type="submit"
          disabled={isPending}
          className="w-full bg-organic-green font-button text-white hover:bg-organic-green-dark"
        >
          {isPending ? "Signing in…" : "Sign In"}
        </Button>
      </form>

      <p className="mt-6 text-center font-sans text-sm text-muted-foreground">
        New to Firoz Farms?{" "}
        <Link href="/register" className="font-medium text-organic-green hover:underline">
          Create an account
        </Link>
      </p>
    </>
  );
}
