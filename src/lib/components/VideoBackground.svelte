<script lang="ts">
  import { onMount } from 'svelte';
  import type { CaseItem } from '$lib/data/cases';
  import { nav } from '$lib/stores/nav.svelte';
  import ReducedMotionFallback from './ReducedMotionFallback.svelte';
  import { preferMobileVideo } from '$lib/utils/motion';

  type Props = {
    items: CaseItem[];
    /** Elementos <video> expostos para o ShaderTransition. */
    videoEls?: (HTMLVideoElement | null)[];
  };
  let { items, videoEls = $bindable([]) }: Props = $props();

  let mobile = $state(false);
  /** Só monta <video> depois de saber se é mobile — evita travar no source desktop. */
  let ready = $state(false);
  let failed = $state<Record<number, boolean>>({});
  let useFallbackSource = $state<Record<number, boolean>>({});

  onMount(() => {
    mobile = preferMobileVideo();
    ready = true;
  });

  /**
   * Expõe uma única URL por vez para impedir que o browser baixe MP4 + WebM.
   * Mobile prefere o corte leve; qualquer falha troca para o MP4 desktop.
   */
  function source(item: CaseItem, i: number): { src: string; type: string } {
    if (useFallbackSource[i]) return { src: item.video.mp4, type: 'video/mp4' };
    if (mobile && item.video.mp4Mobile) {
      return { src: item.video.mp4Mobile, type: 'video/mp4' };
    }
    if (mobile) return { src: item.video.mp4, type: 'video/mp4' };
    return { src: item.video.webm, type: 'video/webm' };
  }

  // Performance: só os vizinhos recebem src; os distantes ficam pausados/descarregados.
  const nearby = $derived(new Set(nav.nearby));
  const playing = $derived(new Set([nav.index, nav.target].filter((i) => i >= 0)));

  /** Máscara do fallback CSS: o case que entra é revelado pelo lado correto. */
  const clip = $derived.by(() => {
    const rest = `${(1 - nav.progress) * 100}%`;
    return nav.direction > 0 ? `inset(0 0 0 ${rest})` : `inset(0 ${rest} 0 0)`;
  });

  /** Faixas verticais decorativas do fallback CSS (sem WebGL). */
  const STRIPS = 12;
  const strips = Array.from({ length: STRIPS }, (_, i) => i);
  /** Abre e fecha a faixa ao longo da transição, com leve atraso por faixa. */
  function stripScale(p: number, i: number) {
    const delay = (i / STRIPS) * 0.3;
    const l = Math.min(1, Math.max(0, (p - delay) / 0.7));
    return Math.min(1, Math.max(0, 1 - Math.abs(2 * l - 1)));
  }

  function armVideo(el: HTMLVideoElement) {
    el.muted = true;
    el.defaultMuted = true;
    el.playsInline = true;
    el.setAttribute('muted', '');
    el.setAttribute('playsinline', '');
    el.setAttribute('webkit-playsinline', '');
  }

  function clearFailed(i: number) {
    if (!failed[i]) return;
    const next = { ...failed };
    delete next[i];
    failed = next;
  }

  function markFailed(i: number) {
    if (failed[i]) return;
    failed = { ...failed, [i]: true };
  }

  function handleVideoError(item: CaseItem, i: number) {
    const current = source(item, i).src;
    if (!useFallbackSource[i] && current !== item.video.mp4) {
      useFallbackSource = { ...useFallbackSource, [i]: true };
      return;
    }
    markFailed(i);
  }

  function tryPlay(el: HTMLVideoElement, i: number) {
    armVideo(el);
    const r = el.play();
    if (r && typeof r.catch === 'function') {
      // Pode falhar enquanto o browser ainda troca de <source> (ex.: -mobile 404 → desktop).
      // canplay/playing limpam o fallback se a fonte seguinte carregar.
      r.catch(() => markFailed(i));
    }
  }

  function onCanPlay(i: number, el: HTMLVideoElement) {
    clearFailed(i);
    if (playing.has(i)) tryPlay(el, i);
  }

  $effect(() => {
    const p = playing;
    const n = nearby;
    videoEls.forEach((el, i) => {
      if (!el) return;
      armVideo(el);
      if (!n.has(i)) {
        if (!el.paused) el.pause();
        return;
      }
      if (p.has(i)) tryPlay(el, i);
      else if (!el.paused) el.pause();
    });
  });

  // iOS/Android: retoma autoplay no primeiro toque se o SO bloqueou.
  $effect(() => {
    if (typeof window === 'undefined') return;
    const unlock = () => {
      const next = { ...failed };
      let changed = false;
      videoEls.forEach((el, i) => {
        if (!el || !playing.has(i)) return;
        armVideo(el);
        el.play()
          .then(() => {
            if (next[i]) {
              delete next[i];
              failed = { ...next };
            }
          })
          .catch(() => {});
        if (failed[i]) changed = true;
      });
      if (!changed) return;
    };
    window.addEventListener('pointerdown', unlock, { passive: true });
    window.addEventListener('touchstart', unlock, { passive: true });
    return () => {
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('touchstart', unlock);
    };
  });
