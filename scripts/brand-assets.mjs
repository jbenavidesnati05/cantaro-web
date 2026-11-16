// Genera íconos y la imagen Open Graph a partir de los archivos de marca.
// Uso: npm run brand
import sharp from 'sharp';

const logo = 'src/assets/brand/logo-circular.png';
const banner = 'src/assets/brand/banner.png';
const out = 'public/brand';

for (const [name, size] of [
  ['icon-512.png', 512],
  ['icon-192.png', 192],
  ['apple-touch-icon.png', 180],
  ['favicon-32.png', 32],
]) {
  await sharp(logo).resize(size, size).png({ compressionLevel: 9 }).toFile(`${out}/${name}`);
}
// 1200×630 recortado desde la izquierda para conservar el logo del banner.
await sharp(banner)
  .resize(1200, 630, { fit: 'cover', position: 'left' })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(`${out}/og.jpg`);
console.log('Recursos de marca generados en', out);
