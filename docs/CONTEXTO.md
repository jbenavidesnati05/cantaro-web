# CÁNTARO ARTE & DISEÑO — Contexto maestro del sitio web y menú QR

**Documento:** Contexto de producto y especificación del MVP
**Versión:** 3.0 (arquitectura Astro + Tailwind v4, desarrollo con Claude en VS Code)
**Fecha:** 16 de noviembre de 2026
**País de operación:** Colombia
**Estado:** Listo para desarrollo

> **Propósito:** Contexto base del proyecto para el asistente de desarrollo (Claude en VS Code). Las reglas operativas resumidas están en `CLAUDE.md`. Este documento distingue **hechos confirmados**, **decisiones tomadas** y **datos pendientes**. Ante cualquier duda, no inventar: usar placeholders explícitos.

---

## 1. Identidad del emprendimiento

- **Marca:** CÁNTARO ARTE & DISEÑO (nombre corto en redes y textos: "Cántaro").
- **Concepto:** Cafetería + tienda de objetos artesanales + espacio de talleres creativos.
- **Ubicación:** Un pueblo de Colombia (nombre, dirección y mapa **pendientes**). Público local: en el pueblo la red social más usada es **Facebook**.
- **Oferta de cafetería:** Café, aromáticas, bebidas y tortas/postres.
- **Oferta artesanal:** Velas, esencias, textiles para el hogar, artesanías, figuras de cerámica y otros objetos hechos a mano.
- **Actividades:** Talleres de manualidades, inicialmente una vez al mes.
- **Origen:** Cántaro existió antes como proyecto de manualidades y capacitación; ahora evoluciona a cafetería-tienda con talleres.
- **Significado del nombre:** La vasija tradicional de barro: creación manual, tradición, lo que contiene y lo que se comparte.
- **Posicionamiento:** Experiencia cálida, artesanal, creativa y acogedora para tomar algo, comprar productos hechos a mano y aprender.

### Propuesta de valor
Un espacio de café y creación donde cada visita combina un buen momento de consumo con el descubrimiento de objetos artesanales y actividades creativas.

### Tono de voz
- Cercano, cálido y sencillo; español de Colombia; tutear al cliente.
- Frases cortas, evocadoras de lo hecho a mano ("hecho con las manos", "para compartir", "quédate un rato").
- Emojis con moderación y solo en textos sociales, no en la interfaz principal.

### Público y contexto de uso
- Clientes en el local que escanean el QR desde la mesa o la barra (**caso principal**).
- Personas que reciben el enlace y consultan la carta antes de ir.
- Interesados en artesanías y talleres.
- Personal que actualiza precios y disponibilidad.

> No hay cifras de aforo, tráfico ni ventas. Operación pequeña, no restaurante de alto flujo.

---

## 2. Datos ya confirmados

| Tema | Valor |
|---|---|
| Dominio oficial | **`cantaroarte.com`** (registrado en Cloudflare) |
| URL del menú (QR) | **`https://cantaroarte.com/menu`** — permanente, no cambiar nunca |
| Correo público de contacto | `hola@cantaroarte.com` (Zoho Mail) |
| Correo de redes | `redes@cantaroarte.com` |
| Facebook | `https://facebook.com/cantaroarte` (página creada) |
| Instagram | `https://instagram.com/cantaroarte` |
| TikTok | `https://tiktok.com/@cantaroarte` (pendiente de crear; mostrar solo si existe) |
| Hosting | **Cloudflare Pages** (plan gratuito, uso comercial permitido) |
| DNS y correo | Cloudflare DNS + Zoho Mail (MX, SPF, DKIM, DMARC ya configurados) |

**Bio oficial (redes):**
> ☕ Café y algo rico para acompañar · 🏺 Artesanías y diseño local · 🎨 Talleres creativos · 📍 [Pueblo], Colombia

---

## 3. Objetivo del proyecto web

### Fase 1 (MVP)
Que un cliente escanee el QR y abra una página **rápida, atractiva, legible y sin registro** donde explore las categorías del menú, vea productos, precios y disponibilidad, y luego **pida presencialmente al personal**.

### Objetivos secundarios
- Presentar la identidad de marca y el concepto.
- Mostrar contacto, ubicación, horarios y redes (cuando estén confirmados).
- Dejar la estructura lista para catálogo de artesanías y talleres.
- Costo de hosting y mantenimiento cercano a $0.

