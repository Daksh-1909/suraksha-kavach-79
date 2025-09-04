import React, { useState } from 'react';
import { MapPin, Navigation, AlertTriangle, Phone } from 'lucide-react';

const EvacuationMap = () => {
  const [selectedLocation, setSelectedLocation] = useState('school');

  const locations = {
    school: {
      name: 'School Campus',
      coordinates: '40.7128° N, 74.0060° W',
      exitRoutes: ['Main Entrance', 'East Emergency Exit', 'West Emergency Exit', 'Gym Exit'],
      assemblyPoint: 'Main Parking Lot',
      estimatedTime: '3-5 minutes'
    },
    dormitory: {
      name: 'Student Dormitory',
      coordinates: '40.7150° N, 74.0080° W',
      exitRoutes: ['Stairwell A', 'Stairwell B', 'Emergency Fire Escape'],
      assemblyPoint: 'Quad Area',
      estimatedTime: '2-4 minutes'
    },
    library: {
      name: 'Library Building',
      coordinates: '40.7140° N, 74.0070° W',
      exitRoutes: ['Main Exit', 'Side Exit', 'Emergency Exit'],
      assemblyPoint: 'Library Lawn',
      estimatedTime: '2-3 minutes'
    }
  };

  const emergencyContacts = [
    { name: 'Campus Security', number: '911', type: 'emergency' },
    { name: 'School Administration', number: '(555) 123-4567', type: 'school' },
    { name: 'Local Fire Department', number: '(555) 987-6543', type: 'fire' },
    { name: 'Medical Emergency', number: '(555) 456-7890', type: 'medical' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Evacuation Map</h1>
        <p className="text-muted-foreground">Interactive evacuation routes and assembly points</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Location Selector */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Select Location</h2>
          
          {Object.entries(locations).map(([key, location]) => (
            <button
              key={key}
              onClick={() => setSelectedLocation(key)}
              className={`w-full p-4 rounded-lg border text-left transition-colors ${
                selectedLocation === key
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-subtle-border hover:bg-subtle-hover text-foreground'
              }`}
            >
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5" />
                <div>
                  <h3 className="font-medium">{location.name}</h3>
                  <p className="text-sm text-muted-foreground">{location.coordinates}</p>
                </div>
              </div>
            </button>
          ))}

          {/* Emergency Contacts */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Emergency Contacts</h2>
            <div className="space-y-2">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-card border border-subtle-border rounded-lg">
                  <Phone className={`w-4 h-4 ${
                    contact.type === 'emergency' ? 'text-emergency' :
                    contact.type === 'fire' ? 'text-warning' :
                    contact.type === 'medical' ? 'text-info' : 'text-primary'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{contact.name}</p>
                    <p className="text-sm text-muted-foreground">{contact.number}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Map Visualization */}
        <div className="lg:col-span-2">
          <div className="bg-card border border-subtle-border rounded-lg p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Evacuation Plan: {locations[selectedLocation as keyof typeof locations].name}
            </h2>
            
            {/* Simulated Map Area */}
            <div className="bg-muted/20 rounded-lg h-96 flex items-center justify-center mb-6 border-2 border-dashed border-muted">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Interactive map visualization</p>
                <p className="text-sm text-muted-foreground">showing evacuation routes</p>
              </div>
            </div>

            {/* Evacuation Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Exit Routes</h3>
                  <ul className="space-y-2">
                    {locations[selectedLocation as keyof typeof locations].exitRoutes.map((route, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <Navigation className="w-4 h-4 text-primary" />
                        <span className="text-foreground">{route}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Assembly Point</h3>
                  <p className="text-sm text-foreground bg-success/10 p-3 rounded-lg">
                    📍 {locations[selectedLocation as keyof typeof locations].assemblyPoint}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">Estimated Evacuation Time</h3>
                  <p className="text-sm text-foreground bg-info/10 p-3 rounded-lg">
                    ⏱️ {locations[selectedLocation as keyof typeof locations].estimatedTime}
                  </p>
                </div>
              </div>
            </div>

            {/* Important Notice */}
            <div className="mt-6 p-4 bg-warning/10 border border-warning/20 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-warning mb-1">Important Reminders</h4>
                  <ul className="text-sm text-foreground space-y-1">
                    <li>• Stay calm and move quickly but safely</li>
                    <li>• Do not use elevators during emergencies</li>
                    <li>• Follow staff instructions and designated routes</li>
                    <li>• Wait at assembly point for further instructions</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvacuationMap;