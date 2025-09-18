"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatDate, getRelativeTime } from "@/lib/utils";
import {
  FileText,
  Download,
  Eye,
  Send,
  Trash2,
  Search,
  Filter,
  Clock,
  CheckCircle,
  AlertCircle,
  FileSpreadsheet,
  FileImage,
  FileJson,
  MoreVertical,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface Report {
  id: string;
  title: string;
  type: 'executive' | 'detailed' | 'sentiment' | 'campaign' | 'social' | 'custom';
  format: 'pdf' | 'excel' | 'ppt' | 'json';
  status: 'generating' | 'completed' | 'failed' | 'scheduled';
  createdAt: Date;
  completedAt?: Date;
  size?: string;
  author: string;
  politician?: string;
  campaign?: string;
  downloadUrl?: string;
  schedule?: {
    frequency: 'once' | 'daily' | 'weekly' | 'monthly';
    nextRun?: Date;
  };
}

interface ReportHistoryProps {
  reports: Report[];
  onView: (report: Report) => void;
  onDownload: (report: Report) => void;
  onDelete: (report: Report) => void;
  onShare: (report: Report) => void;
}

export function ReportHistory({
  reports,
  onView,
  onDownload,
  onDelete,
  onShare,
}: ReportHistoryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const getFormatIcon = (format: Report['format']) => {
    switch (format) {
      case 'pdf':
        return <FileText className="h-4 w-4" />;
      case 'excel':
        return <FileSpreadsheet className="h-4 w-4" />;
      case 'ppt':
        return <FileImage className="h-4 w-4" />;
      case 'json':
        return <FileJson className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: Report['status']) => {
    switch (status) {
      case 'generating':
        return (
          <Badge variant="outline" className="gap-1">
            <Clock className="h-3 w-3" />
            Gerando
          </Badge>
        );
      case 'completed':
        return (
          <Badge variant="default" className="gap-1">
            <CheckCircle className="h-3 w-3" />
            Concluído
          </Badge>
        );
      case 'failed':
        return (
          <Badge variant="destructive" className="gap-1">
            <AlertCircle className="h-3 w-3" />
            Erro
          </Badge>
        );
      case 'scheduled':
        return (
          <Badge variant="secondary" className="gap-1">
            <Clock className="h-3 w-3" />
            Agendado
          </Badge>
        );
    }
  };

  const getTypeBadge = (type: Report['type']) => {
    const labels = {
      executive: 'Executivo',
      detailed: 'Detalhado',
      sentiment: 'Sentimento',
      campaign: 'Campanha',
      social: 'Social',
      custom: 'Personalizado',
    };
    return (
      <Badge variant="outline">
        {labels[type]}
      </Badge>
    );
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || report.type === typeFilter;
    const matchesStatus = statusFilter === "all" || report.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Histórico de Relatórios</CardTitle>
        <CardDescription>
          Visualize e gerencie todos os relatórios gerados
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar relatórios..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Tipos</SelectItem>
              <SelectItem value="executive">Executivo</SelectItem>
              <SelectItem value="detailed">Detalhado</SelectItem>
              <SelectItem value="sentiment">Sentimento</SelectItem>
              <SelectItem value="campaign">Campanha</SelectItem>
              <SelectItem value="social">Social</SelectItem>
              <SelectItem value="custom">Personalizado</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Status</SelectItem>
              <SelectItem value="completed">Concluídos</SelectItem>
              <SelectItem value="generating">Gerando</SelectItem>
              <SelectItem value="scheduled">Agendados</SelectItem>
              <SelectItem value="failed">Com Erro</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Reports Table */}
        <div className="space-y-3">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    {getFormatIcon(report.format)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{report.title}</h4>
                      {getStatusBadge(report.status)}
                      {getTypeBadge(report.type)}
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <span>Por {report.author}</span>
                      <span>{getRelativeTime(report.createdAt)}</span>
                      {report.size && <span>{report.size}</span>}
                      {report.politician && (
                        <span>• Político: {report.politician}</span>
                      )}
                      {report.campaign && (
                        <span>• Campanha: {report.campaign}</span>
                      )}
                    </div>
                    {report.schedule && (
                      <div className="mt-2">
                        <Badge variant="outline" className="text-xs">
                          <Clock className="mr-1 h-3 w-3" />
                          {report.schedule.frequency === 'once' ? 'Único' :
                           report.schedule.frequency === 'daily' ? 'Diário' :
                           report.schedule.frequency === 'weekly' ? 'Semanal' : 'Mensal'}
                          {report.schedule.nextRun && (
                            <span className="ml-1">
                              • Próximo: {formatDate(report.schedule.nextRun)}
                            </span>
                          )}
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  {report.status === 'completed' && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onView(report)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDownload(report)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Ações</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {report.status === 'completed' && (
                        <>
                          <DropdownMenuItem onClick={() => onView(report)}>
                            <Eye className="mr-2 h-4 w-4" />
                            Visualizar
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onDownload(report)}>
                            <Download className="mr-2 h-4 w-4" />
                            Baixar
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onShare(report)}>
                            <Send className="mr-2 h-4 w-4" />
                            Compartilhar
                          </DropdownMenuItem>
                        </>
                      )}
                      <DropdownMenuItem
                        onClick={() => onDelete(report)}
                        className="text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          ))}

          {filteredReports.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2">Nenhum relatório encontrado</p>
              <p className="text-sm">
                {searchQuery || typeFilter !== "all" || statusFilter !== "all"
                  ? "Tente ajustar seus filtros de busca"
                  : "Gere seu primeiro relatório para começar"}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}