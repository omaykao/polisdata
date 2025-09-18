"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Politician, WhatsAppCampaign } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { CalendarIcon, FileText, Download, Send, Eye, Settings, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReportGeneratorProps {
  politicians: Politician[];
  campaigns: WhatsAppCampaign[];
  onGenerate: (config: ReportConfig) => void;
  onCancel: () => void;
}

export interface ReportConfig {
  title: string;
  type: 'executive' | 'detailed' | 'sentiment' | 'campaign' | 'social' | 'custom';
  format: 'pdf' | 'excel' | 'ppt' | 'json';
  politician?: string;
  campaign?: string;
  dateRange: {
    from: Date | null;
    to: Date | null;
  };
  sections: {
    summary: boolean;
    sentiment: boolean;
    campaigns: boolean;
    social: boolean;
    narratives: boolean;
    recommendations: boolean;
    charts: boolean;
    rawData: boolean;
  };
  schedule?: {
    frequency: 'once' | 'daily' | 'weekly' | 'monthly';
    recipients: string[];
  };
  notes?: string;
}

export function ReportGenerator({
  politicians,
  campaigns,
  onGenerate,
  onCancel,
}: ReportGeneratorProps) {
  const [config, setConfig] = useState<ReportConfig>({
    title: "",
    type: 'executive',
    format: 'pdf',
    dateRange: {
      from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      to: new Date(),
    },
    sections: {
      summary: true,
      sentiment: true,
      campaigns: true,
      social: true,
      narratives: true,
      recommendations: true,
      charts: true,
      rawData: false,
    },
  });

  const [recipients, setRecipients] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const reportTypes = [
    { value: 'executive', label: 'Relatório Executivo', description: 'Resumo gerencial com principais insights' },
    { value: 'detailed', label: 'Relatório Detalhado', description: 'Análise completa com todos os dados' },
    { value: 'sentiment', label: 'Análise de Sentimento', description: 'Foco em percepção e sentimento público' },
    { value: 'campaign', label: 'Performance de Campanha', description: 'Resultados e métricas de campanhas' },
    { value: 'social', label: 'Monitoramento Social', description: 'Análise de redes sociais e mídia' },
    { value: 'custom', label: 'Personalizado', description: 'Configure as seções manualmente' },
  ];

  const formatOptions = [
    { value: 'pdf', label: 'PDF', icon: '📄' },
    { value: 'excel', label: 'Excel', icon: '📊' },
    { value: 'ppt', label: 'PowerPoint', icon: '📽️' },
    { value: 'json', label: 'JSON', icon: '{ }' },
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!config.title.trim()) {
      newErrors.title = "Título do relatório é obrigatório";
    }

    if (!config.dateRange.from || !config.dateRange.to) {
      newErrors.dateRange = "Período é obrigatório";
    }

    if (config.schedule && recipients) {
      const emails = recipients.split(',').map(e => e.trim());
      const invalidEmails = emails.filter(e => !e.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/));
      if (invalidEmails.length > 0) {
        newErrors.recipients = "E-mails inválidos detectados";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const finalConfig = {
        ...config,
        schedule: config.schedule ? {
          ...config.schedule,
          recipients: recipients.split(',').map(e => e.trim()),
        } : undefined,
      };
      onGenerate(finalConfig);
    }
  };

  const updateSectionsBasedOnType = (type: string) => {
    const sections = { ...config.sections };

    switch (type) {
      case 'executive':
        sections.summary = true;
        sections.sentiment = true;
        sections.campaigns = true;
        sections.social = false;
        sections.narratives = true;
        sections.recommendations = true;
        sections.charts = true;
        sections.rawData = false;
        break;
      case 'detailed':
        Object.keys(sections).forEach(key => {
          sections[key as keyof typeof sections] = true;
        });
        break;
      case 'sentiment':
        sections.summary = true;
        sections.sentiment = true;
        sections.campaigns = false;
        sections.social = true;
        sections.narratives = true;
        sections.recommendations = true;
        sections.charts = true;
        sections.rawData = false;
        break;
      case 'campaign':
        sections.summary = true;
        sections.sentiment = false;
        sections.campaigns = true;
        sections.social = false;
        sections.narratives = false;
        sections.recommendations = true;
        sections.charts = true;
        sections.rawData = true;
        break;
      case 'social':
        sections.summary = true;
        sections.sentiment = true;
        sections.campaigns = false;
        sections.social = true;
        sections.narratives = true;
        sections.recommendations = false;
        sections.charts = true;
        sections.rawData = false;
        break;
    }

    setConfig({ ...config, type: type as ReportConfig['type'], sections });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <FileText className="inline-block mr-2 h-5 w-5" />
          Gerar Relatório
        </CardTitle>
        <CardDescription>
          Configure e gere relatórios personalizados de análise política
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Report Title */}
          <div>
            <Label htmlFor="title">Título do Relatório</Label>
            <Input
              id="title"
              placeholder="Ex: Análise Mensal - João Silva"
              value={config.title}
              onChange={(e) => setConfig({ ...config, title: e.target.value })}
              className={errors.title ? "border-destructive" : ""}
            />
            {errors.title && (
              <p className="text-sm text-destructive mt-1">{errors.title}</p>
            )}
          </div>

          {/* Report Type */}
          <div>
            <Label>Tipo de Relatório</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
              {reportTypes.map((type) => (
                <div
                  key={type.value}
                  className={cn(
                    "border rounded-lg p-3 cursor-pointer transition-all",
                    config.type === type.value
                      ? "border-primary bg-primary/5"
                      : "hover:border-muted-foreground/50"
                  )}
                  onClick={() => updateSectionsBasedOnType(type.value)}
                >
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium">{type.label}</p>
                    {config.type === type.value && (
                      <Badge variant="default" className="text-xs">Selecionado</Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{type.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Format Selection */}
          <div>
            <Label>Formato de Exportação</Label>
            <div className="flex gap-2 mt-2">
              {formatOptions.map((format) => (
                <Button
                  key={format.value}
                  type="button"
                  variant={config.format === format.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setConfig({ ...config, format: format.value as ReportConfig['format'] })}
                >
                  <span className="mr-1">{format.icon}</span>
                  {format.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Filters */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="politician">Político (Opcional)</Label>
              <Select
                value={config.politician}
                onValueChange={(value) => setConfig({ ...config, politician: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Todos os políticos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Políticos</SelectItem>
                  {politicians
                    .filter(p => p.status === 'active')
                    .map((politician) => (
                      <SelectItem key={politician.id} value={politician.id}>
                        {politician.name} - {politician.party}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="campaign">Campanha (Opcional)</Label>
              <Select
                value={config.campaign}
                onValueChange={(value) => setConfig({ ...config, campaign: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Todas as campanhas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as Campanhas</SelectItem>
                  {campaigns.map((campaign) => (
                    <SelectItem key={campaign.id} value={campaign.id}>
                      {campaign.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Date Range */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Data Inicial</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !config.dateRange.from && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {config.dateRange.from
                      ? formatDate(config.dateRange.from)
                      : "Selecione uma data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={config.dateRange.from || undefined}
                    onSelect={(date) =>
                      setConfig({
                        ...config,
                        dateRange: { ...config.dateRange, from: date || null },
                      })
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label>Data Final</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !config.dateRange.to && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {config.dateRange.to
                      ? formatDate(config.dateRange.to)
                      : "Selecione uma data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={config.dateRange.to || undefined}
                    onSelect={(date) =>
                      setConfig({
                        ...config,
                        dateRange: { ...config.dateRange, to: date || null },
                      })
                    }
                    initialFocus
                    disabled={(date) =>
                      config.dateRange.from ? date < config.dateRange.from : false
                    }
                  />
                </PopoverContent>
              </Popover>
            </div>
            {errors.dateRange && (
              <p className="text-sm text-destructive col-span-2">{errors.dateRange}</p>
            )}
          </div>

          {/* Sections */}
          {config.type === 'custom' && (
            <div>
              <Label>Seções do Relatório</Label>
              <div className="space-y-3 mt-2">
                {Object.entries({
                  summary: 'Resumo Executivo',
                  sentiment: 'Análise de Sentimento',
                  campaigns: 'Performance de Campanhas',
                  social: 'Monitoramento de Redes Sociais',
                  narratives: 'Narrativas Emergentes',
                  recommendations: 'Recomendações Estratégicas',
                  charts: 'Gráficos e Visualizações',
                  rawData: 'Dados Brutos',
                }).map(([key, label]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <Checkbox
                      id={key}
                      checked={config.sections[key as keyof typeof config.sections]}
                      onCheckedChange={(checked) =>
                        setConfig({
                          ...config,
                          sections: {
                            ...config.sections,
                            [key]: checked,
                          },
                        })
                      }
                    />
                    <Label htmlFor={key} className="font-normal cursor-pointer">
                      {label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Schedule */}
          <div>
            <Label>Agendamento (Opcional)</Label>
            <Select
              value={config.schedule?.frequency}
              onValueChange={(value) =>
                setConfig({
                  ...config,
                  schedule: value ? {
                    frequency: value as ReportConfig['schedule']['frequency'],
                    recipients: config.schedule?.recipients || [],
                  } : undefined,
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Sem agendamento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Sem Agendamento</SelectItem>
                <SelectItem value="once">Apenas Uma Vez</SelectItem>
                <SelectItem value="daily">Diário</SelectItem>
                <SelectItem value="weekly">Semanal</SelectItem>
                <SelectItem value="monthly">Mensal</SelectItem>
              </SelectContent>
            </Select>

            {config.schedule && (
              <div className="mt-3">
                <Label htmlFor="recipients">E-mails dos Destinatários</Label>
                <Input
                  id="recipients"
                  placeholder="email1@example.com, email2@example.com"
                  value={recipients}
                  onChange={(e) => setRecipients(e.target.value)}
                  className={errors.recipients ? "border-destructive" : ""}
                />
                {errors.recipients && (
                  <p className="text-sm text-destructive mt-1">{errors.recipients}</p>
                )}
              </div>
            )}
          </div>

          {/* Notes */}
          <div>
            <Label htmlFor="notes">Observações (Opcional)</Label>
            <Textarea
              id="notes"
              placeholder="Adicione observações ou instruções especiais..."
              value={config.notes}
              onChange={(e) => setConfig({ ...config, notes: e.target.value })}
              className="min-h-[80px]"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="button" variant="outline">
              <Eye className="mr-2 h-4 w-4" />
              Visualizar
            </Button>
            <Button type="submit">
              <Download className="mr-2 h-4 w-4" />
              Gerar Relatório
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}