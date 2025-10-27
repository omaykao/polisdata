import { faker } from '@faker-js/faker';
import {
  Politician,
  SentimentAnalysis,
  EmergingNarrative,
  WhatsAppCampaign,
  SocialMediaMention,
  CRMPipelineCard,
  PipelineStage,
  Notification,
  NotificationCategory,
  Activity,
  DashboardKPIs,
  PoliticianAchievement
} from './types';

// Set a consistent seed for reproducibility
faker.seed(123);

// Brazilian political parties - siglas reais (partidos de centro-direita e direita)
const PARTIES = ['PSDB', 'MDB', 'PP', 'PSD', 'PL', 'PSB', 'REPUBLICANOS', 'UNIÃO', 'PV', 'PSC', 'NOVO', 'PATRIOTA', 'SOLIDARIEDADE', 'PROS', 'PODEMOS', 'CIDADANIA'];
const POSITIONS = ['Dep. Estadual', 'Dep. Federal', 'Senador', 'Governador', 'Presidente'];

// Brazilian politician names - nomes fictícios organizados por gênero
const BRAZILIAN_POLITICIANS = [
  // Homens
  'Roberto Cavalcante Silva',
  'João Paulo Mendonça',
  'Carlos Alberto Nunes',
  'Fernando Costa Junior',
  'Marcos Roberto Souza',
  'Paulo Henrique Almeida',
  'Rafael Augusto Lima',
  'Antonio Jose Barbosa',
  'Eduardo Santos Filho',
  'Luiz Carlos Monteiro',
  'Andre Ricardo Moreira',
  'Ricardo Jose Teixeira',
  'Pedro Henrique Correia',
  'Bruno Leonardo Rocha',
  'Gustavo Henrique Lima',
  // Mulheres
  'Maria Helena Rodrigues',
  'Ana Cristina Ferreira',
  'Patricia Lima Santos',
  'Juliana Alves Pereira',
  'Beatriz Miranda Costa',
  'Luciana Santos Oliveira',
  'Claudia Regina Martins',
  'Daniela Campos Rocha',
  'Cristiane Azevedo Lima',
  'Vanessa Costa Ribeiro',
  'Fernanda Silva Dias',
  'Aline Cristina Gomes',
  'Mariana Alves Silveira',
  'Tatiana Santos Medeiros',
  'Isabella Costa Machado'
];

let politicianNameIndex = 0;

