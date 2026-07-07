import { AuthShell } from "@/components/auth/AuthShell";
import { loginAction } from "@/features/auth/actions/login-action";

export default function LoginPage({
  searchParams,
}: {
  searchParams?: { error?: string };
}) {
  const error = searchParams?.error;

  return (
    <AuthShell
      title="Bienvenido de nuevo"
      subtitle="Ingresa al panel de administración de Mapache 3D GT."
    >
      {error && (
        <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error === "missing_fields"
            ? "Ingresa tu correo y contraseña."
            : "Correo o contraseña incorrectos."}
        </div>
      )}

      <form action={loginAction} className="space-y-4">
        <input
          name="email"
          type="email"
          placeholder="Correo electrónico"
          className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none"
        />

        <input
          name="password"
          type="password"
          placeholder="Contraseña"
          className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none"
        />

        <button
          type="submit"
          className="w-full rounded-xl bg-orange-500 px-4 py-3 font-semibold text-black"
        >
          Iniciar sesión
        </button>
      </form>
    </AuthShell>
  );
}