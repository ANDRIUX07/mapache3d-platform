import { ProductForm } from "@/features/products/components/ProductForm";

export default function NuevoProductoPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-black">Nuevo producto</h1>
        <p className="mt-2 text-white/60">
          Crea un producto, agrega precio, descripción y fotografías.
        </p>
      </div>

      <ProductForm />
    </div>
  );
}