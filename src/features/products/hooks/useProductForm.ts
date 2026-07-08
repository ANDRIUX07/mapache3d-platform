"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProductAction } from "../actions/create-product";

export function useProductForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function saveProduct(data: {
    name: string;
    categoryId: string;
    shortDescription: string;
    description: string;
    price: number;
    stock: number;
    weightGrams: number;
    printTimeMinutes: number;
    material: string;
    featured: boolean;
    active: boolean;
    files: File[];
  }) {
    try {
      setLoading(true);

      await createProductAction({
        ...data,
        slug: "",
      });

      alert("✅ Producto creado correctamente.");

      router.push("/admin/productos");

      router.refresh();
    } catch (error) {
      console.error(error);
      alert("❌ Error al crear el producto.");
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    saveProduct,
  };
}