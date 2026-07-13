import {
  Boxes,
  CheckCircle2,
  Printer,
} from "lucide-react";

import { ProductionBoard } from "@/features/admin/production/components/ProductionBoard";
import { getProductionOrders } from "@/features/admin/production/services/getProductionOrders";

export default async function AdminProductionPage() {
  const orders = await getProductionOrders();

  const confirmed = orders.filter(
    (order) => order.status === "confirmed"
  ).length;

  const inProduction = orders.filter(
    (order) => order.status === "in_production"
  ).length;

  const printed = orders.filter(
    (order) => order.status === "printed"
  ).length;

  return (
    <section>
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm font-bold text-violet-300">
          <Printer size={16} />
          Centro de producción
        </div>

        <h1 className="mt-4 text-4xl font-black">
          Producción
        </h1>

        <p className="mt-3 max-w-2xl text-white/55">
          Organiza pedidos confirmados, controla impresiones en
          proceso y prepara productos terminados para entrega.
        </p>
      </div>

      <section className="mb-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <div className="flex items-center gap-3">
            <Boxes className="text-violet-300" size={20} />

            <span className="text-sm text-white/50">
              Listos para producir
            </span>
          </div>

          <p className="mt-3 text-3xl font-black">
            {confirmed}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <div className="flex items-center gap-3">
            <Printer className="text-orange-300" size={20} />

            <span className="text-sm text-white/50">
              En producción
            </span>
          </div>

          <p className="mt-3 text-3xl font-black">
            {inProduction}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="text-emerald-300" size={20} />

            <span className="text-sm text-white/50">
              Impresos
            </span>
          </div>

          <p className="mt-3 text-3xl font-black">
            {printed}
          </p>
        </div>
      </section>

      <ProductionBoard orders={orders} />
    </section>
  );
}