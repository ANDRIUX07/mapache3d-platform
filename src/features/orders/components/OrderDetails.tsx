"use client";

import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  MessageCircle,
  Package,
  RefreshCw,
  Truck,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { getOrder } from "../services/getOrder";
import type { Order } from "../types";
import { OrderStatusBadge } from "./OrderStatusBadge";

interface OrderDetailsProps {
  orderId: string;
}

const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "50200000000";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("es-GT", {
    style: "currency",
    currency: "GTQ",
    minimumFractionDigits: 2,
  }).format(value);
}

export function OrderDetails({
  orderId,
}: OrderDetailsProps) {
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadOrder() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getOrder(orderId);

        if (isMounted) {
          setOrder(data);
        }
      } catch (caughtError) {
        if (!isMounted) return;

        setError(
          caughtError instanceof Error
            ? caughtError.message
            : "No se pudo cargar el pedido."
        );
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadOrder();

    return () => {
      isMounted = false;
    };
  }, [orderId]);

  const whatsappUrl = useMemo(() => {
    if (!order) return "#";

    const products = order.items
      .map(
        (item) =>
          `• ${item.productName}\nCantidad: ${item.quantity}\nSubtotal: ${formatCurrency(item.subtotal)}`
      )
      .join("\n\n");

    const message = [
      "Hola Mapache 3D 👋",
      "",
      "Quiero continuar con mi pedido.",
      "",
      `Pedido: ${order.orderNumber}`,
      `Estado: ${order.status}`,
      "",
      "Productos:",
      products,
      "",
      `Total: ${formatCurrency(order.total)}`,
    ].join("\n");

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }, [order]);

  if (isLoading) {
    return (
      <div className="flex min-h-[360px] items-center justify-center rounded-3xl border border-white/10 bg-[#0d0d17]">
        <div className="flex items-center gap-3 text-white/60">
          <RefreshCw className="animate-spin" size={20} />
          <span>Cargando detalle del pedido...</span>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-8">
        <h2 className="text-xl font-black text-red-300">
          No pudimos cargar el pedido
        </h2>

        <p className="mt-2 text-sm text-white/60">
          {error ?? "El pedido no existe o no tienes acceso."}
        </p>

        <Link
          href="/account/orders"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm font-bold text-white transition hover:bg-white/15"
        >
          <ArrowLeft size={16} />
          Volver a mis pedidos
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-white/10 bg-[#0d0d17] p-6 sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-violet-300">
              Pedido
            </p>

            <h1 className="mt-1 text-3xl font-black text-white">
              {order.orderNumber}
            </h1>

            <p className="mt-2 text-sm text-white/50">
              Creado el{" "}
              {new Date(order.createdAt).toLocaleDateString(
                "es-GT",
                {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                }
              )}
            </p>
          </div>

          <OrderStatusBadge status={order.status} />
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-[#0d0d17] p-6 sm:p-8">
        <div className="mb-6 flex items-center gap-3">
          <Package className="text-violet-400" size={22} />

          <h2 className="text-xl font-black text-white">
            Productos
          </h2>
        </div>

        <div className="space-y-4">
          {order.items.map((item) => (
            <article
              key={item.id}
              className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h3 className="font-bold text-white">
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
                  <p className="mt-1 text-sm text-white/50">
                    Personalización: {item.personalization}
                  </p>
                )}
              </div>

              <div className="text-left sm:text-right">
                <p className="text-sm text-white/50">
                  {formatCurrency(item.unitPrice)} c/u
                </p>

                <p className="mt-1 text-lg font-black text-violet-300">
                  {formatCurrency(item.subtotal)}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-3xl border border-white/10 bg-[#0d0d17] p-6">
          <div className="mb-5 flex items-center gap-3">
            <Truck className="text-violet-400" size={21} />

            <h2 className="text-lg font-black text-white">
              Entrega
            </h2>
          </div>

          <div className="space-y-3 text-sm">
            <p className="text-white/60">
              Método:{" "}
              <span className="font-semibold text-white">
                {order.deliveryMethod ?? "Por confirmar"}
              </span>
            </p>

            <div className="flex items-start gap-2 text-white/60">
              <MapPin className="mt-0.5 shrink-0" size={16} />

              <span>
                {order.deliveryAddress ??
                  "Dirección pendiente de confirmar"}
              </span>
            </div>
          </div>
        </article>

        <article className="rounded-3xl border border-white/10 bg-[#0d0d17] p-6">
          <h2 className="text-lg font-black text-white">
            Resumen
          </h2>

          <div className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between text-white/60">
              <span>Subtotal</span>
              <span>{formatCurrency(order.subtotal)}</span>
            </div>

            <div className="flex justify-between text-white/60">
              <span>Envío</span>
              <span>{formatCurrency(order.shippingCost)}</span>
            </div>

            <div className="flex justify-between text-white/60">
              <span>Descuento</span>
              <span>- {formatCurrency(order.discount)}</span>
            </div>

            <div className="border-t border-white/10 pt-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">
                  Total
                </span>

                <span className="text-2xl font-black text-violet-300">
                  {formatCurrency(order.total)}
                </span>
              </div>
            </div>
          </div>
        </article>
      </section>

      {order.notes && (
        <section className="rounded-3xl border border-white/10 bg-[#0d0d17] p-6">
          <h2 className="text-lg font-black text-white">
            Notas
          </h2>

          <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-white/60">
            {order.notes}
          </p>
        </section>
      )}

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/account/orders"
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 px-5 py-3 font-bold text-white transition hover:bg-white/5"
        >
          <ArrowLeft size={18} />
          Volver a mis pedidos
        </Link>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-green-500 px-5 py-3 font-black text-black transition hover:bg-green-400"
        >
          <MessageCircle size={19} />
          Continuar por WhatsApp
        </a>
      </div>
    </div>
  );
}