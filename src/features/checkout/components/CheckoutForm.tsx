"use client";

import {
  type FormEvent,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  LoaderCircle,
  MapPin,
  MessageCircle,
  ShoppingCart,
  Truck,
} from "lucide-react";

import { useCart } from "@/features/cart/hooks/useCart";
import { createOrder } from "@/features/orders/services/createOrder";
import { supabase } from "@/lib/supabase/client";

const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

const DELIVERY_METHOD = "Envío a domicilio";
const SHIPPING_COST = 42;

export function CheckoutForm() {
  const router = useRouter();

  const {
    items,
    subtotal,
    clearCart,
  } = useCart();

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [notes, setNotes] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const displayedTotal = subtotal + SHIPPING_COST;

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!items.length) {
      setError(
        "Agrega al menos un producto antes de finalizar el pedido."
      );
      return;
    }

    if (!customerName.trim()) {
      setError("Ingresa tu nombre.");
      return;
    }

    if (!customerPhone.trim()) {
      setError("Ingresa tu número de teléfono.");
      return;
    }

    if (!deliveryAddress.trim()) {
      setError("Ingresa la dirección de entrega.");
      return;
    }

    if (!WHATSAPP_NUMBER) {
      setError(
        "El número de WhatsApp de la tienda no está configurado."
      );
      return;
    }

    /*
     * Abrimos la pestaña durante el clic del usuario.
     * Esto evita que el navegador bloquee WhatsApp después
     * de esperar la respuesta de Supabase.
     */
    const whatsappWindow = window.open("", "_blank");

    try {
      setIsSubmitting(true);
      setError(null);

      const {
        data: userData,
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        throw new Error(userError.message);
      }

      const user = userData.user;

      if (!user) {
        whatsappWindow?.close();

        router.push("/login?redirectTo=/checkout");
        return;
      }

      const order = await createOrder({
        userId: user.id,
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        deliveryMethod: DELIVERY_METHOD,
        deliveryAddress: deliveryAddress.trim(),
        notes: notes.trim() || undefined,
        subtotal,
        shippingCost: SHIPPING_COST,
        discount: 0,
        total: displayedTotal,
        items: items.map((item) => ({
          productId: item.id,
          productName: item.name,
          unitPrice: item.price,
          quantity: item.quantity,
          subtotal: item.price * item.quantity,
        })),
      });

      const productsMessage = order.items
        .map(
          (item) =>
            `• ${item.productName}\n` +
            `Cantidad: ${item.quantity}\n` +
            `Subtotal: Q ${item.subtotal.toFixed(2)}`
        )
        .join("\n\n");

      const whatsappMessage = [
        "Hola Mapache 3D 👋",
        "",
        "Quiero confirmar mi pedido.",
        "",
        `Pedido: ${order.orderNumber}`,
        "",
        "Productos:",
        productsMessage,
        "",
        `Subtotal: Q ${order.subtotal.toFixed(2)}`,
        `Envío: Q ${order.shippingCost.toFixed(2)}`,
        `Total: Q ${order.total.toFixed(2)}`,
        "",
        `Nombre: ${customerName.trim()}`,
        `Teléfono: ${customerPhone.trim()}`,
        `Entrega: ${DELIVERY_METHOD}`,
        `Dirección: ${deliveryAddress.trim()}`,
        notes.trim()
          ? `Notas: ${notes.trim()}`
          : null,
        "",
        "Gracias.",
      ]
        .filter(Boolean)
        .join("\n");

      const whatsappUrl =
        `https://wa.me/${WHATSAPP_NUMBER}` +
        `?text=${encodeURIComponent(whatsappMessage)}`;

      clearCart();

      if (whatsappWindow) {
        whatsappWindow.location.href = whatsappUrl;
      } else {
        window.location.href = whatsappUrl;
        return;
      }

      router.push(`/account/orders/${order.id}`);
    } catch (caughtError) {
      whatsappWindow?.close();

      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "No se pudo crear el pedido."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#090014] px-4 py-10 text-white sm:px-8">
      <div className="mx-auto max-w-6xl">
        <button
          type="button"
          onClick={() => router.back()}
          className="mb-8 flex items-center gap-2 text-white/60 transition hover:text-white"
        >
          <ArrowLeft size={18} />
          Regresar
        </button>

        <form
          onSubmit={handleSubmit}
          className="grid gap-8 lg:grid-cols-[1fr_380px]"
        >
          <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-violet-400">
              Mapache 3D GT
            </p>

            <h1 className="mt-3 text-4xl font-black text-violet-300">
              Checkout
            </h1>

            <p className="mt-4 text-white/60">
              Completa tus datos para registrar el pedido y
              continuar la confirmación por WhatsApp.
            </p>

            <div className="mt-8 space-y-6 rounded-2xl border border-violet-500/20 bg-violet-500/5 p-6">
              <h2 className="text-xl font-black">
                Datos del cliente
              </h2>

              <div>
                <label
                  htmlFor="customerName"
                  className="mb-2 block text-sm font-bold text-white/70"
                >
                  Nombre completo
                </label>

                <input
                  id="customerName"
                  type="text"
                  value={customerName}
                  onChange={(event) =>
                    setCustomerName(event.target.value)
                  }
                  placeholder="Ejemplo: Roberto Valdez"
                  autoComplete="name"
                  required
                  className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-white/25 focus:border-violet-500"
                />
              </div>

              <div>
                <label
                  htmlFor="customerPhone"
                  className="mb-2 block text-sm font-bold text-white/70"
                >
                  Teléfono
                </label>

                <input
                  id="customerPhone"
                  type="tel"
                  value={customerPhone}
                  onChange={(event) =>
                    setCustomerPhone(event.target.value)
                  }
                  placeholder="Ejemplo: 5555 5555"
                  autoComplete="tel"
                  required
                  className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-white/25 focus:border-violet-500"
                />
              </div>

              <div>
                <p className="mb-2 block text-sm font-bold text-white/70">
                  Método de entrega
                </p>

                <div className="rounded-2xl border border-violet-500/30 bg-violet-500/10 p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-500/20 text-violet-300">
                      <Truck size={24} />
                    </div>

                    <div>
                      <p className="font-black text-white">
                        Envío a domicilio
                      </p>

                      <p className="mt-1 text-sm text-white/60">
                        Tarifa fija para toda Guatemala
                      </p>
                    </div>

                    <p className="ml-auto font-black text-orange-400">
                      Q {SHIPPING_COST.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="deliveryAddress"
                  className="mb-2 flex items-center gap-2 text-sm font-bold text-white/70"
                >
                  <MapPin size={16} />
                  Dirección de entrega
                </label>

                <textarea
                  id="deliveryAddress"
                  value={deliveryAddress}
                  onChange={(event) =>
                    setDeliveryAddress(event.target.value)
                  }
                  placeholder="Departamento, municipio, zona y referencias"
                  rows={3}
                  autoComplete="street-address"
                  required
                  className="w-full resize-none rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-white/25 focus:border-violet-500"
                />
              </div>

              <div>
                <label
                  htmlFor="notes"
                  className="mb-2 block text-sm font-bold text-white/70"
                >
                  Notas o personalización
                </label>

                <textarea
                  id="notes"
                  value={notes}
                  onChange={(event) =>
                    setNotes(event.target.value)
                  }
                  placeholder="Colores, nombres, tamaño u otros detalles"
                  rows={4}
                  className="w-full resize-none rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-white/25 focus:border-violet-500"
                />
              </div>
            </div>

            {error && (
              <div className="mt-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
                {error}
              </div>
            )}
          </section>

          <aside className="h-fit rounded-3xl border border-white/10 bg-[#0d0715] p-6 lg:sticky lg:top-8">
            <div className="flex items-center gap-3">
              <ShoppingCart className="text-violet-400" />

              <h2 className="text-xl font-black">
                Resumen del pedido
              </h2>
            </div>

            <div className="mt-6 space-y-4">
              {items.length === 0 ? (
                <p className="rounded-2xl bg-white/5 p-4 text-center text-white/50">
                  No hay productos en el carrito.
                </p>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-4 border-b border-white/10 pb-4"
                  >
                    <div>
                      <p className="font-bold">
                        {item.name}
                      </p>

                      <p className="text-sm text-white/50">
                        Cantidad: {item.quantity}
                      </p>
                    </div>

                    <p className="font-black text-orange-400">
                      Q{" "}
                      {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))
              )}
            </div>

            <div className="mt-6 space-y-3 border-t border-white/10 pt-5">
              <div className="flex items-center justify-between">
                <span className="text-white/60">
                  Subtotal
                </span>

                <span className="font-bold text-white">
                  Q {subtotal.toFixed(2)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-white/60">
                  Envío a domicilio
                </span>

                <span className="font-bold text-white">
                  Q {SHIPPING_COST.toFixed(2)}
                </span>
              </div>

              <div className="flex items-center justify-between border-t border-white/10 pt-4">
                <span className="font-black text-white">
                  Total
                </span>

                <span className="text-3xl font-black text-orange-400">
                  Q {displayedTotal.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || items.length === 0}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-green-500 px-5 py-4 font-black text-black transition hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <LoaderCircle
                    className="animate-spin"
                    size={20}
                  />
                  Creando pedido...
                </>
              ) : (
                <>
                  <MessageCircle size={20} />
                  Confirmar por WhatsApp
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => router.push("/")}
              disabled={isSubmitting}
              className="mt-3 w-full rounded-2xl border border-white/10 py-4 font-bold transition hover:border-violet-500 hover:bg-violet-500/10 disabled:opacity-50"
            >
              ← Seguir comprando
            </button>

            <p className="mt-4 text-center text-xs leading-5 text-white/40">
              El pedido se guardará en tu cuenta antes de abrir
              WhatsApp. La entrega y el pago se coordinarán con
              Mapache 3D.
            </p>
          </aside>
        </form>
      </div>
    </main>
  );
}