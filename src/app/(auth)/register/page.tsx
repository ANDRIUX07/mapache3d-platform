"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

import { AuthShell } from "@/components/auth/AuthShell";
import { supabase } from "@/lib/supabase/client";

export default function RegisterPage() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    const normalizedFirstName = firstName.trim();
    const normalizedLastName = lastName.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (normalizedFirstName.length < 2) {
      setErrorMessage("Ingresa un nombre válido.");
      return;
    }

    if (normalizedLastName.length < 2) {
      setErrorMessage("Ingresa un apellido válido.");
      return;
    }

    if (!normalizedEmail) {
      setErrorMessage("Ingresa tu correo electrónico.");
      return;
    }

    if (password.length < 8) {
      setErrorMessage(
        "La contraseña debe tener al menos 8 caracteres."
      );
      return;
    }

    if (password !== passwordConfirmation) {
      setErrorMessage("Las contraseñas no coinciden.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: normalizedEmail,
        password,
        options: {
          data: {
            first_name: normalizedFirstName,
            last_name: normalizedLastName,
          },
          emailRedirectTo: `${window.location.origin}/auth/confirmed`,
        },
      });

      if (error) {
        throw error;
      }

      if (data.session) {
        router.push("/");
        router.refresh();
        return;
      }

      setSuccessMessage(
        "Cuenta creada. Revisa tu correo electrónico para confirmar tu registro."
      );

      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setPasswordConfirmation("");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "No fue posible crear la cuenta.";

      if (
        message.toLowerCase().includes("already registered") ||
        message.toLowerCase().includes("already been registered")
      ) {
        setErrorMessage(
          "Ya existe una cuenta registrada con este correo."
        );
      } else {
        setErrorMessage(message);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthShell
      title="Crear cuenta"
      subtitle="Regístrate para comprar, guardar favoritos y administrar tus pedidos."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm text-white/70">Nombre</span>

            <input
              name="firstName"
              type="text"
              autoComplete="given-name"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              placeholder="Roberto"
              disabled={isSubmitting}
              className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-violet-400/60 focus:ring-2 focus:ring-violet-500/20 disabled:cursor-not-allowed disabled:opacity-60"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm text-white/70">Apellido</span>

            <input
              name="lastName"
              type="text"
              autoComplete="family-name"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              placeholder="Valdez"
              disabled={isSubmitting}
              className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-violet-400/60 focus:ring-2 focus:ring-violet-500/20 disabled:cursor-not-allowed disabled:opacity-60"
            />
          </label>
        </div>

        <label className="block space-y-2">
          <span className="text-sm text-white/70">
            Correo electrónico
          </span>

          <input
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="correo@ejemplo.com"
            disabled={isSubmitting}
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-violet-400/60 focus:ring-2 focus:ring-violet-500/20 disabled:cursor-not-allowed disabled:opacity-60"
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm text-white/70">Contraseña</span>

          <input
            name="password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Mínimo 8 caracteres"
            disabled={isSubmitting}
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-violet-400/60 focus:ring-2 focus:ring-violet-500/20 disabled:cursor-not-allowed disabled:opacity-60"
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm text-white/70">
            Confirmar contraseña
          </span>

          <input
            name="passwordConfirmation"
            type="password"
            autoComplete="new-password"
            value={passwordConfirmation}
            onChange={(event) =>
              setPasswordConfirmation(event.target.value)
            }
            placeholder="Repite tu contraseña"
            disabled={isSubmitting}
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-violet-400/60 focus:ring-2 focus:ring-violet-500/20 disabled:cursor-not-allowed disabled:opacity-60"
          />
        </label>

        {errorMessage ? (
          <div
            role="alert"
            className="rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200"
          >
            {errorMessage}
          </div>
        ) : null}

        {successMessage ? (
          <div
            role="status"
            className="rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200"
          >
            {successMessage}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4 py-3 font-semibold text-white shadow-lg shadow-violet-950/40 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Creando cuenta..." : "Crear cuenta"}
        </button>

        <p className="text-center text-sm text-white/50">
          ¿Ya tienes una cuenta?{" "}
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="font-medium text-violet-300 transition hover:text-violet-200"
          >
            Inicia sesión
          </button>
        </p>
      </form>
    </AuthShell>
  );
}
