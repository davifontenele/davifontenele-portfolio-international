<script lang="ts">
  import { nav } from '$lib/stores/nav.svelte';
  import { cases, contact } from '$lib/data/cases';

  const finalIndex = cases.findIndex((c) => c.type === 'final');

  function goWhy() {
    if (nav.index === finalIndex) nav.openCase();
    else nav.goTo(finalIndex);
  }
</script>

<nav class="menu" aria-label="Menu principal">
  <button type="button" onclick={goWhy}>Por que Davi?</button>
  <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer">Contato</a>
</nav>

<style>
  .menu {
    position: fixed;
    top: var(--safe-top);
    right: var(--gutter);
    z-index: 40;
    display: flex;
    gap: 1.5rem;
    font-family: var(--font-ui);
    font-weight: 400;
    font-size: 0.8125rem;
    letter-spacing: 0.01em;
    mix-blend-mode: difference;
  }
  .menu button,
  .menu a {
    color: rgba(255, 255, 255, 0.62);
    padding: 2px 0;
    transition: opacity 200ms var(--ease-cine), color 200ms var(--ease-cine);
  }
  .menu button:hover,
  .menu a:hover,
  .menu button:focus-visible,
  .menu a:focus-visible {
    color: #fff;
  }
  @media (max-width: 640px) {
    .menu {
      gap: 1rem;
      font-size: 0.75rem;
    }
  }
</style>
