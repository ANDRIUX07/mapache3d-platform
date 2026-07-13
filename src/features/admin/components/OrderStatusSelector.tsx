"use client";

import {
  CheckCircle2,
  LoaderCircle,
} from "lucide-react";
import {
  useState,
  useTransition,
} from "react";
import { useRouter } from "next/navigation";

import { updateOrderStatus } from "@/features/admin/orders/services/updateOrderStatus";
import type { OrderStatus } from "@/features/orders/types";

interface OrderStatusSelectorProps {
  orderId: string;
  currentStatus: OrderStatus;
}

const STATUS_OPTIONS: Array<{
  value: OrderStatus;
  label: string;
}> = [
  {
    value: "pending",
    label: "Pendiente",
  },
  {
    value: "in_conversation",
    label: "En conversación",
  },
  {
    value: "confirmed",
    label: "Confirmado",
  },
  {
    value: "in_production",
    label: "En producción",
  },
  {
    value: "printed",
    label: "Impreso",
  },
  {
    value: "shipped",
    label: "Enviado",
  },
  {
    value: "delivered",
    label: "Entregado",
  },
  {
    value: "cancelled",
    label: "Cancelado",
  },
];

export function OrderStatusSelector({
  orderId,
  currentStatus,
}: OrderStatusSelectorProps) {
  const router = useRouter();

  const [selectedStatus, setSelectedStatus] =
    useState<OrderStatus>(currentStatus);

  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const hasChanges = selectedStatus !== currentStatus;

  function handleUpdateStatus() {
    if (!hasChanges || isPending) {
      return;
    }

    setError(null);

    startTransition(async () => {
      try {
        await updateOrderStatus(
          orderId,
          selectedStatus
        );

        router.refresh();
      } catch (caughtError) {
        setError(
          caughtError instanceof Error
            ? caughtError.message
            : "No se pudo actualizar el estado."
        );
      }
    });
  }

  return (
    <section className="rounded-3xl border border-violet-500/20 bg-violet-500/[0.06] p-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-300">
          Gestión del pedido
        </p>

        <h2 className="mt-2 text-xl font-black text-white">
          Cambiar estado
        </h2>

        <p className="mt-2 text-sm leading-6 text-white/50">
          Confirma el pedido después de coordinar con el cliente.
          Los pedidos confirmados aparecerán automáticamente en
          el centro de producción.
        </p>
      </div>

      <div className="mt-5">
        <label
          htmlFor="order-status"
          className="mb-2 block text-sm font-bold text-white/70"
        >
          Estado actual
        </label>

        <select
          id="order-status"
          value={selectedStatus}
          disabled={isPending}
          onChange={(event) =>
            setSelectedStatus(
              event.target.value as OrderStatus
            )
          }
          className="w-full rounded-2xl border border-white/10 bg-[#12091d] px-4 py-3 text-white outline-none transition focus:border-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {STATUS_OPTIONS.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <div className="mt-4 rounded-2xl border border-red-500/25 bg-red-500/10 p-4 text-sm text-red-200">
          {error}
        </div>
      )}

      <button
        type="button"
        onClick={handleUpdateStatus}
        disabled={!hasChanges || isPending}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-violet-500 px-5 py-3 font-black text-white transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {isPending ? (
          <>
            <LoaderCircle
              className="animate-spin"
              size={19}
            />
            Actualizando...
          </>
        ) : (
          <>
            <CheckCircle2 size={19} />
            Guardar estado
          </>
        )}
      </button>
    </section>
  );
}