"use client";

import Link from "next/link";
import {
  useEffect,
  useState,
  type FormEvent,
} from "react";
import { useRouter } from "next/navigation";

import { AuthShell } from "@/components/auth/AuthShell";
import { supabase } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [checkingSession, setCheckingSession] =
    useState(true);
  const [hasRecoverySession, setHasRecoverySession] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] =
    useState("");
  const [errorMessage, setErrorMessage] =
    useState("");

  useEffect(() => {
    let isMounted = true;

    async function initializeRecoverySession() {
      try {
        const currentUrl = new URL(
          window.location.href
        );

        const code =
          currentUrl.searchParams.get("code");

        const urlError =
          currentUrl.searchParams.get("error");

        const errorDescription =
          currentUrl.searchParams.get(
            "error_description"
          );

        if (urlError || errorDescription) {
          if (!isMounted) {
            return;
          }

          setErrorMessage(
            errorDescription
              ? decodeURIComponent(
                  errorDescription.replace(/\+/g, " ")
                )
              : "El enlace de recuperación no es válido o ha expirado."
          );

          setHasRecoverySession(false);
          return;
        }

        /*
         * Supabase puede regresar un código PKCE en la URL.
         * Ese código debe intercambiarse por una sesión antes
         * de llamar a updateUser().
         */
        if (code) {
          const { error: exchangeError } =
            await supabase.auth.exchangeCodeForSession(
              code
            );

          if (exchangeError) {
            console.error(
              "Supabase recovery code exchange error:",
              exchangeError
            );

            if (!isMounted) {
              return;
            }

            setErrorMessage(
              "No fue posible validar el enlace de recuperación. Puede haber expirado o ya fue utilizado."
            );

            setHasRecoverySession(false);
            return;
          }

          /*
           * El código PKCE solo puede utilizarse una vez.
           * Lo retiramos de la dirección para que una recarga
           * no intente intercambiarlo nuevamente.
           */
          window.history.replaceState(
            {},
            document.title,
            "/reset-password"
          );
        }

        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (!isMounted) {
          return;
        }

        if (sessionError) {
          console.error(
            "Supabase recovery session error:",
            sessionError
          );

          setErrorMessage(
            "No fue posible validar la sesión de recuperación."
          );

          setHasRecoverySession(false);
          return;
        }

        if (!session) {
          setErrorMessage(
            "El enlace de recuperación no es válido, ya fue utilizado o ha expirado. Solicita un enlace nuevo."
          );

          setHasRecoverySession(false);
          return;
        }

        setHasRecoverySession(true);
        setErrorMessage("");
      } catch (error) {
        console.error(
          "Unexpected recovery initialization error:",
          error
        );

        if (!isMounted) {
          return;
        }

        setErrorMessage(
          "Ocurrió un error al validar el enlace de recuperación."
        );

        setHasRecoverySession(false);
      } finally {
        if (isMounted) {
          setCheckingSession(false);
        }
      }
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!isMounted) {
          return;
        }

        if (
          event === "PASSWORD_RECOVERY" &&
          session
        ) {
          setHasRecoverySession(true);
          setErrorMessage("");
          setCheckingSession(false);
        }
      }
    );

    void initializeRecoverySession();

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    if (!hasRecoverySession) {
      setErrorMessage(
        "No existe una sesión válida de recuperación. Solicita un enlace nuevo."
      );
      return;
    }

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
      const { error } =
        await supabase.auth.updateUser({
          password,
        });

      if (error) {
        console.error(
          "Supabase password update error:",
          error
        );

        const normalizedError =
          error.message.toLowerCase();

        if (
          normalizedError.includes(
            "auth session missing"
          )
        ) {
          setHasRecoverySession(false);

          setErrorMessage(
            "La sesión de recuperación no existe o expiró. Solicita un enlace nuevo."
          );

          return;
        }

        if (
          normalizedError.includes(
            "new password should be different"
          )
        ) {
          setErrorMessage(
            "La nueva contraseña debe ser diferente a la contraseña anterior."
          );

          return;
        }

        setErrorMessage(error.message);
        return;
      }

      setPassword("");
      setConfirmPassword("");

      setSuccessMessage(
        "Tu contraseña se actualizó correctamente. Serás redirigido al inicio de sesión."
      );

      /*
       * Cerramos la sesión temporal creada por el enlace
       * de recuperación.
       */
      await supabase.auth.signOut();

      window.setTimeout(() => {
        router.replace(
          "/login?password_updated=true"
        );
        router.refresh();
      }, 2500);
    } catch (error) {
      console.error(
        "Unexpected password update error:",
        error
      );

      setErrorMessage(
        "Ocurrió un error inesperado al actualizar la contraseña."
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
      {checkingSession ? (
        <div className="rounded-xl border border-violet-500/30 bg-violet-500/10 px-4 py-4 text-sm text-violet-100">
          Validando enlace de recuperación...
        </div>
      ) : (
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
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder="********"
              disabled={
                loading || !hasRecoverySession
              }
              className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-violet-400/60 focus:ring-2 focus:ring-violet-500/20 disabled:cursor-not-allowed disabled:opacity-60"
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
              onChange={(event) =>
                setConfirmPassword(
                  event.target.value
                )
              }
              placeholder="********"
              disabled={
                loading || !hasRecoverySession
              }
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

          {hasRecoverySession ? (
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4 py-3 font-semibold text-white shadow-lg shadow-violet-950/40 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Actualizando..."
                : "Guardar nueva contraseña"}
            </button>
          ) : (
            <Link
              href="/forgot-password"
              className="block w-full rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4 py-3 text-center font-semibold text-white shadow-lg shadow-violet-950/40 transition hover:brightness-110"
            >
              Solicitar un enlace nuevo
            </Link>
          )}

          <div className="text-center">
            <Link
              href="/login"
              className="text-sm font-medium text-violet-300 transition hover:text-violet-200"
            >
              Volver al inicio de sesión
            </Link>
          </div>
        </form>
      )}
    </AuthShell>
  );
}