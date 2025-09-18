"use client";

import { KPICards } from "@/components/dashboard/kpi-cards";
import { SentimentChart } from "@/components/dashboard/sentiment-chart";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { useData } from "@/lib/contexts/data-context";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const { dashboardKPIs, isLoading } = useData();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <div className="grid gap-6 lg:grid-cols-7">
          <Skeleton className="h-[400px] lg:col-span-3" />
          <Skeleton className="h-[400px] lg:col-span-4" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Visão geral da inteligência política em tempo real
          </p>
        </div>
      </div>

      <KPICards data={dashboardKPIs} />

      <div className="grid gap-6 lg:grid-cols-7">
        <div className="lg:col-span-3">
          <SentimentChart data={dashboardKPIs.sentimentDistribution} />
        </div>
        <div className="lg:col-span-4">
          <ActivityFeed activities={dashboardKPIs.recentActivities} />
        </div>
      </div>
    </div>
  );
}