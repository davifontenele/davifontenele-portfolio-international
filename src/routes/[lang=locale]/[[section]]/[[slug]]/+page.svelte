<script lang="ts">
  import { onMount, tick, untrack } from 'svelte';
  import { goto, replaceState } from '$app/navigation';
  import { page } from '$app/state';
  import { slides, caseIndex, whatsappUrl, type CaseSlug } from '$lib/data/slides';
  import {
    dictionaries,
    provideI18n,
    pathFor,
    hreflang,
    locales,
    SITE_URL,
    STORAGE_KEY,
    ogImage,
    type Locale,
    type Route
  } from '$lib/i18n';
  import { nav } from '$lib/stores/nav.svelte';
  import { view } from '$lib/stores/view.svelte';
  import { watchReducedMotion } from '$lib/utils/motion';

  import VideoBackground from '$lib/components/VideoBackground.svelte';
  import ShaderTransition from '$lib/components/ShaderTransition.svelte';
  import HeroSlide from '$lib/components/HeroSlide.svelte';
  import CaseSlide from '$lib/components/CaseSlide.svelte';
  import CaseDetails from '$lib/components/CaseDetails.svelte';
  import AboutLeadership from '$lib/components/AboutLeadership.svelte';
  import TopMenu from '$lib/components/TopMenu.svelte';
  import ProgressIndicator from '$lib/components/ProgressIndicator.svelte';
  import FullscreenNavigator from '$lib/components/FullscreenNavigator.svelte';

  let { data } = $props();

  // Idioma reativo para toda a árvore; trocar de idioma não remonta componentes.
  const i18n = provideI18n(() => data.locale);
  const t = $derived(i18n.t);

  /** Índice do slide para um destino lógico. */
  function indexFor(route: Route): number {
    if (route.kind === 'home') return 0;
    if (route.kind === 'about') return caseIndex('about');
    return caseIndex(route.slug);
  }
  /** Destino lógico do slide visível. */
  function routeFor(index: number): Route {
    const s = slides[index];
    if (!s || s.type === 'hero') return { kind: 'home' };
    if (s.type === 'final') return { kind: 'about' };
    return { kind: 'case', slug: s.slug as CaseSlug };
  }

  // Estado inicial vem da URL — uma única vez por instância (SSR e hidratação).
  // Deep link de case/About abre o conteúdo expandido.
  untrack(() => nav.setInitial(indexFor(data.route), data.route.kind !== 'home'));

  let videoEls = $state<(HTMLVideoElement | null)[]>([]);
  let scroller: HTMLDivElement | null = $state(null);
  let mounted = $state(false);

  const item = $derived(slides[nav.index]);
  const caseNumber = $derived(slides.slice(0, nav.index + 1).filter((s) => s.type === 'case').length);
  const caseTotal = slides.filter((s) => s.type === 'case').length;
  const currentRoute = $derived(routeFor(nav.index));

  /** Nome exibido do slide (progresso, regiões acessíveis). */
  function slideName(index: number): string {
    const s = slides[index];
    if (!s || s.type === 'hero') return t.meta.siteName;
    if (s.type === 'final') return t.about.eyebrow;
    return t.cases[s.slug as CaseSlug].name;
  }
  const itemName = $derived(slideName(nav.index));
  const names = $derived(slides.map((_, i) => slideName(i)));

  // ---------- Metadados (seguem o slide visível) ----------
  const head = $derived.by(() => {
    const r = currentRoute;
    if (r.kind === 'case') {
      const c = t.cases[r.slug];
      return {
        title: `${c.name} — ${c.titleLines.join(' ')} | ${t.meta.siteName}`,
        description: c.subtitle
      };
    }
    if (r.kind === 'about') {
      return {
        title: `${t.meta.aboutTitle} — ${t.meta.siteName}`,
        description: t.about.titleLines.join(' ')
      };
    }
    return { title: t.meta.homeTitle, description: t.meta.homeDescription };
  });
  const canonical = $derived(SITE_URL + pathFor(data.locale, currentRoute));
  const alternates = $derived(
    locales.map((l) => ({ hreflang: hreflang[l], href: SITE_URL + pathFor(l, currentRoute) }))
  );
  const xDefault = $derived(SITE_URL + pathFor('en', currentRoute));
  // Imagem de compartilhamento do idioma da página (vale para home, cases e About).
  const og = $derived(ogImage[data.locale]);
  const ogAlt = $derived(`${t.hero.nameLines.join(' ')} — ${t.hero.role}. ${t.hero.statement}`);
  const otherOgLocales = $derived(
    locales.filter((l) => l !== data.locale).map((l) => dictionaries[l].meta.ogLocale)
  );

  // ---------- URL acompanha a navegação, sem recarregar ----------
  $effect(() => {
    const path = pathFor(data.locale, currentRoute);
    if (!mounted || nav.transitioning) return;
    if (untrack(() => page.url.pathname) !== path) replaceState(path, {});
  });

  // ---------- <html lang> ----------
  $effect(() => {
    document.documentElement.lang = hreflang[data.locale];
  });

  // ---------- Troca de idioma preservando case, estado aberto e rolagem ----------
  async function switchLocale(next: Locale) {
    if (next === data.locale) return;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* armazenamento indisponível: segue sem persistir */
    }
    const ratio =
      nav.open && scroller && scroller.scrollHeight > scroller.clientHeight
        ? scroller.scrollTop / (scroller.scrollHeight - scroller.clientHeight)
        : 0;
    await goto(pathFor(next, currentRoute), { noScroll: true, keepFocus: true, replaceState: true });
    await tick();
    if (nav.open && scroller) {
      scroller.scrollTop = ratio * (scroller.scrollHeight - scroller.clientHeight);
    }
  }

  function goToAbout() {
    const i = caseIndex('about');
    if (nav.index === i) nav.openCase();
    else nav.goTo(i);
  }

  onMount(() => {
    nav.init();
    mounted = true;

    // TEMPORÁRIO: comparação tipográfica (?titles=brand | statement).
    const mode = new URLSearchParams(location.search).get('titles');
    if (mode === 'brand' || mode === 'statement') view.titleMode = mode;

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
          if (!nav.open && slides[nav.index]?.type !== 'hero' && tag !== 'BUTTON' && tag !== 'A') {
            e.preventDefault();
            nav.openCase();
          }
          break;
      }
    };

    // ---------- Toque (mobile): swipe horizontal como stories ----------
    let sx = 0;
    let sy = 0;
    const onTouchStart = (e: TouchEvent) => {
      sx = e.touches[0].clientX;
      sy = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      const dx = e.touches[0].clientX - sx;
      const dy = e.touches[0].clientY - sy;
      // No hero, bloqueia também o gesto vertical (não há painel para abrir/rolar).
      const onHero = slides[nav.index]?.type === 'hero';
      if (!nav.open && onHero && Math.abs(dy) > 8) {
        e.preventDefault();
        return;
      }
      if (!nav.open && Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 8) {
        e.preventDefault(); // evita "puxar" a página no swipe horizontal
      }
    };
    const onTouchEnd = (e: TouchEvent) => {
      const p = e.changedTouches[0];
      const dx = p.clientX - sx;
      const dy = p.clientY - sy;
      // Com o case aberto, o swipe horizontal NÃO troca de case: evita conflito
      // com a rolagem vertical e com galerias. Os botões continuam disponíveis.
      if (!nav.open && Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy)) {
        nav.go(dx < 0 ? 1 : -1);
        return;
      }
      const onHero = slides[nav.index]?.type === 'hero';
      if (!nav.open && !onHero && dy < -70 && Math.abs(dy) > Math.abs(dx)) nav.openCase();
      if (nav.open && scroller && scroller.scrollTop <= 0 && dy > 90) nav.closeCase();
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
  // (Não roda na carga inicial de um deep link: o usuário já pediu o case aberto.)
  let firstRun = true;
  $effect(() => {
    const open = nav.open;
    nav.index;
    if (!scroller) return;
    if (firstRun) {
      firstRun = false;
      return;
    }
    scroller.scrollTop = 0;
    if (!open || item.type === 'hero') return;
    const el = scroller;
    const timer = setTimeout(
      () => el.scrollTo({ top: 50, behavior: nav.reducedMotion ? 'auto' : 'smooth' }),
      520
    );
    return () => clearTimeout(timer);
  });
