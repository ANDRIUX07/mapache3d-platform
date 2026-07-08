import { getFeaturedProducts } from "../services/public-products.service";
import { ProductCard } from "./ProductCard";

export async function FeaturedProducts() {
  const products = await getFeaturedProducts();

  if (products.length === 0) {
    return (
      <section className="py-24">
        <div className="text-center text-white/50">
          No hay productos destacados.
        </div>
      </section>
    );
  }

  return (
    <section className="py-24">
      <div className="mb-10">
        <h2 className="text-5xl font-black">
          Productos Destacados
        </h2>

        <p className="mt-3 text-white/60">
          Diseños exclusivos impresos en 3D por Mapache 3D.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
        {products.map((product: any) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}