<script lang="ts">
  import { threeLaneProjects } from '$lib/data/slides';
  import { useI18n } from '$lib/i18n';

  /**
   * Galeria modular dos nove projetos da 3Lane.
   * Cada card aceita uma imagem (slides.ts → threeLaneProjects[].image).
   * Sem imagem, o card fica só com texto — nada de placeholder público.
   */
  const i18n = useI18n();
  const projects = $derived(i18n.t.cases['3lane'].projects ?? {});
</script>

<ul class="projects">
  {#each threeLaneProjects as p (p.id)}
    {@const copy = projects[p.id]}
    <li>
      {#if p.image}
        <img src={p.image} alt={copy?.name ?? ''} loading="lazy" decoding="async" />
      {/if}
      <h3 class="name">{copy?.name}</h3>
      <p class="desc">{copy?.description}</p>
      <a class="domain" href={p.url} target="_blank" rel="noopener noreferrer">
        {p.domain}<span aria-hidden="true"> ↗</span>
        <span class="sr-only"> ({i18n.t.ui.opensInNewTab})</span>
      </a>
    </li>
  {/each}
</ul>

<style>
  .projects {
    list-style: none;
    margin: 1.5rem 0 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 2.25rem 2rem;
    max-width: none;
  }
  li {
    border-top: 1px solid var(--line);
    padding-top: 1.1rem;
    display: flex;
    flex-direction: column;
  }
  img {
    width: 100%;
    aspect-ratio: 16 / 10;
    object-fit: cover;
    border: 1px solid var(--line);
    margin-bottom: 1rem;
  }
  .name {
    margin: 0;
    font-family: var(--font-ui);
    font-weight: 400;
    font-size: 0.95rem;
    line-height: 1.4;
    color: #fff;
  }
  .desc {
    margin: 0.5rem 0 0.9rem;
    font-size: 0.875rem;
    line-height: 1.55;
    color: var(--fg-dim);
  }
  .domain {
    margin-top: auto;
    align-self: flex-start;
    font-size: 0.75rem;
    letter-spacing: 0.04em;
    color: rgba(255, 255, 255, 0.72);
    border-bottom: 1px solid rgba(255, 255, 255, 0.24);
    padding-bottom: 1px;
    transition: color 200ms var(--ease-cine), border-color 200ms var(--ease-cine);
  }
  .domain:hover {
    color: #fff;
    border-color: #fff;
  }
  @media (max-width: 1100px) {
    .projects {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
  @media (max-width: 640px) {
    .projects {
      grid-template-columns: 1fr;
      gap: 1.75rem;
    }
  }
</style>
