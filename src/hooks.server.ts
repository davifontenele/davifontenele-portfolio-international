import type { Handle } from '@sveltejs/kit';
import { hreflang, localeFromSegment } from '$lib/i18n/config';

/** Grava o idioma correto em <html lang> já no HTML pré-renderizado. */
export const handle: Handle = ({ event, resolve }) => {
  const locale = localeFromSegment(event.url.pathname.split('/')[1]);
  const lang = locale ? hreflang[locale] : 'en';
  return resolve(event, {
    transformPageChunk: ({ html }) => html.replace('%lang%', lang)
  });
};
