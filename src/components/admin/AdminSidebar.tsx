import Link from "next/link";
import {
  ArrowLeft,
  BarChart3,
  Boxes,
  ClipboardList,
  FolderTree,
  Gauge,
  Package,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react";

const adminLinks = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: Gauge,
  },
  {
    href: "/admin/productos",
    label: "Productos",
    icon: Package,
  },
  {
    href: "/admin/pedidos",
    label: "Pedidos",
    icon: ShoppingCart,
  },
  {
    href: "/admin/categorias",
    label: "Categorías",
    icon: FolderTree,
  },
  {
    href: "/admin/clientes",
    label: "Clientes",
    icon: Users,
  },
  {
    href: "/admin/produccion",
    label: "Producción",
    icon: Boxes,
  },
  {
    href: "/admin/reportes",
    label: "Reportes",
    icon: BarChart3,
  },
  {
    href: "/admin/configuracion",
    label: "Configuración",
    icon: Settings,
  },
];

export function AdminSidebar() {
  return (
    <aside className="flex min-h-screen w-full flex-col border-r border-white/10 bg-black/30 p-6 lg:w-72">
      <div className="rounded-2xl border border-violet-500/20 bg-violet-500/10 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/20 text-2xl">
            🦝
          </div>

          <div>
            <h2 className="text-xl font-black text-violet-200">
              Mapache 3D
            </h2>

            <p className="mt-0.5 text-xs text-white/45">
              Centro de operaciones
            </p>
          </div>
        </div>
      </div>

      <Link
        href="/"
        className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-violet-400/30 bg-violet-500/10 px-4 py-3 text-sm font-bold text-violet-200 transition hover:border-violet-400/60 hover:bg-violet-500/20 hover:text-white"
      >
        <ArrowLeft size={18} />
        Volver a la tienda
      </Link>

      <nav className="mt-6 space-y-2">
        {adminLinks.map((link) => {
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              className="group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-white/65 transition hover:bg-violet-500/15 hover:text-white"
            >
              <Icon
                size={19}
                className="text-white/45 transition group-hover:text-violet-300"
              />

              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.025] p-4">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/35">
          Estado del sistema
        </p>

        <div className="mt-3 flex items-center gap-2 text-sm text-emerald-300">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          Operativo
        </div>
      </div>
    </aside>
  );
}