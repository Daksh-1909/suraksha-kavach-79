import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertTriangle, X, MapPin } from "lucide-react";
import { useState } from "react";

interface EmergencyAlertProps {
  type: "weather" | "earthquake" | "fire" | "flood";
  severity: "low" | "medium" | "high" | "critical";
  title: string;
  message: string;
  location: string;
  timestamp: string;
  actionRequired?: boolean;
}

export const EmergencyAlert = ({
  type,
  severity,
  title,
  message,
  location,
  timestamp,
  actionRequired = false
}: EmergencyAlertProps) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const getSeverityStyles = () => {
    switch (severity) {
      case "critical":
        return "border-emergency bg-emergency/10 text-emergency-foreground animate-pulse-glow";
      case "high":
        return "border-warning bg-warning/10 text-warning-foreground";
      case "medium":
        return "border-info bg-info/10 text-info-foreground";
      default:
        return "border-muted bg-muted/20 text-muted-foreground";
    }
  };

  const getTypeIcon = () => {
    switch (type) {
      case "earthquake":
        return "🏠";
      case "fire":
        return "🔥";
      case "flood":
        return "🌊";
      case "weather":
        return "⛈️";
      default:
        return "⚠️";
    }
  };

  return (
    <Alert className={`relative ${getSeverityStyles()} shadow-medium animate-slide-up`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          <div className="text-2xl">{getTypeIcon()}</div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="w-4 h-4" />
              <span className="font-semibold uppercase text-xs tracking-wide">
                {severity} ALERT
              </span>
            </div>
            <h3 className="font-bold text-lg mb-2">{title}</h3>
            <AlertDescription className="mb-3">
              {message}
            </AlertDescription>
            <div className="flex items-center gap-4 text-sm opacity-75">
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {location}
              </div>
              <div>{timestamp}</div>
            </div>
            {actionRequired && (
              <div className="mt-4 flex gap-2">
                <Button size="sm" className="bg-gradient-primary">
                  View Safety Protocol
                </Button>
                <Button size="sm" variant="outline">
                  Contact Emergency Services
                </Button>
              </div>
            )}
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setDismissed(true)}
          className="opacity-60 hover:opacity-100"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </Alert>
  );
};