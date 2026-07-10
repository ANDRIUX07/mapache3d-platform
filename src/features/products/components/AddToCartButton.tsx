"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "@/features/cart/hooks/useCart";

type Props = {
  product: any;
};

export function AddToCartButton({ product }: Props) {
  const { addItem } = useCart();

  function handleAddToCart() {
    addItem({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      quantity: 1,
      image: product.product_images?.[0]?.image_url,
      category: product.categories?.name,
      stock: product.stock,
    });
  }

  return (
    <button
      onClick={handleAddToCart}
      className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-3 font-bold transition hover:scale-[1.02] hover:from-violet-500 hover:to-fuchsia-500"
    >
      <ShoppingCart size={18} />
      Agregar al carrito
    </button>
  );
}