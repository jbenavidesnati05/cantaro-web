/**
 * Datos del negocio.
 * - `null` → el bloque correspondiente se oculta en la interfaz.
 * - `// SUPUESTO` → dato de ejemplo verosímil; reemplazar antes de publicar (ver README).
 */

export type DayKey = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';
/** Horas en formato 24 h "HH:MM". `null` = cerrado ese día. */
export type DayHours = { open: string; close: string } | null;

export interface Workshop {
  title: string;
  description: string;
  /** Fecha ISO "YYYY-MM-DD". */
  date: string;
  time: string | null;
  priceCOP: number | null;
  spots: number | null;
}

export interface Business {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  url: string;
  email: string;
  socialEmail: string;
  whatsapp: string | null;
  address: {
    street: string | null;
    locality: string;
    region: string;
    country: string;
  };
  mapsUrl: string | null;
  geo: { lat: number; lng: number } | null;
  hours: Record<DayKey, DayHours> | null;
  social: {
    facebook: string | null;
    instagram: string | null;
    tiktok: string | null;
  };
  nextWorkshop: Workshop | null;
  timezone: string;
}

export const business: Business = {
  name: 'Cántaro arte & diseño',
  shortName: 'Cántaro',
  tagline: 'Un espacio de café y creación',
  description:
    'Café, artesanías y talleres creativos en Sibundoy, Putumayo. Un lugar cálido para tomar algo rico, descubrir objetos hechos a mano y aprender con las manos.',
  url: 'https://cantaroarte.com',
  email: 'hola@cantaroarte.com',
  socialEmail: 'redes@cantaroarte.com',
  whatsapp: '573000000000', // SUPUESTO — número real pendiente (formato internacional sin +)
  address: {
    street: 'Centro, cerca al parque principal', // SUPUESTO — dirección exacta pendiente
    locality: 'Sibundoy',
    region: 'Putumayo',
    country: 'CO',
  },
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Sibundoy%2C%20Putumayo', // SUPUESTO — enlace al punto exacto pendiente
  geo: { lat: 1.2033, lng: -76.9192 }, // SUPUESTO — centro aproximado de Sibundoy
  // SUPUESTO — horarios pendientes de confirmar
  hours: {
    mon: null,
    tue: { open: '08:00', close: '19:00' },
    wed: { open: '08:00', close: '19:00' },
    thu: { open: '08:00', close: '19:00' },
    fri: { open: '08:00', close: '20:00' },
    sat: { open: '09:00', close: '20:00' },
    sun: { open: '09:00', close: '18:00' },
  },
  social: {
    facebook: 'https://facebook.com/cantaroarte',
    instagram: 'https://instagram.com/cantaroarte',
    tiktok: null, // pendiente de crear
  },
  // SUPUESTO — taller de ejemplo
  nextWorkshop: {
    title: 'Taller de velas aromáticas',
    description: 'Aprende a hacer tu propia vela de soya con esencias naturales. Incluye materiales y una bebida caliente.',
    date: '2026-12-12',
    time: '15:00',
    priceCOP: 45000,
    spots: 10,
  },
  timezone: 'America/Bogota',
};
