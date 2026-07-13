export type OrderStatus =
  | "pending"
  | "in_conversation"
  | "confirmed"
  | "in_production"
  | "printed"
  | "shipped"
  | "delivered"
  | "cancelled";

export type PaymentStatus =
  | "pending"
  | "payment_link_sent"
  | "paid"
  | "failed"
  | "refunded"
  | "cancelled";

export interface Order {

  id: string;

  orderNumber: string;

  userId: string;

  subtotal: number;

  shippingCost: number;

  discount: number;

  total: number;

  status: OrderStatus;

  paymentStatus: PaymentStatus;

  customerName: string | null;

  customerPhone: string | null;

  deliveryMethod: string | null;

  deliveryAddress: string | null;

  notes: string | null;

  conversationId: string | null;

  createdAt: string;

  updatedAt: string;

  items: OrderItem[];
}

export interface OrderItem {

  id: string;

  orderId: string;

  productId: string | null;

  productName: string;

  productImageUrl: string | null;

  unitPrice: number;

  quantity: number;

  subtotal: number;

  material: string | null;

  color: string | null;

  personalization: string | null;

  createdAt: string;
}

export interface CreateOrderInput {

  userId: string;

  customerName?: string;

  customerPhone?: string;

  deliveryMethod?: string;

  deliveryAddress?: string;

  notes?: string;

  subtotal: number;

  shippingCost: number;

  discount: number;

  total: number;

  items: CreateOrderItemInput[];
}

export interface CreateOrderItemInput {

  productId: string;

  productName: string;

  productImageUrl?: string;

  unitPrice: number;

  quantity: number;

  subtotal: number;

  material?: string;

  color?: string;

  personalization?: string;
}