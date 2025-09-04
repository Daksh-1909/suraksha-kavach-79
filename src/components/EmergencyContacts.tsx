import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, MapPin, Clock, Users } from "lucide-react";

interface Contact {
  id: string;
  name: string;
  role: string;
  phone: string;
  department: string;
  availability: "Available" | "Busy" | "Emergency Only";
  location: string;
}

interface EmergencyContactsProps {
  contacts: Contact[];
}

export const EmergencyContacts = ({ contacts }: EmergencyContactsProps) => {
  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "Available":
        return "bg-success text-success-foreground";
      case "Busy":
        return "bg-warning text-warning-foreground";
      case "Emergency Only":
        return "bg-emergency text-emergency-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="p-6 bg-gradient-card shadow-soft">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">Emergency Contacts</h2>
        <Button size="sm" variant="outline">
          <Users className="w-4 h-4 mr-2" />
          Add Contact
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {contacts.map((contact) => (
          <Card key={contact.id} className="p-4 hover:shadow-medium transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-foreground">{contact.name}</h3>
                <p className="text-sm text-muted-foreground">{contact.role}</p>
                <p className="text-xs text-muted-foreground">{contact.department}</p>
              </div>
              <Badge className={getAvailabilityColor(contact.availability)}>
                {contact.availability}
              </Badge>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-primary" />
                <span className="font-mono">{contact.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{contact.location}</span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button size="sm" className="flex-1 bg-primary">
                <Phone className="w-4 h-4 mr-2" />
                Call
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                <Clock className="w-4 h-4 mr-2" />
                Schedule
              </Button>
            </div>
          </Card>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-emergency/10 rounded-lg border border-emergency/20">
        <div className="flex items-center gap-2 mb-2">
          <Phone className="w-5 h-5 text-emergency" />
          <h3 className="font-bold text-emergency">Emergency Hotlines</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="font-medium">Police</p>
            <p className="font-mono text-emergency">911</p>
          </div>
          <div>
            <p className="font-medium">Fire Department</p>
            <p className="font-mono text-emergency">911</p>
          </div>
          <div>
            <p className="font-medium">Medical Emergency</p>
            <p className="font-mono text-emergency">911</p>
          </div>
        </div>
      </div>
    </Card>
  );
};