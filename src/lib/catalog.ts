/**
 * Acceso a artesanías y talleres (mismo patrón que lib/menu.ts):
 * la fuente de datos se cambia aquí sin tocar componentes.
 */
import { getCollection, type CollectionEntry } from 'astro:content';
import { showDemo } from './menu';

export type Craft = CollectionEntry<'artesanias'>['data'];
export type Workshop = CollectionEntry<'talleres'>['data'];
export type CraftCategoryId = Craft['category'];

export const CRAFT_CATEGORIES: { id: CraftCategoryId; name: string; icon: string; blurb: string }[] = [
  { id: 'velas', name: 'Velas', icon: 'flame', blurb: 'De soya, con aromas suaves y hechas en pequeños lotes.' },
  { id: 'esencias', name: 'Esencias', icon: 'droplets', blurb: 'Aromas para tu casa y lámparas para disfrutarlos.' },
  { id: 'textiles', name: 'Textiles', icon: 'spool', blurb: 'Tejidos, bordados y macramé para el hogar.' },
  { id: 'ceramica', name: 'Cerámica', icon: 'amphora', blurb: 'Tazas, materas y figuras pintadas a mano.' },
  { id: 'artesanias', name: 'Detalles y regalos', icon: 'gift', blurb: 'Libretas, kits y piezas para regalar.' },
];

export async function getCrafts(): Promise<Craft[]> {
  const items = await getCollection('artesanias');
  return items
    .map((i) => i.data)
    .filter((c) => showDemo || !c.demo)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

/** Talleres futuros (desde hoy, hora de Colombia), ordenados por fecha. */
export async function getUpcomingWorkshops(): Promise<Workshop[]> {
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Bogota' }).format(new Date());
  const items = await getCollection('talleres');
  return items
    .map((i) => i.data)
    .filter((w) => (showDemo || !w.demo) && w.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date));
}
