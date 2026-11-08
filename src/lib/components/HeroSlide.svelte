<script lang="ts">
  import MaskedTitle from './MaskedTitle.svelte';
  import PillButton from './PillButton.svelte';
  import { nav } from '$lib/stores/nav.svelte';
  import { useI18n } from '$lib/i18n';

  type Props = { onAbout: () => void };
  let { onAbout }: Props = $props();
  const i18n = useI18n();
  const h = $derived(i18n.t.hero);
</script>

<div class="hero">
  <p class="eyebrow reveal" style="--d:0.45s">{h.role}</p>
  <MaskedTitle lines={h.nameLines} as="h1" id="slide-title" immediate />
  <p class="case-subtitle reveal" style="--d:0.55s">{h.statement}</p>
  <p class="body-text short reveal" style="--d:0.65s">{h.supporting}</p>
  <p class="eyebrow expertise reveal" style="--d:0.7s">{h.expertise}</p>
  <div class="actions reveal" style="--d:0.75s">
    <PillButton onclick={() => nav.go(1)}>{h.ctaPrimary}</PillButton>
    <PillButton variant="ghost" onclick={onAbout}>{h.ctaSecondary}</PillButton>
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
  .expertise {
    margin: 1.25rem 0 0;
    letter-spacing: 0.16em;
  }
  .actions {
    margin-top: 2.25rem;
    display: flex;
    flex-wrap: wrap;
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
