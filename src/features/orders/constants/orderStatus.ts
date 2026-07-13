import type { OrderStatus } from "../types";

export interface OrderStatusConfig {
  label: string;
  color: string;
  bgColor: string;
}

export const ORDER_STATUS: Record<OrderStatus, OrderStatusConfig> = {
  pending: {
    label: "Pendiente",
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/10",
  },

  in_conversation: {
    label: "En conversación",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
  },

  confirmed: {
    label: "Confirmado",
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10",
  },

  in_production: {
    label: "En producción",
    color: "text-violet-400",
    bgColor: "bg-violet-500/10",
  },

  printed: {
    label: "Impreso",
    color: "text-indigo-400",
    bgColor: "bg-indigo-500/10",
  },

  shipped: {
    label: "Enviado",
    color: "text-green-400",
    bgColor: "bg-green-500/10",
  },

  delivered: {
    label: "Entregado",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
  },

  cancelled: {
    label: "Cancelado",
    color: "text-red-400",
    bgColor: "bg-red-500/10",
  },
};

export function getOrderStatus(status: OrderStatus) {
  return ORDER_STATUS[status];
}