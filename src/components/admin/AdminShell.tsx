import Link from "next/link";

const navItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/products", label: "Productos" },
  { href: "/admin/orders", label: "Pedidos" },
  { href: "/admin/landing", label: "Landing" },
  { href: "/admin/media", label: "Media" },
  { href: "/admin/customers", label: "Clientes" },
  { href: "/admin/production", label: "Producción" },
  { href: "/admin/inventory", label: "Inventario" },
  { href: "/admin/settings", label: "Configuración" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <aside className="fixed left-0 top-0 h-screen w-72 border-r border-white/10 bg-black/60 p-6">
        <Link href="/admin" className="text-2xl font-black">
          🦝 Mapache 3D
        </Link>

        <nav className="mt-10 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-xl px-4 py-3 text-sm text-white/70 hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <div className="pl-72">
        <header className="sticky top-0 z-10 border-b border-white/10 bg-zinc-950/80 px-8 py-5 backdrop-blur">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/50">Admin Workspace</p>
              <h1 className="text-xl font-bold">Mapache 3D GT</h1>
            </div>

            <div className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/70">
              Roberto Valdez
            </div>
          </div>
        </header>

        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}