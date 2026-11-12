<script lang="ts">
  import { whatsappUrl } from '$lib/data/slides';
  import { useI18n, locales, localeSegment, hreflang, type Locale } from '$lib/i18n';

  type Props = {
    onWork: () => void;
    onAbout: () => void;
    onLocale: (l: Locale) => void;
    /** URL equivalente da tela atual em outro idioma (funciona sem JS). */
    hrefFor: (l: Locale) => string;
    workHref: string;
    aboutHref: string;
    /** Modo vídeo: interface fora do alcance do teclado e leitores de tela. */
    inert?: boolean;
  };
  let { onWork, onAbout, onLocale, hrefFor, workHref, aboutHref, inert = false }: Props = $props();
  const i18n = useI18n();
  const t = $derived(i18n.t);

  /** Clique normal fica na experiência; Cmd/Ctrl/nova aba seguem o link. */
  function intercept(e: MouseEvent, fn: () => void) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    fn();
  }
</script>

<nav class="menu chrome" {inert} aria-label={t.nav.menuLabel}>
  <a href={workHref} onclick={(e) => intercept(e, onWork)}>{t.nav.work}</a>
  <a href={aboutHref} onclick={(e) => intercept(e, onAbout)}>{t.nav.about}</a>
  <a href={whatsappUrl(t.whatsappMessage)} target="_blank" rel="noopener noreferrer">{t.nav.contact}</a>

  <span class="lang" role="group" aria-label={t.nav.languageLabel}>
    {#each locales as l, i (l)}
      {#if i > 0}<span class="sep" aria-hidden="true">/</span>{/if}
      {#if l === i18n.locale}
        <span class="on" aria-current="true" lang={hreflang[l]}>{localeSegment[l].toUpperCase()}</span>
      {:else}
        <a
          href={hrefFor(l)}
          hreflang={hreflang[l]}
          lang={hreflang[l]}
          aria-label={t.nav.switchTo}
          onclick={(e) => intercept(e, () => onLocale(l))}>{localeSegment[l].toUpperCase()}</a
        >
      {/if}
    {/each}
  </span>
</nav>

<style>
  .menu {
    position: fixed;
    top: var(--safe-top);
    right: var(--gutter);
    z-index: 40;
    display: flex;
    align-items: baseline;
    gap: 1.5rem;
    font-family: var(--font-ui);
    font-weight: 400;
    font-size: 0.8125rem;
    letter-spacing: 0.01em;
    mix-blend-mode: difference;
  }
  .menu a {
    color: rgba(255, 255, 255, 0.62);
    padding: 2px 0;
    white-space: nowrap;
    transition: opacity 200ms var(--ease-cine), color 200ms var(--ease-cine);
  }
  .menu a:hover,
  .menu a:focus-visible {
    color: #fff;
  }
  .lang {
    display: inline-flex;
    gap: 0.35rem;
    font-size: 0.75rem;
    letter-spacing: 0.08em;
  }
  .lang .on {
    color: #fff;
  }
  .sep {
    color: rgba(255, 255, 255, 0.3);
  }
  @media (max-width: 640px) {
    .menu {
      gap: 0.9rem;
      font-size: 0.72rem;
    }
    .lang {
      font-size: 0.68rem;
    }
  }
</style>
