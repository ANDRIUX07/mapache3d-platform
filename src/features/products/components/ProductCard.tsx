"use client";

import { useState } from "react";
import { ZoomIn } from "lucide-react";

import { AddToCartButton } from "./AddToCartButton";
import { ProductImageModal } from "./ProductImageModal";

type Props = {
  product: any;
};

export function ProductCard({ product }: Props) {
  const [showImage, setShowImage] = useState(false);

  const sortedImages = [...(product.product_images ?? [])].sort(
    (a, b) =>
      Number(a.sort_order ?? 0) -
      Number(b.sort_order ?? 0)
  );

  const image = sortedImages[0]?.image_url;

  function openImageModal() {
    if (!image) return;

    setShowImage(true);
  }

  function closeImageModal() {
    setShowImage(false);
  }

  return (
    <>
      <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-violet-400/60 hover:shadow-[0_0_30px_rgba(168,85,247,.20)]">
        <button
          type="button"
          onClick={openImageModal}
          disabled={!image}
          aria-label={
            image
              ? `Ampliar imagen de ${product.name}`
              : `El producto ${product.name} no tiene imagen`
          }
          className={`relative block aspect-square w-full overflow-hidden bg-black text-left ${
            image
              ? "cursor-zoom-in"
              : "cursor-default"
          }`}
        >
          {image ? (
            <>
              <img
                src={image}
                alt={
                  sortedImages[0]?.alt_text ||
                  product.name ||
                  "Producto Mapache 3D"
                }
                loading="lazy"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition duration-300 group-hover:bg-black/25">
                <div className="flex translate-y-3 items-center gap-2 rounded-full border border-white/20 bg-black/60 px-3 py-2 text-xs font-bold text-white opacity-0 backdrop-blur-md transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <ZoomIn size={16} />
                  Ampliar
                </div>
              </div>
            </>
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-violet-500/10 to-cyan-500/5 px-4 text-center text-xs font-medium text-white/30">
              Sin imagen
            </div>
          )}

          {product.featured ? (
            <div className="absolute left-2 top-2 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 px-2 py-1 text-[9px] font-black uppercase tracking-wider text-black shadow-lg">
              Destacado
            </div>
          ) : null}
        </button>

        <div className="flex flex-1 flex-col p-3">
          <div>
            <p className="truncate text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-300">
              {product.categories?.name ?? "General"}
            </p>

            <h3 className="mt-1.5 line-clamp-2 min-h-10 text-sm font-black leading-5 text-white">
              {product.name}
            </h3>

            <p className="mt-2 line-clamp-2 min-h-9 text-xs leading-4 text-white/50">
              {product.short_description ||
                "Producto impreso en 3D por Mapache 3D GT."}
            </p>
          </div>

          <div className="mt-auto pt-4">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="text-[9px] uppercase tracking-widest text-white/35">
                  Precio
                </p>

                <p className="truncate text-lg font-black text-orange-400">
                  Q {Number(product.price ?? 0).toFixed(2)}
                </p>
              </div>

              <div className="shrink-0 rounded-full border border-green-400/25 bg-green-400/10 px-2 py-1 text-[9px] font-bold text-green-300">
                Disponible
              </div>
            </div>

            <div className="mt-3 grid gap-2">
              <AddToCartButton product={product} />

              <button
                type="button"
                onClick={openImageModal}
                disabled={!image}
                className="rounded-xl border border-white/10 px-2 py-2 text-xs font-bold text-white/70 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                Ver detalles
              </button>
            </div>
          </div>
        </div>
      </article>

      {image ? (
        <ProductImageModal
          isOpen={showImage}
          imageUrl={image}
          productName={
            product.name ||
            "Producto Mapache 3D"
          }
          onClose={closeImageModal}
        />
      ) : null}
    </>
  );
}