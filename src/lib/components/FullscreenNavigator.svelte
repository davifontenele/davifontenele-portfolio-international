<script lang="ts">
  import { nav } from '$lib/stores/nav.svelte';
</script>

<div class="navigator">
  <p class="hint" aria-hidden="true">
    <span class="desktop">Scroll</span><span class="mobile">Swipe</span>
  </p>
  <div class="arrows">
    <button
      type="button"
      aria-label="Case anterior"
      disabled={nav.index === 0}
      onclick={() => nav.go(-1)}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 4 L7 12 L15 20" /></svg>
    </button>
    <button
      type="button"
      aria-label="Próximo case"
      disabled={nav.index === nav.total - 1}
      onclick={() => nav.go(1)}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4 L17 12 L9 20" /></svg>
    </button>
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
  button {
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
  button:hover:not(:disabled) {
    background: #fff;
    border-color: #fff;
  }
  button:hover:not(:disabled) svg {
    stroke: #060606;
  }
  button:disabled {
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
