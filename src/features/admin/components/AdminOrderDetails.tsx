import { OrderStatusSelector } from "./OrderStatusSelector";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  MessageCircle,
  Package,
  Phone,
  UserRound,
} from "lucide-react";

import { OrderStatusBadge } from "@/features/orders/components/OrderStatusBadge";
import type { AdminOrder } from "@/features/admin/orders/types";

interface AdminOrderDetailsProps {
  order: AdminOrder;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("es-GT", {
    style: "currency",
    currency: "GTQ",
    minimumFractionDigits: 2,
  }).format(value);
}

export function AdminOrderDetails({
  order,
}: AdminOrderDetailsProps) {
  const cleanPhone = order.customerPhone?.replace(/\D/g, "") ?? "";

  const whatsappNumber = cleanPhone.startsWith("502")
    ? cleanPhone
    : cleanPhone
      ? `502${cleanPhone}`
      : "";

  const whatsappMessage = encodeURIComponent(
    `Hola ${order.customerName ?? ""}, te escribimos de Mapache 3D sobre tu pedido ${order.orderNumber}.`
  );

  const whatsappUrl = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`
    : null;

  return (
    <section className="space-y-6">
      <Link
        href="/admin/pedidos"
        className="inline-flex items-center gap-2 text-sm font-semibold text-white/50 transition hover:text-violet-300"
      >
        <ArrowLeft size={16} />
        Volver a pedidos
      </Link>

      <header className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-300">
              Pedido
            </p>

            <h1 className="mt-2 text-4xl font-black">
              {order.orderNumber}
            </h1>

            <p className="mt-3 text-sm text-white/50">
              Creado el{" "}
              {new Date(order.createdAt).toLocaleDateString("es-GT", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>

          <OrderStatusBadge status={order.status} />
        </div>
      </header>

      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="space-y-6">
          <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <div className="mb-5 flex items-center gap-3">
              <Package className="text-violet-300" size={22} />

              <h2 className="text-xl font-black">
                Productos para producción
              </h2>
            </div>

            <div className="space-y-4">
              {order.items.map((item) => (
                <article
                  key={item.id}
                  className="rounded-2xl border border-white/10 bg-black/20 p-4"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="font-black">
                        {item.productName}
                      </h3>

                      <p className="mt-1 text-sm text-white/50">
                        Cantidad: {item.quantity}
                      </p>

                      {item.material && (
                        <p className="mt-1 text-sm text-white/50">
                          Material: {item.material}
                        </p>
                      )}

                      {item.color && (
                        <p className="mt-1 text-sm text-white/50">
                          Color: {item.color}
                        </p>
                      )}

                      {item.personalization && (
                        <p className="mt-1 text-sm text-violet-200">
                          Personalización: {item.personalization}
                        </p>
                      )}
                    </div>

                    <div className="text-left sm:text-right">
                      <p className="text-sm text-white/45">
                        {formatCurrency(item.unitPrice)} c/u
                      </p>

                      <p className="mt-1 text-lg font-black text-orange-300">
                        {formatCurrency(item.subtotal)}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {order.notes && (
            <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <h2 className="text-xl font-black">
                Notas del pedido
              </h2>

              <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-white/60">
                {order.notes}
              </p>
            </section>
          )}
        </div>

        <aside className="space-y-6">
            <OrderStatusSelector
  orderId={order.id}
  currentStatus={order.status}
/>
          <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <div className="flex items-center gap-3">
              <UserRound className="text-violet-300" size={21} />
              

              <h2 className="text-lg font-black">
                Cliente
              </h2>
            </div>

            <div className="mt-5 space-y-4 text-sm">
              <p className="font-semibold text-white">
                {order.customerName ?? "Cliente sin nombre"}
              </p>

              <div className="flex items-center gap-2 text-white/55">
                <Phone size={16} />
                {order.customerPhone ?? "Sin teléfono"}
              </div>

              <div className="flex items-start gap-2 text-white/55">
                <MapPin className="mt-0.5 shrink-0" size={16} />
                <span>
                  {order.deliveryAddress ??
                    "Dirección pendiente de confirmar"}
                </span>
              </div>

              <p className="text-white/55">
                Método de entrega:{" "}
                <span className="font-semibold text-white">
                  {order.deliveryMethod ?? "Por confirmar"}
                </span>
              </p>
            </div>

            {whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-green-500 px-5 py-3 font-black text-black transition hover:bg-green-400"
              >
                <MessageCircle size={19} />
                Contactar por WhatsApp
              </a>
            )}
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-lg font-black">
              Resumen
            </h2>

            <div className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between text-white/55">
                <span>Subtotal</span>
                <span>{formatCurrency(order.subtotal)}</span>
              </div>

              <div className="flex justify-between text-white/55">
                <span>Envío</span>
                <span>{formatCurrency(order.shippingCost)}</span>
              </div>

              <div className="flex justify-between text-white/55">
                <span>Descuento</span>
                <span>- {formatCurrency(order.discount)}</span>
              </div>

              <div className="border-t border-white/10 pt-4">
                <div className="flex items-center justify-between">
                  <span className="font-bold">
                    Total
                  </span>

                  <span className="text-2xl font-black text-orange-300">
                    {formatCurrency(order.total)}
                  </span>
                </div>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </section>
  );
}