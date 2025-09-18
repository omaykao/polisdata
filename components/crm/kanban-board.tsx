"use client";

import { useState, useMemo } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { PipelineCard } from "./pipeline-card";
import { CRMPipelineCard, PipelineStage } from "@/lib/types";
import { Draggable } from "./draggable";
import { DroppableColumn } from "./droppable-column";

interface KanbanBoardProps {
  cards: CRMPipelineCard[];
  onCardMove?: (cardId: string, newStage: PipelineStage) => void;
  onCardEdit?: (card: CRMPipelineCard) => void;
  onCardDelete?: (cardId: string) => void;
}

const STAGE_CONFIG: Record<PipelineStage, { label: string; color: string }> = {
  lead: { label: "Lead", color: "bg-gray-100 dark:bg-gray-800" },
  qualification: { label: "Qualificação", color: "bg-blue-50 dark:bg-blue-950" },
  proposal_sent: { label: "Proposta Enviada", color: "bg-purple-50 dark:bg-purple-950" },
  negotiation: { label: "Negociação", color: "bg-yellow-50 dark:bg-yellow-950" },
  document_collection: { label: "Documentação", color: "bg-orange-50 dark:bg-orange-950" },
  implementation: { label: "Implementação", color: "bg-indigo-50 dark:bg-indigo-950" },
  active_client: { label: "Cliente Ativo", color: "bg-green-50 dark:bg-green-950" },
  lost: { label: "Perdido", color: "bg-red-50 dark:bg-red-950" },
};

export function KanbanBoard({ cards, onCardMove, onCardEdit, onCardDelete }: KanbanBoardProps) {
  const [activeCard, setActiveCard] = useState<CRMPipelineCard | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const cardsByStage = useMemo(() => {
    const grouped: Record<PipelineStage, CRMPipelineCard[]> = {
      lead: [],
      qualification: [],
      proposal_sent: [],
      negotiation: [],
      document_collection: [],
      implementation: [],
      active_client: [],
      lost: [],
    };

    cards.forEach(card => {
      grouped[card.stage].push(card);
    });

    return grouped;
  }, [cards]);

  const handleDragStart = (event: DragStartEvent) => {
    const card = cards.find(c => c.id === event.active.id);
    if (card) {
      setActiveCard(card);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const cardId = active.id as string;
      const newStage = over.id as PipelineStage;

      if (Object.keys(STAGE_CONFIG).includes(newStage)) {
        onCardMove?.(cardId, newStage);
      }
    }

    setActiveCard(null);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 overflow-x-auto pb-4">
        {Object.entries(STAGE_CONFIG).map(([stage, config]) => {
          const stageCards = cardsByStage[stage as PipelineStage];
          const totalValue = stageCards.reduce((sum, card) => sum + (card.proposalValue || 0), 0);

          return (
            <DroppableColumn key={stage} id={stage}>
              <Card className={`min-w-[320px] ${config.color}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">
                      {config.label}
                    </CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      {stageCards.length}
                    </Badge>
                  </div>
                  {totalValue > 0 && (
                    <p className="text-xs text-muted-foreground mt-1">
                      R$ {totalValue.toLocaleString('pt-BR')}
                    </p>
                  )}
                </CardHeader>
                <CardContent className="p-3">
                  <ScrollArea className="h-[500px]">
                    <SortableContext
                      items={stageCards.map(card => card.id)}
                      strategy={verticalListSortingStrategy}
                    >
                      <div className="space-y-3">
                        {stageCards.map(card => (
                          <Draggable key={card.id} id={card.id}>
                            <PipelineCard
                              card={card}
                              onEdit={onCardEdit}
                              onDelete={onCardDelete}
                              onMove={onCardMove}
                            />
                          </Draggable>
                        ))}
                        {stageCards.length === 0 && (
                          <div className="text-center py-8 text-sm text-muted-foreground">
                            Nenhum card neste estágio
                          </div>
                        )}
                      </div>
                    </SortableContext>
                  </ScrollArea>
                </CardContent>
              </Card>
            </DroppableColumn>
          );
        })}
      </div>

      <DragOverlay>
        {activeCard && (
          <PipelineCard
            card={activeCard}
            onEdit={onCardEdit}
            onDelete={onCardDelete}
          />
        )}
      </DragOverlay>
    </DndContext>
  );
}