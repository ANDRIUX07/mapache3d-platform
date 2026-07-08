"use client";

import { useState } from "react";
import { ProductionCostCard } from "./ProductionCostCard";
import { ProductImageUploader } from "./ProductImageUploader";
import { useProductForm } from "../hooks/useProductForm";

export function ProductForm() {
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [salePrice, setSalePrice] = useState(0);
  const [weightGrams, setWeightGrams] = useState(0);
  const [printTimeMinutes, setPrintTimeMinutes] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState(1);
  const [material, setMaterial] = useState("PLA");
  const [featured, setFeatured] = useState(true);
  const [active, setActive] = useState(true);

  const { loading, saveProduct } = useProductForm();

  return (
    <form
      className="space-y-8"
      onSubmit={async (e) => {
        e.preventDefault();
        if (selectedFiles.length === 0) {
  alert("Debes subir al menos una fotografía del producto.");
  return;
}

        await saveProduct({
          name,
          categoryId,
          shortDescription,
          description,
          price: salePrice,
          stock,
          weightGrams,
          printTimeMinutes,
          material,
          featured,
          active,
          files: selectedFiles,
        });
      }}
    >
      <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-xl font-bold">Información General</h2>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm text-white/70">
              Nombre del producto
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-black/20 p-3"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-white/70">
              Categoría
            </label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-black/20 p-3"
            >
              <option value="">Seleccione una categoría</option>
              <option value="f41cb9e4-a825-4aa0-ad40-5bbe4311001b">
                Imanes
              </option>
              <option value="53e2950b-add0-447c-aead-b04acbe3b706">
                Separadores
              </option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm text-white/70">Stock</label>
            <input
              type="number"
              step="0.01"
  inputMode="decimal"
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
              className="w-full rounded-xl border border-white/10 bg-black/20 p-3"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-white/70">Material</label>
            <select
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-black/20 p-3"
            >
              <option value="PLA">PLA</option>
              <option value="PETG">PETG</option>
              <option value="TPU">TPU</option>
              <option value="ABS">ABS</option>
              <option value="ASA">ASA</option>
            </select>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-xl font-bold">Precio y producción 3D</h2>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm text-white/70">
              Precio de venta
            </label>
            <input
              type="number"
              step="0.01"
  inputMode="decimal"

              value={salePrice}
              onChange={(e) => setSalePrice(Number(e.target.value))}
              className="w-full rounded-xl border border-white/10 bg-black/20 p-3"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-white/70">
              Peso PLA (gramos)
            </label>
            <input
              type="number"
              step="0.01"
  inputMode="decimal"
              value={weightGrams}
              onChange={(e) => setWeightGrams(Number(e.target.value))}
              className="w-full rounded-xl border border-white/10 bg-black/20 p-3"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-white/70">
              Tiempo impresión (minutos)
            </label>
            <input
              type="number"
              step="0.01"
  inputMode="decimal"
              value={printTimeMinutes}
              onChange={(e) => setPrintTimeMinutes(Number(e.target.value))}
              className="w-full rounded-xl border border-white/10 bg-black/20 p-3"
            />
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-xl font-bold">Descripción</h2>

        <div className="mt-6 space-y-6">
          <input
            placeholder="Descripción corta"
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-black/20 p-3"
          />

          <textarea
            rows={6}
            placeholder="Descripción completa"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-black/20 p-3"
          />
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-xl font-bold">Estado</h2>

        <div className="mt-6 flex flex-wrap gap-6">
          <label className="flex items-center gap-3 text-white/70">
            <input
              type="checkbox"
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
            />
            Producto activo
          </label>

          <label className="flex items-center gap-3 text-white/70">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
            />
            Producto destacado
          </label>
        </div>
      </section>

      <ProductionCostCard
        salePrice={salePrice}
        weightGrams={weightGrams}
        printTimeMinutes={printTimeMinutes}
      />

      <ProductImageUploader
        onFilesSelected={(files) => {
          setSelectedFiles(Array.from(files));
        }}
      />

      {selectedFiles.length > 0 && (
        <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="mb-4 text-xl font-bold">Vista previa</h2>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {selectedFiles.map((file, index) => (
              <img
                key={`${file.name}-${index}`}
                src={URL.createObjectURL(file)}
                alt={file.name}
                className="aspect-square rounded-xl border border-white/10 object-cover"
              />
            ))}
          </div>
        </section>
      )}

      <button
        type="submit"
        disabled={loading}
        className="rounded-xl bg-violet-600 px-8 py-4 font-bold transition hover:bg-violet-500 disabled:opacity-50"
      >
        {loading ? "Guardando..." : "Guardar producto"}
      </button>
    </form>
  );
}