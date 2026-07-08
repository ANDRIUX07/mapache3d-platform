import Link from "next/link";
import { getProducts } from "@/features/products/services/products.service";
import { ProductAdminCard } from "@/features/products/components/ProductAdminCard";

export default async function AdminProductosPage() {
  const products = await getProducts();

  return (
    <div>
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black">Productos</h1>
          <p className="mt-2 text-white/60">
            Administra el catálogo de Mapache 3D.
          </p>
        </div>

        <Link
          href="/admin/productos/nuevo"
          className="rounded-xl bg-violet-600 px-6 py-3 font-bold text-white transition hover:bg-violet-500"
        >
          + Nuevo producto
        </Link>
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm text-white/50">Total</p>
          <h2 className="mt-2 text-3xl font-black">{products.length}</h2>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm text-white/50">Activos</p>
          <h2 className="mt-2 text-3xl font-black">
            {products.filter((p: any) => p.active).length}
          </h2>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm text-white/50">Destacados</p>
          <h2 className="mt-2 text-3xl font-black">
            {products.filter((p: any) => p.featured).length}
          </h2>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm text-white/50">Sin stock</p>
          <h2 className="mt-2 text-3xl font-black">
            {products.filter((p: any) => Number(p.stock) <= 0).length}
          </h2>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
          <p className="text-white/50">No hay productos registrados.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {products.map((product: any) => (
            <ProductAdminCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}