import { AddToCartButton } from "./AddToCartButton";

type Props = {
  product: any;
};

export function ProductCard({ product }: Props) {
  const image = product.product_images?.[0]?.image_url;

  return (
    <div className="group overflow-hidden rounded-[2rem] border border-white/10 bg-black/40 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-violet-400/60 hover:shadow-[0_0_30px_rgba(168,85,247,.25)]">
      <div className="relative aspect-square overflow-hidden bg-black">
        {image ? (
          <img
            src={image}
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-white/30">
            Sin imagen
          </div>
        )}

        {product.featured && (
          <div className="absolute left-4 top-4 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 px-3 py-1 text-xs font-black uppercase tracking-wider text-black shadow-lg">
            Destacado
          </div>
        )}
      </div>

      <div className="space-y-4 p-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-300">
            {product.categories?.name ?? "GENERAL"}
          </p>

          <h3 className="mt-2 text-2xl font-black">
            {product.name}
          </h3>

          <p className="mt-3 min-h-[48px] text-sm leading-relaxed text-white/60">
            {product.short_description}
          </p>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-white/40">
              Precio
            </p>

            <p className="text-3xl font-black text-orange-400">
              Q {Number(product.price).toFixed(2)}
            </p>
          </div>

          <div className="rounded-full border border-green-400/30 bg-green-400/10 px-3 py-1 text-xs font-bold text-green-300">
            Disponible
          </div>
        </div>

        <div className="grid gap-3">
          <AddToCartButton product={product} />

          <button className="rounded-2xl border border-white/10 py-3 font-bold transition hover:bg-white/10">
            Ver detalles
          </button>
        </div>
      </div>
    </div>
  );
}