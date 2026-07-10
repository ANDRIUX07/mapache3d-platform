import { z } from "zod";

const optionalText = z
  .string()
  .trim()
  .optional()
  .transform((value) => value || undefined);

export const updateProfileSchema = z.object({
  first_name: z
    .string()
    .trim()
    .min(2, "Ingresa tu nombre.")
    .max(80, "El nombre es demasiado largo."),

  last_name: z
    .string()
    .trim()
    .min(2, "Ingresa tu apellido.")
    .max(80, "El apellido es demasiado largo."),

  phone: optionalText.refine(
    (value) => !value || /^[0-9+\-\s()]{8,20}$/.test(value),
    "Ingresa un número de teléfono válido."
  ),

  nit: optionalText.refine(
    (value) => !value || /^[0-9A-Za-z-]{3,20}$/.test(value),
    "Ingresa un NIT válido."
  ),

  avatar_url: optionalText.refine(
    (value) => {
      if (!value) {
        return true;
      }

      try {
        new URL(value);
        return true;
      } catch {
        return false;
      }
    },
    "La URL del avatar no es válida."
  ),
});

export const addressSchema = z.object({
  label: z
    .string()
    .trim()
    .min(2, "Escribe un nombre para la dirección.")
    .max(40, "El nombre de la dirección es demasiado largo."),

  recipient_name: z
    .string()
    .trim()
    .min(3, "Ingresa el nombre de quien recibe.")
    .max(120, "El nombre es demasiado largo."),

  phone: z
    .string()
    .trim()
    .regex(
      /^[0-9+\-\s()]{8,20}$/,
      "Ingresa un número de teléfono válido."
    ),

  address_line_1: z
    .string()
    .trim()
    .min(5, "Ingresa una dirección más completa.")
    .max(200, "La dirección es demasiado larga."),

  address_line_2: optionalText,

  department: z
    .string()
    .trim()
    .min(2, "Selecciona un departamento.")
    .max(80),

  municipality: z
    .string()
    .trim()
    .min(2, "Ingresa el municipio.")
    .max(100),

  zone: optionalText,
  postal_code: optionalText,

  delivery_references: z
    .string()
    .trim()
    .max(500, "Las referencias son demasiado largas.")
    .optional()
    .transform((value) => value || undefined),

  is_default: z.boolean().optional().default(false),
});

export type UpdateProfileFormValues = z.infer<
  typeof updateProfileSchema
>;

export type AddressFormValues = z.infer<typeof addressSchema>;