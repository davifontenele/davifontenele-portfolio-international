import type { Dictionary } from './types';

/**
 * English — approved copy (docs/copy/en.md).
 * Strings marked `// a11y` or `// pending approval` are not part of the approved
 * copy; they are interface/accessibility labels awaiting review.
 */
export const en: Dictionary = {
  locale: 'en',
  meta: {
    siteName: 'Davi Fontenele',
    homeTitle: 'Davi Fontenele — Creative & Design Director',
    homeDescription:
      'Connecting creative thinking, design leadership, and technology to turn complex challenges into meaningful experiences.',
    aboutTitle: 'About & Leadership',
    ogLocale: 'en_US'
  },
  nav: {
    menuLabel: 'Main menu', // a11y
    work: 'Work',
    about: 'About & Leadership',
    contact: 'Contact',
    languageLabel: 'Language', // a11y
    switchTo: 'Português' // a11y
  },
  ui: {
    exploreWork: 'Explore selected work',
    backToFullscreen: 'Back to fullscreen',
    previous: 'Previous project',
    next: 'Next project',
    scrollHint: 'Scroll to explore',
    swipeHint: 'Swipe to explore',
    backToTop: 'Back to top',
    expertise: 'Expertise',
    gallery: 'Gallery', // pending approval
    testimonials: 'Testimonials', // pending approval
    references: 'References', // pending approval
    translatedFrom: { en: 'Translated from English', 'pt-BR': 'Translated from Portuguese' }, // pending approval
    getInTouch: 'Get in touch',
    caseRegion: (name) => `Project: ${name}`, // a11y
    fullCaseRegion: (name) => `Full case: ${name}`, // a11y
    scrollToContent: (name) => `Scroll to the ${name} case`, // a11y
    videoFrame: (name) => `Video frame — ${name}`, // a11y
    opensInNewTab: 'opens in a new tab', // a11y
    pauseVideo: 'Pause background video',
    playVideo: 'Play background video',
    reduceMotion: 'Reduce motion',
    enableMotion: 'Enable motion'
  },
  links: {
    // pending approval (not in the approved copy)
    visitWebsite: 'Visit the website',
    watchCampaign: 'Watch the campaign',
    readArticle: 'Read the article',
    ifAward: 'iF Communication Design Award',
    brandGuidelines: 'Brand guidelines',
    linkedin: 'LinkedIn',
    behance: 'Behance'
  },
  hero: {
    nameLines: ['Davi', 'Fontenele'],
    role: 'Creative & Design Director',
    expertise: 'Brand Strategy · Digital Products · UX/UI · AI',
    statement: 'From vision to execution.',
    supporting:
      'Connecting creative thinking, design leadership, and technology to turn complex challenges into meaningful experiences.',
    ctaPrimary: 'Explore selected work',
    ctaSecondary: 'About & Leadership'
  },
  selectedWork: {
    eyebrow: 'Selected work',
    title: 'Ideas, experiences, and outcomes.',
    intro:
      'A selection of projects spanning product design, international design leadership, creative strategy, award-winning digital experiences, and social impact.'
  },
  cases: {
    auag: {
      name: 'AuAg',
      titleLines: ['Making precious', 'metals accessible', 'through design.'],
      subtitle:
        'From business vision to product experience: UX/UI leadership, creative direction, and digital storytelling for an early-stage fintech.',
      cta: 'Explore the case',
      sections: [
        {
          id: 'overview',
          heading: 'Overview',
          blocks: [
            {
              type: 'p',
              text: 'Turning a business concept into a tangible digital experience through product design, user experience leadership, and audiovisual storytelling.'
            },
            {
              type: 'p',
              text: "Working directly with the CEO, I helped shape the digital experience of an early-stage fintech, connecting the company's commercial narrative with the design of an interactive product demonstration."
            }
          ]
        },
        {
          id: 'context',
          heading: 'Context',
          blocks: [
            {
              type: 'p',
              text: 'AuAg is a fintech startup developing a platform designed to make precious metals such as gold, silver, and platinum more accessible to individual investors.'
            },
            {
              type: 'p',
              text: 'Its proposed ecosystem combines precious metals investing, a payment card, and a rewards system linked to metals.'
            },
            {
              type: 'p',
              text: 'When I joined as Head of UX/UI, the company was refining its website while partnerships, operational processes, and financial infrastructure were still being structured ahead of investment.'
            },
            {
              type: 'p',
              text: 'The digital experience had two complementary purposes: introduce the concept to potential customers and communicate the business vision to prospective investors.'
            }
          ]
        },
        {
          id: 'challenge',
          heading: 'The Challenge',
          blocks: [
            {
              type: 'p',
              text: 'How do you make a sophisticated financial product feel approachable, intuitive, and engaging before the business is fully operational?'
            },
            {
              type: 'p',
              text: 'The website needed to communicate credibility, explain a new value proposition, and generate interest among different audiences.'
            },
            {
              type: 'p',
              text: 'At the same time, the startup needed a tangible demonstration of its future product: an application that could communicate how users would navigate, invest, monitor their holdings, and interact with the proposed ecosystem.'
            },
            {
              type: 'p',
              text: 'The experience had to feel accessible and rewarding without sacrificing the clarity and seriousness expected of a financial product.'
            }
          ]
        },
        {
          id: 'strategy',
          heading: 'Strategy & Design Decisions',
          blocks: [
            { type: 'sub', text: 'Connecting business vision and user experience' },
            {
              type: 'p',
              text: 'Working in direct collaboration with the CEO, I participated in the ongoing definition and validation of the digital experience.'
            },
            {
              type: 'p',
              text: "While the company's broader business objectives were established by its leadership, I independently proposed several UX and interaction design solutions intended to make the product easier to understand and more enjoyable to use."
            },
            { type: 'sub', text: 'Reducing perceived complexity' },
            {
              type: 'p',
              text: 'One of the guiding principles was to make precious metals investing feel less intimidating to consumers unfamiliar with these assets.'
            },
            {
              type: 'p',
              text: 'I explored intuitive interactions, immediate visual feedback, clear information hierarchy, and refined microinteractions to create a sense of simplicity and responsiveness.'
            },
            { type: 'sub', text: 'Designing the product journey' },
            {
              type: 'p',
              text: "Using Figma, I designed the application's user journeys, information architecture, interfaces, and interaction patterns."
            },
            {
              type: 'p',
              text: 'These designs informed the development of a functional demonstration MVP covering the core experiences planned for the product.'
            },
            { type: 'sub', text: 'Selling the vision through audiovisual storytelling' },
            {
              type: 'p',
              text: 'For the website, I combined AI-generated visual material with extensive editing, compositing, and motion graphics in Adobe After Effects.'
            },
            {
              type: 'p',
              text: "The goal was to create a compelling audiovisual narrative that communicated the company's ambition, positioned the product as premium, and made the concept more tangible."
            }
          ]
        },
        {
          id: 'solution',
          heading: 'The Solution',
          blocks: [
            { type: 'sub', text: 'A website designed for two audiences' },
            {
              type: 'p',
              text: 'An engaging digital presentation combining product messaging, visual storytelling, and cinematic motion to address both potential users and investors.'
            },
            { type: 'sub', text: 'An interactive product demonstration' },
            {
              type: 'p',
              text: "A functional MVP based on the Figma experience, allowing visitors to explore the application's proposed features using a fictional starting balance."
            },
            {
              type: 'p',
              text: 'The demonstration includes simulated product interactions but does not support real financial transactions or full user account management.'
            },
            {
              type: 'p',
              text: 'Together, these experiences allow the AuAg concept to be communicated through both a commercial narrative and an interactive demonstration.'
            }
          ]
        },
        {
          id: 'role',
          heading: 'My Role',
          blocks: [
            { type: 'sub', text: 'Head of UX/UI' },
            {
              type: 'p',
              text: "Responsible for directing the product's user experience, designing application journeys and interfaces, proposing interaction patterns, shaping the website's visual narrative, and collaborating directly with the CEO throughout the design and validation process."
            },
            {
              type: 'p',
              text: 'My work also included generative AI-assisted audiovisual production, video editing, motion graphics, and collaboration around the MVP implementation.'
            }
          ]
        },
        {
          id: 'outcomes',
          heading: 'Outcomes',
          blocks: [
            {
              type: 'list',
              items: [
                "A website supporting the startup's presentation to potential customers and investors.",
                'A cohesive product experience designed in Figma.',
                'An interactive MVP demonstrating core user journeys with simulated funds.',
                'A stronger visual and functional representation of a business concept still in development.'
              ]
            },
            {
              type: 'p',
              text: 'As AuAg remains in its pre-investment stage, these outcomes represent design and product demonstration achievements rather than commercial adoption, revenue, or live financial activity.'
            }
          ]
        }
      ],
      expertise: [
        'Product Design Leadership',
        'UX/UI Strategy',
        'Interaction Design',
        'User Journey Mapping',
        'Information Architecture',
        'Figma',
        'Prototyping',
        'MVP',
        'Executive Collaboration',
        'Creative Direction',
        'Generative AI',
        'Adobe After Effects',
        'Motion Graphics',
        'Digital Storytelling'
      ],
      endorsements: {
        testimonials: [
          {
            // Resumo do original em inglês, com as palavras do autor.
            quote:
              'Davi was a key contributor to AuAg. He was crucial to the large overhaul of our website and played a central role in developing our MVP mobile investing app. His ability to combine technical expertise, design, and creative problem-solving made him an invaluable member of our team.',
            name: 'Thomas Gardner',
            role: 'CEO',
            organization: 'AuAg',
            photo: '/images/testimonials/thomas-gardner.jpg',
            url: 'https://www.linkedin.com/in/thomas-gardner-a88a1513/',
            highlight: true
          }
        ]
      }
    },

    '3lane': {
      name: '3Lane Marketing',
      titleLines: ['Leading design', 'across teams,', 'industries,', 'and borders.'],
      subtitle:
        'Design direction, user research, and cross-functional collaboration across nine digital projects for US organizations.',
      cta: 'Explore the case',
      sections: [
        {
          id: 'overview',
          heading: 'Overview',
          blocks: [
            {
              type: 'p',
              text: 'Nine delivered digital projects. Multiple industries. Teams distributed across six countries.'
            },
            {
              type: 'p',
              text: 'As Design Director at 3Lane Marketing, I connected discovery, research, creative direction, client relationships, and design quality throughout the delivery of digital experiences for US organizations.'
            }
          ]
        },
        {
          id: 'context',
          heading: 'Context',
          blocks: [
            {
              type: 'p',
              text: '3Lane Marketing is a US-based agency working with organizations across sectors including education, healthcare, urban planning, manufacturing, environmental science, and public media.'
            },
            {
              type: 'p',
              text: 'My role involved directing design work within multidisciplinary, internationally distributed teams, while acting as a bridge between clients, project management, research, designers, developers, and quality assurance.'
            },
            {
              type: 'p',
              text: 'Across this engagement, I coordinated and delivered nine digital projects for organizations with distinct audiences, requirements, and operational challenges.'
            }
          ]
        },
        {
          id: 'challenge',
          heading: 'The Challenge',
          blocks: [
            {
              type: 'p',
              text: 'How do you maintain creative quality, strategic relevance, and implementation consistency across projects with very different goals and stakeholder expectations?'
            },
            {
              type: 'p',
              text: 'Each organization brought its own challenges, users, information structures, and constraints.'
            },
            {
              type: 'p',
              text: 'The responsibility was not simply to translate an initial brief into a visual solution, but to understand the underlying problem, challenge assumptions when necessary, and guide the team toward an appropriate outcome.'
            }
          ]
        },
        {
          id: 'strategy',
          heading: 'Strategy & Leadership',
          blocks: [
            { type: 'sub', text: 'Discovery before design' },
            {
              type: 'p',
              text: 'I participated directly in client meetings, conducted qualitative interviews, and coordinated qualitative research activities.'
            },
            {
              type: 'p',
              text: 'Working with the project manager, I also contributed to quantitative discovery through surveys and questionnaires.'
            },
            {
              type: 'p',
              text: 'Research findings, stakeholder inputs, benchmarking, and professional experience informed the direction of each project.'
            },
            { type: 'sub', text: 'AI-assisted research workflows' },
            {
              type: 'p',
              text: 'AI-assisted transcription and summarization helped process meeting and interview information, making it easier to organize findings and synthesize inputs for design decisions.'
            },
            {
              type: 'p',
              text: 'These tools supported analysis rather than replacing interpretation or professional judgment.'
            },
            { type: 'sub', text: 'Creative direction and team guidance' },
            {
              type: 'p',
              text: 'I guided designers through verbal direction, visual references, and original sketches when needed.'
            },
            {
              type: 'p',
              text: "I then reviewed their proposals, provided feedback, and directed refinements to maintain consistency with the project's objectives and creative direction."
            },
            { type: 'sub', text: 'Cross-functional collaboration' },
            {
              type: 'p',
              text: 'I worked with project management, developers, and QA professionals to keep project requirements, design decisions, and implementation aligned.'
            },
            { type: 'sub', text: 'Design quality ownership' },
            {
              type: 'p',
              text: 'I monitored front-end implementation to ensure high visual fidelity between approved designs and delivered interfaces.'
            },
            { type: 'sub', text: 'Client-facing leadership' },
            {
              type: 'p',
              text: 'I presented design deliverables to clients, explained the solutions, gathered feedback, and coordinated subsequent refinements.'
            },
            {
              type: 'p',
              text: 'Discovery remained adaptable throughout the process, allowing insights and new information to influence the direction of the work.'
            }
          ]
        },
        {
          id: 'work',
          heading: 'The Work',
          blocks: [
            { type: 'p', text: 'Nine coordinated and delivered digital projects:' },
            { type: 'projects' }
          ]
        },
        {
          id: 'role',
          heading: 'My Role',
          blocks: [
            { type: 'sub', text: 'Design Director' },
            {
              type: 'p',
              text: 'Responsible for creative direction, designer guidance, discovery activities, client presentations, interpretation of research findings, and visual quality assurance throughout the design-to-development process.'
            },
            {
              type: 'p',
              text: 'My work connected stakeholder expectations, user needs, design decisions, and technical execution.'
            }
          ]
        },
        {
          id: 'outcomes',
          heading: 'Outcomes',
          blocks: [
            {
              type: 'list',
              items: [
                'Nine coordinated and delivered digital projects for US organizations.',
                'Design collaboration across teams distributed in five countries.',
                'A consistent discovery-to-delivery approach adapted to different industries and organizational needs.',
                'Direct involvement in research, creative guidance, stakeholder communication, and implementation quality.'
              ]
            },
            {
              type: 'p',
              text: 'The diversity of these projects demonstrates an ability to apply a disciplined design process without imposing identical solutions on fundamentally different problems.'
            }
          ]
        },
        {
          id: 'principle',
          heading: 'Leadership Principle',
          blocks: [
            { type: 'statement', text: 'Understand the problem before designing the solution.' },
            {
              type: 'p',
              text: 'Good design leadership means questioning assumptions, making informed decisions, providing clear direction, and helping teams turn complexity into useful experiences.'
            }
          ]
        }
      ],
      expertise: [
        'Design Leadership',
        'Creative Direction',
        'UX Research',
        'Discovery',
        'Qualitative Research',
        'Quantitative Research',
        'Evidence-Informed Design',
        'Stakeholder Management',
        'AI-Assisted Research',
        'Cross-Functional Collaboration',
        'Design QA',
        'International Teams',
        'Digital Experience'
      ],
      projects: {
        mcls: {
          name: 'MCLS — Midwest Collaborative for Library Services',
          description: 'Digital experience for a collaborative library services organization.'
        },
        cpex: {
          name: 'CPEX — Center for Planning Excellence',
          description:
            'Digital communication for an organization focused on planning, communities, and sustainability.'
        },
        fcc: {
          name: 'FCC — Family Child Care Project',
          description: 'Digital experience supporting the family childcare sector.'
        },
        sga: {
          name: 'Smart Growth America',
          description:
            'Digital communication for an organization working on sustainable development, transportation, and land-use policies.'
        },
        nwctm: {
          name: 'Northwest CT Manufacturing',
          description: 'Digital platform supporting a regional manufacturing sector partnership.'
        },
        nwcthc: {
          name: 'Northwest HealthConnect',
          description: 'Digital platform for a regional healthcare sector partnership.'
        },
        marco: {
          name: 'MARCO — Mid-Atlantic Regional Council on the Ocean',
          description: 'Digital communication for regional ocean planning and cooperation.'
        },
        macan: {
          name: 'MACAN — Mid-Atlantic Coastal Acidification Network',
          description:
            'Digital experience for a collaborative network addressing coastal and ocean acidification.'
        },
        detroitpbs: {
          name: 'Detroit PBS',
          description: 'Digital work for a public media organization.'
        }
      }
    },

    reserva: {
      name: 'Reserva',
      titleLines: ['Turning a crisis into', 'a brand-defining idea.'],
      subtitle:
        'How a viral campaign drove a 9,900% increase in e-commerce sales and helped shape a lasting brand philosophy.',
      cta: 'Explore the case',
      sections: [
        {
          id: 'overview',
          heading: 'Overview',
          blocks: [
            {
              type: 'p',
              text: "A creative response to a store robbery became an internationally recognized campaign, activated an emerging e-commerce operation, and helped establish a philosophy that would remain part of Reserva's brand identity for years."
            }
          ]
        },
        {
          id: 'context',
          heading: 'Context',
          blocks: [
            {
              type: 'p',
              text: 'Reserva, a Brazilian menswear brand, experienced a robbery at one of its stores.'
            },
            {
              type: 'p',
              text: 'Security camera footage captured the incident, providing the raw material for an unexpected creative opportunity.'
            },
            {
              type: 'p',
              text: 'Instead of communicating the event only as a crisis, the idea emerged to transform an adverse situation into a positive, humorous brand narrative.'
            }
          ]
        },
        {
          id: 'challenge',
          heading: 'The Challenge',
          blocks: [
            {
              type: 'p',
              text: 'Create a fast, relevant, and sensitive response to a real incident without trivializing violence or adopting a conventional victim narrative.'
            },
            {
              type: 'p',
              text: "The campaign also needed to contribute to the activation of Reserva's still-emerging e-commerce business."
            }
          ]
        },
        {
          id: 'idea',
          heading: 'The Creative Idea',
          blocks: [
            { type: 'statement', text: 'When life gives you lemons, make lemonade.' },
            {
              type: 'p',
              text: 'The security footage was reinterpreted and edited into a video that transformed an unexpected problem into a statement of attitude.'
            },
            {
              type: 'p',
              text: 'The concept relied on timing, storytelling, humor, and the ability to find a compelling message within real events.'
            },
            {
              type: 'p',
              text: 'Rather than relying on an elaborate advertising production, the campaign derived its power from the creative reinterpretation of existing footage.'
            }
          ]
        },
        {
          id: 'execution',
          heading: 'Execution & Activation',
          blocks: [
            {
              type: 'p',
              text: 'The video served as both a communication campaign and an e-commerce activation.'
            },
            {
              type: 'p',
              text: 'It generated approximately 300,000 views during its first weekend and received organic coverage from national and international media outlets.'
            },
            {
              type: 'p',
              text: "During the campaign period, the brand's online sales reportedly increased from approximately US$500 to US$50,000 — a rise of roughly **9,900%**."
            }
          ]
        },
        {
          id: 'beyond',
          heading: 'Beyond the Campaign',
          blocks: [
            {
              type: 'p',
              text: 'The idea of turning lemons into lemonade went beyond the original video.'
            },
            {
              type: 'p',
              text: "It became part of Reserva's internal language and public brand identity, returning in later campaigns, promotional initiatives, visual themes, and documentary-style content featuring entrepreneurs discussing the challenges of building businesses."
            },
            {
              type: 'p',
              text: 'A short-term creative response helped establish a long-term brand narrative.'
            }
          ]
        },
        {
          id: 'role',
          heading: 'My Role',
          blocks: [
            {
              type: 'p',
              text: 'Creative participation in the conception and collaborative execution of the campaign, including narrative development and the editing of security footage into a coherent audiovisual piece.'
            }
          ]
        },
        {
          id: 'outcomes',
          heading: 'Impact & Legacy',
          blocks: [
            {
              type: 'list',
              items: [
                'Approximately 300,000 video views during the first weekend.',
                'Organic national and international media attention.',
                'Approximately 9,900% growth in e-commerce sales during the campaign period.',
                'A creative concept that remained associated with the brand for years.'
              ]
            },
            {
              type: 'statement',
              text: 'Seven years later, Reserva was sold in a transaction valued at R$715 million.'
            },
            {
              type: 'p',
              text: "That subsequent transaction represents a milestone in the company's broader trajectory, not a financial outcome attributable to this individual campaign."
            }
          ]
        }
      ],
      expertise: [
        'Creative Strategy',
        'Brand Storytelling',
        'Crisis Communication',
        'Creative Concept',
        'Video Editing',
        'Brand Activation',
        'E-commerce Activation',
        'Earned Media',
        'Brand Positioning',
        'Business Impact'
      ],
      // pending approval
      mediaAlt: [
        'Reserva campaign — video frame 1',
        'Reserva campaign — video frame 2',
        'Reserva campaign — video frame 3'
      ],
      endorsements: {
        testimonials: [
          {
            quote: 'Brilliant! Brilliant! Brilliant! Brilliant! Brilliant!',
            name: 'Sérgio Valente',
            role: 'Then president of DM9DDB and about to become communications director at Rede Globo, he shared the video on social media with this comment.',
            photo: '/images/testimonials/sergio-valente.jpg',
            translatedFrom: 'pt-BR',
            highlight: true
          }
        ],
        references: [
          {
            title: 'Rebeldes têm asas',
            publication: 'As seen in the book',
            url: 'https://www.amazon.com.br/dp/8543105250',
            note: 'Page 332: “Transformando limão em limonada” (“Turning lemons into lemonade”)'
          }
        ]
      }
    },

    'espaco-fashion': {
      name: 'Espaço Fashion',
      titleLines: ['Turning fashion', 'consumers into', 'content creators.'],
      subtitle:
        'An iF Communication Design Award-winning experience combining fashion films, interactive design, and user-generated content.',
      cta: 'Explore the case',
      sections: [
        {
          id: 'overview',
          heading: 'Overview',
          blocks: [
            {
              type: 'p',
              text: "An award-winning interactive fashion experience that invited consumers to create and share their own digital catalogs using frames selected from the brand's campaign films."
            }
          ]
        },
        {
          id: 'context',
          heading: 'Context',
          blocks: [
            {
              type: 'p',
              text: 'For its Spring/Summer 2010–11 collection, Brazilian fashion brand Espaço Fashion collaborated with digital studio 6D on a campaign combining fashion films and an interactive online experience.'
            },
            {
              type: 'p',
              text: "The creative direction established the campaign's overall visual language, which then needed to be translated into a digital environment that encouraged audience participation."
            }
          ]
        },
        {
          id: 'challenge',
          heading: 'The Challenge',
          blocks: [
            {
              type: 'p',
              text: 'Go beyond a conventional fashion catalog by giving consumers an active role in creating and sharing brand content.'
            },
            {
              type: 'p',
              text: 'The experience needed to connect audiovisual material, interface design, and interactive behavior in a cohesive and intuitive way.'
            }
          ]
        },
        {
          id: 'idea',
          heading: 'The Interactive Concept',
          blocks: [
            {
              type: 'p',
              text: "Working from the campaign's established art direction, I conceived the interactive experience, designed its interfaces, and programmed its interactions."
            },
            {
              type: 'p',
              text: 'Visitors could explore the fashion films, select individual frames, and use them to create personalized catalogs.'
            },
            {
              type: 'p',
              text: "Their compositions could be shared on Facebook and published on the brand's website."
            },
            {
              type: 'p',
              text: "The project turned the audience from passive viewers into active participants in the brand's communication."
            }
          ]
        },
        {
          id: 'role',
          heading: 'My Role',
          blocks: [
            {
              type: 'p',
              text: 'Responsible for conceiving the digital interaction concept, designing the interfaces, and programming the interactive experience.'
            },
            {
              type: 'p',
              text: "The work was developed within 6D's team under the campaign's established creative direction."
            }
          ]
        },
        {
          id: 'outcomes',
          heading: 'Recognition & Impact',
          blocks: [
            {
              type: 'p',
              text: 'The project received an **iF Communication Design Award**, one of the internationally recognized distinctions in design.'
            },
            {
              type: 'p',
              text: 'Its participatory approach anticipated practices that would later become widely associated with user-generated content in digital marketing.'
            }
          ]
        }
      ],
      expertise: [
        'Interactive Experience Design',
        'Creative Technology',
        'UX/UI Design',
        'Interaction Design',
        'Creative Coding',
        'Front-end Development',
        'Digital Art Direction',
        'User-Generated Content',
        'Fashion Communication',
        'Award-Winning Design'
      ],
      // pending approval
      mediaAlt: [
        'Espaço Fashion interactive catalog — screenshot 1',
        'Espaço Fashion interactive catalog — screenshot 2',
        'Espaço Fashion interactive catalog — screenshot 3'
      ],
      endorsements: {
        testimonials: [
          {
            quote:
              'Davi and I have known each other for a long time. We first met when he came to work with me at 6D, the branding and communication company I founded and still lead today. Back then, still very young, Davi already showed his talent as a creator and, above all, as the digital developer of his own creations. We worked together for a few years, but we soon became friends, and my admiration for him only grew. His talent, of course, refined over the years, has only kept evolving. A good person and a talented professional whom I affectionately call “the Oracle.”',
            name: 'Lula Freitas',
            role: 'Founder and CEO',
            organization: '6D',
            photo: '/images/testimonials/lula-freitas.jpg',
            translatedFrom: 'pt-BR'
          }
        ],
        references: [
          {
            title: 'iF Communication Design Award',
            publication: 'Branding & Communication Design',
            author: 'Websites category',
            date: '2011',
            url: 'https://ifdesign.com/de/winner-ranking/project/espaco-fashion/81107',
            note: 'More information at the link'
          },
          {
            title: 'Prêmio Peixe Grande (now defunct)',
            publication: 'Overall winner',
            author: 'The highest honor of the event',
            date: '2011',
            url: 'https://www.revistawide.com.br/2026/04/premio-peixe-grande-o-concurso-que.html',
            note: 'More information at the link'
          }
        ]
      }
    },

    salinas: {
      name: 'Salinas',
      titleLines: ['When interaction', 'becomes brand', 'identity.'],
      subtitle:
        'An interactive fashion website featuring original animations, internationally recognized typography, and four years of brand relevance.',
      cta: 'Explore the case',
      sections: [
        {
          id: 'overview',
          heading: 'Overview',
          blocks: [
            {
              type: 'p',
              text: 'A highly interactive fashion website for Salinas, featuring interfaces, interactions, and animations created by me.'
            },
            {
              type: 'p',
              text: 'Its distinctive use of animated typography attracted international attention, while the experience remained online for four years.'
            }
          ]
        },
        {
          id: 'context',
          heading: 'Context',
          blocks: [
            {
              type: 'p',
              text: 'Salinas, a Brazilian swimwear brand, sought a digital presence capable of expressing its visual personality through more than static layouts and conventional navigation.'
            },
            {
              type: 'p',
              text: "The campaign's creative direction established an aesthetic language that needed to be translated into an engaging interactive experience."
            }
          ]
        },
        {
          id: 'challenge',
          heading: 'The Challenge',
          blocks: [
            {
              type: 'p',
              text: 'Turn an existing visual direction into a distinctive digital environment where animation, typography, and interaction became integral to the brand experience.'
            },
            {
              type: 'p',
              text: 'The goal was not simply to present beautiful screens, but to define how the brand would feel through movement and user interaction.'
            }
          ]
        },
        {
          id: 'idea',
          heading: 'The Creative Approach',
          blocks: [
            { type: 'statement', text: 'Making motion part of the brand language.' },
            {
              type: 'p',
              text: "Working from the project's established art direction, I conceived the interactive experience, designed the interfaces, programmed the behaviors, and created every animation featured on the website."
            },
            {
              type: 'p',
              text: 'Typography, transitions, and movement were treated as expressive elements rather than decoration.'
            },
            {
              type: 'p',
              text: "The result was a cohesive digital experience in which interaction became part of the brand's personality."
            }
          ]
        },
        {
          id: 'role',
          heading: 'My Role',
          blocks: [
            {
              type: 'p',
              text: "Responsible for the interactive experience concept, interface design, programming, and the complete creation of the website's animations."
            },
            {
              type: 'p',
              text: 'The overall campaign creative direction was established separately.'
            }
          ]
        },
        {
          id: 'outcomes',
          heading: 'Recognition & Impact',
          blocks: [
            {
              type: 'p',
              text: 'The website was featured in the international article **“101 Examples of Text Treatments on the Web”**, which highlighted creative approaches to typography and text presentation.'
            },
            {
              type: 'p',
              text: 'The site remained online for four years, reflecting the longevity of its visual language and its strong association with the brand.'
            }
          ]
        }
      ],
      expertise: [
        'Interactive Design',
        'Creative Technology',
        'Motion Design',
        'Web Animation',
        'Creative Coding',
        'Front-end Development',
        'Typography',
        'Digital Art Direction',
        'Brand Experience',
        'Interaction Design'
      ],
      // pending approval
      mediaAlt: [
        'Salinas website — screenshot 1',
        'Salinas website — screenshot 2',
        'Salinas website — screenshot 3'
      ],
      endorsements: {
        testimonials: [
          {
            quote:
              'I had the pleasure of working alongside Davi for a few years, and not only during those years but also afterward, he always proved committed and proactive. One of those people who are all in and lift the whole team up. He ended up becoming a great friend!',
            name: 'Emílio Rangel',
            role: 'Creative Director',
            organization: '6D',
            photo: '/images/testimonials/emilio-rangel.jpg',
            translatedFrom: 'pt-BR'
          },
          {
            quote:
              'Davi Fontenele is an amazing guy. Super talented and creative. He goes from design to development. He spent years at 6D and is still much loved by everyone there. Highly recommended.',
            name: 'Tola Faria',
            role: 'Client Services Director',
            organization: '6D',
            photo: '/images/testimonials/tola-faria.jpg',
            translatedFrom: 'pt-BR'
          }
        ],
        references: [
          {
            title: '101 Examples of Text Treatments on the Web',
            publication: 'Webdesigner Depot',
            author: 'WDD Staff',
            date: 'April 2009',
            url: 'https://webdesignerdepot.com/101-examples-of-text-treatments-on-the-web/'
          }
        ]
      }
    },

    'rocinha-up': {
      name: 'Rocinha UP',
      titleLines: ['Designing identity', 'for social', 'transformation.'],
      subtitle:
        "A dual brand identity connecting education, circular economy, and sustainable fashion in Rio de Janeiro's Rocinha community.",
      cta: 'Explore the case',
      sections: [
        {
          id: 'overview',
          heading: 'Overview',
          blocks: [
            {
              type: 'p',
              text: 'A unified visual identity connecting professional education and sustainable fashion through two complementary brand expressions.'
            },
            {
              type: 'p',
              text: 'The project brings together Brazilian jiu-jitsu, upcycling, and income-generation opportunities in the Rocinha community.'
            }
          ]
        },
        {
          id: 'context',
          heading: 'Context',
          blocks: [
            {
              type: 'p',
              text: 'Rocinha UP is a social initiative conceived by Paula Maia, founder of Faz Girar Market, in partnership with Paulo Cunha, founder of Projeto Lapidar Jiu-Jitsu.'
            },
            {
              type: 'p',
              text: 'The initiative connects professional training, circular economy principles, and sustainable product development through the reuse of discarded jiu-jitsu materials.'
            },
            {
              type: 'p',
              text: 'The challenge for design was to create a recognizable identity for an initiative with two interconnected dimensions: education and a sustainable fashion label.'
            }
          ]
        },
        {
          id: 'challenge',
          heading: 'The Challenge',
          blocks: [
            {
              type: 'p',
              text: 'How can one brand communicate two distinct activities without losing coherence?'
            },
            {
              type: 'p',
              text: 'The identity needed to represent professional development, community belonging, environmental awareness, and contemporary design while maintaining a clear connection to the origins of the project.'
            }
          ]
        },
        {
          id: 'strategy',
          heading: 'Brand Strategy & Concept',
          blocks: [
            { type: 'statement', text: 'One identity. Two expressions.' },
            {
              type: 'p',
              text: 'Starting from an initial idea proposed by Paula Maia — using a jiu-jitsu belt as visual inspiration — I developed a symbol combining several layers of meaning.'
            },
            {
              type: 'p',
              text: 'Its geometry evokes a martial arts belt, while its overall silhouette also resembles a jewel, referencing Projeto Lapidar Jiu-Jitsu.'
            },
            {
              type: 'p',
              text: 'The idea of polishing a precious stone becomes a metaphor for developing human potential and transforming discarded materials into valuable products.'
            },
            { type: 'p', text: 'I proposed a dual visual system:' },
            {
              type: 'p',
              text: '**The untied belt** represents education, training, and professional development.'
            },
            {
              type: 'p',
              text: '**The tied belt** identifies the fashion label and its upcycled products.'
            },
            {
              type: 'p',
              text: 'Both versions belong to the same visual identity, allowing each activity to communicate its purpose while remaining part of a coherent brand.'
            }
          ]
        },
        {
          id: 'solution',
          heading: 'The Solution',
          blocks: [
            {
              type: 'p',
              text: 'I developed the brand identity system, including symbol, visual language, variations, iconography, digital applications, website, and brand guidelines.'
            },
            {
              type: 'p',
              text: 'The system was extended to communication materials, audiovisual content, product presentations, and institutional applications.'
            }
          ]
        },
        {
          id: 'role',
          heading: 'My Role',
          blocks: [
            {
              type: 'p',
              text: 'Responsible for the visual identity concept, narrative brand system, art direction, and digital applications.'
            },
            {
              type: 'p',
              text: 'I worked with full creative autonomy from the initial visual reference provided by Paula Maia, who reviewed and approved the project deliverables.'
            },
            {
              type: 'p',
              text: 'The underlying social initiative and business concept had already been established by its founders.'
            }
          ]
        },
        {
          id: 'outcomes',
          heading: 'Recognition & Impact',
          blocks: [
            {
              type: 'p',
              text: "Rocinha UP received support through FAPERJ's PISTA program and launched publicly in August 2026."
            },
            {
              type: 'p',
              text: 'The initiative has begun its training activities, introduced initial upcycled products, and received media coverage, including television reporting and recognition by FAPERJ.'
            },
            {
              type: 'p',
              text: 'The identity now supports the public communication of an active initiative connecting education, sustainability, and creative economic opportunities.'
            }
          ]
        }
      ],
      expertise: [
        'Brand Strategy',
        'Brand Identity',
        'Brand Architecture',
        'Visual Storytelling',
        'Symbol Design',
        'Art Direction',
        'Design Systems',
        'Digital Experience',
        'Sustainability Communication',
        'Social Impact',
        'Iconography',
        'Brand Guidelines'
      ],
      endorsements: {
        testimonials: [
          {
            quote: "My businesses don't move without him! Thank you, Davi!",
            name: 'Paula Maia',
            role: 'Founder and CEO',
            organization: 'Faz Girar Market',
            photo: '/images/testimonials/paula-maia.jpg',
            url: 'https://www.linkedin.com/in/paula-machado-maia-0a8ab425/',
            translatedFrom: 'pt-BR'
          }
        ]
      }
    }
  },
  about: {
    eyebrow: 'About & Leadership',
    titleLines: ['Creative vision.', 'Technical depth.', 'Proven execution.'],
    cta: 'Read more', // pending approval
    intro: [
      "I'm Davi Fontenele, a Creative & Design Director with over 25 years of experience connecting design, technology, storytelling, and digital products.",
      'My career began at the intersection of visual design and technology. I learned not only how to conceive digital experiences, but also how to build them — a foundation that continues to shape the way I think about creativity, feasibility, and execution.',
      "Over the years, I've contributed to award-winning interactive experiences, helped create brand-defining campaigns, directed design work in internationally distributed teams, and developed digital experiences for businesses and organizations across different industries.",
      'Today, my work brings together creative direction, product design, UX research, design leadership, and the practical integration of artificial intelligence into creative workflows.',
      'I believe exceptional design begins with a deep understanding of the problem, evolves through informed creative decisions, and succeeds when people, technology, and business objectives work together.',
      'My approach combines strategic thinking with hands-on expertise. I understand design from concept to code — and leadership from vision to delivery.'
    ],
    philosophy: {
      heading: 'My Leadership Philosophy',
      items: [
        {
          title: 'Direction without micromanagement.',
          paragraphs: [
            "Great creative leadership isn't about having every answer. It's about asking the right questions, establishing a clear direction, and creating the conditions for people to do their best work.",
            'I believe designers need space to explore, supported by thoughtful guidance, constructive feedback, and a consistent standard of quality.',
            'I value open collaboration and clear communication between people with different skills and perspectives.'
          ]
        },
        {
          title: 'Evidence before assumptions.',
          paragraphs: [
            'Understanding the problem comes before designing the solution.',
            'My approach to discovery combines stakeholder conversations, qualitative interviews, quantitative research, benchmarking, and practical experience.',
            'Research is an instrument for questioning assumptions, reducing uncertainty, and making more informed decisions — not simply a formality to validate an initial brief.'
          ]
        },
        {
          title: 'Quality through collaboration.',
          paragraphs: [
            'Great design should maintain its integrity from concept to implementation.',
            'My technical background helps me understand the challenges of development and communicate effectively with designers, engineers, and QA professionals.',
            'I believe quality is a shared responsibility, supported by careful review, constructive collaboration, and attention to detail.'
          ]
        }
      ]
    },
    ai: {
      heading: 'AI & Creative Technology',
      statement: 'Technology should expand creativity, not replace judgment.',
      paragraphs: [
        "I've spent my career connecting design and technology. Artificial intelligence is a natural extension of that journey.",
        'At 3Lane, I used AI-assisted transcription and summarization to help organize interviews, stakeholder conversations, and research findings during discovery.',
        'At AuAg, I used generative AI in audiovisual production, combining generated material with editing, compositing, and motion graphics to create a more compelling visual narrative.',
        'These experiences reflect two complementary applications of AI: supporting research and decision-making, and expanding creative production possibilities.',
        'I see AI as a tool for amplifying human capability, not replacing creative judgment.',
        "The goal isn't merely to produce more work in less time. It's to create space for deeper exploration, clearer decisions, and more ambitious ideas."
      ]
    },
    glance: {
      heading: 'Experience at a Glance',
      items: [
        {
          value: '25+ years',
          label: 'Working across design, creative technology, and digital experiences.'
        },
        {
          value: '5 countries',
          label: 'Internationally distributed teams during my work at 3Lane.'
        },
        {
          value: '9 digital projects',
          label: 'Coordinated and delivered for US organizations at 3Lane Marketing in 10 months as Design Director.'
        },
        {
          value: 'iF Communication Design Award',
          label: 'International recognition for the Espaço Fashion interactive project developed at 6D.'
        }
      ]
    },
    contact: {
      heading: 'Contact',
      title: "Let's build something meaningful.",
      paragraphs: [
        'Great work happens when creative vision, talented people, and clear objectives come together.',
        "I'm open to leadership opportunities in creative direction, design, digital products, and UX/UI — working with teams that value thoughtful decisions, strong execution, and meaningful impact."
      ],
      ctaPrimary: 'Get in touch',
      ctaSecondary: 'Explore my work',
      name: 'Davi Fontenele',
      role: 'Creative & Design Director',
      location: 'Rio de Janeiro, Brazil',
      whatsappLabel: 'WhatsApp'
    }
  },
  whatsappMessage:
    'Hi Davi, I came across your portfolio and would like to discuss a professional opportunity.',
  footer: '© Davi Fontenele. Design, direction, and technology.',
  notFound: {
    // pending approval
    title: 'Page not found',
    body: 'The page you are looking for does not exist or has moved.',
    back: 'Back to the portfolio'
  }
};
