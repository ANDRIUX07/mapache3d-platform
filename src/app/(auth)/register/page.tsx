import { Suspense } from "react";

import { AuthShell } from "@/components/auth/AuthShell";
import { RegisterForm } from "./RegisterForm";

function RegisterLoading() {
  return (
    <AuthShell
      title="Crear cuenta"
      subtitle="Preparando el formulario de registro..."
    >
      <div className="space-y-4">
        <div className="h-12 animate-pulse rounded-xl bg-white/5" />
        <div className="h-12 animate-pulse rounded-xl bg-white/5" />
        <div className="h-12 animate-pulse rounded-xl bg-white/5" />
        <div className="h-12 animate-pulse rounded-xl bg-white/5" />
        <div className="h-12 animate-pulse rounded-xl bg-violet-500/20" />
      </div>
    </AuthShell>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<RegisterLoading />}>
      <RegisterForm />
    </Suspense>
  );
}