<script lang="ts">
  import type { CaseItem } from '$lib/data/cases';
  import MaskedTitle from './MaskedTitle.svelte';
  import PillButton from './PillButton.svelte';
  import { nav } from '$lib/stores/nav.svelte';

  type Props = { item: CaseItem };
  let { item }: Props = $props();
</script>

<div class="hero">
  <p class="eyebrow reveal" style="--d:0.45s">Portfólio · {new Date().getFullYear()}</p>
  <MaskedTitle lines={item.titleLines ?? [item.title]} as="h1" id="slide-title" immediate />
  <p class="case-subtitle reveal" style="--d:0.55s">{item.subtitle}</p>
  <p class="body-text short reveal" style="--d:0.65s">{item.shortText}</p>
  <div class="actions reveal" style="--d:0.75s">
    <PillButton onclick={() => nav.go(1)} label="Ver os projetos de Davi Fontenele">
      Ver projetos
    </PillButton>
  </div>
</div>

<style>
  .hero {
    max-width: 62rem;
  }
  .case-subtitle {
    margin-top: 1.75rem;
    max-width: 30ch;
    color: rgba(255, 255, 255, 0.88);
  }
  .short {
    margin-top: 1.5rem;
    max-width: 52ch;
  }
  .actions {
    margin-top: 2.25rem;
    display: flex;
    gap: 0.75rem;
  }
  .reveal {
    opacity: 0;
    transform: translate3d(0, 14px, 0);
    animation: up 0.9s cubic-bezier(0.16, 1, 0.3, 1) var(--d) forwards;
  }
  @keyframes up {
    to {
      opacity: 1;
      transform: none;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .reveal {
      transform: none;
      animation: fade 0.35s linear var(--d) forwards;
    }
    @keyframes fade {
      to {
        opacity: 1;
      }
    }
  }
</style>
