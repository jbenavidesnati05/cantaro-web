# Cántaro arte & diseño — cantaroarte.com

Sitio web y carta digital (QR) de **Cántaro**: café, artesanías y talleres en Sibundoy, Putumayo.
Hecho con Astro + Tailwind CSS v4, sitio estático publicado en Cloudflare Pages.

| Página | Ruta |
|---|---|
| Inicio | `/` |
| **Carta del QR** (no cambiar nunca esta ruta) | `/menu` |
| Artesanías | `/artesanias` |
| Talleres | `/talleres` |
| Contacto | `/contacto` |

## Trabajar en local

Requisitos: Node.js 22.23 o superior.

```bash
npm install
npm run dev        # abre http://localhost:4321
npm run build      # revisa tipos y genera dist/
npm run preview    # sirve dist/ para probar el build
```

## Editar el contenido

Todo el contenido está en archivos de datos; no hace falta tocar los componentes.
Si un archivo tiene un error (falta un campo, precio con letras…), `npm run build` falla y avisa dónde.

### Carta (`src/content/menu/`)
- `categories.json`: categorías (nombre, descripción, ícono, orden).
- `products.json`: productos. Campos útiles:

```json
{
  "id": "capuchino",                 // único, en minúsculas y con guiones
  "name": "Capuchino",
  "description": "Espresso, leche vaporizada y espuma cremosa.",
  "priceCOP": 7000,                  // sin puntos ni $
  "categoryId": "cafes-calientes",
  "sortOrder": 4,                    // orden dentro de la categoría
  "image": "photos/capuchino.jpg",   // opcional, ruta dentro de src/assets/
  "available": false,                // false = se muestra como "Agotado"
  "featured": true,                  // true = "Recomendado" y aparece en el inicio
  "variants": [{ "name": "Grande", "priceCOP": 8500 }],
  "demo": false                      // true = producto de ejemplo
}
```

- **Agotar un producto:** `"available": false`. **Recomendarlo:** `"featured": true`.
- Si el precio base es `0`, debe tener `variants` (se muestra "desde …").

### Artesanías y talleres
- `src/content/artesanias/products.json` — `"priceCOP": null` muestra "Pregunta el precio".
- `src/content/talleres/workshops.json` — fecha `"YYYY-MM-DD"`, hora `"HH:MM"`. Los talleres pasados dejan de verse en la siguiente publicación.

### Datos del negocio (`src/data/business.ts`)
WhatsApp, dirección, horarios, redes. Un campo en `null` **oculta** ese bloque en todo el sitio.
Preguntas frecuentes: `src/data/faq.ts`.

### Fotos
Guardar en `src/assets/` (por ejemplo `src/assets/menu/torta.jpg`) y referenciar como `"image": "menu/torta.jpg"`.
Astro las optimiza solo (WebP, varios tamaños). Las imágenes de terceros se registran en `CREDITS.md`.

## Publicar

Cada `git push` a `main` publica el sitio en Cloudflare Pages en 1–2 minutos. **El QR no cambia nunca.**

```bash
git add -A
git commit -m "carta: nuevos precios"
git push
```

### Configuración de Cloudflare Pages (una sola vez)
1. Cloudflare → **Workers & Pages** → **Create** → pestaña **Pages** → **Connect to Git** → repositorio `cantaro-web`.
2. Framework preset: **Astro** · Build command: `npm run build` · Build output directory: `dist`.
3. Guardar y desplegar. La versión de Node se toma de `.node-version`.
4. En el proyecto → **Custom domains** → agregar `cantaroarte.com` y `www.cantaroarte.com`.
5. (Opcional) **Web Analytics** → activar para el sitio (sin cookies).

### Contenido de ejemplo
`.env.production` tiene `PUBLIC_SHOW_DEMO=true`: los productos, artesanías y talleres con `"demo": true`
se publican con el aviso "de ejemplo". Cuando la información real esté cargada, cambiar a `false`
(o borrar los productos demo) y hacer push.

## Pendientes antes de dar el sitio por terminado

- [ ] **Número de WhatsApp** real (`business.ts` → `whatsapp`). Hoy está en `null`: los botones de WhatsApp están ocultos.
- [ ] Dirección exacta, enlace de Google Maps y coordenadas (hoy son supuestos).
- [ ] Horarios reales (hoy son supuestos: martes a domingo).
- [ ] Carta real: categorías, productos y precios (reemplazar los `demo: true`).
- [ ] Catálogo real de artesanías y calendario real de talleres.
- [ ] Respuestas de preguntas frecuentes marcadas `// SUPUESTO` (medios de pago, reservas…).
- [ ] Fotos reales del local, productos y talleres (reemplazan las de Unsplash y los recortes del banner).
- [ ] Logo en SVG o PNG con fondo transparente (para favicon e ícono más nítidos).
- [ ] TikTok, cuando exista (`business.ts` → `social.tiktok`).
- [ ] Al terminar: `PUBLIC_SHOW_DEMO=false` en `.env.production`.
