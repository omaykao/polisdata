"use client";

import { useState } from "react";
import { useData } from "@/lib/contexts/data-context";
import { ReportGenerator, ReportConfig } from "@/components/reports/report-generator";
import { ReportHistory, Report } from "@/components/reports/report-history";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  FileText,
  Plus,
  Download,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Calendar,
  FileSpreadsheet,
} from "lucide-react";
import { formatNumber, formatDate } from "@/lib/utils";

export default function ReportsPage() {
  const { politicians, campaigns, isLoading } = useData();
  const [activeTab, setActiveTab] = useState<"dashboard" | "generate" | "history">("dashboard");

  // Mock report history
  const [reports] = useState<Report[]>([
    {
      id: "1",
      title: "Análise Mensal - Carlos Eduardo Mendes",
      type: 'executive',
      format: 'pdf',
      status: 'completed',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
      completedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
      size: "2.4 MB",
      author: "Ana Costa",
      politician: "Carlos Eduardo Mendes",
    },
    {
      id: "2",
      title: "Performance de Campanhas - Q4 2024",
      type: 'campaign',
      format: 'excel',
      status: 'completed',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
      completedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
      size: "1.8 MB",
      author: "Carlos Mendes",
      campaign: "Pesquisa Regional Sul",
    },
    {
      id: "3",
      title: "Análise de Sentimento Semanal",
      type: 'sentiment',
      format: 'pdf',
      status: 'generating',
      createdAt: new Date(Date.now() - 1000 * 60 * 30),
      author: "Ana Costa",
      schedule: {
        frequency: 'weekly',
        nextRun: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      },
    },
    {
      id: "4",
      title: "Monitoramento Social - Ana Paula Oliveira",
      type: 'social',
      format: 'ppt',
      status: 'scheduled',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
      author: "Pedro Lima",
      politician: "Ana Paula Oliveira",
      schedule: {
        frequency: 'daily',
        nextRun: new Date(Date.now() + 1000 * 60 * 60 * 2),
      },
    },
    {
      id: "5",
      title: "Relatório Personalizado - Eleições 2026",
      type: 'custom',
      format: 'json',
      status: 'failed',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
      author: "Sistema",
    },
  ]);

  const handleGenerateReport = (config: ReportConfig) => {
    console.log("Generate report:", config);
    setActiveTab("history");
  };

  const handleViewReport = (report: Report) => {
    console.log("View report:", report);
  };

  const handleDownloadReport = (report: Report) => {
    console.log("Download report:", report);
  };

  const handleDeleteReport = (report: Report) => {
    console.log("Delete report:", report);
  };

  const handleShareReport = (report: Report) => {
    console.log("Share report:", report);
  };

  // Calculate stats
  const totalReports = reports.length;
  const completedReports = reports.filter(r => r.status === 'completed').length;
  const scheduledReports = reports.filter(r => r.status === 'scheduled').length;
  const recentReports = reports.filter(r =>
    new Date(r.createdAt) > new Date(Date.now() - 1000 * 60 * 60 * 24 * 7)
  ).length;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-full" />
        <div className="grid gap-4 md:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Relatórios</h1>
          <p className="text-muted-foreground">
            Gere e gerencie relatórios de análise política
          </p>
        </div>
        <Button onClick={() => setActiveTab("generate")}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Relatório
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total de Relatórios</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold">{totalReports}</p>
              <FileText className="h-8 w-8 text-muted-foreground opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Concluídos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold">{completedReports}</p>
              <CheckCircle className="h-8 w-8 text-green-600 opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Agendados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold">{scheduledReports}</p>
              <Clock className="h-8 w-8 text-blue-600 opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Últimos 7 Dias</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold">{recentReports}</p>
              <TrendingUp className="h-8 w-8 text-purple-600 opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={(value: any) => setActiveTab(value)}>
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="dashboard">
            <FileText className="mr-2 h-4 w-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="generate">
            <Plus className="mr-2 h-4 w-4" />
            Gerar
          </TabsTrigger>
          <TabsTrigger value="history">
            <Clock className="mr-2 h-4 w-4" />
            Histórico
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6 mt-6">
          {/* Recent Reports */}
          <Card>
            <CardHeader>
              <CardTitle>Relatórios Recentes</CardTitle>
              <CardDescription>
                Últimos relatórios gerados na plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reports.slice(0, 5).map((report) => (
                  <div key={report.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                        {report.format === 'pdf' && <FileText className="h-5 w-5" />}
                        {report.format === 'excel' && <FileSpreadsheet className="h-5 w-5" />}
                        {report.format === 'ppt' && <FileText className="h-5 w-5" />}
                        {report.format === 'json' && <FileText className="h-5 w-5" />}
                      </div>
                      <div>
                        <p className="font-medium">{report.title}</p>
                        <p className="text-sm text-muted-foreground">
                          Por {report.author} • {formatDate(report.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {report.status === 'completed' && (
                        <Badge variant="default">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Concluído
                        </Badge>
                      )}
                      {report.status === 'generating' && (
                        <Badge variant="outline">
                          <Clock className="mr-1 h-3 w-3" />
                          Gerando
                        </Badge>
                      )}
                      {report.status === 'scheduled' && (
                        <Badge variant="secondary">
                          <Clock className="mr-1 h-3 w-3" />
                          Agendado
                        </Badge>
                      )}
                      {report.status === 'failed' && (
                        <Badge variant="destructive">
                          <AlertCircle className="mr-1 h-3 w-3" />
                          Erro
                        </Badge>
                      )}
                      {report.status === 'completed' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDownloadReport(report)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Scheduled Reports */}
          <Card>
            <CardHeader>
              <CardTitle>Relatórios Agendados</CardTitle>
              <CardDescription>
                Próximos relatórios a serem gerados automaticamente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reports
                  .filter(r => r.schedule)
                  .map((report) => (
                    <div key={report.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium">{report.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            Tipo: {report.type === 'executive' ? 'Executivo' :
                                  report.type === 'sentiment' ? 'Sentimento' :
                                  report.type === 'social' ? 'Social' : report.type}
                          </p>
                        </div>
                        <Badge variant="outline">
                          <Calendar className="mr-1 h-3 w-3" />
                          {report.schedule?.frequency === 'daily' ? 'Diário' :
                           report.schedule?.frequency === 'weekly' ? 'Semanal' :
                           report.schedule?.frequency === 'monthly' ? 'Mensal' : 'Único'}
                        </Badge>
                      </div>
                      {report.schedule?.nextRun && (
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Próxima execução:</span>
                          <span className="font-medium">
                            {formatDate(report.schedule?.nextRun)}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="generate" className="mt-6">
          <ReportGenerator
            politicians={politicians}
            campaigns={campaigns}
            onGenerate={handleGenerateReport}
            onCancel={() => setActiveTab("dashboard")}
          />
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <ReportHistory
            reports={reports}
            onView={handleViewReport}
            onDownload={handleDownloadReport}
            onDelete={handleDeleteReport}
            onShare={handleShareReport}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}