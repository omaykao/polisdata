"use client";

import { useState } from "react";
import { useData } from "@/lib/contexts/data-context";
import { SocialMentionsFeed } from "@/components/social/social-mentions-feed";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  MessageCircle,
  TrendingUp,
  Users,
  AlertTriangle,
  BarChart3,
  Settings,
  RefreshCw,
  Download,
  Plus,
  Hash,
} from "lucide-react";

export default function SocialMonitoringPage() {
  const { socialMentions, politicians, isLoading } = useData();
  const [activeTab, setActiveTab] = useState<"feed" | "trending" | "alerts">("feed");

  const handleRespond = (mentionId: string) => {
    console.log("Respond to mention:", mentionId);
  };

  const handleFlag = (mentionId: string, reason: string) => {
    console.log("Flag mention:", mentionId, reason);
  };

  const handleAnalyze = (mentionId: string) => {
    console.log("Analyze mention:", mentionId);
  };

  const handleCreateAlert = () => {
    console.log("Create new alert");
  };

  const handleRefresh = () => {
    console.log("Refresh social mentions");
  };

  const handleExport = () => {
    console.log("Export social data");
  };

  // Calculate trending topics from mentions
  const trendingTopics = [
    { topic: "#eleições2026", mentions: 15234, growth: 45.2, sentiment: "mixed" },
    { topic: "reforma tributária", mentions: 12453, growth: 23.8, sentiment: "negative" },
    { topic: "educação pública", mentions: 9876, growth: 67.3, sentiment: "positive" },
    { topic: "segurança pública", mentions: 8765, growth: -12.4, sentiment: "negative" },
    { topic: "saúde municipal", mentions: 7654, growth: 34.5, sentiment: "mixed" },
    { topic: "#BrasilMelhor", mentions: 6543, growth: 89.2, sentiment: "positive" },
  ];

  const alerts = [
    {
      id: "1",
      type: "critical",
      title: "Narrativa Negativa em Alta",
      description: "Sentimento negativo sobre reforma tributária cresceu 45% em 2 horas",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      politician: "Roberto Silva Filho",
    },
    {
      id: "2",
      type: "warning",
      title: "Influenciador Mencionou Candidato",
      description: "@influencer com 2M seguidores mencionou críticas ao transporte público",
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
      politician: "Marina Costa Santos",
    },
    {
      id: "3",
      type: "info",
      title: "Tendência Positiva Detectada",
      description: "Aprovação crescendo após anúncio de novo programa social",
      timestamp: new Date(Date.now() - 1000 * 60 * 120),
      politician: "José Ricardo Almeida",
    },
  ];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-full" />
        <div className="grid gap-4 md:grid-cols-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Monitoramento Social</h1>
          <p className="text-muted-foreground">
            Acompanhe menções, tendências e sentimentos em tempo real
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Atualizar
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Button size="sm" onClick={handleCreateAlert}>
            <Plus className="mr-2 h-4 w-4" />
            Criar Alerta
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={(value: string) => setActiveTab(value as "feed" | "trending" | "alerts")}>
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="feed">
            <MessageCircle className="mr-2 h-4 w-4" />
            Feed
          </TabsTrigger>
          <TabsTrigger value="trending">
            <TrendingUp className="mr-2 h-4 w-4" />
            Tendências
          </TabsTrigger>
          <TabsTrigger value="alerts">
            <AlertTriangle className="mr-2 h-4 w-4" />
            Alertas
          </TabsTrigger>
        </TabsList>

        <TabsContent value="feed" className="space-y-6 mt-6">
          <SocialMentionsFeed
            mentions={socialMentions}
            onRespond={handleRespond}
            onFlag={handleFlag}
            onAnalyze={handleAnalyze}
          />
        </TabsContent>

        <TabsContent value="trending" className="space-y-6 mt-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Tópicos em Alta</CardTitle>
                <CardDescription>
                  Principais assuntos mencionados nas últimas 24 horas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trendingTopics.map((topic, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted font-semibold">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium">{topic.topic}</p>
                          <p className="text-sm text-muted-foreground">
                            {topic.mentions.toLocaleString('pt-BR')} menções
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            topic.sentiment === 'positive' ? 'default' :
                            topic.sentiment === 'negative' ? 'destructive' :
                            'secondary'
                          }
                        >
                          {topic.sentiment === 'positive' ? 'Positivo' :
                           topic.sentiment === 'negative' ? 'Negativo' : 'Misto'}
                        </Badge>
                        <span className={`text-sm font-medium ${
                          topic.growth > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {topic.growth > 0 ? '+' : ''}{topic.growth}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Hashtags Populares</CardTitle>
                <CardDescription>
                  Hashtags mais utilizadas relacionadas aos políticos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {[
                    "#eleições2026",
                    "#BrasilMelhor",
                    "#MudançaJá",
                    "#ReformaTributária",
                    "#EducaçãoParaTodos",
                    "#SegurançaPública",
                    "#SaúdePública",
                    "#TransporteDigno",
                    "#EmpregoParaTodos",
                    "#JustiçaSocial",
                    "#MeioAmbiente",
                    "#InovaçãoBrasil",
                  ].map((tag) => (
                    <Badge key={tag} variant="outline" className="px-3 py-1">
                      <Hash className="mr-1 h-3 w-3" />
                      {tag.substring(1)}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Análise de Velocidade de Propagação</CardTitle>
              <CardDescription>
                Tópicos com maior velocidade de disseminação
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { topic: "Novo escândalo de corrupção", velocity: "Alta", reach: "2.3M", time: "2h" },
                  { topic: "Proposta de lei polêmica", velocity: "Média", reach: "890K", time: "4h" },
                  { topic: "Inauguração de obra pública", velocity: "Baixa", reach: "234K", time: "8h" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{item.topic}</p>
                      <p className="text-sm text-muted-foreground">
                        Alcançou {item.reach} pessoas em {item.time}
                      </p>
                    </div>
                    <Badge
                      variant={
                        item.velocity === 'Alta' ? 'destructive' :
                        item.velocity === 'Média' ? 'default' :
                        'secondary'
                      }
                    >
                      Velocidade {item.velocity}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Alertas Ativos</CardTitle>
              <CardDescription>
                Notificações importantes sobre mudanças no sentimento público
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`border rounded-lg p-4 ${
                      alert.type === 'critical' ? 'border-red-500 bg-red-50 dark:bg-red-950' :
                      alert.type === 'warning' ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950' :
                      'border-blue-500 bg-blue-50 dark:bg-blue-950'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <AlertTriangle className={`h-4 w-4 ${
                            alert.type === 'critical' ? 'text-red-600' :
                            alert.type === 'warning' ? 'text-yellow-600' :
                            'text-blue-600'
                          }`} />
                          <h4 className="font-semibold">{alert.title}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {alert.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Político: {alert.politician}</span>
                          <span>{new Date(alert.timestamp).toLocaleString('pt-BR')}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Configuração de Alertas</CardTitle>
              <CardDescription>
                Defina gatilhos automáticos para monitoramento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="mr-2 h-4 w-4" />
                  Criar alerta para crescimento rápido de sentimento negativo
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="mr-2 h-4 w-4" />
                  Criar alerta para menções por influenciadores
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="mr-2 h-4 w-4" />
                  Criar alerta para novos tópicos emergentes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}