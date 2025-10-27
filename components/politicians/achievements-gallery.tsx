"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PoliticianAchievement } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  Building2,
  FileText,
  Users,
  Lightbulb,
  Hammer,
  MapPin,
  Calendar,
  DollarSign,
  UserCheck,
} from "lucide-react";

interface AchievementsGalleryProps {
  achievements: PoliticianAchievement[];
}

const categoryIcons = {
  projeto: Building2,
  emenda: FileText,
  lideranca: Users,
  iniciativa: Lightbulb,
  obra: Hammer,
};

const categoryLabels = {
  projeto: "Projeto",
  emenda: "Emenda",
  lideranca: "Liderança",
  iniciativa: "Iniciativa",
  obra: "Obra",
};

const statusLabels = {
  concluido: "Concluído",
  em_andamento: "Em Andamento",
  planejado: "Planejado",
};

const statusColors = {
  concluido: "bg-green-100 text-green-800 border-green-200",
  em_andamento: "bg-blue-100 text-blue-800 border-blue-200",
  planejado: "bg-gray-100 text-gray-800 border-gray-200",
};

export function AchievementsGallery({ achievements }: AchievementsGalleryProps) {
  if (achievements.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">
            Nenhuma realização cadastrada ainda
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {achievements.map((achievement) => {
        const CategoryIcon = categoryIcons[achievement.category];

        return (
          <Card key={achievement.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-start gap-2">
                  <CategoryIcon className="h-5 w-5 text-primary mt-0.5" />
                  <div className="flex-1">
                    <Badge variant="outline" className="mb-2">
                      {categoryLabels[achievement.category]}
                    </Badge>
                    <CardTitle className="text-lg leading-tight">
                      {achievement.title}
                    </CardTitle>
                  </div>
                </div>
                <Badge className={statusColors[achievement.status]}>
                  {statusLabels[achievement.status]}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              <CardDescription className="line-clamp-3">
                {achievement.description}
              </CardDescription>

              <div className="space-y-2 text-sm">
                {achievement.location && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{achievement.location}</span>
                  </div>
                )}

                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(achievement.date)}</span>
                </div>

                {achievement.budget && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <DollarSign className="h-4 w-4" />
                    <span className="font-medium text-foreground">
                      {formatCurrency(achievement.budget)}
                    </span>
                  </div>
                )}

                {achievement.beneficiaries && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <UserCheck className="h-4 w-4" />
                    <span>
                      {achievement.beneficiaries.toLocaleString()} beneficiados
                    </span>
                  </div>
                )}
              </div>

              {achievement.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 pt-2">
                  {achievement.tags.slice(0, 3).map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-xs"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
