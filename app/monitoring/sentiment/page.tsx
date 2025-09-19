"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Treemap
} from "recharts"
import {
  Heart,
  Frown,
  Meh,
  Smile,
  Users,
  TrendingUp,
  TrendingDown,
  Calendar,
  Filter,
  Download,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Target,
  MapPin,
  Clock,
  Zap,
  AlertTriangle,
  CheckCircle,
  XCircle,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Eye,
  Share2,
  Archive
} from "lucide-react"

// Mock data para análise de sentimento
const sentimentOverTime = [
  { date: "2024-06-01", positivo: 65, neutro: 25, negativo: 10 },
  { date: "2024-06-08", positivo: 62, neutro: 28, negativo: 10 },
  { date: "2024-06-15", positivo: 58, neutro: 30, negativo: 12 },
  { date: "2024-06-22", positivo: 60, neutro: 25, negativo: 15 },
  { date: "2024-07-01", positivo: 67, neutro: 23, negativo: 10 },
  { date: "2024-07-08", positivo: 70, neutro: 20, negativo: 10 },
  { date: "2024-07-15", positivo: 68, neutro: 22, negativo: 10 }
]

const sentimentByPlatform = [
  { platform: "Facebook", positivo: 45, neutro: 35, negativo: 20, total: 2450 },
  { platform: "Instagram", positivo: 75, neutro: 20, negativo: 5, total: 1820 },
  { platform: "Twitter", positivo: 35, neutro: 40, negativo: 25, total: 3200 },
  { platform: "YouTube", positivo: 80, neutro: 15, negativo: 5, total: 850 },
  { platform: "TikTok", positivo: 70, neutro: 25, negativo: 5, total: 1200 }
]

const sentimentByDemographic = [
  { grupo: "18-24 anos", positivo: 72, neutro: 20, negativo: 8 },
  { grupo: "25-34 anos", positivo: 65, neutro: 25, negativo: 10 },
  { grupo: "35-44 anos", positivo: 58, neutro: 30, negativo: 12 },
  { grupo: "45-54 anos", positivo: 52, neutro: 35, negativo: 13 },
  { grupo: "55+ anos", positivo: 48, neutro: 37, negativo: 15 }
]

const topTopics = [
  {
    topic: "Política Econômica",
    sentimento: "Negativo",
    score: -0.65,
    volume: 3420,
    mudanca: -12,
    posts: [
      { autor: "@economista_br", texto: "As medidas econômicas não estão surtindo o efeito esperado...", data: "2h", sentimento: "negativo" },
      { autor: "@analista_pol", texto: "Precisamos de uma revisão urgente na política fiscal", data: "4h", sentimento: "negativo" }
    ]
  },
  {
    topic: "Saúde Pública",
    sentimento: "Positivo",
    score: 0.72,
    volume: 2890,
    mudanca: 8,
    posts: [
      { autor: "@medico_sus", texto: "Excelente iniciativa na melhoria dos hospitais públicos", data: "1h", sentimento: "positivo" },
      { autor: "@enfermeira_rj", texto: "Finalmente vemos investimentos reais na saúde", data: "3h", sentimento: "positivo" }
    ]
  },
  {
    topic: "Educação",
    sentimento: "Neutro",
    score: 0.15,
    volume: 2340,
    mudanca: 3,
    posts: [
      { autor: "@professor_sp", texto: "As reformas educacionais têm pontos positivos e negativos", data: "2h", sentimento: "neutro" },
      { autor: "@estudante_univ", texto: "Ainda há muito o que melhorar no sistema educacional", data: "5h", sentimento: "neutro" }
    ]
  },
  {
    topic: "Segurança Pública",
    sentimento: "Negativo",
    score: -0.48,
    volume: 4120,
    mudanca: -5,
    posts: [
      { autor: "@cidadao_rj", texto: "A violência urbana continua sendo um grande problema", data: "1h", sentimento: "negativo" },
      { autor: "@jornalista_seg", texto: "Os índices de criminalidade preocupam a população", data: "6h", sentimento: "negativo" }
    ]
  },
  {
    topic: "Meio Ambiente",
    sentimento: "Positivo",
    score: 0.55,
    volume: 1780,
    mudanca: 15,
    posts: [
      { autor: "@ambientalista", texto: "Ótimas medidas para preservação da Amazônia", data: "3h", sentimento: "positivo" },
      { autor: "@biologa_usp", texto: "Finalmente políticas ambientais efetivas", data: "4h", sentimento: "positivo" }
    ]
  }
]

