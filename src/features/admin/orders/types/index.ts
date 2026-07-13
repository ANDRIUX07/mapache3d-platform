import type {
  Order,
  OrderStatus,
  PaymentStatus,
} from "@/features/orders/types";

export type AdminOrder = Order;

export interface UpdateOrderStatusInput {
  orderId: string;
  status: OrderStatus;
}

export interface UpdatePaymentStatusInput {
  orderId: string;
  paymentStatus: PaymentStatus;
}