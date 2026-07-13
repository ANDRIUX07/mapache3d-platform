"use server";

import { revalidatePath } from "next/cache";

import type { OrderStatus } from "@/features/orders/types";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const allowedStatuses: OrderStatus[] = [
  "pending",
  "in_conversation",
  "confirmed",
  "in_production",
  "printed",
  "shipped",
  "delivered",
  "cancelled",
];

export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus
) {
  if (!orderId) {
    throw new Error("El identificador del pedido es obligatorio.");
  }

  if (!allowedStatuses.includes(status)) {
    throw new Error("El estado seleccionado no es válido.");
  }

  const supabase = await createSupabaseServerClient();

  const { error } = await supabase
    .from("orders")
    .update({
      status,
    })
    .eq("id", orderId);

  if (error) {
    throw new Error(
      `No se pudo actualizar el estado: ${error.message}`
    );
  }

  revalidatePath("/admin/pedidos");
  revalidatePath(`/admin/pedidos/${orderId}`);
  revalidatePath("/admin/produccion");
  revalidatePath("/account/orders");

  return {
    success: true,
  };
}