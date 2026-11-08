import { allRoutes, hreflang, locales, pathFor, SITE_URL } from '$lib/i18n/config';

export const prerender = true;

/** Sitemap com alternâncias hreflang por URL. */
export function GET() {
  const urls = locales.flatMap((locale) =>
    allRoutes().map((route) => {
      const alts = locales
        .map(
          (l) =>
            `    <xhtml:link rel="alternate" hreflang="${hreflang[l]}" href="${SITE_URL}${pathFor(l, route)}"/>`
        )
        .concat(
          `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}${pathFor('en', route)}"/>`
        )
        .join('\n');
      return `  <url>\n    <loc>${SITE_URL}${pathFor(locale, route)}</loc>\n${alts}\n  </url>`;
    })
  );
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}