export function generatePolitician(): Politician {
  const now = new Date();
  // Contratos iniciados nos últimos 30 dias (sempre relativo à data atual)
  const contractStart = generateDateInCampaignPeriod({ maxDaysAgo: 30 });
  // Data de término de contrato fixa: 10/10/2026
  const contractEnd = new Date(2026, 9, 10); // Mês 9 = outubro (0-indexed)

  // Use Brazilian names in sequence, cycling through the list
  const name = BRAZILIAN_POLITICIANS[politicianNameIndex % BRAZILIAN_POLITICIANS.length];
  politicianNameIndex++;

  // Determinar gênero baseado no nome
  const femaleNames = ['Maria', 'Ana', 'Patricia', 'Juliana', 'Beatriz', 'Luciana', 'Claudia', 'Daniela', 'Cristiane', 'Vanessa', 'Fernanda', 'Aline', 'Mariana', 'Tatiana', 'Isabella'];
  const isFemale = femaleNames.some(fn => name.includes(fn));

  // Determinar se é jovem baseado em nomes comuns para jovens
  const youngNames = ['Pedro Henrique', 'Bruno Leonardo', 'Gustavo Henrique'];
  const isYoung = youngNames.some(yn => name.includes(yn));

  // Gerar URL de foto realista
  let avatarUrl: string;

  // Usar um seed consistente baseado no índice para evitar fotos duplicadas
  const avatarSeed = politicianNameIndex;

  // Determinar idade apropriada para políticos
  let minAge: number;
  let maxAge: number;

  if (isYoung) {
    minAge = 25;
    maxAge = 35;
  } else {
    minAge = 35;
    maxAge = 65;
  }

  // Lista de URLs de fotos pré-selecionadas para garantir consistência
  // Usando uma combinação de serviços para fotos realistas
  // Fotos de homens adultos profissionais (idades 35-65)
  const malePhotos = [
    'https://randomuser.me/api/portraits/men/32.jpg',
    'https://randomuser.me/api/portraits/men/45.jpg',
    'https://randomuser.me/api/portraits/men/67.jpg',
    'https://randomuser.me/api/portraits/men/86.jpg',
    'https://randomuser.me/api/portraits/men/56.jpg',
    'https://randomuser.me/api/portraits/men/78.jpg',
    'https://randomuser.me/api/portraits/men/41.jpg',
    'https://randomuser.me/api/portraits/men/89.jpg',
    'https://randomuser.me/api/portraits/men/34.jpg',
    'https://randomuser.me/api/portraits/men/91.jpg',
    'https://randomuser.me/api/portraits/men/64.jpg',
    'https://randomuser.me/api/portraits/men/76.jpg',
    'https://randomuser.me/api/portraits/men/43.jpg',
    'https://randomuser.me/api/portraits/men/83.jpg',
    'https://randomuser.me/api/portraits/men/52.jpg'
  ];

  // Fotos de mulheres adultas profissionais (idades 35-65)
  const femalePhotos = [
    'https://randomuser.me/api/portraits/women/44.jpg',
    'https://randomuser.me/api/portraits/women/65.jpg',
    'https://randomuser.me/api/portraits/women/68.jpg',
    'https://randomuser.me/api/portraits/women/75.jpg',
    'https://randomuser.me/api/portraits/women/58.jpg',
    'https://randomuser.me/api/portraits/women/72.jpg',
    'https://randomuser.me/api/portraits/women/89.jpg',
    'https://randomuser.me/api/portraits/women/79.jpg',
    'https://randomuser.me/api/portraits/women/67.jpg',
    'https://randomuser.me/api/portraits/women/90.jpg',
    'https://randomuser.me/api/portraits/women/85.jpg',
    'https://randomuser.me/api/portraits/women/63.jpg',
    'https://randomuser.me/api/portraits/women/74.jpg',
    'https://randomuser.me/api/portraits/women/81.jpg',
    'https://randomuser.me/api/portraits/women/88.jpg'
  ];

  // Selecionar foto baseada no gênero e índice
  if (isFemale) {
    avatarUrl = femalePhotos[avatarSeed % femalePhotos.length];
  } else {
    avatarUrl = malePhotos[avatarSeed % malePhotos.length];
  }

  // Para jovens políticos, usar fotos de adultos jovens (25-35 anos)
  if (isYoung) {
    const youngMalePhotos = [
      'https://randomuser.me/api/portraits/men/36.jpg',
      'https://randomuser.me/api/portraits/men/29.jpg',
      'https://randomuser.me/api/portraits/men/31.jpg'
    ];
    const youngFemalePhotos = [
      'https://randomuser.me/api/portraits/women/27.jpg',
      'https://randomuser.me/api/portraits/women/35.jpg',
      'https://randomuser.me/api/portraits/women/42.jpg'
    ];

    if (isFemale) {
      avatarUrl = youngFemalePhotos[avatarSeed % youngFemalePhotos.length];
    } else {
      avatarUrl = youngMalePhotos[avatarSeed % youngMalePhotos.length];
    }
  }

  // Gerar email baseado no nome do político
  const nameParts = name.toLowerCase().split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts[nameParts.length - 1];
  const middleName = nameParts.length > 2 ? nameParts[1] : '';

  // Todos os emails agora são @gmail.com
  const emailFormats = [
    `${firstName}.${lastName}@gmail.com`,
    `${firstName}${lastName}@gmail.com`,
    `${firstName}.${middleName ? middleName[0] + '.' : ''}${lastName}@gmail.com`,
    `${lastName}.${firstName}@gmail.com`,
    `${firstName}${lastName}${faker.number.int({ min: 1, max: 99 })}@gmail.com`
  ];

  const email = faker.helpers.arrayElement(emailFormats)
    .replace(/\s+/g, '')
    .replace(/\.+/g, '.')
    .replace(/^\./, '')
    .replace(/\.$/, '');

  // DDDs brasileiros (excluindo 62 que é Goiânia)
  const brazilianDDDs = [
    '11', '12', '13', '14', '15', '16', '17', '18', '19', // SP
    '21', '22', '24', // RJ
    '27', '28', // ES
    '31', '32', '33', '34', '35', '37', '38', // MG
    '41', '42', '43', '44', '45', '46', // PR
    '47', '48', '49', // SC
    '51', '53', '54', '55', // RS
    '61', '63', '64', '65', '66', '67', '68', '69', // Centro-Oeste (menos 62)
    '71', '73', '74', '75', '77', // BA
    '79', // SE
    '81', '87', // PE
    '82', // AL
    '83', // PB
    '84', // RN
    '85', '88', // CE
    '86', '89', // PI
    '91', '93', '94', // PA
    '92', '97', // AM
    '95', // RR
    '96', // AP
    '98', '99' // MA
  ];

  const ddd = faker.helpers.arrayElement(brazilianDDDs);
  const phoneNumber = `(${ddd}) ${faker.number.int({ min: 90000, max: 99999 })}-${faker.number.int({ min: 1000, max: 9999 })}`;

  return {
    id: faker.string.uuid(),
    name: name,
    party: faker.helpers.arrayElement(PARTIES),
    position: faker.helpers.arrayElement(POSITIONS),
    avatarUrl: avatarUrl,
    email: email,
    phone: phoneNumber,

    perceptionScore: faker.number.int({ min: 40, max: 90 }),
    scoreTrend: faker.number.float({ min: -15, max: 15, multipleOf: 0.1 }),
    lastAnalysisDate: generateDateInCampaignPeriod({ maxDaysAgo: 7 }), // Sempre nos últimos 7 dias

    status: 'active', // Todos políticos com status ativo
    contractedPlan: faker.helpers.arrayElement(['basic', 'campanha_monitoramento_ativo', 'enterprise']) as 'basic' | 'campanha_monitoramento_ativo' | 'enterprise',
    contractStartDate: contractStart,
    contractEndDate: contractEnd,
    accountManagerId: faker.string.uuid(),

    createdAt: contractStart,
    updatedAt: now
  };
}

