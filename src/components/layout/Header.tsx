"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, ShoppingBasket, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { marketingNavLinks } from "@/data/placeholder/site";
import { useCart } from "@/components/shop/CartProvider";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const { count } = useCart();
  const isTransparentHero = pathname === "/";
  const [scrolledPast, setScrolledPast] = useState(false);
  const scrolled = !isTransparentHero || scrolledPast;

  useEffect(() => {
    if (!isTransparentHero) return;
    const onScroll = () => setScrolledPast(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [isTransparentHero]);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 h-20 w-full transition-all duration-300",
        scrolled
          ? "bg-cream/95 shadow-sm backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span
            className={cn(
              "font-heading text-2xl font-semibold tracking-tight transition-colors",
              scrolled ? "text-organic-green" : "text-white drop-shadow-sm"
            )}
          >
            Firoz Farms
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {marketingNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "font-sans text-sm font-medium transition-colors hover:text-gold",
                scrolled ? "text-foreground" : "text-white drop-shadow-sm"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            render={<Link href="/account" aria-label="Account" />}
            variant="ghost"
            size="icon"
            className={cn(
              "hidden sm:inline-flex",
              scrolled ? "text-foreground" : "text-white hover:bg-white/10"
            )}
          >
            <User className="size-5" />
          </Button>
          <Button
            render={<Link href="/cart" aria-label="Cart" />}
            variant="ghost"
            size="icon"
            className={cn(
              "relative",
              scrolled ? "text-foreground" : "text-white hover:bg-white/10"
            )}
          >
            <ShoppingBasket className="size-5" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-gold text-[10px] font-semibold text-organic-green-dark">
                {count > 9 ? "9+" : count}
              </span>
            )}
          </Button>
          <Button
            render={<Link href="/products" />}
            className="hidden bg-organic-green font-button text-white hover:bg-organic-green-dark sm:inline-flex"
          >
            Order Fresh Products
          </Button>

          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Open menu"
                  className={cn(
                    "lg:hidden",
                    scrolled ? "text-foreground" : "text-white hover:bg-white/10"
                  )}
                />
              }
            >
              <Menu className="size-6" />
            </SheetTrigger>
            <SheetContent side="right" className="bg-cream">
              <SheetHeader>
                <SheetTitle className="font-heading text-organic-green">
                  Firoz Farms
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 px-4">
                {marketingNavLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="font-sans text-base font-medium text-foreground hover:text-organic-green"
                  >
                    {link.label}
                  </Link>
                ))}
                <Button
                  render={<Link href="/products" />}
                  className="mt-2 bg-organic-green font-button text-white"
                >
                  Order Fresh Products
                </Button>
                <Button
                  render={<Link href="/products#subscribe" />}
                  variant="outline"
                  className="font-button border-organic-green text-organic-green"
                >
                  Subscribe for Daily Milk
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
