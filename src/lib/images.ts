import type { ImageMetadata } from 'astro';

/**
 * Resuelve una imagen de src/assets a partir de una ruta relativa ("photos/capuchino.jpg").
 * Devuelve null si no existe, para que la interfaz use un respaldo (ícono) sin romper el build.
 */
const images = import.meta.glob<{ default: ImageMetadata }>('/src/assets/**/*.{jpg,jpeg,png,webp,avif}');

export async function getAssetImage(path: string | null | undefined): Promise<ImageMetadata | null> {
  if (!path) return null;
  const loader = images[`/src/assets/${path.replace(/^\/+/, '')}`];
  return loader ? (await loader()).default : null;
}
