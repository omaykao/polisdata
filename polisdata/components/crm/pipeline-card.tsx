"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CRMPipelineCard } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  MoreVertical,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  User,
  Building,
} from "lucide-react";

interface PipelineCardProps {
  card: CRMPipelineCard;
  onMove?: (cardId: string, newStage: CRMPipelineCard['stage']) => void;
  onEdit?: (card: CRMPipelineCard) => void;
  onDelete?: (cardId: string) => void;
}

export function PipelineCard({ card, onMove, onEdit, onDelete }: PipelineCardProps) {
  const probabilityColor =
    card.probability >= 70 ? "text-green-600 dark:text-green-400" :
    card.probability >= 40 ? "text-yellow-600 dark:text-yellow-400" :
    "text-red-600 dark:text-red-400";

  return (
    <Card className="cursor-move hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h4 className="font-medium text-sm line-clamp-1">{card.prospectName}</h4>
            {card.position && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <User className="h-3 w-3" />
                <span>{card.position}</span>
              </div>
            )}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit?.(card)}>
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete?.(card.id)}
                className="text-destructive"
              >
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {card.party && (
          <div className="flex items-center gap-2 text-xs">
            <Building className="h-3 w-3 text-muted-foreground" />
            <Badge variant="outline" className="text-xs">
              {card.party}
            </Badge>
          </div>
        )}

        {card.proposalValue && (
          <div className="flex items-center gap-2 text-sm">
            <DollarSign className="h-3 w-3 text-muted-foreground" />
            <span className="font-medium">{formatCurrency(card.proposalValue)}</span>
          </div>
        )}

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className={`font-medium ${probabilityColor}`}>
            {card.probability}% chance
          </span>
        </div>

        {card.nextActionDate && (
          <div className="flex items-center gap-2 text-xs">
            <Calendar className="h-3 w-3 text-muted-foreground" />
            <span>{formatDate(card.nextActionDate)}</span>
          </div>
        )}

        {card.nextAction && (
          <div className="pt-2 border-t">
            <p className="text-xs font-medium text-muted-foreground">Próxima ação:</p>
            <p className="text-xs mt-1">{card.nextAction}</p>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={(e) => {
              e.stopPropagation();
              // Handle email action
            }}
          >
            <Mail className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={(e) => {
              e.stopPropagation();
              // Handle phone action
            }}
          >
            <Phone className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}