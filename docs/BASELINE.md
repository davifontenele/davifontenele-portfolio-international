# Baseline — Fase 0

Auditoria do portfólio original antes de qualquer mudança na edição internacional.
Data: 07/11/2026.

## 1. Origem

| Item | Valor |
|---|---|
| Repositório | `davifontenele/davifontenele-portfolio-2026` |
| Branch | `main` (única; sem tags) |
| Commit | `f3ae458f9976937dec4009ac661bc967e0f0da2c` — 14/09/2026, "Update cases.ts" |
| Clone de auditoria | somente leitura, nenhuma alteração, nenhum push |

A cópia independente foi criada com `git archive` (sem histórico nem remote do original)
e iniciada com um único commit: `chore: baseline import from davifontenele-portfolio-2026@f3ae458`.
**Remote: nenhum.**

## 2. Validação

| Comando | Resultado |
|---|---|
| `pnpm install --frozen-lockfile` | ok (pnpm 10.28, Node 22) |
| `pnpm run check` (svelte-check) | 0 erros, 0 avisos |
| `node scripts/check.mjs src` | 22 arquivos, 0 erros |
| `pnpm run build` | ok — `build/` com 331 MB (328 MB são vídeos) |
| Preview + Chrome headless (desktop 1440×900, mobile 390×844) | shader WebGL ativo, `hero.webm` no desktop, `hero-mobile.mp4` no mobile, navegação por teclado, abrir/rolar case, slide final — tudo funcional |

## 3. Stack real

SvelteKit 2.x + Svelte 5 (runes) + TypeScript + CSS puro. Zero dependências de runtime.
`adapter-static` com `fallback: '200.html'`, `prerender = true`, `ssr = true`, `csr = true`.
Rota única: `src/routes/+page.svelte`. `vercel.json` reescreve **todas** as URLs para `/200.html`.

## 4. Conteúdo atual (difere do brief)

9 slides, não 10: hero + **7 cases** + "Por que Davi?".

Ordem: Reserva, AuAg, Rocinha UP, Metais Pesados, Salinas, Geológico, Espaço Fashion.
ZANGO está comentado em `cases.ts`. **Maria Filó não existe no código.**

Mídia ausente para a nova curadoria: vídeo/poster de 3Lane; imagens de galeria para AuAg,
Rocinha UP e 3Lane. `why-davi.*` existe e pode servir como vídeo de "About".

## 5. Parâmetros preservados (valores do código)

- Shader: 18 faixas, stagger 0.42, mistura 40% sequencial / 60% pseudoaleatória por faixa,
  easeInOut cúbico por faixa, sombra no corte, fio de separação durante a transição.
- Duração: 1100 ms, `easeOutExpo` (320 ms com movimento reduzido) — `nav.svelte.ts`.
- Título: máscara por linha, stagger 0.2 s, delay 0.05 s, `rise` 1.05 s `cubic-bezier(0.16,1,0.3,1)`.
- Escala: título `clamp(4rem, 13vw, 12.5rem)`, line-height 0.85, tracking -0.06em;
  subtítulo `clamp(1.25rem, 3vw, 2.5rem)` Poppins 200.
- Wheel: limiar 70, reset 220 ms. Swipe: 55 px horizontal; 70 px para cima abre; 90 px para baixo fecha no topo.
- DPR do canvas limitado a 2; render pausa com aba oculta.
- Fallback sem WebGL/reduced-motion: vídeos em DOM + deslize 34% + `clip-path` + cortina de 12 faixas CSS.

## 6. Achados

1. **Pré-carregamento.** O README diz que vizinhos são pré-carregados; o código (`nav.nearby`)
   só monta o vídeo atual e o de destino. O vídeo de entrada começa a baixar quando a transição
   já começou — na primeira visita, o meio da transição mostra o gradiente procedural em vez do vídeo.
2. **SEO.** O HTML pré-renderizado contém só o hero (0 ocorrências de "Reserva", "AuAg" etc.).
   O painel expandido só existe no DOM quando aberto.
3. **404 suave.** O rewrite global do Vercel faz qualquer URL inexistente responder 200.
4. **Metadados com erros:** `og:url` aponta para `https://auag.com`; `og_site_name` (deveria ser
   `og:site_name`); `description` duplicada; canonical fixo em `.xyz`.
5. **Analytics.** `app.html` traz o GA `G-543W8H3KPQ` fixo — a edição .com enviaria dados para a mesma propriedade.
6. **Gestos no case aberto.** O swipe horizontal troca de case mesmo com o case expandido.
   Isso conflita com qualquer galeria horizontal (ex.: os 9 projetos da 3Lane).
7. **Strings fixas em PT** em ~11 componentes (CTAs, rótulos, `aria-label`, alt de poster, eyebrow).
8. **Ano do hero** (`new Date().getFullYear()`) é congelado no build pelo prerender.
9. **Vídeos versionados no Git sem LFS** (27 arquivos, maior com 30 MB) — cabe no GitHub, mas o repositório tem ~330 MB.

## 7. Teste de tipografia com os novos títulos

Os títulos aprovados são frases (49–57 caracteres). Na escala atual:

- Desktop 1440×900: fonte 187 px, bloco de título com 977 px de altura — maior que a viewport;
  "acessíveis pelo design." sai da tela.
- Mobile 390×844: 64 px, 334 px de altura — cabe, mas com palavras isoladas por linha.

A escala atual foi desenhada para nomes de marca de 1–2 palavras. É a principal decisão de design antes da Fase 2.
