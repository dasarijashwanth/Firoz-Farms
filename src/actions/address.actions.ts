"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

const addressSchema = z.object({
  label: z.string().optional(),
  line1: z.string().min(3, "Address is required"),
  line2: z.string().optional(),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  pincode: z.string().min(6, "Enter a valid PIN code").max(6),
  phone: z.string().min(10, "Enter a valid phone number"),
});

export type AddressActionState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function createAddress(
  _prevState: AddressActionState,
  formData: FormData
): Promise<AddressActionState> {
  const session = await auth();
  if (!session?.user) return { status: "error", message: "Please sign in." };

  const parsed = addressSchema.safeParse({
    label: formData.get("label") || undefined,
    line1: formData.get("line1"),
    line2: formData.get("line2") || undefined,
    city: formData.get("city"),
    state: formData.get("state"),
    pincode: formData.get("pincode"),
    phone: formData.get("phone"),
  });

  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Invalid address" };
  }

  const existingCount = await db.address.count({ where: { userId: session.user.id } });

  await db.address.create({
    data: { ...parsed.data, userId: session.user.id, isDefault: existingCount === 0 },
  });

  revalidatePath("/account/addresses");
  return { status: "success", message: "Address saved." };
}

export async function deleteAddress(addressId: string) {
  const session = await auth();
  if (!session?.user) return;

  await db.address.deleteMany({ where: { id: addressId, userId: session.user.id } });
  revalidatePath("/account/addresses");
}

export async function setDefaultAddress(addressId: string) {
  const session = await auth();
  if (!session?.user) return;

  await db.$transaction([
    db.address.updateMany({
      where: { userId: session.user.id },
      data: { isDefault: false },
    }),
    db.address.update({
      where: { id: addressId },
      data: { isDefault: true },
    }),
  ]);

  revalidatePath("/account/addresses");
}
