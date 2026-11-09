import { caseSlugs, type CaseSlug } from '$lib/data/slides';

export const SITE_URL = 'https://davifontenele.com';

export const locales = ['en', 'pt-BR'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

/** Segmento de URL de cada idioma. */
export const localeSegment: Record<Locale, string> = { en: 'en', 'pt-BR': 'pt' };
/** Valor de hreflang. */
export const hreflang: Record<Locale, string> = { en: 'en', 'pt-BR': 'pt-BR' };

/** Segmentos localizados das seções. */
export const sectionSegment = {
  work: { en: 'work', 'pt-BR': 'projetos' },
  about: { en: 'about', 'pt-BR': 'sobre' }
} as const satisfies Record<string, Record<Locale, string>>;

export const STORAGE_KEY = 'df-lang';

/** Imagem de compartilhamento (Open Graph / Twitter) de cada idioma — 1200×630. */
export const ogImage: Record<Locale, { url: string; width: number; height: number }> = {
  en: { url: `${SITE_URL}/images/social/davifontenele-og_en.jpg`, width: 1200, height: 630 },
  'pt-BR': { url: `${SITE_URL}/images/social/davifontenele-og_pt.jpg`, width: 1200, height: 630 }
};

export function localeFromSegment(seg: string | undefined): Locale | null {
  return (Object.keys(localeSegment) as Locale[]).find((l) => localeSegment[l] === seg) ?? null;
}

/** Destino lógico de uma URL: home, um case ou About. */
export type Route = { kind: 'home' } | { kind: 'case'; slug: CaseSlug } | { kind: 'about' };

/** Interpreta `[[section]]/[[slug]]` para o idioma dado. `null` = 404. */
export function parseRoute(
  locale: Locale,
  section: string | undefined,
  slug: string | undefined
): Route | null {
  if (!section) return slug ? null : { kind: 'home' };
  if (section === sectionSegment.about[locale]) return slug ? null : { kind: 'about' };
  if (section === sectionSegment.work[locale] && slug && (caseSlugs as readonly string[]).includes(slug))
    return { kind: 'case', slug: slug as CaseSlug };
  return null;
}

/** Caminho localizado (sem domínio) para um destino. */
export function pathFor(locale: Locale, route: Route): string {
  const base = `/${localeSegment[locale]}`;
  if (route.kind === 'home') return base;
  if (route.kind === 'about') return `${base}/${sectionSegment.about[locale]}`;
  return `${base}/${sectionSegment.work[locale]}/${route.slug}`;
}

/** Todas as rotas pré-renderizadas, por idioma. */
export function allRoutes(): Route[] {
  return [
    { kind: 'home' },
    ...caseSlugs.map((slug) => ({ kind: 'case' as const, slug })),
    { kind: 'about' }
  ];
}
