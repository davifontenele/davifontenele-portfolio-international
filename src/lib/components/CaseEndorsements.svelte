<script lang="ts">
  import type { Endorsements, Testimonial } from '$lib/i18n';
  import { useI18n } from '$lib/i18n';

  /**
   * Depoimentos e/ou referências do case.
   * - `closing` (padrão): fecho do case — depoimentos comuns + referências.
   * - `opening`: só os depoimentos com `highlight: true`, no topo do detalhamento.
   * Não renderiza nada se não houver conteúdo — nunca exibe placeholder.
   */
  type Props = { data?: Endorsements; placement?: 'opening' | 'closing' };
  let { data, placement = 'closing' }: Props = $props();
  const i18n = useI18n();
  const t = $derived(i18n.t);
  const opening = $derived(placement === 'opening');

  const testimonials = $derived(
    (data?.testimonials ?? []).filter((p) => (opening ? p.highlight : !p.highlight))
  );
  const references = $derived(opening ? [] : (data?.references ?? []));
  const featured = $derived(testimonials[0]);
  const others = $derived(testimonials.slice(1));

  /** Depoimentos longos usam uma escala menor para não ocupar mais de uma tela. */
  const LONG = 220;
  const isLong = (q: string) => q.length > LONG;

  const pad = (n: number) => String(n).padStart(2, '0');
  const initials = (name: string) =>
    name
      .split(/\s+/)
      .filter(Boolean)
      .map((w) => w[0])
      .filter((_, i, a) => i === 0 || i === a.length - 1)
      .join('')
      .toUpperCase();
  const domain = (url: string) => {
    try {
      return new URL(url).hostname.replace(/^www\./, '');
    } catch {
      return '';
    }
  };

  /** Revela o bloco quando entra na tela (sem efeito com movimento reduzido). */
  function reveal(node: HTMLElement) {
    if (typeof IntersectionObserver === 'undefined') {
      node.classList.add('in');
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            node.classList.add('in');
            io.disconnect();
          }
        }
      },
      { threshold: 0.18 }
    );
    io.observe(node);
    return { destroy: () => io.disconnect() };
  }
</script>

