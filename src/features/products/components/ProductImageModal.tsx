"use client";

import Image from "next/image";
import { useEffect } from "react";
import { X, ZoomIn } from "lucide-react";

type ProductImageModalProps = {
  isOpen: boolean;
  imageUrl: string;
  productName: string;
  onClose: () => void;
};

export function ProductImageModal({
  isOpen,
  imageUrl,
  productName,
  onClose,
}: ProductImageModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label={`Imagen ampliada de ${productName}`}
      onMouseDown={onClose}
    >
      <div
        className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-violet-400/25 bg-[#09090f] shadow-2xl shadow-violet-950/50"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div className="min-w-0">
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-violet-300">
              <ZoomIn size={15} />
              Vista ampliada
            </p>

            <h2 className="mt-1 truncate text-lg font-black text-white sm:text-xl">
              {productName}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="ml-4 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:border-violet-400/40 hover:bg-violet-500/20 hover:text-white"
            aria-label="Cerrar imagen ampliada"
          >
            <X size={22} />
          </button>
        </div>

        <div className="relative flex min-h-[350px] flex-1 items-center justify-center bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.14),transparent_65%)] p-4 sm:min-h-[500px] sm:p-8">
          <div className="relative h-[65vh] max-h-[700px] w-full">
            <Image
              src={imageUrl}
              alt={productName}
              fill
              sizes="(max-width: 768px) 95vw, 900px"
              className="object-contain"
              priority
            />
          </div>
        </div>

        <div className="border-t border-white/10 px-5 py-3 text-center">
          <p className="text-xs text-white/40">
            Presiona ESC o haz clic fuera de la imagen para cerrar.
          </p>
        </div>
      </div>
    </div>
  );
}