<script lang="ts">
  import type { CaseSlug, Slide } from '$lib/data/slides';
  import MaskedTitle from './MaskedTitle.svelte';
  import PillButton from './PillButton.svelte';
  import { nav } from '$lib/stores/nav.svelte';
  import { view } from '$lib/stores/view.svelte';
  import { useI18n } from '$lib/i18n';

  type Props = { slide: Slide; index: number };
  let { slide, index }: Props = $props();
  const i18n = useI18n();

  const pad = (n: number) => String(n).padStart(2, '0');

  /** Texto do estado fechado, nos dois modos tipográficos (ver docs/TYPOGRAPHY.md). */
  const vm = $derived.by(() => {
    const t = i18n.t;
    const isFinal = slide.type === 'final';
    const name = isFinal ? t.about.eyebrow : t.cases[slide.slug as CaseSlug].name;
    const statementLines = isFinal ? t.about.titleLines : t.cases[slide.slug as CaseSlug].titleLines;
    const subtitle = isFinal ? '' : t.cases[slide.slug as CaseSlug].subtitle;
    const cta = isFinal ? t.about.cta : t.cases[slide.slug as CaseSlug].cta;

    if (view.titleMode === 'brand') {
      return {
        name,
        cta,
        eyebrow: isFinal ? '' : pad(index),
        lines: isFinal ? name.split(/(?<=&)\s+/) : name.split(' '),
        statement: false,
        subtitle: statementLines.join(' '),
        body: subtitle
      };
    }
    return {
      name,
      cta,
      eyebrow: isFinal ? name : `${pad(index)} — ${name}`,
      lines: statementLines,
      statement: true,
      subtitle,
      body: ''
    };
  });

  /** Com o case aberto, a seta leva o usuário ao conteúdo abaixo da dobra. */
  function scrollToContent() {
    document.querySelector('.panel')?.scrollIntoView({
      behavior: nav.reducedMotion ? 'auto' : 'smooth',
      block: 'start'
    });
  }
</script>

<div class="case" class:statement={vm.statement}>
  {#if vm.eyebrow}
    <p class="eyebrow reveal" style="--d:0.4s">{vm.eyebrow}</p>
  {/if}
  <MaskedTitle lines={vm.lines} as="h1" id="slide-title" statement={vm.statement} />
  {#if vm.subtitle}
    <p class="case-subtitle reveal" style="--d:0.55s">{vm.subtitle}</p>
  {/if}
  {#if vm.body}
    <p class="body-text body reveal" style="--d:0.62s">{vm.body}</p>
  {/if}
  <div class="actions reveal" style="--d:0.68s">
    {#if !nav.open}
      <PillButton onclick={() => nav.openCase()} aria-expanded={nav.open}>
        {vm.cta}
      </PillButton>
    {:else}
      <!-- O CTA dá lugar a uma seta com bounce suave, convidando a rolar. -->
      <button
        class="cue"
        type="button"
        onclick={scrollToContent}
        aria-label={i18n.t.ui.scrollToContent(vm.name)}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 4 L12 19" />
          <path d="M5.5 12.5 L12 19 L18.5 12.5" />
        </svg>
      </button>
    {/if}
  </div>
</div>

<style>
  .case {
    max-width: 64rem;
  }
  .case-subtitle {
    margin-top: 1.5rem;
    max-width: 26ch;
    color: rgba(255, 255, 255, 0.86);
  }
  /* Modo statement: o subtítulo é uma frase longa — mesma família/peso,
     escala menor e medida maior para não competir com o título. */
  .statement .case-subtitle {
    margin-top: 1.75rem;
    max-width: 44ch;
    font-size: clamp(1.05rem, 1.55vw, 1.6rem);
    line-height: 1.3;
  }
  .body {
    margin: 1rem 0 0;
    max-width: 52ch;
  }
  .actions {
    margin-top: 2rem;
    min-height: 44px;
    display: flex;
    align-items: center;
  }

  /* Seta de rolagem: bounce discreto, ~6px, ritmo lento. */
  .cue {
    width: 44px;
    height: 44px;
    display: grid;
    place-items: center;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.24);
    background: rgba(255, 255, 255, 0.06);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    animation:
      cue-in 420ms cubic-bezier(0.16, 1, 0.3, 1) both,
      cue-bounce 1.9s cubic-bezier(0.45, 0, 0.55, 1) 420ms infinite;
    transition:
      background 220ms var(--ease-cine),
      border-color 220ms var(--ease-cine);
  }
  .cue:hover {
    background: #fff;
    border-color: #fff;
  }
  .cue:hover svg {
    stroke: #060606;
  }
  .cue svg {
    width: 17px;
    height: 17px;
    fill: none;
    stroke: #fff;
    stroke-width: 1.5;
    stroke-linecap: round;
    stroke-linejoin: round;
    transition: stroke 220ms var(--ease-cine);
  }
  @keyframes cue-in {
    from {
      opacity: 0;
      transform: scale(0.88);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }
  @keyframes cue-bounce {
    0%,
    100% {
      transform: translateY(0);
    }
    45% {
      transform: translateY(6px);
    }
    70% {
      transform: translateY(0);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .cue {
      animation: cue-in 300ms linear both;
    }
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
