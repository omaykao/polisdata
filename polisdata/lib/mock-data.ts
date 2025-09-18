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
  Activity,
  DashboardKPIs
} from './types';

// Set a consistent seed for reproducibility
faker.seed(123);

// Brazilian political parties
const PARTIES = ['PD', 'PI', 'PL', 'PC', 'PN', 'PS', 'PV', 'PT', 'PSDB', 'MDB'];
const POSITIONS = ['Deputado Federal', 'Senador', 'Governador', 'Prefeito', 'Vereador', 'Deputado Estadual'];

// Brazilian politician names
const BRAZILIAN_POLITICIANS = [
  'Carlos Eduardo Mendes',
  'Ana Paula Oliveira',
  'Roberto Silva Filho',
  'Marina Costa Santos',
  'José Ricardo Almeida',
  'Patrícia Ferreira Lima',
  'Fernando Barbosa',
  'Juliana Rodrigues',
  'Marcos Antônio Souza',
  'Beatriz Cavalcanti',
  'Paulo César Andrade',
  'Luciana Martins',
  'Rafael Gonçalves',
  'Cláudia Regina Pereira',
  'Antônio Carlos Neto',
  'Daniela Fonseca',
  'Eduardo Nascimento',
  'Cristiane Araújo',
  'Luiz Felipe Cardoso',
  'Vanessa Ribeiro',
  'André Luís Moreira',
  'Fernanda Azevedo',
  'Ricardo Teixeira',
  'Aline Cristina Dias',
  'João Pedro Correia',
  'Mariana Silveira',
  'Bruno Henrique Rocha',
  'Tatiana Medeiros',
  'Gustavo Lima Santos',
  'Isabella Machado'
];

let politicianNameIndex = 0;

export function generatePolitician(): Politician {
  const now = new Date();
  const contractStart = faker.date.past({ years: 1 });
  const contractEnd = faker.date.future({ years: 1 });

  // Use Brazilian names in sequence, cycling through the list
  const name = BRAZILIAN_POLITICIANS[politicianNameIndex % BRAZILIAN_POLITICIANS.length];
  politicianNameIndex++;

  return {
    id: faker.string.uuid(),
    name: name,
    party: faker.helpers.arrayElement(PARTIES),
    position: faker.helpers.arrayElement(POSITIONS),
    avatarUrl: faker.image.avatar(),
    email: faker.internet.email(),
    phone: faker.phone.number('+55 11 9####-####'),

    perceptionScore: faker.number.int({ min: 40, max: 90 }),
    scoreTrend: faker.number.float({ min: -15, max: 15, multipleOf: 0.1 }),
    lastAnalysisDate: faker.date.recent({ days: 7 }),

    status: faker.helpers.weightedArrayElement([
      { value: 'active', weight: 8 },
      { value: 'inactive', weight: 1 },
      { value: 'suspended', weight: 1 }
    ]) as 'active' | 'inactive' | 'suspended',
    contractedPlan: faker.helpers.arrayElement(['basic', 'professional', 'enterprise']) as 'basic' | 'professional' | 'enterprise',
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
      'Pesquisa de Satisfação Regional',
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
    'lead', 'qualification', 'proposal_sent', 'negotiation',
    'document_collection', 'implementation', 'active_client', 'lost'
  ];

  const prospectName = BRAZILIAN_PROSPECTS[prospectNameIndex % BRAZILIAN_PROSPECTS.length];
  prospectNameIndex++;

  return {
    id: faker.string.uuid(),
    prospectName: prospectName,
    position: faker.helpers.arrayElement(POSITIONS),
    party: faker.helpers.arrayElement(PARTIES),

    contactInfo: {
      email: faker.internet.email(),
      phone: faker.phone.number('+55 11 9####-####'),
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

export function generateNotification(): Notification {
  const categories = [
    'sentiment_change', 'campaign_performance', 'contract_expiration',
    'emerging_crisis', 'opportunity_detected', 'system_issue'
  ];

  return {
    id: faker.string.uuid(),
    type: faker.helpers.arrayElement(['alert', 'informative', 'task']) as 'alert' | 'informative' | 'task',
    priority: faker.helpers.arrayElement(['critical', 'high', 'medium', 'low']) as 'critical' | 'high' | 'medium' | 'low',
    category: faker.helpers.arrayElement(categories) as string,

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
    ]) as 'new' | 'read' | 'resolved' | 'dismissed',

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