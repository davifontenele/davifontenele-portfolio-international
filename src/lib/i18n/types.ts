import type { CaseSlug, LinkLabelKey } from '$lib/data/slides';

/**
 * Texto com ênfase opcional em **negrito** (único marcador suportado).
 * Renderizado por <RichText>, sem {@html}.
 */
export type Rich = string;

/** Blocos editoriais dentro de uma seção do case expandido. */
export type Block =
  | { type: 'p'; text: Rich }
  /** Subtítulo em negrito dentro da seção (ex.: "Reducing perceived complexity"). */
  | { type: 'sub'; text: Rich }
  /** Frase de destaque isolada (ex.: "When life gives you lemons…"). */
  | { type: 'statement'; text: Rich }
  | { type: 'list'; items: Rich[] }
  /** Galeria dos nove projetos da 3Lane (dados em slides.ts + `projects`). */
  | { type: 'projects' };

/** `id` é estável entre idiomas; `heading` é o texto exibido. */
export type CaseSection = {
  id:
    | 'overview'
    | 'context'
    | 'challenge'
    | 'strategy'
    | 'idea'
    | 'execution'
    | 'beyond'
    | 'solution'
    | 'work'
    | 'role'
    | 'outcomes'
    | 'principle';
  heading: string;
  blocks: Block[];
};

/** Depoimento de uma pessoa real, com autorização para publicação. */
export type Testimonial = {
  /** Texto exatamente como aprovado pelo autor (sem aspas). */
  quote: string;
  name: string;
  /** Cargo/função na época do projeto. */
  role: string;
  organization?: string;
  /** Foto quadrada em /static (ex.: '/images/testimonials/nome.jpg'). Opcional. */
  photo?: string;
  /** Perfil público (LinkedIn etc.). Opcional. */
  url?: string;
  /**
   * Idioma original, quando o texto exibido é uma tradução.
   * Ex.: depoimento dado em português exibido na versão EN → `translatedFrom: 'pt-BR'`.
   */
  translatedFrom?: 'en' | 'pt-BR';
  /**
   * Depoimento de extrema importância: abre o detalhamento do case, antes da
   * visão geral (e sai do bloco final). Marque o mesmo depoimento nos dois idiomas.
   */
  highlight?: boolean;
};

/** Referência bibliográfica ou de imprensa sobre o projeto. */
export type Reference = {
  /** Título original da publicação — não traduzir. */
  title: string;
  /** Veículo, livro, site ou evento. */
  publication: string;
  author?: string;
  /** Ano ou data como deve aparecer (ex.: '2011', 'Mar. 2011'). */
  date?: string;
  url?: string;
  /** Linha curta explicando a relevância. Localizada. */
  note?: string;
};

/**
 * Fonte citada no texto do case, estilo Wikipédia.
 * No texto, cite com `[^id]` logo após a pontuação: "…no feed.[^engadget]".
 * A numeração [1], [2]… é automática, pela ordem da primeira citação.
 */
export type Source = {
  /** Identificador usado no texto: [^id]. Igual nos dois idiomas. */
  id: string;
  /** Título original da matéria/estudo — não traduzir. */
  title: string;
  /** Veículo ou instituição. */
  publisher: string;
  /** Data já formatada no idioma (ex.: '25 jan. 2013' / 'Jan 25, 2013'). */
  date?: string;
  url?: string;
  /** Complemento curto (ex.: 'dados Ibope Conecta/WIN'). Localizado. */
  note?: string;
};

export type Endorsements = {
  testimonials?: Testimonial[];
  references?: Reference[];
};

export type CaseCopy = {
  /** Nome da marca/projeto — progresso, eyebrow, metadados. */
  name: string;
  /** Título fullscreen com quebras de linha deliberadas por idioma. */
  titleLines: string[];
  subtitle: string;
  cta: string;
  sections: CaseSection[];
  expertise: string[];
  /** Texto alternativo da galeria, na mesma ordem de `slides[].media`. */
  mediaAlt?: string[];
  /** Fontes citadas no texto com [^id]; listadas como notas no fim do case. */
  sources?: Source[];
  /** Depoimentos e referências exibidos no fim do case (ver docs/TESTIMONIALS.md). */
  endorsements?: Endorsements;
  /** Somente 3Lane: nome e descrição dos nove projetos, por id. */
  projects?: Record<string, { name: string; description: string }>;
};

export type Dictionary = {
  locale: 'en' | 'pt-BR';
  meta: {
    siteName: string;
    homeTitle: string;
    homeDescription: string;
    aboutTitle: string;
    ogLocale: string;
  };
  nav: {
    menuLabel: string;
    work: string;
    about: string;
    contact: string;
    languageLabel: string;
    /** Nome do OUTRO idioma, para o rótulo acessível do seletor. */
    switchTo: string;
  };
  ui: {
    exploreWork: string;
    backToFullscreen: string;
    previous: string;
    next: string;
    scrollHint: string;
    swipeHint: string;
    backToTop: string;
    expertise: string;
    gallery: string;
    testimonials: string;
    sources: string;
    sourceRef: (n: number) => string;
    backToText: string;
    references: string;
    translatedFrom: Record<'en' | 'pt-BR', string>;
    getInTouch: string;
    /** Rótulos acessíveis (a11y). */
    caseRegion: (name: string) => string;
    fullCaseRegion: (name: string) => string;
    scrollToContent: (name: string) => string;
    videoFrame: (name: string) => string;
    opensInNewTab: string;
    pauseVideo: string;
    playVideo: string;
    reduceMotion: string;
    enableMotion: string;
  };
  links: Record<LinkLabelKey, string>;
  hero: {
    nameLines: string[];
    role: string;
    expertise: string;
    statement: string;
    supporting: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  selectedWork: { eyebrow: string; title: string; intro: string };
  cases: Record<CaseSlug, CaseCopy>;
  about: {
    eyebrow: string;
    titleLines: string[];
    cta: string;
    intro: string[];
    philosophy: { heading: string; items: { title: string; paragraphs: string[] }[] };
    ai: { heading: string; statement: string; paragraphs: string[] };
    glance: { heading: string; items: { value: string; label: string }[] };
    contact: {
      heading: string;
      title: string;
      paragraphs: string[];
      ctaPrimary: string;
      ctaSecondary: string;
      name: string;
      role: string;
      location: string;
      whatsappLabel: string;
    };
  };
  whatsappMessage: string;
  footer: string;
  notFound: { title: string; body: string; back: string };
};
