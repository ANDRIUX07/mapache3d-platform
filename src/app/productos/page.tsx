import Link from "next/link";
import { ArrowLeft, PackageSearch } from "lucide-react";

import { ProductCard } from "@/features/products/components/ProductCard";
import { getProducts } from "@/features/products/services/products.service";

export default async function ProductosPage() {
  const products = await getProducts();

  const activeProducts = products.filter(
    (product) => product.active
  );

  return (
    <main className="min-h-screen bg-[#07030d] text-white">
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.20),transparent_35%),radial-gradient(circle_at_top_right,rgba(6,182,212,0.12),transparent_30%)]">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-bold text-white/55 transition hover:text-violet-300"
          >
            <ArrowLeft size={17} />
            Volver al inicio
          </Link>

          <div className="mt-8 max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.3em] text-violet-300">
              Catálogo Mapache 3D
            </p>

            <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              Productos impresos en 3D
            </h1>

            <p className="mt-5 text-base leading-7 text-white/60 sm:text-lg">
              Explora llaveros, imanes, separadores, figuras y accesorios
              fabricados en PLA. Agrega tus favoritos al carrito y continúa
              tu pedido por WhatsApp.
            </p>
          </div>

          <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-violet-400/20 bg-violet-400/10 px-4 py-3">
            <PackageSearch size={20} className="text-violet-300" />

            <span className="text-sm font-bold text-white/75">
              {activeProducts.length} producto
              {activeProducts.length === 1 ? "" : "s"} disponible
              {activeProducts.length === 1 ? "" : "s"}
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        {!activeProducts.length ? (
          <div className="rounded-[2rem] border border-dashed border-white/15 bg-white/[0.02] px-6 py-20 text-center">
            <PackageSearch
              size={46}
              className="mx-auto text-violet-300/60"
            />

            <h2 className="mt-5 text-2xl font-black">
              Aún no hay productos disponibles
            </h2>

            <p className="mx-auto mt-3 max-w-lg text-white/50">
              Estamos preparando nuevos productos impresos en 3D.
              Regresa pronto para descubrir el catálogo.
            </p>
          </div>
        ) : (
          <div className="grid gap-7 sm:grid-cols-2 xl:grid-cols-3">
            {activeProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}