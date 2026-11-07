/**
 * Conteúdo do site.
 * ------------------------------------------------------------------
 * Para trocar por arquivos reais, basta substituir os caminhos em `video`.
 * Os arquivos devem viver em:
 *   static/videos/<slug>.webm  +  static/videos/<slug>.mp4
 *   static/videos/<slug>-mobile.mp4          (opcional; se faltar, usa o desktop)
 *   static/posters/<slug>.jpg
 * Enquanto os arquivos não existirem, o poster/gradiente de placeholder aparece.
 * ------------------------------------------------------------------
 */

export type CaseItem = {
  slug: string;
  title: string;
  /** Quebra de linha do título monumental. Se ausente, usa [title]. */
  titleLines?: string[];
  subtitle: string;
  CTALabel: string;
  shortText: string;
  context: string;
  challenge: string;
  solution: string[];
  role: string;
  skills: string[];
  video: {
    webm: string;
    mp4: string;
    poster: string;
    /** Versões mais leves para mobile (opcional). */
    webmMobile?: string;
    mp4Mobile?: string;
  };
  accent?: string;
  type: 'hero' | 'case' | 'final';
  /** Blocos extras (só usados no slide final). */
  extra?: { title: string; paragraphs: string[] }[];
  link?: string;
  linkLabel?: string;
  link2?: string;
  link2Label?: string;
  /** Galeria complementar do case aberto — imagens/vídeos a adicionar depois. */
  media?: { src: string; alt: string; kind: 'image' | 'video' }[];
};

export const contact = {
  name: 'Davi Fontenele',
  role: 'Designer criativo · Filmmaker · Especialista em IA',
  location: 'Rio de Janeiro',
  whatsappLabel: '+55 21 99852-8319',
  whatsapp:
    'https://wa.me/5521998528319?text=Ol%C3%A1%2C%20Davi.%20Conheci%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar%20sobre%20sua%20experi%C3%AAncia%20profissional.'
};

/**
 * Caminhos de mídia do case.
 * Variantes mobile só são declaradas quando o arquivo existe. Isso evita
 * 404s e impede o navegador de baixar fontes desktop desnecessariamente.
 */
const media = (
  slug: string,
  { mobile = false, poster = slug }: { mobile?: boolean; poster?: string } = {}
) => ({
  webm: `/videos/${slug}.webm`,
  mp4: `/videos/${slug}.mp4`,
  poster: `/posters/${poster}.jpg`,
  ...(mobile ? { mp4Mobile: `/videos/${slug}-mobile.mp4` } : {})
});

