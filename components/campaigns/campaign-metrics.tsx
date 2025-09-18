"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { WhatsAppCampaign } from "@/lib/types";
import { formatPercentage, formatNumber, formatDate, getRelativeTime } from "@/lib/utils";
import {
  MessageSquare,
  Send,
  CheckCheck,
  Reply,
  ThumbsUp,
  ThumbsDown,
  BarChart3,
  Clock,
  PlayCircle,
  PauseCircle,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface CampaignMetricsProps {
  campaign: WhatsAppCampaign;
  onPause?: () => void;
  onResume?: () => void;
  onStop?: () => void;
  onViewDetails?: () => void;
}

export function CampaignMetrics({
  campaign,
  onPause,
  onResume,
  onStop,
  onViewDetails,
}: CampaignMetricsProps) {
  const getStatusIcon = () => {
    switch (campaign.status) {
      case 'active':
        return <PlayCircle className="h-4 w-4 text-green-600" />;
      case 'paused':
        return <PauseCircle className="h-4 w-4 text-yellow-600" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-blue-600" />;
      case 'scheduled':
        return <Clock className="h-4 w-4 text-purple-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = () => {
    switch (campaign.status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-400';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-400';
      case 'completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-400';
      case 'scheduled':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-950 dark:text-gray-400';
    }
  };

  const deliveryProgress = (campaign.deliveredMessages / campaign.totalMessages) * 100;
  const responseProgress = (campaign.responses / campaign.deliveredMessages) * 100;

  // Mock hourly data for the chart
  const hourlyData = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}h`,
    sent: Math.floor(Math.random() * 1000),
    delivered: Math.floor(Math.random() * 900),
    responses: Math.floor(Math.random() * 200),
  }));

  const sentimentData = [
    { name: 'Positivo', value: campaign.positiveResponseRate, color: 'var(--chart-positive)' },
    { name: 'Negativo', value: campaign.negativeResponseRate, color: 'var(--chart-negative)' },
    { name: 'Neutro', value: 100 - campaign.positiveResponseRate - campaign.negativeResponseRate, color: 'var(--chart-neutral)' },
  ];

  const chartConfig = {
    sent: {
      label: "Enviadas",
      color: "var(--chart-1)",
    },
    delivered: {
      label: "Entregues",
      color: "var(--chart-2)",
    },
    responses: {
      label: "Respostas",
      color: "var(--chart-4)",
    },
  };

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <CardTitle className="text-2xl">{campaign.name}</CardTitle>
              <CardDescription>
                Criada {getRelativeTime(campaign.createdAt)}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={getStatusColor()}>
                {getStatusIcon()}
                <span className="ml-1">
                  {campaign.status === 'active' ? 'Ativa' :
                   campaign.status === 'paused' ? 'Pausada' :
                   campaign.status === 'completed' ? 'Concluída' :
                   campaign.status === 'scheduled' ? 'Agendada' : 'Rascunho'}
                </span>
              </Badge>
              <div className="flex gap-2">
                {campaign.status === 'active' && (
                  <Button size="sm" variant="outline" onClick={onPause}>
                    <PauseCircle className="mr-1 h-4 w-4" />
                    Pausar
                  </Button>
                )}
                {campaign.status === 'paused' && (
                  <Button size="sm" variant="outline" onClick={onResume}>
                    <PlayCircle className="mr-1 h-4 w-4" />
                    Retomar
                  </Button>
                )}
                {(campaign.status === 'active' || campaign.status === 'paused') && (
                  <Button size="sm" variant="destructive" onClick={onStop}>
                    <XCircle className="mr-1 h-4 w-4" />
                    Parar
                  </Button>
                )}
                <Button size="sm" onClick={onViewDetails}>
                  <BarChart3 className="mr-1 h-4 w-4" />
                  Detalhes
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Mensagens Enviadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">
                  {formatNumber(campaign.sentMessages)}
                </p>
                <p className="text-xs text-muted-foreground">
                  de {formatNumber(campaign.totalMessages)}
                </p>
              </div>
              <Send className="h-8 w-8 text-muted-foreground opacity-50" />
            </div>
            <Progress value={deliveryProgress} className="mt-3 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Taxa de Entrega</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">
                  {formatPercentage(campaign.deliveryRate)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatNumber(campaign.deliveredMessages)} entregues
                </p>
              </div>
              <CheckCheck className="h-8 w-8 text-green-600 opacity-50" />
            </div>
            <div className="mt-3 flex gap-2 text-xs">
              <span className="text-muted-foreground">Meta:</span>
              <span className="font-medium">95%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Taxa de Resposta</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">
                  {formatPercentage(campaign.responseRate)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatNumber(campaign.responses)} respostas
                </p>
              </div>
              <Reply className="h-8 w-8 text-blue-600 opacity-50" />
            </div>
            <Progress value={responseProgress} className="mt-3 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Engajamento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">
                  {campaign.engagementScore}
                </p>
                <p className="text-xs text-muted-foreground">
                  Score de qualidade
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600 opacity-50" />
            </div>
            <div className="mt-3 flex gap-3 text-xs">
              <span className="flex items-center gap-1">
                <ThumbsUp className="h-3 w-3 text-green-600" />
                {campaign.positiveResponseRate}%
              </span>
              <span className="flex items-center gap-1">
                <ThumbsDown className="h-3 w-3 text-red-600" />
                {campaign.negativeResponseRate}%
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Desempenho por Hora</CardTitle>
            <CardDescription>
              Distribuição de envios e respostas ao longo do dia
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="hour" className="text-xs" />
                  <YAxis className="text-xs" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="sent" fill="var(--chart-1)" name="Enviadas" />
                  <Bar dataKey="delivered" fill="var(--chart-2)" name="Entregues" />
                  <Bar dataKey="responses" fill="var(--chart-4)" name="Respostas" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Análise de Sentimento</CardTitle>
            <CardDescription>
              Distribuição das respostas por sentimento
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sentimentData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ value }) => `${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {sentimentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-xs text-muted-foreground">Positivo</p>
                <p className="text-lg font-bold text-green-600">
                  {campaign.positiveResponseRate}%
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Neutro</p>
                <p className="text-lg font-bold">
                  {100 - campaign.positiveResponseRate - campaign.negativeResponseRate}%
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Negativo</p>
                <p className="text-lg font-bold text-red-600">
                  {campaign.negativeResponseRate}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Campaign Info */}
      <Card>
        <CardHeader>
          <CardTitle>Informações da Campanha</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <p className="text-sm text-muted-foreground">Iniciada em</p>
              <p className="font-medium">
                {campaign.startedAt ? formatDate(campaign.startedAt) : '-'}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Previsão de Término</p>
              <p className="font-medium">
                {campaign.completedAt ? formatDate(campaign.completedAt) : 'Em andamento'}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Público-Alvo</p>
              <p className="font-medium">
                <Users className="inline-block mr-1 h-4 w-4" />
                {formatNumber(campaign.totalMessages)} contatos
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}