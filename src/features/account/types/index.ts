export type UserRole = "customer" | "admin";

export type CustomerProfile = {
  id: string;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  nit: string | null;
  avatar_url: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
};

export type CustomerAddress = {
  id: string;
  user_id: string;
  label: string;
  recipient_name: string;
  phone: string;
  address_line_1: string;
  address_line_2: string | null;
  department: string;
  municipality: string;
  zone: string | null;
  postal_code: string | null;
  delivery_references: string | null;
  is_default: boolean;
  created_at: string;
  updated_at: string;
};

export type CustomerFavorite = {
  id: string;
  user_id: string;
  product_id: string;
  created_at: string;
};

export type UpdateProfileInput = {
  first_name: string;
  last_name: string;
  phone?: string;
  nit?: string;
  avatar_url?: string;
};

export type CreateAddressInput = {
  label: string;
  recipient_name: string;
  phone: string;
  address_line_1: string;
  address_line_2?: string;
  department: string;
  municipality: string;
  zone?: string;
  postal_code?: string;
  delivery_references?: string;
  is_default?: boolean;
};

export type UpdateAddressInput = Partial<CreateAddressInput>;