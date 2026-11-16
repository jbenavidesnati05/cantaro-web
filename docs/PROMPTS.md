# Prompts para Claude en VS Code — Cántaro

Úsalos en orden, uno por sesión o fase. Antes de cada uno, Claude ya tiene `CLAUDE.md` cargado automáticamente.

---

## Fase 0 — Plan (usar en modo plan)
```
Lee CLAUDE.md y docs/CONTEXTO.md completos. Propón el plan de implementación del MVP
de Cántaro con la arquitectura definida (Astro + Tailwind v4 + content collections,
deploy en Cloudflare Pages). Lista archivos a crear, componentes, tokens de diseño y
orden de trabajo. No escribas código todavía.
```

## Fase 1 — Base del proyecto
```
Inicializa el proyecto Astro en esta carpeta según CLAUDE.md: TypeScript estricto,
Tailwind v4 con @tailwindcss/vite, tokens de marca en @theme (src/styles/global.css),
Fontsource (Fraunces variable + Inter), BaseLayout con SEO, content collections del menú
con esquema Zod y datos demo (demo: true), src/data/business.ts con campos pendientes
en null y src/lib (menu.ts, format.ts, schedule.ts). Verifica con npm run build y
npx astro check.
```

## Fase 2 — /menu (prioridad)
```
Construye /menu según docs/CONTEXTO.md §5 y §6: header compacto, barra de categorías
sticky con scroll-spy (script nativo, sin frameworks), ProductCard con precio COP,
insignias Recomendado/Agotado, variantes, estados vacíos, nota "Haz tu pedido en la
barra…" y pie con horario de hoy. Mobile-first a 375 px. Sin animaciones pesadas.
Objetivo Lighthouse móvil ≥ 95. Muéstrame cómo se ve con los datos demo en dev.
```

## Fase 3 — Landing de alto impacto (/)
```
Construye la home como landing premium nivel Tailwind UI siguiendo §4 y §5:
hero editorial con titular gigante en Fraunces (una palabra en itálica terracota),
mesh gradient cálido con grano de papel, blobs orgánicos animados con ilustración SVG
de vasija con vapor, header glass que se compacta al scroll, marquee de oferta,
bento grid de pilares con hover, destacados de la carta, historia en fondo olive-900,
tarjeta tipo ticket para el próximo taller, sección Visítanos y footer.
Animaciones con animation-timeline: view() + fallback y View Transitions; todo respeta
prefers-reduced-motion. No inventes datos ni uses fotos de stock.
```

## Fase 4 — Contacto, 404 y SEO
```
Crea /contacto y /404, completa SEO (title, description, canonical, Open Graph,
JSON-LD CafeOrCoffeeShop omitiendo campos null), favicon y robots.txt.
Corre un repaso de accesibilidad (contraste AA, foco visible, alt, objetivos ≥ 44 px).
```

## Fase 5 — README y despliegue
```
Escribe README.md con: instalación, desarrollo local, cómo agregar/editar productos
y precios en src/content/menu/, cómo marcar agotado/destacado, cómo publicar
(git push → Cloudflare Pages) y la lista de datos pendientes antes de publicar.
Confirma que npm run build genera dist/ sin errores.
```

---

### Configuración en Cloudflare Pages (manual, una sola vez)
1. Workers & Pages → Create → Pages → Connect to Git → repo `cantaro-web`.
2. Framework preset: **Astro** · Build command: `npm run build` · Output: `dist`.
3. Custom domains → `cantaroarte.com` y `www.cantaroarte.com`.
4. Activar Web Analytics.
