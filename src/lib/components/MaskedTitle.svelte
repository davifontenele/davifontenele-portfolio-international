<script lang="ts">
  import { nav } from '$lib/stores/nav.svelte';

  type Props = {
    lines: string[];
    /** Atraso base entre linhas (a 2ª linha entra 0.2s depois). */
    stagger?: number;
    delay?: number;
    as?: 'h1' | 'h2';
    id?: string;
    /** Exibe imediatamente títulos críticos para LCP, como o hero inicial. */
    immediate?: boolean;
    /** Frases longas (títulos de case): escala própria, ver app.css `.statement`. */
    statement?: boolean;
  };
  let {
    lines,
    stagger = 0.2,
    delay = 0.05,
    as = 'h1',
    id,
    immediate = false,
    statement = false
  }: Props = $props();
</script>

<!-- Cada linha entra de baixo para cima, revelada por uma máscara fixa. -->
<svelte:element
  this={as}
  class="case-title masked"
  class:immediate
  class:statement
  {id}
  data-reduced={nav.reducedMotion}
>
  {#each lines as line, i}
    <span class="mask">
      <span class="line" style="--delay:{delay + i * stagger}s">{line}</span>
    </span>
  {/each}
</svelte:element>

<style>
  .masked {
    display: block;
  }
  .mask {
    display: block;
    overflow: hidden;
    padding-bottom: 0.04em;
  }
  /* Frases têm descendentes (g, p, ç, y): a máscara ganha folga embaixo,
     compensada na margem para manter o ritmo das linhas. */
  .statement .mask {
    padding-bottom: 0.14em;
    margin-bottom: -0.1em;
  }
  /* A máscara ficou mais alta: a linha parte de mais baixo para não "vazar" o topo das letras. */
  .statement .line {
    transform: translate3d(0, 128%, 0);
  }
  .line {
    display: block;
    transform: translate3d(0, 108%, 0);
    animation: rise 1.05s cubic-bezier(0.16, 1, 0.3, 1) var(--delay) forwards;
    will-change: transform;
  }
  .immediate .line {
    transform: none;
    animation: none;
    will-change: auto;
  }
  @keyframes rise {
    to {
      transform: translate3d(0, 0, 0);
    }
  }
  /* prefers-reduced-motion: fade simples, sem deslocamento */
  .masked[data-reduced='true'] .line,
  .masked.statement[data-reduced='true'] .line,
  :global(html) .masked[data-reduced='true'] .line {
    transform: none;
    opacity: 0;
    animation: fade 0.4s linear var(--delay) forwards;
  }
  @keyframes fade {
    to {
      opacity: 1;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .line,
    .statement .line {
      transform: none;
      opacity: 0;
      animation: fade 0.4s linear var(--delay) forwards;
    }
  }
</style>
