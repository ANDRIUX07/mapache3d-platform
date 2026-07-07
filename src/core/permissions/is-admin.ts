import { createSupabaseServerClient } from "@/lib/supabase/server";

/**
 * Checks whether the currently authenticated user
 * has either the "admin" or "super_admin" role.
 *
 * Returns:
 *  - true  -> User is administrator
 *  - false -> User is not administrator or no session exists
 */
export async function isAdmin(): Promise<boolean> {
  try {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase.rpc("is_admin");

    if (error) {
      console.error("isAdmin:", error.message);
      return false;
    }

    return data === true;
  } catch (err) {
    console.error("isAdmin:", err);
    return false;
  }
}