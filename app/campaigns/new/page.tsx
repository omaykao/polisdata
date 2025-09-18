"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  ArrowLeft,
  CalendarIcon,
  Clock,
  MessageSquare,
  Users,
  Target,
  FileText,
  Settings,
  Send,
  Save,
  Eye,
  Plus,
  X,
  Upload,
  Check,
  AlertCircle,
  Sparkles,
  Hash,
  AtSign,
  Link2,
  Image,
  Video,
  File,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NewCampaignPage() {
  const router = useRouter();
  const [campaignName, setCampaignName] = useState("");
  const [campaignType, setCampaignType] = useState("immediate");
  const [targetAudience, setTargetAudience] = useState("all");
  const [messageTemplate, setMessageTemplate] = useState("");
  const [scheduleDate, setScheduleDate] = useState<Date>();
  const [scheduleTime, setScheduleTime] = useState("09:00");
  const [enablePersonalization, setEnablePersonalization] = useState(true);
  const [enableTracking, setEnableTracking] = useState(true);
  const [enableAutoResponse, setEnableAutoResponse] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedPoliticians, setSelectedPoliticians] = useState<string[]>([]);
  const [messageVariables, setMessageVariables] = useState<string[]>([]);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [estimatedReach, setEstimatedReach] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);

  const availableTags = [
    "Eleitores",
    "Apoiadores",
    "Doadores",
    "Voluntários",
    "Jovens",
    "Idosos",
    "Zona Norte",
    "Zona Sul",
    "Centro",
    "Periferia",
  ];

  const politicians = [
    "Carlos Eduardo Mendes",
    "Ana Paula Oliveira",
    "Roberto Silva Filho",
    "Marina Costa Santos",
    "João Carlos Pereira",
  ];

  const messageTemplates = [
    { id: "election", name: "Consulta Eleitoral", preview: "Olá {nome}! Sua opinião é importante..." },
    { id: "event", name: "Convite para Evento", preview: "Prezado(a) {nome}, convidamos você para..." },
    { id: "survey", name: "Pesquisa de Satisfação", preview: "Oi {nome}! Gostaríamos de saber sua opinião sobre..." },
    { id: "news", name: "Novidades da Campanha", preview: "Olá {nome}! Temos novidades importantes..." },
    { id: "thanks", name: "Agradecimento", preview: "Obrigado {nome} pelo seu apoio..." },
  ];

  const handleAddVariable = (variable: string) => {
    setMessageTemplate(messageTemplate + ` {${variable}}`);
    if (!messageVariables.includes(variable)) {
      setMessageVariables([...messageVariables, variable]);
    }
  };

  const handleRemoveTag = (tag: string) => {
    setSelectedTags(selectedTags.filter(t => t !== tag));
  };

  const handleAddTag = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const calculateEstimatedReach = () => {
    // Mock calculation based on selected audience
    const base = targetAudience === "all" ? 75000 : targetAudience === "segment" ? 25000 : 10000;
    const tagMultiplier = selectedTags.length > 0 ? 0.3 * selectedTags.length : 1;
    setEstimatedReach(Math.floor(base * tagMultiplier));
  };

  const handleSaveDraft = () => {
    // Save campaign as draft
    console.log("Saving draft...");
  };

  const handlePreview = () => {
    // Show preview modal
    console.log("Showing preview...");
  };

  const handleLaunchCampaign = () => {
    // Launch the campaign
    console.log("Launching campaign...");
    router.push("/campaigns");
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href="/campaigns">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Nova Campanha WhatsApp</h1>
            <p className="text-muted-foreground">Configure e lance sua campanha de mensagens</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleSaveDraft}>
            <Save className="mr-2 h-4 w-4" />
            Salvar Rascunho
          </Button>
          <Button variant="outline" onClick={handlePreview}>
            <Eye className="mr-2 h-4 w-4" />
            Visualizar
          </Button>
          <Button onClick={handleLaunchCampaign} disabled={!campaignName || !messageTemplate}>
            <Send className="mr-2 h-4 w-4" />
            Lançar Campanha
          </Button>
        </div>
      </div>

      {/* Progress Steps */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            {[
              { step: 1, label: "Configurações", icon: Settings },
              { step: 2, label: "Público-Alvo", icon: Users },
              { step: 3, label: "Mensagem", icon: MessageSquare },
              { step: 4, label: "Agendamento", icon: Clock },
              { step: 5, label: "Revisão", icon: Check },
            ].map((item, index) => (
              <div key={item.step} className="flex items-center">
                <Button
                  variant={currentStep === item.step ? "default" : currentStep > item.step ? "secondary" : "outline"}
                  size="sm"
                  className="rounded-full h-10 w-10 p-0"
                  onClick={() => setCurrentStep(item.step)}
                >
                  {currentStep > item.step ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <item.icon className="h-4 w-4" />
                  )}
                </Button>
                {index < 4 && (
                  <div className={cn(
                    "w-20 h-1 mx-2",
                    currentStep > item.step ? "bg-primary" : "bg-muted"
                  )} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            {["Configurações", "Público-Alvo", "Mensagem", "Agendamento", "Revisão"].map((label, index) => (
              <span key={label} className={cn(
                "text-xs",
                currentStep === index + 1 ? "font-medium" : "text-muted-foreground"
              )}>
                {label}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs value={`step-${currentStep}`} onValueChange={(value) => setCurrentStep(parseInt(value.split('-')[1]))}>
        <TabsList className="hidden">
          <TabsTrigger value="step-1">Configurações</TabsTrigger>
          <TabsTrigger value="step-2">Público</TabsTrigger>
          <TabsTrigger value="step-3">Mensagem</TabsTrigger>
          <TabsTrigger value="step-4">Agendamento</TabsTrigger>
          <TabsTrigger value="step-5">Revisão</TabsTrigger>
        </TabsList>

        {/* Step 1: Basic Configuration */}
        <TabsContent value="step-1">
          <Card>
            <CardHeader>
              <CardTitle>Configurações Básicas</CardTitle>
              <CardDescription>Defina as informações principais da sua campanha</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="campaign-name">Nome da Campanha *</Label>
                <Input
                  id="campaign-name"
                  placeholder="Ex: Consulta Eleitoral 2025"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="campaign-type">Tipo de Campanha</Label>
                <Select value={campaignType} onValueChange={setCampaignType}>
                  <SelectTrigger id="campaign-type">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Envio Imediato</SelectItem>
                    <SelectItem value="scheduled">Agendada</SelectItem>
                    <SelectItem value="recurring">Recorrente</SelectItem>
                    <SelectItem value="triggered">Por Evento</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Político Responsável</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um político" />
                  </SelectTrigger>
                  <SelectContent>
                    {politicians.map((politician) => (
                      <SelectItem key={politician} value={politician}>
                        {politician}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label>Recursos Avançados</Label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="personalization">Personalização Automática</Label>
                      <p className="text-xs text-muted-foreground">
                        Personaliza mensagens com nome e dados do contato
                      </p>
                    </div>
                    <Switch
                      id="personalization"
                      checked={enablePersonalization}
                      onCheckedChange={setEnablePersonalization}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="tracking">Rastreamento de Engajamento</Label>
                      <p className="text-xs text-muted-foreground">
                        Monitora visualizações e respostas
                      </p>
                    </div>
                    <Switch
                      id="tracking"
                      checked={enableTracking}
                      onCheckedChange={setEnableTracking}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="auto-response">Resposta Automática</Label>
                      <p className="text-xs text-muted-foreground">
                        Responde automaticamente com base em palavras-chave
                      </p>
                    </div>
                    <Switch
                      id="auto-response"
                      checked={enableAutoResponse}
                      onCheckedChange={setEnableAutoResponse}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Step 2: Target Audience */}
        <TabsContent value="step-2">
          <Card>
            <CardHeader>
              <CardTitle>Público-Alvo</CardTitle>
              <CardDescription>Selecione quem receberá as mensagens</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Tipo de Segmentação</Label>
                <Select value={targetAudience} onValueChange={setTargetAudience}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o público" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os Contatos</SelectItem>
                    <SelectItem value="segment">Segmento Específico</SelectItem>
                    <SelectItem value="custom">Lista Personalizada</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {targetAudience === "segment" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Tags de Segmentação</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {selectedTags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                          <button
                            onClick={() => handleRemoveTag(tag)}
                            className="ml-1 hover:text-destructive"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <Select onValueChange={handleAddTag}>
                      <SelectTrigger>
                        <SelectValue placeholder="Adicionar tags" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableTags.filter(tag => !selectedTags.includes(tag)).map((tag) => (
                          <SelectItem key={tag} value={tag}>
                            {tag}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Filtros Demográficos</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-xs">Idade</Label>
                        <div className="flex gap-2 mt-1">
                          <Input type="number" placeholder="Min" className="w-20" />
                          <span className="self-center">-</span>
                          <Input type="number" placeholder="Max" className="w-20" />
                        </div>
                      </div>
                      <div>
                        <Label className="text-xs">Gênero</Label>
                        <Select>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Todos" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Todos</SelectItem>
                            <SelectItem value="male">Masculino</SelectItem>
                            <SelectItem value="female">Feminino</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Localização</Label>
                    <div className="flex gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground self-center" />
                      <Input placeholder="Cidade, Estado ou Região" />
                    </div>
                  </div>
                </div>
              )}

              {targetAudience === "custom" && (
                <div className="space-y-2">
                  <Label htmlFor="file-upload">Importar Lista de Contatos</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary cursor-pointer">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Arraste arquivos CSV ou clique para selecionar
                    </p>
                    <Input id="file-upload" type="file" className="hidden" accept=".csv" />
                  </div>
                </div>
              )}

              <Card className="bg-muted/50">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Alcance Estimado</p>
                      <p className="text-2xl font-bold">
                        {estimatedReach > 0 ? estimatedReach.toLocaleString() : "75.000"}
                      </p>
                      <p className="text-xs text-muted-foreground">contatos</p>
                    </div>
                    <Target className="h-8 w-8 text-primary" />
                  </div>
                  <Progress value={65} className="mt-4" />
                  <p className="text-xs text-muted-foreground mt-2">
                    65% do total de contatos disponíveis
                  </p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Step 3: Message Content */}
        <TabsContent value="step-3">
          <Card>
            <CardHeader>
              <CardTitle>Conteúdo da Mensagem</CardTitle>
              <CardDescription>Crie sua mensagem personalizada</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Modelo de Mensagem</Label>
                <Select onValueChange={(value) => {
                  const template = messageTemplates.find(t => t.id === value);
                  if (template) setMessageTemplate(template.preview);
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um modelo ou crie do zero" />
                  </SelectTrigger>
                  <SelectContent>
                    {messageTemplates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        <div>
                          <p className="font-medium">{template.name}</p>
                          <p className="text-xs text-muted-foreground">{template.preview.substring(0, 50)}...</p>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Mensagem *</Label>
                <Textarea
                  id="message"
                  placeholder="Digite sua mensagem aqui..."
                  value={messageTemplate}
                  onChange={(e) => setMessageTemplate(e.target.value)}
                  rows={8}
                  className="font-mono text-sm"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{messageTemplate.length} caracteres</span>
                  <span>Máximo: 1024 caracteres</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Variáveis Dinâmicas</Label>
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleAddVariable("nome")}
                  >
                    <AtSign className="mr-1 h-3 w-3" />
                    Nome
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleAddVariable("cidade")}
                  >
                    <MapPin className="mr-1 h-3 w-3" />
                    Cidade
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleAddVariable("data")}
                  >
                    <CalendarIcon className="mr-1 h-3 w-3" />
                    Data
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleAddVariable("link")}
                  >
                    <Link2 className="mr-1 h-3 w-3" />
                    Link
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleAddVariable("custom")}
                  >
                    <Plus className="mr-1 h-3 w-3" />
                    Personalizada
                  </Button>
                </div>
                {messageVariables.length > 0 && (
                  <p className="text-xs text-muted-foreground">
                    Variáveis usadas: {messageVariables.map(v => `{${v}}`).join(", ")}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Anexos</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" className="h-24 flex-col">
                    <Image className="h-6 w-6 mb-2" />
                    <span className="text-xs">Imagem</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex-col">
                    <Video className="h-6 w-6 mb-2" />
                    <span className="text-xs">Vídeo</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex-col">
                    <File className="h-6 w-6 mb-2" />
                    <span className="text-xs">Documento</span>
                  </Button>
                </div>
              </div>

              <Card className="bg-muted/50">
                <CardHeader>
                  <CardTitle className="text-sm">Prévia da Mensagem</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-background rounded-lg p-4 border">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <MessageSquare className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium mb-1">Político</p>
                        <div className="bg-green-50 dark:bg-green-950 rounded-lg p-3 text-sm">
                          {messageTemplate || "Sua mensagem aparecerá aqui..."}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Step 4: Scheduling */}
        <TabsContent value="step-4">
          <Card>
            <CardHeader>
              <CardTitle>Agendamento e Envio</CardTitle>
              <CardDescription>Defina quando as mensagens serão enviadas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {campaignType === "scheduled" && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Data de Envio</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "justify-start text-left font-normal",
                              !scheduleDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {scheduleDate ? format(scheduleDate, "PPP", { locale: ptBR }) : "Selecione a data"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={scheduleDate}
                            onSelect={setScheduleDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="schedule-time">Horário de Envio</Label>
                      <Select value={scheduleTime} onValueChange={setScheduleTime}>
                        <SelectTrigger id="schedule-time">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="06:00">06:00</SelectItem>
                          <SelectItem value="09:00">09:00</SelectItem>
                          <SelectItem value="12:00">12:00</SelectItem>
                          <SelectItem value="15:00">15:00</SelectItem>
                          <SelectItem value="18:00">18:00</SelectItem>
                          <SelectItem value="20:00">20:00</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Fuso Horário</Label>
                    <Select defaultValue="brasilia">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="brasilia">Brasília (GMT-3)</SelectItem>
                        <SelectItem value="manaus">Manaus (GMT-4)</SelectItem>
                        <SelectItem value="fernando">Fernando de Noronha (GMT-2)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label>Velocidade de Envio</Label>
                <div className="space-y-2">
                  <Slider defaultValue={[50]} max={100} step={25} />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Lento</span>
                    <span>Normal</span>
                    <span>Rápido</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Envio mais lento reduz chance de bloqueio
                </p>
              </div>

              <div className="space-y-2">
                <Label>Horário Permitido para Envio</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs">Das</Label>
                    <Select defaultValue="08:00">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 24 }, (_, i) => (
                          <SelectItem key={i} value={`${i.toString().padStart(2, '0')}:00`}>
                            {`${i.toString().padStart(2, '0')}:00`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs">Até</Label>
                    <Select defaultValue="20:00">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 24 }, (_, i) => (
                          <SelectItem key={i} value={`${i.toString().padStart(2, '0')}:00`}>
                            {`${i.toString().padStart(2, '0')}:00`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Regras de Reenvio</Label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Switch id="retry-failed" />
                    <Label htmlFor="retry-failed" className="font-normal">
                      Tentar reenviar mensagens falhas
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="skip-inactive" />
                    <Label htmlFor="skip-inactive" className="font-normal">
                      Pular números inativos
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="respect-optout" defaultChecked />
                    <Label htmlFor="respect-optout" className="font-normal">
                      Respeitar lista de opt-out
                    </Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Step 5: Review */}
        <TabsContent value="step-5">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Revisão da Campanha</CardTitle>
                <CardDescription>Confirme todas as configurações antes de lançar</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium mb-3">Informações Básicas</h4>
                    <dl className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <dt className="text-muted-foreground">Nome:</dt>
                        <dd className="font-medium">{campaignName || "Não definido"}</dd>
                      </div>
                      <div className="flex justify-between text-sm">
                        <dt className="text-muted-foreground">Tipo:</dt>
                        <dd className="font-medium">
                          {campaignType === "immediate" ? "Imediato" : "Agendado"}
                        </dd>
                      </div>
                      <div className="flex justify-between text-sm">
                        <dt className="text-muted-foreground">Status:</dt>
                        <dd>
                          <Badge variant="secondary">Rascunho</Badge>
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-3">Público-Alvo</h4>
                    <dl className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <dt className="text-muted-foreground">Segmento:</dt>
                        <dd className="font-medium">
                          {targetAudience === "all" ? "Todos os Contatos" :
                           targetAudience === "segment" ? "Segmento Específico" : "Lista Personalizada"}
                        </dd>
                      </div>
                      <div className="flex justify-between text-sm">
                        <dt className="text-muted-foreground">Alcance:</dt>
                        <dd className="font-medium">~75.000 contatos</dd>
                      </div>
                      {selectedTags.length > 0 && (
                        <div className="flex justify-between text-sm">
                          <dt className="text-muted-foreground">Tags:</dt>
                          <dd className="font-medium">{selectedTags.length} selecionadas</dd>
                        </div>
                      )}
                    </dl>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-3">Mensagem</h4>
                    <dl className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <dt className="text-muted-foreground">Caracteres:</dt>
                        <dd className="font-medium">{messageTemplate.length}</dd>
                      </div>
                      <div className="flex justify-between text-sm">
                        <dt className="text-muted-foreground">Variáveis:</dt>
                        <dd className="font-medium">{messageVariables.length}</dd>
                      </div>
                      <div className="flex justify-between text-sm">
                        <dt className="text-muted-foreground">Anexos:</dt>
                        <dd className="font-medium">{attachments.length}</dd>
                      </div>
                    </dl>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-3">Recursos</h4>
                    <dl className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <dt className="text-muted-foreground">Personalização:</dt>
                        <dd className="font-medium">{enablePersonalization ? "Ativada" : "Desativada"}</dd>
                      </div>
                      <div className="flex justify-between text-sm">
                        <dt className="text-muted-foreground">Rastreamento:</dt>
                        <dd className="font-medium">{enableTracking ? "Ativado" : "Desativado"}</dd>
                      </div>
                      <div className="flex justify-between text-sm">
                        <dt className="text-muted-foreground">Auto-resposta:</dt>
                        <dd className="font-medium">{enableAutoResponse ? "Ativada" : "Desativada"}</dd>
                      </div>
                    </dl>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h4 className="text-sm font-medium mb-3">Prévia da Mensagem</h4>
                  <Card className="bg-muted/50">
                    <CardContent className="pt-4">
                      <p className="text-sm">{messageTemplate || "Nenhuma mensagem definida"}</p>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800">
                  <CardContent className="pt-6">
                    <div className="flex gap-3">
                      <AlertCircle className="h-5 w-5 text-yellow-600" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Atenção</p>
                        <p className="text-sm text-muted-foreground">
                          Após lançar a campanha, algumas configurações não poderão ser alteradas.
                          Certifique-se de que todas as informações estão corretas.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(currentStep - 1)}
                disabled={currentStep === 1}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleSaveDraft}>
                  <Save className="mr-2 h-4 w-4" />
                  Salvar Rascunho
                </Button>
                <Button onClick={handleLaunchCampaign}>
                  <Send className="mr-2 h-4 w-4" />
                  Lançar Campanha
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}