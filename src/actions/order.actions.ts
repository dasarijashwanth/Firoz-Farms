"use server";

import { redirect } from "next/navigation";
import { customAlphabet } from "nanoid";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { isRazorpayConfigured } from "@/lib/razorpay";

const nanoOrderId = customAlphabet("0123456789", 6);

const DELIVERY_FEE = 40;
const FREE_DELIVERY_THRESHOLD = 500;

export type CheckoutActionState = {
  status: "idle" | "error";
  message?: string;
};

export async function createOrder(
  _prevState: CheckoutActionState,
  formData: FormData
): Promise<CheckoutActionState> {
  const session = await auth();
  if (!session?.user) {
    return { status: "error", message: "Please sign in to place an order." };
  }

  const addressId = formData.get("addressId") as string | null;
  const deliverySlot = formData.get("deliverySlot") as string | null;
  const paymentMethod = formData.get("paymentMethod") as string | null;

  if (!addressId) {
    return { status: "error", message: "Please select a delivery address." };
  }
  if (paymentMethod === "RAZORPAY" && !isRazorpayConfigured) {
    return { status: "error", message: "Online payment is not available yet — please choose Cash on Delivery." };
  }

  const address = await db.address.findFirst({
    where: { id: addressId, userId: session.user.id },
  });
  if (!address) {
    return { status: "error", message: "Selected address was not found." };
  }

  const cart = await db.cart.findUnique({
    where: { userId: session.user.id },
    include: { items: { include: { product: true } } },
  });

  if (!cart || cart.items.length === 0) {
    return { status: "error", message: "Your cart is empty." };
  }

  const subtotal = cart.items.reduce(
    (sum, item) => sum + item.product.price.toNumber() * item.quantity,
    0
  );
  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const total = subtotal + deliveryFee;
  const orderNumber = `FF-${nanoOrderId()}`;

  const order = await db.order.create({
    data: {
      orderNumber,
      userId: session.user.id,
      addressId: address.id,
      subtotal,
      deliveryFee,
      total,
      deliverySlot: deliverySlot ?? undefined,
      paymentMethod: paymentMethod === "RAZORPAY" ? "RAZORPAY" : "COD",
      paymentStatus: "PENDING",
      items: {
        create: cart.items.map((item) => ({
          productId: item.productId,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
        })),
      },
    },
  });

  await db.$transaction(
    cart.items.map((item) =>
      db.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } },
      })
    )
  );

  await db.cartItem.deleteMany({ where: { cartId: cart.id } });

  redirect(`/checkout/success?order=${order.orderNumber}`);
}
