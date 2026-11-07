<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/state';
  import { cases, contact } from '$lib/data/cases';
  import { nav } from '$lib/stores/nav.svelte';
  import { watchReducedMotion } from '$lib/utils/motion';

  import VideoBackground from '$lib/components/VideoBackground.svelte';
  import ShaderTransition from '$lib/components/ShaderTransition.svelte';
  import HeroSlide from '$lib/components/HeroSlide.svelte';
  import CaseSlide from '$lib/components/CaseSlide.svelte';
  import CaseDetails from '$lib/components/CaseDetails.svelte';
  import WhyDavi from '$lib/components/WhyDavi.svelte';
  import TopMenu from '$lib/components/TopMenu.svelte';
  import ProgressIndicator from '$lib/components/ProgressIndicator.svelte';
  import FullscreenNavigator from '$lib/components/FullscreenNavigator.svelte';

  let videoEls = $state<(HTMLVideoElement | null)[]>([]);
  let scroller: HTMLDivElement | null = $state(null);

  const item = $derived(cases[nav.index]);
  const caseNumber = $derived(cases.slice(0, nav.index + 1).filter((c) => c.type === 'case').length);

  const canonicalUrl = $derived(`https://davifontenele.xyz${page.url.pathname}`);
  const title = 'Davi Fontenele — Designer criativo, filmmaker e especialista em IA';
  const description =
    'Portfólio de Davi Fontenele: design, vídeo, motion, produto digital e inteligência artificial aplicada à comunicação.';
  const image = 'https://davifontenele.xyz/images/social/davifontenele-og.jpg';

  onMount(() => {
    nav.init();
    const stopWatch = watchReducedMotion((r) => {
      nav.reducedMotion = r;
      if (r) nav.webgl = false;
    });

    // ---------- Scroll wheel (desktop): avança/volta entre cases ----------
    let acc = 0;
    let accTimer = 0;
    const THRESHOLD = 70;

    const onWheel = (e: WheelEvent) => {
      if (nav.open) {
        // No modo aberto o scroll é vertical de verdade.
        // Rolar para cima já no topo recolhe o case.
        if (scroller && scroller.scrollTop <= 0 && e.deltaY < -12) nav.closeCase();
        return;
      }
      e.preventDefault();
      if (nav.transitioning) return;
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      acc += delta;
      clearTimeout(accTimer);
      accTimer = window.setTimeout(() => (acc = 0), 220);
      if (Math.abs(acc) >= THRESHOLD) {
        nav.go(acc > 0 ? 1 : -1);
        acc = 0;
      }
    };

    // ---------- Teclado ----------
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      switch (e.key) {
        case 'ArrowRight':
        case 'PageDown':
          e.preventDefault();
          nav.go(1);
          break;
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault();
          nav.go(-1);
          break;
        case 'ArrowDown':
          if (!nav.open) {
            e.preventDefault();
            nav.go(1);
          }
          break;
        case 'ArrowUp':
          if (!nav.open) {
            e.preventDefault();
            nav.go(-1);
          }
          break;
        case 'Home':
          e.preventDefault();
          nav.goTo(0);
          break;
        case 'End':
          e.preventDefault();
          nav.goTo(nav.total - 1);
          break;
        case 'Escape':
          if (nav.open) {
            e.preventDefault();
            nav.closeCase();
          }
          break;
        case 'Enter':
          if (
            !nav.open &&
            cases[nav.index]?.type !== 'hero' &&
            (e.target as HTMLElement)?.tagName !== 'BUTTON'
          ) {
            e.preventDefault();
            nav.openCase();
          }
          break;
      }
    };

    // ---------- Toque (mobile): swipe horizontal como stories ----------
    let sx = 0;
    let sy = 0;
    let moved = false;
    const onTouchStart = (e: TouchEvent) => {
      sx = e.touches[0].clientX;
      sy = e.touches[0].clientY;
      moved = false;
    };
    const onTouchMove = (e: TouchEvent) => {
      const dx = e.touches[0].clientX - sx;
      const dy = e.touches[0].clientY - sy;
      // No hero, bloqueia também o gesto vertical (não há painel para abrir/rolar).
      const onHero = cases[nav.index]?.type === 'hero';
      if (!nav.open && onHero && Math.abs(dy) > 8) {
        e.preventDefault();
        return;
      }
      if (!nav.open && Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 8) {
        e.preventDefault(); // evita "puxar" a página no swipe horizontal
        moved = true;
      }
    };
    const onTouchEnd = (e: TouchEvent) => {
      const t = e.changedTouches[0];
      const dx = t.clientX - sx;
      const dy = t.clientY - sy;
      if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy)) {
        nav.go(dx < 0 ? 1 : -1);
        return;
      }
      const onHero = cases[nav.index]?.type === 'hero';
      if (!nav.open && !onHero && dy < -70 && Math.abs(dy) > Math.abs(dx)) nav.openCase();
      if (nav.open && scroller && scroller.scrollTop <= 0 && dy > 90) nav.closeCase();
      moved = moved && false;
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKey);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      stopWatch();
      clearTimeout(accTimer);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  });

  // Ao trocar de case, o painel volta ao topo.
  // Ao abrir um case, um leve empurrão de 50px sugere que há conteúdo abaixo.
  $effect(() => {
    const open = nav.open;
    nav.index;
    if (!scroller) return;
    scroller.scrollTop = 0;
    if (!open || item.type === 'hero') return;
    const el = scroller;
    const t = setTimeout(
      () => el.scrollTo({ top: 50, behavior: nav.reducedMotion ? 'auto' : 'smooth' }),
      520
    );
    return () => clearTimeout(t);
  });
