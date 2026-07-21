import Link from "next/link";
import {
  Clock3,
  PackageCheck,
  Printer,
  Scale,
  Timer,
} from "lucide-react";

import type { ProductionOrder } from "@/features/admin/production/services/getProductionOrders";
import { OrderStatusBadge } from "@/features/orders/components/OrderStatusBadge";

interface ProductionBoardProps {
  orders: ProductionOrder[];
}

function formatPrintTime(totalMinutes: number) {
  if (totalMinutes <= 0) {
    return "Sin tiempo";
  }

  const hours = Math.floor(totalMinutes / 60);
  const minutes = Math.round(totalMinutes % 60);

  if (hours === 0) {
    return `${minutes} min`;
  }

  if (minutes === 0) {
    return `${hours} h`;
  }

  return `${hours} h ${minutes} min`;
}

function formatWeight(totalGrams: number) {
  if (totalGrams <= 0) {
    return "Sin peso";
  }

  if (totalGrams >= 1000) {
    return `${(totalGrams / 1000).toFixed(2)} kg`;
  }

  return `${totalGrams.toFixed(1)} g`;
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
  orders: ProductionOrder[];
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

              <div className="mt-4 space-y-3">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-xl border border-white/5 bg-white/[0.02] p-3"
                  >
                    <div className="flex items-center justify-between gap-3 text-sm">
                      <span className="font-medium text-white/70">
                        {item.productName}
                      </span>

                      <span className="font-bold text-violet-200">
                        x{item.quantity}
                      </span>
                    </div>

                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-xs text-white/40">
                      <span>
                        {formatWeight(item.totalWeightGrams)}
                      </span>

                      <span>
                        {formatPrintTime(item.totalPrintTimeMinutes)}
                      </span>

                      {item.material && (
                        <span>{item.material}</span>
                      )}

                      {item.color && (
                        <span>{item.color}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2 border-t border-white/10 pt-4">
                <div className="rounded-xl bg-white/[0.03] p-2 text-center">
                  <p className="text-[10px] uppercase tracking-wide text-white/35">
                    Unidades
                  </p>

                  <p className="mt-1 text-sm font-black text-white">
                    {order.totalUnits}
                  </p>
                </div>

                <div className="rounded-xl bg-white/[0.03] p-2 text-center">
                  <div className="flex items-center justify-center gap-1 text-white/35">
                    <Scale size={11} />

                    <p className="text-[10px] uppercase tracking-wide">
                      Material
                    </p>
                  </div>

                  <p className="mt-1 text-sm font-black text-violet-200">
                    {formatWeight(order.totalWeightGrams)}
                  </p>
                </div>

                <div className="rounded-xl bg-white/[0.03] p-2 text-center">
                  <div className="flex items-center justify-center gap-1 text-white/35">
                    <Timer size={11} />

                    <p className="text-[10px] uppercase tracking-wide">
                      Tiempo
                    </p>
                  </div>

                  <p className="mt-1 text-sm font-black text-orange-200">
                    {formatPrintTime(order.totalPrintTimeMinutes)}
                  </p>
                </div>
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