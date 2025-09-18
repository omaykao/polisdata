"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  Filter,
  Plus,
  Star,
  Clock,
  Users,
  Target,
  BarChart3,
  MessageSquare,
  Calendar,
  Vote,
  Gift,
  Megaphone,
  Heart,
  AlertCircle,
  TrendingUp,
  UserCheck,
  PartyPopper,
  FileText,
  HandshakeIcon,
  Award,
  Sparkles,
  Copy,
  Eye,
  Edit,
  Trash,
  Download,
  Upload,
  CheckCircle,
  Info,
  Settings,
  ChevronRight,
  Zap,
  Shield,
  Database,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: any;
  popularity: number;
  avgEngagement: number;
  estimatedReach: string;
  tags: string[];
  content: string;
  variables: string[];
  bestFor: string[];
  metrics: {
    avgOpenRate: number;
    avgResponseRate: number;
    avgConversionRate: number;
  };
  lastUsed?: Date;
  timesUsed: number;
  createdBy: string;
  isPremium?: boolean;
}

export default function CampaignTemplatesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [sortBy, setSortBy] = useState("popularity");

  const templates: Template[] = [
    {
      id: "election-survey",
      name: "Consulta Eleitoral",
      description: "Pesquisa de opinião e intenção de voto para eleições",
      category: "pesquisa",
      icon: Vote,
      popularity: 95,
      avgEngagement: 22.5,
      estimatedReach: "50K-100K",
      tags: ["Eleição", "Pesquisa", "Opinião"],
      content: "Olá {nome}! 👋\n\nSua opinião é fundamental para construirmos uma cidade melhor! 🏛️\n\nGostaríamos de conhecer suas prioridades para nossa região. Quais áreas você considera mais importantes?\n\n1️⃣ Saúde\n2️⃣ Educação\n3️⃣ Segurança\n4️⃣ Transporte\n5️⃣ Emprego\n\nResponda com o número da sua prioridade!\n\n{assinatura}",
      variables: ["nome", "assinatura"],
      bestFor: ["Período eleitoral", "Pesquisa de opinião", "Engajamento político"],
      metrics: {
        avgOpenRate: 78,
        avgResponseRate: 23,
        avgConversionRate: 8.5,
      },
      lastUsed: new Date(2025, 0, 15),
      timesUsed: 1234,
      createdBy: "Sistema",
    },
    {
      id: "event-invite",
      name: "Convite para Evento",
      description: "Convite personalizado para eventos políticos e comícios",
      category: "evento",
      icon: Calendar,
      popularity: 88,
      avgEngagement: 35.2,
      estimatedReach: "20K-50K",
      tags: ["Evento", "Convite", "Presencial"],
      content: "Prezado(a) {nome},\n\n📅 SAVE THE DATE!\n\nConvidamos você para nosso grande evento:\n\n🎯 {nome_evento}\n📍 Local: {local}\n🗓️ Data: {data}\n⏰ Horário: {horario}\n\nSua presença é muito importante! Vamos juntos construir o futuro que queremos.\n\nConfirme sua presença respondendo SIM.\n\n{assinatura}",
      variables: ["nome", "nome_evento", "local", "data", "horario", "assinatura"],
      bestFor: ["Comícios", "Reuniões", "Eventos presenciais"],
      metrics: {
        avgOpenRate: 82,
        avgResponseRate: 35,
        avgConversionRate: 15.3,
      },
      lastUsed: new Date(2025, 0, 10),
      timesUsed: 856,
      createdBy: "Sistema",
    },
    {
      id: "campaign-news",
      name: "Novidades da Campanha",
      description: "Atualizações e notícias sobre a campanha política",
      category: "informativo",
      icon: Megaphone,
      popularity: 75,
      avgEngagement: 18.7,
      estimatedReach: "100K+",
      tags: ["Notícias", "Atualização", "Informativo"],
      content: "Olá {nome}! 📢\n\n🎯 Novidades importantes da nossa campanha:\n\n{novidade_principal}\n\n✅ Conquistas recentes:\n• {conquista_1}\n• {conquista_2}\n• {conquista_3}\n\n🔜 Próximos passos:\n{proximos_passos}\n\nConte conosco e nós contamos com você! 💪\n\nPara mais informações: {link}\n\n{assinatura}",
      variables: ["nome", "novidade_principal", "conquista_1", "conquista_2", "conquista_3", "proximos_passos", "link", "assinatura"],
      bestFor: ["Comunicação regular", "Atualização de apoiadores", "Transparência"],
      metrics: {
        avgOpenRate: 70,
        avgResponseRate: 15,
        avgConversionRate: 5.2,
      },
      timesUsed: 623,
      createdBy: "Sistema",
    },
    {
      id: "thanks-support",
      name: "Agradecimento ao Apoio",
      description: "Mensagem de agradecimento para apoiadores e voluntários",
      category: "relacionamento",
      icon: Heart,
      popularity: 82,
      avgEngagement: 28.3,
      estimatedReach: "10K-30K",
      tags: ["Agradecimento", "Apoiadores", "Fidelização"],
      content: "Querido(a) {nome},\n\n❤️ MUITO OBRIGADO!\n\nSeu apoio tem sido fundamental para nossa caminhada. Graças a pessoas como você, estamos construindo um movimento verdadeiro de transformação.\n\n🙏 Sua contribuição faz a diferença:\n{tipo_contribuicao}\n\n🎯 Juntos já conquistamos:\n{conquistas}\n\nContinue conosco nesta jornada!\n\nCom gratidão,\n{assinatura}",
      variables: ["nome", "tipo_contribuicao", "conquistas", "assinatura"],
      bestFor: ["Fidelização", "Reconhecimento", "Engajamento contínuo"],
      metrics: {
        avgOpenRate: 85,
        avgResponseRate: 30,
        avgConversionRate: 12,
      },
      timesUsed: 445,
      createdBy: "Sistema",
      isPremium: true,
    },
    {
      id: "volunteer-recruitment",
      name: "Recrutamento de Voluntários",
      description: "Convocação para voluntariado e engajamento na campanha",
      category: "mobilizacao",
      icon: Users,
      popularity: 70,
      avgEngagement: 25.5,
      estimatedReach: "30K-60K",
      tags: ["Voluntários", "Mobilização", "Engajamento"],
      content: "Olá {nome}! 🙋‍♀️🙋‍♂️\n\n⭐ SEJA PARTE DA MUDANÇA!\n\nEstamos procurando pessoas comprometidas como você para fazer a diferença em nossa comunidade.\n\n📋 Como você pode ajudar:\n• Mobilização de bairro\n• Apoio em eventos\n• Divulgação nas redes\n• Distribuição de materiais\n\n⏰ Flexível com seu tempo!\n📍 Atuação em {regiao}\n\nTopa fazer parte? Responda QUERO!\n\n{assinatura}",
      variables: ["nome", "regiao", "assinatura"],
      bestFor: ["Mobilização", "Engajamento comunitário", "Formação de base"],
      metrics: {
        avgOpenRate: 72,
        avgResponseRate: 26,
        avgConversionRate: 10.5,
      },
      timesUsed: 312,
      createdBy: "Sistema",
    },
    {
      id: "donation-request",
      name: "Pedido de Doação",
      description: "Solicitação de contribuições financeiras para a campanha",
      category: "arrecadacao",
      icon: Gift,
      popularity: 65,
      avgEngagement: 15.8,
      estimatedReach: "20K-40K",
      tags: ["Doação", "Arrecadação", "Financiamento"],
      content: "{nome}, precisamos de você! 💙\n\n🎯 Nossa meta: {meta_arrecadacao}\n📊 Já alcançamos: {porcentagem_alcancada}%\n\nCada contribuição nos aproxima da vitória:\n\n💰 R$ 20 = 100 panfletos\n💰 R$ 50 = Combustível para 1 dia\n💰 R$ 100 = Material para 1 evento\n\n🔒 Doação segura via: {link_doacao}\n\nJuntos somos mais fortes! 💪\n\n{assinatura}",
      variables: ["nome", "meta_arrecadacao", "porcentagem_alcancada", "link_doacao", "assinatura"],
      bestFor: ["Arrecadação", "Financiamento coletivo", "Sustentabilidade"],
      metrics: {
        avgOpenRate: 68,
        avgResponseRate: 12,
        avgConversionRate: 3.8,
      },
      timesUsed: 189,
      createdBy: "Sistema",
      isPremium: true,
    },
    {
      id: "birthday-wishes",
      name: "Parabéns Personalizado",
      description: "Mensagem de aniversário para eleitores e apoiadores",
      category: "relacionamento",
      icon: PartyPopper,
      popularity: 90,
      avgEngagement: 42.1,
      estimatedReach: "5K-15K",
      tags: ["Aniversário", "Relacionamento", "Personalizado"],
      content: "🎉 Feliz Aniversário, {nome}! 🎂\n\nHoje é um dia especial e não poderíamos deixar passar em branco!\n\n🎈 Desejamos a você:\n• Muita saúde\n• Prosperidade\n• Alegrias\n• Realizações\n\nQue este novo ano de vida seja repleto de conquistas!\n\nConte sempre conosco! 🤝\n\n{assinatura}",
      variables: ["nome", "assinatura"],
      bestFor: ["Fidelização", "Relacionamento pessoal", "Datas especiais"],
      metrics: {
        avgOpenRate: 92,
        avgResponseRate: 45,
        avgConversionRate: 18.5,
      },
      timesUsed: 2341,
      createdBy: "Sistema",
    },
    {
      id: "issue-alert",
      name: "Alerta de Problema Local",
      description: "Comunicado sobre problemas e soluções para a comunidade",
      category: "alerta",
      icon: AlertCircle,
      popularity: 58,
      avgEngagement: 31.2,
      estimatedReach: "15K-35K",
      tags: ["Alerta", "Problema", "Solução"],
      content: "⚠️ ATENÇÃO {nome}!\n\n📍 Identificamos um problema em {local}:\n\n{descricao_problema}\n\n✅ Nossa proposta de solução:\n{proposta_solucao}\n\n📋 O que você pode fazer:\n• Compartilhe esta mensagem\n• Participe da mobilização\n• Entre em contato com {contato}\n\nJuntos vamos resolver! 💪\n\n{assinatura}",
      variables: ["nome", "local", "descricao_problema", "proposta_solucao", "contato", "assinatura"],
      bestFor: ["Comunicação de crise", "Mobilização rápida", "Soluções locais"],
      metrics: {
        avgOpenRate: 88,
        avgResponseRate: 35,
        avgConversionRate: 14,
      },
      timesUsed: 134,
      createdBy: "Sistema",
    },
    {
      id: "proposal-presentation",
      name: "Apresentação de Proposta",
      description: "Divulgação detalhada de propostas políticas específicas",
      category: "proposta",
      icon: FileText,
      popularity: 72,
      avgEngagement: 20.3,
      estimatedReach: "40K-80K",
      tags: ["Proposta", "Plano", "Governo"],
      content: "Olá {nome}! 📋\n\n🎯 NOVA PROPOSTA: {titulo_proposta}\n\n{descricao_proposta}\n\n✅ Benefícios diretos para você:\n• {beneficio_1}\n• {beneficio_2}\n• {beneficio_3}\n\n📊 Meta: {meta_proposta}\n⏰ Prazo: {prazo_execucao}\n\nO que você acha? Sua opinião é importante!\n\n{assinatura}",
      variables: ["nome", "titulo_proposta", "descricao_proposta", "beneficio_1", "beneficio_2", "beneficio_3", "meta_proposta", "prazo_execucao", "assinatura"],
      bestFor: ["Divulgação de propostas", "Engajamento político", "Transparência"],
      metrics: {
        avgOpenRate: 74,
        avgResponseRate: 22,
        avgConversionRate: 7.8,
      },
      timesUsed: 267,
      createdBy: "Sistema",
    },
    {
      id: "victory-celebration",
      name: "Celebração de Vitória",
      description: "Mensagem comemorativa para conquistas e vitórias",
      category: "celebracao",
      icon: Award,
      popularity: 85,
      avgEngagement: 38.7,
      estimatedReach: "50K-150K",
      tags: ["Vitória", "Celebração", "Conquista"],
      content: "🎉 {nome}, CONSEGUIMOS! 🎊\n\n✨ {conquista_principal}\n\n🏆 Isso só foi possível graças a você e mais {numero_apoiadores} apoiadores!\n\n📊 Resultados:\n{resultados}\n\n🎯 Próximos passos:\n{proximos_passos}\n\nVamos continuar juntos! 💪\n\nCom alegria e gratidão,\n{assinatura}",
      variables: ["nome", "conquista_principal", "numero_apoiadores", "resultados", "proximos_passos", "assinatura"],
      bestFor: ["Pós-eleição", "Conquistas importantes", "Motivação de base"],
      metrics: {
        avgOpenRate: 89,
        avgResponseRate: 40,
        avgConversionRate: 16.2,
      },
      timesUsed: 156,
      createdBy: "Sistema",
      isPremium: true,
    },
  ];

  const categories = [
    { id: "all", name: "Todos", count: templates.length },
    { id: "pesquisa", name: "Pesquisa", icon: BarChart3, count: templates.filter(t => t.category === "pesquisa").length },
    { id: "evento", name: "Evento", icon: Calendar, count: templates.filter(t => t.category === "evento").length },
    { id: "informativo", name: "Informativo", icon: Megaphone, count: templates.filter(t => t.category === "informativo").length },
    { id: "relacionamento", name: "Relacionamento", icon: Heart, count: templates.filter(t => t.category === "relacionamento").length },
    { id: "mobilizacao", name: "Mobilização", icon: Users, count: templates.filter(t => t.category === "mobilizacao").length },
    { id: "arrecadacao", name: "Arrecadação", icon: Gift, count: templates.filter(t => t.category === "arrecadacao").length },
    { id: "alerta", name: "Alerta", icon: AlertCircle, count: templates.filter(t => t.category === "alerta").length },
    { id: "proposta", name: "Proposta", icon: FileText, count: templates.filter(t => t.category === "proposta").length },
    { id: "celebracao", name: "Celebração", icon: Award, count: templates.filter(t => t.category === "celebracao").length },
  ];

  const filteredTemplates = templates
    .filter(template =>
      (selectedCategory === "all" || template.category === selectedCategory) &&
      (searchQuery === "" ||
        template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "popularity":
          return b.popularity - a.popularity;
        case "engagement":
          return b.avgEngagement - a.avgEngagement;
        case "recent":
          return (b.lastUsed?.getTime() || 0) - (a.lastUsed?.getTime() || 0);
        case "usage":
          return b.timesUsed - a.timesUsed;
        default:
          return 0;
      }
    });

  const handleUseTemplate = (template: Template) => {
    // Navigate to new campaign page with template pre-filled
    router.push(`/campaigns/new?template=${template.id}`);
  };

  const handlePreviewTemplate = (template: Template) => {
    setSelectedTemplate(template);
    setShowPreview(true);
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Templates de Campanha</h1>
        <p className="text-muted-foreground">
          Modelos prontos e otimizados para suas campanhas de WhatsApp
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popularity">Mais populares</SelectItem>
            <SelectItem value="engagement">Maior engajamento</SelectItem>
            <SelectItem value="recent">Usados recentemente</SelectItem>
            <SelectItem value="usage">Mais utilizados</SelectItem>
          </SelectContent>
        </Select>
        <Link href="/campaigns/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Criar do Zero
          </Button>
        </Link>
      </div>

      {/* Categories */}
      <ScrollArea className="w-full whitespace-nowrap rounded-md border mb-6">
        <div className="flex w-max space-x-4 p-4">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "ghost"}
              className="flex items-center gap-2"
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.icon && <category.icon className="h-4 w-4" />}
              <span>{category.name}</span>
              <Badge variant="secondary" className="ml-2">
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>
      </ScrollArea>

      {/* Templates Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className={cn(
            "hover:shadow-lg transition-shadow",
            template.isPremium && "border-yellow-500 dark:border-yellow-600"
          )}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center",
                    template.isPremium ? "bg-yellow-100 dark:bg-yellow-950" : "bg-primary/10"
                  )}>
                    <template.icon className={cn(
                      "h-5 w-5",
                      template.isPremium ? "text-yellow-600" : "text-primary"
                    )} />
                  </div>
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      {template.name}
                      {template.isPremium && (
                        <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                          <Sparkles className="mr-1 h-3 w-3" />
                          Premium
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {template.description}
                    </CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {template.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-xs text-muted-foreground">Abertura</p>
                    <p className="font-medium text-sm">{template.metrics.avgOpenRate}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Resposta</p>
                    <p className="font-medium text-sm">{template.metrics.avgResponseRate}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Conversão</p>
                    <p className="font-medium text-sm">{template.metrics.avgConversionRate}%</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    <span>{template.estimatedReach}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    <span>{template.avgEngagement}% eng.</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    <span>{template.popularity}%</span>
                  </div>
                </div>

                {/* Usage info */}
                <div className="pt-2 border-t">
                  <p className="text-xs text-muted-foreground">
                    Usado {template.timesUsed}x
                    {template.lastUsed && (
                      <span> • Último uso: {template.lastUsed.toLocaleDateString('pt-BR')}</span>
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="gap-2">
              <Button
                className="flex-1"
                variant="outline"
                onClick={() => handlePreviewTemplate(template)}
              >
                <Eye className="mr-2 h-4 w-4" />
                Visualizar
              </Button>
              <Button
                className="flex-1"
                onClick={() => handleUseTemplate(template)}
              >
                <Zap className="mr-2 h-4 w-4" />
                Usar Template
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Nenhum template encontrado</h3>
          <p className="text-muted-foreground mb-4">
            Tente ajustar seus filtros ou busca
          </p>
          <Button onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }}>
            Limpar filtros
          </Button>
        </div>
      )}

      {/* Template Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Prévia do Template</DialogTitle>
            <DialogDescription>
              Visualize como a mensagem será enviada aos destinatários
            </DialogDescription>
          </DialogHeader>
          {selectedTemplate && (
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className={cn(
                  "w-12 h-12 rounded-lg flex items-center justify-center",
                  selectedTemplate.isPremium ? "bg-yellow-100 dark:bg-yellow-950" : "bg-primary/10"
                )}>
                  <selectedTemplate.icon className={cn(
                    "h-6 w-6",
                    selectedTemplate.isPremium ? "text-yellow-600" : "text-primary"
                  )} />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-lg">{selectedTemplate.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedTemplate.description}</p>
                </div>
              </div>

              <Separator />

              {/* Message Preview */}
              <div className="bg-green-50 dark:bg-green-950 rounded-lg p-4">
                <div className="flex items-start gap-3 mb-2">
                  <MessageSquare className="h-5 w-5 text-green-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-sm mb-2">Prévia da Mensagem</p>
                    <div className="whitespace-pre-wrap text-sm">
                      {selectedTemplate.content}
                    </div>
                  </div>
                </div>
              </div>

              {/* Variables */}
              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  Variáveis Dinâmicas
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedTemplate.variables.map((variable) => (
                    <Badge key={variable} variant="outline">
                      {`{${variable}}`}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Best For */}
              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Melhor Para
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedTemplate.bestFor.map((use) => (
                    <Badge key={use} variant="secondary">
                      {use}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Performance Metrics */}
              <div>
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Métricas de Performance
                </h4>
                <div className="grid grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="pt-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">
                          {selectedTemplate.metrics.avgOpenRate}%
                        </p>
                        <p className="text-xs text-muted-foreground">Taxa de Abertura</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">
                          {selectedTemplate.metrics.avgResponseRate}%
                        </p>
                        <p className="text-xs text-muted-foreground">Taxa de Resposta</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-purple-600">
                          {selectedTemplate.metrics.avgConversionRate}%
                        </p>
                        <p className="text-xs text-muted-foreground">Taxa de Conversão</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPreview(false)}>
              Fechar
            </Button>
            <Button onClick={() => selectedTemplate && handleUseTemplate(selectedTemplate)}>
              <Zap className="mr-2 h-4 w-4" />
              Usar Este Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}