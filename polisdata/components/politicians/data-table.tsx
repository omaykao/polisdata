"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  BarChart3,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

interface DataTableProps {
  politicians: Politician[];
  onEdit?: (politician: Politician) => void;
  onViewDetails?: (politician: Politician) => void;
  onViewAnalytics?: (politician: Politician) => void;
}

export function PoliticiansDataTable({
  politicians,
  onEdit,
  onViewDetails,
  onViewAnalytics,
}: DataTableProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [partyFilter, setPartyFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<keyof Politician>("perceptionScore");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Get unique parties for filter
  const uniqueParties = Array.from(
    new Set(politicians.map((p) => p.party))
  ).sort();

  // Filter and sort politicians
  let filteredPoliticians = politicians.filter((politician) => {
    const matchesSearch =
      politician.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      politician.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      politician.party.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || politician.status === statusFilter;

    const matchesParty =
      partyFilter === "all" || politician.party === partyFilter;

    return matchesSearch && matchesStatus && matchesParty;
  });

  // Sort politicians
  filteredPoliticians = filteredPoliticians.sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];

    if (aValue === null || aValue === undefined) return 1;
    if (bValue === null || bValue === undefined) return -1;

    if (sortOrder === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleSort = (column: keyof Politician) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("desc");
    }
  };

  const SortIcon = ({ column }: { column: keyof Politician }) => {
    if (sortBy !== column) return null;
    return sortOrder === "asc" ? (
      <ChevronUp className="ml-1 h-4 w-4" />
    ) : (
      <ChevronDown className="ml-1 h-4 w-4" />
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar político, cargo ou partido..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os Status</SelectItem>
            <SelectItem value="active">Ativo</SelectItem>
            <SelectItem value="inactive">Inativo</SelectItem>
            <SelectItem value="suspended">Suspenso</SelectItem>
          </SelectContent>
        </Select>
        <Select value={partyFilter} onValueChange={setPartyFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Partido" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os Partidos</SelectItem>
            {uniqueParties.map((party) => (
              <SelectItem key={party} value={party}>
                {party}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Político</TableHead>
              <TableHead>Partido / Cargo</TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("perceptionScore")}
              >
                <div className="flex items-center">
                  Score de Percepção
                  <SortIcon column="perceptionScore" />
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("scoreTrend")}
              >
                <div className="flex items-center">
                  Tendência
                  <SortIcon column="scoreTrend" />
                </div>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("lastAnalysisDate")}
              >
                <div className="flex items-center">
                  Última Análise
                  <SortIcon column="lastAnalysisDate" />
                </div>
              </TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPoliticians.map((politician) => (
              <TableRow
                key={politician.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => router.push(`/politicians/${politician.id}`)}
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={politician.avatarUrl}
                        alt={politician.name}
                      />
                      <AvatarFallback>{getInitials(politician.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{politician.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {politician.email}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <Badge variant="outline" className="text-xs">
                      {politician.party}
                    </Badge>
                    <p className="text-sm text-muted-foreground">
                      {politician.position}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-2xl font-bold ${getScoreColor(
                        politician.perceptionScore
                      )}`}
                    >
                      {politician.perceptionScore}
                    </span>
                    <span className="text-sm text-muted-foreground">/100</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {politician.scoreTrend > 0 ? (
                      <ChevronUp className="h-4 w-4 text-green-600" />
                    ) : politician.scoreTrend < 0 ? (
                      <ChevronDown className="h-4 w-4 text-red-600" />
                    ) : null}
                    <span
                      className={
                        politician.scoreTrend > 0
                          ? "text-green-600"
                          : politician.scoreTrend < 0
                          ? "text-red-600"
                          : ""
                      }
                    >
                      {formatPercentage(Math.abs(politician.scoreTrend), true)}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
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
                </TableCell>
                <TableCell>{formatDate(politician.lastAnalysisDate)}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewDetails?.(politician);
                        }}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        Ver Detalhes
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewAnalytics?.(politician);
                        }}
                      >
                        <BarChart3 className="mr-2 h-4 w-4" />
                        Ver Análise
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit?.(politician);
                        }}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <p>
          Mostrando {filteredPoliticians.length} de {politicians.length} políticos
        </p>
        <p>
          Score médio:{" "}
          {(
            filteredPoliticians.reduce((sum, p) => sum + p.perceptionScore, 0) /
            filteredPoliticians.length
          ).toFixed(1)}
        </p>
      </div>
    </div>
  );
}