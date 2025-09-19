"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Politician, WhatsAppCampaign, SocialMediaMention } from "@/lib/types";
import {
  formatPercentage,
  formatDate,
  formatCurrency,
  getStatusColor,
  getScoreColor,
  getInitials,
} from "@/lib/utils";
import {
  ChevronUp,
  ChevronDown,
  Phone,
  Mail,
  Calendar,
  Building,
  MapPin,
  Edit,
  MessageSquare,
  BarChart3,
  FileText,
  TrendingUp,
  Users,
  Clock,
} from "lucide-react";

interface PoliticianDashboardProps {
  politician: Politician;
  campaigns: WhatsAppCampaign[];
  mentions: SocialMediaMention[];
  onEdit?: () => void;
  onNewCampaign?: () => void;
  onGenerateReport?: () => void;
}

export function PoliticianDashboard({
  politician,
  campaigns,
  mentions,
  onEdit,
  onNewCampaign,
  onGenerateReport,
}: PoliticianDashboardProps) {
  const activeCampaigns = campaigns.filter(c => c.status === 'active').length;
  const totalMessages = campaigns.reduce((sum, c) => sum + c.sentMessages, 0);
  const avgResponseRate = campaigns.length > 0
    ? campaigns.reduce((sum, c) => sum + c.responseRate, 0) / campaigns.length
    : 0;

  const recentMentions = mentions.slice(0, 5);
  const positiveMentions = mentions.filter(m => m.sentiment === 'positive').length;
  const negativeMentions = mentions.filter(m => m.sentiment === 'negative').length;

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={politician.avatarUrl} alt={politician.name} />
                <AvatarFallback className="text-lg">
                  {getInitials(politician.name)}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-3">
                <div>
                  <h2 className="text-2xl font-bold">{politician.name}</h2>
                  <p className="text-muted-foreground">{politician.position}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline">{politician.party}</Badge>
                  <Badge
                    variant="secondary"
                    className={getStatusColor(politician.status)}
                  >
                    {politician.status === "active"
                      ? "Ativo"
                      : politician.status === "inactive"
                      ? "Inativo"
                      : "Suspenso"}
                  </Badge>
                  <Badge variant="outline">
                    {politician.contractedPlan === "basic"
                      ? "Plano Básico"
                      : politician.contractedPlan === "campanha_monitoramento_ativo"
                      ? "Campanha de Monitoramento Ativo"
                      : "Plano Empresarial"}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    <span>{politician.email}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone className="h-4 w-4" />
                    <span>{politician.phone}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onEdit}>
                <Edit className="mr-2 h-4 w-4" />
                Editar
              </Button>
              <Button variant="outline" onClick={onNewCampaign}>
                <MessageSquare className="mr-2 h-4 w-4" />
                Nova Campanha
              </Button>
              <Button onClick={onGenerateReport}>
                <FileText className="mr-2 h-4 w-4" />
                Gerar Relatório
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">
              Score de Percepção
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span
                className={`text-3xl font-bold ${getScoreColor(
                  politician.perceptionScore
                )}`}
              >
                {politician.perceptionScore}
              </span>
              <span className="text-sm text-muted-foreground">/100</span>
              <div className="flex items-center gap-1 ml-auto">
                {politician.scoreTrend > 0 ? (
                  <ChevronUp className="h-4 w-4 text-green-600" />
                ) : politician.scoreTrend < 0 ? (
                  <ChevronDown className="h-4 w-4 text-red-600" />
                ) : null}
                <span
                  className={
                    politician.scoreTrend > 0
                      ? "text-green-600 text-sm"
                      : politician.scoreTrend < 0
                      ? "text-red-600 text-sm"
                      : "text-sm"
                  }
                >
                  {formatPercentage(Math.abs(politician.scoreTrend), true)}
                </span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Última análise: {formatDate(politician.lastAnalysisDate)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">
              Campanhas Ativas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold">{activeCampaigns}</span>
              <MessageSquare className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {totalMessages.toLocaleString()} mensagens enviadas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">
              Taxa de Resposta
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold">
                {formatPercentage(avgResponseRate)}
              </span>
              <TrendingUp className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Média das campanhas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">
              Menções Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold">{mentions.length}</span>
              <BarChart3 className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex gap-4 text-xs text-muted-foreground mt-2">
              <span className="text-green-600">{positiveMentions} positivas</span>
              <span className="text-red-600">{negativeMentions} negativas</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contract Information */}
      <Card>
        <CardHeader>
          <CardTitle>Informações do Contrato</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <p className="text-sm text-muted-foreground">Início do Contrato</p>
              <p className="font-medium">{formatDate(politician.contractStartDate)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Término do Contrato</p>
              <p className="font-medium">{formatDate(politician.contractEndDate)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Tempo Restante</p>
              <p className="font-medium">
                {Math.ceil(
                  (new Date(politician.contractEndDate).getTime() - new Date().getTime()) /
                  (1000 * 60 * 60 * 24)
                )}{" "}
                dias
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Atividade Recente</CardTitle>
          <CardDescription>
            Últimas campanhas e menções do político
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="campaigns">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="campaigns">Campanhas</TabsTrigger>
              <TabsTrigger value="mentions">Menções</TabsTrigger>
            </TabsList>
            <TabsContent value="campaigns" className="space-y-3 mt-4">
              {campaigns.slice(0, 3).map((campaign) => (
                <div key={campaign.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{campaign.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {campaign.deliveredMessages.toLocaleString()} mensagens • {formatPercentage(campaign.responseRate)} respostas
                    </p>
                  </div>
                  <Badge variant={campaign.status === 'active' ? 'default' : 'secondary'}>
                    {campaign.status === 'active' ? 'Ativa' :
                     campaign.status === 'completed' ? 'Concluída' :
                     campaign.status === 'scheduled' ? 'Agendada' :
                     campaign.status === 'paused' ? 'Pausada' : 'Rascunho'}
                  </Badge>
                </div>
              ))}
              {campaigns.length === 0 && (
                <p className="text-center text-muted-foreground py-4">
                  Nenhuma campanha encontrada
                </p>
              )}
            </TabsContent>
            <TabsContent value="mentions" className="space-y-3 mt-4">
              {recentMentions.map((mention) => (
                <div key={mention.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={
                          mention.sentiment === 'positive'
                            ? 'text-green-600'
                            : mention.sentiment === 'negative'
                            ? 'text-red-600'
                            : ''
                        }
                      >
                        {mention.platform}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        @{mention.authorHandle}
                      </span>
                    </div>
                    <p className="text-sm mt-1 line-clamp-2">
                      {mention.content}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {mention.reach.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">alcance</p>
                  </div>
                </div>
              ))}
              {mentions.length === 0 && (
                <p className="text-center text-muted-foreground py-4">
                  Nenhuma menção encontrada
                </p>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}