export function generateSentimentAnalysis(): SentimentAnalysis {
  const positive = faker.number.int({ min: 20, max: 60 });
  const negative = faker.number.int({ min: 10, max: 40 });
  const neutral = 100 - positive - negative;

  return {
    positive,
    negative,
    neutral,
    confidence: faker.number.float({ min: 0.7, max: 0.95, multipleOf: 0.01 }),
    sampleSize: faker.number.int({ min: 500, max: 5000 }),
    date: generateDateInCampaignPeriod({ daysOffset: 1 }) // Sempre 1 dia atrás
  };
}

// Gerador de narrativas específicas por político
export function generateEmergingNarrativesForPolitician(politicianId: string, count: number = 3): EmergingNarrative[] {
  // Pool expandido de narrativas com diferentes temas
  const narrativePool = [
    // Economia e Desenvolvimento
    'Associação com agronegócio cresce nas redes',
    'Defesa de incentivos fiscais para indústria local',
    'Propostas para redução de impostos ganham tração',
    'Críticas sobre modelo econômico atual',
    'Apoio ao empreendedorismo local em alta',
    'Debate sobre política de juros repercute',

    // Social e Políticas Públicas
    'Críticas sobre gastos públicos aumentam',
    'Apoio a projetos sociais ganha destaque',
    'Propostas para moradia popular em discussão',
    'Defesa de políticas de inclusão social',
    'Debate sobre distribuição de renda',

    // Transparência e Governança
    'Questionamentos sobre transparência',
    'Prestação de contas ganha visibilidade positiva',
    'Denúncias de irregularidades em contratos',
    'Compromisso com governo aberto destacado',

    // Juventude e Educação
    'Crescimento entre jovens eleitores',
    'Propostas para reforma educacional em pauta',
    'Apoio a programas de bolsas estudantis',
    'Críticas ao sistema educacional atual',

    // Votações e Posicionamentos
    'Polêmica sobre votação recente',
    'Posicionamento sobre lei ambiental repercute',
    'Voto contrário a projeto popular gera críticas',
    'Liderança em aprovação de projeto importante',

    // Comunicação e Mídia
    'Declarações sobre economia repercutem',
    'Entrevista polêmica viraliza nas redes',
    'Participação em debate gera repercussão',
    'Presença em eventos comunitários destacada',

    // Saúde e Infraestrutura
    'Propostas para reforma da saúde em debate',
    'Críticas à gestão hospitalar atual',
    'Defesa de investimentos em infraestrutura',
    'Projeto de saneamento básico em destaque',

    // Segurança
    'Posicionamento sobre segurança pública divide opiniões',
    'Propostas de reforma policial em discussão',
    'Críticas à política de segurança atual'
  ];

  // Usar o ID do político como seed para garantir consistência mas variação
  const politicianSeed = politicianId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  faker.seed(politicianSeed);

  // Selecionar narrativas únicas para este político
  const selectedNarratives = faker.helpers.arrayElements(narrativePool, count);

  return selectedNarratives.map(narrative => ({
    id: faker.string.uuid(),
    narrative,
    sentiment: faker.helpers.arrayElement(['positive', 'negative', 'mixed']) as 'positive' | 'negative' | 'mixed',
    velocity: faker.helpers.arrayElement(['high', 'medium', 'low']) as 'high' | 'medium' | 'low',
    confidence: faker.number.float({ min: 0.6, max: 0.95, multipleOf: 0.01 }),
    impactScore: faker.number.int({ min: 30, max: 95 }),
    mentionCount: faker.number.int({ min: 50, max: 5000 }),
    growthRate: faker.number.float({ min: -20, max: 150, multipleOf: 0.1 }),
    keywords: faker.helpers.arrayElements(
      ['reforma', 'economia', 'educação', 'saúde', 'segurança', 'corrupção', 'desenvolvimento', 'emprego', 'transparência', 'infraestrutura', 'social', 'ambiental'],
      faker.number.int({ min: 2, max: 5 })
    ),
    firstDetected: generateDateInCampaignPeriod({ maxDaysAgo: 14 }),
    status: faker.helpers.arrayElement(['emerging', 'trending', 'declining', 'resolved']) as 'emerging' | 'trending' | 'declining' | 'resolved',
    politicianId // Adicionar referência ao político
  }));
}

// Manter função original para compatibilidade
export function generateEmergingNarratives(count: number = 3): EmergingNarrative[] {
  return generateEmergingNarrativesForPolitician(faker.string.uuid(), count);
}

