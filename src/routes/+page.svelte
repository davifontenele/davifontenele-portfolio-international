<script lang="ts">
  import { SITE_URL, STORAGE_KEY, ogImage } from '$lib/i18n/config';
  import { en } from '$lib/i18n/en';

  const og = ogImage.en;

  /**
   * Raiz `/`: página mínima e estática.
   * Respeita o idioma escolhido antes pelo usuário (localStorage); senão, inglês.
   * Nunca deduz idioma por geolocalização. Sem JS, o meta refresh leva a /en.
   */
  const redirect = `<script>(function(){var p='/en';try{if(localStorage.getItem('${STORAGE_KEY}')==='pt-BR')p='/pt';}catch(e){}location.replace(p+location.search+location.hash);})();<\/script>`;
</script>

<svelte:head>
  <title>Davi Fontenele</title>
  <meta name="robots" content="noindex, follow" />
  <link rel="canonical" href="{SITE_URL}/en" />
  <!-- Quem compartilha o domínio puro recebe a versão padrão (inglês). -->
  <meta property="og:site_name" content={en.meta.siteName} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="{SITE_URL}/en" />
  <meta property="og:locale" content={en.meta.ogLocale} />
  <meta property="og:title" content={en.meta.homeTitle} />
  <meta property="og:description" content={en.meta.homeDescription} />
  <meta property="og:image" content={og.url} />
  <meta property="og:image:width" content={String(og.width)} />
  <meta property="og:image:height" content={String(og.height)} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:image" content={og.url} />
  {@html redirect}
  <noscript><meta http-equiv="refresh" content="0; url=/en" /></noscript>
</svelte:head>

<p class="root-links">
  <a href="/en" hreflang="en">English</a> · <a href="/pt" hreflang="pt-BR">Português</a>
</p>

<style>
  .root-links {
    position: fixed;
    inset: auto 0 2rem 0;
    text-align: center;
    font-size: 0.8rem;
    color: var(--fg-faint);
  }
</style>
