import { redirect } from "next/navigation";
import Link from "next/link";
import { LogOut, MapPin, Package, User, Heart } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { auth, signOut } from "@/lib/auth";

const navItems = [
  { href: "/account", label: "Profile", icon: User },
  { href: "/account/orders", label: "Orders", icon: Package },
  { href: "/account/addresses", label: "Addresses", icon: MapPin },
  { href: "/account/wishlist", label: "Wishlist", icon: Heart },
];

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return (
    <>
      <Header />
      <main className="flex-1 pt-20">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
            <aside className="space-y-1">
              <div className="mb-4 rounded-2xl border border-border bg-card p-4">
                <p className="font-heading text-sm font-semibold text-foreground">
                  {session.user.name ?? "Your Account"}
                </p>
                <p className="truncate font-sans text-xs text-muted-foreground">
                  {session.user.email}
                </p>
              </div>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 font-sans text-sm text-foreground transition-colors hover:bg-beige"
                >
                  <item.icon className="size-4 text-organic-green" />
                  {item.label}
                </Link>
              ))}
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <Button
                  type="submit"
                  variant="ghost"
                  className="w-full justify-start gap-2.5 px-3 font-sans text-sm text-muted-foreground hover:text-destructive"
                >
                  <LogOut className="size-4" />
                  Sign Out
                </Button>
              </form>
            </aside>
            <div>{children}</div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
