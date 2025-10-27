"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, X, Save, Sparkles } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function NewPoliticianPage() {
  const router = useRouter();
  const [competitors, setCompetitors] = useState<string[]>([]);
  const [currentCompetitor, setCurrentCompetitor] = useState("");

  const handleAddCompetitor = () => {
    if (currentCompetitor.trim() && !competitors.includes(currentCompetitor.trim())) {
      setCompetitors([...competitors, currentCompetitor.trim()]);
      setCurrentCompetitor("");
    }
  };

  const handleRemoveCompetitor = (competitor: string) => {
    setCompetitors(competitors.filter(c => c !== competitor));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Implementar lógica de salvamento
    console.log("Formulário enviado");
    router.push("/politicians");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push('/politicians')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Novo Político</h1>
          <p className="text-muted-foreground">
            Cadastre um novo político na plataforma
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6">
          {/* Informações Básicas */}
          <Card>
            <CardHeader>
              <CardTitle>Informações Básicas</CardTitle>
              <CardDescription>
                Dados fundamentais do político
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo *</Label>
                  <Input
                    id="name"
                    placeholder="Ex: João da Silva Santos"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position">Cargo Político *</Label>
                  <Select required>
                    <SelectTrigger id="position">
                      <SelectValue placeholder="Selecione o cargo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="prefeito">Prefeito</SelectItem>
                      <SelectItem value="vereador">Vereador</SelectItem>
                      <SelectItem value="deputado-estadual">Deputado Estadual</SelectItem>
                      <SelectItem value="deputado-federal">Deputado Federal</SelectItem>
                      <SelectItem value="senador">Senador</SelectItem>
                      <SelectItem value="governador">Governador</SelectItem>
                      <SelectItem value="presidente">Presidente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="party">Partido *</Label>
                  <Input
                    id="party"
                    placeholder="Ex: PT, PSDB, MDB"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@gmail.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(00) 00000-0000"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status *</Label>
                  <Select required defaultValue="active">
                    <SelectTrigger id="status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Ativo</SelectItem>
                      <SelectItem value="inactive">Inativo</SelectItem>
                      <SelectItem value="suspended">Suspenso</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="avatarUrl">URL da Foto (opcional)</Label>
                <Input
                  id="avatarUrl"
                  type="url"
                  placeholder="https://exemplo.com/foto.jpg"
                />
              </div>
            </CardContent>
          </Card>

          {/* Contrato e Plano */}
          <Card>
            <CardHeader>
              <CardTitle>Informações de Contrato</CardTitle>
              <CardDescription>
                Detalhes do plano contratado
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="contractedPlan">Plano Contratado *</Label>
                  <Select required>
                    <SelectTrigger id="contractedPlan">
                      <SelectValue placeholder="Selecione o plano" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Plano Básico</SelectItem>
                      <SelectItem value="campanha_monitoramento_ativo">
                        Campanha de Monitoramento Ativo
                      </SelectItem>
                      <SelectItem value="enterprise">Plano Empresarial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contractStartDate">Início do Contrato *</Label>
                  <Input
                    id="contractStartDate"
                    type="date"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contractEndDate">Término do Contrato *</Label>
                  <Input
                    id="contractEndDate"
                    type="date"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Concorrentes Diretos */}
          <Card>
            <CardHeader>
              <CardTitle>Concorrentes Diretos</CardTitle>
              <CardDescription>
                Liste os principais concorrentes políticos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <div className="flex-1 space-y-2">
                  <Label htmlFor="competitor">Adicionar Concorrente</Label>
                  <div className="flex gap-2">
                    <Input
                      id="competitor"
                      placeholder="Nome do concorrente"
                      value={currentCompetitor}
                      onChange={(e) => setCurrentCompetitor(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddCompetitor();
                        }
                      }}
                    />
                    <Button
                      type="button"
                      onClick={handleAddCompetitor}
                      disabled={!currentCompetitor.trim()}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {competitors.length > 0 && (
                <div className="space-y-2">
                  <Label>Concorrentes Adicionados</Label>
                  <div className="flex flex-wrap gap-2">
                    {competitors.map((competitor) => (
                      <Badge
                        key={competitor}
                        variant="secondary"
                        className="pr-1"
                      >
                        {competitor}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-auto p-1 ml-1"
                          onClick={() => handleRemoveCompetitor(competitor)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Descrição Detalhada para IA */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Contexto para Inteligência Artificial
              </CardTitle>
              <CardDescription>
                Forneça informações detalhadas que serão utilizadas pela IA para análises e recomendações personalizadas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="aiContext">
                  Descrição Detalhada para IA
                </Label>
                <Textarea
                  id="aiContext"
                  placeholder="Descreva o histórico político, principais bandeiras, base eleitoral, estilo de comunicação, propostas, pontos fortes e fracos, desafios atuais, objetivos políticos, contexto regional/local, e qualquer outra informação relevante que ajude a IA a entender melhor este político e gerar análises mais precisas..."
                  className="min-h-[200px] resize-y"
                />
                <p className="text-xs text-muted-foreground">
                  Quanto mais detalhado for o contexto fornecido, melhores serão as análises e recomendações da IA.
                  Inclua informações sobre trajetória política, principais feitos, desafios enfrentados, estratégias de campanha, perfil do eleitorado, etc.
                </p>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="politicalGoals">Objetivos Políticos</Label>
                <Textarea
                  id="politicalGoals"
                  placeholder="Quais são os principais objetivos políticos? Ex: reeleição, aprovação de projetos específicos, fortalecimento da base eleitoral em determinadas regiões..."
                  className="min-h-[100px] resize-y"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="keyIssues">Principais Bandeiras e Pautas</Label>
                <Textarea
                  id="keyIssues"
                  placeholder="Quais são as principais bandeiras políticas e pautas defendidas? Ex: educação, saúde, segurança pública, meio ambiente, economia..."
                  className="min-h-[100px] resize-y"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetAudience">Público-Alvo e Base Eleitoral</Label>
                <Textarea
                  id="targetAudience"
                  placeholder="Descreva o perfil da base eleitoral e público-alvo. Ex: faixa etária, regiões de maior apoio, classes sociais, grupos específicos..."
                  className="min-h-[100px] resize-y"
                />
              </div>
            </CardContent>
          </Card>

          {/* Botões de Ação */}
          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/politicians')}
            >
              Cancelar
            </Button>
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              Salvar Político
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
