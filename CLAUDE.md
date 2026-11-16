# CLAUDE.md — Cántaro arte & diseño (cantaroarte.com)

Sitio web y menú QR de **Cántaro arte & diseño**, cafetería + artesanías + talleres en **Sibundoy, Putumayo (Colombia)**.
El contexto completo de negocio, diseño y alcance está en **`docs/CONTEXTO.md`** — léelo antes de cualquier tarea grande.

## Decisiones del dueño (16 nov 2026) — prevalecen sobre docs/CONTEXTO.md
- **Ubicación:** Sibundoy, Putumayo (Valle de Sibundoy).
- **Logo oficial:** existe en PNG → `src/assets/brand/logo-circular.png`. Usarlo tal cual; no crear logo provisional.
- **Banner** (`src/assets/brand/banner.png`): es una escena ilustrada, no una foto del local. Uso permitido: imagen Open Graph / decorativa, sin presentarla como foto real.
- **Paleta:** se agrega `leaf-500` (verde hoja del logo) como acento.
- **Supuestos en vez de huecos:** el dueño prefiere textos y datos de ejemplo verosímiles (horarios, dirección, WhatsApp, carta, taller) en lugar de bloques vacíos. Todo dato supuesto va **marcado en código** (`demo: true` en productos, comentario `// SUPUESTO` en `business.ts`) y listado en el README para reemplazarlo antes de publicar. Mientras se trabaja en local, los `demo` se muestran; la variable `PUBLIC_SHOW_DEMO` controla si se muestran en build.
- **Alcance:** el sitio es una landing completa del negocio; `/menu` es una sección más (la del QR). Fase 1 incluye `/`, `/menu`, `/artesanias`, `/talleres`, `/contacto` y `/404`. Artesanías y talleres viven en `src/content/{artesanias,talleres}/` y se leen vía `src/lib/catalog.ts`; preguntas frecuentes en `src/data/faq.ts`.
- **Imágenes provisionales (16 nov 2026):** se permiten fotos con licencia libre (Unsplash) de producto/detalle —nunca de personas, fachadas ni interiores que parezcan el local— y recortes del banner de marca (`src/assets/scenes/`). Toda imagen de terceros se registra en `CREDITS.md`. Prohibido usar recursos de los proyectos de referencia sin licencia (p. ej. el sitio con marca Starbucks).
- **Efectos:** `src/scripts/effects.ts` (sin dependencias): texto letra por letra, parallax, escena del cántaro ligada al scroll, historia con imagen fija. No agregar GSAP/Lenis; todo respeta `prefers-reduced-motion`.
- **Trabajo en `main`.** Primero todo en local; el despliegue a Cloudflare Pages se hace después.

## Objetivo actual (fase 1)
1. `/menu`: carta digital de solo lectura que se abre desde un QR impreso. **Es la prioridad.**
2. `/`: landing de marca de alto impacto visual (nivel Tailwind UI / sitio premium).
3. `/contacto` y `/404`.

## Stack
- Astro (estable más reciente) + TypeScript estricto, salida **estática**.
- Tailwind CSS v4 vía `@tailwindcss/vite`; tokens de marca en `@theme` dentro de `src/styles/global.css`.
- Content collections + Zod para el menú (`src/content/menu/*.json`, esquema en `src/content.config.ts`).
- Scripts nativos de Astro para interactividad. **No agregar React ni otros frameworks** salvo que se pida.
- Fuentes: Fontsource (Fraunces variable + Inter/Lato). Íconos: lucide (SVG).
- Deploy: Cloudflare Pages (`npm run build` → `dist`). Sin backend.

## Comandos
```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # genera dist/ (debe pasar sin errores ni warnings de tipos)
npm run preview
npx astro check    # verificación de tipos
```

## Reglas duras (no romper)
- La ruta **`/menu` es permanente** (está impresa en QR). Nunca renombrarla ni moverla.
- `/menu` es **solo lectura**: sin carrito, sin botones de pedir, sin formularios, sin login, sin pagos.
- Dirección, horarios, teléfono, productos y precios: solo como **supuestos marcados** (ver "Decisiones del dueño"), nunca como dato real sin marcar.
- Productos con `demo: true` **no se renderizan en producción** (`import.meta.env.PROD`) salvo que `PUBLIC_SHOW_DEMO=true`.
- Nunca mostrar precio `0`. Formato COP: `Intl.NumberFormat('es-CO', { style:'currency', currency:'COP', maximumFractionDigits:0 })`.
- Datos fuera de los componentes. Todo acceso al menú pasa por `src/lib/menu.ts`.
- Campos `null` en `src/data/business.ts` → el bloque correspondiente se **oculta**.
- No usar fotos de stock como si fueran del local. No rediseñar el logo oficial (`src/assets/brand/logo-circular.png`).
- Nunca inventar testimonios, reseñas ni cifras (esto no cambia con la política de supuestos).
- Respeto cultural: no atribuir productos a artesanos Kamëntšá o Inga ni usar sus símbolos sin confirmación del dueño.
- No incluir la línea MCare.

## Calidad
- Mobile-first (diseñar a 375 px primero). Objetivos táctiles ≥ 44 px, texto base ≥ 16 px, contraste AA.
- Lighthouse móvil ≥ 90 en Performance, Accessibility, Best Practices y SEO (sobre todo en `/menu`).
- Animaciones con CSS (`animation-timeline: view()` + fallback) y View Transitions; **todas** respetan `prefers-reduced-motion`.
- `/menu` sin animaciones pesadas: rapidez y legibilidad primero.
- HTML semántico, `lang="es-CO"`, foco visible, `alt` en imágenes.
- SEO por página: title, description, canonical, Open Graph (`og:image` en `public/brand/og.png`), JSON-LD `CafeOrCoffeeShop` en el inicio (omitir campos `null`).

## Convenciones
- Componentes `.astro` en PascalCase, agrupados por dominio (`brand/`, `layout/`, `home/`, `menu/`).
- Textos de interfaz en español de Colombia, tuteando, tono cálido y breve.
- Clases de Tailwind con tokens de marca (`bg-olive-900`, `text-clay-500`, `bg-cream-50`…); no usar colores HEX sueltos en componentes.
- Commits pequeños y descriptivos en español (`feat(menu): barra de categorías sticky`).

## Forma de trabajar
- Ante tareas grandes: primero propone un plan corto, luego implementa por partes.
- Después de cada cambio relevante: `npm run build` y `npx astro check` deben pasar.
- Si falta un dato real, no lo inventes: déjalo como pendiente y agrégalo a la lista de pendientes del README.
