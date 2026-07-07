import { createSupabaseServerClient } from "@/lib/supabase/server";
import { User } from "@supabase/supabase-js";

/**
 * Returns the currently authenticated user.
 * Returns null when there is no active session.
 */
export async function getCurrentUser(): Promise<User | null> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error("getCurrentUser:", error.message);
    return null;
  }

  return user;
}