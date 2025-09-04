import React, { useState, useEffect } from 'react';
import { Shield, User, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  profile: {
    name: string;
    email: string;
    school: string;
  };
  onLogout: () => void;
  setCurrentPage: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  profile,
  onLogout,
  setCurrentPage
}) => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.dropdown-container')) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!mounted) {
    return null; // Avoid hydration mismatch
  }

  return (
    <header className="bg-card border-b border-border px-4 sm:px-6 py-3 sm:py-4 sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-card/95">
      <div className="flex justify-between items-center">
        {/* Logo and Title */}
        <div className="flex items-center gap-2 sm:gap-3">
          <img src="/lovable-uploads/08fe0bbc-e137-47ec-9f75-6abf205c0e4c.png" alt="Suraksha Kavach Logo" className="w-8 h-8 sm:w-12 sm:h-12" />
          <h1 className="text-lg sm:text-2xl font-semibold text-foreground hidden xs:block">
            Suraksha Kavach
          </h1>
          <h1 className="text-lg font-semibold text-foreground xs:hidden">
            SK
          </h1>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          {/* Profile Dropdown */}
          <div className="relative dropdown-container">
            <Button
              variant="ghost"
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="flex items-center gap-2 sm:gap-3 p-2 sm:px-3 sm:py-2"
            >
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="w-3 h-3 sm:w-5 sm:h-5 text-primary" />
              </div>
              <div className="text-left hidden md:block">
                <p className="text-sm font-medium text-foreground truncate max-w-24 lg:max-w-none">
                  {profile.name}
                </p>
                <p className="text-xs text-muted-foreground truncate max-w-24 lg:max-w-none">
                  {profile.school}
                </p>
              </div>
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground hidden sm:block" />
            </Button>

            {showProfileDropdown && (
              <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-card border border-border rounded-lg shadow-lg z-50 animate-fade-in">
                <div className="p-4">
                  <div className="space-y-4">
                    <div className="text-center pb-4 border-b border-border">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <User className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                      </div>
                      <h3 className="font-semibold text-foreground">{profile.name}</h3>
                      <p className="text-sm text-muted-foreground break-all">{profile.email}</p>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs text-muted-foreground uppercase tracking-wide">School</label>
                        <p className="text-sm text-foreground">{profile.school}</p>
                      </div>
                      
                      <Button
                        onClick={() => {
                          setCurrentPage('profile');
                          setShowProfileDropdown(false);
                        }}
                        className="w-full"
                        size="sm"
                      >
                        View Profile
                      </Button>

                      <div className="border-t border-border pt-3">
                        <Button 
                          onClick={onLogout}
                          variant="outline"
                          className="w-full text-destructive hover:bg-destructive/10"
                          size="sm"
                        >
                          Logout
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;