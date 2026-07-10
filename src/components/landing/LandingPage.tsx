"use client";

import Image from "next/image";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { LogIn, User } from "lucide-react";

import { CartButton } from "@/features/cart/components/CartButton";

type Props = {
  children: ReactNode;
};

const menuItems = [
  { label: "Productos", href: "/productos", icon: "📦", text: "Descubre accesorios 3D" },
  { label: "Mercado", href: "#mercado", icon: "🛒", text: "Productos populares" },
  { label: "Tendencias", href: "#tendencias", icon: "📈", text: "Lo más nuevo" },
  { label: "Personaliza", href: "#personaliza", icon: "🖨️", text: "A tu medida" },
  { label: "Haz tu pedido", href: "#pedido", icon: "🚚", text: "Toda Guatemala" },
];

export function LandingPage({ children }: Props) {
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowLogo(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_16%_25%,rgba(168,85,247,0.22),transparent_30%),radial-gradient(circle_at_86%_20%,rgba(6,182,212,0.22),transparent_32%),radial-gradient(circle_at_52%_95%,rgba(249,115,22,0.18),transparent_38%)]" />

      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1700px] items-center justify-between px-8 py-4">
          <Link href="/" className="leading-none">
            <div className="text-4xl font-black tracking-tight md:text-5xl">
              <span className="bg-gradient-to-r from-white via-violet-300 to-cyan-300 bg-clip-text text-transparent">
                MAPACHE
              </span>{" "}
              <span className="bg-gradient-to-r from-orange-400 via-fuchsia-400 to-cyan-300 bg-clip-text text-transparent">
                3D
              </span>
            </div>
            <p className="mt-1 text-xs font-bold tracking-[0.45em] text-white/40">
              PRINT • CREATE • DELIVER
            </p>
          </Link>

          <div className="flex items-center gap-3">
            <CartButton />

            <Link
              href="/login"
              className="hidden items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold transition hover:bg-white/10 md:flex"
            >
              <LogIn size={17} />
              Login
            </Link>

            <Link
              href="/register"
              className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-orange-400 to-fuchsia-500 px-5 py-3 text-sm font-black text-black shadow-[0_0_25px_rgba(249,115,22,0.35)] transition hover:scale-105 md:flex"
            >
              <User size={17} />
              Sign in
            </Link>
          </div>
        </div>
      </header>

      <section className="relative z-10 flex min-h-screen flex-col px-4 pb-34 pt-24 md:px-8">
        <div className="mx-auto grid w-full max-w-[1750px] flex-1 items-center gap-4 lg:grid-cols-[160px_1fr_170px] xl:grid-cols-[180px_1fr_190px]">
          <aside className="hidden space-y-8 lg:block">
            <InfoItem icon="⚙️" title="Impresión 3D" text="Alta calidad en cada detalle" />
            <InfoItem icon="🍃" title="Materiales" text="PLA resistente y ecológico" />
            <InfoItem icon="🛡️" title="Calidad" text="Acabados perfectos" />
          </aside>

          <div className="relative flex min-h-[620px] items-center justify-center px-2">
            <div
              className={`absolute w-full max-w-[980px] transition-all duration-1000 xl:max-w-[1100px] 2xl:max-w-[1180px] ${
                showLogo ? "opacity-100 scale-100" : "pointer-events-none opacity-0 scale-95"
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

          <aside className="hidden lg:block">
            <div className="rounded-[2rem] border border-cyan-400/40 bg-cyan-400/10 p-5 text-center shadow-[0_0_30px_rgba(34,211,238,0.25)]">
              <div className="text-5xl">📍</div>
              <h3 className="mt-4 text-xl font-black">En toda Guatemala</h3>
              <p className="mt-2 text-sm text-white/60">
                Envío fijo Q42 a todo el país.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-black/90 px-5 py-4 backdrop-blur-xl">
        <div className="mx-auto grid max-w-[1400px] grid-cols-5 gap-4 text-center">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group rounded-[1.6rem] border border-white/10 bg-black px-3 py-4 shadow-[0_0_25px_rgba(168,85,247,0.16)] transition hover:-translate-y-1 hover:border-fuchsia-400/70 hover:bg-white/5"
            >
              <div className="text-3xl transition group-hover:scale-110">
                {item.icon}
              </div>
              <div className="mt-2 text-sm font-black uppercase text-white">
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
        <h3 className="text-lg font-black uppercase">{title}</h3>
        <p className="mt-1 text-xs text-white/60">{text}</p>
      </div>
    </div>
  );
}