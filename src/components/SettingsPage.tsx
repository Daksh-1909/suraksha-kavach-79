import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Sun, 
  Moon, 
  Bell, 
  BellOff, 
  Shield, 
  Database, 
  Globe, 
  Lock,
  User,
  Smartphone,
  Mail,
  Volume2
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

const SettingsPage: React.FC = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [emergencyAlerts, setEmergencyAlerts] = useState(true);
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    toast({
      title: `Switched to ${newTheme} mode`,
      description: `The app is now using ${newTheme} theme.`,
    });
  };

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
    toast({
      title: notificationsEnabled ? 'Notifications disabled' : 'Notifications enabled',
      description: notificationsEnabled 
        ? 'You will no longer receive push notifications.' 
        : 'You will now receive emergency alerts and updates.',
    });
  };

  const handleSettingChange = (setting: string, value: boolean) => {
    switch (setting) {
      case 'sound':
        setSoundEnabled(value);
        toast({
          title: value ? 'Sound enabled' : 'Sound disabled',
          description: value ? 'App sounds are now enabled.' : 'App sounds are now disabled.',
        });
        break;
      case 'push':
        setPushNotifications(value);
        toast({
          title: value ? 'Push notifications enabled' : 'Push notifications disabled',
        });
        break;
      case 'email':
        setEmailNotifications(value);
        toast({
          title: value ? 'Email notifications enabled' : 'Email notifications disabled',
        });
        break;
      case 'emergency':
        setEmergencyAlerts(value);
        toast({
          title: value ? 'Emergency alerts enabled' : 'Emergency alerts disabled',
          description: value 
            ? 'You will receive critical emergency notifications.' 
            : 'Emergency alerts have been disabled.',
        });
        break;
    }
  };

  if (!mounted) {
    return null; // Avoid hydration mismatch
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
          <Settings className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage your app preferences and account settings</p>
        </div>
      </div>

      {/* Appearance Settings */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <Sun className="w-5 h-5" />
          Appearance
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {theme === 'dark' ? 
                <Moon className="w-4 h-4 text-primary" /> : 
                <Sun className="w-4 h-4 text-primary" />
              }
              <div>
                <p className="text-sm font-medium">Theme</p>
                <p className="text-xs text-muted-foreground">
                  {theme === 'dark' ? 'Dark mode' : 'Light mode'}
                </p>
              </div>
            </div>
            <Switch
              checked={theme === 'dark'}
              onCheckedChange={toggleTheme}
            />
          </div>
        </div>
      </Card>

      {/* Notification Settings */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Notifications
        </h2>
        <div className="space-y-4">
          {/* Master Notifications Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {notificationsEnabled ? 
                <Bell className="w-4 h-4 text-primary" /> : 
                <BellOff className="w-4 h-4 text-muted-foreground" />
              }
              <div>
                <p className="text-sm font-medium">Enable Notifications</p>
                <p className="text-xs text-muted-foreground">
                  Master control for all notifications
                </p>
              </div>
            </div>
            <Switch
              checked={notificationsEnabled}
              onCheckedChange={toggleNotifications}
            />
          </div>

          <Separator />

          {/* Individual Notification Settings */}
          <div className={`space-y-4 ${!notificationsEnabled ? 'opacity-50' : ''}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Smartphone className="w-4 h-4 text-primary" />
                <div>
                  <p className="text-sm font-medium">Push Notifications</p>
                  <p className="text-xs text-muted-foreground">
                    Receive notifications on your device
                  </p>
                </div>
              </div>
              <Switch
                checked={pushNotifications && notificationsEnabled}
                onCheckedChange={(value) => handleSettingChange('push', value)}
                disabled={!notificationsEnabled}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary" />
                <div>
                  <p className="text-sm font-medium">Email Notifications</p>
                  <p className="text-xs text-muted-foreground">
                    Receive notifications via email
                  </p>
                </div>
              </div>
              <Switch
                checked={emailNotifications && notificationsEnabled}
                onCheckedChange={(value) => handleSettingChange('email', value)}
                disabled={!notificationsEnabled}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="w-4 h-4 text-destructive" />
                <div>
                  <p className="text-sm font-medium">Emergency Alerts</p>
                  <p className="text-xs text-muted-foreground">
                    Critical safety notifications
                  </p>
                  <Badge variant="secondary" className="text-xs mt-1">Recommended</Badge>
                </div>
              </div>
              <Switch
                checked={emergencyAlerts && notificationsEnabled}
                onCheckedChange={(value) => handleSettingChange('emergency', value)}
                disabled={!notificationsEnabled}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Volume2 className="w-4 h-4 text-primary" />
                <div>
                  <p className="text-sm font-medium">Sound</p>
                  <p className="text-xs text-muted-foreground">
                    Play sounds for notifications
                  </p>
                </div>
              </div>
              <Switch
                checked={soundEnabled && notificationsEnabled}
                onCheckedChange={(value) => handleSettingChange('sound', value)}
                disabled={!notificationsEnabled}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Privacy & Security */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <Lock className="w-5 h-5" />
          Privacy & Security
        </h2>
        <div className="space-y-3">
          <Button variant="outline" className="w-full justify-start" size="sm">
            <User className="w-4 h-4 mr-2" />
            Privacy Settings
          </Button>
          <Button variant="outline" className="w-full justify-start" size="sm">
            <Database className="w-4 h-4 mr-2" />
            Data & Storage
          </Button>
          <Button variant="outline" className="w-full justify-start" size="sm">
            <Shield className="w-4 h-4 mr-2" />
            Security Settings
          </Button>
        </div>
      </Card>

      {/* General Settings */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <Globe className="w-5 h-5" />
          General
        </h2>
        <div className="space-y-3">
          <Button variant="outline" className="w-full justify-start" size="sm">
            <Globe className="w-4 h-4 mr-2" />
            Language & Region
          </Button>
          <Button variant="outline" className="w-full justify-start" size="sm">
            <Database className="w-4 h-4 mr-2" />
            Storage Management
          </Button>
        </div>
      </Card>

      {/* About */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">About Suraksha Kavach</h2>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>Version 1.0.0</p>
          <p>Your personal disaster preparedness companion</p>
          <p className="pt-2">
            <Button variant="link" size="sm" className="p-0 h-auto">
              Terms of Service
            </Button>
            {' • '}
            <Button variant="link" size="sm" className="p-0 h-auto">
              Privacy Policy
            </Button>
            {' • '}
            <Button variant="link" size="sm" className="p-0 h-auto">
              Support
            </Button>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default SettingsPage;