export function generateCampaign(politicianId: string): WhatsAppCampaign {
  const total = faker.number.int({ min: 10000, max: 100000 });
  const sent = faker.number.int({ min: total * 0.5, max: total });
  const delivered = faker.number.int({ min: sent * 0.85, max: sent });
  // Taxa de resposta aumentada para 30-75%
  const responses = faker.number.int({ min: delivered * 0.30, max: delivered * 0.75 });

  // Gerar data de criação primeiro (20-30 dias atrás)
  const now = new Date();
  const daysAgoCreated = faker.number.int({ min: 20, max: 30 });
  const createdAt = new Date(now.getTime() - (daysAgoCreated * 24 * 60 * 60 * 1000));

  // Data de início: entre a criação e agora (sempre DEPOIS da criação)
  const daysAfterCreation = faker.number.int({ min: 1, max: Math.min(5, daysAgoCreated - 1) });
  const startedAt = new Date(createdAt.getTime() + (daysAfterCreation * 24 * 60 * 60 * 1000));

  // Data de conclusão: alguns dias DEPOIS do início
  const daysToComplete = faker.number.int({ min: 3, max: 10 });
  const completedAt = new Date(startedAt.getTime() + (daysToComplete * 24 * 60 * 60 * 1000));

  // Scheduled date: antes do início
  const scheduledDate = new Date(startedAt.getTime() - (24 * 60 * 60 * 1000)); // 1 dia antes do início

  return {
    id: faker.string.uuid(),
    politicianId,
    name: faker.helpers.arrayElement([
      'Pesquisa de Satisfação Regional/Municipal',
      'Consulta sobre Prioridades',
      'Avaliação de Gestão',
      'Pesquisa Temática - Saúde',
      'Pesquisa Temática - Segurança',
      'Consulta Eleitoral'
    ]),
    messageTemplate: 'Olá {nome}, gostaríamos de saber sua opinião sobre {tema}. Sua resposta é muito importante!',

    totalMessages: total,
    sentMessages: sent,
    deliveredMessages: delivered,
    responses,

    deliveryRate: (delivered / sent) * 100,
    responseRate: (responses / delivered) * 100,

    positiveResponseRate: faker.number.int({ min: 30, max: 70 }),
    negativeResponseRate: faker.number.int({ min: 10, max: 40 }),
    engagementScore: faker.number.int({ min: 40, max: 90 }),

    status: faker.helpers.arrayElement(['draft', 'scheduled', 'active', 'paused', 'completed']) as 'draft' | 'scheduled' | 'active' | 'paused' | 'completed',
    scheduledDate,
    startedAt,
    completedAt,

    createdAt,
    updatedAt: now
  };
}

// Helper function to generate dates dynamically based on current date
// Esta função SEMPRE retorna datas relativas à data atual do sistema
function generateDateInCampaignPeriod(options?: {
  past?: boolean,
  future?: boolean,
  daysOffset?: number, // Número FIXO de dias de offset (sempre o mesmo offset relativo)
  maxDaysAgo?: number, // Para gerar offset aleatório dentro de um intervalo
  monthRange?: { start: number, end: number }
}): Date {
  const now = new Date();

  // Se especificado 'daysOffset', sempre retornar a data com esse offset fixo
  if (options?.daysOffset !== undefined) {
    const offsetMs = options.daysOffset * 24 * 60 * 60 * 1000;

    if (options?.future) {
      // Data futura com offset fixo (ex: sempre 30 dias no futuro)
      return new Date(now.getTime() + offsetMs);
    } else {
      // Data passada com offset fixo (ex: sempre 1 dia atrás)
      return new Date(now.getTime() - offsetMs);
    }
  }

  // Se especificado 'maxDaysAgo', gerar um offset aleatório que será usado consistentemente
  if (options?.maxDaysAgo) {
    const daysAgo = faker.number.int({ min: 0, max: options.maxDaysAgo });
    const offsetMs = daysAgo * 24 * 60 * 60 * 1000;

    if (options?.future) {
      return new Date(now.getTime() + offsetMs);
    } else {
      return new Date(now.getTime() - offsetMs);
    }
  }

  // Se especificado 'monthRange', gerar offset em meses
  if (options?.monthRange) {
    const { start, end } = options.monthRange;
    const monthsOffset = faker.number.int({ min: start, max: end });

    if (options?.future) {
      return new Date(now.getFullYear(), now.getMonth() + monthsOffset, now.getDate());
    } else {
      return new Date(now.getFullYear(), now.getMonth() - monthsOffset, now.getDate());
    }
  }

  // Caso padrão: gerar data com offset aleatório nos últimos 30 dias
  const daysAgo = faker.number.int({ min: 0, max: 30 });
  return new Date(now.getTime() - (daysAgo * 24 * 60 * 60 * 1000));
}

// Brazilian social media authors
const BRAZILIAN_AUTHORS = [
  'Lucas Almeida', 'Carla Mendonça', 'Pedro Henrique Costa', 'Camila Rocha',
  'Gabriel Santos', 'Amanda Ferreira', 'Thiago Oliveira', 'Larissa Dias',
  'Bruno Cardoso', 'Isabela Martins', 'Diego Pereira', 'Natália Souza',
  'Felipe Rodrigues', 'Renata Lima', 'Marcelo Barbosa', 'Bianca Silva',
  'Rodrigo Nascimento', 'Priscila Andrade', 'Leonardo Gomes', 'Débora Castro'
];

export function generateSocialMention(politicianId: string): SocialMediaMention {
  const authorName = faker.helpers.arrayElement(BRAZILIAN_AUTHORS);
  const username = authorName.toLowerCase().replace(' ', '_') + faker.number.int({ min: 1, max: 999 });

  return {
    id: faker.string.uuid(),
    politicianId,
    platform: faker.helpers.arrayElement(['twitter', 'facebook', 'instagram', 'news']) as 'twitter' | 'facebook' | 'instagram' | 'news',
    sourceUrl: faker.internet.url(),
    authorHandle: '@' + username,
    authorName: authorName,
    content: faker.lorem.paragraph(),

    likes: faker.number.int({ min: 0, max: 10000 }),
    shares: faker.number.int({ min: 0, max: 1000 }),
    comments: faker.number.int({ min: 0, max: 500 }),
    reach: faker.number.int({ min: 100, max: 50000 }),

    sentiment: faker.helpers.arrayElement(['positive', 'negative', 'neutral']) as 'positive' | 'negative' | 'neutral',
    sentimentScore: faker.number.float({ min: -1, max: 1, multipleOf: 0.01 }),
    topics: faker.helpers.arrayElements(
      ['política', 'economia', 'saúde', 'educação', 'segurança', 'infraestrutura'],
      faker.number.int({ min: 1, max: 3 })
    ),
    isInfluencer: faker.datatype.boolean({ probability: 0.1 }),
    influencerScore: faker.number.int({ min: 60, max: 100 }),

    publishedAt: generateDateInCampaignPeriod({ maxDaysAgo: 30 }), // Menções nos últimos 30 dias
    capturedAt: generateDateInCampaignPeriod({ maxDaysAgo: 30 })
  };
}