### Decisiones de alcance
- El QR va **directo a `/menu`**.
- Web en navegador; sin app nativa, sin registro, sin descargas.
- **El menú es solo de lectura**: no hay botones de pedir, carrito, pagos ni notificaciones al sistema. El pedido se hace con el personal.
- La URL `/menu` es permanente aunque cambie el diseño o la fuente de datos.

---

## 4. Identidad visual y dirección de arte

### Logo
- Existe una línea de logo con símbolo circular, referencia a vasija/taza y hojas.
- **Usar el archivo final que suministre la marca** (`public/brand/logo.svg` / `logo.png`). No reconstruirlo ni inventar uno definitivo.
- Mientras no exista: wordmark "CÁNTARO" en la tipografía display + un isotipo SVG simple de vasija **marcado como provisional** (`src/components/brand/LogoPlaceholder.astro`).
- Aplicaciones: favicon, header, footer, imagen Open Graph y pieza del QR.

### Paleta (tokens — provisional, validar contra el logo final)

| Token | Uso | HEX |
|---|---|---|
| `olive-900` | Marca, navegación, botones, fondos oscuros | `#2F3E0F` |
| `olive-700` | Hover, bordes de marca | `#4A5D1E` |
| `clay-500` | Acento principal (terracota), CTAs secundarios, precios destacados | `#D2652A` |
| `clay-300` | Acento suave, glows, highlights | `#E9A27A` |
| `cream-50` | Fondo principal | `#F8EEDD` |
| `cream-100` | Secciones alternas | `#F1E2C8` |
| `bark-800` | Texto principal (café oscuro) | `#5B3A21` |
| `bark-600` | Texto secundario | `#7A5A40` |
| `paper` | Tarjetas | `#FFFDF8` |
| `stone-400` | Estado "agotado" | `#9A8F84` |

Definirlos en `@theme` de Tailwind v4 (`src/styles/global.css`) para usarlos como `bg-olive-900`, `text-clay-500`, etc.

### Tipografía
- **Display/títulos:** Fraunces (variable, con ejes `SOFT` y `WONK` para un toque artesanal) — alternativa: Cormorant Garamond.
- **Texto/UI:** Inter o Lato.
- Autoalojadas con Fontsource (sin Google Fonts externo). Máximo 2 familias.
- Escala tipográfica fluida con `clamp()`; títulos del hero de 3.5rem (móvil) a 7rem (desktop).

### Nivel visual buscado: landing de alto impacto (estilo Tailwind UI / sitios premium de marcas)
El sitio **no** debe verse como plantilla genérica. Referencias de patrón (no copiar marcas):
- **Hero editorial a pantalla completa:** titular enorme en Fraunces con una palabra en itálica terracota, subtítulo corto, dos CTAs, y a un lado un **collage de formas orgánicas** (blobs de barro animados, ilustración de vasija con vapor) que luego se reemplaza por fotos reales.
- **Fondo con "mesh gradient" cálido** (crema → arena → toque terracota) + **grano de papel** sutil (SVG noise al 4–6 % de opacidad).
- **Header flotante tipo "glass"** (backdrop-blur, borde sutil) que se compacta al hacer scroll.
- **Marquee infinito** de palabras: "Café · Velas · Cerámica · Aromáticas · Textiles · Talleres ·" (CSS puro, se pausa con reduced-motion).
- **Bento grid** para los tres pilares (Café / Artesanías / Talleres): tarjetas de distintos tamaños, esquinas `rounded-[2rem]`, ilustraciones de línea, hover con elevación y leve rotación.
- **Sección historia a dos tonos** (fondo `olive-900`, texto crema) con cita grande sobre el significado del cántaro.
- **Bloque "La carta"** que muestra 3–4 productos destacados en tarjetas grandes con CTA "Ver toda la carta".
- **Próximo taller** como tarjeta tipo "ticket/evento" con fecha grande.
- **CTA final de visita** con mapa estilizado y horarios.
- **Animaciones:** entrada al hacer scroll con CSS `animation-timeline: view()` y fallback con IntersectionObserver; transiciones entre páginas con View Transitions de Astro. Todo desactivado con `prefers-reduced-motion`.
- **Detalles artesanales:** separadores SVG con trazo de hoja, subrayados "pintados a mano" en palabras clave, íconos de línea (lucide) con trazo 1.5.