</script>

<svelte:head>
  <title>{title}</title>
  <meta
    name="description"
    content={description}
  />
  <link rel="canonical" href="{canonicalUrl}" />
  <link rel="icon" type="image/png" href="/favicon.svg" />
  <meta name="description" content={description}>
  <meta property="og_site_name" content={title}>
  <meta property="og:url" content="https://auag.com">
  <meta property="og:type" content="website">
  <meta property="og:title" content={title}>
  <meta property="og:description" content={description}>
  <meta property="og:image" content={image}>
  <meta property="twitter:image" content={image}>
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:title" content={title}>
  <meta property="twitter:description" content={description}>
</svelte:head>

<!-- Fundo: vídeos (sempre em reprodução) + canvas WebGL das faixas verticais -->
<VideoBackground items={cases} bind:videoEls />
<ShaderTransition items={cases} {videoEls} strips={18} stagger={0.42} />

<!-- Overlay de legibilidade: discreto no fullscreen, mais forte no case aberto -->
<div class="scrim" class:strong={nav.open} aria-hidden="true"></div>

<TopMenu />

<main
  class="stage"
  class:open={nav.open && item.type !== 'hero'}
  class:transitioning={nav.transitioning}
  aria-labelledby="slide-title"
>
  <!-- Região rolável precisa ser focável pelo teclado quando o case está aberto. -->
  <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
  <div
    class="scroller"
    bind:this={scroller}
    tabindex={nav.open ? 0 : -1}
    role="region"
    aria-label={nav.open ? `Conteúdo completo: ${item.title}` : `Case ${item.title}`}
  >
    <section
      class="screen"
      style="--p:{nav.progress}; --dir:{nav.direction}; --bounce:{nav.bounceDir}"
    >
      <!-- A key reinicia as animações tipográficas a cada entrada em um case -->
      {#key `${nav.index}-${nav.revision}`}
        <div class="content">
          {#if item.type === 'hero'}
            <HeroSlide {item} />
          {:else if item.type === 'final'}
            <CaseSlide {item} index={caseNumber} />
          {:else}
            <CaseSlide {item} index={caseNumber} />
          {/if}
        </div>
      {/key}
    </section>

    {#if nav.open}
      <div class="panel">
        {#if item.type === 'final'}
          <WhyDavi {item} />
        {:else}
          <CaseDetails {item} />
        {/if}
      </div>
    {/if}
  </div>
</main>

{#if item.type !== 'hero'}
  <ProgressIndicator />
{/if}

<FullscreenNavigator />

<!-- Atalho sempre disponível para contato, sem depender de gestos -->
<a class="skip" href={contact.whatsapp} target="_blank" rel="noopener noreferrer">
  Falar pelo WhatsApp
</a>

<style>
  .scrim {
    position: fixed;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    background:
      linear-gradient(180deg, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0) 28%),
      linear-gradient(0deg, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0) 55%),
      linear-gradient(90deg, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0.05) 60%);
    transition: opacity 600ms var(--ease-cine);
  }
  .scrim.strong {
    background:
      linear-gradient(180deg, rgba(0, 0, 0, 0.72) 0%, rgba(0, 0, 0, 0.86) 60%, rgba(0, 0, 0, 0.94) 100%),
      rgba(0, 0, 0, 0.25);
  }

  .stage {
    position: fixed;
    inset: 0;
    z-index: 10;
  }
  .scroller {
    height: 100%;
    overflow: hidden;
    overscroll-behavior: contain;
  }
  .stage.open .scroller {
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.25) transparent;
  }
  .scroller::-webkit-scrollbar {
    width: 6px;
  }
  .scroller::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.22);
    border-radius: 999px;
  }

  .screen {
    min-height: 100vh;
    min-height: 100dvh;
    display: flex;
    align-items: flex-end;
    padding: calc(var(--safe-top) + 3rem) var(--gutter) calc(var(--safe-bottom) + 5.5rem);
  }

  .content {
    width: 100%;
    /* Acompanha a transição lateral das faixas */
    transform: translate3d(
      calc(var(--p) * var(--dir) * -9vw + var(--bounce) * -10px),
      0,
      0
    );
    opacity: calc(1 - var(--p) * 1.35);
    transition: transform 240ms var(--ease-cine);
    will-change: transform, opacity;
  }

  .panel {
    padding: 0 var(--gutter) 4rem;
  }

  .skip {
    position: fixed;
    left: -9999px;
    top: 0;
    z-index: 100;
    background: #fff;
    color: #000;
    padding: 10px 18px;
    border-radius: 999px;
    font-size: 0.8rem;
  }
  .skip:focus {
    left: var(--gutter);
    top: var(--safe-top);
  }

  @media (max-width: 640px) {
    .screen {
      align-items: flex-end;
      padding-bottom: calc(var(--safe-bottom) + 6.5rem);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .content {
      transform: none;
    }
  }
</style>
