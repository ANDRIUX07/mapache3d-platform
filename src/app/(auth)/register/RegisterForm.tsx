"use client";

import { useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { AuthShell } from "@/components/auth/AuthShell";
import { supabase } from "@/lib/supabase/client";

function getSafeRedirectPath(value: string | null) {
  const redirectTo = value?.trim() || "";

  if (
    !redirectTo ||
    !redirectTo.startsWith("/") ||
    redirectTo.startsWith("//")
  ) {
    return "/account";
  }

  return redirectTo;
}

function normalizeUsername(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_]/g, "")
    .replace(/_+/g, "_")
    .replace(/^_+|_+$/g, "");
}

export function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectTo = getSafeRedirectPath(
    searchParams.get("redirectTo")
  );

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [
    passwordConfirmation,
    setPasswordConfirmation,
  ] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    const normalizedFirstName = firstName.trim();
    const normalizedLastName = lastName.trim();
    const normalizedUsername = normalizeUsername(username);
    const normalizedEmail = email.trim().toLowerCase();

    if (normalizedFirstName.length < 2) {
      setErrorMessage("Ingresa un nombre válido.");
      return;
    }

    if (normalizedLastName.length < 2) {
      setErrorMessage("Ingresa un apellido válido.");
      return;
    }

    if (normalizedUsername.length < 3) {
      setErrorMessage(
        "El nombre de usuario debe tener al menos 3 caracteres."
      );
      return;
    }

    if (normalizedUsername.length > 24) {
      setErrorMessage(
        "El nombre de usuario no puede tener más de 24 caracteres."
      );
      return;
    }

    if (!/^[a-z0-9_]+$/.test(normalizedUsername)) {
      setErrorMessage(
        "El nombre de usuario solo puede contener letras, números y guion bajo."
      );
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
      const confirmationUrl = new URL(
        "/auth/confirmed",
        window.location.origin
      );

      confirmationUrl.searchParams.set(
        "redirectTo",
        redirectTo
      );

      const { data, error } =
        await supabase.auth.signUp({
          email: normalizedEmail,
          password,
          options: {
            data: {
              first_name: normalizedFirstName,
              last_name: normalizedLastName,
              username: normalizedUsername,
            },
            emailRedirectTo:
              confirmationUrl.toString(),
          },
        });

      if (error) {
        throw error;
      }

      if (data.session) {
        router.replace(redirectTo);
        router.refresh();
        return;
      }

      setSuccessMessage(
        redirectTo === "/checkout"
          ? "Cuenta creada. Revisa tu correo electrónico para confirmar tu registro y continuar con tu compra."
          : "Cuenta creada. Revisa tu correo electrónico para confirmar tu registro."
      );

      setFirstName("");
      setLastName("");
      setUsername("");
      setEmail("");
      setPassword("");
      setPasswordConfirmation("");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "No fue posible crear la cuenta.";

      const normalizedMessage = message.toLowerCase();

      if (
        normalizedMessage.includes("already registered") ||
        normalizedMessage.includes(
          "already been registered"
        ) ||
        normalizedMessage.includes(
          "user already registered"
        )
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

  function handleLogin() {
    const loginUrl = new URLSearchParams();

    if (redirectTo !== "/account") {
      loginUrl.set("redirectTo", redirectTo);
    }

    const queryString = loginUrl.toString();

    router.push(
      queryString
        ? `/login?${queryString}`
        : "/login"
    );
  }

  return (
    <AuthShell
      title="Crear cuenta"
      subtitle={
        redirectTo === "/checkout"
          ? "Regístrate para continuar con tu compra en Mapache 3D GT."
          : "Regístrate para comprar, guardar favoritos y administrar tus pedidos."
      }
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm text-white/70">
              Nombre
            </span>

            <input
              name="firstName"
              type="text"
              autoComplete="given-name"
              value={firstName}
              onChange={(event) =>
                setFirstName(event.target.value)
              }
              placeholder="Roberto"
              required
              disabled={isSubmitting}
              className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-violet-400/60 focus:ring-2 focus:ring-violet-500/20 disabled:cursor-not-allowed disabled:opacity-60"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm text-white/70">
              Apellido
            </span>

            <input
              name="lastName"
              type="text"
              autoComplete="family-name"
              value={lastName}
              onChange={(event) =>
                setLastName(event.target.value)
              }
              placeholder="Valdez"
              required
              disabled={isSubmitting}
              className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-violet-400/60 focus:ring-2 focus:ring-violet-500/20 disabled:cursor-not-allowed disabled:opacity-60"
            />
          </label>
        </div>

        <label className="block space-y-2">
          <span className="text-sm text-white/70">
            Nombre de usuario
          </span>

          <input
            name="username"
            type="text"
            autoComplete="username"
            value={username}
            onChange={(event) =>
              setUsername(event.target.value)
            }
            placeholder="roberto3d"
            required
            minLength={3}
            maxLength={24}
            disabled={isSubmitting}
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-violet-400/60 focus:ring-2 focus:ring-violet-500/20 disabled:cursor-not-allowed disabled:opacity-60"
          />

          <p className="text-xs text-white/40">
            Usa letras, números y guion bajo. Ejemplo:
            roberto_3d
          </p>
        </label>

        <label className="block space-y-2">
          <span className="text-sm text-white/70">
            Correo electrónico
          </span>

          <input
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            placeholder="correo@ejemplo.com"
            required
            disabled={isSubmitting}
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-violet-400/60 focus:ring-2 focus:ring-violet-500/20 disabled:cursor-not-allowed disabled:opacity-60"
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm text-white/70">
            Contraseña
          </span>

          <input
            name="password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            placeholder="Mínimo 8 caracteres"
            required
            minLength={8}
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
              setPasswordConfirmation(
                event.target.value
              )
            }
            placeholder="Repite tu contraseña"
            required
            minLength={8}
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
          {isSubmitting
            ? "Creando cuenta..."
            : "Crear cuenta"}
        </button>

        <p className="text-center text-sm text-white/50">
          ¿Ya tienes una cuenta?{" "}
          <button
            type="button"
            onClick={handleLogin}
            disabled={isSubmitting}
            className="font-medium text-violet-300 transition hover:text-violet-200 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Inicia sesión
          </button>
        </p>
      </form>
    </AuthShell>
  );
}