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
    // Fontes: toda citação precisa existir; toda fonte precisa ser citada; EN = PT.
    for (const [loc, d] of [['EN', a], ['PT', b]] as const) {
      const c = d.cases[slug];
      const ids = (c.sources ?? []).map((x) => x.id);
      const cited = citationOrder(caseTexts(c));
      const unknown = cited.filter((id) => !ids.includes(id));
      const unused = ids.filter((id) => !cited.includes(id));
      if (unknown.length) issues.push(`${slug} (${loc}): citação sem fonte — [^${unknown.join('], [^')}]`);
      if (unused.length) issues.push(`${slug} (${loc}): fonte nunca citada — ${unused.join(', ')}`);
    }
    const srcIds = (d: typeof a) => (d.cases[slug].sources ?? []).map((x) => x.id).sort().join(',');
    if (srcIds(a) !== srcIds(b)) issues.push(`${slug}: fontes diferentes entre EN e PT`);
    const refs = (e: typeof ea) => e?.references?.length ?? 0;
    if (refs(ea) !== refs(eb))
      issues.push(`${slug}: ${refs(ea)} referência(s) em EN e ${refs(eb)} em PT`);
  }
  return issues;
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

export type RichSegment =
  | { kind: 'text'; text: string }
  | { kind: 'strong'; text: string }
  | { kind: 'cite'; id: string };

/** Marcador de citação no texto: [^id] */
export const CITE_RE = /\[\^([\w-]+)\]/g;

/** Divide "texto com **negrito** e citação[^id]" em segmentos, sem HTML. */
export function richSegments(text: string): RichSegment[] {
  return text
    .split(/(\*\*[^*]+\*\*|\[\^[\w-]+\])/g)
    .filter(Boolean)
    .map((s): RichSegment => {
      if (s.startsWith('**') && s.endsWith('**')) return { kind: 'strong', text: s.slice(2, -2) };
      const m = /^\[\^([\w-]+)\]$/.exec(s);
      if (m) return { kind: 'cite', id: m[1] };
      return { kind: 'text', text: s };
    });
}

/** Remove marcadores [^id] (para metadados e textos sem notas). */
export const stripCites = (text: string) => text.replace(CITE_RE, '');

/** Todos os textos de um case, na ordem de leitura — define a numeração das notas. */
export function caseTexts(c: Dictionary['cases'][keyof Dictionary['cases']]): string[] {
  return c.sections.flatMap((sec) =>
    sec.blocks.flatMap((b) =>
      b.type === 'list' ? b.items : b.type === 'projects' ? [] : [b.text]
    )
  );
}

/** Ids citados, na ordem da primeira ocorrência. */
export function citationOrder(texts: string[]): string[] {
  const order: string[] = [];
  for (const t of texts)
    for (const m of t.matchAll(CITE_RE)) if (!order.includes(m[1])) order.push(m[1]);
  return order;
}

// Roda ao carregar o módulo — fica no fim, depois de todas as declarações.
if (import.meta.env.DEV || import.meta.env.SSR) {
  const issues = endorsementMismatches();
  if (issues.length) {
    console.warn(
      `\n⚠  Depoimentos, referências ou fontes com problema:\n${issues.map((i) => `   • ${i}`).join('\n')}\n`
    );
  }
}
