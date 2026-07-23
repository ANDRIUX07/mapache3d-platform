import type { User } from "@supabase/supabase-js";

import {
  createSupabaseServerClient,
} from "@/lib/supabase/server";

export async function getCurrentUser(): Promise<User | null> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    const isMissingSession =
      error.name === "AuthSessionMissingError" ||
      error.message === "Auth session missing!";

    if (isMissingSession) {
      return null;
    }

    console.error(
      "Error obteniendo el usuario actual:",
      error.message
    );

    return null;
  }

  return user;
}