const sentimentByRegion = [
  { regiao: "Norte", positivo: 62, neutro: 28, negativo: 10, volume: 1200 },
  { regiao: "Nordeste", positivo: 58, neutro: 30, negativo: 12, volume: 3400 },
  { regiao: "Centro-Oeste", positivo: 65, neutro: 25, negativo: 10, volume: 800 },
  { regiao: "Sudeste", positivo: 55, neutro: 32, negativo: 13, volume: 5200 },
  { regiao: "Sul", positivo: 60, neutro: 28, negativo: 12, volume: 2100 }
]

const wordCloud = [
  { text: "economia", value: 89, sentiment: "negativo" },
  { text: "saúde", value: 72, sentiment: "positivo" },
  { text: "educação", value: 65, sentiment: "neutro" },
  { text: "segurança", value: 58, sentiment: "negativo" },
  { text: "emprego", value: 52, sentiment: "negativo" },
  { text: "corrupção", value: 48, sentiment: "negativo" },
  { text: "transparência", value: 45, sentiment: "positivo" },
  { text: "democracia", value: 42, sentiment: "positivo" },
  { text: "direitos", value: 38, sentiment: "positivo" },
  { text: "desenvolvimento", value: 35, sentiment: "positivo" }
]

const sentimentAlerts = [
  {
    id: 1,
    tipo: "Crítico",
    titulo: "Pico de Sentimento Negativo",
    descricao: "Aumento de 45% no sentimento negativo sobre política econômica nas últimas 6h",
    tempo: "2h atrás",
    severidade: "high",
    topico: "Economia"
  },
  {
    id: 2,
    tipo: "Aviso",
    titulo: "Tendência Crescente Positiva",
    descricao: "Sentimento positivo sobre saúde pública cresceu 20% hoje",
    tempo: "4h atrás",
    severidade: "medium",
    topico: "Saúde"
  },
  {
    id: 3,
    tipo: "Info",
    titulo: "Estabilização de Sentimento",
    descricao: "Sentimento sobre educação mantém-se estável nos últimos 3 dias",
    tempo: "6h atrás",
    severidade: "low",
    topico: "Educação"
  }
]

const influencers = [
  {
    nome: "@economista_br",
    seguidores: "1.2M",
    impacto: 0.85,
    sentimento: "negativo",
    topicos: ["Economia", "Política Fiscal"],
    ultimoPost: "Análise crítica das medidas econômicas atuais",
    engajamento: "12.5K"
  },
  {
    nome: "@medico_sus",
    seguidores: "890K",
    impacto: 0.72,
    sentimento: "positivo",
    topicos: ["Saúde", "SUS"],
    ultimoPost: "Avanços significativos no sistema de saúde",
    engajamento: "8.3K"
  },
  {
    nome: "@jornalista_pol",
    seguidores: "2.1M",
    impacto: 0.95,
    sentimento: "neutro",
    topicos: ["Política", "Jornalismo"],
    ultimoPost: "Análise imparcial das políticas atuais",
    engajamento: "15.2K"
  }
]

