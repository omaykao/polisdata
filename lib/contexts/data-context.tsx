"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Politician,
  SentimentAnalysis,
  EmergingNarrative,
  WhatsAppCampaign,
  SocialMediaMention,
  CRMPipelineCard,
  Notification,
  DashboardKPIs,
} from '@/lib/types';
import {
  generatePoliticians,
  generateCRMCards,
  generateNotifications,
  generateDashboardKPIs,
  generateEmergingNarratives,
  generateEmergingNarrativesForPolitician,
  generateCampaign,
  generateSocialMention,
} from '@/lib/mock-data';

interface DataContextType {
  // Data
  politicians: Politician[];
  crmCards: CRMPipelineCard[];
  notifications: Notification[];
  dashboardKPIs: DashboardKPIs;
  campaigns: WhatsAppCampaign[];
  socialMentions: SocialMediaMention[];
  emergingNarratives: EmergingNarrative[];

  // Actions
  getPolitician: (id: string) => Politician | undefined;
  getCampaign: (id: string) => WhatsAppCampaign | undefined;
  getNotification: (id: string) => Notification | undefined;
  getCRMCard: (id: string) => CRMPipelineCard | undefined;

  // Updates
  updatePolitician: (id: string, updates: Partial<Politician>) => void;
  updateCampaign: (id: string, updates: Partial<WhatsAppCampaign>) => void;
  updateNotification: (id: string, updates: Partial<Notification>) => void;
  updateCRMCard: (id: string, updates: Partial<CRMPipelineCard>) => void;

  // Refresh
  refreshData: () => void;
  refreshDashboard: () => void;

  // Loading state
  isLoading: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  // Initialize all data
  const [politicians, setPoliticians] = useState<Politician[]>([]);
  const [crmCards, setCRMCards] = useState<CRMPipelineCard[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [dashboardKPIs, setDashboardKPIs] = useState<DashboardKPIs>({
    activeClients: 0,
    ongoingCampaigns: 0,
    messagesLast30Days: 0,
    averageResponseRate: 0,
    sentimentDistribution: {
      positive: 0,
      negative: 0,
      neutral: 0,
      confidence: 0,
      sampleSize: 0,
      date: new Date(),
    },
    recentActivities: [],
  });
  const [campaigns, setCampaigns] = useState<WhatsAppCampaign[]>([]);
  const [socialMentions, setSocialMentions] = useState<SocialMediaMention[]>([]);
  const [emergingNarratives, setEmergingNarratives] = useState<EmergingNarrative[]>([]);

  // Initialize data on mount
  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    setIsLoading(true);

    // Generate mock data
    const newPoliticians = generatePoliticians(25);
    const newCRMCards = generateCRMCards(15);
    const newNotifications = generateNotifications(10);
    const newDashboard = generateDashboardKPIs(newPoliticians);

    // Generate unique narratives for each politician (3-5 narratives per politician)
    const newNarratives = newPoliticians.flatMap(p =>
      generateEmergingNarrativesForPolitician(p.id, Math.floor(Math.random() * 3) + 3)
    );

    // Generate campaigns for ALL politicians (2-4 campaigns per politician)
    const newCampaigns = newPoliticians
      .flatMap(p => {
        const campaignCount = Math.floor(Math.random() * 3) + 2; // 2-4 campanhas
        return Array.from({ length: campaignCount }, () => generateCampaign(p.id));
      });

    // Generate social mentions for ALL politicians (5-10 mentions per politician)
    const newMentions = newPoliticians
      .flatMap(p => {
        const mentionCount = Math.floor(Math.random() * 6) + 5; // 5-10 menções
        return Array.from({ length: mentionCount }, () => generateSocialMention(p.id));
      });

    setPoliticians(newPoliticians);
    setCRMCards(newCRMCards);
    setNotifications(newNotifications);
    setDashboardKPIs(newDashboard);
    setCampaigns(newCampaigns);
    setSocialMentions(newMentions);
    setEmergingNarratives(newNarratives);

    setIsLoading(false);
  };

  const refreshDashboard = () => {
    setDashboardKPIs(generateDashboardKPIs(politicians));
  };

  // Getters
  const getPolitician = (id: string) => politicians.find(p => p.id === id);
  const getCampaign = (id: string) => campaigns.find(c => c.id === id);
  const getNotification = (id: string) => notifications.find(n => n.id === id);
  const getCRMCard = (id: string) => crmCards.find(c => c.id === id);

  // Updates
  const updatePolitician = (id: string, updates: Partial<Politician>) => {
    setPoliticians(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updates, updatedAt: new Date() } : p))
    );
  };

  const updateCampaign = (id: string, updates: Partial<WhatsAppCampaign>) => {
    setCampaigns(prev =>
      prev.map(c => (c.id === id ? { ...c, ...updates, updatedAt: new Date() } : c))
    );
  };

  const updateNotification = (id: string, updates: Partial<Notification>) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, ...updates } : n))
    );
  };

  const updateCRMCard = (id: string, updates: Partial<CRMPipelineCard>) => {
    setCRMCards(prev =>
      prev.map(c => (c.id === id ? { ...c, ...updates, updatedAt: new Date() } : c))
    );
  };

  const value: DataContextType = {
    politicians,
    crmCards,
    notifications,
    dashboardKPIs,
    campaigns,
    socialMentions,
    emergingNarratives,
    getPolitician,
    getCampaign,
    getNotification,
    getCRMCard,
    updatePolitician,
    updateCampaign,
    updateNotification,
    updateCRMCard,
    refreshData,
    refreshDashboard,
    isLoading,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}