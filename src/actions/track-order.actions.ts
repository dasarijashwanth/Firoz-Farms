"use server";

import { z } from "zod";
import { db } from "@/lib/db";

const trackSchema = z.object({
  orderNumber: z.string().min(3),
  email: z.string().email(),
});

export type TrackOrderState = {
  status: "idle" | "success" | "error";
  message?: string;
  order?: {
    orderNumber: string;
    status: string;
    total: string;
    deliverySlot: string | null;
    createdAt: string;
    items: { name: string; quantity: number }[];
  };
};

const STATUS_LABELS: Record<string, string> = {
  PLACED: "Placed",
  CONFIRMED: "Confirmed",
  PACKED: "Packed",
  SHIPPED: "Shipped",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

export async function trackOrder(
  _prevState: TrackOrderState,
  formData: FormData
): Promise<TrackOrderState> {
  const parsed = trackSchema.safeParse({
    orderNumber: formData.get("orderNumber"),
    email: formData.get("email"),
  });

  if (!parsed.success) {
    return { status: "error", message: "Please enter a valid order number and email." };
  }

  const order = await db.order.findFirst({
    where: {
      orderNumber: parsed.data.orderNumber.trim(),
      user: { email: parsed.data.email.trim() },
    },
    include: { items: true },
  });

  if (!order) {
    return { status: "error", message: "We couldn't find an order matching those details." };
  }

  return {
    status: "success",
    order: {
      orderNumber: order.orderNumber,
      status: STATUS_LABELS[order.status] ?? order.status,
      total: order.total.toString(),
      deliverySlot: order.deliverySlot,
      createdAt: order.createdAt.toISOString(),
      items: order.items.map((i) => ({ name: i.name, quantity: i.quantity })),
    },
  };
}
