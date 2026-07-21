"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

import { AuthShell } from "@/components/auth/AuthShell";
import { supabase } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    if (password.length < 8) {
      setErrorMessage(
        "La contraseña debe tener al menos 8 caracteres."
      );
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage(
        "Las contraseñas no coinciden."
      );
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        setErrorMessage(error.message);
        return;
      }

      setSuccessMessage(
        "Tu contraseña se actualizó correctamente. Serás redirigido al inicio de sesión."
      );

      setTimeout(() => {
        router.push("/login");
      }, 2500);
    } catch {
      setErrorMessage(
        "Ocurrió un error inesperado."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title="Nueva contraseña"
      subtitle="Ingresa una nueva contraseña para tu cuenta."
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <label className="block space-y-2">
          <span className="text-sm text-white/70">
            Nueva contraseña
          </span>

          <input
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            placeholder="********"
            disabled={loading}
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-violet-400/60 focus:ring-2 focus:ring-violet-500/20 disabled:opacity-60"
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm text-white/70">
            Confirmar contraseña
          </span>

          <input
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
            placeholder="********"
            disabled={loading}
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-violet-400/60 focus:ring-2 focus:ring-violet-500/20 disabled:opacity-60"
          />
        </label>

        {successMessage && (
          <div className="rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-200">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {errorMessage}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4 py-3 font-semibold text-white shadow-lg shadow-violet-950/40 transition hover:brightness-110 disabled:opacity-50"
        >
          {loading
            ? "Actualizando..."
            : "Guardar nueva contraseña"}
        </button>

        <div className="text-center">
          <Link
            href="/login"
            className="text-sm text-violet-300 hover:text-violet-200"
          >
            Volver al inicio de sesión
          </Link>
        </div>
      </form>
    </AuthShell>
  );
}