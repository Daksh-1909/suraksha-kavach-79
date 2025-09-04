import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  BookOpen, 
  Users, 
  BarChart3, 
  Phone, 
  AlertTriangle,
  Settings,
  User
} from "lucide-react";
import { useState } from "react";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  userRole: "student" | "teacher" | "admin";
  hasAlert?: boolean;
}

export const Navigation = ({ activeTab, onTabChange, userRole, hasAlert = false }: NavigationProps) => {
  const getNavItems = () => {
    const baseItems = [
      { id: "dashboard", label: "Dashboard", icon: Home },
      { id: "modules", label: "Learning Modules", icon: BookOpen },
      { id: "contacts", label: "Emergency Contacts", icon: Phone },
    ];

    if (userRole === "admin" || userRole === "teacher") {
      baseItems.push(
        { id: "analytics", label: "Analytics", icon: BarChart3 },
        { id: "manage", label: "Manage Users", icon: Users }
      );
    }

    return baseItems;
  };

  return (
    <nav className="bg-card border-b shadow-soft sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <img src="/lovable-uploads/08fe0bbc-e137-47ec-9f75-6abf205c0e4c.png" alt="SafeEd Logo" className="w-10 h-10" />
              <span className="text-xl font-bold text-foreground">SafeEd</span>
              {hasAlert && (
                <Badge className="bg-emergency text-emergency-foreground animate-pulse-glow">
                  ALERT
                </Badge>
              )}
            </div>
            
            <div className="hidden md:flex items-center gap-1">
              {getNavItems().map((item) => (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onTabChange(item.id)}
                  className={activeTab === item.id ? "bg-gradient-primary" : ""}
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="capitalize">
              {userRole}
            </Badge>
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <User className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div className="md:hidden pb-3">
          <div className="flex gap-1 overflow-x-auto">
            {getNavItems().map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                size="sm"
                onClick={() => onTabChange(item.id)}
                className={`flex-shrink-0 ${activeTab === item.id ? "bg-gradient-primary" : ""}`}
              >
                <item.icon className="w-4 h-4 mr-2" />
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};