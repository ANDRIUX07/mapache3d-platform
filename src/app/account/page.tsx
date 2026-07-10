import { redirect } from "next/navigation";

import { AccountDashboard } from "@/features/account/components/AccountDashboard";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function AccountPage() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirectedFrom=/account");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("first_name, email, role")
    .eq("id", user.id)
    .maybeSingle();

  if (profile?.role === "admin") {
    redirect("/admin");
  }

  const firstName =
    profile?.first_name?.trim() ||
    user.user_metadata?.first_name ||
    "cliente";

  const email =
    profile?.email ||
    user.email ||
    "";

  return (
    <AccountDashboard
      firstName={firstName}
      email={email}
    />
  );
}
