<script lang="ts">
  import { nav } from '$lib/stores/nav.svelte';
  import { enterWatch } from '$lib/stores/view.svelte';
  import { useI18n } from '$lib/i18n';

  /**
   * Anterior/próximo. São links reais (URLs localizadas) para que crawlers e
   * "abrir em nova aba" funcionem; o clique normal mantém a transição de faixas.
   */
  type Props = { prevHref: string | null; nextHref: string | null; inert?: boolean };
  let { prevHref, nextHref, inert = false }: Props = $props();
  const i18n = useI18n();

  function go(e: MouseEvent, dir: 1 | -1) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    nav.go(dir);
  }
</script>

<div class="navigator chrome" {inert}>
  <p class="hint" aria-hidden="true">
    <span class="desktop">{i18n.t.ui.scrollHint}</span><span class="mobile"
      >{i18n.t.ui.swipeHint}</span
    >
  </p>
  <div class="arrows">
    <!-- Oculta a interface para ver só o vídeo de fundo. -->
    <button
      class="btn watch"
      type="button"
      aria-label={i18n.t.ui.watchVideo}
      title={i18n.t.ui.watchVideo}
      onclick={enterWatch}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 8 V4 H8" />
        <path d="M16 4 H20 V8" />
        <path d="M20 16 V20 H16" />
        <path d="M8 20 H4 V16" />
        <path d="M10 9.2 L15 12 L10 14.8 Z" class="fill" />
      </svg>
    </button>
    {#if prevHref}
      <a class="btn" href={prevHref} aria-label={i18n.t.ui.previous} onclick={(e) => go(e, -1)}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 4 L7 12 L15 20" /></svg>
      </a>
    {:else}
      <button class="btn" type="button" disabled aria-label={i18n.t.ui.previous}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 4 L7 12 L15 20" /></svg>
      </button>
    {/if}
    {#if nextHref}
      <a class="btn" href={nextHref} aria-label={i18n.t.ui.next} onclick={(e) => go(e, 1)}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4 L17 12 L9 20" /></svg>
      </a>
    {:else}
      <button class="btn" type="button" disabled aria-label={i18n.t.ui.next}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4 L17 12 L9 20" /></svg>
      </button>
    {/if}
  </div>
</div>

<style>
  .navigator {
    position: fixed;
    right: var(--gutter);
    bottom: var(--safe-bottom);
    z-index: 40;
    display: flex;
    align-items: center;
    gap: 1.25rem;
  }
  .hint {
    margin: 0;
    font-size: 0.6875rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.38);
  }
  .mobile {
    display: none;
  }
  .arrows {
    display: flex;
    gap: 6px;
  }
  .btn {
    width: 38px;
    height: 38px;
    display: grid;
    place-items: center;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0.04);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    transition:
      background 220ms var(--ease-cine),
      border-color 220ms var(--ease-cine),
      opacity 220ms var(--ease-cine);
  }
  a.btn:hover {
    background: #fff;
    border-color: #fff;
  }
  a.btn:hover svg {
    stroke: #060606;
  }
  /* Separa o "assistir" das setas, sem competir com elas. */
  .watch {
    margin-right: 6px;
  }
  svg .fill {
    fill: #fff;
    stroke: none;
    transition: fill 220ms var(--ease-cine);
  }
  .btn:hover svg .fill {
    fill: #060606;
  }
  button.btn:not(:disabled):hover {
    background: #fff;
    border-color: #fff;
  }
  button.btn:not(:disabled):hover svg {
    stroke: #060606;
  }
  .btn:disabled {
    opacity: 0.28;
    cursor: default;
  }
  svg {
    width: 15px;
    height: 15px;
    fill: none;
    stroke: #fff;
    stroke-width: 1.6;
    stroke-linecap: round;
    stroke-linejoin: round;
    transition: stroke 220ms var(--ease-cine);
  }
  @media (pointer: coarse) {
    .desktop {
      display: none;
    }
    .mobile {
      display: inline;
    }
  }
  @media (max-width: 640px) {
    .hint {
      display: none;
    }
  }
</style>
