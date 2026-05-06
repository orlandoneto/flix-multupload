import office from '~/assets/img/officeflix.jpg';
import profile from '~/assets/img/profile.png';
import profileSmall from '~/assets/img/profileSmall.png';
import rightSide from '~/assets/img/rightSide.png';
import whatsapp from '~/assets/img/whatsapp.png';
import reactLogo from '~/assets/react.svg';

export type BlogPost = {
    slug: string;
    title: string;
    excerpt: string;
    date: string; // ISO date
    cover: string;
    keywords: string[];
    content: string[]; // paragraphs
};

export const posts: BlogPost[] = [
    {
        slug: 'como-escolher-psds-para-clientes',
        title: 'Como escolher PSDs de impacto para seus clientes',
        excerpt: 'Critérios práticos para selecionar PSDs que elevam a percepção de valor nos seus projetos.',
        date: '2025-01-10',
        cover: office,
        keywords: ['psd', 'design', 'clientes', 'briefing', 'tipografia'],
        content: [
            'Selecionar bons PSDs começa pelo entendimento do objetivo do projeto e do público-alvo.',
            'Priorize arquivos com camadas nomeadas, tipografia bem definida e elementos editáveis.',
            'Teste rapidamente variações de cor e hierarquia para simular contextos reais do cliente.'
        ]
    },
    {
        slug: 'tendencias-de-design-2025',
        title: 'Tendências de Design 2025 para Social Media',
        excerpt: 'Cores vibrantes, tipografia expressiva e layouts dinâmicos dominam a cena.',
        date: '2025-01-18',
        cover: rightSide,
        keywords: ['tendências', 'social media', 'cores', 'layout'],
        content: [
            'Cores saturadas e tipografia com personalidade continuam em alta.',
            'Texturas sutis e micro-gradientes trazem profundidade sem poluir a composição.',
            'Vídeos curtos com motion leve aumentam engajamento em campanhas.'
        ]
    },
    {
        slug: 'workflow-rapido-com-mockups',
        title: 'Workflow rápido com mockups: do PSD ao preview',
        excerpt: 'Acelere a validação com um fluxo simples e replicável.',
        date: '2025-01-26',
        cover: profile,
        keywords: ['mockup', 'workflow', 'apresentação', 'validação'],
        content: [
            'Monte um kit de mockups por segmento (restaurantes, varejo, educação).',
            'Padronize resoluções e recortes para comparar variações rapidamente.',
            'Automatize tarefas repetitivas com actions ou scripts quando possível.'
        ]
    },
    {
        slug: 'tipografia-que-converte',
        title: 'Tipografia que converte em campanhas',
        excerpt: 'Como alinhar contraste, legibilidade e hierarquia para CTR maior.',
        date: '2025-02-02',
        cover: profileSmall,
        keywords: ['tipografia', 'hierarquia', 'legibilidade'],
        content: [
            'Defina um par tipográfico com claro contraste entre título e suporte.',
            'Evite tracking exagerado em tamanhos pequenos e preserve o ritmo visual.',
            'Use variações de peso para guiar o olhar e aumentar a taxa de cliques.'
        ]
    },
    {
        slug: 'whatsapp-no-funil-de-conversao',
        title: 'WhatsApp no funil de conversão',
        excerpt: 'Criativos e peças que levam para conversas qualificadas.',
        date: '2025-02-12',
        cover: whatsapp,
        keywords: ['whatsapp', 'conversão', 'anúncios', 'ux'],
        content: [
            'Inclua CTAs claros que indiquem o próximo passo (ex: “Fale agora”).',
            'Padronize thumbnails e mensure respostas por campanha.',
            'Integre respostas rápidas e tags para qualificar leads.'
        ]
    },
    {
        slug: 'stack-visual-da-flixdesign',
        title: 'A stack visual da FlixDesign',
        excerpt: 'Como pensamos componentes, assets e consistência visual.',
        date: '2025-02-20',
        cover: reactLogo,
        keywords: ['design system', 'componentes', 'consistência'],
        content: [
            'Priorizamos componentes reutilizáveis e escaláveis.',
            'Tokens de tema centralizam decisões de cor e tipografia.',
            'Imagens otimizadas e lazy loading equilibram qualidade e performance.'
        ]
    }
];

export const findPostBySlug = (slug?: string) => posts.find((p) => p.slug === slug);