### Reglas de contenido visual
- **No usar fotos de stock como si fueran del local.** Hasta tener fotos reales: ilustraciones SVG propias, formas y color.
- **No inventar testimonios, reseñas, cifras ni logos de clientes.**
- Fotos reales futuras: optimizar con `astro:assets` (`<Image>`, WebP/AVIF, tamaños responsive).

### Principios de interfaz
- **Mobile-first** (360–430 px primero); el impacto visual debe sentirse también en celular, no solo en desktop.
- Contraste AA, objetivos táctiles ≥ 44 px, texto base ≥ 16 px.

---

## 5. Arquitectura del sitio

| Ruta | Propósito | Fase |
|---|---|---|
| `/` | Landing de marca de alto impacto | 1 |
| `/menu` | **Carta digital del QR** | **1 — crítica** |
| `/contacto` | Dirección, mapa, horarios, WhatsApp, correo, redes | 1 |
| `/talleres` | Próximos talleres (landing sencilla) | 2 |
| `/artesanias` | Catálogo artesanal (landing sencilla) | 2 |
| `/404` | Página amigable con botón a la carta | 1 |

### Inicio (`/`) — secciones en orden
1. Header glass flotante (logo, Carta, Talleres, Contacto, botón "Ver la carta").
2. Hero editorial (ver §4).
3. Marquee de oferta.
4. Bento de pilares: Café · Artesanías · Talleres.
5. Destacados de la carta (lee `featured: true` del menú; si no hay reales, se oculta).
6. Historia / significado del cántaro.
7. Próximo taller (placeholder "Muy pronto" si no hay fecha).
8. Visítanos: horario de hoy, dirección, mapa, WhatsApp (se ocultan los campos `null`).
9. Footer con redes, correo y ©.
10. Botón flotante de WhatsApp (solo si hay número; **no** en `/menu`).

### Menú (`/menu`) — prioridad absoluta: claridad y velocidad
- La estética de la marca se mantiene, pero **sin animaciones pesadas ni hero grande**: el cliente vino a ver la carta.
- Header compacto (logo + nombre) y **barra de categorías sticky horizontal** con chips; scroll suave a la sección y scroll-spy que resalta la activa (script ligero, sin framework).
- Tarjeta de producto: nombre, descripción, precio COP grande, imagen opcional, insignias "Recomendado" y "Agotado" (atenuado, no oculto), variantes con su precio.
- Nota fija: **"Haz tu pedido en la barra o con nuestro personal 🤎"**.
- Pie: fecha de última actualización, horario de hoy, enlaces a inicio y redes.
- **Sin botones de pedir, carrito ni formularios.**
- Debe cargar bien con 3G: HTML estático, CSS mínimo, JS casi nulo.

---

## 6. Modelo de datos

### Ubicación
Content collections de Astro con esquema Zod:
- `src/content/menu/categories.json`
- `src/content/menu/products.json`
- `src/data/business.ts` (datos del negocio)

Los componentes **no** contienen datos. Si el esquema no se cumple, el build falla (protección contra errores de edición).

### Esquema (referencia)
```ts
// src/content.config.ts
const variant = z.object({ name: z.string(), priceCOP: z.number().int().positive() });

const product = z.object({
  id: z.string(),                       // kebab-case, estable
  name: z.string(),
  description: z.string().optional(),
  priceCOP: z.number().int().nonnegative(),
  categoryId: z.string(),
  image: z.string().nullable().optional(),   // ruta en src/assets/menu/
  available: z.boolean().default(true),
  featured: z.boolean().default(false),
  sortOrder: z.number().int(),
  variants: z.array(variant).optional(),
  allergens: z.array(z.string()).optional(),
  demo: z.boolean().default(false),     // true = dato de ejemplo
});

const category = z.object({
  id: z.string(), name: z.string(), description: z.string().optional(),
  icon: z.string().optional(), sortOrder: z.number().int(),
});
```

### Categorías iniciales (provisionales)
Cafés calientes · Cafés fríos · Aromáticas e infusiones · Otras bebidas · Tortas y postres · Especiales de Cántaro.

