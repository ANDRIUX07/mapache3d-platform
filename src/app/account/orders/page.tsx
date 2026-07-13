import Link from "next/link";
import { ArrowLeft, PackageSearch } from "lucide-react";

import { OrdersList } from "@/features/orders/components/OrdersList";

export default function AccountOrdersPage() {
  return (
    <main className="min-h-screen bg-[#050509] px-4 py-10 text-white sm:px-6 lg:px-8">
      <section className="mx-auto w-full max-w-7xl">

        <Link
          href="/account"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-white/50 transition hover:text-violet-300"
        >
          <ArrowLeft size={16} />
          Volver a mi cuenta
        </Link>

        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-sm font-bold text-violet-300">
              <PackageSearch size={16} />
              Seguimiento de pedidos
            </div>

            <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
              Mis pedidos
            </h1>

            <p className="mt-3 max-w-2xl text-white/50">
              Consulta tus compras, revisa su estado y continúa la
              conversación con Mapache 3D cuando lo necesites.
            </p>
          </div>
        </div>

        <OrdersList />

      </section>
    </main>
  );
}