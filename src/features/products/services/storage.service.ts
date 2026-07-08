import { supabase } from "@/lib/supabase/client";

const PRODUCT_BUCKET = "products";

export async function uploadProductImage(file: File) {
  const fileExt = file.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}.${fileExt}`;
  const filePath = `products/${fileName}`;

  const { error } = await supabase.storage
    .from(PRODUCT_BUCKET)
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  const { data } = supabase.storage
    .from(PRODUCT_BUCKET)
    .getPublicUrl(filePath);

  return data.publicUrl;
}

export async function uploadProductImages(files: File[]) {
  const urls: string[] = [];

  for (const file of files) {
    const url = await uploadProductImage(file);
    urls.push(url);
  }

  return urls;
}