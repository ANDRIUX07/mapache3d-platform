import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import { AuthShell } from "@/components/auth/AuthShell";

export default function EmailConfirmedPage() {
  return (
    <AuthShell
      title="Correo confirmado"
      subtitle="Tu cuenta de Mapache 3D GT ya está activa."
    >
      <div className="space-y-5">
        <div className="flex flex-col items-center rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-5 py-7 text-center">
          <CheckCircle2 className="mb-4 h-12 w-12 text-emerald-300" />

          <p className="text-base font-semibold text-white">
            Confirmación completada
          </p>

          <p className="mt-2 text-sm leading-6 text-white/60">
            Ya puedes iniciar sesión y comenzar a guardar favoritos,
            administrar tus direcciones y realizar pedidos.
          </p>
        </div>

        <Link
          href="/login"
          className="block w-full rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4 py-3 text-center font-semibold text-white shadow-lg shadow-violet-950/40 transition hover:brightness-110"
        >
          Iniciar sesión
        </Link>

        <Link
          href="/"
          className="block text-center text-sm text-white/50 transition hover:text-white/80"
        >
          Volver a la tienda
        </Link>
      </div>
    </AuthShell>
  );
}
