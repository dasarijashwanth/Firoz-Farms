import { format } from "date-fns";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export default async function ProfilePage() {
  const session = await auth();
  const user = await db.user.findUnique({ where: { id: session!.user.id } });
  if (!user) return null;

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-organic-green-dark">My Profile</h1>
      <p className="mt-1 font-sans text-sm text-muted-foreground">
        Member since {format(user.createdAt, "MMMM yyyy")}
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="font-sans text-xs uppercase tracking-wide text-muted-foreground">
            Full Name
          </p>
          <p className="mt-1 font-heading text-base font-semibold text-foreground">
            {user.name ?? "—"}
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="font-sans text-xs uppercase tracking-wide text-muted-foreground">Email</p>
          <p className="mt-1 font-heading text-base font-semibold text-foreground">
            {user.email}
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="font-sans text-xs uppercase tracking-wide text-muted-foreground">Phone</p>
          <p className="mt-1 font-heading text-base font-semibold text-foreground">
            {user.phone ?? "—"}
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="font-sans text-xs uppercase tracking-wide text-muted-foreground">
            Account Type
          </p>
          <p className="mt-1 font-heading text-base font-semibold text-foreground capitalize">
            {user.role.toLowerCase()}
          </p>
        </div>
      </div>
    </div>
  );
}
