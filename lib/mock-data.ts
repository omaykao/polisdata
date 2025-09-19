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
  DashboardKPIs
} from './types';

// Set a consistent seed for reproducibility
faker.seed(123);

// Brazilian political parties - siglas reais
const PARTIES = ['PT', 'PSDB', 'MDB', 'PP', 'PSD', 'PL', 'PDT', 'PSB', 'PSOL', 'REPUBLICANOS', 'UNIÃO', 'PCdoB', 'PV', 'PSC', 'NOVO', 'PATRIOTA', 'SOLIDARIEDADE', 'PROS', 'PODEMOS', 'CIDADANIA'];
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
  const contractStart = faker.date.past({ years: 1 });
  const contractEnd = faker.date.future({ years: 1 });

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

  // Diferentes formatos de email
  const emailFormats = [
    `${firstName}.${lastName}@gmail.com`,
    `${firstName}${lastName}@hotmail.com`,
    `${firstName}.${middleName ? middleName[0] + '.' : ''}${lastName}@outlook.com`,
    `${firstName}_${lastName}@yahoo.com.br`,
    `${lastName}.${firstName}@gmail.com`,
    `${firstName}${lastName}${faker.number.int({ min: 1, max: 99 })}@gmail.com`
  ];

  const email = faker.helpers.arrayElement(emailFormats)
    .replace(/\s+/g, '')
    .replace(/\.+/g, '.')
    .replace(/^\./, '')
    .replace(/\.$/, '');

  return {
    id: faker.string.uuid(),
    name: name,
    party: faker.helpers.arrayElement(PARTIES),
    position: faker.helpers.arrayElement(POSITIONS),
    avatarUrl: avatarUrl,
    email: email,
    phone: faker.phone.number({ style: 'national' }),

    perceptionScore: faker.number.int({ min: 40, max: 90 }),
    scoreTrend: faker.number.float({ min: -15, max: 15, multipleOf: 0.1 }),
    lastAnalysisDate: faker.date.recent({ days: 7 }),

    status: faker.helpers.weightedArrayElement([
      { value: 'active', weight: 8 },
      { value: 'inactive', weight: 1 },
      { value: 'suspended', weight: 1 }
    ]) as 'active' | 'inactive' | 'suspended',
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
    date: faker.date.recent({ days: 1 })
  };
}

export function generateEmergingNarratives(count: number = 3): EmergingNarrative[] {
  const narratives = [
    'Associação com agronegócio cresce nas redes',
    'Críticas sobre gastos públicos aumentam',
    'Apoio a projetos sociais ganha destaque',
    'Questionamentos sobre transparência',
    'Crescimento entre jovens eleitores',
    'Polêmica sobre votação recente',
    'Declarações sobre economia repercutem',
    'Proposta de lei gera debate'
  ];

  return faker.helpers.arrayElements(narratives, count).map(narrative => ({
    id: faker.string.uuid(),
    narrative,
    sentiment: faker.helpers.arrayElement(['positive', 'negative', 'mixed']) as 'positive' | 'negative' | 'mixed',
    velocity: faker.helpers.arrayElement(['high', 'medium', 'low']) as 'high' | 'medium' | 'low',
    confidence: faker.number.float({ min: 0.6, max: 0.95, multipleOf: 0.01 }),
    impactScore: faker.number.int({ min: 30, max: 95 }),
    mentionCount: faker.number.int({ min: 50, max: 5000 }),
    growthRate: faker.number.float({ min: -20, max: 150, multipleOf: 0.1 }),
    keywords: faker.helpers.arrayElements(
      ['reforma', 'economia', 'educação', 'saúde', 'segurança', 'corrupção', 'desenvolvimento', 'emprego'],
      faker.number.int({ min: 2, max: 5 })
    ),
    firstDetected: faker.date.recent({ days: 14 }),
    status: faker.helpers.arrayElement(['emerging', 'trending', 'declining', 'resolved']) as 'emerging' | 'trending' | 'declining' | 'resolved'
  }));
}

export function generateCampaign(politicianId: string): WhatsAppCampaign {
  const total = faker.number.int({ min: 10000, max: 100000 });
  const sent = faker.number.int({ min: total * 0.5, max: total });
  const delivered = faker.number.int({ min: sent * 0.85, max: sent });
  const responses = faker.number.int({ min: delivered * 0.05, max: delivered * 0.25 });

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
    scheduledDate: faker.date.future({ years: 0.1 }),
    startedAt: faker.date.recent({ days: 7 }),
    completedAt: faker.date.recent({ days: 1 }),

    createdAt: faker.date.past({ years: 0.5 }),
    updatedAt: new Date()
  };
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

    publishedAt: faker.date.recent({ days: 1 }),
    capturedAt: new Date()
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
    nextActionDate: faker.date.future({ years: 0.1 }),

    probability: faker.number.int({ min: 10, max: 90 }),
    estimatedCloseDate: faker.date.future({ years: 0.2 }),

    createdAt: faker.date.past({ years: 0.3 }),
    updatedAt: new Date()
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
    createdAt: faker.date.recent({ days: 2 }),
    readAt: faker.date.recent({ days: 1 }),
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

    createdAt: faker.date.recent({ days: 7 }),
    readAt: faker.date.recent({ days: 5 }),
    resolvedAt: faker.date.recent({ days: 3 })
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
    timestamp: faker.date.recent({ days: 0.1 })
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
    averageResponseRate: faker.number.float({ min: 15, max: 25, multipleOf: 0.1 }),
    sentimentDistribution: generateSentimentAnalysis(),
    recentActivities: activities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
  };
}

// Export all mock data for easy access
export const mockPoliticians = generatePoliticians(25);
export const mockCRMCards = generateCRMCards(15);
export const mockNotifications = generateNotifications(10);
export const mockDashboardKPIs = generateDashboardKPIs(mockPoliticians);