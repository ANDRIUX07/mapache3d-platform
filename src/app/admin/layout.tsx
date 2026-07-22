import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#090014] text-white">
      <div className="grid min-h-screen grid-cols-1 md:grid-cols-[280px_1fr]">
        <AdminSidebar />

        <main className="min-w-0 p-5 sm:p-8 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}