"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import {
  Search,
  Filter,
  Download,
  RefreshCw,
  CalendarIcon,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Star,
  Zap,
  Eye,
  MessageSquare,
  Share2,
  ThumbsUp,
  ThumbsDown,
  Users,
  Target,
  BarChart3,
  Activity,
  Flame,
  Lightbulb,
  Shield,
  Flag,
  Volume2,
  Hash,
  AtSign,
  ExternalLink,
  MoreHorizontal,
  BookOpen,
  Newspaper,
  Radio,
  Tv,
  Globe,
  MapPin,
  Clock4,
  Bell,
  AlertCircle,
} from "lucide-react";

interface Narrative {
  id: string;
  title: string;
  description: string;
  category: "emerging" | "trending" | "declining" | "stable";
  sentiment: "positive" | "negative" | "neutral" | "mixed";
  strength: number; // 1-10
  velocity: number; // growth rate
  reach: number;
  mentions: number;
  keywords: string[];
  sources: string[];
  startDate: Date;
  peakDate?: Date;
  geography: string[];
  demographics: {
    ageGroups: { group: string; percentage: number }[];
    gender: { male: number; female: number };
    education: { group: string; percentage: number }[];
  };
  relatedTopics: string[];
  credibilityScore: number;
  riskLevel: "low" | "medium" | "high" | "critical";
}

