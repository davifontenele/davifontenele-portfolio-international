<script lang="ts">
  import type { Block } from '$lib/i18n';
  import RichText from './RichText.svelte';
  import ProjectsGallery from './ProjectsGallery.svelte';

  let { blocks }: { blocks: Block[] } = $props();
</script>

{#each blocks as b, i (i)}
  {#if b.type === 'p'}
    <p class="body-text"><RichText text={b.text} /></p>
  {:else if b.type === 'sub'}
    <h3 class="sub"><RichText text={b.text} /></h3>
  {:else if b.type === 'statement'}
    <p class="statement-line"><RichText text={b.text} /></p>
  {:else if b.type === 'list'}
    <ul class="points">
      {#each b.items as item, j (j)}
        <li class="body-text"><RichText text={item} /></li>
      {/each}
    </ul>
  {:else if b.type === 'projects'}
    <ProjectsGallery />
  {/if}
{/each}

<style>
  p {
    margin: 0 0 1rem;
    max-width: 62ch;
  }
  .sub {
    margin: 1.75rem 0 0.6rem;
    font-family: var(--font-ui);
    font-weight: 400;
    font-size: clamp(1rem, 1.2vw, 1.2rem);
    line-height: 1.4;
    color: #fff;
  }
  .sub:first-child {
    margin-top: 0;
  }
  .statement-line {
    font-family: var(--font-ui);
    font-weight: 200;
    font-size: clamp(1.25rem, 2.2vw, 1.9rem);
    line-height: 1.3;
    color: #fff;
    margin: 0.25rem 0 1.25rem;
    max-width: 34ch;
  }
  .points {
    list-style: none;
    margin: 0 0 1.25rem;
    padding: 0;
    max-width: 62ch;
  }
  .points li {
    position: relative;
    padding-left: 1.4rem;
    margin: 0 0 0.55rem;
  }
  .points li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.8em;
    width: 0.7rem;
    height: 1px;
    background: rgba(255, 255, 255, 0.5);
  }
  :global(.body-text strong) {
    font-weight: 500;
    color: #fff;
  }
</style>
