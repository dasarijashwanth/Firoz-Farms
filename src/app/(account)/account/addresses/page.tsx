import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { AddressList } from "@/components/account/AddressList";
import { AddAddressForm } from "@/components/account/AddAddressForm";

export default async function AddressesPage() {
  const session = await auth();
  const addresses = await db.address.findMany({
    where: { userId: session!.user.id },
    orderBy: { isDefault: "desc" },
  });

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-organic-green-dark">
        Saved Addresses
      </h1>
      <p className="mt-1 font-sans text-sm text-muted-foreground">
        Manage delivery addresses for faster checkout.
      </p>

      <div className="mt-6">
        <AddressList addresses={addresses} />
      </div>

      <div className="mt-8 rounded-2xl border border-border bg-cream p-5">
        <h2 className="font-heading text-base font-semibold text-foreground">Add New Address</h2>
        <AddAddressForm />
      </div>
    </div>
  );
}
