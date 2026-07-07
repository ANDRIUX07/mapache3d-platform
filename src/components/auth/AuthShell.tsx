import Link from "next/link";

type AuthShellProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
};

export function AuthShell({
  title,
  subtitle,
  children,
}: AuthShellProps) {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="w-full max-w-md rounded-3xl bg-white/10 backdrop-blur border border-white/10 p-8">
        <Link href="/" className="text-2xl font-bold block mb-8">
          🦝 Mapache 3D GT
        </Link>

        <h1 className="text-3xl font-bold">{title}</h1>

        <p className="text-white/60 mt-2">{subtitle}</p>

        <div className="mt-8">
          {children}
        </div>
      </div>
    </main>
  );
}