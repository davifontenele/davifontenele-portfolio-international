/**
 * Estrutura da experiência — SEM texto editorial.
 * ------------------------------------------------------------------
 * Aqui ficam ordem, mídia, cor de placeholder e URLs externas.
 * Todo texto visível vive em `src/lib/i18n/{en,pt-BR}.ts`.
 *
 * Mídia (ver docs/MEDIA.md):
 *   static/videos/<arquivo>.webm  +  .mp4
 *   static/videos/<arquivo>-mobile.mp4   (opcional, `mobile: true`)
 *   static/posters/<poster>.jpg
 * `missing: true` = vídeo ainda não entregue. Nenhuma requisição é feita;
 * o shader desenha o gradiente procedural com a cor `accent`.
 * ------------------------------------------------------------------
 */

export const caseSlugs = [
  'auag',
  '3lane',
  'reserva',
  'espaco-fashion',
  'salinas',
  'rocinha-up'
] as const;

export type CaseSlug = (typeof caseSlugs)[number];
export type SlideSlug = 'hero' | CaseSlug | 'about';
export type SlideType = 'hero' | 'case' | 'final';

export type VideoSources = {
  webm?: string;
  mp4?: string;
  /** Vazio = sem poster (mídia ainda não entregue). */
  poster: string;
  /** Versão leve para telas de toque / estreitas. */
  mp4Mobile?: string;
};

/** Item de galeria do case expandido. Legendas/alt vêm do dicionário (mesmo índice). */
export type MediaItem = { src: string; kind: 'image' | 'video' };

/** Link externo. O rótulo vem do dicionário pela chave `label`. */
export type ExternalLink = { href: string; label: LinkLabelKey };
export type LinkLabelKey =
  | 'visitWebsite'
  | 'watchCampaign'
  | 'readArticle'
  | 'ifAward'
  | 'brandGuidelines'
  | 'linkedin'
  | 'behance';

export type Slide = {
  slug: SlideSlug;
  type: SlideType;
  video: VideoSources;
  accent: string;
  links?: ExternalLink[];
  media?: MediaItem[];
};

const media = (
  file: string,
  {
    mobile = false,
    poster = file,
    missing = false
  }: { mobile?: boolean; poster?: string; missing?: boolean } = {}
): VideoSources =>
  missing
    ? { poster: poster === file ? '' : `/posters/${poster}.jpg` }
    : {
        webm: `/videos/${file}.webm`,
        mp4: `/videos/${file}.mp4`,
        poster: `/posters/${poster}.jpg`,
        ...(mobile ? { mp4Mobile: `/videos/${file}-mobile.mp4` } : {})
      };

export const slides: Slide[] = [
  {
    slug: 'hero',
    type: 'hero',
    video: media('hero', { mobile: true }),
    accent: '#2b2f36'
  },
  {
    slug: 'auag',
    type: 'case',
    video: media('auag_new'),
    accent: '#3b3320',
    links: [{ href: 'https://auag.com', label: 'visitWebsite' }]
  },
  {
    slug: '3lane',
    type: 'case',
    video: media('design-direction'),
    accent: '#22303f'
  },
  {
    slug: 'reserva',
    type: 'case',
    video: media('reserva'),
    accent: '#3a2a24',
    links: [{ href: 'https://www.youtube.com/watch?v=kYinwiH9pD0', label: 'watchCampaign' }],
    media: [
      { src: '/images/reserva1.jpg', kind: 'image' },
      { src: '/images/reserva2.jpg', kind: 'image' },
      { src: '/images/reserva3.jpg', kind: 'image' }
    ]
  },
  {
    slug: 'espaco-fashion',
    type: 'case',
    video: media('espaco-fashion', { mobile: true }),
    accent: '#3a2b33',
    links: [
      { href: 'https://fazemos.xyz/espacofashion/verao2011/', label: 'visitWebsite' },
      { href: 'https://ifdesign.com/de/winner-ranking/project/espaco-fashion/81107', label: 'ifAward' }
    ],
    media: [
      { src: '/images/espaco-fashion1.jpg', kind: 'image' },
      { src: '/images/espaco-fashion2.jpg', kind: 'image' },
      { src: '/images/espaco-fashion3.jpg', kind: 'image' }
    ]
  },
  {
    slug: 'salinas',
    type: 'case',
    video: media('salinas'),
    accent: '#243a3a',
    links: [
      { href: 'https://fazemos.xyz/salinas2', label: 'visitWebsite' },
      {
        href: 'https://webdesignerdepot.com/101-examples-of-text-treatments-on-the-web/',
        label: 'readArticle'
      }
    ],
    media: [
      { src: '/images/salinas1.jpg', kind: 'image' },
      { src: '/images/salinas2.jpg', kind: 'image' },
      { src: '/images/salinas3.jpg', kind: 'image' }
    ]
  },
  {
    slug: 'rocinha-up',
    type: 'case',
    video: media('rocinha-up_novo'),
    accent: '#1f3a2c',
    links: [
      { href: 'https://rocinhaup.com', label: 'visitWebsite' },
      { href: 'https://manual.rocinhaup.com', label: 'brandGuidelines' }
    ]
  },
  {
    slug: 'about',
    type: 'final',
    // Reaproveita o vídeo do antigo "Por que Davi?". Trocar por /videos/about.* quando existir.
    video: media('why-davi', { mobile: true }),
    accent: '#26262b',
    links: [
      { href: 'https://linkedin.com/in/oidavi', label: 'linkedin' },
      { href: 'https://be.net/fzms', label: 'behance' }
    ]
  }
];

/**
 * 3Lane: nove projetos. `image` fica vazio até existirem capturas da época
 * do trabalho (os sites publicados hoje podem não corresponder às entregas).
 */
export type ThreeLaneProject = { id: string; url: string; domain: string; image?: string };
export const threeLaneProjects: ThreeLaneProject[] = [
  { id: 'mcls', url: 'https://mcls.org', domain: 'mcls.org' },
  { id: 'cpex', url: 'https://cpex.org', domain: 'cpex.org' },
  { id: 'fcc', url: 'https://www.ncfamilychildcare.org', domain: 'ncfamilychildcare.org' },
  { id: 'sga', url: 'https://www.smartgrowthamerica.org', domain: 'smartgrowthamerica.org' },
  { id: 'nwctm', url: 'https://www.nwctmanufacturing.com/', domain: 'nwctmanufacturing.com' },
  { id: 'nwcthc', url: 'https://www.nwcthealthconnect.com/', domain: 'nwcthealthconnect.com' },
  { id: 'marco', url: 'https://www.midatlanticocean.org', domain: 'midatlanticocean.org' },
  { id: 'macan', url: 'https://midacan.org', domain: 'midacan.org' },
  { id: 'detroitpbs', url: 'https://www.detroitpbs.org', domain: 'detroitpbs.org' }
];

export const contact = {
  whatsappNumber: '5521998528319',
  whatsappLabel: '+55 21 99852-8319'
};

/** Monta o link do WhatsApp com a mensagem já codificada. */
export function whatsappUrl(message: string): string {
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const totalSlides = slides.length;
export const caseIndex = (slug: SlideSlug) => slides.findIndex((s) => s.slug === slug);