export default function SentimentAnalysisPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("7d")
  const [selectedPlatform, setSelectedPlatform] = useState("all")
  const [selectedTopic, setSelectedTopic] = useState("")

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case "positivo": return "hsl(var(--chart-positive))"
      case "negativo": return "hsl(var(--chart-negative))"
      case "neutro": return "hsl(var(--chart-neutral))"
      default: return "hsl(var(--chart-1))"
    }
  }

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case "positivo": return <Smile className="h-4 w-4 text-green-600" />
      case "negativo": return <Frown className="h-4 w-4 text-red-600" />
      case "neutro": return <Meh className="h-4 w-4 text-gray-600" />
      default: return <Heart className="h-4 w-4" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "bg-red-100 text-red-800 border-red-200"
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low": return "bg-blue-100 text-blue-800 border-blue-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Análise de Sentimento</h1>
          <p className="text-muted-foreground">
            Monitore e analise o sentimento público em tempo real
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1d">1 dia</SelectItem>
              <SelectItem value="7d">7 dias</SelectItem>
              <SelectItem value="30d">30 dias</SelectItem>
              <SelectItem value="90d">90 dias</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="topics">Tópicos</TabsTrigger>
          <TabsTrigger value="demographics">Demografia</TabsTrigger>
          <TabsTrigger value="influencers">Influenciadores</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Métricas Principais */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sentimento Geral</CardTitle>
                <Smile className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">Positivo</div>
                <p className="text-xs text-muted-foreground">
                  +5% em relação à semana passada
                </p>
                <div className="mt-2">
                  <Progress value={68} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>68% positivo</span>
                    <span>22% neutro</span>
                    <span>10% negativo</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Volume Total</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12.7K</div>
                <p className="text-xs text-muted-foreground">
                  <TrendingUp className="inline h-3 w-3 mr-1" />
                  +12% em relação ao período anterior
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Score Médio</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">+0.58</div>
                <p className="text-xs text-muted-foreground">
                  Escala de -1 (muito negativo) a +1 (muito positivo)
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Alertas Ativos</CardTitle>
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">
                  1 crítico, 1 aviso, 1 informativo
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Gráficos Principais */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Evolução do Sentimento</CardTitle>
                <CardDescription>
                  Distribuição do sentimento ao longo do tempo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={sentimentOverTime}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="positivo"
                      stackId="1"
                      stroke="hsl(var(--chart-positive))"
                      fill="hsl(var(--chart-positive))"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="neutro"
                      stackId="1"
                      stroke="hsl(var(--chart-neutral))"
                      fill="hsl(var(--chart-neutral))"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="negativo"
                      stackId="1"
                      stroke="hsl(var(--chart-negative))"
                      fill="hsl(var(--chart-negative))"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sentimento por Plataforma</CardTitle>
                <CardDescription>
                  Comparação entre diferentes redes sociais
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={sentimentByPlatform} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="platform" type="category" width={80} />
                    <Tooltip />
                    <Bar dataKey="positivo" fill="hsl(var(--chart-positive))" />
                    <Bar dataKey="neutro" fill="hsl(var(--chart-neutral))" />
                    <Bar dataKey="negativo" fill="hsl(var(--chart-negative))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Alertas em Tempo Real */}
          <Card>
            <CardHeader>
              <CardTitle>Alertas de Sentimento</CardTitle>
              <CardDescription>
                Notificações importantes sobre mudanças no sentimento público
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sentimentAlerts.map((alert) => (
                  <div key={alert.id} className={`p-4 rounded-lg border ${getSeverityColor(alert.severidade)}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{alert.tipo}</Badge>
                          <Badge variant="secondary">{alert.topico}</Badge>
                          <span className="text-xs text-muted-foreground">{alert.tempo}</span>
                        </div>
                        <h4 className="font-semibold mt-1">{alert.titulo}</h4>
                        <p className="text-sm mt-1">{alert.descricao}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Archive className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="topics" className="space-y-4">
          <div className="flex items-center space-x-4 mb-6">
            <Input
              placeholder="Filtrar por tópico..."
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="max-w-sm"
            />
            <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Todas as plataformas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as plataformas</SelectItem>
                <SelectItem value="facebook">Facebook</SelectItem>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="twitter">Twitter</SelectItem>
                <SelectItem value="youtube">YouTube</SelectItem>
                <SelectItem value="tiktok">TikTok</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-6">
            {topTopics.map((topic, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        {getSentimentIcon(topic.sentimento)}
                        <CardTitle className="text-lg">{topic.topic}</CardTitle>
                      </div>
                      <Badge
                        variant="outline"
                        style={{
                          borderColor: getSentimentColor(topic.sentimento),
                          color: getSentimentColor(topic.sentimento)
                        }}
                      >
                        {topic.sentimento}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Score: {topic.score}</div>
                      <div className="text-sm text-muted-foreground">Volume: {topic.volume.toLocaleString()}</div>
                      <div className={`text-sm ${topic.mudanca >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {topic.mudanca >= 0 ? <TrendingUp className="inline h-3 w-3 mr-1" /> : <TrendingDown className="inline h-3 w-3 mr-1" />}
                        {Math.abs(topic.mudanca)}%
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Posts Representativos:</h4>
                      <div className="space-y-3">
                        {topic.posts.map((post, postIndex) => (
                          <div key={postIndex} className="bg-muted p-3 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium text-sm">{post.autor}</span>
                              <div className="flex items-center space-x-2">
                                {getSentimentIcon(post.sentimento)}
                                <span className="text-xs text-muted-foreground">{post.data}</span>
                              </div>
                            </div>
                            <p className="text-sm">{post.texto}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="demographics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Sentimento por Faixa Etária</CardTitle>
                <CardDescription>
                  Análise demográfica do sentimento público
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={sentimentByDemographic}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="grupo" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="positivo" fill="hsl(var(--chart-positive))" />
                    <Bar dataKey="neutro" fill="hsl(var(--chart-neutral))" />
                    <Bar dataKey="negativo" fill="hsl(var(--chart-negative))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sentimento por Região</CardTitle>
                <CardDescription>
                  Distribuição geográfica do sentimento
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={sentimentByRegion}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ regiao, positivo }) => `${regiao}: ${positivo}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="positivo"
                    >
                      {sentimentByRegion.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={`hsl(var(--chart-${index + 1}))`} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Nuvem de Palavras */}
          <Card>
            <CardHeader>
              <CardTitle>Palavras-chave Mais Mencionadas</CardTitle>
              <CardDescription>
                Termos mais relevantes e seu sentimento associado
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {wordCloud.map((word, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="text-sm py-2 px-3"
                    style={{
                      fontSize: `${Math.max(12, word.value / 5)}px`,
                      borderColor: getSentimentColor(word.sentiment),
                      color: getSentimentColor(word.sentiment)
                    }}
                  >
                    {word.text} ({word.value})
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tabela Demografia Detalhada */}
          <Card>
            <CardHeader>
              <CardTitle>Análise Demográfica Detalhada</CardTitle>
              <CardDescription>
                Distribuição completa por região e volume
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sentimentByRegion.map((region, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        {region.regiao}
                      </h4>
                      <Badge variant="outline">
                        {region.volume.toLocaleString()} mentions
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="text-center">
                        <div className="text-green-600 font-medium">{region.positivo}%</div>
                        <div className="text-muted-foreground">Positivo</div>
                      </div>
                      <div className="text-center">
                        <div className="text-gray-600 font-medium">{region.neutro}%</div>
                        <div className="text-muted-foreground">Neutro</div>
                      </div>
                      <div className="text-center">
                        <div className="text-red-600 font-medium">{region.negativo}%</div>
                        <div className="text-muted-foreground">Negativo</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="influencers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Influenciadores e Impacto no Sentimento</CardTitle>
              <CardDescription>
                Perfis com maior influência na opinião pública
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {influencers.map((influencer, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-semibold">{influencer.nome}</h4>
                          {getSentimentIcon(influencer.sentimento)}
                          <Badge variant="outline">
                            {influencer.seguidores} seguidores
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          "{influencer.ultimoPost}"
                        </p>
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center">
                            <Target className="h-4 w-4 mr-1" />
                            Impacto: {(influencer.impacto * 100).toFixed(0)}%
                          </div>
                          <div className="flex items-center">
                            <Heart className="h-4 w-4 mr-1" />
                            {influencer.engajamento} engajamento
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {influencer.topicos.map((topico, topicIndex) => (
                            <Badge key={topicIndex} variant="secondary" className="text-xs">
                              {topico}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          Ver Perfil
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Métricas de Influência */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Influenciadores Ativos</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">247</div>
                <p className="text-xs text-muted-foreground">
                  +12 novos esta semana
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Reach Total</CardTitle>
                <Share2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12.3M</div>
                <p className="text-xs text-muted-foreground">
                  Pessoas alcançadas esta semana
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Engajamento Médio</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8.7%</div>
                <p className="text-xs text-muted-foreground">
                  +0.5% vs. semana anterior
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}