import { ClipboardList } from "lucide-react";

import { AdminOrdersTable } from "@/features/admin/components/AdminOrdersTable";
import { getAdminOrders } from "@/features/admin/orders/services/getAdminOrders";

export default async function AdminOrdersPage() {
  const orders = await getAdminOrders();

  return (
    <section>
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm font-bold text-violet-300">
          <ClipboardList size={16} />
          Gestión de pedidos
        </div>

        <h1 className="mt-4 text-4xl font-black">
          Pedidos
        </h1>

        <p className="mt-3 max-w-2xl text-white/55">
          Revisa los pedidos registrados, contacta al cliente y
          administra el flujo de producción y entrega.
        </p>
      </div>

      <AdminOrdersTable orders={orders} />
    </section>
  );
}