export default function EmergingNarrativesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTimeframe, setSelectedTimeframe] = useState("24h");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRisk, setSelectedRisk] = useState("all");
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  });

  // Mock data for emerging narratives
  const narratives: Narrative[] = [
    {
      id: "1",
      title: "Reforma do Transporte Público Digital",
      description: "Narrativa crescente sobre a implementação de tecnologia digital no transporte público, incluindo aplicativos de rastreamento e pagamento digital.",
      category: "emerging",
      sentiment: "positive",
      strength: 8.5,
      velocity: 45.3,
      reach: 2340000,
      mentions: 15420,
      keywords: ["transporte digital", "app", "mobilidade urbana", "tecnologia pública"],
      sources: ["Twitter", "Instagram", "Blogs", "Notícias"],
      startDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      geography: ["São Paulo", "Rio de Janeiro", "Belo Horizonte"],
      demographics: {
        ageGroups: [
          { group: "18-25", percentage: 35 },
          { group: "26-35", percentage: 40 },
          { group: "36-50", percentage: 20 },
          { group: "50+", percentage: 5 },
        ],
        gender: { male: 52, female: 48 },
        education: [
          { group: "Superior", percentage: 45 },
          { group: "Médio", percentage: 40 },
          { group: "Fundamental", percentage: 15 },
        ],
      },
      relatedTopics: ["Mobilidade", "Tecnologia", "Smart Cities"],
      credibilityScore: 7.8,
      riskLevel: "low",
    },
    {
      id: "2",
      title: "Críticas ao Sistema de Saúde Pública",
      description: "Crescimento de narrativas críticas sobre a eficiência do sistema de saúde pública, especialmente em relação a filas e tempo de espera.",
      category: "trending",
      sentiment: "negative",
      strength: 9.2,
      velocity: 23.7,
      reach: 3450000,
      mentions: 28950,
      keywords: ["SUS", "filas", "saúde pública", "atendimento médico"],
      sources: ["Facebook", "Twitter", "WhatsApp", "Notícias"],
      startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      peakDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      geography: ["Todo o Brasil"],
      demographics: {
        ageGroups: [
          { group: "18-25", percentage: 15 },
          { group: "26-35", percentage: 25 },
          { group: "36-50", percentage: 35 },
          { group: "50+", percentage: 25 },
        ],
        gender: { male: 45, female: 55 },
        education: [
          { group: "Superior", percentage: 30 },
          { group: "Médio", percentage: 45 },
          { group: "Fundamental", percentage: 25 },
        ],
      },
      relatedTopics: ["Saúde", "Governo", "Políticas Públicas"],
      credibilityScore: 8.5,
      riskLevel: "high",
    },
    {
      id: "3",
      title: "Educação Híbrida Pós-Pandemia",
      description: "Discussão sobre a manutenção de elementos de educação digital mesmo após o retorno completo às aulas presenciais.",
      category: "stable",
      sentiment: "mixed",
      strength: 6.8,
      velocity: 8.2,
      reach: 1890000,
      mentions: 12340,
      keywords: ["educação híbrida", "ensino digital", "tecnologia educacional"],
      sources: ["LinkedIn", "Blogs Educacionais", "Notícias"],
      startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      geography: ["São Paulo", "Rio de Janeiro", "Brasília", "Porto Alegre"],
      demographics: {
        ageGroups: [
          { group: "18-25", percentage: 20 },
          { group: "26-35", percentage: 45 },
          { group: "36-50", percentage: 30 },
          { group: "50+", percentage: 5 },
        ],
        gender: { male: 40, female: 60 },
        education: [
          { group: "Superior", percentage: 70 },
          { group: "Médio", percentage: 25 },
          { group: "Fundamental", percentage: 5 },
        ],
      },
      relatedTopics: ["Educação", "Tecnologia", "Pandemia"],
      credibilityScore: 7.2,
      riskLevel: "medium",
    },
    {
      id: "4",
      title: "Desconfiança em Pesquisas Eleitorais",
      description: "Narrativa crescente questionando a precisão e metodologia das pesquisas eleitorais, especialmente após divergências em eleições recentes.",
      category: "trending",
      sentiment: "negative",
      strength: 7.9,
      velocity: 67.4,
      reach: 4200000,
      mentions: 35670,
      keywords: ["pesquisas eleitorais", "metodologia", "confiabilidade", "eleições"],
      sources: ["Twitter", "Facebook", "WhatsApp", "YouTube"],
      startDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      geography: ["Todo o Brasil"],
      demographics: {
        ageGroups: [
          { group: "18-25", percentage: 25 },
          { group: "26-35", percentage: 30 },
          { group: "36-50", percentage: 25 },
          { group: "50+", percentage: 20 },
        ],
        gender: { male: 58, female: 42 },
        education: [
          { group: "Superior", percentage: 35 },
          { group: "Médio", percentage: 50 },
          { group: "Fundamental", percentage: 15 },
        ],
      },
      relatedTopics: ["Eleições", "Mídia", "Democracia"],
      credibilityScore: 6.5,
      riskLevel: "critical",
    },
    {
      id: "5",
      title: "Sustentabilidade Urbana e Cidades Verdes",
      description: "Crescimento do interesse em políticas de sustentabilidade urbana, incluindo áreas verdes, energia renovável e gestão de resíduos.",
      category: "emerging",
      sentiment: "positive",
      strength: 7.5,
      velocity: 34.8,
      reach: 1650000,
      mentions: 9870,
      keywords: ["cidades verdes", "sustentabilidade", "energia renovável", "meio ambiente"],
      sources: ["Instagram", "LinkedIn", "Blogs", "Notícias"],
      startDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      geography: ["São Paulo", "Curitiba", "Florianópolis", "Brasília"],
      demographics: {
        ageGroups: [
          { group: "18-25", percentage: 40 },
          { group: "26-35", percentage: 35 },
          { group: "36-50", percentage: 20 },
          { group: "50+", percentage: 5 },
        ],
        gender: { male: 45, female: 55 },
        education: [
          { group: "Superior", percentage: 60 },
          { group: "Médio", percentage: 35 },
          { group: "Fundamental", percentage: 5 },
        ],
      },
      relatedTopics: ["Meio Ambiente", "Urbanismo", "Sustentabilidade"],
      credibilityScore: 8.2,
      riskLevel: "low",
    },
  ];

  const narrativeGrowth = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return {
      date: date.toLocaleDateString('pt-BR', { weekday: 'short' }),
      emerging: Math.floor(Math.random() * 50) + 20,
      trending: Math.floor(Math.random() * 30) + 40,
      declining: Math.floor(Math.random() * 20) + 5,
      stable: Math.floor(Math.random() * 25) + 15,
    };
  });

  const sentimentDistribution = [
    { name: "Positivo", value: 35, color: "var(--chart-positive)" },
    { name: "Neutro", value: 40, color: "var(--chart-neutral)" },
    { name: "Negativo", value: 20, color: "var(--chart-negative)" },
    { name: "Misto", value: 5, color: "var(--chart-4)" },
  ];

  const topKeywords = [
    { keyword: "transporte público", mentions: 45670, growth: 23.4 },
    { keyword: "saúde digital", mentions: 38920, growth: 67.8 },
    { keyword: "educação híbrida", mentions: 31250, growth: 12.1 },
    { keyword: "sustentabilidade", mentions: 28940, growth: 45.6 },
    { keyword: "pesquisas eleitorais", mentions: 25680, growth: -15.3 },
    { keyword: "segurança pública", mentions: 23450, growth: 8.9 },
  ];

  const riskMatrix = [
    { narrative: "Reforma Transporte", impact: 7, probability: 6 },
    { narrative: "Críticas SUS", impact: 9, probability: 8 },
    { narrative: "Educação Híbrida", impact: 6, probability: 5 },
    { narrative: "Pesquisas Eleitorais", impact: 8, probability: 9 },
    { narrative: "Cidades Verdes", impact: 5, probability: 4 },
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "emerging": return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "trending": return <Flame className="h-4 w-4 text-orange-600" />;
      case "declining": return <TrendingDown className="h-4 w-4 text-red-600" />;
      case "stable": return <Activity className="h-4 w-4 text-blue-600" />;
      default: return <BarChart3 className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "emerging": return "text-green-600 bg-green-100 dark:bg-green-950";
      case "trending": return "text-orange-600 bg-orange-100 dark:bg-orange-950";
      case "declining": return "text-red-600 bg-red-100 dark:bg-red-950";
      case "stable": return "text-blue-600 bg-blue-100 dark:bg-blue-950";
      default: return "text-gray-600 bg-gray-100 dark:bg-gray-950";
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low": return "text-green-600 bg-green-100 dark:bg-green-950";
      case "medium": return "text-yellow-600 bg-yellow-100 dark:bg-yellow-950";
      case "high": return "text-orange-600 bg-orange-100 dark:bg-orange-950";
      case "critical": return "text-red-600 bg-red-100 dark:bg-red-950";
      default: return "text-gray-600 bg-gray-100 dark:bg-gray-950";
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "positive": return <ThumbsUp className="h-4 w-4 text-green-600" />;
      case "negative": return <ThumbsDown className="h-4 w-4 text-red-600" />;
      case "mixed": return <Activity className="h-4 w-4 text-yellow-600" />;
      default: return <MessageSquare className="h-4 w-4 text-gray-600" />;
    }
  };

  const chartConfig = {
    emerging: { label: "Emergentes", color: "var(--chart-positive)" },
    trending: { label: "Em Alta", color: "var(--chart-1)" },
    declining: { label: "Em Declínio", color: "var(--chart-negative)" },
    stable: { label: "Estáveis", color: "var(--chart-3)" },
  };

  const filteredNarratives = narratives.filter(narrative =>
    (selectedCategory === "all" || narrative.category === selectedCategory) &&
    (selectedRisk === "all" || narrative.riskLevel === selectedRisk) &&
    (searchQuery === "" ||
      narrative.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      narrative.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      narrative.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  );

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Narrativas Emergentes</h1>
          <p className="text-muted-foreground">
            Detecte e analise narrativas políticas em tempo real
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
                  "Período"
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
                onSelect={(range: any) => setDateRange(range || { from: undefined, to: undefined })}
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
            Relatório
          </Button>
          <Button>
            <RefreshCw className="mr-2 h-4 w-4" />
            Atualizar
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar narrativas, palavras-chave ou tópicos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="emerging">Emergentes</SelectItem>
            <SelectItem value="trending">Em Alta</SelectItem>
            <SelectItem value="stable">Estáveis</SelectItem>
            <SelectItem value="declining">Em Declínio</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedRisk} onValueChange={setSelectedRisk}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Risco" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="low">Baixo</SelectItem>
            <SelectItem value="medium">Médio</SelectItem>
            <SelectItem value="high">Alto</SelectItem>
            <SelectItem value="critical">Crítico</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Narrativas Ativas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">127</p>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">↑ 15</span> novas hoje
                </p>
              </div>
              <Activity className="h-8 w-8 text-muted-foreground opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Alcance Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">15.2M</p>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">↑ 8.7%</span> vs. ontem
                </p>
              </div>
              <Users className="h-8 w-8 text-muted-foreground opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Velocidade Média</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">+34.2%</p>
                <p className="text-xs text-muted-foreground">
                  crescimento/24h
                </p>
              </div>
              <Zap className="h-8 w-8 text-muted-foreground opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Alertas Críticos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-red-600">3</p>
                <p className="text-xs text-muted-foreground">
                  requerem atenção
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600 opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="narratives" className="space-y-6">
        <TabsList>
          <TabsTrigger value="narratives">Narrativas</TabsTrigger>
          <TabsTrigger value="analytics">Análise</TabsTrigger>
          <TabsTrigger value="keywords">Palavras-Chave</TabsTrigger>
          <TabsTrigger value="risk">Matriz de Risco</TabsTrigger>
        </TabsList>

        {/* Narratives Tab */}
        <TabsContent value="narratives" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Narrativas em Tempo Real</CardTitle>
                  <CardDescription>
                    {filteredNarratives.length} narrativas encontradas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[700px] pr-4">
                    <div className="space-y-6">
                      {filteredNarratives.map((narrative) => (
                        <div key={narrative.id} className="border rounded-lg p-6 hover:bg-muted/50 transition-colors">
                          <div className="space-y-4">
                            {/* Header */}
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <h3 className="font-semibold text-lg">{narrative.title}</h3>
                                  <Badge className={getCategoryColor(narrative.category)}>
                                    {getCategoryIcon(narrative.category)}
                                    <span className="ml-1">
                                      {narrative.category === "emerging" ? "Emergente" :
                                       narrative.category === "trending" ? "Em Alta" :
                                       narrative.category === "declining" ? "Declínio" : "Estável"}
                                    </span>
                                  </Badge>
                                  <Badge className={getRiskColor(narrative.riskLevel)}>
                                    {narrative.riskLevel === "low" ? "Baixo" :
                                     narrative.riskLevel === "medium" ? "Médio" :
                                     narrative.riskLevel === "high" ? "Alto" : "Crítico"}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mb-3">
                                  {narrative.description}
                                </p>
                              </div>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </div>

                            {/* Metrics */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                              <div>
                                <p className="text-sm text-muted-foreground">Força</p>
                                <p className="text-lg font-bold">{narrative.strength}/10</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Velocidade</p>
                                <p className="text-lg font-bold text-green-600">+{narrative.velocity}%</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Alcance</p>
                                <p className="text-lg font-bold">{(narrative.reach / 1000000).toFixed(1)}M</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Menções</p>
                                <p className="text-lg font-bold">{narrative.mentions.toLocaleString()}</p>
                              </div>
                            </div>

                            {/* Keywords and Sentiment */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                {getSentimentIcon(narrative.sentiment)}
                                <span className="text-sm">
                                  {narrative.sentiment === "positive" ? "Positivo" :
                                   narrative.sentiment === "negative" ? "Negativo" :
                                   narrative.sentiment === "mixed" ? "Misto" : "Neutro"}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Shield className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">Credibilidade: {narrative.credibilityScore}/10</span>
                              </div>
                            </div>

                            {/* Keywords */}
                            <div className="flex flex-wrap gap-2">
                              {narrative.keywords.slice(0, 4).map((keyword) => (
                                <Badge key={keyword} variant="outline" className="text-xs">
                                  #{keyword}
                                </Badge>
                              ))}
                              {narrative.keywords.length > 4 && (
                                <Badge variant="outline" className="text-xs">
                                  +{narrative.keywords.length - 4}
                                </Badge>
                              )}
                            </div>

                            {/* Geography and Sources */}
                            <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                <span>{narrative.geography.slice(0, 2).join(", ")}
                                  {narrative.geography.length > 2 && ` +${narrative.geography.length - 2}`}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Radio className="h-4 w-4" />
                                <span>{narrative.sources.slice(0, 2).join(", ")}
                                  {narrative.sources.length > 2 && ` +${narrative.sources.length - 2}`}
                                </span>
                              </div>
                            </div>

                            {/* Timeline */}
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Clock4 className="h-3 w-3" />
                              <span>Iniciada há {Math.floor((Date.now() - narrative.startDate.getTime()) / (1000 * 60 * 60 * 24))} dias</span>
                              {narrative.peakDate && (
                                <span>• Pico há {Math.floor((Date.now() - narrative.peakDate.getTime()) / (1000 * 60 * 60 * 24))} dias</span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              {/* Category Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Distribuição por Categoria</CardTitle>
                  <CardDescription>Narrativas por tipo</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: "Emergentes", value: narratives.filter(n => n.category === "emerging").length, color: "var(--chart-positive)" },
                            { name: "Em Alta", value: narratives.filter(n => n.category === "trending").length, color: "var(--chart-1)" },
                            { name: "Estáveis", value: narratives.filter(n => n.category === "stable").length, color: "var(--chart-3)" },
                            { name: "Declínio", value: narratives.filter(n => n.category === "declining").length, color: "var(--chart-negative)" },
                          ]}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ value }) => value}
                          outerRadius={60}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {[1,2,3,4].map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={["var(--chart-positive)", "var(--chart-1)", "var(--chart-3)", "var(--chart-negative)"][index]} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Sentiment Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Distribuição de Sentimento</CardTitle>
                  <CardDescription>Polaridade das narrativas</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={sentimentDistribution}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ value }) => `${value}%`}
                          outerRadius={60}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {sentimentDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                  <div className="mt-4 grid grid-cols-2 gap-2 text-center">
                    {sentimentDistribution.map((item) => (
                      <div key={item.name}>
                        <p className="text-xs text-muted-foreground">{item.name}</p>
                        <p className="text-sm font-bold">{item.value}%</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Risk Alerts */}
              <Card className="border-red-200 dark:border-red-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    Alertas Críticos
                  </CardTitle>
                  <CardDescription>Narrativas que requerem atenção</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {narratives.filter(n => n.riskLevel === "critical" || n.riskLevel === "high").map((narrative) => (
                      <div key={narrative.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{narrative.title}</p>
                          <p className="text-xs text-muted-foreground">
                            Risco: {narrative.riskLevel === "critical" ? "Crítico" : "Alto"}
                          </p>
                        </div>
                        <Badge className={getRiskColor(narrative.riskLevel)}>
                          <Bell className="mr-1 h-3 w-3" />
                          {narrative.riskLevel === "critical" ? "Crítico" : "Alto"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Evolução das Narrativas</CardTitle>
              <CardDescription>
                Crescimento por categoria nos últimos 7 dias
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={narrativeGrowth}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="date" className="text-xs" />
                    <YAxis className="text-xs" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="emerging"
                      stackId="1"
                      stroke="var(--chart-positive)"
                      fill="var(--chart-positive)"
                      fillOpacity={0.6}
                      name="Emergentes"
                    />
                    <Area
                      type="monotone"
                      dataKey="trending"
                      stackId="1"
                      stroke="var(--chart-1)"
                      fill="var(--chart-1)"
                      fillOpacity={0.6}
                      name="Em Alta"
                    />
                    <Area
                      type="monotone"
                      dataKey="stable"
                      stackId="1"
                      stroke="var(--chart-3)"
                      fill="var(--chart-3)"
                      fillOpacity={0.6}
                      name="Estáveis"
                    />
                    <Area
                      type="monotone"
                      dataKey="declining"
                      stackId="1"
                      stroke="var(--chart-negative)"
                      fill="var(--chart-negative)"
                      fillOpacity={0.6}
                      name="Em Declínio"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Força vs Velocidade</CardTitle>
                <CardDescription>
                  Comparação de narrativas por força e velocidade de crescimento
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {narratives.slice(0, 5).map((narrative) => (
                    <div key={narrative.id} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{narrative.title}</span>
                        <div className="flex items-center gap-2">
                          <span>F: {narrative.strength}</span>
                          <span>V: +{narrative.velocity}%</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Progress value={narrative.strength * 10} className="h-2" />
                        <Progress value={Math.min(narrative.velocity, 100)} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Origem Geográfica</CardTitle>
                <CardDescription>
                  Distribuição das narrativas por região
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { region: "São Paulo", count: 45, percentage: 35 },
                    { region: "Rio de Janeiro", count: 32, percentage: 25 },
                    { region: "Nacional", count: 28, percentage: 22 },
                    { region: "Minas Gerais", count: 15, percentage: 12 },
                    { region: "Outras", count: 7, percentage: 6 },
                  ].map((item) => (
                    <div key={item.region} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{item.region}</span>
                        <span>{item.count} narrativas ({item.percentage}%)</span>
                      </div>
                      <Progress value={item.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Keywords Tab */}
        <TabsContent value="keywords" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Palavras-Chave em Destaque</CardTitle>
              <CardDescription>
                Termos mais mencionados nas narrativas emergentes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topKeywords.map((item, index) => (
                  <div key={item.keyword} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <span className="text-lg font-bold text-muted-foreground">#{index + 1}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">#{item.keyword}</span>
                          <Badge variant="outline" className="text-xs">
                            {item.mentions.toLocaleString()} menções
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Progress value={Math.min(Math.abs(item.growth), 100)} className="w-32 h-2" />
                          <span className={cn(
                            "text-xs font-medium",
                            item.growth > 0 ? "text-green-600" : "text-red-600"
                          )}>
                            {item.growth > 0 ? "↑" : "↓"} {Math.abs(item.growth)}%
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Search className="mr-1 h-3 w-3" />
                      Explorar
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Risk Matrix Tab */}
        <TabsContent value="risk" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Matriz de Risco</CardTitle>
              <CardDescription>
                Análise de impacto vs. probabilidade das narrativas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 lg:grid-cols-2">
                <div>
                  <h4 className="font-medium mb-4">Posicionamento no Risco</h4>
                  <div className="relative h-80 border rounded-lg bg-gradient-to-tr from-green-50 via-yellow-50 to-red-50 dark:from-green-950 dark:via-yellow-950 dark:to-red-950">
                    {/* Grid lines */}
                    <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 opacity-20">
                      {Array.from({ length: 100 }).map((_, i) => (
                        <div key={i} className="border border-gray-300 dark:border-gray-700" />
                      ))}
                    </div>

                    {/* Axis labels */}
                    <div className="absolute -left-16 top-1/2 -rotate-90 text-sm font-medium">Impacto</div>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-6 text-sm font-medium">Probabilidade</div>

                    {/* Risk zones */}
                    <div className="absolute top-2 left-2 text-xs font-medium text-green-600">Baixo</div>
                    <div className="absolute top-2 right-2 text-xs font-medium text-red-600">Alto</div>
                    <div className="absolute bottom-2 left-2 text-xs font-medium text-yellow-600">Médio</div>
                    <div className="absolute bottom-2 right-2 text-xs font-medium text-red-600">Crítico</div>

                    {/* Plot points */}
                    {riskMatrix.map((item, index) => (
                      <div
                        key={item.narrative}
                        className="absolute w-3 h-3 rounded-full bg-primary border-2 border-white shadow-lg"
                        style={{
                          left: `${item.probability * 10 - 1.5}%`,
                          bottom: `${item.impact * 10 - 1.5}%`,
                        }}
                        title={`${item.narrative}: Impacto ${item.impact}, Probabilidade ${item.probability}`}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-4">Classificação de Risco</h4>
                  <div className="space-y-3">
                    {narratives.map((narrative) => (
                      <div key={narrative.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{narrative.title}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-muted-foreground">
                              Força: {narrative.strength}/10
                            </span>
                            <span className="text-xs text-muted-foreground">
                              Credibilidade: {narrative.credibilityScore}/10
                            </span>
                          </div>
                        </div>
                        <Badge className={getRiskColor(narrative.riskLevel)}>
                          {narrative.riskLevel === "low" ? "Baixo" :
                           narrative.riskLevel === "medium" ? "Médio" :
                           narrative.riskLevel === "high" ? "Alto" : "Crítico"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}