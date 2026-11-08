# Davi Fontenele — International Portfolio (davifontenele.com)

Edição internacional, bilíngue (EN / PT-BR), do portfólio audiovisual de
[davifontenele.xyz](https://davifontenele.xyz). Repositório e deploy independentes;
o original não é alterado.

Experiência fullscreen e sequencial: hero + 6 cases + About & Leadership, navegação tipo
stories e transição WebGL em faixas verticais. Stack: SvelteKit 2 + Svelte 5 (runes) +
TypeScript + CSS. Zero dependências de runtime.

## Rodando

```bash
pnpm install
pnpm dev          # http://localhost:3001
pnpm check        # svelte-check (TypeScript)
pnpm build        # saída estática em /build
pnpm preview
```

## Rotas

| URL | Conteúdo |
|---|---|
| `/` | redireciona para o idioma salvo pelo usuário, senão `/en` |
| `/en`, `/pt` | hero |
| `/en/work/<slug>`, `/pt/projetos/<slug>` | case aberto |
| `/en/about`, `/pt/sobre` | About & Leadership aberto |
| `/sitemap.xml`, `/robots.txt` | SEO |

Todas são pré-renderizadas com texto completo, `lang`, canonical e hreflang
(`en`, `pt-BR`, `x-default`). URLs desconhecidas recebem 404 real (`404.html`).

Uma única rota (`src/routes/[lang=locale]/[[section]]/[[slug]]`) atende tudo: navegar
entre cases ou trocar de idioma reutiliza a mesma instância. Vídeos e contexto WebGL não
são recriados. A URL acompanha a navegação via `replaceState`, sem recarregar a página.

## Onde fica cada coisa

```
src/lib/data/slides.ts      estrutura: ordem, mídia, cores, URLs externas (sem texto)
src/lib/i18n/
  types.ts                  contrato do dicionário (tipagem garante EN e PT completos)
  en.ts, pt-BR.ts           TODO o texto — copy aprovada em docs/copy/
  config.ts                 idiomas, segmentos de URL, rotas
  index.ts                  provideI18n/useI18n (contexto reativo)
src/lib/stores/nav.svelte.ts  estado de navegação (inalterado na essência)
src/lib/config/typography.ts  modo dos títulos — ver docs/TYPOGRAPHY.md
src/lib/components/           componentes do .xyz, agora localizados
docs/                         baseline, tipografia, mídia, copy aprovada
archive/                      conteúdo e mídia retirados (fora do build)
```

Para editar textos, edite `en.ts` e `pt-BR.ts`. Se faltar uma chave em um dos idiomas,
o `pnpm check` falha.

## Transição em faixas

`<ShaderTransition strips={18} stagger={0.42} />` em `+page.svelte`; duração de 1100 ms
(expo-out) em `nav.svelte.ts`. Os valores são os mesmos do .xyz.

## Navegação

| Ação | Desktop | Mobile |
|---|---|---|
| Avançar / voltar | scroll wheel, ← →, PageUp/Down, ↑ ↓, botões | swipe horizontal (case fechado) |
| Abrir case | botão do case, Enter | botão ou swipe para cima |
| Fechar case | "Back to fullscreen", Esc, scroll até o topo | swipe para baixo no topo |
| Início / fim | Home / End | — |

Com o case aberto, o swipe horizontal não troca de case: a rolagem vertical e as galerias
têm prioridade, e os botões continuam disponíveis.

## Analytics

Google Tag Manager `GTM-WK6KVJ2C`, carregado após `load`/idle (`src/app.html`). As
mudanças de URL na navegação usam `history.replaceState`: para registrar cada case como
página vista, configure no GTM um gatilho "Histórico".

Mídia: ver `docs/MEDIA.md`.
