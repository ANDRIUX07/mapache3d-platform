import { supabase } from "@/lib/supabase/client";

import type {
  CreateOrderInput,
  Order,
  OrderItem,
} from "../types";

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

export async function createOrder(
  input: CreateOrderInput
): Promise<Order> {
  if (!input.items.length) {
    throw new Error(
      "No se puede crear un pedido sin productos."
    );
  }

  const {
    data: authData,
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) {
    throw new Error(authError.message);
  }

  if (!authData.user) {
    throw new Error(
      "Debes iniciar sesión para finalizar el pedido."
    );
  }

  const itemsPayload = input.items.map((item) => ({
    product_id: item.productId,
    quantity: item.quantity,
    material: item.material?.trim() || null,
    color: item.color?.trim() || null,
    personalization:
      item.personalization?.trim() || null,
  }));

  const { data, error } = await supabase.rpc(
    "create_order",
    {
      p_items: itemsPayload,
      p_customer_name:
        input.customerName?.trim() || null,
      p_customer_phone:
        input.customerPhone?.trim() || null,
      p_delivery_address:
        input.deliveryAddress?.trim() || null,
      p_notes: input.notes?.trim() || null,
    }
  );

  if (error) {
    throw new Error(
      `No se pudo crear el pedido: ${error.message}`
    );
  }

  if (!data) {
    throw new Error(
      "El pedido fue procesado, pero no se recibió la información."
    );
  }

  return mapOrder(data as OrderRow);
}