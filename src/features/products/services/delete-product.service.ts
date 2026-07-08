import { supabase } from "@/lib/supabase/client";

export async function deleteProduct(productId: string) {
  // Buscar imágenes del producto
  const { data: images, error: imagesError } = await supabase
    .from("product_images")
    .select("*")
    .eq("product_id", productId);

  if (imagesError) {
    throw new Error(imagesError.message);
  }

  // Eliminar imágenes del Storage
  if (images && images.length > 0) {
    const paths = images
      .map((image) => {
        if (!image.image_url) return null;

        const index = image.image_url.indexOf("/products/");

        if (index === -1) return null;

        return image.image_url.substring(index + 1);
      })
      .filter(Boolean) as string[];

    if (paths.length > 0) {
      await supabase.storage
        .from("products")
        .remove(paths);
    }

    // Eliminar registros de imágenes
    await supabase
      .from("product_images")
      .delete()
      .eq("product_id", productId);
  }

  // Eliminar producto
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", productId);

  if (error) {
    throw new Error(error.message);
  }
}