</script>

<svelte:head>
  <title>{head.title}</title>
  <meta name="description" content={head.description} />
  <link rel="canonical" href={canonical} />
  {#each alternates as alt (alt.hreflang)}
    <link rel="alternate" hreflang={alt.hreflang} href={alt.href} />
  {/each}
  <link rel="alternate" hreflang="x-default" href={xDefault} />
  <meta property="og:site_name" content={t.meta.siteName} />
  <meta property="og:locale" content={t.meta.ogLocale} />
  {#each otherOgLocales as l (l)}
    <meta property="og:locale:alternate" content={l} />
  {/each}
  <meta property="og:url" content={canonical} />
  <meta property="og:type" content="website" />
  <meta property="og:title" content={head.title} />
  <meta property="og:description" content={head.description} />
  <meta property="og:image" content={og.url} />
  <meta property="og:image:secure_url" content={og.url} />
  <meta property="og:image:type" content="image/jpeg" />
  <meta property="og:image:width" content={String(og.width)} />
  <meta property="og:image:height" content={String(og.height)} />
  <meta property="og:image:alt" content={ogAlt} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={head.title} />
  <meta name="twitter:description" content={head.description} />
  <meta name="twitter:image" content={og.url} />
  <meta name="twitter:image:alt" content={ogAlt} />
</svelte:head>

<!-- Fundo: vídeos (sempre em reprodução) + canvas WebGL das faixas verticais -->
<VideoBackground items={slides} {names} bind:videoEls />
<ShaderTransition items={slides} {videoEls} strips={18} stagger={0.42} />

<!-- Overlay de legibilidade: discreto no fullscreen, mais forte no case aberto -->
<div class="scrim" class:strong={nav.open} aria-hidden="true"></div>

<TopMenu
  onWork={() => nav.goTo(1)}
  onAbout={goToAbout}
  onLocale={switchLocale}
  hrefFor={(l) => pathFor(l, currentRoute)}
  workHref={pathFor(data.locale, routeFor(1))}
  aboutHref={pathFor(data.locale, { kind: 'about' })}
/>

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
    aria-label={nav.open ? t.ui.fullCaseRegion(itemName) : t.ui.caseRegion(itemName)}
  >
    <section
      class="screen"
      style="--p:{nav.progress}; --dir:{nav.direction}; --bounce:{nav.bounceDir}"
    >
      <!-- A key reinicia as animações tipográficas a cada entrada em um case
           (o idioma NÃO faz parte da key: trocar de idioma não reinicia a experiência) -->
      {#key `${nav.index}-${nav.revision}`}
        <div class="content">
          {#if item.type === 'hero'}
            <HeroSlide onAbout={goToAbout} />
          {:else}
            <CaseSlide slide={item} index={caseNumber} />
          {/if}
        </div>
      {/key}
    </section>

    {#if nav.open && item.type !== 'hero'}
      <div class="panel">
        {#if item.type === 'final'}
          <AboutLeadership slide={item} onWork={() => nav.goTo(1)} />
        {:else}
          <CaseDetails slide={item} />
        {/if}
      </div>
    {/if}
  </div>
</main>

{#if item.type !== 'hero'}
  <ProgressIndicator
    number={item.type === 'case' ? caseNumber : 0}
    total={caseTotal}
    name={itemName}
  />
{/if}

<FullscreenNavigator
  prevHref={nav.index > 0 ? pathFor(data.locale, routeFor(nav.index - 1)) : null}
  nextHref={nav.index < nav.total - 1 ? pathFor(data.locale, routeFor(nav.index + 1)) : null}
/>

<!-- Atalho sempre disponível para contato, sem depender de gestos -->
<a class="skip" href={whatsappUrl(t.whatsappMessage)} target="_blank" rel="noopener noreferrer">
  {t.ui.getInTouch}
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
    /* Texto longo esmaece sob o menu (topo) e sob progresso/setas (base),
       em vez de colidir com eles. */
    -webkit-mask-image: linear-gradient(
      180deg,
      transparent 0,
      #000 calc(var(--safe-top) + 3.25rem),
      #000 calc(100% - var(--safe-bottom) - 4.5rem),
      transparent calc(100% - var(--safe-bottom) + 0.5rem)
    );
    mask-image: linear-gradient(
      180deg,
      transparent 0,
      #000 calc(var(--safe-top) + 3.25rem),
      #000 calc(100% - var(--safe-bottom) - 4.5rem),
      transparent calc(100% - var(--safe-bottom) + 0.5rem)
    );
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
