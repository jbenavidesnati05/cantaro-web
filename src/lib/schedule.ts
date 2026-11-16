import type { DayHours, DayKey } from '@/data/business';
import { formatTime } from './format';

export const DAY_ORDER: DayKey[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

export const DAY_LABELS: Record<DayKey, string> = {
  mon: 'Lunes',
  tue: 'Martes',
  wed: 'Miércoles',
  thu: 'Jueves',
  fri: 'Viernes',
  sat: 'Sábado',
  sun: 'Domingo',
};

export function formatHours(hours: DayHours): string {
  return hours ? `${formatTime(hours.open)} – ${formatTime(hours.close)}` : 'Cerrado';
}

/**
 * Día actual en Colombia. El sitio es estático, así que "hoy" se calcula en el navegador:
 * los componentes renderizan la semana completa y un script mínimo marca el día de hoy
 * con `data-day` (ver `todayKey` en el script de cada componente).
 */
export function todayKey(timezone = 'America/Bogota', now = new Date()): DayKey {
  const wd = new Intl.DateTimeFormat('en-US', { timeZone: timezone, weekday: 'short' })
    .format(now)
    .toLowerCase()
    .slice(0, 3);
  return (DAY_ORDER.find((d) => d === wd) ?? 'mon') as DayKey;
}

/** Agrupa días consecutivos con el mismo horario: "Martes a jueves · 8:00 a. m. – 7:00 p. m." */
export function groupedHours(hours: Record<DayKey, DayHours>) {
  const groups: { from: DayKey; to: DayKey; label: string }[] = [];
  for (const day of DAY_ORDER) {
    const label = formatHours(hours[day]);
    const last = groups.at(-1);
    if (last && last.label === label) last.to = day;
    else groups.push({ from: day, to: day, label });
  }
  return groups.map((g) => ({
    days:
      g.from === g.to
        ? DAY_LABELS[g.from]
        : `${DAY_LABELS[g.from]} a ${DAY_LABELS[g.to].toLowerCase()}`,
    hours: g.label,
  }));
}
