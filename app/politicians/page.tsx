"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PoliticiansDataTable } from "@/components/politicians/data-table";
import { PoliticianCard } from "@/components/politicians/politician-card";
import { useData } from "@/lib/contexts/data-context";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, LayoutGrid, List, GitCompare } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Politician } from "@/lib/types";

export default function PoliticiansPage() {
  const router = useRouter();
  const { politicians, isLoading } = useData();
  const [view, setView] = useState<"table" | "grid">("table");

  const handleEdit = (politician: Politician) => {
    // TODO: Open edit dialog
    console.log("Edit politician:", politician);
  };

  const handleViewDetails = (politician: Politician) => {
    // TODO: Navigate to details page
    console.log("View details:", politician);
  };

  const handleViewAnalytics = (politician: Politician) => {
    // TODO: Navigate to analytics page
    console.log("View analytics:", politician);
  };

  const handleStartCampaign = () => {
    // TODO: Open campaign creation dialog
    console.log("Start campaign");
  };

  const handleAddNew = () => {
    // TODO: Open new politician dialog
    console.log("Add new politician");
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-12 w-full" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-64" />
          ))}
        </div>
      </div>
    );
  }

  const activePolititians = politicians.filter(p => p.status === "active").length;
  const averageScore = politicians.reduce((sum, p) => sum + p.perceptionScore, 0) / politicians.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Políticos</h1>
          <p className="text-muted-foreground">
            Gerencie e monitore os políticos cadastrados na plataforma
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.push('/politicians/compare')}>
            <GitCompare className="mr-2 h-4 w-4" />
            Comparar
          </Button>
          <Button onClick={handleAddNew}>
            <Plus className="mr-2 h-4 w-4" />
            Novo Político
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">Total de Políticos</p>
          <p className="text-2xl font-bold">{politicians.length}</p>
        </div>
        <div className="rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">Contratos Ativos</p>
          <p className="text-2xl font-bold">{activePolititians}</p>
        </div>
        <div className="rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">Score Médio</p>
          <p className="text-2xl font-bold">{averageScore.toFixed(1)}</p>
        </div>
        <div className="rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">Taxa de Crescimento</p>
          <p className="text-2xl font-bold text-green-600">+12.5%</p>
        </div>
      </div>

      <Tabs value={view} onValueChange={(v) => setView(v as "table" | "grid")}>
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="table">
              <List className="mr-2 h-4 w-4" />
              Tabela
            </TabsTrigger>
            <TabsTrigger value="grid">
              <LayoutGrid className="mr-2 h-4 w-4" />
              Cards
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="table" className="mt-6">
          <PoliticiansDataTable
            politicians={politicians}
            onEdit={handleEdit}
            onViewDetails={handleViewDetails}
            onViewAnalytics={handleViewAnalytics}
          />
        </TabsContent>

        <TabsContent value="grid" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {politicians.map((politician) => (
              <PoliticianCard
                key={politician.id}
                politician={politician}
                onViewDetails={() => handleViewDetails(politician)}
                onViewAnalytics={() => handleViewAnalytics(politician)}
                onStartCampaign={handleStartCampaign}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}