"use client";

import { X, Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "../hooks/useCart";

export function CartDrawer() {
  const {
    items,
    subtotal,
    isCartOpen,
    closeCart,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm"
      />

      {/* Drawer */}
      <aside className="fixed right-0 top-0 z-[100] flex h-screen w-full max-w-md flex-col border-l border-violet-500/20 bg-[#09090f] shadow-2xl">

        <div className="flex items-center justify-between border-b border-white/10 p-6">
          <div>
            <h2 className="text-2xl font-black text-white">
              Tu carrito
            </h2>

            <p className="text-sm text-white/50">
              Productos seleccionados
            </p>
          </div>

          <button
            onClick={closeCart}
            className="rounded-xl p-2 transition hover:bg-white/10"
          >
            <X />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">

          {items.length === 0 && (
            <div className="flex h-full flex-col items-center justify-center px-10 text-center">

              <div className="text-7xl">
                🛒
              </div>

              <h3 className="mt-6 text-2xl font-black">
                Tu carrito está vacío
              </h3>

              <p className="mt-3 text-white/50">
                Agrega productos para comenzar tu pedido.
              </p>

            </div>
          )}

          {items.map((item) => (
            <div
              key={item.id}
              className="border-b border-white/10 p-5"
            >
              <div className="flex gap-4">

                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-20 w-20 rounded-xl object-cover"
                  />
                ) : (
                  <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-white/5">
                    📦
                  </div>
                )}

                <div className="flex flex-1 flex-col">

                  <h3 className="font-bold">
                    {item.name}
                  </h3>

                  <p className="mt-1 text-orange-400 font-black">
                    Q {item.price.toFixed(2)}
                  </p>

                  <div className="mt-4 flex items-center justify-between">

                    <div className="flex items-center gap-2">

                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="rounded-lg border border-white/10 p-1"
                      >
                        <Minus size={15} />
                      </button>

                      <span className="w-8 text-center">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="rounded-lg border border-white/10 p-1"
                      >
                        <Plus size={15} />
                      </button>

                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-400"
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>

                </div>

              </div>
            </div>
          ))}

        </div>

        <div className="border-t border-white/10 p-6">

          <div className="mb-6 flex items-center justify-between">

            <span className="text-lg">
              Subtotal
            </span>

            <span className="text-3xl font-black text-orange-400">
              Q {subtotal.toFixed(2)}
            </span>

          </div>

          <button className="mb-3 w-full rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 py-4 font-black transition hover:scale-[1.02]">
            Finalizar compra
          </button>

          <button
            onClick={closeCart}
            className="w-full rounded-2xl border border-white/10 py-4 font-bold transition hover:bg-white/5"
          >
            Seguir comprando
          </button>

        </div>

      </aside>
    </>
  );
}