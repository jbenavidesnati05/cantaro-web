import { business } from '@/data/business';

/** Enlace de WhatsApp con mensaje prellenado, o null si no hay número. */
export function waLink(message?: string): string | null {
  if (!business.whatsapp) return null;
  const text = message ? `?text=${encodeURIComponent(message)}` : '';
  return `https://wa.me/${business.whatsapp}${text}`;
}

/** "573001234567" → "+57 300 123 4567" */
export function formatPhone(raw: string): string {
  const m = raw.match(/^57(\d{3})(\d{3})(\d{4})$/);
  return m ? `+57 ${m[1]} ${m[2]} ${m[3]}` : `+${raw}`;
}
