import { DeleteProductButton } from "./DeleteProductButton";

type Props = {
  product: any;
};

export function ProductAdminCard({ product }: Props) {
  const mainImage = product.product_images?.[0]?.image_url;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex flex-col gap-5 md:flex-row md:items-center">
        <div className="h-28 w-28 overflow-hidden rounded-xl border border-white/10 bg-black/30">
          {mainImage ? (
            <img
              src={mainImage}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-white/30">
              Sin foto
            </div>
          )}
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-bold">{product.name}</h3>

          <div className="mt-2 grid gap-2 text-sm text-white/60 md:grid-cols-4">
            <p>Categoría: {product.categories?.name || "Sin categoría"}</p>
            <p>Precio: Q{Number(product.price).toFixed(2)}</p>
            <p>Stock: {product.stock}</p>
            <p>{product.active ? "🟢 Activo" : "⚪ Inactivo"}</p>
          </div>

          {product.featured && (
            <p className="mt-2 text-sm text-yellow-300">⭐ Destacado</p>
          )}
        </div>

        <DeleteProductButton
          productId={product.id}
          productName={product.name}
        />
      </div>
    </div>
  );
}