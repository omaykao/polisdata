"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import {
  Settings,
  Bell,
  Shield,
  Globe,
  MessageSquare,
  Mail,
  Smartphone,
  Moon,
  Sun,
  Zap,
  Database,
  Key,
  Users,
  CreditCard,
  HelpCircle,
  AlertTriangle,
  CheckCircle,
  Info,
  Save,
} from "lucide-react";

interface SettingsFormProps {
  onSave: (settings: SystemSettings) => void;
}

export interface SystemSettings {
  general: {
    companyName: string;
    timezone: string;
    language: string;
    dateFormat: string;
    currency: string;
  };
  notifications: {
    email: {
      enabled: boolean;
      campaignAlerts: boolean;
      sentimentAlerts: boolean;
      reportGeneration: boolean;
      systemUpdates: boolean;
    };
    push: {
      enabled: boolean;
      desktop: boolean;
      mobile: boolean;
    };
    thresholds: {
      sentimentDrop: number;
      rapidGrowth: number;
      campaignCompletion: number;
    };
  };
  security: {
    twoFactorAuth: boolean;
    sessionTimeout: number;
    passwordExpiry: number;
    ipWhitelist: string[];
    apiAccess: boolean;
    auditLog: boolean;
  };
  integrations: {
    whatsapp: {
      enabled: boolean;
      apiKey: string;
      phoneNumber: string;
      businessId: string;
    };
    socialMedia: {
      twitter: boolean;
      facebook: boolean;
      instagram: boolean;
      youtube: boolean;
    };
    analytics: {
      googleAnalytics: string;
      mixpanel: string;
    };
  };
  appearance: {
    theme: 'light' | 'dark' | 'system';
    primaryColor: string;
    compactMode: boolean;
    sidebarCollapsed: boolean;
    animations: boolean;
  };
  data: {
    retentionDays: number;
    autoBackup: boolean;
    backupFrequency: 'daily' | 'weekly' | 'monthly';
    exportFormat: 'json' | 'csv' | 'excel';
    compression: boolean;
  };
}

