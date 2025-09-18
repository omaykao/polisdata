"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Activity } from "@/lib/types";
import { getRelativeTime } from "@/lib/utils";
import {
  BarChart3,
  MessageSquare,
  FileText,
  AlertCircle,
  Activity as ActivityIcon
} from "lucide-react";

interface ActivityFeedProps {
  activities: Activity[];
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'sentiment_analysis':
        return BarChart3;
      case 'campaign_started':
        return MessageSquare;
      case 'report_generated':
        return FileText;
      case 'alert':
        return AlertCircle;
      default:
        return ActivityIcon;
    }
  };

  const getActivityColor = (type: Activity['type']) => {
    switch (type) {
      case 'sentiment_analysis':
        return "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400";
      case 'campaign_started':
        return "bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-400";
      case 'report_generated':
        return "bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400";
      case 'alert':
        return "bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400";
      default:
        return "bg-gray-50 text-gray-600 dark:bg-gray-950 dark:text-gray-400";
    }
  };

  const getActivityBadge = (type: Activity['type']) => {
    switch (type) {
      case 'sentiment_analysis':
        return "Análise";
      case 'campaign_started':
        return "Campanha";
      case 'report_generated':
        return "Relatório";
      case 'alert':
        return "Alerta";
      default:
        return "Atividade";
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Atividades Recentes</CardTitle>
        <CardDescription>
          Últimas ações e eventos da plataforma
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {activities.map((activity) => {
              const Icon = getActivityIcon(activity.type);
              const color = getActivityColor(activity.type);
              const badge = getActivityBadge(activity.type);

              return (
                <div
                  key={activity.id}
                  className="flex items-start space-x-3 pb-4 border-b last:border-0"
                >
                  <div className={`rounded-lg p-2 ${color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">
                        {activity.politicianName}
                      </p>
                      <Badge variant="secondary" className="text-xs">
                        {badge}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {activity.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {getRelativeTime(activity.timestamp)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}