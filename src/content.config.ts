import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { file } from 'astro/loaders';

const variant = z.object({
  name: z.string().min(1),
  priceCOP: z.number().int().positive(),
});

const categories = defineCollection({
  loader: file('src/content/menu/categories.json'),
  schema: z.object({
    id: z.string().regex(/^[a-z0-9-]+$/, 'id en kebab-case'),
    name: z.string().min(1),
    description: z.string().optional(),
    icon: z.string().optional(),
    sortOrder: z.number().int(),
  }),
});

const products = defineCollection({
  loader: file('src/content/menu/products.json'),
  schema: z
    .object({
      id: z.string().regex(/^[a-z0-9-]+$/, 'id en kebab-case'),
      name: z.string().min(1),
      description: z.string().optional(),
      priceCOP: z.number().int().nonnegative(),
      categoryId: z.string(),
      image: z.string().nullable().optional(),
      available: z.boolean().default(true),
      featured: z.boolean().default(false),
      sortOrder: z.number().int(),
      variants: z.array(variant).optional(),
      allergens: z.array(z.string()).optional(),
      demo: z.boolean().default(false),
    })
    // Nunca se muestra precio 0: si el precio base es 0, debe tener variantes.
    .refine((p) => p.priceCOP > 0 || (p.variants?.length ?? 0) > 0, {
      message: 'priceCOP es 0 y no hay variantes con precio',
    }),
});

export const collections = { categories, products };
