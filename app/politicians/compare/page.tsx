"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useData } from "@/lib/contexts/data-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  formatPercentage,
  formatDate,
  getScoreColor,
  getInitials,
} from "@/lib/utils";
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Minus,
  MessageSquare,
  BarChart3,
  Users,
} from "lucide-react";
import { Politician } from "@/lib/types";

export default function PoliticiansComparePage() {
  const router = useRouter();
  const { politicians, campaigns, socialMentions, emergingNarratives, isLoading } = useData();
  const [selectedPoliticians, setSelectedPoliticians] = useState<string[]>([]);

  const handleSelectPolitician = (index: number, politicianId: string) => {
    const newSelected = [...selectedPoliticians];
    newSelected[index] = politicianId;
    setSelectedPoliticians(newSelected);
  };

  const selectedPoliticiansData = selectedPoliticians
    .filter(id => id)
    .map(id => politicians.find(p => p.id === id))
    .filter((p): p is Politician => p !== undefined);

  const getPoliticianStats = (politician: Politician) => {
    const politicianCampaigns = campaigns.filter(c => c.politicianId === politician.id);
    const politicianMentions = socialMentions.filter(m => m.politicianId === politician.id);
    const politicianNarratives = emergingNarratives.filter(n => n.politicianId === politician.id);

    const activeCampaigns = politicianCampaigns.filter(c => c.status === 'active').length;
    const totalMessages = politicianCampaigns.reduce((sum, c) => sum + c.sentMessages, 0);
    const avgResponseRate = politicianCampaigns.length > 0
      ? politicianCampaigns.reduce((sum, c) => sum + c.responseRate, 0) / politicianCampaigns.length
      : 0;

    const positiveMentions = politicianMentions.filter(m => m.sentiment === 'positive').length;
    const negativeMentions = politicianMentions.filter(m => m.sentiment === 'negative').length;
    const totalReach = politicianMentions.reduce((sum, m) => sum + m.reach, 0);

    return {
      activeCampaigns,
      totalMessages,
      avgResponseRate,
      positiveMentions,
      negativeMentions,
      totalMentions: politicianMentions.length,
      totalReach,
      narrativesCount: politicianNarratives.length,
    };
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-40 w-full" />
        <div className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-96" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push('/politicians')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Comparação de Políticos</h1>
            <p className="text-muted-foreground">
              Compare métricas e desempenho entre políticos
            </p>
          </div>
        </div>
      </div>

      {/* Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Selecione os Políticos para Comparar</CardTitle>
          <CardDescription>
            Escolha até 3 políticos para ver uma comparação lado a lado
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {[0, 1, 2].map((index) => (
              <Select
                key={index}
                value={selectedPoliticians[index] || ""}
                onValueChange={(value) => handleSelectPolitician(index, value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder={`Político ${index + 1}`} />
                </SelectTrigger>
                <SelectContent>
                  {politicians
                    .filter(p => !selectedPoliticians.includes(p.id) || selectedPoliticians[index] === p.id)
                    .map((politician) => (
                      <SelectItem key={politician.id} value={politician.id}>
                        {politician.name} - {politician.party}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Comparison Grid */}
      {selectedPoliticiansData.length > 0 && (
        <div className="grid gap-6 md:grid-cols-3">
          {selectedPoliticiansData.map((politician) => {
            const stats = getPoliticianStats(politician);

            return (
              <Card key={politician.id} className="flex flex-col">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={politician.avatarUrl} alt={politician.name} />
                      <AvatarFallback>
                        {getInitials(politician.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold">{politician.name}</h3>
                      <p className="text-sm text-muted-foreground">{politician.position}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline">{politician.party}</Badge>
                    <Badge variant={politician.status === 'active' ? 'default' : 'secondary'}>
                      {politician.status === 'active' ? 'Ativo' : politician.status === 'inactive' ? 'Inativo' : 'Suspenso'}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 space-y-4">
                  {/* Score de Percepção */}
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Score de Percepção</p>
                    <div className="flex items-center gap-2">
                      <span className={`text-3xl font-bold ${getScoreColor(politician.perceptionScore)}`}>
                        {politician.perceptionScore}
                      </span>
                      <span className="text-sm text-muted-foreground">/100</span>
                      <div className="flex items-center gap-1 ml-auto">
                        {politician.scoreTrend > 0 ? (
                          <TrendingUp className="h-4 w-4 text-green-600" />
                        ) : politician.scoreTrend < 0 ? (
                          <TrendingDown className="h-4 w-4 text-red-600" />
                        ) : (
                          <Minus className="h-4 w-4 text-muted-foreground" />
                        )}
                        <span className={
                          politician.scoreTrend > 0
                            ? "text-green-600 text-sm font-medium"
                            : politician.scoreTrend < 0
                            ? "text-red-600 text-sm font-medium"
                            : "text-muted-foreground text-sm"
                        }>
                          {formatPercentage(Math.abs(politician.scoreTrend), true)}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Última análise: {formatDate(politician.lastAnalysisDate)}
                    </p>
                  </div>

                  <div className="h-px bg-border" />

                  {/* Campanhas */}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm font-medium">Campanhas</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Ativas</span>
                        <span className="text-sm font-medium">{stats.activeCampaigns}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Mensagens</span>
                        <span className="text-sm font-medium">{stats.totalMessages.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Taxa de Resposta</span>
                        <span className="text-sm font-medium">{formatPercentage(stats.avgResponseRate)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="h-px bg-border" />

                  {/* Menções */}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <BarChart3 className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm font-medium">Menções</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Total</span>
                        <span className="text-sm font-medium">{stats.totalMentions}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-green-600">Positivas</span>
                        <span className="text-sm font-medium text-green-600">{stats.positiveMentions}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-red-600">Negativas</span>
                        <span className="text-sm font-medium text-red-600">{stats.negativeMentions}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Alcance Total</span>
                        <span className="text-sm font-medium">{stats.totalReach.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="h-px bg-border" />

                  {/* Narrativas */}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm font-medium">Narrativas Emergentes</p>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Total</span>
                      <span className="text-sm font-medium">{stats.narrativesCount}</span>
                    </div>
                  </div>

                  <div className="mt-auto pt-4">
                    <Button
                      className="w-full"
                      variant="outline"
                      onClick={() => router.push(`/politicians/${politician.id}`)}
                    >
                      Ver Detalhes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {selectedPoliticiansData.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              Selecione pelo menos um político para começar a comparação
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
