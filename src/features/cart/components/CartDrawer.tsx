"use client";

import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingCart,
  ArrowRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCart } from "../hooks/useCart";

export function CartDrawer() {
  const router = useRouter();

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

  const totalItems = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  function handleCheckout() {
    if (items.length === 0) return;

    closeCart();
    router.push("/checkout");
  }

  return (
    <>
      {/* Backdrop */}
      <button
        type="button"
        onClick={closeCart}
        aria-label="Cerrar carrito"
        className="fixed inset-0 z-[90] cursor-default bg-black/60 backdrop-blur-sm"
      />

      {/* Drawer */}
      <aside className="fixed right-0 top-0 z-[100] flex h-screen w-full max-w-md flex-col border-l border-violet-500/20 bg-[#09090f] text-white shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="border-b border-white/10 p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <ShoppingCart className="text-violet-400" />

                <h2 className="text-2xl font-black">
                  Tu carrito
                </h2>

                {totalItems > 0 && (
                  <span className="rounded-full bg-violet-600 px-3 py-1 text-xs font-bold">
                    {totalItems}
                  </span>
                )}
              </div>

              <p className="mt-1 text-sm text-white/50">
                Productos seleccionados
              </p>
            </div>

            <button
              type="button"
              onClick={closeCart}
              aria-label="Cerrar carrito"
              className="rounded-xl p-2 transition hover:bg-white/10"
            >
              <X />
            </button>
          </div>
        </div>

        {/* Lista de productos */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center px-10 text-center">
              <div className="text-7xl">🛒</div>

              <h3 className="mt-6 text-2xl font-black">
                Tu carrito está vacío
              </h3>

              <p className="mt-3 text-white/50">
                Agrega productos para comenzar tu pedido.
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="border-b border-white/10 p-5 transition hover:bg-white/[0.03]"
              >
                <div className="flex gap-4">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-20 w-20 rounded-xl object-cover"
                    />
                  ) : (
                    <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-white/5 text-3xl">
                      📦
                    </div>
                  )}

                  <div className="flex flex-1 flex-col">
                    <h3 className="font-bold">
                      {item.name}
                    </h3>

                    <p className="mt-1 text-lg font-black text-orange-400">
                      Q {item.price.toFixed(2)}
                    </p>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            decreaseQuantity(item.id)
                          }
                          aria-label={`Disminuir cantidad de ${item.name}`}
                          className="rounded-lg border border-white/10 p-2 transition hover:bg-white/10"
                        >
                          <Minus size={14} />
                        </button>

                        <span className="w-8 text-center font-bold">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            increaseQuantity(item.id)
                          }
                          aria-label={`Aumentar cantidad de ${item.name}`}
                          className="rounded-lg border border-white/10 p-2 transition hover:bg-white/10"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        aria-label={`Eliminar ${item.name}`}
                        className="rounded-lg p-2 text-red-400 transition hover:bg-red-500/10"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-white/10 bg-[#0b0b12] p-6">
          <div className="mb-6 flex items-center justify-between">
            <span className="text-lg text-white/70">
              Subtotal
            </span>

            <span className="text-3xl font-black text-orange-400">
              Q {subtotal.toFixed(2)}
            </span>
          </div>

          <button
            type="button"
            onClick={handleCheckout}
            disabled={items.length === 0}
            className="mb-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 py-4 font-black transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
          >
            Finalizar compra
            <ArrowRight size={20} />
          </button>

          <button
            type="button"
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