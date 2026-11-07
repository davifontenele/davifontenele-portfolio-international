/** Utilitários de movimento, easing e preferências do usuário. */

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Observa a media query e chama o callback quando muda. */
export function watchReducedMotion(cb: (reduced: boolean) => void): () => void {
  if (typeof window === 'undefined') return () => {};
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  const handler = () => cb(mq.matches);
  mq.addEventListener('change', handler);
  return () => mq.removeEventListener('change', handler);
}

/** Easing cinematográfico (expo out) — usado nas transições de case. */
export const easeOutExpo = (t: number): number => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

/** Easing suave nos dois extremos — usado nas máscaras tipográficas. */
export const easeInOutCubic = (t: number): number =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export const clamp = (v: number, min = 0, max = 1): number => Math.min(max, Math.max(min, v));

/** Detecta suporte a WebGL sem manter o contexto aberto. */
export function supportsWebGL(): boolean {
  if (typeof document === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    const gl = (canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
    if (!gl) return false;
    const lose = gl.getExtension('WEBGL_lose_context');
    lose?.loseContext();
    return true;
  } catch {
    return false;
  }
}

/** Heurística para servir vídeos mais leves / UI touch. */
export function isCoarsePointer(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(pointer: coarse)').matches;
}

/**
 * Prefere o corte mobile quando o dispositivo é touch OU a viewport é estreita.
 * (pointer: coarse sozinho falha em alguns iPads / DevTools sem touch).
 */
export function preferMobileVideo(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    isCoarsePointer() ||
    window.matchMedia('(max-width: 900px)').matches ||
    (navigator.maxTouchPoints ?? 0) > 0
  );
}
