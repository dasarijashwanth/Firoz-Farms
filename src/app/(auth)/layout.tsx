import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen flex-1 items-center justify-center bg-cream px-4 py-16">
      <div className="w-full max-w-md">
        <Link href="/" className="mb-8 block text-center">
          <span className="font-heading text-2xl font-semibold text-organic-green">
            Firoz Farms
          </span>
        </Link>
        <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">{children}</div>
      </div>
    </main>
  );
}
