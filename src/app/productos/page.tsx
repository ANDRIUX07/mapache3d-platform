import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  PackageSearch,
  Sparkles,
} from "lucide-react";

import { ProductCatalog } from "@/features/products/components/ProductCatalog";
import {
  getCategories,
  getProducts,
} from "@/features/products/services/products.service";

export default async function ProductosPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  const activeProducts = products.filter(
    (product) => product.active
  );

  return (
    <main className="min-h-screen bg-[#07030d] text-white">
      <header className="border-b border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.16),transparent_35%),radial-gradient(circle_at_top_right,rgba(6,182,212,0.08),transparent_30%)]">
        <div className="mx-auto max-w-[1800px] px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex min-w-0 items-center gap-4">
              <Link
                href="/"
                aria-label="Volver al inicio"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/60 transition hover:border-violet-400/40 hover:bg-violet-500/10 hover:text-violet-300"
              >
                <ArrowLeft size={19} />
              </Link>

              <div className="flex min-w-0 items-center gap-5">
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-3xl bg-violet-500/[0.06] shadow-[0_0_35px_rgba(139,92,246,0.20)]">
                  <Image
                    src="/images/logo-mapache3d.png"
                    alt="Logo Mapache 3D GT"
                    fill
                    priority
                    sizes="96px"
                    className="object-contain"
                  />
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-xs font-black uppercase tracking-[0.24em] text-violet-300">
                      Mapache 3D GT
                    </p>

                    <Sparkles
                      size={14}
                      className="text-cyan-300"
                    />
                  </div>

                  <h1 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">
                    Catálogo de productos
                  </h1>

                  <p className="mt-1 max-w-2xl text-sm leading-6 text-white/50">
                    Impresiones 3D en PLA
                    <span className="mx-2 text-violet-400/60">•</span>
                    Llaveros
                    <span className="mx-2 text-violet-400/60">•</span>
                    Imanes
                    <span className="mx-2 text-violet-400/60">•</span>
                    Separadores
                    <span className="mx-2 text-violet-400/60">•</span>
                    Figuras y accesorios
                  </p>
                </div>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-3 rounded-xl border border-violet-400/20 bg-violet-400/10 px-4 py-3">
              <PackageSearch
                size={19}
                className="text-violet-300"
              />

              <span className="text-sm font-bold text-white/75">
                {activeProducts.length} producto
                {activeProducts.length === 1 ? "" : "s"}{" "}
                disponible
                {activeProducts.length === 1 ? "" : "s"}
              </span>
            </div>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-[1800px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <ProductCatalog
          products={activeProducts}
          categories={categories}
        />
      </section>
    </main>
  );
}