// Brazilian CRM prospect names
const BRAZILIAN_PROSPECTS = [
  'Alexandre Monteiro', 'Simone Barbosa', 'Rodrigo Ferreira', 'Paula Regina Santos',
  'Márcio Albuquerque', 'Sandra Cristina Lima', 'Carlos Alberto Nunes', 'Adriana Machado',
  'João Batista Silva', 'Mônica Aparecida Costa', 'Francisco Xavier Pinto', 'Elaine Cristina Dias'
];

let prospectNameIndex = 0;

export function generateCRMCard(): CRMPipelineCard {
  const stages: PipelineStage[] = [
    'candidato', 'qualification', 'proposal_sent', 'negotiation',
    'document_collection', 'implementation', 'active_client', 'lost'
  ];

  const prospectName = BRAZILIAN_PROSPECTS[prospectNameIndex % BRAZILIAN_PROSPECTS.length];
  prospectNameIndex++;

  // Gerar email baseado no nome do candidato
  const nameParts = prospectName.toLowerCase().split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts[nameParts.length - 1];
  const middleName = nameParts.length > 2 ? nameParts[1] : '';

  // Diferentes formatos de email para candidatos
  const emailFormats = [
    `${firstName}.${lastName}@gmail.com`,
    `${firstName}${lastName}@hotmail.com`,
    `${firstName}.${middleName ? middleName[0] + '.' : ''}${lastName}@outlook.com`,
    `${firstName}_${lastName}@yahoo.com.br`,
    `${lastName}.${firstName}@gmail.com`
  ];

  const candidateEmail = faker.helpers.arrayElement(emailFormats)
    .replace(/\s+/g, '')
    .replace(/\.+/g, '.')
    .replace(/^\./, '')
    .replace(/\.$/, '');

  return {
    id: faker.string.uuid(),
    prospectName: prospectName,
    position: faker.helpers.arrayElement(POSITIONS),
    party: faker.helpers.arrayElement(PARTIES),

    contactInfo: {
      email: candidateEmail,
      phone: faker.phone.number({ style: 'national' }),
      preferredContact: faker.helpers.arrayElement(['email', 'phone']) as 'email' | 'phone'
    },

    stage: faker.helpers.arrayElement(stages),
    assignedTo: faker.string.uuid(),
    proposalValue: faker.number.int({ min: 5000, max: 100000 }),
    notes: faker.lorem.sentence(),
    nextAction: faker.helpers.arrayElement(['Enviar proposta', 'Agendar reunião', 'Enviar contrato', 'Follow-up']),
    nextActionDate: generateDateInCampaignPeriod({ maxDaysAgo: 7, future: true }), // Próxima ação nos próximos 7 dias

    probability: faker.number.int({ min: 10, max: 90 }),
    estimatedCloseDate: generateDateInCampaignPeriod({ maxDaysAgo: 30, future: true }), // Sempre 0-30 dias no futuro

    createdAt: generateDateInCampaignPeriod({ maxDaysAgo: 30 }), // Criados nos últimos 30 dias
    updatedAt: generateDateInCampaignPeriod({ daysOffset: 1 }) // Sempre 1 dia atrás
  };
}

