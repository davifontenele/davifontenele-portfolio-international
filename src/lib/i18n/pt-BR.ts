import type { Dictionary } from './types';

/**
 * Português (Brasil) — copy aprovada (docs/copy/pt-BR.md).
 * Strings marcadas com `// a11y` ou `// pendente de aprovação` não fazem parte
 * da copy aprovada; são rótulos de interface/acessibilidade a revisar.
 */
export const ptBR: Dictionary = {
  locale: 'pt-BR',
  meta: {
    siteName: 'Davi Fontenele',
    homeTitle: 'Davi Fontenele — Diretor de Criação & Design',
    homeDescription:
      'Conectando pensamento criativo, liderança em design e tecnologia para transformar desafios complexos em experiências relevantes.',
    aboutTitle: 'Sobre & Liderança',
    ogLocale: 'pt_BR'
  },
  nav: {
    menuLabel: 'Menu principal', // a11y
    work: 'Projetos',
    about: 'Sobre & Liderança',
    contact: 'Contato',
    languageLabel: 'Idioma', // a11y
    switchTo: 'English' // a11y
  },
  ui: {
    exploreWork: 'Explorar projetos',
    backToFullscreen: 'Voltar ao fullscreen',
    previous: 'Projeto anterior',
    next: 'Próximo projeto',
    scrollHint: 'Role para explorar',
    swipeHint: 'Deslize para explorar',
    backToTop: 'Voltar ao início',
    expertise: 'Competências',
    gallery: 'Galeria', // pendente de aprovação
    testimonials: 'Depoimentos', // pendente de aprovação
    sources: 'Fontes', // pendente de aprovação
    watchVideo: 'Assistir ao vídeo', // pendente de aprovação
    showInterface: 'Mostrar interface', // pendente de aprovação
    watchHintPointer: 'Clique ou pressione Esc para voltar · ← → para trocar de vídeo', // pendente de aprovação
    watchHintTouch: 'Toque para voltar · deslize para trocar de vídeo', // pendente de aprovação
    sourceRef: (n) => `Fonte ${n}`, // pendente de aprovação
    backToText: 'Voltar ao texto', // pendente de aprovação
    references: 'Referências', // pendente de aprovação
    translatedFrom: { en: 'Traduzido do inglês', 'pt-BR': 'Traduzido do português' }, // pendente de aprovação
    getInTouch: 'Entrar em contato',
    caseRegion: (name) => `Projeto: ${name}`, // a11y
    fullCaseRegion: (name) => `Case completo: ${name}`, // a11y
    scrollToContent: (name) => `Rolar para o case ${name}`, // a11y
    videoFrame: (name) => `Quadro do vídeo — ${name}`, // a11y
    opensInNewTab: 'abre em nova aba', // a11y
    pauseVideo: 'Pausar vídeo de fundo',
    playVideo: 'Reproduzir vídeo de fundo',
    reduceMotion: 'Reduzir movimento',
    enableMotion: 'Ativar animações'
  },
  links: {
    // pendente de aprovação (rótulos herdados do .xyz quando existiam)
    visitWebsite: 'Visite o site',
    watchCampaign: 'Assista à campanha',
    readArticle: 'Veja o artigo',
    ifAward: 'iF Communication Design Award',
    brandGuidelines: 'Manual de identidade',
    linkedin: 'LinkedIn',
    behance: 'Behance'
  },
  hero: {
    nameLines: ['Davi', 'Fontenele'],
    role: 'Diretor de Criação & Design',
    expertise: 'Estratégia de Marca · Produtos Digitais · UX/UI · IA',
    statement: 'Da visão à execução.',
    supporting:
      'Conectando pensamento criativo, liderança em design e tecnologia para transformar desafios complexos em experiências relevantes.',
    ctaPrimary: 'Explorar projetos',
    ctaSecondary: 'Sobre & Liderança'
  },
  selectedWork: {
    eyebrow: 'Projetos selecionados',
    title: 'Ideias, experiências e resultados.',
    intro:
      'Uma seleção de projetos que atravessam design de produto, liderança internacional, estratégia criativa, experiências digitais premiadas e impacto social.'
  },
  cases: {
    auag: {
      name: 'AuAg',
      titleLines: ['Tornando os metais', 'preciosos mais', 'acessíveis pelo design.'],
      subtitle:
        'Da visão de negócio à experiência de produto: liderança de UX/UI, direção criativa e narrativa digital para uma fintech em estágio pré-investimento.',
      cta: 'Ver o case completo',
      sections: [
        {
          id: 'overview',
          heading: 'Visão geral',
          blocks: [
            {
              type: 'p',
              text: 'Transformando uma hipótese de negócio em uma experiência digital tangível por meio de design de produto, liderança de UX/UI e narrativa audiovisual.'
            },
            {
              type: 'p',
              text: 'Trabalhando diretamente com o CEO, participei da construção da experiência digital de uma fintech em estágio inicial, conectando sua apresentação comercial à concepção de um produto interativo e demonstrável.'
            }
          ]
        },
        {
          id: 'context',
          heading: 'Contexto',
          blocks: [
            {
              type: 'p',
              text: 'A AuAg é uma startup fintech que desenvolve uma plataforma para ampliar o acesso de investidores individuais a metais preciosos, como ouro, prata e platina.'
            },
            {
              type: 'p',
              text: 'Seu ecossistema proposto combina investimento em metais, cartão de pagamento e um sistema de recompensas vinculado a esses ativos.'
            },
            {
              type: 'p',
              text: 'Quando assumi a posição de Head de UX/UI, o website estava sendo reformulado, enquanto parcerias, processos operacionais e infraestrutura financeira ainda eram estruturados para viabilizar a operação da empresa.'
            },
            {
              type: 'p',
              text: 'A experiência digital precisava cumprir duas funções complementares: despertar o interesse de potenciais consumidores e apresentar a visão de negócio a investidores.'
            }
          ]
        },
        {
          id: 'challenge',
          heading: 'Desafio',
          blocks: [
            {
              type: 'p',
              text: 'Como tornar um produto financeiro sofisticado acessível, intuitivo e envolvente antes mesmo de sua entrada em operação?'
            },
            {
              type: 'p',
              text: 'O website precisava comunicar credibilidade, explicar uma proposta de valor ainda pouco familiar ao grande público e gerar interesse em diferentes audiências.'
            },
            {
              type: 'p',
              text: 'Paralelamente, a startup necessitava de uma demonstração tangível de seu futuro aplicativo, permitindo compreender como os usuários navegariam, investiriam, acompanhariam seu patrimônio e interagiriam com o ecossistema proposto.'
            },
            {
              type: 'p',
              text: 'A experiência precisava transmitir simplicidade e satisfação sem comprometer a clareza e a seriedade necessárias a um produto financeiro.'
            }
          ]
        },
        {
          id: 'strategy',
          heading: 'Estratégia e decisões de design',
          blocks: [
            { type: 'sub', text: 'Conectando visão de negócio e experiência' },
            {
              type: 'p',
              text: 'Em colaboração direta com o CEO, participei da definição e validação das etapas de desenvolvimento da experiência digital.'
            },
            {
              type: 'p',
              text: 'Embora os objetivos de negócio fossem estabelecidos pela liderança da empresa, diversas decisões de UX e design de interação partiram de propostas minhas, buscando tornar o produto mais fácil de compreender e agradável de utilizar.'
            },
            { type: 'sub', text: 'Reduzindo a percepção de complexidade' },
            {
              type: 'p',
              text: 'Uma das diretrizes foi aproximar o investimento em metais preciosos de consumidores pouco familiarizados com essa categoria de ativos.'
            },
            {
              type: 'p',
              text: 'Explorei interações intuitivas, feedbacks visuais imediatos, hierarquia clara de informação e microinterações refinadas para transmitir simplicidade, fluidez e responsividade.'
            },
            { type: 'sub', text: 'Projetando a jornada do produto' },
            {
              type: 'p',
              text: 'No Figma, desenvolvi as jornadas do usuário, a arquitetura de informação, as interfaces e os padrões de interação do aplicativo.'
            },
            {
              type: 'p',
              text: 'Esses projetos orientaram o desenvolvimento de um MVP funcional para demonstração, contemplando as principais experiências previstas para o produto.'
            },
            { type: 'sub', text: 'Comunicando a visão por meio do audiovisual' },
            {
              type: 'p',
              text: 'Para o website, combinei conteúdos visuais produzidos com inteligência artificial com um extenso trabalho de edição, composição e motion graphics no Adobe After Effects.'
            },
            {
              type: 'p',
              text: 'O objetivo era criar uma narrativa audiovisual capaz de comunicar a ambição da empresa, transmitir sofisticação e tornar a proposta de negócio mais concreta.'
            }
          ]
        },
        {
          id: 'solution',
          heading: 'Solução',
          blocks: [
            { type: 'sub', text: 'Um website para dois públicos' },
            {
              type: 'p',
              text: 'Uma apresentação digital que combina comunicação de produto, narrativa visual e animações cinematográficas para dialogar com consumidores e investidores.'
            },
            { type: 'sub', text: 'Um MVP interativo' },
            {
              type: 'p',
              text: 'Um aplicativo demonstrável baseado na experiência desenvolvida no Figma, permitindo explorar as funcionalidades propostas por meio de um saldo inicial fictício.'
            },
            {
              type: 'p',
              text: 'A demonstração contempla interações simuladas, mas não realiza transações financeiras reais nem possui gerenciamento completo de contas de usuários.'
            },
            {
              type: 'p',
              text: 'Em conjunto, essas experiências permitem apresentar o conceito da AuAg tanto por meio de uma narrativa comercial quanto por uma demonstração interativa.'
            }
          ]
        },
        {
          id: 'role',
          heading: 'Papel desempenhado',
          blocks: [
            { type: 'sub', text: 'Head de UX/UI' },
            {
              type: 'p',
              text: 'Responsável pela direção da experiência do usuário, concepção das jornadas e interfaces do aplicativo, proposição de padrões de interação, construção da narrativa visual do website e colaboração direta com o CEO ao longo do processo de design e validação.'
            },
            {
              type: 'p',
              text: 'Minha atuação também incluiu produção audiovisual com apoio de IA generativa, edição de vídeo, motion graphics e colaboração na implementação do MVP.'
            }
          ]
        },
        {
          id: 'outcomes',
          heading: 'Resultados e impacto',
          blocks: [
            {
              type: 'list',
              items: [
                'Website voltado à apresentação da startup para potenciais consumidores e investidores.',
                'Experiência de produto estruturada e desenvolvida no Figma.',
                'MVP interativo demonstrando as principais jornadas com recursos financeiros simulados.',
                'Representação visual e funcional mais concreta de um negócio ainda em desenvolvimento.'
              ]
            },
            {
              type: 'p',
              text: 'Como a AuAg permanece em estágio pré-investimento, esses resultados representam entregas de design e demonstração de produto, não métricas de adoção comercial, receita ou operação financeira real.'
            }
          ]
        }
      ],
      expertise: [
        'Liderança de Product Design',
        'Estratégia de UX/UI',
        'Design de Interação',
        'Jornada do Usuário',
        'Arquitetura de Informação',
        'Figma',
        'Prototipação',
        'MVP',
        'Colaboração Executiva',
        'Direção Criativa',
        'IA Generativa',
        'Adobe After Effects',
        'Motion Graphics',
        'Narrativa Digital'
      ],
      endorsements: {
        testimonials: [
          {
            quote: 'Davi foi um colaborador-chave na AuAg. Ele foi fundamental na grande reformulação do nosso site e teve papel central no desenvolvimento do MVP do nosso aplicativo de investimentos. Sua capacidade de combinar conhecimento técnico, design e solução criativa de problemas fez dele um membro inestimável da nossa equipe.',
            name: 'Thomas Gardner',
            role: 'CEO',
            organization: 'AuAg',
            photo: '/images/testimonials/thomas-gardner.jpg',
            url: 'https://www.linkedin.com/in/thomas-gardner-a88a1513/',
            translatedFrom: 'en',
            highlight: true
          }
        ]
      }
    },

    '3lane': {
      name: '3Lane Marketing',
      titleLines: ['Liderança de design', 'entre equipes,', 'setores e fronteiras.'],
      subtitle:
        'Direção de design, pesquisa com usuários e colaboração multidisciplinar em nove projetos digitais para organizações estadunidenses.',
      cta: 'Ver o case completo',
      sections: [
        {
          id: 'overview',
          heading: 'Visão geral',
          blocks: [
            {
              type: 'p',
              text: 'Nove projetos entregues. Múltiplos setores. Equipes distribuídas em seis países.'
            },
            {
              type: 'p',
              text: 'Como Design Director na 3Lane Marketing, conectei discovery, pesquisa, direção criativa, relacionamento com clientes e controle de qualidade no desenvolvimento de experiências digitais para organizações estadunidenses.'
            }
          ]
        },
        {
          id: 'context',
          heading: 'Contexto',
          blocks: [
            {
              type: 'p',
              text: 'A 3Lane Marketing é uma agência estadunidense que desenvolve projetos para organizações de setores como educação, saúde, planejamento urbano, indústria, meio ambiente e comunicação pública.'
            },
            {
              type: 'p',
              text: 'Minha atuação envolvia a direção de design em equipes multidisciplinares distribuídas internacionalmente, estabelecendo uma ponte entre clientes, gestão de projetos, pesquisa, designers, desenvolvedores e profissionais de QA.'
            },
            {
              type: 'p',
              text: 'Durante essa experiência, coordenei e entreguei nove projetos digitais para organizações com públicos, requisitos e desafios operacionais distintos.'
            }
          ]
        },
        {
          id: 'challenge',
          heading: 'Desafio',
          blocks: [
            {
              type: 'p',
              text: 'Como manter qualidade criativa, relevância estratégica e consistência de implementação em projetos com objetivos e expectativas tão diferentes?'
            },
            {
              type: 'p',
              text: 'Cada organização possuía necessidades específicas, públicos distintos, estruturas de informação e limitações próprias.'
            },
            {
              type: 'p',
              text: 'A responsabilidade não era simplesmente transformar um briefing em uma solução visual, mas compreender o problema subjacente, questionar hipóteses quando necessário e orientar a equipe na busca pela resposta mais adequada.'
            }
          ]
        },
        {
          id: 'strategy',
          heading: 'Estratégia e liderança',
          blocks: [
            { type: 'sub', text: 'Discovery antes do design' },
            {
              type: 'p',
              text: 'Participei diretamente de reuniões com clientes, realizei entrevistas qualitativas e coordenei atividades de pesquisa com usuários.'
            },
            {
              type: 'p',
              text: 'Em colaboração com a gerente de projetos, também participei do planejamento de pesquisas quantitativas, utilizando surveys e questionários.'
            },
            {
              type: 'p',
              text: 'As descobertas das pesquisas, informações dos stakeholders, benchmarks e experiência profissional orientavam as decisões de cada projeto.'
            },
            { type: 'sub', text: 'Pesquisa com apoio de inteligência artificial' },
            {
              type: 'p',
              text: 'Ferramentas de transcrição e síntese assistidas por IA ajudavam a processar informações de reuniões e entrevistas, facilitando a organização dos dados e sua interpretação para apoiar decisões de design.'
            },
            {
              type: 'p',
              text: 'Essas ferramentas auxiliavam a análise, sem substituir o discernimento e a avaliação profissional.'
            },
            { type: 'sub', text: 'Direção criativa e orientação da equipe' },
            {
              type: 'p',
              text: 'Orientava os designers por meio de direcionamentos verbais, referências visuais e, quando necessário, esboços próprios.'
            },
            {
              type: 'p',
              text: 'Posteriormente, avaliava as propostas, oferecia feedback e conduzia refinamentos para preservar a coerência entre os objetivos do projeto e as soluções criativas.'
            },
            { type: 'sub', text: 'Colaboração multidisciplinar' },
            {
              type: 'p',
              text: 'Trabalhava em conjunto com gestão de projetos, desenvolvimento e QA, buscando manter alinhamento entre requisitos, decisões de design e implementação.'
            },
            { type: 'sub', text: 'Responsabilidade pela qualidade visual' },
            {
              type: 'p',
              text: 'Acompanhava a implementação front-end para garantir alta fidelidade entre o design aprovado e as interfaces entregues.'
            },
            { type: 'sub', text: 'Relacionamento com clientes' },
            {
              type: 'p',
              text: 'Apresentava as entregas aos clientes, explicava as soluções, coletava avaliações e coordenava os refinamentos necessários.'
            },
            {
              type: 'p',
              text: 'O discovery permanecia adaptável durante o processo, permitindo que novas informações influenciassem os rumos dos projetos.'
            }
          ]
        },
        {
          id: 'work',
          heading: 'Projetos entregues',
          blocks: [{ type: 'projects' }]
        },
        {
          id: 'role',
          heading: 'Papel desempenhado',
          blocks: [
            { type: 'sub', text: 'Design Director' },
            {
              type: 'p',
              text: 'Responsável pela direção criativa, orientação dos designers, atividades de discovery, apresentações aos clientes, interpretação de pesquisas e garantia de qualidade visual durante a passagem do design para o desenvolvimento.'
            },
            {
              type: 'p',
              text: 'Minha atuação conectava expectativas dos stakeholders, necessidades dos usuários, decisões de design e execução técnica.'
            }
          ]
        },
        {
          id: 'outcomes',
          heading: 'Resultados e impacto',
          blocks: [
            {
              type: 'list',
              items: [
                'Nove projetos digitais coordenados e entregues para organizações estadunidenses.',
                'Colaboração em design com equipes distribuídas em seis países.',
                'Processo consistente do discovery à entrega, adaptado a diferentes setores e necessidades institucionais.',
                'Participação direta em pesquisa, direção criativa, relacionamento com stakeholders e qualidade de implementação.'
              ]
            },
            {
              type: 'p',
              text: 'A diversidade desses projetos demonstra a capacidade de aplicar um processo disciplinado de design sem impor soluções idênticas a problemas fundamentalmente diferentes.'
            }
          ]
        },
        {
          id: 'principle',
          heading: 'Princípio de liderança',
          blocks: [
            { type: 'statement', text: 'Compreender o problema antes de desenhar a solução.' },
            {
              type: 'p',
              text: 'Uma boa liderança em design pressupõe questionar hipóteses, fundamentar decisões, estabelecer uma direção clara e ajudar equipes a transformar complexidade em experiências úteis.'
            }
          ]
        }
      ],
      expertise: [
        'Liderança de Design',
        'Direção Criativa',
        'Pesquisa em UX',
        'Discovery',
        'Pesquisa Qualitativa',
        'Pesquisa Quantitativa',
        'Design Orientado por Evidências',
        'Gestão de Stakeholders',
        'Pesquisa Assistida por IA',
        'Colaboração Multidisciplinar',
        'Design QA',
        'Equipes Internacionais',
        'Experiência Digital'
      ],
      projects: {
        mcls: {
          name: 'MCLS — Midwest Collaborative for Library Services',
          description:
            'Experiência digital para uma organização de serviços colaborativos para bibliotecas.'
        },
        cpex: {
          name: 'CPEX — Center for Planning Excellence',
          description:
            'Comunicação digital para uma organização dedicada a planejamento, comunidades e sustentabilidade.'
        },
        fcc: {
          name: 'FCC — Family Child Care Project',
          description: 'Experiência digital de apoio ao setor de cuidado infantil familiar.'
        },
        sga: {
          name: 'Smart Growth America',
          description:
            'Comunicação digital para uma organização que atua com desenvolvimento sustentável, mobilidade e políticas de uso do solo.'
        },
        nwctm: {
          name: 'Northwest CT Manufacturing',
          description: 'Plataforma digital para uma parceria regional do setor industrial.'
        },
        nwcthc: {
          name: 'Northwest HealthConnect',
          description: 'Plataforma digital para uma parceria regional do setor de saúde.'
        },
        marco: {
          name: 'MARCO — Mid-Atlantic Regional Council on the Ocean',
          description:
            'Comunicação digital para iniciativas de planejamento oceânico e cooperação regional.'
        },
        macan: {
          name: 'MACAN — Mid-Atlantic Coastal Acidification Network',
          description:
            'Experiência digital para uma rede colaborativa dedicada à acidificação costeira e oceânica.'
        },
        detroitpbs: {
          name: 'Detroit PBS',
          description: 'Trabalho digital para uma organização de comunicação pública e educativa.'
        }
      }
    },

    reserva: {
      name: 'Reserva',
      titleLines: ['Transformando crise', 'em uma ideia que', 'definiu uma marca.'],
      subtitle:
        'Como uma campanha viral impulsionou as vendas do e-commerce em 9.900% e ajudou a construir uma filosofia duradoura de marca.',
      cta: 'Ver o case completo',
      sections: [
        {
          id: 'overview',
          heading: 'Visão geral',
          blocks: [
            {
              type: 'p',
              text: 'Uma resposta criativa a um assalto tornou-se uma campanha de repercussão internacional, ativou um e-commerce ainda incipiente e ajudou a estabelecer uma filosofia que permaneceria presente na identidade da Reserva por anos.'
            }
          ]
        },
        {
          id: 'context',
          heading: 'Contexto',
          blocks: [
            {
              type: 'p',
              text: 'Em dezembro de 2012, a Reserva, grife brasileira de moda masculina, sofreu um assalto em uma de suas lojas.[^adweek-jan28]'
            },
            {
              type: 'p',
              text: 'As câmeras de segurança registraram o episódio, produzindo o material bruto que daria origem a uma oportunidade criativa inesperada.'
            },
            {
              type: 'p',
              text: 'Em vez de comunicar o acontecimento apenas como uma crise, surgiu a ideia de transformar uma situação adversa em uma narrativa de marca positiva e bem-humorada.'
            }
          ]
        },
        {
          id: 'challenge',
          heading: 'Desafio',
          blocks: [
            {
              type: 'p',
              text: 'Criar uma resposta rápida, relevante e sensível a um episódio real, sem banalizar a violência ou adotar uma narrativa convencional de vitimização.'
            },
            {
              type: 'p',
              text: 'A campanha também precisava contribuir para ativar o e-commerce da Reserva, ainda em estágio inicial.'
            }
          ]
        },
        {
          id: 'idea',
          heading: 'A ideia criativa',
          blocks: [
            { type: 'statement', text: 'Quando a vida te dá limões, faça uma limonada.' },
            {
              type: 'p',
              text: 'As imagens de segurança foram reinterpretadas e editadas em uma peça audiovisual que transformava um problema inesperado em uma manifestação de atitude.'
            },
            {
              type: 'p',
              text: 'O conceito combinava timing, narrativa, humor e capacidade de encontrar uma mensagem relevante em acontecimentos reais.'
            },
            {
              type: 'p',
              text: 'Em vez de depender de uma produção publicitária elaborada, a campanha encontrava sua força na ressignificação criativa das próprias imagens do ocorrido.'
            }
          ]
        },
        {
          id: 'execution',
          heading: 'Execução e ativação',
          blocks: [
            {
              type: 'p',
              text: 'O vídeo foi utilizado simultaneamente como campanha de comunicação e ativação de e-commerce.'
            },
            {
              type: 'p',
              text: 'A peça alcançou aproximadamente 300 mil visualizações no primeiro fim de semana e conquistou repercussão espontânea em veículos de imprensa nacionais e internacionais.[^adweek-jan28][^adweek-jan25]'
            },
            {
              type: 'p',
              text: 'Para dimensionar esse número: era janeiro de 2013. Menos de um em cada cinco brasileiros tinha um smartphone.[^ibope-win-2012][^ibope-nielsen-2012] Para a maioria, a internet ainda acontecia diante de um computador, muitas vezes compartilhado em casa ou no trabalho,[^mma-nielsen-2014] e o Facebook ainda não reproduzia vídeos automaticamente no feed.[^tubefilter-2013][^engadget-2013] Cada visualização dependia de alguém escolher clicar e assistir, numa época em que o vídeo nas redes sociais ainda era um território novo para as marcas.'
            },
            {
              type: 'p',
              text: 'Durante o período da campanha, as vendas online passaram de aproximadamente US$ 500 para US$ 50 mil — um crescimento próximo de **9.900%**.'
            }
          ]
        },
        {
          id: 'beyond',
          heading: 'Além da campanha',
          blocks: [
            {
              type: 'p',
              text: 'A ideia de transformar limões em limonada ultrapassou os limites do vídeo original.'
            },
            {
              type: 'p',
              text: 'O conceito passou a integrar a linguagem interna e a identidade pública da Reserva, reaparecendo em campanhas, ações promocionais, temáticas visuais e conteúdos documentais com empreendedores compartilhando os desafios de construir seus negócios.'
            },
            {
              type: 'p',
              text: 'Uma resposta criativa de curto prazo ajudou a estabelecer uma narrativa duradoura de marca.'
            }
          ]
        },
        {
          id: 'role',
          heading: 'Papel desempenhado',
          blocks: [
            {
              type: 'p',
              text: 'Participação criativa na concepção e execução colaborativa da campanha, incluindo o desenvolvimento da narrativa e a edição das imagens de segurança em uma peça audiovisual coesa.'
            }
          ]
        },
        {
          id: 'outcomes',
          heading: 'Impacto e legado',
          blocks: [
            {
              type: 'list',
              items: [
                'Aproximadamente 300 mil visualizações no primeiro fim de semana.',
                'Repercussão espontânea na imprensa nacional e internacional.',
                'Crescimento aproximado de 9.900% nas vendas do e-commerce durante o período da campanha.',
                'Um conceito criativo que permaneceu associado à marca durante anos.'
              ]
            },
            {
              type: 'statement',
              text: 'Sete anos depois, a Reserva foi vendida em uma transação avaliada em R$ 715 milhões.'
            },
            {
              type: 'p',
              text: 'Essa transação posterior representa um marco na trajetória empresarial da grife, não um resultado financeiro diretamente atribuível à campanha.'
            }
          ]
        }
      ],
      expertise: [
        'Estratégia Criativa',
        'Storytelling de Marca',
        'Comunicação de Crise',
        'Conceito Criativo',
        'Edição Audiovisual',
        'Ativação de Marca',
        'Ativação de E-commerce',
        'Mídia Espontânea',
        'Posicionamento de Marca',
        'Impacto Comercial'
      ],
      // pendente de aprovação
      sources: [
        {
          id: 'adweek-jan25',
          title: 'Clothing Store Uses Actual Burglary Footage in Ad, Making Fashions Look Most Wanted',
          publisher: 'Adweek',
          date: '25 jan. 2013',
          url: 'https://www.adweek.com/?p=146786'
        },
        {
          id: 'adweek-jan28',
          title: 'Brazilian Retailer Uses Robbery Footage in Ad Campaign',
          publisher: 'Adweek',
          date: '28 jan. 2013',
          url: 'https://www.adweek.com/?p=577118'
        },
        {
          id: 'ibope-win-2012',
          title: 'Base de smartphones duplica no Brasil',
          publisher: 'Baguete',
          url: 'https://www.baguete.com.br/noticias/base-de-smartphones-duplica-no-brasil',
          note: 'Pesquisa Ibope Conecta/WIN, nov.–dez. 2012'
        },
        {
          id: 'ibope-nielsen-2012',
          title: 'Regiões metropolitanas têm 9,5 milhões de smartphones',
          publisher: 'Exame',
          date: '10 ago. 2012',
          url: 'https://exame.com/tecnologia/regioes-metropolitanas-tem-9-5-milhoes-de-smartphones/',
          note: 'Dados Ibope Nielsen'
        },
        {
          id: 'mma-nielsen-2014',
          title: 'Smartphone já é principal acesso à internet para 33%',
          publisher: 'Panrotas',
          date: '28 abr. 2014',
          url: 'https://www.panrotas.com.br/noticia-turismo/tecnologia/2014/04/smartphone-ja-e-principal-acesso-a-internet-para-33-_99876.html',
          note: 'Dados MMA/Nielsen Ibope'
        },
        {
          id: 'tubefilter-2013',
          title: 'Facebook’s Auto Play Ads Debut On Mobile, Coming Soon To Browsers?',
          publisher: 'Tubefilter',
          date: '16 set. 2013',
          url: 'https://tubefilter.com/2013/09/16/facebook-auto-play-video-ads-test/'
        },
        {
          id: 'engadget-2013',
          title: 'Facebook confirms autoplay video ads are coming to your News Feed',
          publisher: 'Engadget',
          date: '17 dez. 2013',
          url: 'https://www.engadget.com/2013/12/17/facebook-confirms-autoplay-ads/'
        }
      ],
      mediaAlt: [
        'Campanha Reserva — quadro do vídeo 1',
        'Campanha Reserva — quadro do vídeo 2',
        'Campanha Reserva — quadro do vídeo 3'
      ],
      endorsements: {
        testimonials: [
          {
            quote: 'Genial! Genial! Genial! Genial! Genial!',
            name: 'Sérgio Valente',
            role: 'Então presidente da DM9DDB, prestes a assumir a diretoria de comunicação da Rede Globo, compartilhou o vídeo em sua mídia social com este comentário.',
            photo: '/images/testimonials/sergio-valente.jpg',
            highlight: true
          }
        ],
        references: [
          {
            title: 'Rebeldes têm asas',
            publication: 'Como pode ser visto no livro',
            url: 'https://www.amazon.com.br/dp/8543105250',
            note: 'Página 332: "Transformando limão em limonada"'
          }
        ]
      }
    },

    'espaco-fashion': {
      name: 'Espaço Fashion',
      titleLines: ['Transformando', 'consumidoras', 'em criadoras', 'de conteúdo.'],
      subtitle:
        'Uma experiência premiada pelo iF Communication Design Award que combinou vídeo, design interativo e conteúdo gerado pelo usuário.',
      cta: 'Ver o case completo',
      sections: [
        {
          id: 'overview',
          heading: 'Visão geral',
          blocks: [
            {
              type: 'p',
              text: 'Uma experiência digital premiada internacionalmente que convidava consumidoras a criar e compartilhar seus próprios catálogos de moda a partir de frames selecionados de vídeos da campanha.'
            }
          ]
        },
        {
          id: 'context',
          heading: 'Contexto',
          blocks: [
            {
              type: 'p',
              text: 'Para sua coleção Verão 2010/11, a grife Espaço Fashion desenvolveu, em parceria com o estúdio digital 6D, uma campanha que combinava filmes de moda e uma experiência interativa online.'
            },
            {
              type: 'p',
              text: 'A direção criativa estabeleceu a linguagem visual da campanha, que precisava ser traduzida em uma experiência digital capaz de estimular a participação do público.'
            }
          ]
        },
        {
          id: 'challenge',
          heading: 'Desafio',
          blocks: [
            {
              type: 'p',
              text: 'Ir além de um catálogo convencional, permitindo que as consumidoras participassem ativamente da criação e circulação do conteúdo da marca.'
            },
            {
              type: 'p',
              text: 'A experiência precisava conectar material audiovisual, design de interface e comportamento interativo de maneira coesa e intuitiva.'
            }
          ]
        },
        {
          id: 'idea',
          heading: 'Conceito interativo',
          blocks: [
            {
              type: 'p',
              text: 'A partir da direção de arte estabelecida para a campanha, concebi a experiência interativa, desenhei suas interfaces e programei as interações.'
            },
            {
              type: 'p',
              text: 'As visitantes podiam explorar os vídeos de moda, selecionar frames e utilizá-los para compor catálogos personalizados.'
            },
            {
              type: 'p',
              text: 'As composições podiam ser compartilhadas no Facebook e publicadas no website da marca.'
            },
            {
              type: 'p',
              text: 'O projeto transformava o público de espectador passivo em participante ativo da comunicação.'
            }
          ]
        },
        {
          id: 'role',
          heading: 'Papel desempenhado',
          blocks: [
            {
              type: 'p',
              text: 'Responsável pela concepção do conceito de interação digital, design das interfaces e programação da experiência interativa.'
            },
            {
              type: 'p',
              text: 'O trabalho foi desenvolvido no contexto da equipe da 6D, a partir da direção criativa estabelecida para a campanha.'
            }
          ]
        },
        {
          id: 'outcomes',
          heading: 'Reconhecimento e impacto',
          blocks: [
            {
              type: 'p',
              text: 'O projeto conquistou o **iF Communication Design Award**, uma das premiações internacionais reconhecidas no campo do design.'
            },
            {
              type: 'p',
              text: 'Sua abordagem participativa antecipou práticas que posteriormente seriam amplamente associadas ao conteúdo gerado pelo usuário no marketing digital.'
            }
          ]
        }
      ],
      expertise: [
        'Design de Experiências Interativas',
        'Tecnologia Criativa',
        'UX/UI',
        'Design de Interação',
        'Creative Coding',
        'Desenvolvimento Front-end',
        'Direção de Arte Digital',
        'UGC',
        'Comunicação de Moda',
        'Design Premiado'
      ],
      // pendente de aprovação
      mediaAlt: [
        'Catálogo interativo Espaço Fashion — captura 1',
        'Catálogo interativo Espaço Fashion — captura 2',
        'Catálogo interativo Espaço Fashion — captura 3'
      ],
      endorsements: {
        testimonials: [
          {
            quote: 'Eu e Davi nos conhecemos há muito tempo quando, num primeiro momento, ele veio trabalhar comigo na 6D, empresa de Branding e Comunicação que fundei e até hoje sigo à frente. À época, Davi, ainda bem novo, já mostrava seu talento como criador e, principalmente, desenvolvedor digital de suas criações. Trabalhamos por alguns anos juntos, mas logo nos tornamos amigos e minha admiração por ele só cresceu. O talento, claro, lapidado ao longo dos anos, só evoluiu. Pessoa boa e profissional talentoso a quem eu, carinhosamente, chamo de Oráculo.',
            name: 'Lula Freitas',
            role: 'Fundador e CEO',
            organization: '6D',
            photo: '/images/testimonials/lula-freitas.jpg'
          },
        ],
        references: [
          {
            title: 'iF Communication Design Award',
            publication: 'Branding & Communication Design',
            author: 'Categoria Websites',
            date: '2011',
            url: 'https://ifdesign.com/de/winner-ranking/project/espaco-fashion/81107',
            note: 'Mais informações no link'
          },
          {
            title: 'Prêmio Peixe Grande (extinto)',
            publication: 'Vencedor Geral',
            author: 'Honraria máxima do evento',
            date: '2011',
            url: 'https://www.revistawide.com.br/2026/04/premio-peixe-grande-o-concurso-que.html',
            note: 'Mais informações no link'
          }
        ]
      }
    },

    salinas: {
      name: 'Salinas',
      titleLines: ['Quando a interação', 'se torna identidade', 'de marca.'],
      subtitle:
        'Um website interativo com animações autorais, tipografia reconhecida internacionalmente e quatro anos de presença digital.',
      cta: 'Ver o case completo',
      sections: [
        {
          id: 'overview',
          heading: 'Visão geral',
          blocks: [
            {
              type: 'p',
              text: 'Um website altamente interativo para a Salinas, com interfaces, interações e animações criadas por mim.'
            },
            {
              type: 'p',
              text: 'Seu uso marcante de tipografia animada conquistou atenção internacional, enquanto a experiência permaneceu no ar durante quatro anos.'
            }
          ]
        },
        {
          id: 'context',
          heading: 'Contexto',
          blocks: [
            {
              type: 'p',
              text: 'A Salinas, grife brasileira de moda praia, buscava uma presença digital capaz de expressar sua personalidade visual para além de layouts estáticos e navegação convencional.'
            },
            {
              type: 'p',
              text: 'A direção criativa da campanha estabeleceu uma linguagem estética que precisava ganhar vida em uma experiência interativa envolvente.'
            }
          ]
        },
        {
          id: 'challenge',
          heading: 'Desafio',
          blocks: [
            {
              type: 'p',
              text: 'Transformar uma direção visual preexistente em um ambiente digital distinto, no qual animação, tipografia e interação se tornassem elementos integrantes da experiência de marca.'
            },
            {
              type: 'p',
              text: 'O objetivo não era apenas apresentar telas visualmente atraentes, mas definir como a marca seria percebida por meio do movimento e da interação.'
            }
          ]
        },
        {
          id: 'idea',
          heading: 'Abordagem criativa',
          blocks: [
            { type: 'statement', text: 'Fazendo do movimento uma linguagem de marca.' },
            {
              type: 'p',
              text: 'A partir da direção de arte estabelecida para o projeto, concebi a experiência interativa, desenhei as interfaces, programei os comportamentos e criei todas as animações presentes no website.'
            },
            {
              type: 'p',
              text: 'Tipografia, transições e movimento foram tratados como elementos expressivos, e não apenas decorativos.'
            },
            {
              type: 'p',
              text: 'O resultado foi uma experiência digital coesa, na qual a interação se tornou parte da personalidade da marca.'
            }
          ]
        },
        {
          id: 'role',
          heading: 'Papel desempenhado',
          blocks: [
            {
              type: 'p',
              text: 'Responsável pela concepção da experiência interativa, design das interfaces, programação e criação integral das animações do website.'
            },
            {
              type: 'p',
              text: 'A direção criativa geral da campanha foi estabelecida separadamente.'
            }
          ]
        },
        {
          id: 'outcomes',
          heading: 'Reconhecimento e impacto',
          blocks: [
            {
              type: 'p',
              text: 'O website foi apresentado no artigo internacional **“101 Examples of Text Treatments on the Web”**, dedicado a abordagens criativas de tipografia e apresentação de texto na internet.'
            },
            {
              type: 'p',
              text: 'O site permaneceu no ar durante quatro anos, refletindo a longevidade de sua linguagem visual e sua forte associação com a marca.'
            }
          ]
        }
      ],
      expertise: [
        'Design Interativo',
        'Tecnologia Criativa',
        'Motion Design',
        'Animação Web',
        'Creative Coding',
        'Desenvolvimento Front-end',
        'Tipografia',
        'Direção de Arte Digital',
        'Experiência de Marca',
        'Design de Interação'
      ],
      // pendente de aprovação
      mediaAlt: [
        'Website Salinas — captura 1',
        'Website Salinas — captura 2',
        'Website Salinas — captura 3'
      ],
      endorsements: {
        testimonials: [
          {
            quote: 'Tive o prazer de trabalhar alguns anos ao lado do Davi e não só durante estes anos como também após eles, Davi sempre se mostrou comprometido e proativo. Daqueles que vestem a camisa e jogam o time pra cima. Acabou virando um grande amigo!',
            name: 'Emílio Rangel',
            role: 'Diretor de Criação',
            organization: '6D',
            photo: '/images/testimonials/emilio-rangel.jpg'
          },
          {
            quote: 'Davi Fontenele é um cara incrível. Super talentoso e criativo. Vai do design ao desenvolvimento. Ficou por anos na 6D e até hoje é muito querido por todos na casa. Super recomendo.',
            name: 'Tola Faria',
            role: 'Diretor de Atendimento',
            organization: '6D',
            photo: '/images/testimonials/tola-faria.jpg'
          }
        ],
        references: [
          {
            title: '101 Examples of Text Treatments on the Web',
            publication: 'Webdesigner Depot',
            author: 'WDD Staff',
            date: 'Abril de 2009',
            url: 'https://webdesignerdepot.com/101-examples-of-text-treatments-on-the-web/'
          }
        ]
      }
    },

    'rocinha-up': {
      name: 'Rocinha UP',
      titleLines: ['Criando identidade', 'para a transformação', 'social.'],
      subtitle:
        'Uma identidade de marca com duas expressões, conectando educação, economia circular e moda sustentável na comunidade da Rocinha.',
      cta: 'Ver o case completo',
      sections: [
        {
          id: 'overview',
          heading: 'Visão geral',
          blocks: [
            {
              type: 'p',
              text: 'Uma identidade visual unificada que conecta capacitação profissional e moda sustentável por meio de duas expressões complementares de marca.'
            },
            {
              type: 'p',
              text: 'O projeto reúne jiu-jítsu, upcycling e oportunidades de geração de renda na comunidade da Rocinha.'
            }
          ]
        },
        {
          id: 'context',
          heading: 'Contexto',
          blocks: [
            {
              type: 'p',
              text: 'O Rocinha UP é uma iniciativa social idealizada por Paula Maia, fundadora do Faz Girar Market, em parceria com Paulo Cunha, fundador do Projeto Lapidar Jiu-Jítsu.'
            },
            {
              type: 'p',
              text: 'A iniciativa conecta capacitação profissional, economia circular e desenvolvimento de produtos sustentáveis por meio da reutilização de materiais descartados do jiu-jítsu.'
            },
            {
              type: 'p',
              text: 'O desafio de design era construir uma identidade reconhecível para um projeto com duas dimensões interligadas: educação e uma grife de moda sustentável.'
            }
          ]
        },
        {
          id: 'challenge',
          heading: 'Desafio',
          blocks: [
            {
              type: 'p',
              text: 'Como uma única marca pode comunicar duas atividades distintas sem perder coerência?'
            },
            {
              type: 'p',
              text: 'A identidade precisava representar desenvolvimento profissional, pertencimento comunitário, consciência ambiental e design contemporâneo, preservando uma conexão clara com as origens do projeto.'
            }
          ]
        },
        {
          id: 'strategy',
          heading: 'Estratégia e conceito',
          blocks: [
            { type: 'statement', text: 'Uma identidade. Duas expressões.' },
            {
              type: 'p',
              text: 'A partir de uma ideia inicial apresentada por Paula Maia — utilizar a faixa de jiu-jítsu como inspiração visual — desenvolvi um símbolo que conecta diferentes camadas de significado.'
            },
            {
              type: 'p',
              text: 'Sua geometria remete a uma faixa de artes marciais, enquanto sua silhueta também sugere a forma de uma joia, estabelecendo uma referência ao Projeto Lapidar Jiu-Jítsu.'
            },
            {
              type: 'p',
              text: 'A ideia de lapidação funciona como metáfora tanto para o desenvolvimento do potencial humano quanto para a transformação de materiais descartados em produtos de valor.'
            },
            { type: 'p', text: 'Propus um sistema visual com duas expressões:' },
            {
              type: 'p',
              text: '**A faixa sem nó** representa educação, formação e capacitação profissional.'
            },
            {
              type: 'p',
              text: '**A faixa com nó** identifica a grife e seus produtos desenvolvidos por upcycling.'
            },
            {
              type: 'p',
              text: 'As duas versões pertencem à mesma identidade, permitindo que cada atividade comunique seu propósito sem comprometer a unidade da marca.'
            }
          ]
        },
        {
          id: 'solution',
          heading: 'Solução',
          blocks: [
            {
              type: 'p',
              text: 'Desenvolvi o sistema de identidade visual, incluindo símbolo, linguagem gráfica, variações, iconografia, aplicações digitais, website e manual de identidade.'
            },
            {
              type: 'p',
              text: 'O sistema foi desdobrado em materiais de comunicação, conteúdos audiovisuais, apresentações de produtos e aplicações institucionais.'
            }
          ]
        },
        {
          id: 'role',
          heading: 'Papel desempenhado',
          blocks: [
            {
              type: 'p',
              text: 'Responsável pela concepção da identidade visual, sistema narrativo da marca, direção de arte e aplicações digitais.'
            },
            {
              type: 'p',
              text: 'Trabalhei com autonomia criativa a partir da referência visual inicial apresentada por Paula Maia, responsável pela avaliação e aprovação das entregas.'
            },
            {
              type: 'p',
              text: 'A iniciativa social e seu conceito de negócio já haviam sido estruturados pelos idealizadores do projeto.'
            }
          ]
        },
        {
          id: 'outcomes',
          heading: 'Reconhecimento e impacto',
          blocks: [
            {
              type: 'p',
              text: 'O Rocinha UP recebeu apoio do programa PISTA, da FAPERJ, e foi lançado publicamente em agosto de 2026.'
            },
            {
              type: 'p',
              text: 'A iniciativa iniciou suas atividades de capacitação, apresentou seus primeiros produtos desenvolvidos por upcycling e recebeu cobertura da imprensa, incluindo reportagens televisivas e reconhecimento institucional da FAPERJ.'
            },
            {
              type: 'p',
              text: 'A identidade visual hoje integra a comunicação pública de uma iniciativa em operação, conectando educação, sustentabilidade e oportunidades econômicas criativas.'
            }
          ]
        }
      ],
      expertise: [
        'Estratégia de Marca',
        'Identidade Visual',
        'Arquitetura de Marca',
        'Narrativa Visual',
        'Design de Símbolos',
        'Direção de Arte',
        'Design Systems',
        'Experiência Digital',
        'Comunicação de Sustentabilidade',
        'Impacto Social',
        'Iconografia',
        'Manual de Identidade'
      ],
      endorsements: {
        testimonials: [
          {
            quote: 'Sem ele meus negócios não andam! Obrigada Davi!',
            name: 'Paula Maia',
            role: 'Fundadora e CEO',
            organization: 'Faz Girar Market',
            photo: '/images/testimonials/paula-maia.jpg',
            url: 'https://www.linkedin.com/in/paula-machado-maia-0a8ab425/'
          }
        ]
      }
    }
  },
  about: {
    eyebrow: 'Sobre & Liderança',
    quote: {
      text: 'A complexidade fica no processo. O que chega às pessoas é simples.',
      author: 'Davi Fontenele'
    },
    titleLines: ['Visão criativa.', 'Profundidade técnica.', 'Capacidade de execução.'],
    cta: 'Saiba mais', // pendente de aprovação
    intro: [
      'Sou Davi Fontenele, diretor de criação e design, com mais de 25 anos de experiência conectando design, tecnologia, narrativa visual e produtos digitais.',
      'Minha trajetória começou na interseção entre design e tecnologia. Aprendi não apenas a conceber experiências digitais, mas também a construí-las — uma base que continua moldando minha maneira de pensar criatividade, viabilidade e execução.',
      'Ao longo da carreira, participei de experiências interativas premiadas internacionalmente, contribuí para campanhas que marcaram a identidade de grandes marcas, dirigi trabalhos de design em equipes distribuídas internacionalmente e desenvolvi experiências digitais para empresas e organizações de diferentes setores.',
      'Hoje, minha atuação reúne direção criativa, design de produto, pesquisa com usuários, liderança de design e integração prática de inteligência artificial aos processos criativos.',
      'Acredito que o design de excelência começa pela compreensão profunda do problema, evolui por meio de decisões criativas fundamentadas e se concretiza quando pessoas, tecnologia e objetivos de negócio trabalham em conjunto.',
      'Minha abordagem combina pensamento estratégico e profundidade técnica. Entendo design do conceito ao código — e liderança da visão à entrega.'
    ],
    philosophy: {
      heading: 'Minha filosofia de liderança',
      items: [
        {
          title: 'Direção sem microgerenciamento.',
          paragraphs: [
            'Uma boa liderança criativa não depende de ter todas as respostas. Depende de fazer as perguntas certas, estabelecer uma direção clara e criar condições para que as pessoas desenvolvam seu melhor trabalho.',
            'Acredito que designers precisam de espaço para explorar possibilidades, com orientação cuidadosa, feedback construtivo e critérios consistentes de qualidade.',
            'Valorizo a colaboração aberta e a comunicação clara entre profissionais com diferentes competências e perspectivas.'
          ]
        },
        {
          title: 'Evidências antes de pressupostos.',
          paragraphs: [
            'Compreender o problema vem antes de desenhar a solução.',
            'Minha abordagem ao discovery combina conversas com stakeholders, entrevistas qualitativas, pesquisas quantitativas, benchmarks e experiência prática.',
            'A pesquisa é um instrumento para questionar hipóteses, reduzir incertezas e fundamentar decisões — não apenas uma formalidade para validar o briefing inicial.'
          ]
        },
        {
          title: 'Qualidade por meio da colaboração.',
          paragraphs: [
            'Um bom design precisa preservar sua integridade desde a concepção até a implementação.',
            'Minha formação técnica me permite compreender os desafios de desenvolvimento e estabelecer uma comunicação eficiente com designers, desenvolvedores e profissionais de QA.',
            'Acredito que qualidade é responsabilidade compartilhada, sustentada por avaliações cuidadosas, colaboração construtiva e atenção aos detalhes.'
          ]
        }
      ]
    },
    ai: {
      heading: 'Inteligência artificial e tecnologia criativa',
      statement: 'Tecnologia deve ampliar a criatividade, não substituir o discernimento.',
      paragraphs: [
        'Passei minha carreira conectando design e tecnologia. A inteligência artificial é uma extensão natural dessa trajetória.',
        'Na 3Lane, utilizei transcrição e síntese assistidas por IA para organizar entrevistas, conversas com stakeholders e descobertas de pesquisas durante o discovery.',
        'Na AuAg, utilizei IA generativa na produção audiovisual, combinando materiais gerados com edição, composição e motion graphics para construir uma narrativa visual mais expressiva.',
        'Essas experiências representam duas aplicações complementares da IA: apoiar pesquisas e decisões estratégicas e ampliar as possibilidades da produção criativa.',
        'Vejo a inteligência artificial como uma ferramenta para potencializar capacidades humanas, não substituir o julgamento criativo.',
        'O objetivo não é simplesmente produzir mais em menos tempo. É abrir espaço para explorações mais profundas, decisões mais claras e ideias mais ambiciosas.'
      ]
    },
    glance: {
      heading: 'Trajetória em números',
      items: [
        { value: '25+ anos', label: 'Atuando em design, tecnologia criativa e experiências digitais.' },
        {
          value: '5 países',
          label: 'Equipes distribuídas internacionalmente durante minha atuação na 3Lane Marketing.'
        },
        {
          value: '9 projetos digitais',
          label: 'Coordenados e entregues para organizações estadunidenses na 3Lane Marketing em 10 meses como Diretor de Design.'
        },
        {
          value: 'iF Communication Design Award',
          label: 'Reconhecimento internacional pelo projeto interativo Espaço Fashion, desenvolvido na 6D.'
        }
      ]
    },
    contact: {
      heading: 'Contato',
      title: 'Vamos construir algo relevante.',
      paragraphs: [
        'Grandes trabalhos acontecem quando visão criativa, pessoas talentosas e objetivos claros se encontram.',
        'Estou aberto a oportunidades de liderança em direção criativa, design, produtos digitais e UX/UI, colaborando com equipes que valorizem decisões fundamentadas, qualidade de execução e impacto significativo.'
      ],
      ctaPrimary: 'Entrar em contato',
      ctaSecondary: 'Explorar projetos',
      name: 'Davi Fontenele',
      role: 'Diretor de Criação & Design',
      location: 'Rio de Janeiro, Brasil',
      whatsappLabel: 'WhatsApp'
    }
  },
  whatsappMessage:
    'Olá, Davi. Conheci seu portfólio e gostaria de conversar sobre uma oportunidade profissional.',
  footer: '© Davi Fontenele. Design, direção e tecnologia.',
  notFound: {
    // pendente de aprovação
    title: 'Página não encontrada',
    body: 'A página que você procura não existe ou mudou de endereço.',
    back: 'Voltar ao portfólio'
  }
};
