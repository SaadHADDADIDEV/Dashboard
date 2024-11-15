import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Home, BarChart2 } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "./Components/ui/sidebar";
import Logo from "./assets/Experteye_Logo_solid_white.png";
import "./styles/Sidebar.css";

export default function SidebarDashboard() {
  const navigate = useNavigate();

  return (
    <SidebarProvider>
      <Sidebar className="sidebar-bg">
        <SidebarHeader className="sidebar-header sidebar-bg">
          <div className="flex items-center justify-center p-4">
            <img src={Logo} alt="Experteye Logo" className="h-10" />
          </div>
        </SidebarHeader>
        <SidebarContent className="sidebar-content sidebar-bg">
          <SidebarMenu className="sidebar-menu">
            <SidebarMenuItem className="sidebar-menu-item">
              <SidebarMenuButton asChild onClick={() => navigate("/dashboard")}>
                <span className="text-white">
                  <Home className="h-4 w-4" />
                  <span>Dashboard</span>
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem className="sidebar-menu-item">
              <SidebarMenuButton asChild onClick={() => navigate("/trends")}>
                <span className="text-white">
                  <BarChart2 className="h-4 w-4" />
                  <span>Trends</span>
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="sidebar-bg">
          <SidebarMenu></SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarTrigger />
    </SidebarProvider>
  );
}
