import Link from "next/link";
import {
  Heart,
  House,
  LogOut,
  MapPin,
  Package,
  Settings,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { logoutAction } from "@/features/auth/actions/logout-action";

type AccountDashboardProps = {
  firstName: string;
  email: string;
  isAdmin: boolean;
};

const accountOptions = [
  {
    title: "Mi perfil",
    description:
      "Actualiza tu información personal y datos de contacto.",
    href: "/account/profile",
    icon: UserRound,
  },
  {
    title: "Mis direcciones",
    description:
      "Administra tus direcciones para entregas.",
    href: "/account/addresses",
    icon: MapPin,
  },
  {
    title: "Mis favoritos",
    description:
      "Consulta los productos que has guardado.",
    href: "/account/favorites",
    icon: Heart,
  },
  {
    title: "Mis pedidos",
    description:
      "Revisa el estado y el historial de tus compras.",
    href: "/account/orders",
    icon: Package,
  },
  {
    title: "Configuración",
    description:
      "Administra las preferencias de tu cuenta.",
    href: "/account/settings",
    icon: Settings,
  },
];

export function AccountDashboard({
  firstName,
  email,
  isAdmin,
}: AccountDashboardProps) {
  return (
    <main className="min-h-screen bg-[#050509] px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-medium uppercase tracking-[0.25em] text-violet-300">
              Cuenta Mapache 3D GT
            </p>

            <h1 className="text-3xl font-bold sm:text-4xl">
              Hola, {firstName} 👋
            </h1>

            <p className="mt-2 text-sm text-white/50">
              {email}
            </p>

            {isAdmin && (
              <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-violet-400/25 bg-violet-500/10 px-3 py-1.5 text-xs font-bold text-violet-200">
                <ShieldCheck className="h-4 w-4" />
                Administrador
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-3">
            {isAdmin && (
              <Link
                href="/admin"
                className="inline-flex items-center gap-2 rounded-xl border border-violet-400/30 bg-violet-500/15 px-4 py-3 text-sm font-bold text-violet-100 transition hover:bg-violet-500/25"
              >
                <ShieldCheck className="h-4 w-4" />
                Panel administrativo
              </Link>
            )}

            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white/80 transition hover:border-violet-400/30 hover:bg-white/10 hover:text-white"
            >
              <House className="h-4 w-4" />
              Volver a la tienda
            </Link>

            <form action={logoutAction}>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-200 transition hover:bg-red-500/20"
              >
                <LogOut className="h-4 w-4" />
                Cerrar sesión
              </button>
            </form>
          </div>
        </header>

        <section className="mb-8 overflow-hidden rounded-3xl border border-violet-400/20 bg-gradient-to-br from-violet-500/20 via-fuchsia-500/10 to-cyan-500/10 p-6 shadow-2xl shadow-violet-950/30 sm:p-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-violet-200">
              {isAdmin
                ? "Centro de operaciones"
                : "Tu espacio personal"}
            </p>

            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
              {isAdmin
                ? "Administra la tienda Mapache 3D"
                : "Administra tus compras y preferencias"}
            </h2>

            <p className="mt-3 leading-7 text-white/60">
              {isAdmin
                ? "Desde aquí puedes acceder al panel administrativo, revisar pedidos, gestionar productos y controlar la operación de la tienda."
                : "Desde aquí podrás guardar productos, gestionar direcciones, revisar tus pedidos y mantener actualizada tu información."}
            </p>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {isAdmin && (
            <Link
              href="/admin/pedidos"
              className="group rounded-2xl border border-violet-400/30 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/10 p-5 transition hover:-translate-y-1 hover:border-violet-300/50 hover:shadow-xl hover:shadow-violet-950/30"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-violet-300/30 bg-violet-500/20 text-violet-100 transition group-hover:bg-violet-500/30">
                <ShieldCheck className="h-5 w-5" />
              </div>

              <h3 className="text-lg font-bold text-violet-100">
                Administrar pedidos
              </h3>

              <p className="mt-2 text-sm leading-6 text-white/60">
                Revisa todos los pedidos, contacta clientes y
                administra sus estados.
              </p>

              <span className="mt-4 inline-flex text-sm font-bold text-violet-200">
                Abrir panel administrativo →
              </span>
            </Link>
          )}

          {accountOptions.map((option) => {
            const Icon = option.icon;

            return (
              <Link
                key={option.href}
                href={option.href}
                className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:-translate-y-1 hover:border-violet-400/30 hover:bg-white/[0.07]"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10 text-violet-200 transition group-hover:bg-violet-500/20">
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="text-lg font-semibold">
                  {option.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-white/50">
                  {option.description}
                </p>
              </Link>
            );
          })}
        </section>
      </div>
    </main>
  );
}