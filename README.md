# Davi Fontenele — Portfólio audiovisual (SvelteKit)

Experiência fullscreen, sequencial e cinematográfica: 10 telas (hero + 8 cases + “Por que Davi?”),
navegação tipo stories e transição por shader que fatia o vídeo em faixas verticais paralelas.

---

## Rodando

> ⚠️ **Antes do primeiro `npm install`, apague a pasta `node_modules`** que veio no zip
> (é um resto de instalação parcial): `rm -rf node_modules` / delete pela interface do sistema.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # saída estática em /build
npm run preview
npm run check    # svelte-check (TypeScript)
node scripts/check.mjs src   # compilação rápida de todos os componentes
```

Stack: SvelteKit 2 + Svelte 5 (runes) + TypeScript + CSS moderno. Zero dependências de runtime —
o shader é WebGL puro, sem three.js/GSAP.

---

## Onde colocar os arquivos reais

Substitua os placeholders por arquivos com estes nomes exatos:

```
static/videos/hero.webm|.mp4              static/posters/hero.jpg
static/videos/reserva.webm|.mp4           static/posters/reserva.jpg
static/videos/auag.webm|.mp4              static/posters/auag.jpg
static/videos/rocinha-up.webm|.mp4        static/posters/rocinha-up.jpg
static/videos/metais-pesados.webm|.mp4    static/posters/metais-pesados.jpg
static/videos/salinas.webm|.mp4           static/posters/salinas.jpg
static/videos/geologico.webm|.mp4         static/posters/geologico.jpg
static/videos/maria-filo.webm|.mp4        static/posters/maria-filo.jpg
static/videos/zango.webm|.mp4             static/posters/zango.jpg
static/videos/why-davi.webm|.mp4          static/posters/why-davi.jpg
```

Opcional (recomendado): versões leves para mobile, servidas automaticamente em telas de toque —
`hero-mobile.webm` / `hero-mobile.mp4` etc.

Enquanto não houver arquivo, o shader desenha um **gradiente procedural** por case, então a
navegação e a transição de faixas já funcionam sem nenhum vídeo. Cor de cada placeholder:
campo `accent` em `src/lib/data/cases.ts`.

**Especificação sugerida dos vídeos:** 1920×1080, sem áudio, 8–15s em loop limpo,
webm/VP9 ~2–4 Mbps (desktop) e ~1 Mbps (mobile), mp4/H.264 como fallback.

Material complementar de cada case: preencha o campo opcional `media: [{ src, alt, kind }]`
em `cases.ts` — a grade já existe em `CaseDetails.svelte`.

---

## Estrutura

```
src/
  app.html                  fontes (Roboto 900 / Poppins 200,400), meta
  app.css                   tokens, escala tipográfica, reduced-motion
  lib/
    data/cases.ts           TODO O CONTEÚDO do site (textos, vídeos, contato)
    stores/nav.svelte.ts    estado de navegação (índice, progresso, direção, aberto)
    utils/motion.ts         easings, reduced-motion, detecção de WebGL
    components/
      VideoBackground.svelte    pool de <video>, lazy/preload/pausa + fallback CSS
      ShaderTransition.svelte   canvas WebGL: faixas verticais com stagger
      HeroSlide.svelte          slide 01
      CaseSlide.svelte          estado fechado de cada case
      CaseDetails.svelte        estado aberto (contexto, desafio, solução…)
      WhyDavi.svelte            slide final + bloco de IA
      ContactCTA.svelte         dados e CTA de WhatsApp
      MaskedTitle.svelte        título por máscara, linha a linha (stagger 0.2s)
      TopMenu.svelte            menu discreto (topo direito)
      ProgressIndicator.svelte  “03 / 10 — Rocinha UP”
      FullscreenNavigator.svelte anterior/próximo + dica scroll/swipe
      PillButton.svelte         CTA pílula
      ReducedMotionFallback.svelte  camada estática (poster/gradiente)
  routes/+page.svelte       orquestra navegação (wheel, teclado, swipe) e layout
```

---

## Navegação

| Ação | Desktop | Mobile |
|---|---|---|
| Avançar / voltar | scroll wheel, ← →, PageUp/Down, ↑ ↓, botões | swipe horizontal |
| Abrir case | “Ver case completo”, Enter | botão ou swipe para cima |
| Fechar case | “Voltar ao fullscreen”, Esc, scroll até o topo | swipe para baixo no topo |
| Ir ao início/fim | Home / End | — |

Trocar de case fecha automaticamente o modo aberto.

---

## Transição em faixas (ajustes)

Em `src/routes/+page.svelte`:

```svelte
<ShaderTransition items={cases} {videoEls} strips={18} stagger={0.42} />
```

- `strips` — quantidade de faixas verticais.
- `stagger` — atraso máximo entre faixas (0 = corte único; 0.6 = bem fragmentado).
- Duração: `animateTo()` em `src/lib/stores/nav.svelte.ts` (`1100ms`, easing expo-out).

Como funciona: um único canvas desenha o vídeo ativo em tela cheia (`object-fit: cover` no shader).
Durante a transição, cada faixa tem um progresso próprio (parte sequencial, parte pseudoaleatório) e
corta do vídeo que sai para o que entra — no meio do caminho a imagem fica fatiada. Os `<video>`
continuam tocando o tempo todo; as texturas são atualizadas quadro a quadro.

**Fallback** (sem WebGL ou `prefers-reduced-motion`): os vídeos voltam a ser DOM, a transição vira
deslize horizontal + máscara `clip-path`, com uma cortina de faixas em CSS. Nada de shader.

---

## Acessibilidade

Textos reais em HTML, estrutura semântica, navegação completa por teclado, foco visível,
`aria-label` nos controles, overlay de contraste (mais forte no case aberto), vídeos `muted` +
`playsinline` com poster e fallback estático se o autoplay falhar, `prefers-reduced-motion`
(desliga shader, troca máscaras por fade), gestos nunca são o único caminho.

## Performance

Só os vídeos vizinhos (anterior/atual/próximo/destino) recebem `src`; os demais ficam sem carregar.
`preload="auto"` no atual e no destino, `metadata` nos vizinhos, pausa nos distantes,
versões mobile automáticas, render pausado quando a aba está oculta, DPR limitado a 2.
