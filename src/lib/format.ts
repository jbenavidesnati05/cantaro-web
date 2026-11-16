const cop = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
});

/** 8500 → "$ 8.500". Devuelve null para 0 o valores inválidos (nunca se muestra $ 0). */
export function formatCOP(value: number | null | undefined): string | null {
  if (value == null || !Number.isFinite(value) || value <= 0) return null;
  // Intl usa espacio duro; lo normalizamos a espacio fino no separable para "$ 8.500".
  return cop.format(value).replace(/\s/u, ' ');
}

/** "15:00" → "3:00 p. m." (formato colombiano). */
export function formatTime(hhmm: string): string {
  const [h = 0, m = 0] = hhmm.split(':').map(Number);
  const period = h < 12 ? 'a. m.' : 'p. m.';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, '0')} ${period}`;
}

/** "2026-12-12" → { day: "12", month: "dic", weekday: "sábado", full: "sábado, 12 de diciembre de 2026" } */
export function formatDateParts(iso: string) {
  const date = new Date(`${iso}T12:00:00-05:00`);
  const fmt = (opts: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat('es-CO', { timeZone: 'America/Bogota', ...opts }).format(date);
  return {
    day: fmt({ day: 'numeric' }),
    month: fmt({ month: 'short' }).replace('.', ''),
    weekday: fmt({ weekday: 'long' }),
    full: fmt({ weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
  };
}
