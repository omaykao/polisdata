"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { EmergingNarrative } from "@/lib/types";
import { formatPercentage, formatNumber, getRelativeTime } from "@/lib/utils";
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Eye,
  MessageSquare,
  Hash,
  Zap,
  BarChart3,
} from "lucide-react";

interface EmergingNarrativesProps {
  narratives: EmergingNarrative[];
  onViewDetails?: (narrative: EmergingNarrative) => void;
  onTakeAction?: (narrative: EmergingNarrative) => void;
}

export function EmergingNarratives({
  narratives,
  onViewDetails,
  onTakeAction,
}: EmergingNarrativesProps) {
  const getSentimentIcon = (sentiment: EmergingNarrative['sentiment']) => {
    switch (sentiment) {
      case 'positive':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'negative':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      case 'mixed':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
    }
  };

  const getSentimentColor = (sentiment: EmergingNarrative['sentiment']) => {
    switch (sentiment) {
      case 'positive':
        return 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-950';
      case 'negative':
        return 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950';
      case 'mixed':
        return 'text-yellow-600 bg-yellow-50 dark:text-yellow-400 dark:bg-yellow-950';
    }
  };

  const getVelocityColor = (velocity: EmergingNarrative['velocity']) => {
    switch (velocity) {
      case 'high':
        return 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50 dark:text-yellow-400 dark:bg-yellow-950';
      case 'low':
        return 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950';
    }
  };

  const getStatusColor = (status: EmergingNarrative['status']) => {
    switch (status) {
      case 'emerging':
        return 'text-purple-600 bg-purple-50 dark:text-purple-400 dark:bg-purple-950';
      case 'trending':
        return 'text-orange-600 bg-orange-50 dark:text-orange-400 dark:bg-orange-950';
      case 'declining':
        return 'text-gray-600 bg-gray-50 dark:text-gray-400 dark:bg-gray-950';
      case 'resolved':
        return 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-950';
    }
  };

  const sortedNarratives = [...narratives].sort((a, b) => b.impactScore - a.impactScore);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Narrativas Emergentes</CardTitle>
        <CardDescription>
          Tópicos e tendências identificadas pela IA em tempo real
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedNarratives.map((narrative) => (
            <div
              key={narrative.id}
              className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {getSentimentIcon(narrative.sentiment)}
                    <h4 className="font-medium">{narrative.narrative}</h4>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge
                      variant="outline"
                      className={getSentimentColor(narrative.sentiment)}
                    >
                      {narrative.sentiment === 'positive' ? 'Positivo' :
                       narrative.sentiment === 'negative' ? 'Negativo' : 'Misto'}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={getVelocityColor(narrative.velocity)}
                    >
                      <Zap className="mr-1 h-3 w-3" />
                      Velocidade {
                        narrative.velocity === 'high' ? 'Alta' :
                        narrative.velocity === 'medium' ? 'Média' : 'Baixa'
                      }
                    </Badge>
                    <Badge
                      variant="outline"
                      className={getStatusColor(narrative.status)}
                    >
                      {narrative.status === 'emerging' ? 'Emergindo' :
                       narrative.status === 'trending' ? 'Em Alta' :
                       narrative.status === 'declining' ? 'Declinando' : 'Resolvido'}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Impacto</p>
                      <div className="flex items-center gap-2">
                        <Progress
                          value={narrative.impactScore}
                          className="h-2 flex-1"
                        />
                        <span className="font-medium">{narrative.impactScore}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Menções</p>
                      <p className="font-medium">{formatNumber(narrative.mentionCount)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Crescimento</p>
                      <p className={`font-medium ${
                        narrative.growthRate > 0 ? 'text-green-600' :
                        narrative.growthRate < 0 ? 'text-red-600' : ''
                      }`}>
                        {formatPercentage(narrative.growthRate, true)}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Confiança</p>
                      <p className="font-medium">{formatPercentage(narrative.confidence * 100)}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {narrative.keywords.map((keyword, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        <Hash className="mr-1 h-3 w-3" />
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Detectado {getRelativeTime(narrative.firstDetected)}
                  </p>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewDetails?.(narrative)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onTakeAction?.(narrative)}
                  >
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {narratives.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <BarChart3 className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>Nenhuma narrativa emergente detectada</p>
              <p className="text-sm mt-1">
                O sistema monitora continuamente as redes sociais e mídias
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}