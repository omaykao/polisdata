"use client";

import { useState } from "react";
import { useData } from "@/lib/contexts/data-context";
import { CampaignForm } from "@/components/campaigns/campaign-form";
import { CampaignMetrics } from "@/components/campaigns/campaign-metrics";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { WhatsAppCampaign } from "@/lib/types";
import { formatPercentage, formatNumber, formatDate } from "@/lib/utils";
import {
  Plus,
  Search,
  MessageSquare,
  PlayCircle,
  PauseCircle,
  CheckCircle,
  Clock,
  BarChart3,
  Filter,
} from "lucide-react";

export default function CampaignsPage() {
  const { campaigns, politicians, updateCampaign, isLoading } = useData();
  const [view, setView] = useState<"list" | "new" | "details">("list");
  const [selectedCampaign, setSelectedCampaign] = useState<WhatsAppCampaign | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const handleCreateCampaign = (data: Partial<WhatsAppCampaign>) => {
    // TODO: Create campaign
    console.log("Create campaign:", data);
    setView("list");
  };

  const handleUpdateCampaign = (campaignId: string, updates: Partial<WhatsAppCampaign>) => {
    updateCampaign(campaignId, updates);
  };

  const handleViewCampaignDetails = (campaign: WhatsAppCampaign) => {
    setSelectedCampaign(campaign);
    setView("details");
  };

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || campaign.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const activeCampaigns = campaigns.filter(c => c.status === "active").length;
  const totalMessages = campaigns.reduce((sum, c) => sum + c.sentMessages, 0);
  const avgResponseRate = campaigns.length > 0
    ? campaigns.reduce((sum, c) => sum + c.responseRate, 0) / campaigns.length
    : 0;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-full" />
        <div className="grid gap-4 md:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (view === "new") {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => setView("list")}>
            ← Voltar
          </Button>
        </div>
        <CampaignForm
          politicians={politicians}
          onSubmit={handleCreateCampaign}
          onCancel={() => setView("list")}
        />
      </div>
    );
  }

  if (view === "details" && selectedCampaign) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => setView("list")}>
            ← Voltar
          </Button>
        </div>
        <CampaignMetrics
          campaign={selectedCampaign}
          onPause={() => handleUpdateCampaign(selectedCampaign.id, { status: 'paused' })}
          onResume={() => handleUpdateCampaign(selectedCampaign.id, { status: 'active' })}
          onStop={() => handleUpdateCampaign(selectedCampaign.id, { status: 'completed' })}
          onViewDetails={() => console.log("View details")}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Campanhas WhatsApp</h1>
          <p className="text-muted-foreground">
            Gerencie pesquisas e campanhas de comunicação via WhatsApp
          </p>
        </div>
        <Button onClick={() => setView("new")}>
          <Plus className="mr-2 h-4 w-4" />
          Nova Campanha
        </Button>
      </div>

      {/* Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Campanhas Ativas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{activeCampaigns}</p>
            <p className="text-xs text-muted-foreground">de {campaigns.length} total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Mensagens Enviadas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatNumber(totalMessages)}</p>
            <p className="text-xs text-muted-foreground">Últimos 30 dias</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Taxa de Resposta Média</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatPercentage(avgResponseRate)}</p>
            <p className="text-xs text-muted-foreground">Todas as campanhas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Engajamento Médio</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {campaigns.length > 0
                ? Math.round(campaigns.reduce((sum, c) => sum + c.engagementScore, 0) / campaigns.length)
                : 0}
            </p>
            <p className="text-xs text-muted-foreground">Score de qualidade</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar campanhas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os Status</SelectItem>
            <SelectItem value="active">Ativas</SelectItem>
            <SelectItem value="paused">Pausadas</SelectItem>
            <SelectItem value="scheduled">Agendadas</SelectItem>
            <SelectItem value="completed">Concluídas</SelectItem>
            <SelectItem value="draft">Rascunhos</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Campaigns List */}
      <div className="grid gap-4">
        {filteredCampaigns.map((campaign) => {
          const politician = politicians.find(p => p.id === campaign.politicianId);

          return (
            <Card
              key={campaign.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleViewCampaignDetails(campaign)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-3">
                      <MessageSquare className="h-5 w-5 text-muted-foreground" />
                      <h3 className="font-semibold text-lg">{campaign.name}</h3>
                      <Badge variant={
                        campaign.status === 'active' ? 'default' :
                        campaign.status === 'completed' ? 'secondary' :
                        campaign.status === 'paused' ? 'outline' :
                        'secondary'
                      }>
                        {campaign.status === 'active' && <PlayCircle className="mr-1 h-3 w-3" />}
                        {campaign.status === 'paused' && <PauseCircle className="mr-1 h-3 w-3" />}
                        {campaign.status === 'completed' && <CheckCircle className="mr-1 h-3 w-3" />}
                        {campaign.status === 'scheduled' && <Clock className="mr-1 h-3 w-3" />}
                        {campaign.status === 'active' ? 'Ativa' :
                         campaign.status === 'paused' ? 'Pausada' :
                         campaign.status === 'completed' ? 'Concluída' :
                         campaign.status === 'scheduled' ? 'Agendada' : 'Rascunho'}
                      </Badge>
                    </div>
                    {politician && (
                      <p className="text-sm text-muted-foreground">
                        {politician.name} • {politician.party}
                      </p>
                    )}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Enviadas</p>
                        <p className="font-medium">{formatNumber(campaign.sentMessages)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Entregues</p>
                        <p className="font-medium">{formatNumber(campaign.deliveredMessages)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Taxa de Entrega</p>
                        <p className="font-medium">{formatPercentage(campaign.deliveryRate)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Respostas</p>
                        <p className="font-medium">{formatNumber(campaign.responses)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Taxa de Resposta</p>
                        <p className="font-medium">{formatPercentage(campaign.responseRate)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>Criada em {formatDate(campaign.createdAt)}</span>
                      {campaign.startedAt && (
                        <span>• Iniciada em {formatDate(campaign.startedAt)}</span>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewCampaignDetails(campaign);
                    }}
                  >
                    <BarChart3 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {filteredCampaigns.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-semibold mb-2">Nenhuma campanha encontrada</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {searchQuery || statusFilter !== "all"
                  ? "Tente ajustar seus filtros de busca"
                  : "Crie sua primeira campanha para começar a coletar dados"}
              </p>
              {!searchQuery && statusFilter === "all" && (
                <Button onClick={() => setView("new")}>
                  <Plus className="mr-2 h-4 w-4" />
                  Criar Primeira Campanha
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}