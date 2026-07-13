import { supabase } from "@/lib/supabase/client";

import type { Order, OrderItem } from "../types";

interface OrderRow {
  id: string;
  order_number: string;
  user_id: string;
  subtotal: number | string;
  shipping_cost: number | string;
  discount: number | string;
  total: number | string;
  status: Order["status"];
  payment_status: Order["paymentStatus"];
  customer_name: string | null;
  customer_phone: string | null;
  delivery_method: string | null;
  delivery_address: string | null;
  notes: string | null;
  conversation_id: string | null;
  created_at: string;
  updated_at: string;
  order_items?: OrderItemRow[];
}

interface OrderItemRow {
  id: string;
  order_id: string;
  product_id: string | null;
  product_name: string;
  product_image_url: string | null;
  unit_price: number | string;
  quantity: number;
  subtotal: number | string;
  material: string | null;
  color: string | null;
  personalization: string | null;
  created_at: string;
}

function mapOrderItem(row: OrderItemRow): OrderItem {
  return {
    id: row.id,
    orderId: row.order_id,
    productId: row.product_id,
    productName: row.product_name,
    productImageUrl: row.product_image_url,
    unitPrice: Number(row.unit_price),
    quantity: row.quantity,
    subtotal: Number(row.subtotal),
    material: row.material,
    color: row.color,
    personalization: row.personalization,
    createdAt: row.created_at,
  };
}

function mapOrder(row: OrderRow): Order {
  return {
    id: row.id,
    orderNumber: row.order_number,
    userId: row.user_id,
    subtotal: Number(row.subtotal),
    shippingCost: Number(row.shipping_cost),
    discount: Number(row.discount),
    total: Number(row.total),
    status: row.status,
    paymentStatus: row.payment_status,
    customerName: row.customer_name,
    customerPhone: row.customer_phone,
    deliveryMethod: row.delivery_method,
    deliveryAddress: row.delivery_address,
    notes: row.notes,
    conversationId: row.conversation_id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    items: (row.order_items ?? []).map(mapOrderItem),
  };
}

export async function getOrder(
  orderId: string
): Promise<Order> {

  const {
    data: authData,
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) {
    throw new Error(authError.message);
  }

  const user = authData.user;

  if (!user) {
    throw new Error("Usuario no autenticado.");
  }

  const {
    data,
    error,
  } = await supabase
    .from("orders")
    .select(`
      *,
      order_items (
        id,
        order_id,
        product_id,
        product_name,
        product_image_url,
        unit_price,
        quantity,
        subtotal,
        material,
        color,
        personalization,
        created_at
      )
    `)
    .eq("id", orderId)
    .eq("user_id", user.id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return mapOrder(data as OrderRow);
}
