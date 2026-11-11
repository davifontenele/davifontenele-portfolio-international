<script lang="ts">
  import type { CaseSlug, Slide } from '$lib/data/slides';
  import PillButton from './PillButton.svelte';
  import CaseBlocks from './CaseBlocks.svelte';
  import RichText from './RichText.svelte';
  import CaseEndorsements from './CaseEndorsements.svelte';
  import { nav } from '$lib/stores/nav.svelte';
  import { useI18n } from '$lib/i18n';

  type Props = { slide: Slide };
  let { slide }: Props = $props();
  const i18n = useI18n();
  const t = $derived(i18n.t);
  const c = $derived(t.cases[slide.slug as CaseSlug]);

  const overview = $derived(c.sections.find((s) => s.id === 'overview'));
  const sections = $derived(c.sections.filter((s) => s.id !== 'overview'));
  /** Contexto e desafio lado a lado (como no .xyz); o resto em largura de leitura. */
  const half = (id: string) => id === 'context' || id === 'challenge';
  const overviewParas = $derived(
    overview?.blocks.flatMap((b) => (b.type === 'p' ? [b.text] : [])) ?? []
  );
</script>

<article class="details" aria-label={t.ui.fullCaseRegion(c.name)}>
  <!-- Depoimento marcado com `highlight`: primeira coisa do detalhamento. -->
  <CaseEndorsements data={c.endorsements} placement="opening" />
  {#if overview}
    <header class="lead">
      <h2 class="eyebrow">{overview.heading}</h2>
      {#if overviewParas[0]}<p class="short"><RichText text={overviewParas[0]} /></p>{/if}
      {#each overviewParas.slice(1) as p, i (i)}
        <p class="body-text more"><RichText text={p} /></p>
      {/each}
    </header>
  {/if}

  <div class="grid">
    {#each sections as s (s.id)}
      <section class:span={!half(s.id)} class:wide={s.id === 'work'}>
        <h2 class="eyebrow">{s.heading}</h2>
        <CaseBlocks blocks={s.blocks} />
      </section>
    {/each}

    <section class="span">
      <h2 class="eyebrow">{t.ui.expertise}</h2>
      <ul class="skills">
        {#each c.expertise as s (s)}
          <li>{s}</li>
        {/each}
      </ul>
    </section>
  </div>

  {#if slide.media?.length}
    <section class="media">
      <h2 class="eyebrow">{t.ui.gallery}</h2>
      <div class="media-grid">
        {#each slide.media as m, i (m.src)}
          <figure>
            {#if m.kind === 'image'}
              <img src={m.src} alt={c.mediaAlt?.[i] ?? ''} loading="lazy" decoding="async" />
            {:else}
              <video src={m.src} muted loop playsinline preload="none" aria-label={c.mediaAlt?.[i] ?? ''}></video>
            {/if}
          </figure>
        {/each}
      </div>
    </section>
  {/if}

  <!-- Fecho do case: depoimentos e/ou referências (só aparece se houver conteúdo). -->
  <CaseEndorsements data={c.endorsements} />

  <footer class="foot">
    {#each slide.links ?? [] as link (link.href)}
      <PillButton href={link.href} label={`${t.links[link.label]} (${t.ui.opensInNewTab})`}>
        {t.links[link.label]}
      </PillButton>
    {/each}
    <PillButton variant="ghost" onclick={() => nav.closeCase()}>
      {t.ui.backToFullscreen}
    </PillButton>
    {#if nav.index < nav.total - 1}
      <PillButton variant="ghost" onclick={() => nav.go(1)}>
        {t.ui.next} <span aria-hidden="true">→</span>
      </PillButton>
    {/if}
  </footer>
</article>

<style>
  .details {
    max-width: 72rem;
    padding: 0 0 6rem;
  }
  .lead {
    padding: 2.5rem 0 3.5rem;
    border-top: 1px solid var(--line);
    margin-top: 2rem;
  }
  .lead h2 {
    margin: 0;
  }
  .short {
    font-family: var(--font-ui);
    font-weight: 200;
    font-size: clamp(1.15rem, 2.2vw, 1.9rem);
    line-height: 1.35;
    color: #fff;
    margin: 0.9rem 0 0;
    max-width: 46ch;
  }
  .more {
    margin: 1.25rem 0 0;
    max-width: 62ch;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 3rem 4rem;
  }
  .grid .span {
    grid-column: 1 / -1;
    max-width: 62ch;
  }
  .grid .wide {
    max-width: none;
  }
  .grid h2 {
    margin: 0 0 0.9rem;
  }
  .skills {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 6px 8px;
    max-width: none;
  }
  .skills li {
    font-size: 0.75rem;
    letter-spacing: 0.02em;
    color: rgba(255, 255, 255, 0.72);
    border: 1px solid var(--line);
    border-radius: 999px;
    padding: 4px 14px;
  }
  .media {
    margin-top: 4rem;
  }
  .media-grid {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
  }
  figure {
    margin: 0;
  }
  figure img,
  figure video {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid var(--line);
  }
  .foot {
    margin-top: 4rem;
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
  }
  @media (max-width: 860px) {
    .grid {
      grid-template-columns: 1fr;
      gap: 2.25rem;
    }
    .media-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
