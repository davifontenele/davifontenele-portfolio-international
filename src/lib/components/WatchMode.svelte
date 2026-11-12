<script lang="ts">
  import { onMount } from 'svelte';
  import { view, exitWatch } from '$lib/stores/view.svelte';
  import { useI18n } from '$lib/i18n';

  /**
   * Modo "assistir ao vídeo": a interface some e o vídeo ocupa a tela.
   * Uma camada transparente cobre tudo — clicar/tocar devolve a interface.
   * A dica aparece ao entrar e a cada movimento do mouse, e some sozinha;
   * o cursor também se esconde quando parado.
   */
  const i18n = useI18n();
  let hint = $state(false);
  let coarse = $state(false);
  let timer = 0;

  function wake() {
    hint = true;
    clearTimeout(timer);
    timer = window.setTimeout(() => (hint = false), 2600);
  }

  $effect(() => {
    if (view.watching) wake();
    else {
      clearTimeout(timer);
      hint = false;
    }
  });

  onMount(() => {
    coarse = matchMedia('(pointer: coarse)').matches;
    return () => clearTimeout(timer);
  });
</script>

{#if view.watching}
  <button
    class="watch-exit"
    class:idle={!hint}
    type="button"
    aria-label={i18n.t.ui.showInterface}
    onclick={exitWatch}
    onpointermove={(e) => e.pointerType === 'mouse' && wake()}
  >
    <span class="hint" class:on={hint} aria-hidden="true">
      <span class="label">{i18n.t.ui.showInterface}</span>
      <span class="keys">{coarse ? i18n.t.ui.watchHintTouch : i18n.t.ui.watchHintPointer}</span>
    </span>
  </button>
{/if}

<style>
  .watch-exit {
    position: fixed;
    inset: 0;
    z-index: 90;
    background: transparent;
    border: 0;
    padding: 0;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }
  .watch-exit.idle {
    cursor: none;
  }
  .watch-exit:focus-visible {
    outline: none;
  }
  .watch-exit:focus-visible .hint {
    opacity: 1;
  }
  .hint {
    position: absolute;
    right: var(--gutter);
    bottom: var(--safe-bottom);
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.4rem;
    padding: 12px 20px;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.22);
    background: rgba(0, 0, 0, 0.35);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    opacity: 0;
    transform: translate3d(0, 6px, 0);
    transition:
      opacity 500ms var(--ease-cine),
      transform 500ms var(--ease-cine);
    pointer-events: none;
    text-align: right;
  }
  .hint.on {
    opacity: 1;
    transform: none;
  }
  .label {
    font-family: var(--font-ui);
    font-size: 0.8125rem;
    color: #fff;
  }
  .keys {
    font-size: 0.6875rem;
    letter-spacing: 0.06em;
    color: rgba(255, 255, 255, 0.6);
  }
  @media (max-width: 640px) {
    .hint {
      left: var(--gutter);
      right: var(--gutter);
      align-items: center;
      text-align: center;
      border-radius: 18px;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .hint {
      transform: none;
    }
  }
</style>
