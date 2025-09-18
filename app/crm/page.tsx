"use client";

import { useState } from "react";
import { KanbanBoard } from "@/components/crm/kanban-board";
import { useData } from "@/lib/contexts/data-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { CRMPipelineCard, PipelineStage } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

export default function CRMPage() {
  const { crmCards, updateCRMCard, isLoading } = useData();
  const [searchQuery, setSearchQuery] = useState("");

  const handleCardMove = (cardId: string, newStage: PipelineStage) => {
    updateCRMCard(cardId, { stage: newStage });
  };

  const handleCardEdit = (card: CRMPipelineCard) => {
    // TODO: Open edit dialog
    console.log("Edit card:", card);
  };

  const handleCardDelete = (cardId: string) => {
    // TODO: Implement delete with confirmation
    console.log("Delete card:", cardId);
  };

  const handleAddNew = () => {
    // TODO: Open new card dialog
    console.log("Add new card");
  };

  const filteredCards = crmCards.filter(card =>
    card.prospectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    card.party?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    card.position?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-full" />
        <div className="flex gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-[600px] min-w-[320px]" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">CRM Pipeline</h1>
          <p className="text-muted-foreground">
            Gerencie prospects e clientes em processo de contratação
          </p>
        </div>
        <Button onClick={handleAddNew}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Prospect
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome, partido ou cargo..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{filteredCards.length} cards</span>
          <span>•</span>
          <span>
            R$ {filteredCards
              .reduce((sum, card) => sum + (card.proposalValue || 0), 0)
              .toLocaleString('pt-BR')} total
          </span>
        </div>
      </div>

      <KanbanBoard
        cards={filteredCards}
        onCardMove={handleCardMove}
        onCardEdit={handleCardEdit}
        onCardDelete={handleCardDelete}
      />
    </div>
  );
}