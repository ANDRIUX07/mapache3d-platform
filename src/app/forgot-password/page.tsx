"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

import { AuthShell } from "@/components/auth/AuthShell";
import { supabase } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const normalizedEmail = email.trim().toLowerCase();

      if (!normalizedEmail) {
        setErrorMessage(
          "Ingresa tu correo electrónico."
        );
        return;
      }

      const callbackUrl = new URL(
        "/auth/callback",
        window.location.origin
      );

      callbackUrl.searchParams.set(
        "next",
        "/reset-password"
      );

      const { error } =
        await supabase.auth.resetPasswordForEmail(
          normalizedEmail,
          {
            redirectTo: callbackUrl.toString(),
          }
        );

      if (error) {
        console.error(
          "Supabase password reset error:",
          error
        );

        setErrorMessage(
          "No fue posible enviar el enlace de recuperación. Verifica el correo e intenta nuevamente."
        );

        return;
      }

      setSuccessMessage(
        "Si existe una cuenta asociada a ese correo, recibirás un enlace para restablecer tu contraseña."
      );

      setEmail("");
    } catch (error) {
      console.error(
        "Unexpected password reset error:",
        error
      );

      setErrorMessage(
        "Ocurrió un error inesperado. Intenta nuevamente."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title="Recuperar contraseña"
      subtitle="Ingresa el correo electrónico con el que creaste tu cuenta."
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <label className="block space-y-2">
          <span className="text-sm text-white/70">
            Correo electrónico
          </span>

          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            placeholder="correo@ejemplo.com"
            disabled={loading}
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-violet-400/60 focus:ring-2 focus:ring-violet-500/20 disabled:cursor-not-allowed disabled:opacity-60"
          />
        </label>

        {successMessage && (
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
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
          className="w-full rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4 py-3 font-semibold text-white shadow-lg shadow-violet-950/40 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Enviando enlace..."
            : "Enviar enlace de recuperación"}
        </button>

        <div className="text-center">
          <Link
            href="/login"
            className="text-sm font-medium text-violet-300 transition hover:text-violet-200"
          >
            ← Volver al inicio de sesión
          </Link>
        </div>
      </form>
    </AuthShell>
  );
}