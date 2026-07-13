import Link from "next/link";
import {
  CheckCircle2,
  Clock3,
  PackageCheck,
  Printer,
} from "lucide-react";

import type { AdminOrder } from "@/features/admin/orders/types";
import { OrderStatusBadge } from "@/features/orders/components/OrderStatusBadge";

interface ProductionBoardProps {
  orders: AdminOrder[];
}

function getTotalUnits(order: AdminOrder) {
  return order.items.reduce(
    (total, item) => total + item.quantity,
    0
  );
}

function ProductionColumn({
  title,
  description,
  icon: Icon,
  orders,
}: {
  title: string;
  description: string;
  icon: typeof Clock3;
  orders: AdminOrder[];
}) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
      <div className="mb-5 flex items-start gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
          <Icon size={21} />
        </div>

        <div>
          <h2 className="text-lg font-black text-white">
            {title}
          </h2>

          <p className="mt-1 text-sm text-white/45">
            {description}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {!orders.length ? (
          <div className="rounded-2xl border border-dashed border-white/10 p-6 text-center text-sm text-white/35">
            No hay pedidos en esta etapa.
          </div>
        ) : (
          orders.map((order) => (
            <Link
              key={order.id}
              href={`/admin/pedidos/${order.id}`}
              className="block rounded-2xl border border-white/10 bg-black/20 p-4 transition hover:-translate-y-0.5 hover:border-violet-500/40 hover:bg-violet-500/5"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-black text-white">
                    {order.orderNumber}
                  </h3>

                  <p className="mt-1 text-sm text-white/45">
                    {order.customerName ?? "Cliente sin nombre"}
                  </p>
                </div>

                <OrderStatusBadge status={order.status} />
              </div>

              <div className="mt-4 space-y-2">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-3 text-sm"
                  >
                    <span className="text-white/65">
                      {item.productName}
                    </span>

                    <span className="font-bold text-violet-200">
                      x{item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 border-t border-white/10 pt-3 text-xs text-white/40">
                {getTotalUnits(order)} unidad
                {getTotalUnits(order) === 1 ? "" : "es"}
              </div>
            </Link>
          ))
        )}
      </div>
    </section>
  );
}

export function ProductionBoard({
  orders,
}: ProductionBoardProps) {
  const confirmedOrders = orders.filter(
    (order) => order.status === "confirmed"
  );

  const inProductionOrders = orders.filter(
    (order) => order.status === "in_production"
  );

  const printedOrders = orders.filter(
    (order) => order.status === "printed"
  );

  return (
    <div className="grid gap-6 xl:grid-cols-3">
      <ProductionColumn
        title="Listos para producir"
        description="Pedidos confirmados y preparados para impresión."
        icon={Clock3}
        orders={confirmedOrders}
      />

      <ProductionColumn
        title="En producción"
        description="Pedidos actualmente en proceso de impresión."
        icon={Printer}
        orders={inProductionOrders}
      />

      <ProductionColumn
        title="Impresos"
        description="Pedidos terminados y pendientes de entrega."
        icon={PackageCheck}
        orders={printedOrders}
      />
    </div>
  );
}