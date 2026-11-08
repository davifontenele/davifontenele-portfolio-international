# Mídia

Todo o mapeamento de mídia fica em `src/lib/data/slides.ts`, sem texto editorial.

## Vídeos de fundo

```
static/videos/<arquivo>.webm   desktop (preferido)
static/videos/<arquivo>.mp4    fallback e mobile sem corte próprio
static/videos/<arquivo>-mobile.mp4   opcional — declarar com { mobile: true }
static/posters/<poster>.jpg    poster / fallback estático
```

| Slide | Arquivo | Mobile | Situação |
|---|---|---|---|
| Hero | `hero` | sim | ok |
| AuAg | `auag` | não | ok |
| 3Lane Marketing | `3lane` | — | **vídeo e poster pendentes** (`missing: true`) |
| Reserva | `reserva` | não | ok |
| Espaço Fashion | `espaco-fashion` | sim | ok |
| Salinas | `salinas` | não | ok |
| Rocinha UP | `rocinha-up` | não | ok |
| About & Leadership | `why-davi` | sim | reaproveitado do .xyz |

`missing: true` não faz nenhuma requisição: o shader desenha o gradiente procedural com a
cor `accent` e o fallback CSS mostra o mesmo gradiente. Quando o vídeo chegar, basta
salvar os arquivos e trocar `media('3lane', { missing: true })` por `media('3lane')`.

Para usar `/videos/about.*` no lugar de `why-davi`, troque `media('why-davi', …)` por
`media('about', …)` no slide `about`.

**Especificação sugerida** (a mesma do .xyz): 1920×1080, sem áudio, 8–15 s em loop limpo,
WebM/VP9 2–4 Mbps (desktop), MP4/H.264 ~1 Mbps (mobile).

## Carregamento

- Recebem `src`: o slide atual, o destino da transição e os vizinhos imediatos.
- `preload="auto"`: atual, destino e o **próximo** (a transição já começa com imagem real).
- `preload="metadata"`: o anterior.
- Tocam: só o atual e o destino. Os demais ficam pausados ou descarregados.

## Galerias do case expandido

`slides[].media = [{ src, kind: 'image' | 'video' }]`. O texto alternativo fica no
dicionário, na mesma ordem: `cases.<slug>.mediaAlt`.

3Lane: `threeLaneProjects[].image` aceita uma captura por projeto. Sem imagem, o card
mostra só texto (sem placeholder público). Use capturas da época do trabalho, não dos sites
atuais.

## Arquivo

Mídia dos cases retirados (Metais Pesados, Geológico) foi movida para `archive/static/`,
fora da pasta publicada. Nada foi apagado.
