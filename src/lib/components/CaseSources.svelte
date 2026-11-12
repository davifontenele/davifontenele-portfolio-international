<script lang="ts">
  import type { Source } from '$lib/i18n';
  import { useI18n } from '$lib/i18n';
  import { useFootnotes, noteId, firstRef } from './footnotes';

  /** Notas de rodapé do case: fontes citadas no texto, em fonte reduzida. */
  let { sources }: { sources: Source[] } = $props();
  const i18n = useI18n();
  const t = $derived(i18n.t);
  const fn = useFootnotes();
</script>

{#if fn && sources.length}
  <section class="sources" aria-labelledby="{fn.prefix}-sources-title">
    <h2 class="eyebrow" id="{fn.prefix}-sources-title">{t.ui.sources}</h2>
    <ol>
      {#each sources as s (s.id)}
        {@const n = fn.number(s.id)}
        <li id={noteId(fn.prefix, n)} tabindex="-1">
          <a
            class="back"
            href="#{fn.prefix}"
            aria-label={t.ui.backToText}
            title={t.ui.backToText}
            onclick={(e) => fn.jump(e, firstRef(n))}>[{n}]</a
          >
          <span class="body">
            <span class="pub">{s.publisher}</span>
            <span class="sep" aria-hidden="true">—</span>
            {#if s.url}
              <a class="title" href={s.url} target="_blank" rel="noopener noreferrer"
                ><cite>{s.title}</cite><span class="sr-only"> ({t.ui.opensInNewTab})</span></a
              >
            {:else}
              <cite class="title">{s.title}</cite>
            {/if}{#if s.date}<span class="date">, {s.date}</span>{/if}{#if s.note}<span
                class="note">. {s.note}</span
              >{/if}.
          </span>
        </li>
      {/each}
    </ol>
  </section>
{/if}

<style>
  .sources {
    margin-top: 4.5rem;
    padding-top: 1.75rem;
    border-top: 1px solid var(--line);
    max-width: 62rem;
  }
  /* Logo após depoimentos/referências, que já terminam com uma linha. */
  :global(.endorsements) + .sources {
    margin-top: 3.5rem;
    padding-top: 0;
    border-top: 0;
  }
  .sources h2 {
    margin: 0 0 1rem;
  }
  ol {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 0.45rem;
  }
  li {
    display: grid;
    grid-template-columns: 2.2rem minmax(0, 1fr);
    align-items: baseline;
    font-size: 0.75rem;
    line-height: 1.6;
    color: var(--fg-dim);
    border-radius: 4px;
    outline: none;
    scroll-margin: 6rem;
  }
  .back {
    color: rgba(255, 255, 255, 0.55);
    font-variant-numeric: tabular-nums;
    transition: color 200ms var(--ease-cine);
  }
  .back:hover,
  .back:focus-visible {
    color: #fff;
  }
  .pub {
    color: rgba(255, 255, 255, 0.78);
  }
  .sep {
    margin: 0 0.35em;
    color: var(--fg-faint);
  }
  cite {
    font-style: italic;
  }
  a.title {
    color: rgba(255, 255, 255, 0.78);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    transition: color 200ms var(--ease-cine), border-color 200ms var(--ease-cine);
  }
  a.title:hover {
    color: #fff;
    border-color: #fff;
  }
  /* Realce breve ao chegar na nota pelo [n] do texto. */
  li:global(.flash) {
    animation: flash 1.6s var(--ease-cine);
  }
  @keyframes flash {
    0%,
    30% {
      background: rgba(255, 255, 255, 0.1);
    }
    100% {
      background: transparent;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    li:global(.flash) {
      animation: none;
    }
  }
</style>
