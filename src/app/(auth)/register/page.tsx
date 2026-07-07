import { AuthShell } from "@/components/auth/AuthShell";

export default function RegisterPage() {
  return (
    <AuthShell
      title="Crear cuenta"
      subtitle="Registro temporal para Mapache 3D GT."
    >
      <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/60">
        El registro público estará disponible más adelante.
      </div>
    </AuthShell>
  );
}