"use client";

import { useState } from "react";
import { SettingsForm, SystemSettings } from "@/components/settings/settings-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useData } from "@/lib/contexts/data-context";
import {
  Settings,
  User,
  Building,
  CreditCard,
  Activity,
  Shield,
  HelpCircle,
  FileText,
  Download,
  Upload,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  Info,
} from "lucide-react";

export default function SettingsPage() {
  const { isLoading } = useData();
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  const handleSaveSettings = (settings: SystemSettings) => {
    setSaveStatus('saving');
    // Simulate API call
    setTimeout(() => {
      console.log('Saving settings:', settings);
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }, 1000);
  };

  const handleExportSettings = () => {
    console.log('Exporting settings...');
  };

  const handleImportSettings = () => {
    console.log('Importing settings...');
  };

  const handleResetSettings = () => {
    console.log('Resetting settings...');
  };

  // Mock system information
  const systemInfo = {
    version: '1.0.0',
    environment: 'Production',
    lastBackup: new Date(Date.now() - 1000 * 60 * 60 * 24),
    storageUsed: '2.4 GB',
    storageLimit: '10 GB',
    apiCalls: 45234,
    apiLimit: 100000,
    activeUsers: 12,
    userLimit: 50,
  };

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
          <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
          <p className="text-muted-foreground">
            Gerencie as configurações do sistema e preferências
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleExportSettings}>
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Button variant="outline" size="sm" onClick={handleImportSettings}>
            <Upload className="mr-2 h-4 w-4" />
            Importar
          </Button>
          <Button variant="outline" size="sm" onClick={handleResetSettings}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Redefinir
          </Button>
        </div>
      </div>

      {/* Save Status */}
      {saveStatus !== 'idle' && (
        <div className={`flex items-center gap-2 p-4 rounded-lg border ${
          saveStatus === 'saving' ? 'bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800' :
          saveStatus === 'saved' ? 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800' :
          'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800'
        }`}>
          {saveStatus === 'saving' && (
            <>
              <RefreshCw className="h-5 w-5 animate-spin text-blue-600" />
              <span className="text-blue-600 font-medium">Salvando configurações...</span>
            </>
          )}
          {saveStatus === 'saved' && (
            <>
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-green-600 font-medium">Configurações salvas com sucesso!</span>
            </>
          )}
          {saveStatus === 'error' && (
            <>
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <span className="text-red-600 font-medium">Erro ao salvar configurações</span>
            </>
          )}
        </div>
      )}

      {/* System Information Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Versão do Sistema</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold">{systemInfo.version}</p>
              <Settings className="h-8 w-8 text-muted-foreground opacity-50" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {systemInfo.environment}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Armazenamento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold">{systemInfo.storageUsed}</p>
              <Activity className="h-8 w-8 text-blue-600 opacity-50" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              de {systemInfo.storageLimit} disponíveis
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Chamadas API</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold">{systemInfo.apiCalls.toLocaleString('pt-BR')}</p>
              <Shield className="h-8 w-8 text-green-600 opacity-50" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              de {systemInfo.apiLimit.toLocaleString('pt-BR')} este mês
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Usuários Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold">{systemInfo.activeUsers}</p>
              <User className="h-8 w-8 text-purple-600 opacity-50" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              de {systemInfo.userLimit} licenças
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Informações da Conta</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Plano</span>
                <Badge variant="default">Professional</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <Badge variant="outline" className="gap-1">
                  <CheckCircle className="h-3 w-3 text-green-600" />
                  Ativo
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Próximo Pagamento</span>
                <span className="text-sm font-medium">15/01/2025</span>
              </div>
              <Button variant="outline" className="w-full mt-2">
                <CreditCard className="mr-2 h-4 w-4" />
                Gerenciar Assinatura
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Backup e Recuperação</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Último Backup</span>
                <span className="text-sm font-medium">Há 1 dia</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Backup Automático</span>
                <Badge variant="outline" className="gap-1">
                  <CheckCircle className="h-3 w-3 text-green-600" />
                  Ativo
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Frequência</span>
                <span className="text-sm font-medium">Semanal</span>
              </div>
              <Button variant="outline" className="w-full mt-2">
                <Download className="mr-2 h-4 w-4" />
                Baixar Backup
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Suporte</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Documentação
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <HelpCircle className="mr-2 h-4 w-4" />
                Central de Ajuda
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Building className="mr-2 h-4 w-4" />
                Contatar Suporte
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Settings Form */}
      <SettingsForm onSave={handleSaveSettings} />
    </div>
  );
}