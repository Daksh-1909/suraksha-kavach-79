import React from 'react';
import { 
  TrendingUp, 
  Users, 
  AlertCircle, 
  CheckCircle,
  Activity,
  Calendar
} from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { label: 'Modules Completed', value: '8/12', icon: CheckCircle, color: 'text-success' },
    { label: 'Preparedness Score', value: '78%', icon: TrendingUp, color: 'text-info' },
    { label: 'Active Alerts', value: '2', icon: AlertCircle, color: 'text-warning' },
    { label: 'School Ranking', value: '#15', icon: Users, color: 'text-primary' },
  ];

  const recentActivities = [
    { activity: 'Completed Fire Safety Module', time: '2 hours ago', type: 'success' },
    { activity: 'Participated in Earthquake Drill', time: '1 day ago', type: 'info' },
    { activity: 'Emergency Contact Updated', time: '3 days ago', type: 'neutral' },
    { activity: 'Received Safety Alert', time: '1 week ago', type: 'warning' },
  ];

  const upcomingEvents = [
    { event: 'School-wide Emergency Drill', date: 'Tomorrow, 10:00 AM' },
    { event: 'Disaster Preparedness Workshop', date: 'Friday, 2:00 PM' },
    { event: 'First Aid Training Session', date: 'Next Monday, 11:00 AM' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Your disaster preparedness overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-card border border-subtle-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                </div>
                <Icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-card border border-subtle-border rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Recent Activities</h2>
          </div>
          <div className="space-y-4">
            {recentActivities.map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-subtle-hover/50">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  item.type === 'success' ? 'bg-success' :
                  item.type === 'warning' ? 'bg-warning' :
                  item.type === 'info' ? 'bg-info' : 'bg-muted-foreground'
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{item.activity}</p>
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-card border border-subtle-border rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Upcoming Events</h2>
          </div>
          <div className="space-y-4">
            {upcomingEvents.map((item, index) => (
              <div key={index} className="p-4 rounded-lg border border-subtle-border">
                <h3 className="font-medium text-foreground">{item.event}</h3>
                <p className="text-sm text-muted-foreground mt-1">{item.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;