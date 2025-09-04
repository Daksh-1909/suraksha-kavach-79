import React from 'react';
import { 
  Shield, 
  BookOpen, 
  MessageCircle, 
  Map, 
  AlertTriangle,
  TrendingUp,
  Award,
  Users
} from 'lucide-react';

interface HomePageProps {
  setCurrentPage: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ setCurrentPage }) => {
  const quickActions = [
    {
      id: 'sos',
      title: 'Emergency SOS',
      description: 'Quick access to emergency services',
      icon: AlertTriangle,
      color: 'bg-emergency/10 text-emergency hover:bg-emergency/20',
      urgent: true
    },
    {
      id: 'modules',
      title: 'Learning Modules',
      description: 'Interactive disaster preparedness training',
      icon: BookOpen,
      color: 'bg-primary/10 text-primary hover:bg-primary/20'
    },
    {
      id: 'ai-chat',
      title: 'AI Assistant',
      description: 'Get instant answers to safety questions',
      icon: MessageCircle,
      color: 'bg-info/10 text-info hover:bg-info/20'
    },
    {
      id: 'evacuation-map',
      title: 'Evacuation Map',
      description: 'View evacuation routes and assembly points',
      icon: Map,
      color: 'bg-success/10 text-success hover:bg-success/20'
    }
  ];

  const stats = [
    { label: 'Students Trained', value: '2,847', icon: Users },
    { label: 'Modules Completed', value: '15,332', icon: BookOpen },
    { label: 'Safety Score', value: '94%', icon: TrendingUp },
    { label: 'Certificates Earned', value: '1,256', icon: Award }
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Welcome Section */}
      <div className="text-center px-4 sm:px-6">
        <div className="inline-flex items-center gap-2 sm:gap-3 mb-4">
          <div className="p-2 sm:p-3 bg-primary/10 rounded-full">
            <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
            Welcome to Suraksha Kavach
          </h1>
        </div>
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
          Your comprehensive disaster preparedness companion. Stay safe, stay prepared, 
          and protect your community with interactive learning and emergency tools.
        </p>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              onClick={() => setCurrentPage(action.id)}
              className={`p-4 sm:p-6 rounded-lg border border-border transition-all hover:shadow-lg hover:scale-105 ${action.color} ${
                action.urgent ? 'ring-2 ring-emergency/20 animate-pulse' : ''
              }`}
            >
              <div className="text-center space-y-3">
                <div className="flex justify-center">
                  <Icon className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1 text-sm sm:text-base">{action.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">{action.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Stats Section */}
      <div className="bg-card border border-border rounded-lg p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 sm:mb-6 text-center">
          Community Impact
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="inline-flex p-2 sm:p-3 bg-primary/10 rounded-full mb-2 sm:mb-3">
                  <Icon className="w-4 h-4 sm:w-6 sm:h-6 text-primary" />
                </div>
                <div className="text-lg sm:text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Updates */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-card border border-border rounded-lg p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-foreground mb-4">Recent Updates</h3>
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-start gap-3 p-3 bg-accent/50 rounded-lg">
              <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">New Fire Safety Module Released</p>
                <p className="text-xs text-muted-foreground">Learn advanced fire prevention techniques</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-accent/50 rounded-lg">
              <div className="w-2 h-2 bg-info rounded-full mt-2 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">AI Assistant Improvements</p>
                <p className="text-xs text-muted-foreground">Enhanced response accuracy and new topics</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-accent/50 rounded-lg">
              <div className="w-2 h-2 bg-warning rounded-full mt-2 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">Campus Drill Scheduled</p>
                <p className="text-xs text-muted-foreground">Emergency drill on Friday at 2:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-foreground mb-4">Safety Tips</h3>
          <div className="space-y-3 sm:space-y-4">
            <div className="p-3 sm:p-4 bg-success/5 border border-success/20 rounded-lg">
              <h4 className="font-medium text-success mb-1 text-sm">Tip of the Day</h4>
              <p className="text-xs sm:text-sm text-foreground">
                Always keep a flashlight and extra batteries in your emergency kit. 
                Test them monthly to ensure they work when needed.
              </p>
            </div>
            <div className="p-3 sm:p-4 bg-info/5 border border-info/20 rounded-lg">
              <h4 className="font-medium text-info mb-1 text-sm">Did You Know?</h4>
              <p className="text-xs sm:text-sm text-foreground">
                The "Triangle of Life" theory has been debunked. During earthquakes, 
                "Drop, Cover, and Hold On" remains the safest response.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;