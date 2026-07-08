"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteProduct } from "../services/delete-product.service";

type Props = {
  productId: string;
  productName: string;
};

export function DeleteProductButton({ productId, productName }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    const confirmed = confirm(
      `¿Seguro que deseas eliminar "${productName}"? Esta acción no se puede deshacer.`
    );

    if (!confirmed) return;

    try {
      setLoading(true);
      await deleteProduct(productId);
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("No se pudo eliminar el producto.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={loading}
      className="inline-flex items-center gap-2 rounded-xl border border-red-500/30 px-3 py-2 text-sm text-red-300 transition hover:bg-red-500/10 disabled:opacity-50"
    >
      <Trash2 size={16} />
      {loading ? "Eliminando..." : "Eliminar"}
    </button>
  );
}