import { getCurrentProfile } from "@/core/auth/get-current-profile";

export default async function AdminPage() {
  const profile = await getCurrentProfile();

  return (
    <div>
      <h1 className="text-4xl font-black">Dashboard</h1>
      <p className="mt-2 text-white/60">
        Bienvenido, {profile?.full_name || profile?.email || "Administrador"}.
      </p>

      <section className="mt-8 grid gap-6 md:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-white/50">Ventas hoy</p>
          <h2 className="mt-3 text-3xl font-black">Q0.00</h2>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-white/50">Pedidos pendientes</p>
          <h2 className="mt-3 text-3xl font-black">0</h2>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-white/50">Productos activos</p>
          <h2 className="mt-3 text-3xl font-black">0</h2>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-white/50">Producción</p>
          <h2 className="mt-3 text-3xl font-black">0%</h2>
        </div>
      </section>
    </div>
  );
}