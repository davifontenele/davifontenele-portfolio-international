import { getContext, setContext } from 'svelte';
import { en } from './en';
import { ptBR } from './pt-BR';
import type { Dictionary } from './types';
import type { Locale } from './config';

export * from './config';
export type * from './types';

/** `satisfies` garante, em tempo de compilação, um dicionário completo por idioma. */
export const dictionaries = { en, 'pt-BR': ptBR } satisfies Record<Locale, Dictionary>;

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
