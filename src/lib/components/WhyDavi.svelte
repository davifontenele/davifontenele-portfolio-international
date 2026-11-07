<script lang="ts">
  import type { CaseItem } from '$lib/data/cases';
  import ContactCTA from './ContactCTA.svelte';
  import PillButton from './PillButton.svelte';
  import { nav } from '$lib/stores/nav.svelte';

  type Props = { item: CaseItem };
  let { item }: Props = $props();
</script>

<article class="why" aria-label="Por que Davi e contato">
  {#each item.extra ?? [] as block}
    <section class="block">
      <h3 class="block-title">{block.title}</h3>
      <div class="prose">
        {#each block.paragraphs as p}
          <p class="body-text">{p}</p>
        {/each}
      </div>
    </section>
  {/each}

  <ContactCTA />

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
  </footer>
</article>

<style>
  .why {
    max-width: 72rem;
    padding: 2rem 0 6rem;
    border-top: 1px solid var(--line);
    margin-top: 2rem;
  }
  .block {
    display: grid;
    grid-template-columns: minmax(0, 20rem) minmax(0, 1fr);
    gap: 2rem 4rem;
    padding: 3rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }
  .block-title {
    font-family: var(--font-ui);
    font-weight: 200;
    font-size: clamp(1.5rem, 3vw, 2.25rem);
    line-height: 1.1;
    margin: 0;
    color: #fff;
  }
  .prose p {
    margin: 0 0 1.15rem;
    max-width: 64ch;
  }
  .foot {
    margin-top: 2.5rem;
  }
  @media (max-width: 860px) {
    .block {
      grid-template-columns: 1fr;
      gap: 1rem;
      padding: 2.25rem 0;
    }
  }
</style>
