import { getOrderStatus } from "../constants/orderStatus";
import type { OrderStatus } from "../types";

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

export function OrderStatusBadge({
  status,
}: OrderStatusBadgeProps) {
  const config = getOrderStatus(status);

  return (
    <span
      className={`
        inline-flex
        items-center
        rounded-full
        px-3
        py-1
        text-xs
        font-semibold
        ${config.bgColor}
        ${config.color}
      `}
    >
      {config.label}
    </span>
  );
}