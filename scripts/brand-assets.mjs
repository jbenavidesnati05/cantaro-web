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

// Escenas recortadas del banner oficial (ilustración de marca) para artesanías y talleres.
const scenes = {
  'taza-hojas': [1030, 430, 360, 250],
  vela: [1300, 330, 220, 270],
  'lampara-esencias': [1460, 250, 330, 340],
  'vasija-ceramica': [1610, 120, 300, 400],
  macrame: [1550, 0, 280, 260],
  pinceles: [1860, 40, 173, 380],
  'matera-hojas': [1240, 150, 250, 210],
  regalo: [1700, 430, 333, 270],
  'bodegon-artesanal': [1030, 0, 1003, 774],
};
for (const [name, [left, top, width, height]] of Object.entries(scenes)) {
  await sharp(banner).extract({ left, top, width, height }).jpeg({ quality: 90 }).toFile(`src/assets/scenes/${name}.jpg`);
}
console.log('Escenas generadas en src/assets/scenes');
