<script lang="ts">
  import type { CaseItem } from '$lib/data/cases';
  import PillButton from './PillButton.svelte';
  import { nav } from '$lib/stores/nav.svelte';

  type Props = { item: CaseItem };
  let { item }: Props = $props();
</script>

<article class="details" aria-label={`Case completo: ${item.title}`}>
  <header class="lead">
    <p class="eyebrow">Chamada</p>
    <p class="short">{item.shortText}</p>
  </header>

  <div class="grid">
    <section>
      <h3 class="eyebrow">Contexto</h3>
      <p class="body-text">{item.context}</p>
    </section>

    <section>
      <h3 class="eyebrow">Desafio</h3>
      <p class="body-text">{item.challenge}</p>
    </section>

    <section class="span">
      <h3 class="eyebrow">Solução</h3>
      {#each item.solution as p}
        <p class="body-text">{p}</p>
      {/each}
    </section>

    <section class="span">
      <h3 class="eyebrow">Papel desempenhado</h3>
      <p class="body-text">{item.role}</p>
    </section>

    <section class="span">
      <h3 class="eyebrow">Competências</h3>
      <ul class="skills">
        {#each item.skills as s}
          <li>{s}</li>
        {/each}
      </ul>
    </section>
  </div>

  <!-- ÁREA RESERVADA: imagens e vídeos complementares do case.
       Substitua os placeholders abaixo por arquivos reais em /static/. -->
  {#if item.media}
    <section class="media" aria-label="Material complementar">
      <h3 class="eyebrow">Material complementar</h3>
      <div class="media-grid">
        {#each item.media ?? [{ src: '', alt: '', kind: 'image' }, { src: '', alt: '', kind: 'image' }, { src: '', alt: '', kind: 'image' }] as m}
          <figure>
            {#if m.src && m.kind === 'image'}
              <img src={m.src} alt={m.alt} loading="lazy" decoding="async" />
            {:else if m.src}
              <video src={m.src} muted loop playsinline preload="none" aria-label={m.alt}></video>
            {:else}
              <div class="ph" aria-hidden="true"><span>16:9</span></div>
            {/if}
          </figure>
        {/each}
      </div>
    </section>
  {/if}

  <footer class="foot">
    {#if item.link}
      <PillButton onclick={() => window.open(item.link, '_blank')} label={item.linkLabel}>
        {item.linkLabel}
      </PillButton>
    {/if}
    {#if item.link2}
      <PillButton onclick={() => window.open(item.link2, '_blank')} label={item.link2Label}>
        {item.link2Label}
      </PillButton>
    {/if}
    <PillButton variant="ghost" onclick={() => nav.closeCase()} label="Voltar ao modo fullscreen">
      Voltar ao fullscreen
    </PillButton>
    {#if nav.index < nav.total - 1}
      <PillButton variant="ghost" onclick={() => nav.go(1)} label="Ir para o próximo case">
        Próximo case →
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
  .short {
    font-family: var(--font-ui);
    font-weight: 200;
    font-size: clamp(1.15rem, 2.2vw, 1.9rem);
    line-height: 1.35;
    color: #fff;
    margin: 0.9rem 0 0;
    max-width: 46ch;
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
  .grid h3 {
    margin: 0 0 0.9rem;
  }
  .grid p {
    margin: 0 0 1rem;
    max-width: 62ch;
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
  figure video,
  .ph {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid var(--line);
  }
  .ph {
    display: grid;
    place-items: center;
    color: rgba(255, 255, 255, 0.22);
    font-size: 0.7rem;
    letter-spacing: 0.2em;
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
