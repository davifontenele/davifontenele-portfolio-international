# Depoimentos e referências

Bloco opcional no fim de cada case expandido, entre a galeria e os botões finais.
Só aparece quando o case tem conteúdo: nunca exibe placeholder.

## Onde preencher

Em `src/lib/i18n/en.ts` e `src/lib/i18n/pt-BR.ts`, dentro do case (`cases.<slug>`),
acrescente `endorsements`. Os dois idiomas precisam ter o mesmo conteúdo, na mesma ordem.

```ts
salinas: {
  name: 'Salinas',
  // …
  endorsements: {
    testimonials: [
      {
        quote: 'Texto exatamente como aprovado pela pessoa, sem aspas.',
        name: 'Nome Sobrenome',
        role: 'Cargo na época do projeto',
        organization: 'Empresa',                       // opcional
        photo: '/images/testimonials/nome.jpg',        // opcional, quadrada, ≥ 160 px
        url: 'https://www.linkedin.com/in/…',          // opcional
        translatedFrom: 'pt-BR'                        // só na versão traduzida
      }
    ],
    references: [
      {
        title: 'Título original — não traduzir',
        publication: 'Veículo, livro ou site',
        author: 'Autor',                               // opcional
        date: '2012',                                  // opcional
        url: 'https://…',                              // opcional
        note: 'Uma linha sobre a relevância (traduzir).' // opcional
      }
    ]
  }
}
```

## Regras de conteúdo

- **Depoimento só com autorização** da pessoa citada, com o texto que ela aprovou.
- **Tradução:** publique o depoimento no idioma original e, no outro idioma, a tradução
  com `translatedFrom`. O site exibe "Translated from Portuguese" / "Traduzido do inglês".
  Vale pedir à pessoa que aprove também a tradução.
- **Cargo da época**, não o atual, para não sugerir uma relação que não existia.
- **Referências:** o título fica no idioma original da publicação. Só a `note` é traduzida.
- **Sem foto:** aparecem as iniciais num círculo. Fotos são exibidas em preto e branco
  para manter a unidade visual sobre os vídeos.

## Layout

- 1º depoimento: destaque, com aspas monumentais (Roboto 900) e frase em Poppins 200.
- Demais depoimentos: grade de 2 colunas (1 no mobile).
- Referências: índice numerado, com o veículo e a data em versalete, o título como link
  sublinhado no hover e o domínio à direita.
- Entrada suave ao rolar; com movimento reduzido ou sem JavaScript, o conteúdo aparece
  sem animação.
- Marcação semântica: `figure > blockquote + figcaption > cite`, e `ol > li > cite`.

Capturas da prévia (com texto de exemplo): `docs/screenshots/testimonials/`.
