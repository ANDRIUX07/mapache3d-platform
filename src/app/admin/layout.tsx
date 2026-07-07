import { AdminShell } from "@/components/admin/AdminShell";
import { isAdmin } from "@/core/permissions/is-admin";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await isAdmin();

  if (!admin) {
    redirect("/login");
  }

  return <AdminShell>{children}</AdminShell>;
}