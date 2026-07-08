"use client";

import { useRef } from "react";

type Props = {
  onFilesSelected: (files: FileList) => void;
};

export function ProductImageUploader({
  onFilesSelected,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <h2 className="text-xl font-bold">
        Fotografías
      </h2>

      <p className="mt-2 text-white/50">
        Puedes seleccionar una o varias imágenes.
      </p>

      <div
        onClick={() => inputRef.current?.click()}
        className="mt-6 cursor-pointer rounded-xl border-2 border-dashed border-violet-500/40 p-12 text-center transition hover:border-violet-400"
      >
        <p className="text-lg font-bold">
          📷 Agregar fotografías
        </p>

        <p className="mt-2 text-sm text-white/50">
          Haz clic aquí para seleccionar imágenes
        </p>
      </div>

      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/*"
        hidden
        onChange={(e) => {
          if (e.target.files) {
            onFilesSelected(e.target.files);
          }
        }}
      />
    </section>
  );
}