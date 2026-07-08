import Link from "next/link";

const adminLinks = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/productos", label: "Productos", icon: "📦" },
  { href: "/admin/pedidos", label: "Pedidos", icon: "🛒" },
  { href: "/admin/categorias", label: "Categorías", icon: "🏷️" },
  { href: "/admin/clientes", label: "Clientes", icon: "👥" },
  { href: "/admin/produccion", label: "Producción", icon: "🖨️" },
  { href: "/admin/reportes", label: "Reportes", icon: "📈" },
  { href: "/admin/configuracion", label: "Configuración", icon: "⚙️" },
];

export function AdminSidebar() {
  return (
    <aside className="border-r border-white/10 bg-black/30 p-6">
      <h2 className="text-2xl font-black text-violet-300">
        Mapache 3D
      </h2>

      <p className="mt-1 text-sm text-white/40">
        Admin Panel
      </p>

      <nav className="mt-8 space-y-2">
        {adminLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-white/70 transition hover:bg-violet-500/20 hover:text-white"
          >
            <span>{link.icon}</span>
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}