import Link from "next/link";
import {
  Boxes,
  ChartNoAxesCombined,
  ClipboardList,
  FolderTree,
  Gauge,
  Package,
  Settings,
  Users,
  Wrench,
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
    icon: ClipboardList,
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
    icon: Wrench,
  },
  {
    href: "/admin/reportes",
    label: "Reportes",
    icon: ChartNoAxesCombined,
  },
  {
    href: "/admin/configuracion",
    label: "Configuración",
    icon: Settings,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#090014] text-white">
      <div className="grid min-h-screen md:grid-cols-[280px_1fr]">
        <aside className="border-r border-white/10 bg-black/30 p-6">
          <div className="rounded-2xl border border-violet-500/20 bg-violet-500/10 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/20">
                <Boxes className="text-violet-300" size={22} />
              </div>

              <div>
                <h2 className="text-xl font-black text-violet-200">
                  Mapache 3D
                </h2>

                <p className="text-xs text-white/45">
                  Centro de operaciones
                </p>
              </div>
            </div>
          </div>

          <nav className="mt-8 space-y-2">
            {adminLinks.map((link) => {
              const Icon = link.icon;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-white/65 transition hover:bg-violet-500/15 hover:text-white"
                >
                  <Icon size={18} />
                  <span className="font-semibold">
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/35">
              Estado del sistema
            </p>

            <div className="mt-3 flex items-center gap-2 text-sm text-emerald-300">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              Operativo
            </div>
          </div>
        </aside>

        <main className="p-5 sm:p-8 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}