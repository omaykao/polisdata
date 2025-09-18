"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
  Tooltip,
  FunnelChart,
  Funnel,
  LabelList,
} from "recharts";
import {
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  MessageSquare,
  Users,
  Target,
  Eye,
  MousePointer,
  CheckCheck,
  Reply,
  ThumbsUp,
  ThumbsDown,
  Clock,
  CalendarIcon,
  Download,
  Filter,
  BarChart3,
  Activity,
  MapPin,
  Smartphone,
  Globe,
  Share2,
  AlertCircle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Send,
} from "lucide-react";
import Link from "next/link";

export default function CampaignAnalyticsPage() {
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  });
  const [selectedCampaign, setSelectedCampaign] = useState("all");
  const [selectedMetric, setSelectedMetric] = useState("engagement");
  const [selectedPeriod, setSelectedPeriod] = useState("7d");

  // Mock data for performance over time
  const performanceData = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return {
      date: date.toISOString().split('T')[0],
      sent: Math.floor(Math.random() * 50000) + 30000,
      delivered: Math.floor(Math.random() * 45000) + 28000,
      opened: Math.floor(Math.random() * 35000) + 20000,
      clicked: Math.floor(Math.random() * 15000) + 5000,
      replied: Math.floor(Math.random() * 8000) + 2000,
      converted: Math.floor(Math.random() * 3000) + 500,
    };
  });

  // Conversion funnel data
  const funnelData = [
    { name: "Mensagens Enviadas", value: 100000, fill: "var(--chart-1)" },
    { name: "Entregues", value: 85000, fill: "var(--chart-2)" },
    { name: "Abertas", value: 45000, fill: "var(--chart-3)" },
    { name: "Clicadas", value: 15000, fill: "var(--chart-4)" },
    { name: "Respondidas", value: 8000, fill: "var(--chart-5)" },
    { name: "Convertidas", value: 2500, fill: "var(--chart-positive)" },
  ];

  // Geographic distribution
  const geoData = [
    { region: "São Paulo", value: 35, engagementRate: 22 },
    { region: "Rio de Janeiro", value: 25, engagementRate: 19 },
    { region: "Minas Gerais", value: 15, engagementRate: 25 },
    { region: "Bahia", value: 10, engagementRate: 18 },
    { region: "Paraná", value: 8, engagementRate: 23 },
    { region: "Outros", value: 7, engagementRate: 20 },
  ];

  // Time of day analysis
  const timeOfDayData = Array.from({ length: 24 }, (_, hour) => ({
    hour: `${hour}h`,
    openRate: 15 + Math.sin(hour / 3) * 10 + Math.random() * 5,
    responseRate: 8 + Math.sin(hour / 4) * 5 + Math.random() * 3,
    conversionRate: 2 + Math.sin(hour / 5) * 2 + Math.random() * 1,
  }));

  // Device distribution
  const deviceData = [
    { name: "WhatsApp Mobile", value: 75, color: "var(--chart-positive)" },
    { name: "WhatsApp Web", value: 20, color: "var(--chart-2)" },
    { name: "WhatsApp Desktop", value: 5, color: "var(--chart-3)" },
  ];

  // Campaign comparison
  const campaignComparison = [
    {
      name: "Consulta Eleitoral",
      sent: 72300,
      delivered: 61455,
      opened: 36150,
      responded: 5784,
      sentiment: 75,
    },
    {
      name: "Pesquisa Temática",
      sent: 51500,
      delivered: 43775,
      opened: 20600,
      responded: 3090,
      sentiment: 62,
    },
    {
      name: "Convite Evento",
      sent: 35200,
      delivered: 31680,
      opened: 21120,
      responded: 4224,
      sentiment: 88,
    },
    {
      name: "Informativo",
      sent: 98600,
      delivered: 88740,
      opened: 39440,
      responded: 2958,
      sentiment: 70,
    },
  ];

  // Engagement metrics by segment
  const segmentEngagement = [
    { segment: "Jovens", openRate: 42, clickRate: 18, responseRate: 12 },
    { segment: "Adultos", openRate: 38, clickRate: 15, responseRate: 10 },
    { segment: "Idosos", openRate: 35, clickRate: 12, responseRate: 8 },
    { segment: "Apoiadores", openRate: 55, clickRate: 28, responseRate: 20 },
    { segment: "Neutros", openRate: 30, clickRate: 10, responseRate: 5 },
  ];

  // Response sentiment analysis
  const sentimentTrend = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return {
      date: date.toLocaleDateString('pt-BR', { weekday: 'short' }),
      positive: 45 + Math.random() * 20,
      neutral: 25 + Math.random() * 15,
      negative: 10 + Math.random() * 10,
    };
  });

  const chartConfig = {
    sent: { label: "Enviadas", color: "var(--chart-1)" },
    delivered: { label: "Entregues", color: "var(--chart-2)" },
    opened: { label: "Abertas", color: "var(--chart-3)" },
    clicked: { label: "Clicadas", color: "var(--chart-4)" },
    replied: { label: "Respondidas", color: "var(--chart-5)" },
    converted: { label: "Convertidas", color: "var(--chart-positive)" },
    positive: { label: "Positivo", color: "var(--chart-positive)" },
    neutral: { label: "Neutro", color: "var(--chart-neutral)" },
    negative: { label: "Negativo", color: "var(--chart-negative)" },
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Analytics de Campanhas</h1>
          <p className="text-muted-foreground">
            Análise detalhada do desempenho das suas campanhas
          </p>
        </div>
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "dd/MM", { locale: ptBR })} -{" "}
                      {format(dateRange.to, "dd/MM", { locale: ptBR })}
                    </>
                  ) : (
                    format(dateRange.from, "dd/MM/yyyy", { locale: ptBR })
                  )
                ) : (
                  "Selecionar período"
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                initialFocus
                mode="range"
                selected={{
                  from: dateRange.from,
                  to: dateRange.to,
                }}
                onSelect={(range: { from?: Date; to?: Date } | undefined) => {
                  if (range) {
                    setDateRange({ from: range.from, to: range.to });
                  } else {
                    setDateRange({ from: undefined, to: undefined });
                  }
                }}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filtros
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Button>
            <RefreshCw className="mr-2 h-4 w-4" />
            Atualizar
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total de Mensagens</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">1.5M</p>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">↑ 12.5%</span> vs. mês anterior
                </p>
              </div>
              <MessageSquare className="h-8 w-8 text-muted-foreground opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Taxa de Entrega</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">87.3%</p>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">↑ 2.1%</span> vs. mês anterior
                </p>
              </div>
              <CheckCheck className="h-8 w-8 text-green-600 opacity-50" />
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
                <p className="text-2xl font-bold">18.7%</p>
                <p className="text-xs text-muted-foreground">
                  <span className="text-red-600">↓ 1.3%</span> vs. mês anterior
                </p>
              </div>
              <Reply className="h-8 w-8 text-blue-600 opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Conversões</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">4,823</p>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">↑ 24.3%</span> vs. mês anterior
                </p>
              </div>
              <Target className="h-8 w-8 text-purple-600 opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Analytics Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="engagement">Engajamento</TabsTrigger>
          <TabsTrigger value="conversion">Conversão</TabsTrigger>
          <TabsTrigger value="geographic">Geográfico</TabsTrigger>
          <TabsTrigger value="comparison">Comparação</TabsTrigger>
          <TabsTrigger value="sentiment">Sentimento</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Desempenho ao Longo do Tempo</CardTitle>
              <CardDescription>
                Métricas principais das campanhas nos últimos 30 dias
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis
                      dataKey="date"
                      tickFormatter={(value) => {
                        const date = new Date(value);
                        return `${date.getDate()}/${date.getMonth() + 1}`;
                      }}
                      className="text-xs"
                    />
                    <YAxis className="text-xs" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="sent"
                      stackId="1"
                      stroke="var(--chart-1)"
                      fill="var(--chart-1)"
                      fillOpacity={0.2}
                      name="Enviadas"
                    />
                    <Area
                      type="monotone"
                      dataKey="delivered"
                      stackId="1"
                      stroke="var(--chart-2)"
                      fill="var(--chart-2)"
                      fillOpacity={0.2}
                      name="Entregues"
                    />
                    <Area
                      type="monotone"
                      dataKey="opened"
                      stackId="1"
                      stroke="var(--chart-3)"
                      fill="var(--chart-3)"
                      fillOpacity={0.2}
                      name="Abertas"
                    />
                    <Area
                      type="monotone"
                      dataKey="replied"
                      stackId="1"
                      stroke="var(--chart-5)"
                      fill="var(--chart-5)"
                      fillOpacity={0.2}
                      name="Respondidas"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Funil de Conversão</CardTitle>
                <CardDescription>
                  Taxa de conversão em cada etapa do funil
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {funnelData.map((item, index) => {
                    const percentage = index === 0 ? 100 : (item.value / funnelData[0].value) * 100;
                    const previousValue = index === 0 ? item.value : funnelData[index - 1].value;
                    const dropoffRate = index === 0 ? 0 : ((previousValue - item.value) / previousValue) * 100;

                    return (
                      <div key={item.name} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">{item.name}</span>
                          <div className="flex items-center gap-4">
                            <span className="text-muted-foreground">
                              {item.value.toLocaleString()}
                            </span>
                            <Badge variant={index === 0 ? "default" : dropoffRate > 50 ? "destructive" : "secondary"}>
                              {percentage.toFixed(1)}%
                            </Badge>
                          </div>
                        </div>
                        <Progress value={percentage} className="h-2" />
                        {index > 0 && (
                          <p className="text-xs text-muted-foreground">
                            Drop-off: {dropoffRate.toFixed(1)}%
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Dispositivos</CardTitle>
                <CardDescription>
                  Distribuição por tipo de dispositivo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={deviceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ value }) => `${value}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {deviceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
                <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                  {deviceData.map((device) => (
                    <div key={device.name}>
                      <p className="text-xs text-muted-foreground">{device.name}</p>
                      <p className="text-lg font-bold">{device.value}%</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Engagement Tab */}
        <TabsContent value="engagement" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Análise por Horário</CardTitle>
              <CardDescription>
                Melhores horários para engajamento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={timeOfDayData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="hour" className="text-xs" />
                    <YAxis className="text-xs" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="openRate"
                      stroke="var(--chart-3)"
                      strokeWidth={2}
                      dot={false}
                      name="Taxa de Abertura (%)"
                    />
                    <Line
                      type="monotone"
                      dataKey="responseRate"
                      stroke="var(--chart-5)"
                      strokeWidth={2}
                      dot={false}
                      name="Taxa de Resposta (%)"
                    />
                    <Line
                      type="monotone"
                      dataKey="conversionRate"
                      stroke="var(--chart-positive)"
                      strokeWidth={2}
                      dot={false}
                      name="Taxa de Conversão (%)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Engajamento por Segmento</CardTitle>
              <CardDescription>
                Comparação de métricas entre diferentes segmentos de público
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={segmentEngagement}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="segment" className="text-xs" />
                    <YAxis className="text-xs" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="openRate" fill="var(--chart-3)" name="Abertura (%)" />
                    <Bar dataKey="clickRate" fill="var(--chart-4)" name="Cliques (%)" />
                    <Bar dataKey="responseRate" fill="var(--chart-5)" name="Respostas (%)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Conversion Tab */}
        <TabsContent value="conversion" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Taxa de Conversão Média</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">3.2%</p>
                <Progress value={32} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  Meta: 5% | Faltam 1.8 pontos percentuais
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Custo por Conversão</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">R$ 2,45</p>
                <p className="text-xs text-green-600 mt-1">↓ 15% vs. mês anterior</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Economia de R$ 0,43 por conversão
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">ROI da Campanha</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">285%</p>
                <p className="text-xs text-green-600 mt-1">↑ 45% vs. mês anterior</p>
                <p className="text-xs text-muted-foreground mt-2">
                  R$ 2,85 de retorno para cada R$ 1 investido
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Jornada de Conversão</CardTitle>
              <CardDescription>
                Tempo médio entre cada etapa do funil
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-chart-1/20 flex items-center justify-center">
                      <Send className="h-5 w-5 text-chart-1" />
                    </div>
                    <div>
                      <p className="font-medium">Envio → Entrega</p>
                      <p className="text-sm text-muted-foreground">Tempo médio</p>
                    </div>
                  </div>
                  <Badge>~1 min</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-chart-2/20 flex items-center justify-center">
                      <Eye className="h-5 w-5 text-chart-2" />
                    </div>
                    <div>
                      <p className="font-medium">Entrega → Abertura</p>
                      <p className="text-sm text-muted-foreground">Tempo médio</p>
                    </div>
                  </div>
                  <Badge>~15 min</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-chart-3/20 flex items-center justify-center">
                      <MousePointer className="h-5 w-5 text-chart-3" />
                    </div>
                    <div>
                      <p className="font-medium">Abertura → Clique</p>
                      <p className="text-sm text-muted-foreground">Tempo médio</p>
                    </div>
                  </div>
                  <Badge>~2 min</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-chart-5/20 flex items-center justify-center">
                      <Reply className="h-5 w-5 text-chart-5" />
                    </div>
                    <div>
                      <p className="font-medium">Clique → Resposta</p>
                      <p className="text-sm text-muted-foreground">Tempo médio</p>
                    </div>
                  </div>
                  <Badge>~8 min</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-950 flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Resposta → Conversão</p>
                      <p className="text-sm text-muted-foreground">Tempo médio</p>
                    </div>
                  </div>
                  <Badge variant="default">~2 dias</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Geographic Tab */}
        <TabsContent value="geographic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Distribuição Geográfica</CardTitle>
              <CardDescription>
                Desempenho das campanhas por região
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={geoData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis type="number" className="text-xs" />
                    <YAxis type="category" dataKey="region" className="text-xs" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="value" fill="var(--chart-1)" name="Alcance (%)" />
                    <Bar dataKey="engagementRate" fill="var(--chart-positive)" name="Taxa de Engajamento (%)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 lg:grid-cols-3">
            {geoData.slice(0, 3).map((region, index) => (
              <Card key={region.region}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">{region.region}</CardTitle>
                    <Badge variant={index === 0 ? "default" : "secondary"}>
                      #{index + 1}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Alcance</span>
                      <span className="font-medium">{region.value}%</span>
                    </div>
                    <Progress value={region.value} className="h-2" />
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Engajamento</span>
                      <span className="font-medium">{region.engagementRate}%</span>
                    </div>
                    <Progress value={region.engagementRate} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Comparison Tab */}
        <TabsContent value="comparison" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Comparação entre Campanhas</CardTitle>
              <CardDescription>
                Análise comparativa das principais campanhas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2 font-medium">Campanha</th>
                      <th className="text-right p-2 font-medium">Enviadas</th>
                      <th className="text-right p-2 font-medium">Entregues</th>
                      <th className="text-right p-2 font-medium">Abertas</th>
                      <th className="text-right p-2 font-medium">Respondidas</th>
                      <th className="text-right p-2 font-medium">Sentimento</th>
                      <th className="text-right p-2 font-medium">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campaignComparison.map((campaign, index) => {
                      const deliveryRate = (campaign.delivered / campaign.sent * 100).toFixed(1);
                      const openRate = (campaign.opened / campaign.delivered * 100).toFixed(1);
                      const responseRate = (campaign.responded / campaign.opened * 100).toFixed(1);
                      const score = Math.round((parseFloat(deliveryRate) + parseFloat(openRate) + parseFloat(responseRate) + campaign.sentiment) / 4);

                      return (
                        <tr key={campaign.name} className="border-b">
                          <td className="p-2">
                            <div className="flex items-center gap-2">
                              <div className={cn(
                                "w-2 h-2 rounded-full",
                                index === 0 ? "bg-green-500" :
                                index === 1 ? "bg-blue-500" :
                                index === 2 ? "bg-purple-500" : "bg-gray-500"
                              )} />
                              <span className="font-medium">{campaign.name}</span>
                            </div>
                          </td>
                          <td className="text-right p-2">
                            {campaign.sent.toLocaleString()}
                          </td>
                          <td className="text-right p-2">
                            <div>
                              <p>{campaign.delivered.toLocaleString()}</p>
                              <p className="text-xs text-muted-foreground">{deliveryRate}%</p>
                            </div>
                          </td>
                          <td className="text-right p-2">
                            <div>
                              <p>{campaign.opened.toLocaleString()}</p>
                              <p className="text-xs text-muted-foreground">{openRate}%</p>
                            </div>
                          </td>
                          <td className="text-right p-2">
                            <div>
                              <p>{campaign.responded.toLocaleString()}</p>
                              <p className="text-xs text-muted-foreground">{responseRate}%</p>
                            </div>
                          </td>
                          <td className="text-right p-2">
                            <div className="flex items-center justify-end gap-1">
                              {campaign.sentiment >= 70 ? (
                                <ThumbsUp className="h-4 w-4 text-green-600" />
                              ) : campaign.sentiment >= 50 ? (
                                <Activity className="h-4 w-4 text-yellow-600" />
                              ) : (
                                <ThumbsDown className="h-4 w-4 text-red-600" />
                              )}
                              <span>{campaign.sentiment}%</span>
                            </div>
                          </td>
                          <td className="text-right p-2">
                            <Badge variant={score >= 70 ? "default" : score >= 50 ? "secondary" : "destructive"}>
                              {score}
                            </Badge>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Radar de Performance</CardTitle>
              <CardDescription>
                Comparação multidimensional entre campanhas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={[
                    { metric: 'Taxa de Entrega', A: 85, B: 82, C: 90, D: 88 },
                    { metric: 'Taxa de Abertura', A: 59, B: 47, C: 67, D: 44 },
                    { metric: 'Taxa de Clique', A: 22, B: 15, C: 30, D: 18 },
                    { metric: 'Taxa de Resposta', A: 16, B: 12, C: 20, D: 8 },
                    { metric: 'Sentimento Positivo', A: 75, B: 62, C: 88, D: 70 },
                    { metric: 'Conversão', A: 8, B: 5, C: 12, D: 6 },
                  ]}>
                    <PolarGrid strokeDasharray="3 3" />
                    <PolarAngleAxis dataKey="metric" className="text-xs" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar name="Consulta Eleitoral" dataKey="A" stroke="var(--chart-1)" fill="var(--chart-1)" fillOpacity={0.3} />
                    <Radar name="Pesquisa Temática" dataKey="B" stroke="var(--chart-2)" fill="var(--chart-2)" fillOpacity={0.3} />
                    <Radar name="Convite Evento" dataKey="C" stroke="var(--chart-3)" fill="var(--chart-3)" fillOpacity={0.3} />
                    <Radar name="Informativo" dataKey="D" stroke="var(--chart-4)" fill="var(--chart-4)" fillOpacity={0.3} />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sentiment Tab */}
        <TabsContent value="sentiment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Análise de Sentimento das Respostas</CardTitle>
              <CardDescription>
                Evolução do sentimento ao longo da última semana
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={sentimentTrend}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="date" className="text-xs" />
                    <YAxis className="text-xs" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="positive"
                      stackId="1"
                      stroke="var(--chart-positive)"
                      fill="var(--chart-positive)"
                      fillOpacity={0.6}
                      name="Positivo"
                    />
                    <Area
                      type="monotone"
                      dataKey="neutral"
                      stackId="1"
                      stroke="var(--chart-neutral)"
                      fill="var(--chart-neutral)"
                      fillOpacity={0.6}
                      name="Neutro"
                    />
                    <Area
                      type="monotone"
                      dataKey="negative"
                      stackId="1"
                      stroke="var(--chart-negative)"
                      fill="var(--chart-negative)"
                      fillOpacity={0.6}
                      name="Negativo"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 lg:grid-cols-3">
            <Card className="border-green-200 dark:border-green-800">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">Respostas Positivas</CardTitle>
                  <ThumbsUp className="h-4 w-4 text-green-600" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-green-600">68%</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Principais temas: Apoio, Proposta, Mudança
                </p>
                <Progress value={68} className="mt-3 h-2" />
              </CardContent>
            </Card>

            <Card className="border-gray-200 dark:border-gray-800">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">Respostas Neutras</CardTitle>
                  <Activity className="h-4 w-4 text-gray-600" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-gray-600">22%</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Principais temas: Dúvida, Informação, Aguardando
                </p>
                <Progress value={22} className="mt-3 h-2" />
              </CardContent>
            </Card>

            <Card className="border-red-200 dark:border-red-800">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">Respostas Negativas</CardTitle>
                  <ThumbsDown className="h-4 w-4 text-red-600" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-red-600">10%</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Principais temas: Crítica, Desconfiança, Reclamação
                </p>
                <Progress value={10} className="mt-3 h-2" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}