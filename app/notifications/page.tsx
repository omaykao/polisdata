"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useData } from "@/lib/contexts/data-context";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import {
  Bell,
  BellOff,
  Check,
  CheckCheck,
  AlertTriangle,
  Info,
  ListTodo,
  Search,
  Filter,
  RefreshCw,
  Archive,
  Trash2,
  ExternalLink,
  Clock,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  XCircle,
  MessageSquare,
  Calendar,
  Users,
  BarChart3,
  Shield,
  Zap,
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  Music,
  Hash,
  Eye,
} from "lucide-react";

export default function NotificationsPage() {
  const { notifications, isLoading } = useData();
  const [selectedTab, setSelectedTab] = useState("all");
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Filtrar notificações
  const filteredNotifications = notifications.filter(notification => {
    const matchesTab = selectedTab === "all" ||
      (selectedTab === "unread" && notification.status === "unread") ||
      (selectedTab === "critical" && notification.priority === "critical") ||
      (selectedTab === "alerts" && notification.type === "alert") ||
      (selectedTab === "tasks" && notification.type === "task");

    const matchesPriority = selectedPriority === "all" || notification.priority === selectedPriority;
    const matchesStatus = selectedStatus === "all" || notification.status === selectedStatus;
    const matchesSearch = searchQuery === "" ||
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesPriority && matchesStatus && matchesSearch;
  });

  // Contadores para as tabs
  const unreadCount = notifications.filter(n => n.status === "unread").length;
  const criticalCount = notifications.filter(n => n.priority === "critical").length;
  const alertCount = notifications.filter(n => n.type === "alert").length;
  const taskCount = notifications.filter(n => n.type === "task").length;

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "critical": return <AlertCircle className="h-4 w-4 text-red-600" />;
      case "high": return <AlertTriangle className="h-4 w-4 text-orange-600" />;
      case "medium": return <TrendingUp className="h-4 w-4 text-yellow-600" />;
      case "low": return <Info className="h-4 w-4 text-blue-600" />;
      default: return null;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "alert": return <Bell className="h-4 w-4" />;
      case "informative": return <Info className="h-4 w-4" />;
      case "task": return <ListTodo className="h-4 w-4" />;
      default: return null;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "sentiment_change": return <TrendingDown className="h-4 w-4" />;
      case "campaign_performance": return <BarChart3 className="h-4 w-4" />;
      case "contract_expiration": return <Calendar className="h-4 w-4" />;
      case "emerging_crisis": return <AlertTriangle className="h-4 w-4" />;
      case "opportunity_detected": return <TrendingUp className="h-4 w-4" />;
      case "system_issue": return <Shield className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getPlatformIcon = (description: string) => {
    if (description.includes('Instagram') || description.includes('instagram')) {
      return <span className="text-pink-600">📷</span>;
    }
    if (description.includes('Twitter') || description.includes('twitter')) {
      return <span className="text-sky-600">🐦</span>;
    }
    if (description.includes('Facebook') || description.includes('facebook')) {
      return <span className="text-blue-600">📘</span>;
    }
    if (description.includes('TikTok') || description.includes('tiktok')) {
      return <span className="text-gray-900">🎵</span>;
    }
    if (description.includes('YouTube') || description.includes('youtube')) {
      return <span className="text-red-600">📺</span>;
    }
    return null;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "unread":
        return <Badge variant="default" className="text-xs">Não lido</Badge>;
      case "read":
        return <Badge variant="secondary" className="text-xs">Lido</Badge>;
      case "resolved":
        return <Badge variant="outline" className="text-xs text-green-600">Resolvido</Badge>;
      case "dismissed":
        return <Badge variant="outline" className="text-xs text-gray-500">Arquivado</Badge>;
      default:
        return null;
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m atrás`;
    if (hours < 24) return `${hours}h atrás`;
    return `${days}d atrás`;
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-12 w-full" />
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Notificações</h1>
          <p className="text-muted-foreground">
            Monitore alertas, tarefas e atualizações importantes
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Archive className="mr-2 h-4 w-4" />
            Arquivar Lidas
          </Button>
          <Button variant="outline">
            <CheckCheck className="mr-2 h-4 w-4" />
            Marcar Todas como Lidas
          </Button>
          <Button>
            <RefreshCw className="mr-2 h-4 w-4" />
            Atualizar
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar notificações..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={selectedPriority} onValueChange={setSelectedPriority}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Prioridade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="critical">Crítica</SelectItem>
            <SelectItem value="high">Alta</SelectItem>
            <SelectItem value="medium">Média</SelectItem>
            <SelectItem value="low">Baixa</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="unread">Não Lido</SelectItem>
            <SelectItem value="read">Lido</SelectItem>
            <SelectItem value="resolved">Resolvido</SelectItem>
            <SelectItem value="dismissed">Arquivado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="all" className="relative">
            Todas
            <Badge variant="secondary" className="ml-2 text-xs">
              {notifications.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="unread" className="relative">
            Não Lidas
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2 text-xs">
                {unreadCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="critical" className="relative">
            Críticas
            {criticalCount > 0 && (
              <Badge variant="destructive" className="ml-2 text-xs">
                {criticalCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="alerts" className="relative">
            Alertas
            <Badge variant="secondary" className="ml-2 text-xs">
              {alertCount}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="tasks" className="relative">
            Tarefas
            <Badge variant="secondary" className="ml-2 text-xs">
              {taskCount}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="space-y-4">
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-4">
              {filteredNotifications.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <BellOff className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-lg font-medium text-muted-foreground">
                      Nenhuma notificação encontrada
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Ajuste os filtros ou aguarde novas notificações
                    </p>
                  </CardContent>
                </Card>
              ) : (
                filteredNotifications.map((notification) => (
                  <Card
                    key={notification.id}
                    className={cn(
                      "hover:bg-muted/50 transition-colors cursor-pointer",
                      notification.status === "unread" && "border-primary/50 bg-primary/5"
                    )}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="mt-1">
                            {getPriorityIcon(notification.priority)}
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              {getTypeIcon(notification.type)}
                              {getCategoryIcon(notification.category)}
                              {getPlatformIcon(notification.description)}
                              <CardTitle className="text-base">
                                {notification.title}
                              </CardTitle>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              <span>{formatTimeAgo(notification.createdAt)}</span>
                              {notification.triggerEvent && (
                                <>
                                  <span>•</span>
                                  <span>{notification.triggerEvent}</span>
                                </>
                              )}
                              {notification.confidence && (
                                <>
                                  <span>•</span>
                                  <span>Confiança: {(notification.confidence * 100).toFixed(0)}%</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {notification.impactScore && (
                            <Badge
                              variant="outline"
                              className={cn(
                                "text-xs",
                                notification.impactScore >= 80 && "text-red-600 border-red-600",
                                notification.impactScore >= 60 && notification.impactScore < 80 && "text-orange-600 border-orange-600",
                                notification.impactScore < 60 && "text-yellow-600 border-yellow-600"
                              )}
                            >
                              Impacto: {notification.impactScore}
                            </Badge>
                          )}
                          {getStatusBadge(notification.status)}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground">
                        {notification.description}
                      </p>
                      {notification.recommendation && (
                        <div className="bg-muted/50 rounded-lg p-3">
                          <p className="text-xs font-medium mb-1">💡 Ação Recomendada:</p>
                          <p className="text-sm">{notification.recommendation}</p>
                        </div>
                      )}
                      <div className="flex items-center justify-between pt-3">
                        <div className="flex gap-2">
                          {notification.status === "unread" && (
                            <Button size="sm" variant="outline">
                              <Check className="mr-1 h-3 w-3" />
                              Marcar como Lida
                            </Button>
                          )}
                          {notification.status !== "resolved" && (
                            <Button size="sm" variant="outline">
                              <CheckCircle className="mr-1 h-3 w-3" />
                              Resolver
                            </Button>
                          )}
                          <Button size="sm" variant="ghost">
                            <Archive className="mr-1 h-3 w-3" />
                            Arquivar
                          </Button>
                        </div>
                        {notification.actionUrl && (
                          <Button size="sm" variant="default">
                            <ExternalLink className="mr-1 h-3 w-3" />
                            Ver Detalhes
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>

      {/* Resumo de Estatísticas */}
      <div className="grid gap-4 md:grid-cols-4 mt-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total de Alertas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{notifications.length}</p>
            <p className="text-xs text-muted-foreground">
              {unreadCount} não lidas
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Críticas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-600">{criticalCount}</p>
            <p className="text-xs text-muted-foreground">
              Requerem ação imediata
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Taxa de Resolução</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {Math.round((notifications.filter(n => n.status === "resolved").length / notifications.length) * 100)}%
            </p>
            <p className="text-xs text-muted-foreground">
              Notificações resolvidas
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Maior Impacto</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {Math.max(...notifications.map(n => n.impactScore || 0))}
            </p>
            <p className="text-xs text-muted-foreground">
              Score máximo detectado
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}