"use client";

import { RefreshCw, ShoppingBag } from "lucide-react";

import { useOrders } from "../hooks/useOrders";
import { OrderCard } from "./OrderCard";

export function OrdersList() {
  const {
    orders,
    isLoading,
    error,
    refreshOrders,
  } = useOrders();

  if (isLoading) {
    return (
      <div className="flex min-h-[320px] items-center justify-center rounded-3xl border border-white/10 bg-[#0d0d17]">
        <div className="flex items-center gap-3 text-white/60">
          <RefreshCw className="animate-spin" size={20} />
          <span>Cargando pedidos...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-8">
        <h2 className="text-lg font-black text-red-300">
          No pudimos cargar tus pedidos
        </h2>

        <p className="mt-2 text-sm text-white/60">
          {error}
        </p>

        <button
          type="button"
          onClick={() => void refreshOrders()}
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm font-bold text-white transition hover:bg-white/15"
        >
          <RefreshCw size={16} />
          Intentar nuevamente
        </button>
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="rounded-3xl border border-dashed border-white/15 bg-[#0d0d17] px-6 py-16 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-500/10">
          <ShoppingBag className="text-violet-400" size={30} />
        </div>

        <h2 className="mt-5 text-xl font-black text-white">
          Aún no tienes pedidos
        </h2>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-white/50">
          Cuando completes tu primera compra, podrás consultar aquí
          el estado, los productos y el total del pedido.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {orders.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
        />
      ))}
    </div>
  );
}