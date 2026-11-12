import { getContext, setContext } from 'svelte';
import { en } from './en';
import { ptBR } from './pt-BR';
import type { Dictionary } from './types';
import type { Locale } from './config';

export * from './config';
export type * from './types';

/** `satisfies` garante, em tempo de compilação, um dicionário completo por idioma. */
export const dictionaries = { en, 'pt-BR': ptBR } satisfies Record<Locale, Dictionary>;

/**
 * Confere se EN e PT têm os mesmos depoimentos e referências em cada case.
 * Os tipos não conseguem garantir isso (as listas são opcionais), então a
 * diferença é avisada no terminal do `pnpm dev` / `pnpm build` (e no log do Vercel).
 */
export function endorsementMismatches(): string[] {
  const issues: string[] = [];
  const [a, b] = [dictionaries.en, dictionaries['pt-BR']];
  for (const slug of Object.keys(a.cases) as (keyof typeof a.cases)[]) {
    const ea = a.cases[slug].endorsements;
    const eb = b.cases[slug].endorsements;
    const names = (e: typeof ea) => (e?.testimonials ?? []).map((t) => t.name);
    const onlyEn = names(ea).filter((n) => !names(eb).includes(n));
    const onlyPt = names(eb).filter((n) => !names(ea).includes(n));
    if (onlyEn.length) issues.push(`${slug}: depoimento só em EN — ${onlyEn.join(', ')}`);
    if (onlyPt.length) issues.push(`${slug}: depoimento só em PT — ${onlyPt.join(', ')}`);
    const hl = (e: typeof ea) => (e?.testimonials ?? []).filter((t) => t.highlight).map((t) => t.name).join(',');
    if (!onlyEn.length && !onlyPt.length && hl(ea) !== hl(eb))
      issues.push(`${slug}: destaque (highlight) diferente entre EN e PT`);
    const refs = (e: typeof ea) => e?.references?.length ?? 0;
    if (refs(ea) !== refs(eb))
      issues.push(`${slug}: ${refs(ea)} referência(s) em EN e ${refs(eb)} em PT`);
  }
  return issues;
}

if (import.meta.env.DEV || import.meta.env.SSR) {
  const issues = endorsementMismatches();
  if (issues.length) {
    console.warn(
      `\n⚠  Depoimentos/referências diferentes entre EN e PT:\n${issues.map((i) => `   • ${i}`).join('\n')}\n`
    );
  }
}

export type I18n = { readonly locale: Locale; readonly t: Dictionary };

const KEY = Symbol('i18n');

/**
 * Publica o idioma atual para os componentes.
 * Recebe um getter para que a troca de idioma seja reativa sem remontar nada.
 */
export function provideI18n(getLocale: () => Locale): I18n {
  const ctx: I18n = {
    get locale() {
      return getLocale();
    },
    get t() {
      return dictionaries[getLocale()];
    }
  };
  setContext(KEY, ctx);
  return ctx;
}

export function useI18n(): I18n {
  const ctx = getContext<I18n>(KEY);
  if (!ctx) throw new Error('useI18n() fora de provideI18n()');
  return ctx;
}

/** Divide "texto com **negrito**" em segmentos, sem HTML. */
export function richSegments(text: string): { text: string; strong: boolean }[] {
  return text
    .split(/(\*\*[^*]+\*\*)/g)
    .filter(Boolean)
    .map((s) =>
      s.startsWith('**') && s.endsWith('**')
        ? { text: s.slice(2, -2), strong: true }
        : { text: s, strong: false }
    );
}