// Notificações específicas de redes sociais
export function generateSocialMediaNotification(): Notification {
  const socialAlerts = [
    // ALERTAS NEGATIVOS/CRÍTICOS
    {
      title: '🚨 FAKE NEWS detectada no Instagram',
      description: 'Post viral com informações falsas sobre o candidato está circulando com mais de 10K compartilhamentos. Imagem manipulada alegando desvio de verbas.',
      type: 'alert' as const,
      priority: 'critical' as const,
      category: 'emerging_crisis' as NotificationCategory,
      platform: 'instagram',
      recommendation: 'Acionar equipe jurídica imediatamente e preparar nota de esclarecimento.',
      impactScore: faker.number.int({ min: 85, max: 100 })
    },
    {
      title: '📰 Matéria negativa no jornal O Estado',
      description: 'Reportagem investigativa questiona contratos de campanha. Matéria já foi compartilhada 5K vezes no Twitter.',
      type: 'alert' as const,
      priority: 'high' as const,
      category: 'emerging_crisis' as NotificationCategory,
      platform: 'twitter',
      recommendation: 'Preparar resposta oficial e agendar entrevista para esclarecimentos.',
      impactScore: faker.number.int({ min: 70, max: 90 })
    },
    {
      title: '⚠️ Influencer atacando candidato no Twitter',
      description: '@jornalista_independente (850K seguidores) publicou thread crítica sobre promessas não cumpridas. Já tem 15K RTs.',
      type: 'alert' as const,
      priority: 'high' as const,
      category: 'emerging_crisis' as NotificationCategory,
      platform: 'twitter',
      recommendation: 'Monitorar comentários e preparar thread de resposta com dados concretos.',
      impactScore: faker.number.int({ min: 75, max: 95 })
    },
    {
      title: '🔴 Vídeo viral difamando candidato no TikTok',
      description: 'Vídeo editado de forma maliciosa já alcançou 500K visualizações em 6 horas.',
      type: 'alert' as const,
      priority: 'critical' as const,
      category: 'emerging_crisis' as NotificationCategory,
      platform: 'tiktok',
      recommendation: 'Solicitar remoção do conteúdo e publicar vídeo com versão completa do discurso.',
      impactScore: faker.number.int({ min: 80, max: 100 })
    },
    {
      title: '💬 Comentários negativos em massa no Facebook',
      description: 'Última publicação recebeu mais de 3K comentários negativos em 2 horas. Possível ataque coordenado.',
      type: 'alert' as const,
      priority: 'high' as const,
      category: 'sentiment_change' as NotificationCategory,
      platform: 'facebook',
      recommendation: 'Ativar moderação reforçada e responder principais críticas com fatos.',
      impactScore: faker.number.int({ min: 65, max: 85 })
    },

    // ALERTAS POSITIVOS
    {
      title: '✅ Público defendendo candidato no Instagram',
      description: 'Mais de 5K seguidores estão rebatendo fake news espontaneamente. Hashtag #VerdadeSobre[Candidato] em alta.',
      type: 'informative' as const,
      priority: 'medium' as const,
      category: 'opportunity_detected' as NotificationCategory,
      platform: 'instagram',
      recommendation: 'Agradecer apoiadores e fornecer mais informações para fortalecer defesa.',
      impactScore: faker.number.int({ min: 60, max: 80 })
    },
    {
      title: '🎯 Post viral positivo no Twitter',
      description: 'Thread sobre realizações do candidato alcançou 20K RTs. Influencers importantes compartilhando.',
      type: 'informative' as const,
      priority: 'medium' as const,
      category: 'opportunity_detected' as NotificationCategory,
      platform: 'twitter',
      recommendation: 'Impulsionar conteúdo e criar campanha baseada nesta narrativa positiva.',
      impactScore: faker.number.int({ min: 70, max: 90 })
    },
    {
      title: '💚 Apoio massivo em live do Instagram',
      description: 'Live com 15K espectadores simultâneos. 95% de comentários positivos. Maior engajamento do mês.',
      type: 'informative' as const,
      priority: 'low' as const,
      category: 'sentiment_change' as NotificationCategory,
      platform: 'instagram',
      recommendation: 'Criar cortes da live para outras plataformas e agendar mais transmissões.',
      impactScore: faker.number.int({ min: 50, max: 70 })
    },
    {
      title: '📈 Crescimento orgânico no TikTok',
      description: 'Ganho de 10K novos seguidores em 24h após vídeo sobre educação viralizar entre jovens.',
      type: 'informative' as const,
      priority: 'low' as const,
      category: 'opportunity_detected' as NotificationCategory,
      platform: 'tiktok',
      recommendation: 'Produzir mais conteúdo similar e engajar com novos seguidores.',
      impactScore: faker.number.int({ min: 45, max: 65 })
    },
    {
      title: '🛡️ Jornalistas defendendo candidato',
      description: 'Principais jornalistas políticos rebateram fake news no Twitter. Alcance estimado: 2M pessoas.',
      type: 'informative' as const,
      priority: 'medium' as const,
      category: 'opportunity_detected' as NotificationCategory,
      platform: 'twitter',
      recommendation: 'Agradecer publicamente e fortalecer relacionamento com imprensa.',
      impactScore: faker.number.int({ min: 65, max: 85 })
    },
    {
      title: '⭐ Celebridade apoia candidato',
      description: 'Artista famoso publicou apoio no Instagram Stories. Visualizações: 800K em 3 horas.',
      type: 'informative' as const,
      priority: 'medium' as const,
      category: 'opportunity_detected' as NotificationCategory,
      platform: 'instagram',
      recommendation: 'Repostar com agradecimento e explorar possível parceria de campanha.',
      impactScore: faker.number.int({ min: 70, max: 90 })
    },
    {
      title: '🔥 Hashtag positiva em trending',
      description: '#[Candidato]FazADiferença está em 2º lugar nos trending topics do Twitter Brasil.',
      type: 'informative' as const,
      priority: 'medium' as const,
      category: 'opportunity_detected' as NotificationCategory,
      platform: 'twitter',
      recommendation: 'Engajar com a hashtag e criar conteúdo adicional para manter momentum.',
      impactScore: faker.number.int({ min: 60, max: 80 })
    }
  ];

  const alert = faker.helpers.arrayElement(socialAlerts);

  return {
    id: faker.string.uuid(),
    type: alert.type,
    priority: alert.priority,
    category: alert.category,
    title: alert.title,
    description: alert.description,
    recommendation: alert.recommendation,
    actionUrl: '/monitoring/social',
    politicianId: faker.string.uuid(),
    campaignId: faker.string.uuid(),
    triggerEvent: `Monitoramento de ${alert.platform}`,
    confidence: faker.number.float({ min: 0.85, max: 0.99, multipleOf: 0.01 }),
    impactScore: alert.impactScore,
    assignedTo: faker.string.uuid(),
    status: faker.helpers.weightedArrayElement([
      { value: 'unread', weight: 7 },
      { value: 'read', weight: 2 },
      { value: 'resolved', weight: 1 },
      { value: 'dismissed', weight: 1 }
    ]) as 'unread' | 'read' | 'resolved' | 'dismissed',
    createdAt: generateDateInCampaignPeriod({ maxDaysAgo: 30 }), // Notificações nos últimos 30 dias
    readAt: generateDateInCampaignPeriod({ maxDaysAgo: 15 }), // Lidas nos últimos 15 dias
    resolvedAt: undefined
  };
}