### Reglas
- **No hay carta aprobada:** productos de ejemplo con `demo: true`.
- **En producción (`import.meta.env.PROD`) los `demo: true` no se renderizan.** Categoría vacía → estado vacío "Estamos preparando esta sección ☕".
- Precio con `Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })` → `$ 8.500`. Nunca mostrar `0`.
- Todo acceso pasa por `src/lib/menu.ts` (`getMenu()`), para poder cambiar la fuente (Google Sheets, API, panel) **sin tocar componentes**.
- `business.ts`: campos pendientes en `null`; la interfaz **oculta** el bloque en vez de mostrar texto falso.

---

## 7. Stack técnico (decidido)

| Capa | Decisión | Por qué |
|---|---|---|
| Framework | **Astro (última versión estable) + TypeScript estricto** | Sitio de contenido: HTML estático, cero JS por defecto, SEO excelente, carga instantánea desde el QR |
| Estilos | **Tailwind CSS v4** (`@tailwindcss/vite`) con tokens en `@theme` | Velocidad para diseño de landing premium |
| Interactividad | Scripts nativos de Astro (`<script>`) — sin React | El menú solo necesita scroll-spy; menos JS = más rápido |
| Contenido | Content collections + Zod | Datos validados y separados del diseño |
| Imágenes | `astro:assets` | WebP/AVIF y tamaños responsive automáticos |
| Fuentes | Fontsource (autoalojadas) | Sin dependencias externas, mejor rendimiento |
| Íconos | `lucide` (SVG inline) | Ligeros y consistentes |
| Hosting | **Cloudflare Pages** — build `npm run build`, salida `dist` | $0, uso comercial permitido, CDN global, HTTPS |
| Dominio | `cantaroarte.com` (DNS ya en Cloudflare); `www` → raíz | — |
| Backend | **Ninguno en fase 1** | No hay pedidos ni pagos |
| Analítica | Cloudflare Web Analytics | Sin cookies |

### Por qué no SPA (React/TanStack, como generó Lovable)
Una SPA envía todo el JavaScript antes de mostrar la carta y necesita reglas de fallback para rutas. Con Astro, `/menu` es un HTML ya construido que abre al instante desde el QR, incluso con mala señal. Si en la fase 4 se necesita interactividad (pedidos), se agregan **islas** de React solo donde haga falta.

### Estructura de carpetas
```
cantaro-web/
├─ CLAUDE.md
├─ docs/CONTEXTO.md
├─ astro.config.mjs
├─ public/
│  ├─ brand/            # logo oficial, favicon, og-image
│  └─ robots.txt
├─ src/
│  ├─ assets/           # imágenes optimizables (menu/, local/)
│  ├─ components/
│  │  ├─ brand/         # Logo, LogoPlaceholder, LeafDivider, Grain
│  │  ├─ layout/        # SiteHeader, SiteFooter, WhatsAppFab, SEO
│  │  ├─ home/          # Hero, Marquee, PillarsBento, FeaturedMenu, Story, NextWorkshop, Visit
│  │  └─ menu/          # CategoryNav, CategorySection, ProductCard, PriceTag, Badge, EmptyState
│  ├─ content/menu/     # categories.json, products.json
│  ├─ content.config.ts
│  ├─ data/business.ts
│  ├─ layouts/BaseLayout.astro
│  ├─ lib/              # menu.ts, format.ts, schedule.ts (horario de hoy)
│  ├─ pages/            # index.astro, menu.astro, contacto.astro, 404.astro
│  └─ styles/global.css # Tailwind v4 + @theme + utilidades (grain, blobs)
└─ package.json
```

### Flujo de trabajo
```
VS Code + Claude ──git push──▶ GitHub (main) ──▶ Cloudflare Pages (build) ──▶ cantaroarte.com
                                   └─ rama dev ──▶ URL de vista previa *.pages.dev
```

---

## 8. Requisitos funcionales (MVP)

### Imprescindibles
- [ ] Diseño responsive, optimizado para celular.
- [ ] Ruta pública `/menu` generada como HTML estático.
- [ ] Menú por categorías con navegación sticky.
- [ ] Nombre, descripción y precio (COP) por producto; variantes.
- [ ] Estado "Agotado".
- [ ] Datos desacoplados de los componentes (`src/data/`).
- [ ] Productos demo ocultos en producción.
- [ ] Manejo de imagen ausente y de categorías vacías.
- [ ] Página 404 amigable.
- [ ] Identidad visual de Cántaro con tokens de diseño.
- [ ] HTTPS y dominio propio.