export const cases: CaseItem[] = [
  {
    slug: 'hero',
    type: 'hero',
    title: 'Davi Fontenele',
    titleLines: ['Davi', 'Fontenele'],
    subtitle:
      'Designer criativo, filmmaker e especialista em inteligência artificial aplicada à comunicação.',
    CTALabel: 'Ver projetos',
    shortText:
      'Design, vídeo, tecnologia e narrativa visual para transformar ideias complexas em comunicação clara, relevante e memorável.',
    context: '',
    challenge: '',
    solution: [],
    role: '',
    skills: [],
    video: media('hero', { mobile: true }),
    accent: '#2b2f36'
  },
  {
    slug: 'reserva',
    type: 'case',
    title: 'Reserva',
    subtitle: 'O assalto que virou identidade de marca',
    CTALabel: 'Ver case completo',
    shortText:
      'Uma campanha criada a partir de imagens de segurança que não apenas viralizou: ativou o e-commerce da marca, gerou crescimento expressivo de vendas e ajudou a cristalizar o espírito “transformar limões em limonada” como parte da identidade pública e interna da Reserva.',
    context:
      'Após o assalto a uma loja da Reserva, a marca tinha em mãos imagens de câmera de segurança de um episódio negativo. Em vez de tratar o acontecimento apenas como crise, surgiu a oportunidade de transformar o fato em uma narrativa criativa, bem-humorada e alinhada à personalidade da grife.',
    challenge:
      'Criar uma resposta rápida, sensível e inteligente para um episódio de violência urbana, sem vitimizar a marca nem explorar o acontecimento de forma inadequada. A ação precisava ter timing, linguagem, clareza narrativa e aderência ao espírito da Reserva — além de funcionar como ativação para um e-commerce ainda incipiente.',
    solution: [
      'As imagens brutas de segurança foram ressignificadas, em uma iniciativa própria e a duas mãos, em uma campanha audiovisual que transformava o problema em atitude de marca. A peça também foi utilizada como ativação para o e-commerce da Reserva, então ainda em estágio inicial, contribuindo para um crescimento de aproximadamente 9.900% nas vendas durante o período da ação.',
      'A campanha viralizou, gerou repercussão espontânea em veículos nacionais e internacionais e ajudou a consolidar o mote “transformar limões em limonada” como um símbolo da Reserva.',
      'Mais do que uma campanha pontual, a ideia passou a ecoar internamente e externamente, reaparecendo em ações, campanhas, conteúdos, vinhetas e mini documentários sobre empreendedorismo, dores e desafios de quem constrói negócios.',
      '7 anos depois, a Reserva foi vendida por R$715 milhões.'
    ],
    role: 'Atuação criativa na construção da narrativa, edição e transformação das imagens originais em uma peça de comunicação com ritmo, humor, impacto, força simbólica e capacidade de ativação comercial para a marca.',
    skills: [
      'Direção criativa',
      'Storytelling',
      'Edição audiovisual',
      'Comunicação de crise',
      'Marketing de guerrilha',
      'Branding',
      'Cultura de marca',
      'Conteúdo viral',
      'Estratégia de comunicação',
      'Ativação',
      'E-commerce',
      'Impacto de negócio',
      'Produção musical'
    ],
    link: 'https://www.youtube.com/watch?v=kYinwiH9pD0',
    linkLabel: 'Assista a campanha',
    video: media('reserva'),
    accent: '#3a2a24',
    media: [
      { src: '/images/reserva1.jpg', alt: 'Video Screenshot', kind: 'image' },
      { src: '/images/reserva2.jpg', alt: 'Video Screenshot', kind: 'image' },
      { src: '/images/reserva3.jpg', alt: 'Video Screenshot', kind: 'image' }
    ]
  },
  {
    slug: 'auag',
    type: 'case',
    title: 'AuAg',
    subtitle: 'Refinamento visual para uma fintech de metais preciosos',
    CTALabel: 'Ver case completo',
    shortText:
      'Design de produto, UX/UI e narrativa visual para transformar uma hipótese de negócio em uma experiência premium, clara e convincente para usuários e investidores.',
    context:
      'A AuAg é uma startup fintech voltada ao mercado de metais preciosos, com proposta de tornar ativos como ouro, prata e platina mais acessíveis por meio de uma experiência digital moderna.',
    challenge:
      'Dar robustez e refinamento a uma hipótese de produto ainda em desenvolvimento, criando uma linguagem visual capaz de comunicar valor, segurança, inovação e potencial de mercado. Além disso, era necessário organizar informações financeiras complexas de forma acessível, especialmente em ambiente mobile.',
    solution: [
      'Criação de uma experiência digital com foco em clareza, hierarquia visual e percepção premium. O trabalho envolveu telas de portfólio, compra e venda de metais, visualização de ativos, dashboards, gráficos, sistema de recompensas, metalback, componentes animados, investor deck e direção visual dos materiais institucionais.'
    ],
    role: 'Atuação em UX/UI, direção de arte, design de produto, narrativa visual, prototipação, especificação de interface, criação de vídeos em Inteligência Artificial e desenvolvimento front-end em Svelte/SvelteKit.',
    skills: [
      'Product design',
      'Direção de arte',
      'UX/UI',
      'Figma',
      'Data visualization',
      'Prototipação',
      'Motion',
      'Geração de vídeos em IA',
      'Tratamento de imagens em IA',
      'Fintech',
      'Svelte/SvelteKit',
      'Branding',
      'Investor deck'
    ],
    link: 'https://auag.com',
    linkLabel: 'Visite o site',
    video: media('auag'),
    accent: '#3b3320'
  },
  {
    slug: 'rocinha-up',
    type: 'case',
    title: 'Rocinha UP',
    titleLines: ['Rocinha', 'UP'],
    subtitle: 'Identidade visual para impacto social, capacitação e geração de renda',
    CTALabel: 'Ver case completo',
    shortText:
      'Uma identidade e plataforma para transformar materiais descartados do jiu-jítsu em moda, decoração, capacitação profissional e oportunidade.',
    context:
      'O Rocinha UP é um projeto social baseado em economia circular, capacitação e geração de renda. Com fomento da FAPERJ, a iniciativa parte do reaproveitamento de materiais do universo do jiu-jítsu — como kimonos, faixas e tatames — para criar produtos, oficinas, cursos e possibilidades de trabalho dentro da comunidade da Rocinha.',
    challenge:
      'Criar uma identidade capaz de comunicar, ao mesmo tempo, consciência ambiental, formação profissional, empreendedorismo, pertencimento comunitário e sofisticação estética. O projeto precisava funcionar como escola, plataforma, grife e iniciativa social.',
    solution: [
      'Desenvolvimento de uma linguagem visual inspirada no jiu-jítsu, no upcycling e na ideia de transformação. A identidade foi desdobrada em símbolo, sistema visual, iconografia, site, materiais de apresentação, vídeos, mockups, pontos de coleta e documentação para prestação de contas.'
    ],
    role: 'Criação da identidade visual, narrativa de marca, direção de arte, design de interface, materiais digitais, iconografia, mockups, vídeos e peças de comunicação.',
    skills: [
      'Branding',
      'Design social',
      'UX/UI',
      'Geração de vídeos em IA',
      'Sustentabilidade',
      'Economia circular',
      'Iconografia',
      'Comunicação institucional',
      'Direção de arte',
      'Vídeo',
      'Documentação'
    ],
    link: 'https://rocinhaup.com',
    linkLabel: 'Visite o site',
    video: media('rocinha-up'),
    accent: '#1f3a2c'
  },
  {
    slug: 'metais-pesados',
    type: 'case',
    title: 'Metais Pesados',
    titleLines: ['Metais', 'Pesados'],
    subtitle: 'Subindo a barra de uma banda com mais de dez anos de estrada',
    CTALabel: 'Ver história completa',
    shortText:
      'Uma banda independente transformada em linguagem audiovisual, com campanhas, vídeos, cartazes, landing page e comunicação digital alinhadas ao espírito “É Rock de Rua!”.',
    context:
      'A Metais Pesados é uma fanfarra de rock com mais de dez anos de trajetória, presença em eventos de rua e uma identidade musical muito própria: instrumentos de sopro, percussão, cultura urbana e repertório de rock and roll.',
    challenge:
      'Elevar a percepção visual da banda, criando materiais capazes de comunicar energia, peso, humor, rua e profissionalismo. Além da divulgação de shows, havia a necessidade de produzir vídeos e campanhas para inscrições em editais, redes sociais e mobilização de público.',
    solution: [
      'Criação de uma linguagem visual e audiovisual com forte presença de vídeo, cartazes, teasers, reels, mockups, chamadas para eventos, landing page com QR Code e narrativas digitais para aproximar o público da banda antes, durante e depois dos shows.'
    ],
    role: 'Direção criativa, criação de campanhas, edição de vídeos, motion graphics, peças gráficas, landing page, narrativa visual e estratégia de comunicação digital.',
    skills: [
      'Filmmaking',
      'Geração de vídeos em IA',
      'Geração de imagens em IA',
      'Edição',
      'Motion graphics',
      'Direção criativa',
      'Design gráfico',
      'Campanhas',
      'Redes sociais',
      'Cultura urbana',
      'Música',
      'Landing page',
      'Comunicação para editais'
    ],
    link: 'https://mtaispesados.netlify.app',
    linkLabel: 'Visite o site',
    link2: 'https://www.instagram.com/p/DauKa4uoNt6/',
    link2Label: 'Assista a campanha',
    video: media('metais-pesados'),
    accent: '#3a2130',
    media: [
      { src: '/images/metais-pesados1.jpg', alt: 'Video Screenshot', kind: 'image' },
      { src: '/images/metais-pesados2.jpg', alt: 'Video Screenshot', kind: 'image' }
    ]
  },
  {
    slug: 'salinas',
    type: 'case',
    title: 'Salinas',
    subtitle: 'Tipografia, animação e identidade digital para uma autoridade da moda praia',
    CTALabel: 'Ver case completo',
    shortText:
      'Um site de moda em que tipografia, animação e interação fortaleceram a presença digital da Salinas, com reconhecimento internacional em curadoria de design web.',
    context:
      'A Salinas precisava de uma presença online que traduzisse sua personalidade de marca de forma viva, leve e interativa. O site não deveria ser apenas uma vitrine digital, mas uma experiência alinhada ao universo visual da grife.',
    challenge:
      'Criar uma experiência digital com forte identidade, capaz de usar animação e tratamento tipográfico como elementos centrais de expressão da marca. O projeto precisava ser visualmente memorável sem comprometer a navegação e a comunicação.',
    solution: [
      'Criação de um site interativo repleto de animações autorais, com tratamentos de texto, movimento e transições desenhados para reforçar o universo da Salinas. O projeto foi listado como o primeiro exemplo no artigo internacional “101 Examples of Text Treatments on the Web” e permaneceu quatro anos no ar, refletindo sua aderência à identidade da marca.'
    ],
    role: 'Criação das animações do site, tratamentos tipográficos, interações visuais e participação na construção da experiência digital da marca.',
    skills: [
      'Animação',
      'Web design',
      'ActionScript',
      'UX/UI',
      'Front-end',
      'Otimização de performance',
      'Tipografia',
      'Design interativo',
      'Direção de arte',
      'Fashion branding',
      'Identidade digital',
      'Experiência de marca'
    ],
    link: 'https://fazemos.xyz/salinas2',
    linkLabel: 'Visite o site',
    link2: 'https://webdesignerdepot.com/101-examples-of-text-treatments-on-the-web/',
    link2Label: 'Veja o artigo',
    video: media('salinas'),
    accent: '#243a3a',
    media: [
      { src: '/images/salinas1.jpg', alt: 'Website Screenshot', kind: 'image' },
      { src: '/images/salinas2.jpg', alt: 'Website Screenshot', kind: 'image' },
      { src: '/images/salinas3.jpg', alt: 'Website Screenshot', kind: 'image' }
    ]
  },
  {
    slug: 'geologico',
    type: 'case',
    title: 'Geológico',
    subtitle: 'Um canal preparatório para o ENEM produzido em um fim de semana',
    CTALabel: 'Ver história completa',
    shortText:
      'Em um único fim de semana, seis episódios-piloto de um canal de geografia foram captados e editados com chroma key, identidade visual, vinheta e fundos temáticos às vésperas do ENEM.',
    context:
      'Geológico foi um projeto piloto para um canal de aulas online de geografia, criado em um momento de urgência: a proximidade do ENEM. Era necessário produzir rapidamente uma amostra funcional, visualmente organizada e tecnicamente convincente do que poderia se tornar uma plataforma de educação a distância.',
    challenge:
      'Criar, captar e editar múltiplos episódios em curtíssimo prazo, mantendo consistência visual, clareza didática e acabamento profissional. O projeto precisava demonstrar viabilidade de formato, linguagem e identidade para um canal educacional.',
    solution: [
      'Produção de seis episódios-piloto com captação em chroma key, aplicação de imagens de fundo relacionadas aos temas das aulas, transições de tela, criação de logotipo, vinheta e identidade visual básica do canal.'
    ],
    role: 'Criação da identidade visual, captação, edição, chroma key, vinheta, transições e finalização dos episódios.',
    skills: [
      'Filmmaking',
      'Educação',
      'Chroma key',
      'Edição',
      'Vinheta',
      'Identidade visual',
      'Motion graphics',
      'Produção ágil',
      'Conteúdo didático',
      'Pós-produção'
    ],
    video: media('geologico-novo', { poster: 'geologico' }),
    accent: '#22303f',
    media: [
      { src: '/images/geologico1.jpg', alt: 'Logotype Detail', kind: 'image' },
      { src: '/images/geologico2.jpg', alt: 'Mountain Illustration', kind: 'image' },
      { src: '/images/geologico3.jpg', alt: 'Monochrome Logotype', kind: 'image' }
    ]
  },
  {
    slug: 'espaco-fashion',
    type: 'case',
    title: 'Espaço Fashion',
    titleLines: ['Espaço', 'Fashion'],
    subtitle: 'O primeiro catálogo interativo do Brasil, premiado com o iFAwards',
    CTALabel: 'Ver case completo',
    shortText:
      'Uma experiência digital premiada com o iF Communication Design Award, que transformou consumidoras em parte ativa da comunicação da marca e antecipou práticas de participação e conteúdo gerado pelo usuário.',
    context:
      'Em uma época anterior à consolidação das redes sociais como principal ambiente de relacionamento entre marcas e público, a Espaço Fashion apostou em uma experiência digital interativa para aproximar consumidoras da marca e ampliar o alcance de seu catálogo.',
    challenge:
      'Criar um catálogo online que não fosse apenas uma reprodução digital de peças de moda, mas uma experiência participativa, compartilhável e alinhada ao comportamento emergente da internet.',
    solution: [
      'Desenvolvimento de um catálogo interativo que permitia participação do público e transformava a experiência de navegação em uma ação de engajamento. O projeto antecipava, na prática, lógicas que anos depois seriam amplamente chamadas de UGC — User-Generated Content.',
      'A campanha viralizou, gerou repercussão espontânea e aumentou em mais de 3000% a audiência da marca nas redes sociais.',
      'O projeto conquistou o iF Communication Design Award (categoria microsites), uma das maiores premiações internacionais do design, foi vencedor geral do prêmio Peixe Grande, foi "shortlisted" no Favorite Website Awards (TheFWA), além de ter sito listado em outras diversos galerias de referência, reforçando seu caráter pioneiro e sua excelência em experiência digital.'
    ],
    role: 'Atuação em design digital, direção de arte e construção da experiência interativa em ActionScript.',
    skills: [
      'Web design',
      'Design interativo',
      'Direção de arte',
      'ActionScript',
      'UX/UI',
      'Front-end',
      'Moda',
      'UGC',
      'Experiência digital',
      'Participação do público',
      'Premiação internacional',
      'iF Communication Design Award',
      'Inovação em comunicação'
    ],
    link: 'https://fazemos.xyz/espacofashion/verao2011/',
    linkLabel: 'Visite o site',
    link2: 'https://ifdesign.com/de/winner-ranking/project/espaco-fashion/81107',
    link2Label: 'Prêmio iF Communication Design Award',
    video: media('espaco-fashion', { mobile: true }),
    accent: '#3a2b33',
    media: [
      { src: '/images/espaco-fashion1.jpg', alt: 'Website Screenshot', kind: 'image' },
      { src: '/images/espaco-fashion2.jpg', alt: 'Website Screenshot', kind: 'image' },
      { src: '/images/espaco-fashion3.jpg', alt: 'Website Screenshot', kind: 'image' }
    ]
  },
  /*{
    slug: 'zango',
    type: 'case',
    title: 'ZANGO',
    subtitle: 'Comunicação digital internacional para Angola',
    CTALabel: 'Ver case completo',
    shortText:
      'Um projeto digital completo reunindo site, rádio web, templates sociais e documentação operacional para dar autonomia de comunicação a um cliente internacional.',
    context:
      'ZANGO foi um projeto internacional voltado à construção de uma presença digital estruturada, combinando site, rádio web, comunicação social e materiais de apoio para operação contínua.',
    challenge:
      'Criar uma solução digital funcional, comunicável e administrável, capaz de atender às necessidades imediatas do cliente e, ao mesmo tempo, oferecer autonomia para atualização e manutenção posterior.',
    solution: [
      'Desenvolvimento de site em WordPress, rádio web, templates para Instagram, documentação e orientação operacional, formando um conjunto de ferramentas digitais para comunicação e gestão de conteúdo.'
    ],
    role: 'Design e desenvolvimento do site, estruturação da rádio web, criação de templates, documentação e suporte à operação digital.',
    skills: [
      'Web design',
      'WordPress',
      'Rádio web',
      'Social media',
      'Templates',
      'Documentação',
      'Comunicação internacional',
      'Autonomia do cliente',
      'Design digital'
    ],
    video: media('zango'),
    accent: '#2c3320'
  },*/
  {
    slug: 'why-davi',
    type: 'final',
    title: 'Por que Davi?',
    titleLines: ['Por que', 'Davi?'],
    subtitle: 'Design, vídeo, tecnologia e IA com maturidade de execução.',
    CTALabel: 'Entenda por quê',
    shortText:
      'Porque reúno experiência criativa, domínio técnico e maturidade profissional para atuar em projetos de comunicação visual, audiovisual e digital com clareza, responsabilidade e qualidade de execução.',
    context: '',
    challenge: '',
    solution: [],
    role: '',
    skills: [],
    link: 'https://be.net/fzms',
    linkLabel: 'Behance',
    link2: 'https://linkedin.com/in/oidavi',
    link2Label: 'LinkedIn',
    video: media('why-davi', { mobile: true }),
    accent: '#26262b',
    extra: [
      {
        title: 'Por que Davi?',
        paragraphs: [
          'Porque reúno experiência criativa, domínio técnico e maturidade profissional para atuar em projetos de comunicação visual, audiovisual e digital com clareza, responsabilidade e qualidade de execução.',
          'Minha trajetória atravessa design gráfico, web design, UX/UI, filmmaking, motion graphics, programação, branding, campanhas, produtos digitais, educação, cultura e impacto social. Ao longo de mais de duas décadas, trabalhei em projetos premiados, campanhas de grande repercussão, produtos internacionais, plataformas digitais e iniciativas culturais.',
          'Em um contexto institucional, essa combinação me permite transformar conteúdos complexos em peças claras, acessíveis, bem produzidas e visualmente consistentes — seja em vídeo, interface, apresentação, campanha, identidade ou experiência digital.',
          'Tenho perfil híbrido: penso estrategicamente, crio visualmente e executo tecnicamente. Isso me permite transitar entre conceito, roteiro, design, captação, edição, animação, publicação e desenvolvimento.'
        ]
      },
      {
        title: 'IA como extensão do processo criativo',
        paragraphs: [
          'Utilizo inteligência artificial como ferramenta de pesquisa, ideação, pré-visualização, prototipação, roteiro, storyboard, geração de referências, automação, documentação e aceleração de processos criativos.',
          'A IA não substitui repertório, direção criativa ou responsabilidade autoral. Ela amplia minha capacidade de testar caminhos, visualizar possibilidades, organizar informações, produzir materiais preliminares, acelerar fluxos de trabalho e transformar ideias em entregas concretas com mais velocidade e precisão.',
          'Em projetos de comunicação, isso permite criar com mais repertório, iterar com mais agilidade e chegar a soluções visuais mais claras, consistentes e bem fundamentadas.'
        ]
      }
    ]
  }
];

export const totalSlides = cases.length;
