import Link from "next/link";
import { Package } from "lucide-react";

import type { Order } from "../types";
import { OrderStatusBadge } from "./OrderStatusBadge";

interface OrderCardProps {
  order: Order;
}

export function OrderCard({ order }: OrderCardProps) {
  return (
    <Link
      href={`/account/orders/${order.id}`}
      className="block"
    >
      <article className="rounded-2xl border border-white/10 bg-[#0d0d17] p-6 transition hover:-translate-y-1 hover:border-violet-500/40 hover:shadow-xl hover:shadow-violet-950/20">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="font-black text-white">
              {order.orderNumber}
            </h3>

            <p className="text-sm text-white/50">
              {new Date(order.createdAt).toLocaleDateString("es-GT")}
            </p>
          </div>

          <Package
            className="text-violet-400"
            size={26}
          />
        </div>

        <div className="mb-5">
          <OrderStatusBadge status={order.status} />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-white/60">
            Total
          </span>

          <span className="text-xl font-black text-violet-400">
            Q {order.total.toFixed(2)}
          </span>
        </div>
      </article>
    </Link>
  );
}