### Deseables
- [ ] Productos destacados ("Recomendado de la casa").
- [ ] Horario de hoy calculado según el día.
- [ ] Botón flotante de WhatsApp en el inicio (no en el menú).
- [ ] Metadatos SEO y vista previa al compartir.

### Fuera del alcance de la fase 1
Carrito, pagos, pedidos desde la mesa, domicilios, cuentas de cliente, fidelización, reservas pagas, POS, facturación electrónica, inventario en tiempo real, backend.

---

## 9. Requisitos no funcionales

- **Rendimiento:** Lighthouse móvil ≥ 90 en rendimiento y accesibilidad; imágenes en WebP con tamaño adecuado; JavaScript mínimo.
- **Accesibilidad:** HTML semántico, contraste AA, foco visible, textos alternativos, navegación por teclado.
- **Mantenimiento:** componentes reutilizables (`CategoryNav`, `CategorySection`, `ProductCard`, `PriceTag`, `Badge`, `SiteHeader`, `SiteFooter`, `EmptyState`).
- **Seguridad:** sin datos personales, sin secretos en el frontend.
- **SEO:** títulos y descripciones por página, URLs limpias.
- **Localización:** español de Colombia, COP, formato de hora `8:00 a. m.`.
- **Escalabilidad:** cambiar la fuente de datos sin rehacer la interfaz.

---

## 10. Relación con el POS e inventario

- El negocio usará un POS aparte (FloCafe, en el PC de caja) y un panel de ventas sobre Cloudflare.
- **Fase 1:** sitio y POS **independientes**; no integrar.
- **Futuro:** una sola fuente de productos y sincronización por API.
- No construir funciones de POS dentro del sitio.

---

## 11. Roadmap

1. **Etapa 1 — Sitio + menú QR (actual):** inicio, menú, contacto, dominio, QR impreso.
2. **Etapa 2 — Talleres y artesanías:** landings con fichas, fotos y contacto por WhatsApp.
3. **Etapa 3 — Edición sin código:** el menú se alimenta de Google Sheets o de un panel simple, para que la administradora cambie precios y disponibilidad desde el celular.
4. **Etapa 4 — Comercio e integraciones:** pedidos desde la mesa (`pedir.cantaroarte.com`), pagos, integración con POS.

---

## 12. Confirmado vs. pendiente

| Tema | Estado |
|---|---|
| Nombre CÁNTARO ARTE & DISEÑO | ✅ Confirmado |
| Concepto café + artesanías + talleres | ✅ Confirmado |
| Dominio `cantaroarte.com` | ✅ Confirmado |
| Correos `hola@` y `redes@` | ✅ Confirmado |
| Facebook e Instagram `cantaroarte` | ✅ Confirmado |
| Hosting Cloudflare Pages | ✅ Decidido |
| Stack (Astro + Tailwind v4 + Cloudflare Pages) | ✅ Decidido |
| TikTok | ⏳ Pendiente de crear |
| Logo final en PNG/SVG | ⏳ Pendiente |
| Paleta definitiva | ⏳ Validar contra el logo |
| Carta: categorías, productos, precios | ⏳ Pendiente |
| Fotos reales | ⏳ Pendiente |
| Pueblo, dirección y mapa | ⏳ Pendiente |
| Horarios | ⏳ Pendiente |
| WhatsApp del negocio | ⏳ Pendiente |
| Responsable de actualizar el menú | Fase 1: Jorge (repositorio). Fase 3: administradora (Sheets/panel) |

> **MCare:** línea de productos aromáticos en desarrollo. No incluirla en el menú ni en el sitio salvo instrucción explícita.

---

## 13. Criterios de aceptación del MVP

1. Al escanear el QR se abre `https://cantaroarte.com/menu` sin instalar nada ni iniciar sesión.
2. El menú se ve bien en celulares Android e iPhone comunes.
3. Categorías y productos sin errores; precios en formato `$ 8.500`.
4. La barra de categorías es cómoda con una mano.
5. Cambiar un precio y hacer push publica el cambio en ~1 minuto, **sin cambiar el QR**.
6. Usa colores, tipografías y tono de Cántaro.
7. **No hay productos ni precios ficticios publicados.**
8. Las imágenes no bloquean la lectura.
9. HTTPS, título, descripción y vista previa al compartir correctos.
10. `README.md` con: instalación, ejecución local, cómo editar `menu.ts`, cómo publicar y lista de datos pendientes.

---
