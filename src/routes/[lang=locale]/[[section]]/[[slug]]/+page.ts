import { error } from '@sveltejs/kit';
import {
  allRoutes,
  locales,
  localeFromSegment,
  localeSegment,
  parseRoute,
  pathFor
} from '$lib/i18n/config';
import type { EntryGenerator, PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
  const locale = localeFromSegment(params.lang);
  if (!locale) error(404, 'Not found');
  const route = parseRoute(locale, params.section, params.slug);
  if (!route) error(404, 'Not found');
  return { locale, route };
};

/** Pré-renderiza todas as combinações idioma × rota. */
export const entries: EntryGenerator = () =>
  locales.flatMap((locale) =>
    allRoutes().map((route) => {
      const [, , section, slug] = pathFor(locale, route).split('/');
      return { lang: localeSegment[locale], section, slug };
    })
  );
