import { getContext, setContext } from 'svelte';

/**
 * Notas de rodapé do case aberto (estilo Wikipédia).
 * CaseDetails publica a numeração; RichText e CaseSources a consomem.
 */
export type Footnotes = {
  /** Número da fonte (1…n) ou 0 se o id não existe. */
  number: (id: string) => number;
  /** Prefixo único dos ids de âncora (por case). */
  readonly prefix: string;
  /** Rola suavemente até o elemento e move o foco para ele. */
  jump: (e: MouseEvent, target: string | HTMLElement | null) => void;
};

const KEY = Symbol('footnotes');

export function provideFootnotes(fn: Footnotes) {
  setContext(KEY, fn);
}
export function useFootnotes(): Footnotes | undefined {
  return getContext<Footnotes | undefined>(KEY);
}

/** Âncora da nota n. */
export const noteId = (prefix: string, n: number) => `${prefix}-fn-${n}`;

/** Primeira citação da nota n no texto (para "voltar ao texto"). */
export const firstRef = (n: number) =>
  document.querySelector<HTMLElement>(`.details a[data-fn="${n}"]`);

/**
 * Pula para uma âncora dentro do painel rolável sem passar pelo roteador
 * (o hash não entra na URL nem no histórico). Sem JS, o href funciona sozinho.
 */
export function jumpTo(e: MouseEvent, target: string | HTMLElement | null, reduced: boolean) {
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
  const el = typeof target === 'string' ? document.getElementById(target) : target;
  if (!el) return;
  e.preventDefault();
  el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });
  el.focus({ preventScroll: true });
  el.classList.remove('flash');
  void el.offsetWidth; // reinicia a animação
  el.classList.add('flash');
}
