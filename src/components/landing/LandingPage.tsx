import Image from "next/image";

const products = [
  { name: "Llavero personalizado", price: "Q35", icon: "🦝" },
  { name: "Imán decorativo", price: "Q25", icon: "🧲" },
  { name: "Figura 3D", price: "Q85", icon: "🚀" },
];

export function LandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050509] text-white">
      <section className="relative min-h-screen px-6 py-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,102,0,0.25),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(217,70,239,0.25),transparent_35%),radial-gradient(circle_at_50%_80%,rgba(0,200,255,0.15),transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl">
          <header className="flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur">
            <div className="flex items-center gap-4">
              <Image
                src="/images/logo-mapache3d.png"
                alt="Mapache 3D GT"
                width={76}
                height={76}
                className="rounded-2xl"
                priority
              />

              <div>
                <h1 className="text-2xl font-black">Mapache 3D GT</h1>
                <p className="text-sm text-white/60">
                  Traemos a la realidad tus ideas
                </p>
              </div>
            </div>

            <nav className="hidden gap-6 text-sm text-white/70 md:flex">
              <a href="#productos" className="hover:text-white">Productos</a>
              <a href="#mercado" className="hover:text-white">Mercado</a>
              <a href="#tendencias" className="hover:text-white">Tendencias</a>
              <a href="#pedido" className="hover:text-white">Haz tu pedido</a>
            </nav>

            <a
              href="#pedido"
              className="rounded-full bg-orange-500 px-5 py-2 text-sm font-bold text-black"
            >
              Cotizar
            </a>
          </header>

          <div className="grid min-h-[calc(100vh-110px)] items-center gap-12 py-20 lg:grid-cols-2">
            <div>
              <div className="mb-6 inline-flex rounded-full border border-orange-400/30 bg-orange-500/10 px-4 py-2 text-sm text-orange-200">
                Fabricación digital personalizada
              </div>

              <h2 className="max-w-3xl text-5xl font-black leading-tight md:text-7xl">
                Tus ideas convertidas en{" "}
                <span className="bg-gradient-to-r from-orange-400 via-fuchsia-400 to-cyan-300 bg-clip-text text-transparent">
                  piezas 3D
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-lg text-white/60">
                Creamos llaveros, imanes, figuras, accesorios y productos
                personalizados en PLA con envíos a toda Guatemala.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#productos"
                  className="rounded-2xl bg-white px-6 py-3 font-bold text-black"
                >
                  Ver productos
                </a>
                <a
                  href="#pedido"
                  className="rounded-2xl border border-white/15 px-6 py-3 font-bold text-white hover:bg-white/10"
                >
                  Haz tu pedido
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-8 rounded-full bg-fuchsia-500/20 blur-3xl" />
              <div className="relative rounded-[2rem] border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur">
                <Image
                  src="/images/logo-mapache3d.png"
                  alt="Logo Mapache 3D GT"
                  width={900}
                  height={900}
                  className="h-auto w-full rounded-[1.5rem]"
                  priority
                />
              </div>
            </div>
          </div>

          <section id="productos" className="pb-20">
            <h3 className="text-3xl font-black">Productos destacados</h3>
            <p className="mt-2 text-white/50">
              Cards iniciales para definir colores y estilo visual.
            </p>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {products.map((product) => (
                <div
                  key={product.name}
                  className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur transition hover:-translate-y-1 hover:bg-white/10"
                >
                  <div className="grid aspect-square place-items-center rounded-2xl bg-black/40 text-7xl">
                    {product.icon}
                  </div>

                  <h4 className="mt-5 text-xl font-black">{product.name}</h4>
                  <p className="mt-2 text-2xl font-black text-orange-400">
                    {product.price}
                  </p>

                  <button className="mt-5 w-full rounded-2xl bg-orange-500 px-4 py-3 font-bold text-black">
                    Agregar a la carreta
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}