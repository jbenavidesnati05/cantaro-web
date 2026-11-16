/**
 * Único punto de acceso a los datos del menú.
 * Para cambiar la fuente (Google Sheets, API, panel) se modifica solo este archivo.
 */
import { getCollection, type CollectionEntry } from 'astro:content';

export type Category = CollectionEntry<'categories'>['data'];
export type Product = CollectionEntry<'products'>['data'];
export type MenuSection = Category & { products: Product[] };

/** Los productos demo se ven en desarrollo; en build solo si PUBLIC_SHOW_DEMO=true. */
export const showDemo = !import.meta.env.PROD || import.meta.env.PUBLIC_SHOW_DEMO === 'true';

const bySort = <T extends { sortOrder: number }>(a: T, b: T) => a.sortOrder - b.sortOrder;

export async function getMenu(): Promise<MenuSection[]> {
  const [categories, products] = await Promise.all([
    getCollection('categories'),
    getCollection('products'),
  ]);

  const visible = products.map((p) => p.data).filter((p) => showDemo || !p.demo);
  const categoryIds = new Set(categories.map((c) => c.data.id));
  for (const p of visible) {
    if (!categoryIds.has(p.categoryId)) {
      throw new Error(`Producto "${p.id}" apunta a la categoría inexistente "${p.categoryId}"`);
    }
  }

  return categories
    .map((c) => c.data)
    .sort(bySort)
    .map((c) => ({
      ...c,
      products: visible.filter((p) => p.categoryId === c.id).sort(bySort),
    }));
}

export async function getFeatured(limit = 4): Promise<Product[]> {
  const menu = await getMenu();
  return menu
    .flatMap((s) => s.products)
    .filter((p) => p.featured && p.available)
    .slice(0, limit);
}

/** Precio a mostrar: el base, o el menor de las variantes ("desde"). */
export function displayPrice(p: Product): { value: number; from: boolean } {
  const variantPrices = p.variants?.map((v) => v.priceCOP) ?? [];
  if (p.priceCOP > 0) return { value: p.priceCOP, from: false };
  return { value: Math.min(...variantPrices), from: true };
}
