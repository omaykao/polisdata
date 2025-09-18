"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Politician, WhatsAppCampaign } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { CalendarIcon, MessageSquare, Users, Target, Clock, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface CampaignFormProps {
  politicians: Politician[];
  campaign?: WhatsAppCampaign;
  onSubmit: (data: Partial<WhatsAppCampaign>) => void;
  onCancel: () => void;
}

export function CampaignForm({ politicians, campaign, onSubmit, onCancel }: CampaignFormProps) {
  const [formData, setFormData] = useState({
    name: campaign?.name || "",
    politicianId: campaign?.politicianId || "",
    messageTemplate: campaign?.messageTemplate || "",
    targetAudience: "all",
    estimatedMessages: 10000,
    scheduledDate: campaign?.scheduledDate || null,
    isScheduled: false,
    testMode: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nome da campanha é obrigatório";
    }
    if (!formData.politicianId) {
      newErrors.politicianId = "Selecione um político";
    }
    if (!formData.messageTemplate.trim()) {
      newErrors.messageTemplate = "Mensagem é obrigatória";
    }
    if (formData.messageTemplate.length > 1000) {
      newErrors.messageTemplate = "Mensagem deve ter no máximo 1000 caracteres";
    }
    if (formData.isScheduled && !formData.scheduledDate) {
      newErrors.scheduledDate = "Selecione uma data para agendamento";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const campaignData: Partial<WhatsAppCampaign> = {
        name: formData.name,
        politicianId: formData.politicianId,
        messageTemplate: formData.messageTemplate,
        totalMessages: formData.estimatedMessages,
        status: formData.isScheduled ? 'scheduled' : 'draft',
        scheduledDate: formData.scheduledDate || undefined,
      };
      onSubmit(campaignData);
    }
  };

  const messageVariables = [
    "{nome}",
    "{cargo}",
    "{cidade}",
    "{data}",
    "{link}",
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <MessageSquare className="inline-block mr-2 h-5 w-5" />
          {campaign ? "Editar Campanha" : "Nova Campanha WhatsApp"}
        </CardTitle>
        <CardDescription>
          Configure e envie pesquisas via WhatsApp para coletar dados da população
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Nome da Campanha</Label>
              <Input
                id="name"
                placeholder="Ex: Pesquisa de Satisfação Regional"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={errors.name ? "border-destructive" : ""}
              />
              {errors.name && (
                <p className="text-sm text-destructive mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <Label htmlFor="politician">Político</Label>
              <Select
                value={formData.politicianId}
                onValueChange={(value) => setFormData({ ...formData, politicianId: value })}
              >
                <SelectTrigger className={errors.politicianId ? "border-destructive" : ""}>
                  <SelectValue placeholder="Selecione um político" />
                </SelectTrigger>
                <SelectContent>
                  {politicians
                    .filter(p => p.status === 'active')
                    .map((politician) => (
                      <SelectItem key={politician.id} value={politician.id}>
                        {politician.name} - {politician.party}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              {errors.politicianId && (
                <p className="text-sm text-destructive mt-1">{errors.politicianId}</p>
              )}
            </div>
          </div>

          {/* Message Configuration */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="message">Mensagem da Pesquisa</Label>
              <Textarea
                id="message"
                placeholder="Digite a mensagem que será enviada..."
                value={formData.messageTemplate}
                onChange={(e) => setFormData({ ...formData, messageTemplate: e.target.value })}
                className={cn("min-h-[120px]", errors.messageTemplate ? "border-destructive" : "")}
              />
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-muted-foreground">
                  {formData.messageTemplate.length}/1000 caracteres
                </p>
                {errors.messageTemplate && (
                  <p className="text-sm text-destructive">{errors.messageTemplate}</p>
                )}
              </div>
            </div>

            <div>
              <Label>Variáveis Disponíveis</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {messageVariables.map((variable) => (
                  <Badge
                    key={variable}
                    variant="secondary"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        messageTemplate: formData.messageTemplate + " " + variable,
                      });
                    }}
                  >
                    {variable}
                  </Badge>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Clique para adicionar à mensagem
              </p>
            </div>
          </div>

          {/* Target Audience */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="audience">Público-Alvo</Label>
              <Select
                value={formData.targetAudience}
                onValueChange={(value) => setFormData({ ...formData, targetAudience: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Contatos</SelectItem>
                  <SelectItem value="supporters">Apoiadores</SelectItem>
                  <SelectItem value="undecided">Indecisos</SelectItem>
                  <SelectItem value="opponents">Oposição</SelectItem>
                  <SelectItem value="young">Jovens (18-29)</SelectItem>
                  <SelectItem value="adults">Adultos (30-59)</SelectItem>
                  <SelectItem value="elderly">Idosos (60+)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="estimated">Mensagens Estimadas</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="estimated"
                  type="number"
                  min="100"
                  max="1000000"
                  value={formData.estimatedMessages}
                  onChange={(e) =>
                    setFormData({ ...formData, estimatedMessages: parseInt(e.target.value) })
                  }
                />
                <div className="text-sm text-muted-foreground">
                  <Users className="inline-block mr-1 h-4 w-4" />
                  contatos
                </div>
              </div>
            </div>
          </div>

          {/* Scheduling */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Agendar Envio</Label>
                <p className="text-sm text-muted-foreground">
                  Programe o envio para uma data futura
                </p>
              </div>
              <Switch
                checked={formData.isScheduled}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, isScheduled: checked })
                }
              />
            </div>

            {formData.isScheduled && (
              <div>
                <Label>Data e Hora</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.scheduledDate && "text-muted-foreground",
                        errors.scheduledDate && "border-destructive"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.scheduledDate
                        ? formatDate(formData.scheduledDate)
                        : "Selecione uma data"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.scheduledDate || undefined}
                      onSelect={(date) =>
                        setFormData({ ...formData, scheduledDate: date || null })
                      }
                      initialFocus
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
                {errors.scheduledDate && (
                  <p className="text-sm text-destructive mt-1">{errors.scheduledDate}</p>
                )}
              </div>
            )}
          </div>

          {/* Test Mode */}
          <div className="rounded-lg border p-4 bg-muted/50">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Modo de Teste</Label>
                <p className="text-sm text-muted-foreground">
                  Enviar apenas para números de teste
                </p>
              </div>
              <Switch
                checked={formData.testMode}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, testMode: checked })
                }
              />
            </div>
            {formData.testMode && (
              <div className="mt-3 flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  A campanha será enviada apenas para 10 números de teste predefinidos
                </p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="submit">
              {campaign ? "Salvar Alterações" : "Criar Campanha"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}