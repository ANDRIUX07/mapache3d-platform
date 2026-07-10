import type {
  CreateAddressInput,
  CustomerAddress,
  CustomerProfile,
  UpdateAddressInput,
  UpdateProfileInput,
} from "../types";

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
    throw new Error("Debes iniciar sesión para continuar.");
  }

  return {
    supabase,
    user,
  };
}

export async function getCurrentProfile(): Promise<CustomerProfile | null> {
  const { supabase, user } = await requireAuthenticatedUser();

  const { data, error } = await supabase
    .from("profiles")
    .select(
      `
        id,
        email,
        first_name,
        last_name,
        phone,
        nit,
        avatar_url,
        role,
        created_at,
        updated_at
      `
    )
    .eq("id", user.id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data as CustomerProfile | null;
}

export async function updateCurrentProfile(
  input: UpdateProfileInput
): Promise<CustomerProfile> {
  const { supabase, user } = await requireAuthenticatedUser();

  const payload = {
    first_name: input.first_name.trim(),
    last_name: input.last_name.trim(),
    phone: input.phone?.trim() || null,
    nit: input.nit?.trim() || null,
    avatar_url: input.avatar_url?.trim() || null,
  };

  const { data, error } = await supabase
    .from("profiles")
    .update(payload)
    .eq("id", user.id)
    .select(
      `
        id,
        email,
        first_name,
        last_name,
        phone,
        nit,
        avatar_url,
        role,
        created_at,
        updated_at
      `
    )
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as CustomerProfile;
}

export async function getCurrentUserAddresses(): Promise<
  CustomerAddress[]
> {
  const { supabase, user } = await requireAuthenticatedUser();

  const { data, error } = await supabase
    .from("addresses")
    .select("*")
    .eq("user_id", user.id)
    .order("is_default", {
      ascending: false,
    })
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as CustomerAddress[];
}

export async function createAddress(
  input: CreateAddressInput
): Promise<CustomerAddress> {
  const { supabase, user } = await requireAuthenticatedUser();

  if (input.is_default) {
    const { error: defaultError } = await supabase
      .from("addresses")
      .update({
        is_default: false,
      })
      .eq("user_id", user.id)
      .eq("is_default", true);

    if (defaultError) {
      throw new Error(defaultError.message);
    }
  }

  const payload = {
    user_id: user.id,
    label: input.label.trim(),
    recipient_name: input.recipient_name.trim(),
    phone: input.phone.trim(),
    address_line_1: input.address_line_1.trim(),
    address_line_2: input.address_line_2?.trim() || null,
    department: input.department.trim(),
    municipality: input.municipality.trim(),
    zone: input.zone?.trim() || null,
    postal_code: input.postal_code?.trim() || null,
    delivery_references:
      input.delivery_references?.trim() || null,
    is_default: input.is_default ?? false,
  };

  const { data, error } = await supabase
    .from("addresses")
    .insert(payload)
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as CustomerAddress;
}

export async function updateAddress(
  addressId: string,
  input: UpdateAddressInput
): Promise<CustomerAddress> {
  const { supabase, user } = await requireAuthenticatedUser();

  if (input.is_default) {
    const { error: defaultError } = await supabase
      .from("addresses")
      .update({
        is_default: false,
      })
      .eq("user_id", user.id)
      .neq("id", addressId)
      .eq("is_default", true);

    if (defaultError) {
      throw new Error(defaultError.message);
    }
  }

  const payload = {
    ...(input.label !== undefined && {
      label: input.label.trim(),
    }),
    ...(input.recipient_name !== undefined && {
      recipient_name: input.recipient_name.trim(),
    }),
    ...(input.phone !== undefined && {
      phone: input.phone.trim(),
    }),
    ...(input.address_line_1 !== undefined && {
      address_line_1: input.address_line_1.trim(),
    }),
    ...(input.address_line_2 !== undefined && {
      address_line_2: input.address_line_2.trim() || null,
    }),
    ...(input.department !== undefined && {
      department: input.department.trim(),
    }),
    ...(input.municipality !== undefined && {
      municipality: input.municipality.trim(),
    }),
    ...(input.zone !== undefined && {
      zone: input.zone.trim() || null,
    }),
    ...(input.postal_code !== undefined && {
      postal_code: input.postal_code.trim() || null,
    }),
    ...(input.delivery_references !== undefined && {
      delivery_references:
        input.delivery_references.trim() || null,
    }),
    ...(input.is_default !== undefined && {
      is_default: input.is_default,
    }),
  };

  const { data, error } = await supabase
    .from("addresses")
    .update(payload)
    .eq("id", addressId)
    .eq("user_id", user.id)
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as CustomerAddress;
}

export async function setDefaultAddress(
  addressId: string
): Promise<void> {
  const { supabase, user } = await requireAuthenticatedUser();

  const { error: clearError } = await supabase
    .from("addresses")
    .update({
      is_default: false,
    })
    .eq("user_id", user.id)
    .eq("is_default", true);

  if (clearError) {
    throw new Error(clearError.message);
  }

  const { data, error } = await supabase
    .from("addresses")
    .update({
      is_default: true,
    })
    .eq("id", addressId)
    .eq("user_id", user.id)
    .select("id")
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("No se encontró la dirección.");
  }
}

export async function deleteAddress(
  addressId: string
): Promise<void> {
  const { supabase, user } = await requireAuthenticatedUser();

  const { error } = await supabase
    .from("addresses")
    .delete()
    .eq("id", addressId)
    .eq("user_id", user.id);

  if (error) {
    throw new Error(error.message);
  }
}
