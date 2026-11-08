/**
 * Decisão tipográfica dos slides de case (ver docs/TYPOGRAPHY.md).
 * - 'statement': a frase aprovada é o título, em escala própria; a marca vai para o eyebrow.
 * - 'brand': o nome da marca segue monumental (como no .xyz); a frase vira subtítulo.
 * TEMPORÁRIO: `?titles=brand` ou `?titles=statement` alterna no navegador, para comparação.
 */
export type TitleMode = 'statement' | 'brand';
export const defaultTitleMode: TitleMode = 'statement';
