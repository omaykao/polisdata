"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SocialMediaMention } from "@/lib/types";
import { formatNumber, getRelativeTime } from "@/lib/utils";
import {
  MessageCircle,
  Heart,
  Share2,
  TrendingUp,
  TrendingDown,
  Minus,
  Search,
  Filter,
  Twitter,
  Facebook,
  Instagram,
  Youtube,
  Globe,
  Eye,
  MessageSquare,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react";

interface SocialMentionsFeedProps {
  mentions: SocialMediaMention[];
  onRespond?: (mentionId: string) => void;
  onFlag?: (mentionId: string, reason: string) => void;
  onAnalyze?: (mentionId: string) => void;
}

export function SocialMentionsFeed({
  mentions,
  onRespond,
  onFlag,
  onAnalyze,
}: SocialMentionsFeedProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [platformFilter, setPlatformFilter] = useState<string>("all");
  const [sentimentFilter, setSentimentFilter] = useState<string>("all");
  const [timeRange, setTimeRange] = useState<string>("24h");

  const getPlatformIcon = (platform: SocialMediaMention['platform']) => {
    switch (platform) {
      case 'twitter':
        return <Twitter className="h-4 w-4" />;
      case 'facebook':
        return <Facebook className="h-4 w-4" />;
      case 'instagram':
        return <Instagram className="h-4 w-4" />;
      case 'youtube':
        return <Youtube className="h-4 w-4" />;
      case 'news':
        return <Globe className="h-4 w-4" />;
      default:
        return <MessageCircle className="h-4 w-4" />;
    }
  };

  const getPlatformColor = (platform: SocialMediaMention['platform']) => {
    switch (platform) {
      case 'twitter':
        return 'text-blue-400 bg-blue-950';
      case 'facebook':
        return 'text-blue-600 bg-blue-950';
      case 'instagram':
        return 'text-purple-600 bg-purple-950';
      case 'youtube':
        return 'text-red-600 bg-red-950';
      case 'news':
        return 'text-gray-600 bg-gray-950';
      default:
        return 'text-gray-600 bg-gray-950';
    }
  };

  const getSentimentIcon = (sentiment: SocialMediaMention['sentiment']) => {
    switch (sentiment) {
      case 'positive':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'negative':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      case 'neutral':
        return <Minus className="h-4 w-4 text-gray-600" />;
    }
  };

  const getSentimentColor = (sentiment: SocialMediaMention['sentiment']) => {
    switch (sentiment) {
      case 'positive':
        return 'text-green-600 bg-green-50 dark:bg-green-950';
      case 'negative':
        return 'text-red-600 bg-red-50 dark:bg-red-950';
      case 'neutral':
        return 'text-gray-600 bg-gray-50 dark:bg-gray-950';
    }
  };

  const getInfluencerBadge = (verified: boolean, followerCount: number) => {
    if (verified) {
      return (
        <Badge variant="default" className="gap-1">
          <CheckCircle className="h-3 w-3" />
          Verificado
        </Badge>
      );
    }
    if (followerCount > 100000) {
      return (
        <Badge variant="secondary" className="gap-1">
          <TrendingUp className="h-3 w-3" />
          Influenciador
        </Badge>
      );
    }
    return null;
  };

  const filteredMentions = useMemo(() => {
    let filtered = [...mentions];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(mention =>
        mention.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mention.authorName?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Platform filter
    if (platformFilter !== "all") {
      filtered = filtered.filter(mention => mention.platform === platformFilter);
    }

    // Sentiment filter
    if (sentimentFilter !== "all") {
      filtered = filtered.filter(mention => mention.sentiment === sentimentFilter);
    }

    // Time range filter
    const now = new Date();
    const cutoffTime = new Date();
    switch (timeRange) {
      case '1h':
        cutoffTime.setHours(now.getHours() - 1);
        break;
      case '24h':
        cutoffTime.setHours(now.getHours() - 24);
        break;
      case '7d':
        cutoffTime.setDate(now.getDate() - 7);
        break;
      case '30d':
        cutoffTime.setDate(now.getDate() - 30);
        break;
      default:
        cutoffTime.setFullYear(2020); // All time
    }
    filtered = filtered.filter(mention => new Date(mention.publishedAt) >= cutoffTime);

    // Sort by reach and timestamp
    filtered.sort((a, b) => {
      const reachDiff = b.reach - a.reach;
      if (reachDiff !== 0) return reachDiff;
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });

    return filtered;
  }, [mentions, searchQuery, platformFilter, sentimentFilter, timeRange]);

  const stats = useMemo(() => {
    const positive = filteredMentions.filter(m => m.sentiment === 'positive').length;
    const negative = filteredMentions.filter(m => m.sentiment === 'negative').length;
    const neutral = filteredMentions.filter(m => m.sentiment === 'neutral').length;
    const totalReach = filteredMentions.reduce((sum, m) => sum + m.reach, 0);
    const totalEngagement = filteredMentions.reduce((sum, m) => sum + m.likes + m.shares + m.comments, 0);

    return {
      total: filteredMentions.length,
      positive,
      negative,
      neutral,
      totalReach,
      totalEngagement,
      avgEngagement: filteredMentions.length > 0 ? totalEngagement / filteredMentions.length : 0,
    };
  }, [filteredMentions]);

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid gap-4 md:grid-cols-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Menções</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatNumber(stats.total)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Positivas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">{stats.positive}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Negativas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-600">{stats.negative}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Neutras</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-gray-600">{stats.neutral}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Alcance Total</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatNumber(stats.totalReach)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Engajamento Médio</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatNumber(Math.round(stats.avgEngagement))}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar menções..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={platformFilter} onValueChange={setPlatformFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Plataforma" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as Plataformas</SelectItem>
                <SelectItem value="twitter">Twitter/X</SelectItem>
                <SelectItem value="facebook">Facebook</SelectItem>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="youtube">YouTube</SelectItem>
                <SelectItem value="news">Notícias</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sentimentFilter} onValueChange={setSentimentFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Sentimento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Sentimentos</SelectItem>
                <SelectItem value="positive">Positivo</SelectItem>
                <SelectItem value="negative">Negativo</SelectItem>
                <SelectItem value="neutral">Neutro</SelectItem>
              </SelectContent>
            </Select>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger>
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1h">Última Hora</SelectItem>
                <SelectItem value="24h">Últimas 24 Horas</SelectItem>
                <SelectItem value="7d">Últimos 7 Dias</SelectItem>
                <SelectItem value="30d">Últimos 30 Dias</SelectItem>
                <SelectItem value="all">Todo o Período</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Mentions Feed */}
      <Card>
        <CardHeader>
          <CardTitle>Feed de Menções</CardTitle>
          <CardDescription>
            Monitoramento em tempo real das redes sociais e mídias
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-4">
              {filteredMentions.map((mention) => (
                <div
                  key={mention.id}
                  className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3 flex-1">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${mention.authorName || 'anonymous'}`} />
                        <AvatarFallback>{(mention.authorName || 'A').charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold">{mention.authorName || 'Anônimo'}</p>
                          {getInfluencerBadge(mention.isInfluencer, mention.reach)}
                          <Badge variant="outline" className={getPlatformColor(mention.platform)}>
                            {getPlatformIcon(mention.platform)}
                            <span className="ml-1">
                              {mention.platform === 'twitter' ? 'Twitter/X' :
                               mention.platform === 'facebook' ? 'Facebook' :
                               mention.platform === 'instagram' ? 'Instagram' :
                               mention.platform === 'youtube' ? 'YouTube' : 'Notícias'}
                            </span>
                          </Badge>
                          <Badge variant="outline" className={getSentimentColor(mention.sentiment)}>
                            {getSentimentIcon(mention.sentiment)}
                            <span className="ml-1">
                              {mention.sentiment === 'positive' ? 'Positivo' :
                               mention.sentiment === 'negative' ? 'Negativo' : 'Neutro'}
                            </span>
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {getRelativeTime(mention.publishedAt)}
                        </p>
                        <p className="text-sm leading-relaxed mb-3">{mention.content}</p>
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            {formatNumber(mention.reach)} alcance
                          </span>
                          <span className="flex items-center gap-1">
                            <Heart className="h-4 w-4" />
                            {formatNumber(mention.likes + mention.shares + mention.comments)} engajamento
                          </span>
                          {mention.isInfluencer && (
                            <Badge variant="secondary">
                              <TrendingUp className="mr-1 h-3 w-3" />
                              Alto Impacto
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      {onRespond && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onRespond(mention.id)}
                        >
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      )}
                      {onFlag && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onFlag(mention.id, 'review')}
                        >
                          <AlertCircle className="h-4 w-4" />
                        </Button>
                      )}
                      {onAnalyze && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onAnalyze(mention.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {filteredMentions.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium mb-2">Nenhuma menção encontrada</p>
                  <p className="text-sm">
                    Ajuste seus filtros ou aguarde novas menções
                  </p>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}