export function SettingsForm({ onSave }: SettingsFormProps) {
  const [settings, setSettings] = useState<SystemSettings>({
    general: {
      companyName: "PolisData Analytics",
      timezone: "America/Sao_Paulo",
      language: "pt-BR",
      dateFormat: "DD/MM/YYYY",
      currency: "BRL",
    },
    notifications: {
      email: {
        enabled: true,
        campaignAlerts: true,
        sentimentAlerts: true,
        reportGeneration: true,
        systemUpdates: false,
      },
      push: {
        enabled: true,
        desktop: true,
        mobile: true,
      },
      thresholds: {
        sentimentDrop: 20,
        rapidGrowth: 50,
        campaignCompletion: 90,
      },
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30,
      passwordExpiry: 90,
      ipWhitelist: [],
      apiAccess: false,
      auditLog: true,
    },
    integrations: {
      whatsapp: {
        enabled: false,
        apiKey: "",
        phoneNumber: "",
        businessId: "",
      },
      socialMedia: {
        twitter: true,
        facebook: true,
        instagram: true,
        youtube: false,
      },
      analytics: {
        googleAnalytics: "",
        mixpanel: "",
      },
    },
    appearance: {
      theme: 'system',
      primaryColor: '#8B5CF6',
      compactMode: false,
      sidebarCollapsed: false,
      animations: true,
    },
    data: {
      retentionDays: 365,
      autoBackup: true,
      backupFrequency: 'weekly',
      exportFormat: 'excel',
      compression: true,
    },
  });

  const [ipInput, setIpInput] = useState("");
  const [hasChanges, setHasChanges] = useState(false);

  const updateSettings = (category: keyof SystemSettings, field: string, value: unknown) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value,
      },
    }));
    setHasChanges(true);
  };

  const updateNestedSettings = (category: keyof SystemSettings, subcategory: string, field: string, value: unknown) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [subcategory]: {
          ...(prev[category] as Record<string, Record<string, unknown>>)[subcategory],
          [field]: value,
        },
      },
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    onSave(settings);
    setHasChanges(false);
  };

  const addIpToWhitelist = () => {
    if (ipInput && ipInput.match(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/)) {
      setSettings(prev => ({
        ...prev,
        security: {
          ...prev.security,
          ipWhitelist: [...prev.security.ipWhitelist, ipInput],
        },
      }));
      setIpInput("");
      setHasChanges(true);
    }
  };

  const removeIpFromWhitelist = (ip: string) => {
    setSettings(prev => ({
      ...prev,
      security: {
        ...prev.security,
        ipWhitelist: prev.security.ipWhitelist.filter(item => item !== ip),
      },
    }));
    setHasChanges(true);
  };

  return (
    <div className="space-y-6">
      {hasChanges && (
        <div className="flex items-center justify-between p-4 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            <p className="text-sm font-medium">Você tem alterações não salvas</p>
          </div>
          <Button size="sm" onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Salvar Alterações
          </Button>
        </div>
      )}

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid grid-cols-3 lg:grid-cols-6 w-full">
          <TabsTrigger value="general">
            <Settings className="mr-2 h-4 w-4" />
            Geral
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="mr-2 h-4 w-4" />
            Notificações
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="mr-2 h-4 w-4" />
            Segurança
          </TabsTrigger>
          <TabsTrigger value="integrations">
            <Globe className="mr-2 h-4 w-4" />
            Integrações
          </TabsTrigger>
          <TabsTrigger value="appearance">
            <Sun className="mr-2 h-4 w-4" />
            Aparência
          </TabsTrigger>
          <TabsTrigger value="data">
            <Database className="mr-2 h-4 w-4" />
            Dados
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Configurações Gerais</CardTitle>
              <CardDescription>
                Configure as informações básicas do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="companyName">Nome da Empresa</Label>
                <Input
                  id="companyName"
                  value={settings.general.companyName}
                  onChange={(e) => updateSettings('general', 'companyName', e.target.value)}
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="timezone">Fuso Horário</Label>
                  <Select
                    value={settings.general.timezone}
                    onValueChange={(value) => updateSettings('general', 'timezone', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/Sao_Paulo">São Paulo (GMT-3)</SelectItem>
                      <SelectItem value="America/Manaus">Manaus (GMT-4)</SelectItem>
                      <SelectItem value="America/Fortaleza">Fortaleza (GMT-3)</SelectItem>
                      <SelectItem value="America/Rio_Branco">Rio Branco (GMT-5)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="language">Idioma</Label>
                  <Select
                    value={settings.general.language}
                    onValueChange={(value) => updateSettings('general', 'language', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                      <SelectItem value="en-US">English (US)</SelectItem>
                      <SelectItem value="es-ES">Español</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="dateFormat">Formato de Data</Label>
                  <Select
                    value={settings.general.dateFormat}
                    onValueChange={(value) => updateSettings('general', 'dateFormat', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="currency">Moeda</Label>
                  <Select
                    value={settings.general.currency}
                    onValueChange={(value) => updateSettings('general', 'currency', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BRL">Real (R$)</SelectItem>
                      <SelectItem value="USD">Dollar ($)</SelectItem>
                      <SelectItem value="EUR">Euro (€)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Notificação</CardTitle>
              <CardDescription>
                Gerencie como você recebe alertas e notificações
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Email Notifications */}
              <div>
                <h3 className="text-lg font-medium mb-4">Notificações por E-mail</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Notificações por E-mail</Label>
                      <p className="text-sm text-muted-foreground">
                        Receber notificações por e-mail
                      </p>
                    </div>
                    <Switch
                      checked={settings.notifications.email.enabled}
                      onCheckedChange={(checked) =>
                        updateNestedSettings('notifications', 'email', 'enabled', checked)
                      }
                    />
                  </div>
                  {settings.notifications.email.enabled && (
                    <div className="ml-6 space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>Alertas de Campanha</Label>
                        <Switch
                          checked={settings.notifications.email.campaignAlerts}
                          onCheckedChange={(checked) =>
                            updateNestedSettings('notifications', 'email', 'campaignAlerts', checked)
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>Alertas de Sentimento</Label>
                        <Switch
                          checked={settings.notifications.email.sentimentAlerts}
                          onCheckedChange={(checked) =>
                            updateNestedSettings('notifications', 'email', 'sentimentAlerts', checked)
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>Geração de Relatórios</Label>
                        <Switch
                          checked={settings.notifications.email.reportGeneration}
                          onCheckedChange={(checked) =>
                            updateNestedSettings('notifications', 'email', 'reportGeneration', checked)
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>Atualizações do Sistema</Label>
                        <Switch
                          checked={settings.notifications.email.systemUpdates}
                          onCheckedChange={(checked) =>
                            updateNestedSettings('notifications', 'email', 'systemUpdates', checked)
                          }
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Push Notifications */}
              <div>
                <h3 className="text-lg font-medium mb-4">Notificações Push</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Notificações Push</Label>
                      <p className="text-sm text-muted-foreground">
                        Receber notificações em tempo real
                      </p>
                    </div>
                    <Switch
                      checked={settings.notifications.push.enabled}
                      onCheckedChange={(checked) =>
                        updateNestedSettings('notifications', 'push', 'enabled', checked)
                      }
                    />
                  </div>
                  {settings.notifications.push.enabled && (
                    <div className="ml-6 space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>Desktop</Label>
                        <Switch
                          checked={settings.notifications.push.desktop}
                          onCheckedChange={(checked) =>
                            updateNestedSettings('notifications', 'push', 'desktop', checked)
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>Mobile</Label>
                        <Switch
                          checked={settings.notifications.push.mobile}
                          onCheckedChange={(checked) =>
                            updateNestedSettings('notifications', 'push', 'mobile', checked)
                          }
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Alert Thresholds */}
              <div>
                <h3 className="text-lg font-medium mb-4">Limites de Alerta</h3>
                <div className="space-y-4">
                  <div>
                    <Label>Queda de Sentimento ({settings.notifications.thresholds.sentimentDrop}%)</Label>
                    <Slider
                      value={[settings.notifications.thresholds.sentimentDrop]}
                      onValueChange={([value]) =>
                        updateNestedSettings('notifications', 'thresholds', 'sentimentDrop', value)
                      }
                      min={5}
                      max={50}
                      step={5}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label>Crescimento Rápido ({settings.notifications.thresholds.rapidGrowth}%)</Label>
                    <Slider
                      value={[settings.notifications.thresholds.rapidGrowth]}
                      onValueChange={([value]) =>
                        updateNestedSettings('notifications', 'thresholds', 'rapidGrowth', value)
                      }
                      min={10}
                      max={100}
                      step={10}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label>Conclusão de Campanha ({settings.notifications.thresholds.campaignCompletion}%)</Label>
                    <Slider
                      value={[settings.notifications.thresholds.campaignCompletion]}
                      onValueChange={([value]) =>
                        updateNestedSettings('notifications', 'thresholds', 'campaignCompletion', value)
                      }
                      min={50}
                      max={100}
                      step={5}
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Segurança</CardTitle>
              <CardDescription>
                Proteja sua conta e dados com configurações de segurança
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Autenticação de Dois Fatores</Label>
                    <p className="text-sm text-muted-foreground">
                      Adicione uma camada extra de segurança
                    </p>
                  </div>
                  <Switch
                    checked={settings.security.twoFactorAuth}
                    onCheckedChange={(checked) =>
                      updateSettings('security', 'twoFactorAuth', checked)
                    }
                  />
                </div>
                <div>
                  <Label>Timeout de Sessão (minutos)</Label>
                  <Input
                    type="number"
                    value={settings.security.sessionTimeout}
                    onChange={(e) =>
                      updateSettings('security', 'sessionTimeout', parseInt(e.target.value))
                    }
                  />
                </div>
                <div>
                  <Label>Expiração de Senha (dias)</Label>
                  <Input
                    type="number"
                    value={settings.security.passwordExpiry}
                    onChange={(e) =>
                      updateSettings('security', 'passwordExpiry', parseInt(e.target.value))
                    }
                  />
                </div>
                <div>
                  <Label>Lista Branca de IPs</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      placeholder="192.168.1.1"
                      value={ipInput}
                      onChange={(e) => setIpInput(e.target.value)}
                    />
                    <Button onClick={addIpToWhitelist}>Adicionar</Button>
                  </div>
                  <div className="mt-3 space-y-2">
                    {settings.security.ipWhitelist.map((ip) => (
                      <div key={ip} className="flex items-center justify-between p-2 border rounded">
                        <span className="text-sm font-mono">{ip}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeIpFromWhitelist(ip)}
                        >
                          Remover
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Acesso à API</Label>
                    <p className="text-sm text-muted-foreground">
                      Permitir acesso via API externa
                    </p>
                  </div>
                  <Switch
                    checked={settings.security.apiAccess}
                    onCheckedChange={(checked) =>
                      updateSettings('security', 'apiAccess', checked)
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Log de Auditoria</Label>
                    <p className="text-sm text-muted-foreground">
                      Registrar todas as ações no sistema
                    </p>
                  </div>
                  <Switch
                    checked={settings.security.auditLog}
                    onCheckedChange={(checked) =>
                      updateSettings('security', 'auditLog', checked)
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Other tabs content would continue similarly... */}
      </Tabs>
    </div>
  );
}