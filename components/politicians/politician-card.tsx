"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Politician } from "@/lib/types";
import {
  formatPercentage,
  formatDate,
  getStatusColor,
  getScoreColor,
  getInitials,
} from "@/lib/utils";
import {
  ChevronUp,
  ChevronDown,
  Phone,
  Mail,
  Calendar,
  TrendingUp,
  BarChart3,
  MessageSquare,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface PoliticianCardProps {
  politician: Politician;
  onViewDetails?: () => void;
  onStartCampaign?: () => void;
  onViewAnalytics?: () => void;
}

export function PoliticianCard({
  politician,
  onViewDetails,
  onStartCampaign,
  onViewAnalytics,
}: PoliticianCardProps) {
  const router = useRouter();

  const getTrendIcon = () => {
    if (politician.scoreTrend > 0) {
      return <ChevronUp className="h-4 w-4 text-green-600" />;
    } else if (politician.scoreTrend < 0) {
      return <ChevronDown className="h-4 w-4 text-red-600" />;
    }
    return null;
  };

  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => router.push(`/politicians/${politician.id}`)}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={politician.avatarUrl} alt={politician.name} />
              <AvatarFallback>{getInitials(politician.name)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{politician.name}</CardTitle>
              <CardDescription>{politician.position}</CardDescription>
            </div>
          </div>
          <Badge
            variant="secondary"
            className={getStatusColor(politician.status)}
          >
            {politician.status === "active"
              ? "Ativo"
              : politician.status === "inactive"
              ? "Inativo"
              : "Suspenso"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Score de Percepção</p>
            <div className="flex items-center gap-2 mt-1">
              <span
                className={`text-3xl font-bold ${getScoreColor(
                  politician.perceptionScore
                )}`}
              >
                {politician.perceptionScore}
              </span>
              <span className="text-sm text-muted-foreground">/100</span>
              <div className="flex items-center gap-1 ml-2">
                {getTrendIcon()}
                <span
                  className={
                    politician.scoreTrend > 0
                      ? "text-green-600 text-sm"
                      : politician.scoreTrend < 0
                      ? "text-red-600 text-sm"
                      : "text-sm"
                  }
                >
                  {formatPercentage(Math.abs(politician.scoreTrend), true)}
                </span>
              </div>
            </div>
          </div>
          <Badge variant="outline" className="text-sm">
            {politician.party}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Mail className="h-4 w-4" />
            <span className="truncate">{politician.email}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Phone className="h-4 w-4" />
            <span>{politician.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Contrato: {formatDate(politician.contractStartDate)}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <TrendingUp className="h-4 w-4" />
            <span>Análise: {formatDate(politician.lastAnalysisDate)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t">
          <Badge variant="outline" className="text-xs">
            {politician.contractedPlan === "basic"
              ? "Plano Básico"
              : politician.contractedPlan === "professional"
              ? "Plano Profissional"
              : "Plano Empresarial"}
          </Badge>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onViewAnalytics?.();
              }}
            >
              <BarChart3 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onStartCampaign?.();
              }}
            >
              <MessageSquare className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}