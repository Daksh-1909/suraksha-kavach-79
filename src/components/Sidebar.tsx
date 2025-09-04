import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  MessageCircle, 
  Map, 
  AlertTriangle, 
  Home,
  Settings,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'modules', label: 'Learning Modules', icon: BookOpen },
    { id: 'ai-chat', label: 'AI Assistant', icon: MessageCircle },
    { id: 'evacuation-map', label: 'Evacuation Map', icon: Map },
    { id: 'sos', label: 'Emergency SOS', icon: AlertTriangle },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleMenuItemClick = (itemId: string) => {
    setCurrentPage(itemId);
    setIsMobileMenuOpen(false); // Close mobile menu when item is selected
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isMobileMenuOpen && !target.closest('.mobile-sidebar') && !target.closest('.mobile-menu-trigger')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="mobile-menu-trigger fixed top-4 left-4 z-50 lg:hidden bg-card border border-border"
      >
        {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
      </Button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" />
      )}

      {/* Desktop Sidebar */}
      <nav className="hidden lg:block w-64 bg-card border-r border-border h-full shrink-0">
        <div className="p-6">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleMenuItemClick(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    isActive
                      ? 'bg-primary/10 text-primary border border-primary/20'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <nav className={`mobile-sidebar fixed top-0 left-0 h-full w-72 bg-card border-r border-border z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6 pt-16">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleMenuItemClick(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    isActive
                      ? 'bg-primary/10 text-primary border border-primary/20'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;