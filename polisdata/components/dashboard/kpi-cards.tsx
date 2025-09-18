"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MessageSquare, TrendingUp, Activity } from "lucide-react";
import { formatNumber, formatPercentage } from "@/lib/utils";
import { DashboardKPIs } from "@/lib/types";

interface KPICardsProps {
  data: DashboardKPIs;
}

export function KPICards({ data }: KPICardsProps) {
  const kpis = [
    {
      title: "Clientes Ativos",
      value: data.activeClients,
      icon: Users,
      description: "Políticos com contratos ativos",
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-950",
    },
    {
      title: "Campanhas em Andamento",
      value: data.ongoingCampaigns,
      icon: Activity,
      description: "Campanhas de WhatsApp ativas",
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-950",
    },
    {
      title: "Mensagens (30 dias)",
      value: formatNumber(data.messagesLast30Days),
      icon: MessageSquare,
      description: "Total de mensagens enviadas",
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-950",
    },
    {
      title: "Taxa de Resposta",
      value: formatPercentage(data.averageResponseRate),
      icon: TrendingUp,
      description: "Média de respostas recebidas",
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-50 dark:bg-orange-950",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {kpis.map((kpi, index) => (
        <Card key={index} className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {kpi.title}
            </CardTitle>
            <div className={`rounded-lg p-2 ${kpi.bgColor}`}>
              <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpi.value}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {kpi.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}