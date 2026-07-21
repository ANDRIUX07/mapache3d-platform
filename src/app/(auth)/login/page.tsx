import Link from "next/link";

import { AuthShell } from "@/components/auth/AuthShell";
import { loginAction } from "@/features/auth/actions/login-action";

type LoginPageProps = {
  searchParams?: Promise<{
    error?: string;
    redirectTo?: string;
  }>;
};

export default async function LoginPage({
  searchParams,
}: LoginPageProps) {
  const params = await searchParams;

  const error = params?.error;

  /*
   * Página a la que regresaremos después del login.
   * Si no viene especificada usamos /account.
   */
  const redirectTo =
    params?.redirectTo && params.redirectTo.startsWith("/")
      ? params.redirectTo
      : "/account";

  function getErrorMessage() {
    switch (error) {
      case "missing_fields":
        return "Ingresa tu correo y contraseña.";

      case "profile_error":
        return "No fue posible cargar tu perfil. Intenta nuevamente.";

      case "invalid_credentials":
        return "Correo o contraseña incorrectos.";

      default:
        return null;
    }
  }

  const errorMessage = getErrorMessage();

  return (
    <AuthShell
      title="Bienvenido de nuevo"
      subtitle="Ingresa a tu cuenta de Mapache 3D GT."
    >
      {errorMessage ? (
        <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {errorMessage}
        </div>
      ) : null}

      <form action={loginAction} className="space-y-4">
        {/* Mantiene la página de destino */}
        <input
          type="hidden"
          name="redirectTo"
          value={redirectTo}
        />

        <label className="block space-y-2">
          <span className="text-sm text-white/70">
            Correo electrónico
          </span>

          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="correo@ejemplo.com"
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-violet-400/60 focus:ring-2 focus:ring-violet-500/20"
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm text-white/70">
            Contraseña
          </span>

          <input
            name="password"
            type="password"
            autoComplete="current-password"
            required
            placeholder="Tu contraseña"
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-violet-400/60 focus:ring-2 focus:ring-violet-500/20"
          />
        </label>

        <div className="flex justify-end">
          <Link
            href="/forgot-password"
            className="text-sm font-medium text-violet-300 transition hover:text-violet-200"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4 py-3 font-semibold text-white shadow-lg shadow-violet-950/40 transition hover:brightness-110"
        >
          Iniciar sesión
        </button>

        <p className="text-center text-sm text-white/50">
          ¿Aún no tienes cuenta?{" "}
          <Link
            href={`/register?redirectTo=${encodeURIComponent(
              redirectTo
            )}`}
            className="font-medium text-violet-300 transition hover:text-violet-200"
          >
            Crear cuenta
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}