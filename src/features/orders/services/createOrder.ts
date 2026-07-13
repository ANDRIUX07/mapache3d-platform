import { supabase } from "@/lib/supabase/client";

import type {
  CreateOrderInput,
  Order,
  OrderItem,
} from "../types";

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

function mapOrder(row: OrderRow, items: OrderItem[]): Order {
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
    items,
  };
}

export async function createOrder(
  input: CreateOrderInput
): Promise<Order> {

  if (!input.items.length) {
    throw new Error("No se puede crear un pedido sin productos.");
  }

  if (input.subtotal < 0 || input.total < 0) {
    throw new Error("Los montos del pedido no son válidos.");
  }

  const {
    data: authData,
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) {
    throw new Error(authError.message);
  }

  const authenticatedUser = authData.user;

  if (!authenticatedUser) {
    throw new Error(
      "Debes iniciar sesión para finalizar el pedido."
    );
  }

  if (authenticatedUser.id !== input.userId) {
    throw new Error(
      "El usuario autenticado no coincide con el pedido."
    );
  }

  const calculatedSubtotal = input.items.reduce(
    (total, item) => total + item.unitPrice * item.quantity,
    0
  );

  const calculatedTotal =
    calculatedSubtotal + input.shippingCost - input.discount;

  if (
    Math.abs(calculatedSubtotal - input.subtotal) > 0.01 ||
    Math.abs(calculatedTotal - input.total) > 0.01
  ) {
    throw new Error(
      "Los totales del pedido no coinciden con los productos."
    );
  }

  const {
    data: orderData,
    error: orderError,
  } = await supabase
    .from("orders")
    .insert({
      user_id: authenticatedUser.id,
      subtotal: calculatedSubtotal,
      shipping_cost: input.shippingCost,
      discount: input.discount,
      total: calculatedTotal,
      customer_name: input.customerName?.trim() || null,
      customer_phone: input.customerPhone?.trim() || null,
      delivery_method: input.deliveryMethod?.trim() || null,
      delivery_address: input.deliveryAddress?.trim() || null,
      notes: input.notes?.trim() || null,
    })
    .select("*")
    .single();

  if (orderError) {
    throw new Error(
      `No se pudo crear el pedido: ${orderError.message}`
    );
  }

  const orderRow = orderData as OrderRow;

  const orderItemsPayload = input.items.map((item) => ({
    order_id: orderRow.id,
    product_id: item.productId || null,
    product_name: item.productName,
    product_image_url: item.productImageUrl || null,
    unit_price: item.unitPrice,
    quantity: item.quantity,
    subtotal: item.unitPrice * item.quantity,
    material: item.material?.trim() || null,
    color: item.color?.trim() || null,
    personalization: item.personalization?.trim() || null,
  }));

  const {
    data: orderItemsData,
    error: orderItemsError,
  } = await supabase
    .from("order_items")
    .insert(orderItemsPayload)
    .select("*");

  if (orderItemsError) {
    await supabase
      .from("orders")
      .delete()
      .eq("id", orderRow.id);

    throw new Error(
      `No se pudieron guardar los productos del pedido: ${orderItemsError.message}`
    );
  }

  const items = (orderItemsData as OrderItemRow[]).map(
    mapOrderItem
  );

  return mapOrder(orderRow, items);
}
