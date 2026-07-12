"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { useCart } from "@/features/cart/hooks/useCart";

export function CheckoutForm() {
  const router = useRouter();
  const { items, subtotal } = useCart();

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

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-violet-400">
              Mapache 3D GT
            </p>

            <h1 className="mt-3 text-4xl font-black text-violet-300">
              Checkout
            </h1>

            <p className="mt-4 text-white/60">
              Formulario de pedido, datos del cliente y método de entrega.
            </p>

            <div className="mt-8 rounded-2xl border border-violet-500/20 bg-violet-500/5 p-6">
              <h2 className="text-xl font-black">
                Datos del cliente
              </h2>

              <p className="mt-2 text-sm text-white/50">
                En el siguiente paso agregaremos nombre, teléfono,
                correo, dirección y método de entrega.
              </p>
            </div>
          </section>

          <aside className="h-fit rounded-3xl border border-white/10 bg-[#0d0715] p-6">
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
                      Q {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))
              )}
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
              <span className="text-white/60">
                Subtotal
              </span>

              <span className="text-3xl font-black text-orange-400">
                Q {subtotal.toFixed(2)}
              </span>
            </div>
            <button
  type="button"
  onClick={() => router.push("/")}
  className="mt-6 w-full rounded-2xl border border-white/10 py-4 font-bold transition hover:border-violet-500 hover:bg-violet-500/10"
>
  ← Seguir comprando
</button>
          </aside>
        </div>
      </div>
    </main>
  );
}