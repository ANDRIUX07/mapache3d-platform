import { supabase } from "@/lib/supabase/client";

function getSupabase() {
  return supabase;
}

async function requireAuthenticatedUser() {
  const supabase = getSupabase();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  if (!user) {
    throw new Error("Debes iniciar sesión para guardar favoritos.");
  }

  return {
    supabase,
    user,
  };
}

export async function getFavoriteProductIds(): Promise<string[]> {
  const { supabase, user } = await requireAuthenticatedUser();

  const { data, error } = await supabase
    .from("favorites")
    .select("product_id")
    .eq("user_id", user.id)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map((favorite) => favorite.product_id);
}

export async function isProductFavorite(
  productId: string
): Promise<boolean> {
  const { supabase, user } = await requireAuthenticatedUser();

  const { data, error } = await supabase
    .from("favorites")
    .select("id")
    .eq("user_id", user.id)
    .eq("product_id", productId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return Boolean(data);
}

export async function addProductToFavorites(
  productId: string
): Promise<void> {
  const { supabase, user } = await requireAuthenticatedUser();

  const { error } = await supabase.from("favorites").upsert(
    {
      user_id: user.id,
      product_id: productId,
    },
    {
      onConflict: "user_id,product_id",
      ignoreDuplicates: true,
    }
  );

  if (error) {
    throw new Error(error.message);
  }
}

export async function removeProductFromFavorites(
  productId: string
): Promise<void> {
  const { supabase, user } = await requireAuthenticatedUser();

  const { error } = await supabase
    .from("favorites")
    .delete()
    .eq("user_id", user.id)
    .eq("product_id", productId);

  if (error) {
    throw new Error(error.message);
  }
}

export async function toggleProductFavorite(
  productId: string
): Promise<boolean> {
  const favorite = await isProductFavorite(productId);

  if (favorite) {
    await removeProductFromFavorites(productId);
    return false;
  }

  await addProductToFavorites(productId);
  return true;
}
