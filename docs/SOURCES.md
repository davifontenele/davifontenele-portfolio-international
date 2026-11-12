# Fontes e notas de rodapé

Citações no estilo Wikipédia: `[1]` sobrescrito no texto, com a lista de fontes em fonte
reduzida no fim do case. Clicar no número leva à nota; clicar no número da nota volta ao
ponto do texto. A URL não muda.

## Como citar

1. No texto do case (`en.ts` e `pt-BR.ts`), coloque `[^id]` logo **depois** da pontuação:

   ```ts
   text: 'Menos de um em cada cinco brasileiros tinha um smartphone.[^ibope-win-2012] …'
   ```

   Várias fontes juntas: `…no feed.[^tubefilter-2013][^engadget-2013]`

2. No mesmo case, liste as fontes em `sources` (a ordem da lista não importa):

   ```ts
   sources: [
     {
       id: 'ibope-win-2012',                 // o mesmo id usado no texto, igual nos 2 idiomas
       title: 'Base de smartphones duplica no Brasil',   // título original, sem traduzir
       publisher: 'Baguete',
       date: '25 jan. 2013',                 // opcional, já no formato do idioma
       url: 'https://…',                     // opcional
       note: 'Pesquisa Ibope Conecta/WIN'    // opcional, traduzido
     }
   ]
   ```

A numeração é automática, pela ordem da primeira citação no texto. A mesma fonte citada
duas vezes mantém o mesmo número.

## Verificação

`pnpm dev` e `pnpm build` avisam no terminal (e no log do Vercel) quando:

- o texto cita um `[^id]` que não está em `sources` (o número não aparece no site);
- uma fonte está em `sources` mas não é citada;
- as fontes de um case diferem entre EN e PT.
