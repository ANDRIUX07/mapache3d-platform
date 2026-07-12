"use client";

import Image from "next/image";
import Link from "next/link";
import { type ReactNode, useEffect, useState } from "react";
import {
  LogIn,
  UserPlus,
  CircleUserRound,
} from "lucide-react";

import { CartButton } from "@/features/cart/components/CartButton";

type CurrentUser = {
  username: string | null;
  firstName: string | null;
  email: string | null;
};

type Props = {
  children: ReactNode;
  currentUser: CurrentUser | null;
};

const menuItems = [
  {
    label: "Productos",
    href: "/productos",
    icon: "📦",
    text: "Descubre accesorios 3D",
  },
  {
    label: "Mercado",
    href: "#mercado",
    icon: "🛒",
    text: "Productos populares",
  },
  {
    label: "Tendencias",
    href: "#tendencias",
    icon: "📈",
    text: "Lo más nuevo",
  },
  {
    label: "Personaliza",
    href: "#personaliza",
    icon: "🖨️",
    text: "A tu medida",
  },
  {
    label: "Haz tu pedido",
    href: "#pedido",
    icon: "🚚",
    text: "Toda Guatemala",
  },
];

export function LandingPage({
  children,
  currentUser,
}: Props) {
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const displayName =
    currentUser?.username ||
    currentUser?.firstName ||
    currentUser?.email?.split("@")[0] ||
    "Usuario";

  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">
      {/* Fondo */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_16%_25%,rgba(168,85,247,0.22),transparent_30%),radial-gradient(circle_at_86%_20%,rgba(6,182,212,0.22),transparent_32%),radial-gradient(circle_at_52%_95%,rgba(249,115,22,0.18),transparent_38%)]" />

      {/* Header */}
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1700px] items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="shrink-0 leading-none">
            <div className="text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
              <span className="bg-gradient-to-r from-white via-violet-300 to-cyan-300 bg-clip-text text-transparent">
                MAPACHE
              </span>{" "}
              <span className="bg-gradient-to-r from-orange-400 via-fuchsia-400 to-cyan-300 bg-clip-text text-transparent">
                3D
              </span>
            </div>

            <p className="mt-1 hidden text-xs font-bold tracking-[0.45em] text-white/40 sm:block">
              PRINT • CREATE • DELIVER
            </p>
          </Link>

          {/* Acciones */}
          <div className="flex items-center gap-2 sm:gap-3">
            {currentUser ? (
              <Link
                href="/account"
                className="hidden items-center gap-3 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-2.5 transition hover:border-violet-400/60 hover:bg-violet-500/20 md:flex"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white">
                  <CircleUserRound size={20} />
                </span>

                <span className="max-w-40 text-left">
                  <span className="block text-xs text-white/50">
                    Hola
                  </span>

                  <span className="block truncate text-sm font-black text-white">
                    {displayName}
                  </span>
                </span>
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="hidden items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-3 text-sm font-bold text-white transition hover:border-violet-400/60 hover:bg-violet-500/10 md:flex"
                >
                  <LogIn size={17} />
                  Iniciar sesión
                </Link>

                <Link
                  href="/register"
                  className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-orange-400 to-fuchsia-500 px-4 py-3 text-sm font-black text-black shadow-[0_0_25px_rgba(249,115,22,0.35)] transition hover:scale-105 md:flex"
                >
                  <UserPlus size={17} />
                  Crear cuenta
                </Link>
              </>
            )}

            <CartButton />
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <section className="relative z-10 flex min-h-screen flex-col px-4 pb-34 pt-24 md:px-8">
        <div className="mx-auto grid w-full max-w-[1750px] flex-1 items-center gap-4 lg:grid-cols-[160px_1fr_170px] xl:grid-cols-[180px_1fr_190px]">
          {/* Información lateral izquierda */}
          <aside className="hidden space-y-8 lg:block">
            <InfoItem
              icon="⚙️"
              title="Impresión 3D"
              text="Alta calidad en cada detalle"
            />

            <InfoItem
              icon="🍃"
              title="Materiales"
              text="PLA resistente y ecológico"
            />

            <InfoItem
              icon="🛡️"
              title="Calidad"
              text="Acabados perfectos"
            />
          </aside>

          {/* Logo animado y contenido */}
          <div className="relative flex min-h-[620px] items-center justify-center px-2">
            <div
              className={`absolute w-full max-w-[980px] transition-all duration-1000 xl:max-w-[1100px] 2xl:max-w-[1180px] ${
                showLogo
                  ? "scale-100 opacity-100"
                  : "pointer-events-none scale-95 opacity-0"
              }`}
            >
              <Image
                src="/images/logo-mapache3d.png"
                alt="Mapache 3D"
                width={1400}
                height={900}
                className="mx-auto h-auto max-h-[66vh] w-full object-contain"
                priority
              />
            </div>

            <div
              className={`w-full transition-all duration-1000 ${
                showLogo
                  ? "pointer-events-none translate-y-8 opacity-0"
                  : "translate-y-0 opacity-100"
              }`}
            >
              {children}
            </div>
          </div>

          {/* Información lateral derecha */}
          <aside className="hidden lg:block">
            <div className="rounded-[2rem] border border-cyan-400/40 bg-cyan-400/10 p-5 text-center shadow-[0_0_30px_rgba(34,211,238,0.25)]">
              <div className="text-5xl">📍</div>

              <h3 className="mt-4 text-xl font-black">
                En toda Guatemala
              </h3>

              <p className="mt-2 text-sm text-white/60">
                Envío fijo Q42 a todo el país.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* Navegación inferior */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-black/90 px-3 py-3 backdrop-blur-xl sm:px-5 sm:py-4">
        <div className="mx-auto grid max-w-[1400px] grid-cols-5 gap-2 text-center sm:gap-4">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group rounded-[1.2rem] border border-white/10 bg-black px-2 py-3 shadow-[0_0_25px_rgba(168,85,247,0.16)] transition hover:-translate-y-1 hover:border-fuchsia-400/70 hover:bg-white/5 sm:rounded-[1.6rem] sm:px-3 sm:py-4"
            >
              <div className="text-2xl transition group-hover:scale-110 sm:text-3xl">
                {item.icon}
              </div>

              <div className="mt-2 text-[10px] font-black uppercase text-white sm:text-sm">
                {item.label}
              </div>

              <p className="mt-1 hidden text-xs text-white/50 md:block">
                {item.text}
              </p>
            </Link>
          ))}
        </div>
      </nav>
    </main>
  );
}

function InfoItem({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <div className="flex items-center gap-3 border-b border-white/10 pb-5">
      <div className="text-4xl">{icon}</div>

      <div>
        <h3 className="text-lg font-black uppercase">
          {title}
        </h3>

        <p className="mt-1 text-xs text-white/60">
          {text}
        </p>
      </div>
    </div>
  );
}