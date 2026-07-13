import Link from "next/link";
import {
  ArrowRight,
  MessageCircle,
  PackageSearch,
} from "lucide-react";

import { OrderStatusBadge } from "@/features/orders/components/OrderStatusBadge";
import type { AdminOrder } from "../orders/types";

interface AdminOrdersTableProps {
  orders: AdminOrder[];
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("es-GT", {
    style: "currency",
    currency: "GTQ",
    minimumFractionDigits: 2,
  }).format(value);
}

export function AdminOrdersTable({
  orders,
}: AdminOrdersTableProps) {
  if (!orders.length) {
    return (
      <div className="rounded-3xl border border-dashed border-white/15 bg-white/[0.03] px-6 py-16 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-500/10">
          <PackageSearch
            className="text-violet-300"
            size={30}
          />
        </div>

        <h2 className="mt-5 text-xl font-black">
          No hay pedidos registrados
        </h2>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-white/50">
          Cuando un cliente complete el checkout, sus pedidos
          aparecerán aquí.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="border-b border-white/10 bg-black/20">
            <tr className="text-left text-xs font-bold uppercase tracking-[0.16em] text-white/40">
              <th className="px-6 py-4">Pedido</th>
              <th className="px-6 py-4">Cliente</th>
              <th className="px-6 py-4">Estado</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4">Fecha</th>
              <th className="px-6 py-4 text-right">Acciones</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/10">
            {orders.map((order) => {
              const whatsappNumber = order.customerPhone
                ?.replace(/\D/g, "");

              const whatsappUrl = whatsappNumber
                ? `https://wa.me/502${whatsappNumber}?text=${encodeURIComponent(
                    `Hola ${order.customerName ?? ""}, te escribimos de Mapache 3D sobre tu pedido ${order.orderNumber}.`
                  )}`
                : null;

              return (
                <tr
                  key={order.id}
                  className="transition hover:bg-white/[0.025]"
                >
                  <td className="px-6 py-5">
                    <div>
                      <p className="font-black text-white">
                        {order.orderNumber}
                      </p>

                      <p className="mt-1 text-xs text-white/40">
                        {order.items.length} producto
                        {order.items.length === 1 ? "" : "s"}
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <div>
                      <p className="font-semibold text-white/85">
                        {order.customerName ?? "Cliente sin nombre"}
                      </p>

                      <p className="mt-1 text-xs text-white/40">
                        {order.customerPhone ?? "Sin teléfono"}
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <OrderStatusBadge status={order.status} />
                  </td>

                  <td className="px-6 py-5 font-black text-orange-300">
                    {formatCurrency(order.total)}
                  </td>

                  <td className="px-6 py-5 text-sm text-white/55">
                    {new Date(order.createdAt).toLocaleDateString(
                      "es-GT",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex justify-end gap-2">
                      {whatsappUrl && (
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-green-500/20 bg-green-500/10 text-green-300 transition hover:bg-green-500/20"
                          aria-label={`Abrir WhatsApp para ${order.orderNumber}`}
                        >
                          <MessageCircle size={17} />
                        </a>
                      )}

                      <Link
                        href={`/admin/pedidos/${order.id}`}
                        className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm font-bold text-white transition hover:border-violet-500/40 hover:bg-violet-500/10"
                      >
                        Ver
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}