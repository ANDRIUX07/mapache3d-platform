import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getFeaturedProducts() {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("products")
    .select(`
      id,
      name,
      slug,
      short_description,
      price,
      stock,
      active,
      featured,
      product_images (
        id,
        image_url,
        sort_order
      ),
      categories (
        id,
        name,
        slug
      )
    `)
    .eq("active", true)
    .eq("featured", true)
    .order("created_at", { ascending: false })
    .limit(8);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}