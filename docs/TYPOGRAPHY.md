# Decisão tipográfica dos slides de case

Os títulos aprovados são frases de 30–57 caracteres. A escala monumental do .xyz
(`clamp(4rem, 13vw, 12.5rem)`) foi desenhada para nomes de marca de 1–2 palavras.

Os dois modos estão implementados e alternam em `src/lib/config/typography.ts`
(`defaultTitleMode`). Para comparar no navegador: `?titles=brand` ou `?titles=statement`
(parâmetro temporário, a remover após a decisão).

## A — `statement` (padrão atual)

- A frase aprovada é o `h1`, em Roboto 900, mesmo tracking negativo, máscara por linha
  e stagger de 0.2 s.
- Escala própria: `clamp(2.6rem, 6.4vw, 7.5rem)`, line-height 0.92.
- Quebras de linha deliberadas por idioma (`titleLines` em `en.ts` / `pt-BR.ts`).
- A marca vai para o eyebrow: `02 — 3LANE MARKETING`.
- Subtítulo fullscreen em Poppins 200, escala menor e medida de 44ch.
- A máscara ganha folga para descendentes (g, p, ç), que não são mais cortados.

## B — `brand`

- O nome da marca segue monumental, como no .xyz (`3Lane / Marketing`).
- A frase aprovada vira subtítulo (Poppins 200); o subtítulo fullscreen vira texto de apoio.
- Herda o corte de descendentes do original (o "g" de "Marketing").

## Medição (56 cenários por modo: 7 slides × 2 idiomas × 4 telas)

| Tela | A: fonte do título | A: problemas | B: fonte | B: problemas |
|---|---|---|---|---|
| 1440×900 | 92 px | 0 | 187 px | 1 (Espaço Fashion PT) |
| 1280×720 | 82 px | 0 | 166 px | 6 (3Lane, Espaço Fashion, Rocinha UP) |
| 768×1024 | 49 px | 0 | 100 px | 0 |
| 390×844 | 42 px | 0 | 64 px | 0 |

"Problema" = o botão do case sobrepõe o indicador de progresso, ou o título invade o menu
ou ultrapassa a largura da tela. Em B, título de 2 linhas + frase + subtítulo não cabem em
telas baixas.

Capturas: `docs/screenshots/typography/`.
