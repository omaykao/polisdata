// Core TypeScript types for PolisData Platform

export interface Politician {
  id: string;
  name: string;
  party: string;
  position: string;
  avatarUrl?: string;
  email: string;
  phone: string;

  // AI-Generated Metrics
  perceptionScore: number; // 0-100
  scoreTrend: number; // Percentage change
  lastAnalysisDate: Date;

  // Contract
  status: 'active' | 'inactive' | 'suspended';
  contractedPlan: 'basic' | 'campanha_monitoramento_ativo' | 'enterprise';
  contractStartDate: Date;
  contractEndDate: Date;
  accountManagerId: string;

  createdAt: Date;
  updatedAt: Date;
}

export interface SentimentAnalysis {
  positive: number; // Percentage 0-100
  negative: number; // Percentage 0-100
  neutral: number;  // Percentage 0-100
  confidence: number; // 0-1
  sampleSize: number;
  date: Date;
}

export interface EmergingNarrative {
  id: string;
  narrative: string;
  sentiment: 'positive' | 'negative' | 'mixed';
  velocity: 'high' | 'medium' | 'low';
  confidence: number;
  impactScore: number; // 0-100
  mentionCount: number;
  growthRate: number;
  keywords: string[];
  firstDetected: Date;
  status: 'emerging' | 'trending' | 'declining' | 'resolved';
  politicianId?: string; // Opcional para narrativas gerais
}

export interface WhatsAppCampaign {
  id: string;
  politicianId: string;
  name: string;
  messageTemplate: string;

  // Metrics
  totalMessages: number;
  sentMessages: number;
  deliveredMessages: number;
  responses: number;

  // Rates
  deliveryRate: number;
  responseRate: number;

  // AI Metrics
  positiveResponseRate: number;
  negativeResponseRate: number;
  engagementScore: number; // 0-100

  status: 'draft' | 'scheduled' | 'active' | 'paused' | 'completed';
  scheduledDate?: Date;
  startedAt?: Date;
  completedAt?: Date;

  createdAt: Date;
  updatedAt: Date;
}

export interface SocialMediaMention {
  id: string;
  politicianId: string;
  platform: 'twitter' | 'facebook' | 'instagram' | 'youtube' | 'news';
  sourceUrl: string;
  authorHandle?: string;
  authorName?: string;
  content: string;

  // Metrics
  likes: number;
  shares: number;
  comments: number;
  reach: number;

  // AI Analysis
  sentiment: 'positive' | 'negative' | 'neutral';
  sentimentScore: number; // -1 to 1
  topics: string[];
  isInfluencer: boolean;
  influencerScore?: number;

  publishedAt: Date;
  capturedAt: Date;
}

export interface CRMPipelineCard {
  id: string;
  prospectName: string;
  position?: string;
  party?: string;

  contactInfo: {
    email?: string;
    phone?: string;
    preferredContact: 'email' | 'phone';
  };

  stage: PipelineStage;
  assignedTo: string;
  proposalValue?: number;
  notes: string;
  nextAction?: string;
  nextActionDate?: Date;

  probability: number; // 0-100%
  estimatedCloseDate?: Date;

  createdAt: Date;
  updatedAt: Date;
}

export type PipelineStage =
  | 'candidato'
  | 'qualification'
  | 'proposal_sent'
  | 'negotiation'
  | 'document_collection'
  | 'implementation'
  | 'active_client'
  | 'lost';

export interface Notification {
  id: string;
  type: 'alert' | 'informative' | 'task';
  priority: 'critical' | 'high' | 'medium' | 'low';
  category: NotificationCategory;

  title: string;
  description: string;
  recommendation?: string;
  actionUrl?: string;

  politicianId?: string;
  campaignId?: string;
  triggerEvent: string;

  confidence: number;
  impactScore: number;

  assignedTo?: string;
  status: 'unread' | 'read' | 'resolved' | 'dismissed';

  createdAt: Date;
  readAt?: Date;
  resolvedAt?: Date;
}

export type NotificationCategory =
  | 'sentiment_change'
  | 'campaign_performance'
  | 'contract_expiration'
  | 'emerging_crisis'
  | 'opportunity_detected'
  | 'system_issue';

export interface InternalUser {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  role: 'account_manager' | 'data_analyst' | 'administrator';
  assignedPoliticians: string[];
  isActive: boolean;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Aggregated data types
export interface DashboardKPIs {
  activeClients: number;
  ongoingCampaigns: number;
  messagesLast30Days: number;
  averageResponseRate: number;
  sentimentDistribution: SentimentAnalysis;
  recentActivities: Activity[];
}

export interface Activity {
  id: string;
  type: 'sentiment_analysis' | 'campaign_started' | 'report_generated' | 'alert';
  politicianName: string;
  description: string;
  timestamp: Date;
}