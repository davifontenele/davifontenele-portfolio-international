<script lang="ts">
  import { SITE_URL, STORAGE_KEY } from '$lib/i18n/config';

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
