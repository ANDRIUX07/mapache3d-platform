"use client";

import { useMemo, useState } from "react";
import {
  Boxes,
  ChevronRight,
  Grid3X3,
  PackageSearch,
  Tags,
} from "lucide-react";

import { ProductCard } from "./ProductCard";
import { ProductPlaceholderCard } from "./ProductPlaceholderCard";

type Category = {
  id: string;
  name: string;
  slug: string | null;
};

type ProductCatalogProps = {
  products: any[];
  categories: Category[];
};

const MINIMUM_VISIBLE_CARDS = 12;

export function ProductCatalog({
  products,
  categories,
}: ProductCatalogProps) {
  const [selectedCategoryId, setSelectedCategoryId] =
    useState("all");

  const categoryCounts = useMemo(() => {
    const counts = new Map<string, number>();

    products.forEach((product) => {
      const categoryId =
        product.category_id ??
        product.categories?.id;

      if (!categoryId) {
        return;
      }

      counts.set(
        categoryId,
        (counts.get(categoryId) ?? 0) + 1
      );
    });

    return counts;
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (selectedCategoryId === "all") {
      return products;
    }

    return products.filter((product) => {
      const categoryId =
        product.category_id ??
        product.categories?.id;

      return categoryId === selectedCategoryId;
    });
  }, [products, selectedCategoryId]);

  const selectedCategory =
    selectedCategoryId === "all"
      ? null
      : categories.find(
          (category) =>
            category.id === selectedCategoryId
        );

  const placeholderCount = Math.max(
    0,
    MINIMUM_VISIBLE_CARDS -
      filteredProducts.length
  );

  function selectCategory(categoryId: string) {
    setSelectedCategoryId(categoryId);

    window.requestAnimationFrame(() => {
      document
        .getElementById("catalog-grid")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    });
  }

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[230px_minmax(0,1fr)] xl:grid-cols-[250px_minmax(0,1fr)]">
      <aside className="lg:sticky lg:top-6">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/35 backdrop-blur-xl">
          <div className="border-b border-white/10 bg-violet-500/10 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300">
                <Tags size={20} />
              </div>

              <div>
                <h2 className="font-black text-white">
                  Categorías
                </h2>

                <p className="text-xs text-white/40">
                  Filtra el catálogo
                </p>
              </div>
            </div>
          </div>

          <nav
            aria-label="Categorías de productos"
            className="space-y-1 p-3"
          >
            <button
              type="button"
              onClick={() => selectCategory("all")}
              className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition ${
                selectedCategoryId === "all"
                  ? "bg-violet-500/20 text-violet-200"
                  : "text-white/60 hover:bg-white/[0.05] hover:text-white"
              }`}
            >
              <span className="flex min-w-0 items-center gap-3">
                <Grid3X3
                  size={17}
                  className="shrink-0"
                />
                <span className="truncate">
                  Todos los productos
                </span>
              </span>

              <span className="rounded-full bg-white/[0.06] px-2 py-0.5 text-xs">
                {products.length}
              </span>
            </button>

            {categories.map((category) => {
              const active =
                selectedCategoryId === category.id;

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() =>
                    selectCategory(category.id)
                  }
                  className={`group flex w-full items-center justify-between gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition ${
                    active
                      ? "bg-violet-500/20 text-violet-200"
                      : "text-white/60 hover:bg-white/[0.05] hover:text-white"
                  }`}
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <Boxes
                      size={17}
                      className="shrink-0"
                    />

                    <span className="truncate">
                      {category.name}
                    </span>
                  </span>

                  <span className="flex shrink-0 items-center gap-1">
                    <span className="rounded-full bg-white/[0.06] px-2 py-0.5 text-xs">
                      {categoryCounts.get(category.id) ??
                        0}
                    </span>

                    <ChevronRight
                      size={14}
                      className="opacity-30 transition group-hover:translate-x-0.5 group-hover:opacity-80"
                    />
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </aside>

      <section
        id="catalog-grid"
        className="min-w-0 scroll-mt-6"
      >
        <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.025] px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-violet-300">
              {selectedCategory?.name ??
                "Todos los productos"}
            </p>

            <h2 className="mt-1 text-xl font-black text-white">
              {filteredProducts.length} producto
              {filteredProducts.length === 1
                ? ""
                : "s"}{" "}
              disponible
              {filteredProducts.length === 1
                ? ""
                : "s"}
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs text-white/40">
            <PackageSearch size={16} />
            12 espacios de visualización mínima
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}

          {Array.from({
            length: placeholderCount,
          }).map((_, index) => (
            <ProductPlaceholderCard
              key={`placeholder-${selectedCategoryId}-${index}`}
              position={
                filteredProducts.length + index + 1
              }
            />
          ))}
        </div>
      </section>
    </div>
  );
}