</script>

<div class="videos" class:hidden={nav.webgl} aria-hidden="true">
  {#each items as item, i (item.slug)}
    {@const selectedSource = source(item, i)}
    <div
      class="layer"
      data-active={i === nav.index}
      data-incoming={i === nav.target}
      style="--p:{nav.progress}; --dir:{nav.direction}; --clip:{clip}; --accent:{item.accent ??
        '#141414'}"
    >
      {#if ready && nearby.has(i)}
        {#key selectedSource.src}
          <video
            bind:this={videoEls[i]}
            src={selectedSource.src}
            poster={item.video.poster}
            muted
            playsinline
            loop
            autoplay={i === nav.index}
            preload={i === nav.index || i === nav.target ? 'auto' : 'metadata'}
            crossorigin="anonymous"
            tabindex="-1"
            oncanplay={(e) => onCanPlay(i, e.currentTarget)}
            onplaying={() => clearFailed(i)}
            onerror={() => handleVideoError(item, i)}
          ></video>
        {/key}
      {/if}
      {#if nearby.has(i)}
        <ReducedMotionFallback
          poster={item.video.poster}
          alt={`Quadro do case ${item.title}`}
          accent={item.accent ?? '#141414'}
          visible={nav.reducedMotion || failed[i] || !ready}
        />
      {/if}
    </div>
  {/each}

  <!-- Fallback CSS das faixas verticais quando não há WebGL / movimento reduzido -->
  {#if !nav.webgl && nav.transitioning}
    <div class="strips" style="--p:{nav.progress}; --dir:{nav.direction}">
      {#each strips as s (s)}
        <i style="--s:{stripScale(nav.progress, s)}"></i>
      {/each}
    </div>
  {/if}
</div>

<style>
  .videos {
    position: fixed;
    inset: 0;
    background: #050505;
    overflow: hidden;
  }
  /* Em modo WebGL os vídeos continuam tocando, mas quem desenha é o canvas. */
  .videos.hidden {
    opacity: 0;
    pointer-events: none;
  }

  .layer {
    position: absolute;
    inset: 0;
    opacity: 0;
    visibility: hidden;
  }
  /* Fallback CSS (sem WebGL): deslize horizontal + fade, mantendo o vídeo tocando. */
  .layer[data-active='true'] {
    opacity: 1;
    visibility: visible;
    transform: translate3d(calc(var(--p) * var(--dir) * -34%), 0, 0);
  }
  .layer[data-incoming='true'] {
    opacity: var(--p);
    visibility: visible;
    z-index: 2;
    transform: translate3d(calc((1 - var(--p)) * var(--dir) * 34%), 0, 0);
    clip-path: var(--clip);
  }

  /* Cortina de faixas verticais: eco do shader em CSS puro. */
  .strips {
    position: absolute;
    inset: 0;
    z-index: 3;
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
    pointer-events: none;
  }
  .strips i {
    display: block;
    background: #050505;
    transform-origin: center;
    transform: scaleX(var(--s));
  }

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
