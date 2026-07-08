import {
  createProduct,
  createProductImages,
  type CreateProductInput,
} from "../services/products-client.service";

import { uploadProductImages } from "../services/storage.service";

export type CreateProductActionInput = CreateProductInput & {
  files: File[];
};

export function generateSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export async function createProductAction(input: CreateProductActionInput) {
  const imageUrls = await uploadProductImages(input.files);

  const product = await createProduct({
    name: input.name,
    slug: input.slug || generateSlug(input.name),
    categoryId: input.categoryId || null,
    shortDescription: input.shortDescription,
    description: input.description,
    price: input.price,
    stock: input.stock,
    weightGrams: input.weightGrams,
    printTimeMinutes: input.printTimeMinutes,
    material: input.material,
    active: input.active,
    featured: input.featured,
  });

  await createProductImages(product.id, imageUrls);

  return product;
}