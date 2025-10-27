"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PoliticianDashboard } from "@/components/politicians/politician-dashboard";
import { SentimentHistoryChart } from "@/components/politicians/sentiment-history-chart";
import { EmergingNarratives } from "@/components/politicians/emerging-narratives";
import { useData } from "@/lib/contexts/data-context";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Politician } from "@/lib/types";

export default function PoliticianDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { politicians, campaigns, socialMentions, emergingNarratives, isLoading } = useData();
  const [politician, setPolitician] = useState<Politician | undefined>(undefined);

  useEffect(() => {
    if (params?.id && politicians.length > 0) {
      const foundPolitician = politicians.find(p => p.id === params.id);
      setPolitician(foundPolitician);
    }
  }, [params?.id, politicians]);

  const politicianCampaigns = params?.id ? campaigns.filter(c => c.politicianId === params.id) : [];
  const politicianMentions = params?.id ? socialMentions.filter(m => m.politicianId === params.id) : [];
  const politicianNarratives = params?.id ? emergingNarratives.filter(n => n.politicianId === params.id) : [];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-40 w-full" />
        <div className="grid gap-4 md:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <Skeleton className="h-96 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (!politician) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <h2 className="text-2xl font-semibold">Político não encontrado</h2>
        <p className="text-muted-foreground">
          O político que você está procurando não existe ou foi removido.
        </p>
        <Button onClick={() => router.push('/politicians')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para Políticos
        </Button>
      </div>
    );
  }

  const handleEdit = () => {
    // TODO: Open edit dialog
    console.log("Edit politician:", politician);
  };

  const handleNewCampaign = () => {
    // TODO: Open campaign creation dialog
    console.log("Create new campaign for:", politician.name);
  };

  const handleGenerateReport = () => {
    // TODO: Generate report
    console.log("Generate report for:", politician.name);
  };

  const handleViewNarrativeDetails = (narrative: any) => {
    // TODO: Show narrative details
    console.log("View narrative details:", narrative);
  };

  const handleTakeAction = (narrative: any) => {
    // TODO: Take action on narrative
    console.log("Take action on narrative:", narrative);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push('/politicians')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
      </div>

      <PoliticianDashboard
        politician={politician}
        campaigns={politicianCampaigns}
        mentions={politicianMentions}
        onEdit={handleEdit}
        onNewCampaign={handleNewCampaign}
        onGenerateReport={handleGenerateReport}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <SentimentHistoryChart politicianId={politician.id} />
        <EmergingNarratives
          narratives={politicianNarratives}
          onViewDetails={handleViewNarrativeDetails}
          onTakeAction={handleTakeAction}
        />
      </div>
    </div>
  );
}