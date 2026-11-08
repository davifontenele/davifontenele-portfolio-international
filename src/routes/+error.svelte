<script lang="ts">
  import { page } from '$app/state';
  import { dictionaries, localeFromSegment, localeSegment, defaultLocale } from '$lib/i18n';

  // O idioma vem do primeiro segmento quando reconhecível; senão, inglês.
  const locale = $derived(localeFromSegment(page.url.pathname.split('/')[1]) ?? defaultLocale);
  const t = $derived(dictionaries[locale]);
</script>

<svelte:head>
  <title>{page.status} — {t.notFound.title} | Davi Fontenele</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<main class="nf">
  <p class="eyebrow">{page.status}</p>
  <h1 class="case-title">{t.notFound.title}</h1>
  <p class="body-text">{t.notFound.body}</p>
  <a class="back" href="/{localeSegment[locale]}">{t.notFound.back}</a>
</main>

<style>
  .nf {
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: var(--gutter) var(--gutter) calc(var(--safe-bottom) + 3rem);
    max-width: 60rem;
  }
  .nf .case-title {
    font-size: clamp(3rem, 9vw, 8rem);
  }
  .back {
    margin-top: 1.5rem;
    align-self: flex-start;
    border: 1px solid rgba(255, 255, 255, 0.28);
    border-radius: 999px;
    padding: 6px 20px;
    font-size: 0.875rem;
    line-height: 1.9;
  }
  .back:hover {
    background: #fff;
    color: #060606;
  }
</style>
