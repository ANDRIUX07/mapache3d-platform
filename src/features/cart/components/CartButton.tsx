"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "../hooks/useCart";

export function CartButton() {
  const { totalItems, toggleCart } = useCart();

  return (
    <button
      onClick={toggleCart}
      className="relative rounded-full border border-violet-500/40 bg-violet-500/10 p-3 text-white shadow-lg shadow-violet-500/20 transition hover:bg-violet-500/20"
    >
      <ShoppingCart size={22} />

      {totalItems > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-violet-500 px-1 text-xs font-bold text-white">
          {totalItems}
        </span>
      )}
    </button>
  );
}