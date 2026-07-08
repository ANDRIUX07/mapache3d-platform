import { supabase } from "@/lib/supabase/client";

export type CreateProductInput = {
  name: string;
  slug: string;
  categoryId: string | null;
  shortDescription: string;
  description: string;
  price: number;
  stock: number;
  weightGrams: number;
  printTimeMinutes: number;
  material: string;
  active: boolean;
  featured: boolean;
};

export async function createProduct(input: CreateProductInput) {
  const { data, error } = await supabase
    .from("products")
    .insert({
      name: input.name,
      slug: input.slug,
      category_id: input.categoryId,
      short_description: input.shortDescription,
      description: input.description,
      price: input.price,
      stock: input.stock,
      weight_grams: input.weightGrams,
      print_time_minutes: input.printTimeMinutes,
      material: input.material,
      active: input.active,
      featured: input.featured,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function createProductImages(productId: string, images: string[]) {
  if (images.length === 0) return [];

  const rows = images.map((imageUrl, index) => ({
    product_id: productId,
    image_url: imageUrl,
    alt_text: `Imagen producto ${index + 1}`,
    sort_order: index,
  }));

  const { data, error } = await supabase
    .from("product_images")
    .insert(rows)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}