export function generateNotification(): Notification {
  // 70% chance de gerar notificação de rede social, 30% notificação padrão
  if (faker.datatype.boolean({ probability: 0.7 })) {
    return generateSocialMediaNotification();
  }

  const categories = [
    'sentiment_change', 'campaign_performance', 'contract_expiration',
    'emerging_crisis', 'opportunity_detected', 'system_issue'
  ];

  return {
    id: faker.string.uuid(),
    type: faker.helpers.arrayElement(['alert', 'informative', 'task']) as 'alert' | 'informative' | 'task',
    priority: faker.helpers.arrayElement(['critical', 'high', 'medium', 'low']) as 'critical' | 'high' | 'medium' | 'low',
    category: faker.helpers.arrayElement(categories) as NotificationCategory,

    title: faker.helpers.arrayElement([
      'Queda abrupta no score de percepção',
      'Taxa de resposta abaixo do esperado',
      'Novo trending topic detectado',
      'Contrato expira em 30 dias',
      'Campanha finalizada com sucesso'
    ]),
    description: faker.lorem.paragraph(),
    recommendation: faker.lorem.sentence(),
    actionUrl: '/politicians/' + faker.string.uuid(),

    politicianId: faker.string.uuid(),
    campaignId: faker.string.uuid(),
    triggerEvent: 'Análise automática de sentimento',

    confidence: faker.number.float({ min: 0.7, max: 0.99, multipleOf: 0.01 }),
    impactScore: faker.number.int({ min: 30, max: 100 }),

    assignedTo: faker.string.uuid(),
    status: faker.helpers.weightedArrayElement([
      { value: 'unread', weight: 5 },
      { value: 'read', weight: 3 },
      { value: 'resolved', weight: 1 },
      { value: 'dismissed', weight: 1 }
    ]) as 'unread' | 'read' | 'resolved' | 'dismissed',

    createdAt: generateDateInCampaignPeriod({ maxDaysAgo: 30 }), // Criadas nos últimos 30 dias
    readAt: generateDateInCampaignPeriod({ maxDaysAgo: 15 }), // Lidas nos últimos 15 dias
    resolvedAt: generateDateInCampaignPeriod({ maxDaysAgo: 7 }) // Resolvidas nos últimos 7 dias
  };
}

export function generateActivity(politicianName: string): Activity {
  return {
    id: faker.string.uuid(),
    type: faker.helpers.arrayElement(['sentiment_analysis', 'campaign_started', 'report_generated', 'alert']) as 'sentiment_analysis' | 'campaign_started' | 'report_generated' | 'alert',
    politicianName,
    description: faker.helpers.arrayElement([
      'Nova análise de sentimento concluída',
      'Campanha de WhatsApp iniciada',
      'Relatório mensal gerado',
      'Alerta de menções negativas',
      'Score de percepção atualizado'
    ]),
    timestamp: generateDateInCampaignPeriod({ maxDaysAgo: 30 }) // Atividades nos últimos 30 dias
  };
}

// Generate collections
export function generatePoliticians(count: number = 25): Politician[] {
  return Array.from({ length: count }, generatePolitician);
}

export function generateCRMCards(count: number = 15): CRMPipelineCard[] {
  return Array.from({ length: count }, generateCRMCard);
}

export function generateNotifications(count: number = 10): Notification[] {
  return Array.from({ length: count }, generateNotification);
}

// Generate Dashboard KPIs
export function generateDashboardKPIs(politicians: Politician[]): DashboardKPIs {
  const activeClients = politicians.filter(p => p.status === 'active').length;
  const activities = politicians.slice(0, 10).map(p => generateActivity(p.name));

  return {
    activeClients,
    ongoingCampaigns: faker.number.int({ min: 8, max: 15 }),
    messagesLast30Days: faker.number.int({ min: 800000, max: 1500000 }),
    averageResponseRate: 35.7, // Taxa de resposta fixa em 35.7%
    sentimentDistribution: generateSentimentAnalysis(),
    recentActivities: activities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
  };
}

