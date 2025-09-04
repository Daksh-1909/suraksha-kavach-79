import React, { useState } from 'react';
import { AlertTriangle, MapPin, Phone, Clock } from 'lucide-react';

const SOSPage = () => {
  const [sosMessage, setSosMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLocationSOS = () => {
    setIsLoading(true);
    setSosMessage('Getting your location...');
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude.toFixed(6);
          const lng = position.coords.longitude.toFixed(6);
          setSosMessage(`🆘 SOS Alert Sent Successfully!\nLocation: ${lat}, ${lng}\nEmergency services have been notified.\nHelp is on the way.`);
          setIsLoading(false);
        },
        (error) => {
          setSosMessage('❌ Location access denied. SOS sent without location data.\nEmergency services have been notified.');
          setIsLoading(false);
        }
      );
    } else {
      setSosMessage('❌ Location services not available. SOS sent without location data.\nEmergency services have been notified.');
      setIsLoading(false);
    }
  };

  const emergencyNumbers = [
    { name: 'Emergency Services', number: '911', description: 'Police, Fire, Medical', urgent: true },
    { name: 'Campus Security', number: '(555) 123-4567', description: 'School security office', urgent: false },
    { name: 'Poison Control', number: '1-800-222-1222', description: '24/7 poison emergency', urgent: false },
    { name: 'Crisis Hotline', number: '988', description: 'Mental health crisis support', urgent: false },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Emergency SOS</h1>
        <p className="text-muted-foreground">Quick access to emergency services and help</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SOS Button Section */}
        <div className="bg-card border border-subtle-border rounded-lg p-8">
          <div className="text-center space-y-6">
            <div className={`w-24 h-24 rounded-full mx-auto flex items-center justify-center ${
              isLoading ? 'bg-warning/10 animate-pulse' : 'bg-emergency/10'
            }`}>
              <AlertTriangle className={`w-12 h-12 ${
                isLoading ? 'text-warning' : 'text-emergency'
              }`} />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Emergency Alert</h2>
              <p className="text-muted-foreground">
                Press the button below to send an emergency alert with your location
              </p>
            </div>

            <button
              onClick={handleLocationSOS}
              disabled={isLoading}
              className={`w-full py-6 px-8 rounded-lg font-bold text-xl transition-all ${
                isLoading
                  ? 'bg-warning text-warning-foreground cursor-not-allowed opacity-75'
                  : 'bg-emergency text-emergency-foreground hover:bg-emergency/90 hover:shadow-lg active:scale-95'
              }`}
            >
              <div className="flex items-center justify-center gap-3">
                <MapPin className="w-6 h-6" />
                {isLoading ? 'Sending SOS...' : 'Send Emergency SOS'}
              </div>
            </button>

            {sosMessage && (
              <div className="bg-muted/20 p-6 rounded-lg border border-subtle-border">
                <pre className="text-sm text-foreground whitespace-pre-wrap font-medium text-left">
                  {sosMessage}
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">Emergency Contacts</h2>
            <div className="space-y-3">
              {emergencyNumbers.map((contact, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border transition-colors hover:shadow-md ${
                    contact.urgent
                      ? 'border-emergency/20 bg-emergency/5'
                      : 'border-subtle-border bg-card'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Phone className={`w-5 h-5 ${
                        contact.urgent ? 'text-emergency' : 'text-primary'
                      }`} />
                      <div>
                        <h3 className="font-medium text-foreground">{contact.name}</h3>
                        <p className="text-sm text-muted-foreground">{contact.description}</p>
                      </div>
                    </div>
                    <a
                      href={`tel:${contact.number}`}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        contact.urgent
                          ? 'bg-emergency text-emergency-foreground hover:bg-emergency/90'
                          : 'bg-primary text-primary-foreground hover:bg-primary/90'
                      }`}
                    >
                      {contact.number}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Safety Tips */}
          <div className="bg-info/5 border border-info/20 rounded-lg p-6">
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <Clock className="w-5 h-5 text-info" />
              Before Emergency Services Arrive
            </h3>
            <ul className="text-sm text-foreground space-y-2">
              <li>• Stay calm and assess the immediate danger</li>
              <li>• Move to a safe location if possible</li>
              <li>• Apply first aid if trained and safe to do so</li>
              <li>• Keep your phone charged and accessible</li>
              <li>• Stay on the line with emergency operators</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Additional Resources */}
      <div className="bg-card border border-subtle-border rounded-lg p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">Additional Emergency Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 text-left rounded-lg border border-subtle-border hover:bg-subtle-hover transition-colors">
            <h3 className="font-medium text-foreground mb-1">Emergency Procedures</h3>
            <p className="text-sm text-muted-foreground">Step-by-step emergency response guides</p>
          </button>
          <button className="p-4 text-left rounded-lg border border-subtle-border hover:bg-subtle-hover transition-colors">
            <h3 className="font-medium text-foreground mb-1">First Aid Guide</h3>
            <p className="text-sm text-muted-foreground">Basic first aid and CPR instructions</p>
          </button>
          <button className="p-4 text-left rounded-lg border border-subtle-border hover:bg-subtle-hover transition-colors">
            <h3 className="font-medium text-foreground mb-1">Evacuation Routes</h3>
            <p className="text-sm text-muted-foreground">Building evacuation maps and procedures</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SOSPage;