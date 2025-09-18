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
} from "recharts";
import {
  Search,
  Filter,
  Download,
  RefreshCw,
  CalendarIcon,
  TrendingUp,
  TrendingDown,
  Heart,
  MessageCircle,
  Share2,
  Users,
  Eye,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Zap,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Star,
  MapPin,
  Hash,
  AtSign,
  ExternalLink,
  MoreHorizontal,
  Flag,
  Shield,
  Volume2,
  VolumeX,
  BarChart3,
  Activity,
  Smartphone,
  Monitor,
  Globe,
} from "lucide-react";

interface SocialPost {
  id: string;
  platform: "facebook" | "instagram" | "twitter" | "youtube" | "tiktok";
  author: string;
  authorHandle: string;
  authorAvatar: string;
  content: string;
  timestamp: Date;
  engagement: {
    likes: number;
    comments: number;
    shares: number;
    views?: number;
  };
  sentiment: "positive" | "negative" | "neutral";
  reach: number;
  relevanceScore: number;
  tags: string[];
  isVerified?: boolean;
}

export default function SocialMediaMonitoringPage() {
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const [selectedTimeframe, setSelectedTimeframe] = useState("24h");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSentiment, setSelectedSentiment] = useState("all");
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  });

  // Mock data for social media monitoring
  const platformData = [
    { name: "Facebook", posts: 1247, engagement: 85623, growth: 12.5, color: "#1877F2" },
    { name: "Instagram", posts: 892, engagement: 67341, growth: 18.7, color: "#E4405F" },
    { name: "Twitter", posts: 2341, engagement: 43210, growth: -5.2, color: "#1DA1F2" },
    { name: "YouTube", posts: 156, engagement: 123456, growth: 45.3, color: "#FF0000" },
    { name: "TikTok", posts: 623, engagement: 234567, growth: 89.2, color: "#000000" },
  ];

  const engagementTrend = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return {
      date: date.toLocaleDateString('pt-BR', { weekday: 'short' }),
      likes: Math.floor(Math.random() * 5000) + 2000,
      comments: Math.floor(Math.random() * 1500) + 500,
      shares: Math.floor(Math.random() * 800) + 200,
      mentions: Math.floor(Math.random() * 300) + 100,
    };
  });

  const sentimentData = [
    { name: "Positivo", value: 58, color: "var(--chart-positive)" },
    { name: "Neutro", value: 32, color: "var(--chart-neutral)" },
    { name: "Negativo", value: 10, color: "var(--chart-negative)" },
  ];

  const recentPosts: SocialPost[] = [
    {
      id: "1",
      platform: "twitter",
      author: "João Silva",
      authorHandle: "@joao_silva_sp",
      authorAvatar: "",
      content: "Excelente proposta para melhorar o transporte público! Finalmente alguém que entende as necessidades da população. #TransportePúblico #SP",
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      engagement: { likes: 234, comments: 45, shares: 67 },
      sentiment: "positive",
      reach: 12500,
      relevanceScore: 8.5,
      tags: ["Transporte", "Proposta", "SP"],
      isVerified: false,
    },
    {
      id: "2",
      platform: "facebook",
      author: "Maria Santos",
      authorHandle: "maria.santos.oficial",
      authorAvatar: "",
      content: "Participei hoje da reunião sobre segurança pública no bairro. Muitas preocupações legítimas foram levantadas pelos moradores.",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      engagement: { likes: 156, comments: 23, shares: 12 },
      sentiment: "neutral",
      reach: 8900,
      relevanceScore: 7.2,
      tags: ["Segurança", "Comunidade"],
      isVerified: true,
    },
    {
      id: "3",
      platform: "instagram",
      author: "Carlos Mendes",
      authorHandle: "@carlosmendes_oficial",
      authorAvatar: "",
      content: "Nossa equipe visitou as obras da nova escola. Em breve teremos mais 500 vagas para as crianças da região! 📚👶",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      engagement: { likes: 890, comments: 134, shares: 89, views: 15600 },
      sentiment: "positive",
      reach: 25400,
      relevanceScore: 9.1,
      tags: ["Educação", "Obras", "Crianças"],
      isVerified: true,
    },
    {
      id: "4",
      platform: "youtube",
      author: "Canal Político RJ",
      authorHandle: "@canalpoliticorj",
      authorAvatar: "",
      content: "Análise: As propostas de mobilidade urbana apresentadas esta semana. O que realmente pode funcionar?",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      engagement: { likes: 1245, comments: 234, shares: 456, views: 67890 },
      sentiment: "neutral",
      reach: 89000,
      relevanceScore: 8.8,
      tags: ["Análise", "Mobilidade", "RJ"],
      isVerified: true,
    },
    {
      id: "5",
      platform: "tiktok",
      author: "Jovem Político",
      authorHandle: "@jovempolitico",
      authorAvatar: "",
      content: "Explicando de forma simples como funciona o orçamento público da nossa cidade 💰🏛️",
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      engagement: { likes: 3456, comments: 567, shares: 890, views: 145000 },
      sentiment: "positive",
      reach: 234000,
      relevanceScore: 7.9,
      tags: ["Educação", "Orçamento", "Jovem"],
      isVerified: false,
    },
  ];

  const topInfluencers = [
    { name: "Dr. Roberto Silva", handle: "@drroberto", followers: "2.3M", engagement: "8.5%", platform: "twitter", verified: true },
    { name: "Jornalista Ana", handle: "@ana_jornalista", followers: "1.8M", engagement: "12.3%", platform: "instagram", verified: true },
    { name: "Canal Notícias", handle: "@canalnoticas", followers: "950K", followers_count: 950000, engagement: "6.7%", platform: "youtube", verified: true },
    { name: "Ativista Maria", handle: "@ativista_maria", followers: "567K", engagement: "15.2%", platform: "facebook", verified: false },
    { name: "Político Jovem", handle: "@politico_jovem", followers: "1.2M", engagement: "18.9%", platform: "tiktok", verified: false },
  ];

  const trendingTopics = [
    { topic: "#EducaçãoPública", mentions: 15234, growth: 45.2, sentiment: "positive" },
    { topic: "#TransporteSP", mentions: 8765, growth: 23.1, sentiment: "neutral" },
    { topic: "#SegurançaRJ", mentions: 6543, growth: -12.3, sentiment: "negative" },
    { topic: "#SaúdeBrasil", mentions: 12098, growth: 34.5, sentiment: "positive" },
    { topic: "#MeioAmbiente", mentions: 4532, growth: 67.8, sentiment: "positive" },
  ];

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "facebook": return "📘";
      case "instagram": return "📷";
      case "twitter": return "🐦";
      case "youtube": return "📺";
      case "tiktok": return "🎵";
      default: return "📱";
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "facebook": return "text-blue-600";
      case "instagram": return "text-pink-600";
      case "twitter": return "text-sky-600";
      case "youtube": return "text-red-600";
      case "tiktok": return "text-gray-900";
      default: return "text-gray-600";
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "positive": return <ThumbsUp className="h-4 w-4 text-green-600" />;
      case "negative": return <ThumbsDown className="h-4 w-4 text-red-600" />;
      default: return <MessageSquare className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 60) {
      return `${diffInMinutes}m`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d`;
    }
  };

  const chartConfig = {
    likes: { label: "Curtidas", color: "var(--chart-1)" },
    comments: { label: "Comentários", color: "var(--chart-2)" },
    shares: { label: "Compartilhamentos", color: "var(--chart-3)" },
    mentions: { label: "Menções", color: "var(--chart-4)" },
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Monitoramento de Redes Sociais</h1>
          <p className="text-muted-foreground">
            Monitore menções, sentimentos e tendências em tempo real
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
            Exportar
          </Button>
          <Button>
            <RefreshCw className="mr-2 h-4 w-4" />
            Atualizar
          </Button>
        </div>
      </div>

      {/* Search and Quick Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por palavras-chave, hashtags ou usuários..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Plataforma" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="facebook">Facebook</SelectItem>
            <SelectItem value="instagram">Instagram</SelectItem>
            <SelectItem value="twitter">Twitter</SelectItem>
            <SelectItem value="youtube">YouTube</SelectItem>
            <SelectItem value="tiktok">TikTok</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedSentiment} onValueChange={setSelectedSentiment}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Sentimento" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="positive">Positivo</SelectItem>
            <SelectItem value="neutral">Neutro</SelectItem>
            <SelectItem value="negative">Negativo</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total de Menções</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">12,847</p>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">↑ 23.5%</span> vs. ontem
                </p>
              </div>
              <MessageSquare className="h-8 w-8 text-muted-foreground opacity-50" />
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
                <p className="text-2xl font-bold">2.3M</p>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">↑ 8.2%</span> vs. ontem
                </p>
              </div>
              <Eye className="h-8 w-8 text-muted-foreground opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Engajamento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">145K</p>
                <p className="text-xs text-muted-foreground">
                  <span className="text-red-600">↓ 2.1%</span> vs. ontem
                </p>
              </div>
              <Heart className="h-8 w-8 text-muted-foreground opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Sentimento Geral</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-green-600">Positivo</p>
                <p className="text-xs text-muted-foreground">
                  58% das menções
                </p>
              </div>
              <ThumbsUp className="h-8 w-8 text-green-600 opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="posts" className="space-y-6">
        <TabsList>
          <TabsTrigger value="posts">Posts Recentes</TabsTrigger>
          <TabsTrigger value="analytics">Análise</TabsTrigger>
          <TabsTrigger value="influencers">Influenciadores</TabsTrigger>
          <TabsTrigger value="trends">Tendências</TabsTrigger>
        </TabsList>

        {/* Recent Posts Tab */}
        <TabsContent value="posts" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Posts em Tempo Real</CardTitle>
                  <CardDescription>
                    Menções mais recentes e relevantes sobre temas políticos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[600px] pr-4">
                    <div className="space-y-4">
                      {recentPosts.map((post) => (
                        <div key={post.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                          <div className="flex items-start gap-3">
                            <div className="flex flex-col items-center gap-1">
                              <Avatar className="w-10 h-10">
                                <AvatarImage src={post.authorAvatar} />
                                <AvatarFallback>
                                  {post.author.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <span className={cn("text-lg", getPlatformColor(post.platform))}>
                                {getPlatformIcon(post.platform)}
                              </span>
                            </div>
                            <div className="flex-1 space-y-2">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-medium">{post.author}</span>
                                {post.isVerified && (
                                  <CheckCircle className="h-4 w-4 text-blue-600" />
                                )}
                                <span className="text-sm text-muted-foreground">
                                  @{post.authorHandle}
                                </span>
                                <span className="text-sm text-muted-foreground">
                                  {getTimeAgo(post.timestamp)}
                                </span>
                                {getSentimentIcon(post.sentiment)}
                                <Badge variant="outline" className="text-xs">
                                  {post.relevanceScore}/10
                                </Badge>
                              </div>
                              <p className="text-sm">{post.content}</p>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Heart className="h-4 w-4" />
                                  <span>{post.engagement.likes.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <MessageCircle className="h-4 w-4" />
                                  <span>{post.engagement.comments.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Share2 className="h-4 w-4" />
                                  <span>{post.engagement.shares.toLocaleString()}</span>
                                </div>
                                {post.engagement.views && (
                                  <div className="flex items-center gap-1">
                                    <Eye className="h-4 w-4" />
                                    <span>{post.engagement.views.toLocaleString()}</span>
                                  </div>
                                )}
                                <div className="flex items-center gap-1">
                                  <Users className="h-4 w-4" />
                                  <span>{post.reach.toLocaleString()}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-1 flex-wrap">
                                {post.tags.map((tag) => (
                                  <Badge key={tag} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              {/* Platform Overview */}
              <Card>
                <CardHeader>
                  <CardTitle>Por Plataforma</CardTitle>
                  <CardDescription>Volume de posts por rede social</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {platformData.map((platform) => (
                      <div key={platform.name} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-2">
                            <span className={getPlatformColor(platform.name.toLowerCase())}>
                              {getPlatformIcon(platform.name.toLowerCase())}
                            </span>
                            {platform.name}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{platform.posts}</span>
                            <span className={cn(
                              "text-xs",
                              platform.growth > 0 ? "text-green-600" : "text-red-600"
                            )}>
                              {platform.growth > 0 ? "↑" : "↓"} {Math.abs(platform.growth)}%
                            </span>
                          </div>
                        </div>
                        <Progress value={(platform.posts / Math.max(...platformData.map(p => p.posts))) * 100} />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Sentiment Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Distribuição de Sentimento</CardTitle>
                  <CardDescription>Últimas 24 horas</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={sentimentData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ value }) => `${value}%`}
                          outerRadius={60}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {sentimentData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                  <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                    {sentimentData.map((item) => (
                      <div key={item.name}>
                        <p className="text-xs text-muted-foreground">{item.name}</p>
                        <p className="text-lg font-bold">{item.value}%</p>
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
              <CardTitle>Engajamento ao Longo do Tempo</CardTitle>
              <CardDescription>
                Evolução das interações nas últimas 7 dias
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={engagementTrend}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="date" className="text-xs" />
                    <YAxis className="text-xs" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="likes"
                      stroke="var(--chart-1)"
                      strokeWidth={2}
                      dot={false}
                      name="Curtidas"
                    />
                    <Line
                      type="monotone"
                      dataKey="comments"
                      stroke="var(--chart-2)"
                      strokeWidth={2}
                      dot={false}
                      name="Comentários"
                    />
                    <Line
                      type="monotone"
                      dataKey="shares"
                      stroke="var(--chart-3)"
                      strokeWidth={2}
                      dot={false}
                      name="Compartilhamentos"
                    />
                    <Line
                      type="monotone"
                      dataKey="mentions"
                      stroke="var(--chart-4)"
                      strokeWidth={2}
                      dot={false}
                      name="Menções"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Performance por Plataforma</CardTitle>
                <CardDescription>
                  Engajamento total por rede social
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={platformData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="name" className="text-xs" />
                      <YAxis className="text-xs" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="engagement" fill="var(--chart-1)" name="Engajamento" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Horários de Maior Atividade</CardTitle>
                <CardDescription>
                  Distribuição de posts ao longo do dia
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-6 gap-2">
                  {Array.from({ length: 24 }, (_, i) => {
                    const activity = Math.floor(Math.random() * 100);
                    return (
                      <div key={i} className="text-center">
                        <div
                          className="w-full bg-muted rounded mb-1"
                          style={{ height: `${Math.max(activity * 0.4, 8)}px` }}
                        >
                          <div
                            className="bg-primary rounded"
                            style={{ height: `${activity * 0.4}%`, width: '100%' }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">{i}h</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Influencers Tab */}
        <TabsContent value="influencers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Influenciadores</CardTitle>
              <CardDescription>
                Perfis com maior impacto e engajamento político
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topInfluencers.map((influencer, index) => (
                  <div key={influencer.handle} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-muted-foreground">#{index + 1}</span>
                        <Avatar>
                          <AvatarFallback>
                            {influencer.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{influencer.name}</span>
                          {influencer.verified && (
                            <CheckCircle className="h-4 w-4 text-blue-600" />
                          )}
                          <span className={cn("text-sm", getPlatformColor(influencer.platform))}>
                            {getPlatformIcon(influencer.platform)}
                          </span>
                        </div>
                        <span className="text-sm text-muted-foreground">{influencer.handle}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 text-right">
                      <div>
                        <p className="text-sm font-medium">{influencer.followers}</p>
                        <p className="text-xs text-muted-foreground">seguidores</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{influencer.engagement}</p>
                        <p className="text-xs text-muted-foreground">engajamento</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="mr-1 h-3 w-3" />
                        Ver Perfil
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Trends Tab */}
        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Hashtags em Alta</CardTitle>
              <CardDescription>
                Tópicos mais mencionados nas últimas 24 horas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trendingTopics.map((topic, index) => (
                  <div key={topic.topic} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <span className="text-lg font-bold text-muted-foreground">#{index + 1}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{topic.topic}</span>
                          {getSentimentIcon(topic.sentiment)}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {topic.mentions.toLocaleString()} menções
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-right">
                      <div className={cn(
                        "flex items-center gap-1 text-sm font-medium",
                        topic.growth > 0 ? "text-green-600" : "text-red-600"
                      )}>
                        {topic.growth > 0 ? (
                          <TrendingUp className="h-4 w-4" />
                        ) : (
                          <TrendingDown className="h-4 w-4" />
                        )}
                        {Math.abs(topic.growth)}%
                      </div>
                      <Button variant="outline" size="sm">
                        <Search className="mr-1 h-3 w-3" />
                        Explorar
                      </Button>
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