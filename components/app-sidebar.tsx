"use client"

import * as React from "react"
import {
  BarChart3,
  Users,
  UserCheck,
  MessageSquare,
  TrendingUp,
  Bell,
  LayoutGrid,
  ChevronRight,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { NavUser } from "./nav-user"
import { TeamSwitcher } from "./team-switcher"

// Navigation data for PolisData
const navMain = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutGrid,
    isActive: true,
  },
  {
    title: "Engajamento de Campanha",
    url: "/crm",
    icon: Users,
  },
  {
    title: "Políticos",
    url: "/politicians",
    icon: UserCheck,
    items: [
      {
        title: "Todos os Políticos",
        url: "/politicians",
      },
      {
        title: "Comparações",
        url: "/politicians/compare",
      },
    ],
  },
  {
    title: "Campanhas",
    url: "/campaigns",
    icon: MessageSquare,
    items: [
      {
        title: "Todas as Campanhas",
        url: "/campaigns",
      },
      {
        title: "Nova Campanha",
        url: "/campaigns/new",
      },
      {
        title: "Analytics",
        url: "/campaigns/analytics",
      },
      {
        title: "Templates",
        url: "/campaigns/templates",
      },
    ],
  },
  {
    title: "Monitoramento",
    url: "/monitoring",
    icon: TrendingUp,
    items: [
      {
        title: "Redes Sociais",
        url: "/monitoring/social",
      },
      {
        title: "Narrativas Emergentes",
        url: "/monitoring/narratives",
      },
      {
        title: "Análise de Sentimento",
        url: "/monitoring/sentiment",
      },
    ],
  },
  {
    title: "Notificações",
    url: "/notifications",
    icon: Bell,
  },
  {
    title: "Relatórios",
    url: "/reports",
    icon: BarChart3,
    items: [
      {
        title: "Gerar Relatório",
        url: "/reports/new",
      },
      {
        title: "Relatórios Salvos",
        url: "/reports/saved",
      },
      {
        title: "Exportar Dados",
        url: "/reports/export",
      },
    ],
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Inteligência Política</SidebarGroupLabel>
          <SidebarMenu>
            {navMain.map((item) => (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={item.isActive}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  {item.items ? (
                    <>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton tooltip={item.title}>
                          {item.icon && <item.icon />}
                          <span>{item.title}</span>
                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild>
                                <a href={subItem.url}>
                                  <span>{subItem.title}</span>
                                </a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </>
                  ) : (
                    <SidebarMenuButton asChild tooltip={item.title}>
                      <a href={item.url}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}