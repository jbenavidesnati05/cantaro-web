/**
 * Efectos de la portada, sin dependencias.
 * Todo se desactiva con prefers-reduced-motion (el contenido queda visible y estático).
 *
 *  [data-split]          → el texto entra letra por letra (accesible: aria-label con el texto original)
 *  [data-parallax="0.2"] → desplazamiento vertical según el scroll (positivo = más lento)
 *  [data-pour]           → escena fija ligada al scroll: expone --tilt, --stream, --fill, --steam y data-step
 *  [data-swap]           → historia: el texto activo cambia la imagen fija de al lado
 */

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
/** Mapea p del rango [a, b] a [0, 1]. */
const range = (p: number, a: number, b: number) => clamp((p - a) / (b - a));

// ── Texto letra por letra ────────────────────────────────────────────────
function splitText(el: HTMLElement) {
  el.setAttribute('aria-label', el.textContent?.replace(/\s+/g, ' ').trim() ?? '');
  let i = 0;
  const walk = (node: Node) => {
    for (const child of [...node.childNodes]) {
      if (child.nodeType === Node.TEXT_NODE) {
        const frag = document.createDocumentFragment();
        for (const word of (child.textContent ?? '').split(/(\s+)/)) {
          if (!word) continue;
          if (/^\s+$/.test(word)) {
            frag.append(' ');
            continue;
          }
          const w = document.createElement('span');
          w.className = 'split-word';
          w.setAttribute('aria-hidden', 'true');
          for (const ch of word) {
            const c = document.createElement('span');
            c.className = 'split-char';
            c.style.setProperty('--i', String(i++));
            c.textContent = ch;
            w.append(c);
          }
          frag.append(w);
        }
        child.replaceWith(frag);
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        walk(child);
      }
    }
  };
  walk(el);
  el.classList.add('is-split');
}

// ── Bucle de scroll compartido ───────────────────────────────────────────
type Tick = () => void;
const ticks: Tick[] = [];
let queued = false;
function onFrame() {
  queued = false;
  for (const t of ticks) t();
}
function request() {
  if (!queued) {
    queued = true;
    requestAnimationFrame(onFrame);
  }
}

function parallax(els: HTMLElement[]) {
  ticks.push(() => {
    const vh = innerHeight;
    for (const el of els) {
      const r = el.parentElement!.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) continue;
      const speed = Number(el.dataset.parallax) || 0.15;
      const offset = (r.top + r.height / 2 - vh / 2) * speed;
      el.style.translate = `0 ${offset.toFixed(1)}px`;
    }
  });
}

function pour(scene: HTMLElement) {
  const steps = Number(scene.dataset.steps) || 3;
  ticks.push(() => {
    const r = scene.getBoundingClientRect();
    const total = r.height - innerHeight;
    if (r.bottom < 0 || r.top > innerHeight) return;
    const p = clamp(-r.top / total);
    scene.style.setProperty('--p', p.toFixed(4));
    scene.style.setProperty('--tilt', range(p, 0.05, 0.35).toFixed(4));
    scene.style.setProperty('--stream', (range(p, 0.28, 0.4) - range(p, 0.78, 0.86)).toFixed(4));
    scene.style.setProperty('--fill', range(p, 0.35, 0.8).toFixed(4));
    scene.style.setProperty('--steam', range(p, 0.82, 0.95).toFixed(4));
    scene.dataset.step = String(Math.min(steps - 1, Math.floor(p * steps * 0.999)));
  });
}

function swap(root: HTMLElement) {
  const texts = [...root.querySelectorAll<HTMLElement>('[data-swap-text]')];
  const imgs = [...root.querySelectorAll<HTMLElement>('[data-swap-img]')];
  const set = (i: number) => imgs.forEach((img, j) => img.toggleAttribute('data-active', j <= i));
  set(0);
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) if (e.isIntersecting) set(texts.indexOf(e.target as HTMLElement));
    },
    { rootMargin: '-45% 0px -45% 0px' },
  );
  texts.forEach((t) => io.observe(t));
}

// ── Inicio ───────────────────────────────────────────────────────────────
if (!reduce) {
  document.querySelectorAll<HTMLElement>('[data-split]').forEach(splitText);
  const px = [...document.querySelectorAll<HTMLElement>('[data-parallax]')];
  if (px.length) parallax(px);
  document.querySelectorAll<HTMLElement>('[data-pour]').forEach(pour);
  addEventListener('scroll', request, { passive: true });
  addEventListener('resize', request);
  request();
}
// La historia funciona también con movimiento reducido (sin transiciones, vía CSS).
document.querySelectorAll<HTMLElement>('[data-swap]').forEach(swap);
