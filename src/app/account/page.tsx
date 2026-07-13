import { redirect } from "next/navigation";

import { AccountDashboard } from "@/features/account/components/AccountDashboard";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function AccountPage() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/login?redirectedFrom=/account");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("first_name, email, role")
    .eq("id", user.id)
    .maybeSingle();

  const firstName =
    profile?.first_name?.trim() ||
    user.user_metadata?.first_name ||
    "cliente";

  const email =
    profile?.email ||
    user.email ||
    "";

  const isAdmin = profile?.role === "admin";

  return (
    <AccountDashboard
      firstName={firstName}
      email={email}
      isAdmin={isAdmin}
    />
  );
}