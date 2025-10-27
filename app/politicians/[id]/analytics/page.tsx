"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useData } from "@/lib/contexts/data-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Politician } from "@/lib/types";
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Calendar,
  Users,
  MessageSquare,
  BarChart3,
  Activity,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Eye,
} from "lucide-react";
import { formatPercentage, formatDate, getInitials, getScoreColor } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export default function PoliticianAnalyticsPage() {
  const params = useParams();
  const router = useRouter();
  const { politicians, campaigns, socialMentions, emergingNarratives, isLoading } = useData();
  const [politician, setPolitician] = useState<Politician | undefined>(undefined);

  useEffect(() => {
    if (params?.id && politicians.length > 0) {
      const foundPolitician = politicians.find(p => p.id === params.id);
      setPolitician(foundPolitician);
    }
  }, [params?.id, politicians]);

  const politicianCampaigns = params?.id ? campaigns.filter(c => c.politicianId === params.id) : [];
  const politicianMentions = params?.id ? socialMentions.filter(m => m.politicianId === params.id) : [];
  const politicianNarratives = params?.id ? emergingNarratives.filter(n => n.politicianId === params.id) : [];

  // Calcular métricas de análise
  const positiveMentions = politicianMentions.filter(m => m.sentiment === 'positive').length;
  const negativeMentions = politicianMentions.filter(m => m.sentiment === 'negative').length;
  const neutralMentions = politicianMentions.filter(m => m.sentiment === 'neutral').length;

  const totalReach = politicianMentions.reduce((sum, m) => sum + m.reach, 0);
  const totalLikes = politicianMentions.reduce((sum, m) => sum + m.likes, 0);
  const totalShares = politicianMentions.reduce((sum, m) => sum + m.shares, 0);
  const totalComments = politicianMentions.reduce((sum, m) => sum + m.comments, 0);

  const avgResponseRate = politicianCampaigns.length > 0
    ? politicianCampaigns.reduce((sum, c) => sum + c.responseRate, 0) / politicianCampaigns.length
    : 0;

  const totalMessages = politicianCampaigns.reduce((sum, c) => sum + c.sentMessages, 0);
  const totalResponses = politicianCampaigns.reduce((sum, c) => sum + c.responses, 0);

  // Narrativas por sentimento
  const positiveNarratives = politicianNarratives.filter(n => n.sentiment === 'positive').length;
  const negativeNarratives = politicianNarratives.filter(n => n.sentiment === 'negative').length;
  const mixedNarratives = politicianNarratives.filter(n => n.sentiment === 'mixed').length;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-40 w-full" />
        <div className="grid gap-4 md:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    );
  }

  if (!politician) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <h2 className="text-2xl font-semibold">Político não encontrado</h2>
        <p className="text-muted-foreground">
          O político que você está procurando não existe ou foi removido.
        </p>
        <Button onClick={() => router.push('/politicians')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para Políticos
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push(`/politicians/${politician.id}`)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
      </div>

      {/* Politician Header Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={politician.avatarUrl} alt={politician.name} />
                <AvatarFallback>{getInitials(politician.name)}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">Análise Individual - {politician.name}</h1>
                <p className="text-muted-foreground">
                  {politician.position} • {politician.party}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className={`text-4xl font-bold ${getScoreColor(politician.perceptionScore)}`}>
                {politician.perceptionScore}
              </div>
              <p className="text-sm text-muted-foreground">Score de Percepção</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Métricas Gerais */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Campanhas WhatsApp
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{politicianCampaigns.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {totalMessages.toLocaleString()} mensagens enviadas
            </p>
            <div className="mt-2 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium">{formatPercentage(avgResponseRate)} resposta</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              Menções nas Redes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{politicianMentions.length}</div>
            <div className="mt-2 space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-green-600">{positiveMentions} positivas</span>
                <span className="text-red-600">{negativeMentions} negativas</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Eye className="h-3 w-3" />
                {totalReach.toLocaleString()} alcance total
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Narrativas Emergentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{politicianNarratives.length}</div>
            <div className="mt-2 space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-green-600">{positiveNarratives} positivas</span>
                <span className="text-red-600">{negativeNarratives} negativas</span>
              </div>
              <div className="text-xs text-muted-foreground">
                {mixedNarratives} mistas
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Engajamento Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(totalLikes + totalShares + totalComments).toLocaleString()}</div>
            <div className="mt-2 space-y-1 text-xs text-muted-foreground">
              <div>{totalLikes.toLocaleString()} curtidas</div>
              <div>{totalShares.toLocaleString()} compartilhamentos</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Análise Detalhada por Abas */}
      <Tabs defaultValue="campaigns" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="campaigns">Campanhas</TabsTrigger>
          <TabsTrigger value="mentions">Menções</TabsTrigger>
          <TabsTrigger value="narratives">Narrativas</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Campanhas WhatsApp</CardTitle>
              <CardDescription>
                Todas as campanhas realizadas para {politician.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {politicianCampaigns.map((campaign) => (
                  <div key={campaign.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{campaign.name}</h3>
                          <Badge variant={campaign.status === 'active' ? 'default' : 'secondary'}>
                            {campaign.status === 'active' ? 'Ativa' :
                             campaign.status === 'completed' ? 'Concluída' :
                             campaign.status === 'scheduled' ? 'Agendada' :
                             campaign.status === 'paused' ? 'Pausada' : 'Rascunho'}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Mensagens</p>
                            <p className="font-medium">{campaign.sentMessages.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Entregues</p>
                            <p className="font-medium">{campaign.deliveredMessages.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Respostas</p>
                            <p className="font-medium">{campaign.responses.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Taxa de Resposta</p>
                            <p className="font-medium text-green-600">
                              {formatPercentage(campaign.responseRate)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Criada em {formatDate(campaign.createdAt)}
                          </span>
                          {campaign.startedAt && (
                            <span>Iniciada em {formatDate(campaign.startedAt)}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mentions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Menções nas Redes Sociais</CardTitle>
              <CardDescription>
                Todas as menções capturadas sobre {politician.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {politicianMentions.map((mention) => (
                  <div key={mention.id} className="border rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Badge
                        variant="outline"
                        className={
                          mention.sentiment === 'positive'
                            ? 'border-green-600 text-green-600'
                            : mention.sentiment === 'negative'
                            ? 'border-red-600 text-red-600'
                            : ''
                        }
                      >
                        {mention.platform}
                      </Badge>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{mention.authorName}</span>
                            <span className="text-sm text-muted-foreground">
                              {mention.authorHandle}
                            </span>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {formatDate(mention.publishedAt)}
                          </span>
                        </div>
                        <p className="text-sm">{mention.content}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <ThumbsUp className="h-3 w-3" />
                            {mention.likes.toLocaleString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Share2 className="h-3 w-3" />
                            {mention.shares.toLocaleString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageSquare className="h-3 w-3" />
                            {mention.comments.toLocaleString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {mention.reach.toLocaleString()} alcance
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="narratives" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Narrativas Emergentes</CardTitle>
              <CardDescription>
                Tópicos e narrativas detectadas pela IA para {politician.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {politicianNarratives.map((narrative) => (
                  <div key={narrative.id} className="border rounded-lg p-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <h3 className="font-semibold flex-1">{narrative.narrative}</h3>
                        <Badge
                          variant="outline"
                          className={
                            narrative.sentiment === 'positive'
                              ? 'border-green-600 text-green-600'
                              : narrative.sentiment === 'negative'
                              ? 'border-red-600 text-red-600'
                              : ''
                          }
                        >
                          {narrative.sentiment === 'positive' ? 'Positiva' :
                           narrative.sentiment === 'negative' ? 'Negativa' : 'Mista'}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Impacto</p>
                          <p className="font-medium">{narrative.impactScore}/100</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Menções</p>
                          <p className="font-medium">{narrative.mentionCount.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Velocidade</p>
                          <p className="font-medium capitalize">{narrative.velocity}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Status</p>
                          <p className="font-medium capitalize">{narrative.status}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {narrative.keywords.map((keyword) => (
                          <Badge key={keyword} variant="secondary" className="text-xs">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Detectada em {formatDate(narrative.firstDetected)} •
                        Crescimento: {narrative.growthRate > 0 && '+'}{narrative.growthRate.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
