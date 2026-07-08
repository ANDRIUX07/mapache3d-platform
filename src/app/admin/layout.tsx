import Link from "next/link";

const adminLinks = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/productos", label: "Productos" },
  { href: "/admin/pedidos", label: "Pedidos" },
  { href: "/admin/categorias", label: "Categorías" },
  { href: "/admin/clientes", label: "Clientes" },
  { href: "/admin/produccion", label: "Producción" },
  { href: "/admin/reportes", label: "Reportes" },
  { href: "/admin/configuracion", label: "Configuración" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#090014] text-white">
      <div className="grid min-h-screen md:grid-cols-[260px_1fr]">
        <aside className="border-r border-white/10 bg-black/30 p-6">
          <h2 className="text-2xl font-black text-violet-300">
            Mapache 3D
          </h2>

          <nav className="mt-8 space-y-2">
            {adminLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-xl px-4 py-3 text-white/70 transition hover:bg-violet-500/20 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </aside>

        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}