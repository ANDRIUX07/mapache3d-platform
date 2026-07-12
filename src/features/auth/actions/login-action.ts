"use server";

import { redirect } from "next/navigation";

import { createSupabaseServerClient } from "@/lib/supabase/server";

function getSafeRedirectPath(value: FormDataEntryValue | null) {
  const redirectTo = String(value || "").trim();

  /*
   * Solo permitimos rutas internas.
   * Esto evita redirecciones hacia sitios externos.
   */
  if (
    !redirectTo ||
    !redirectTo.startsWith("/") ||
    redirectTo.startsWith("//")
  ) {
    return "/account";
  }

  return redirectTo;
}

function buildLoginErrorUrl(
  error: string,
  redirectTo: string
) {
  const searchParams = new URLSearchParams();

  searchParams.set("error", error);

  if (redirectTo !== "/account") {
    searchParams.set("redirectTo", redirectTo);
  }

  return `/login?${searchParams.toString()}`;
}

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") || "")
    .trim()
    .toLowerCase();

  const password = String(
    formData.get("password") || ""
  );

  const redirectTo = getSafeRedirectPath(
    formData.get("redirectTo")
  );

  if (!email || !password) {
    redirect(
      buildLoginErrorUrl(
        "missing_fields",
        redirectTo
      )
    );
  }

  const supabase =
    await createSupabaseServerClient();

  const {
    data: { user },
    error: signInError,
  } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (signInError || !user) {
    redirect(
      buildLoginErrorUrl(
        "invalid_credentials",
        redirectTo
      )
    );
  }

  const { data: profile, error: profileError } =
    await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle();

  if (profileError) {
    await supabase.auth.signOut();

    redirect(
      buildLoginErrorUrl(
        "profile_error",
        redirectTo
      )
    );
  }

  /*
   * Los administradores continúan entrando
   * directamente al panel administrativo.
   */
  if (profile?.role === "admin") {
    redirect("/admin");
  }

  /*
   * Los clientes regresan a la página que
   * originó el inicio de sesión, por ejemplo:
   * /checkout
   */
  redirect(redirectTo);
}