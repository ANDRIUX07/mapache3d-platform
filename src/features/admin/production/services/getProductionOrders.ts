import { createSupabaseServerClient } from "@/lib/supabase/server";

import type { AdminOrder } from "@/features/admin/orders/types";
import type {
  Order,
  OrderItem,
} from "@/features/orders/types";

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
  order_items?: OrderItemRow[] | null;
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

function mapOrder(row: OrderRow): AdminOrder {
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

export async function getProductionOrders(): Promise<AdminOrder[]> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
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
    .in("status", [
      "confirmed",
      "in_production",
      "printed",
    ])
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(
      `No se pudo cargar la cola de producción: ${error.message}`
    );
  }

  return ((data ?? []) as OrderRow[]).map(mapOrder);
}