{#snippet attribution(p: Testimonial, size: 'lg' | 'sm')}
  <!-- O snippet é sempre renderizado dentro de <figure> (ver abaixo). -->
  <!-- svelte-ignore a11y_figcaption_parent -->
  <figcaption class="by {size}">
    <span class="avatar" aria-hidden="true">
      {#if p.photo}
        <img src={p.photo} alt="" loading="lazy" decoding="async" />
      {:else}
        {initials(p.name)}
      {/if}
    </span>
    <span class="who">
      {#if p.url}
        <a class="name" href={p.url} target="_blank" rel="noopener noreferrer">
          <cite>{p.name}</cite><span class="sr-only"> ({t.ui.opensInNewTab})</span>
        </a>
      {:else}
        <cite class="name">{p.name}</cite>
      {/if}
      <span class="role">{p.role}{#if p.organization}<span class="dot" aria-hidden="true">·</span>{p.organization}{/if}</span>
      {#if p.translatedFrom && p.translatedFrom !== i18n.locale}
        <span class="translated">{t.ui.translatedFrom[p.translatedFrom]}</span>
      {/if}
    </span>
  </figcaption>
{/snippet}

{#if testimonials.length || references.length}
  <section
    class="endorsements"
    class:opening
    aria-label={testimonials.length ? t.ui.testimonials : t.ui.references}
  >
    {#if featured}
      <!-- No topo, a citação fala por si: sem rótulo visível. -->
      {#if !opening}<h2 class="eyebrow label">{t.ui.testimonials}</h2>{/if}

      <figure class="featured" class:long={isLong(featured.quote)} use:reveal>
        <span class="mark" aria-hidden="true">“</span>
        <blockquote>
          <p>{featured.quote}</p>
        </blockquote>
        {@render attribution(featured, 'lg')}
      </figure>

      {#if others.length}
        <div class="more">
          {#each others as p (p.name + p.quote.slice(0, 24))}
            <figure class="small" use:reveal>
              <span class="mark" aria-hidden="true">“</span>
              <blockquote><p>{p.quote}</p></blockquote>
              {@render attribution(p, 'sm')}
            </figure>
          {/each}
        </div>
      {/if}
    {/if}

    {#if references.length}
      <div class="refs" class:alone={!featured}>
        <h2 class="eyebrow label">{t.ui.references}</h2>
        <ol>
          {#each references as r, i (r.title)}
            <li use:reveal style="--i:{i}">
              <span class="num" aria-hidden="true">{pad(i + 1)}</span>
              <div class="ref">
                <p class="meta">
                  {r.publication}{#if r.date}<span class="dot" aria-hidden="true">·</span>{r.date}{/if}
                </p>
                {#if r.url}
                  <a class="title" href={r.url} target="_blank" rel="noopener noreferrer">
                    <cite>{r.title}</cite>
                    <span class="arrow" aria-hidden="true">↗</span>
                    <span class="sr-only"> ({t.ui.opensInNewTab})</span>
                  </a>
                {:else}
                  <cite class="title">{r.title}</cite>
                {/if}
                {#if r.author || r.note}
                  <p class="detail">
                    {#if r.author}<span class="author">{r.author}</span>{/if}{#if r.author && r.note}<span class="dot" aria-hidden="true">—</span>{/if}{#if r.note}{r.note}{/if}
                  </p>
                {/if}
              </div>
              {#if r.url}
                <span class="host" aria-hidden="true">{domain(r.url)}</span>
              {/if}
            </li>
          {/each}
        </ol>
      </div>
    {/if}
  </section>
{/if}

<style>
  .endorsements {
    position: relative;
    margin-top: 5.5rem;
    padding-top: 3.5rem;
    border-top: 1px solid var(--line);
  }
  /* Destaque no topo do detalhamento: abre o case, antes da visão geral. */
  .endorsements.opening {
    margin-top: 2rem;
    padding-top: 1.5rem;
  }
  .featured.long blockquote p {
    font-size: clamp(1.2rem, 2vw, 1.8rem);
    line-height: 1.4;
    max-width: 44ch;
    text-wrap: pretty;
  }
  .opening .featured {
    padding-top: clamp(3rem, 7vw, 5rem);
  }
  /* Luz discreta atrás do bloco: destaca o fecho sem competir com o vídeo. */
  .endorsements::before {
    content: '';
    position: absolute;
    inset: 0 -8vw auto;
    height: 28rem;
    background: radial-gradient(
      60% 100% at 18% 0%,
      rgba(255, 255, 255, 0.06) 0%,
      rgba(255, 255, 255, 0) 70%
    );
    pointer-events: none;
  }
  .label {
    position: relative;
    margin: 0 0 2rem;
  }

  /* ---------- Depoimento principal ---------- */
  .featured {
    position: relative;
    margin: 0;
    padding: clamp(2.5rem, 6vw, 4.5rem) 0 0 clamp(0rem, 4vw, 3.5rem);
  }
  .mark {
    position: absolute;
    top: 0;
    left: -0.06em;
    font-family: var(--font-title);
    font-weight: 900;
    font-size: clamp(8rem, 17vw, 15rem);
    line-height: 0.72;
    letter-spacing: -0.06em;
    color: rgba(255, 255, 255, 0.1);
    pointer-events: none;
    user-select: none;
  }
  blockquote {
    margin: 0;
  }
  .featured blockquote p {
    position: relative;
    margin: 0;
    font-family: var(--font-ui);
    font-weight: 200;
    font-size: clamp(1.45rem, 3vw, 2.7rem);
    line-height: 1.26;
    letter-spacing: -0.01em;
    color: #fff;
    max-width: 30ch;
    text-wrap: balance;
  }

  /* ---------- Atribuição ---------- */
  .by {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 2.25rem;
  }
  .by.sm {
    margin-top: 1.5rem;
    gap: 0.8rem;
  }
  .avatar {
    flex: none;
    width: 3.25rem;
    height: 3.25rem;
    border-radius: 999px;
    display: grid;
    place-items: center;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.22);
    background: rgba(255, 255, 255, 0.05);
    font-family: var(--font-title);
    font-weight: 900;
    font-size: 0.95rem;
    letter-spacing: -0.02em;
    color: rgba(255, 255, 255, 0.85);
  }
  .sm .avatar {
    width: 2.6rem;
    height: 2.6rem;
    font-size: 0.8rem;
  }
  .avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(1) contrast(1.05);
  }
  .who {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    min-width: 0;
  }
  .name,
  .name cite {
    font-style: normal;
    font-family: var(--font-ui);
    font-weight: 400;
    font-size: 0.95rem;
    color: #fff;
  }
  a.name {
    align-self: flex-start;
    border-bottom: 1px solid rgba(255, 255, 255, 0.28);
    transition: border-color 200ms var(--ease-cine);
  }
  a.name:hover {
    border-color: #fff;
  }
  .role {
    font-size: 0.8125rem;
    line-height: 1.45;
    color: var(--fg-dim);
    max-width: 52ch;
  }
  .dot {
    color: var(--fg-faint);
    margin: 0 0.45em;
  }
  .translated {
    margin-top: 0.35rem;
    font-size: 0.625rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--fg-faint);
  }

  /* ---------- Depoimentos adicionais ---------- */
  .more {
    margin-top: 4rem;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 3rem 4rem;
  }
  .small {
    position: relative;
    margin: 0;
    padding: 2.25rem 0 0;
    border-top: 1px solid var(--line);
  }
  .small .mark {
    top: 1rem;
    font-size: 5rem;
    color: rgba(255, 255, 255, 0.12);
  }
  .small blockquote p {
    position: relative;
    margin: 1.25rem 0 0;
    font-family: var(--font-ui);
    font-weight: 200;
    font-size: clamp(1.05rem, 1.5vw, 1.3rem);
    line-height: 1.45;
    color: rgba(255, 255, 255, 0.92);
    max-width: 44ch;
  }

  /* ---------- Referências ---------- */
  .refs {
    margin-top: 5rem;
  }
  .refs.alone {
    margin-top: 0;
  }
  ol {
    list-style: none;
    margin: 0;
    padding: 0;
    border-top: 1px solid var(--line);
  }
  li {
    display: grid;
    grid-template-columns: 3.5rem minmax(0, 1fr) auto;
    align-items: baseline;
    gap: 0 1.5rem;
    padding: 1.6rem 0;
    border-bottom: 1px solid var(--line);
  }
  .num {
    font-family: var(--font-ui);
    font-size: 0.75rem;
    letter-spacing: 0.12em;
    color: var(--fg-faint);
    font-variant-numeric: tabular-nums;
  }
  .meta {
    margin: 0 0 0.45rem;
    font-size: 0.6875rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.55);
  }
  .title,
  .title cite {
    font-style: normal;
    font-family: var(--font-ui);
    font-weight: 400;
    font-size: clamp(1.05rem, 1.7vw, 1.45rem);
    line-height: 1.3;
    color: #fff;
  }
  a.title {
    display: inline;
    background-image: linear-gradient(#fff, #fff);
    background-size: 0% 1px;
    background-position: 0 100%;
    background-repeat: no-repeat;
    transition: background-size 420ms var(--ease-cine);
  }
  a.title:hover,
  a.title:focus-visible {
    background-size: 100% 1px;
  }
  .arrow {
    display: inline-block;
    margin-left: 0.35em;
    font-size: 0.8em;
    color: rgba(255, 255, 255, 0.55);
    transition:
      transform 320ms var(--ease-cine),
      color 320ms var(--ease-cine);
  }
  a.title:hover .arrow,
  a.title:focus-visible .arrow {
    transform: translate3d(3px, -3px, 0);
    color: #fff;
  }
  .detail {
    margin: 0.55rem 0 0;
    font-size: 0.875rem;
    line-height: 1.55;
    color: var(--fg-dim);
    max-width: 62ch;
  }
  .author {
    color: rgba(255, 255, 255, 0.78);
  }
  .host {
    font-size: 0.75rem;
    color: var(--fg-faint);
    white-space: nowrap;
  }

  /* ---------- Entrada (só com JS: sem script, o conteúdo fica visível) ---------- */
  @media (scripting: enabled) {
    .featured,
    .small,
    li {
      opacity: 0;
      transform: translate3d(0, 18px, 0);
      transition:
        opacity 900ms cubic-bezier(0.16, 1, 0.3, 1),
        transform 900ms cubic-bezier(0.16, 1, 0.3, 1);
      transition-delay: calc(var(--i, 0) * 80ms);
    }
    .featured:global(.in),
    .small:global(.in),
    li:global(.in) {
      opacity: 1;
      transform: none;
    }
  }

  @media (max-width: 860px) {
    .more {
      grid-template-columns: 1fr;
      gap: 2.5rem;
    }
    li {
      grid-template-columns: 2.25rem minmax(0, 1fr);
    }
    .host {
      display: none;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .featured,
    .small,
    li {
      transform: none;
      transition: opacity 300ms linear;
    }
  }
</style>