// Gerar realizações e projetos para políticos
export function generateAchievementsForPolitician(politicianId: string, count: number = 6): PoliticianAchievement[] {
  const achievements: PoliticianAchievement[] = [];

  const achievementPool = [
    // Projetos de Infraestrutura
    {
      title: 'Reforma da Praça Central',
      description: 'Revitalização completa da praça com nova iluminação LED, bancos, playground infantil e área para exercícios.',
      category: 'obra' as const,
      location: 'Centro',
      tags: ['infraestrutura', 'lazer', 'qualidade de vida']
    },
    {
      title: 'Pavimentação da Rua das Flores',
      description: 'Asfaltamento de 2.5km de via que atendia mais de 5 mil famílias com asfalto de qualidade e drenagem.',
      category: 'obra' as const,
      location: 'Bairro Jardim',
      tags: ['infraestrutura', 'mobilidade']
    },
    {
      title: 'Construção de Centro de Saúde',
      description: 'Nova UBS com 10 consultórios, sala de vacinas, farmácia e atendimento 24h para a comunidade.',
      category: 'projeto' as const,
      location: 'Vila Nova',
      tags: ['saúde', 'atendimento', 'bem-estar']
    },

    // Emendas Parlamentares
    {
      title: 'Emenda para Educação Municipal',
      description: 'R$ 2 milhões destinados para reforma de 15 escolas municipais e compra de equipamentos.',
      category: 'emenda' as const,
      tags: ['educação', 'investimento', 'infraestrutura escolar']
    },
    {
      title: 'Recursos para Hospital Regional',
      description: 'Emenda de R$ 5 milhões para ampliação do hospital com novos leitos de UTI e equipamentos.',
      category: 'emenda' as const,
      tags: ['saúde', 'hospital', 'UTI']
    },
    {
      title: 'Verba para Agricultura Familiar',
      description: 'R$ 800 mil destinados a programas de apoio aos pequenos agricultores da região.',
      category: 'emenda' as const,
      tags: ['agricultura', 'desenvolvimento rural']
    },

    // Lideranças e Iniciativas
    {
      title: 'Programa Jovem Aprendiz',
      description: 'Criação de programa que já inseriu mais de 500 jovens no mercado de trabalho.',
      category: 'iniciativa' as const,
      tags: ['emprego', 'juventude', 'capacitação']
    },
    {
      title: 'Mutirão de Limpeza Comunitária',
      description: 'Organização de mutirões mensais que mobilizaram mais de 2 mil voluntários.',
      category: 'lideranca' as const,
      tags: ['meio ambiente', 'comunidade', 'voluntariado']
    },
    {
      title: 'Conselho Popular de Desenvolvimento',
      description: 'Criação de conselho com participação da comunidade nas decisões municipais.',
      category: 'lideranca' as const,
      tags: ['participação popular', 'democracia', 'transparência']
    },
    {
      title: 'Centro de Referência da Mulher',
      description: 'Implementação de centro de apoio que já atendeu mais de 1.200 mulheres.',
      category: 'projeto' as const,
      tags: ['direitos da mulher', 'assistência social']
    },

    // Mais Projetos
    {
      title: 'Iluminação LED em 50 Ruas',
      description: 'Substituição de iluminação pública por LED, gerando economia de 40% na conta de energia.',
      category: 'obra' as const,
      tags: ['iluminação', 'economia', 'segurança']
    },
    {
      title: 'Programa de Capacitação Digital',
      description: 'Cursos gratuitos de informática que formaram 800 pessoas em 2 anos.',
      category: 'iniciativa' as const,
      tags: ['educação', 'tecnologia', 'capacitação']
    },
    {
      title: 'Quadra Poliesportiva Coberta',
      description: 'Construção de quadra coberta no Bairro Esperança para práticas esportivas.',
      category: 'obra' as const,
      location: 'Bairro Esperança',
      tags: ['esporte', 'lazer', 'juventude']
    },
    {
      title: 'Cesta Básica Solidária',
      description: 'Programa de distribuição mensal de cestas básicas para 300 famílias em situação de vulnerabilidade.',
      category: 'iniciativa' as const,
      tags: ['assistência social', 'combate à fome']
    },
    {
      title: 'Reforma do Mercado Municipal',
      description: 'Modernização completa do mercado com novos boxes e infraestrutura para 80 comerciantes.',
      category: 'obra' as const,
      location: 'Centro',
      tags: ['economia', 'comércio', 'infraestrutura']
    }
  ];

  // Usar ID do político como seed para consistência
  const politicianSeed = politicianId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  faker.seed(politicianSeed);

  const selectedAchievements = faker.helpers.arrayElements(achievementPool, count);

  return selectedAchievements.map((achievement, index) => {
    // Gerar offset fixo baseado no índice para consistência
    const daysOffsetBase = [45, 90, 180, 365, 540, 720]; // Offsets fixos para cada realização
    const daysAgo = daysOffsetBase[index % daysOffsetBase.length];
    const status = daysAgo < 90 ? 'em_andamento' : daysAgo < 365 ? 'concluido' : 'concluido';

    // Calcular data relativa à data atual
    const now = new Date();
    const achievementDate = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);

    return {
      id: faker.string.uuid(),
      politicianId,
      title: achievement.title,
      description: achievement.description,
      category: achievement.category,
      imageUrl: undefined, // Sem imagens
      location: achievement.location,
      budget: achievement.category === 'emenda' ? faker.number.int({ min: 500000, max: 5000000 }) :
              achievement.category === 'obra' ? faker.number.int({ min: 200000, max: 3000000 }) :
              undefined,
      date: achievementDate,
      status,
      beneficiaries: faker.number.int({ min: 500, max: 10000 }),
      tags: achievement.tags
    };
  });
}

// Export all mock data for easy access
export const mockPoliticians = generatePoliticians(25);
export const mockCRMCards = generateCRMCards(15);
export const mockNotifications = generateNotifications(10);
export const mockDashboardKPIs = generateDashboardKPIs(mockPoliticians);