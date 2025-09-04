import React, { useState } from 'react';
import { 
  Zap, 
  Flame, 
  Utensils, 
  Home as HomeIcon,
  Waves,
  Wind,
  CheckCircle,
  Clock,
  Lock,
  Trophy,
  Star
} from 'lucide-react';
import EnhancedModuleContent from './EnhancedModuleContent';

const ModulesPage = () => {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [completedModules, setCompletedModules] = useState<string[]>(['earthquake']);

  const modules = [
    {
      id: 'earthquake',
      title: 'Earthquake Safety',
      icon: Zap,
      description: 'Learn how to stay safe during and after earthquakes',
      progress: 100,
      status: 'completed',
      duration: '45 min',
      lessons: 8
    },
      {
        id: 'fire',
        title: 'Fire Safety',
        icon: Flame,
        description: 'Fire prevention, response, and evacuation procedures',
        progress: completedModules.includes('fire') ? 100 : 60,
        status: completedModules.includes('earthquake') ? (completedModules.includes('fire') ? 'completed' : 'available') : 'locked',
        duration: '50 min',
        lessons: 10
      },
      {
        id: 'food',
        title: 'Food Preparedness',
        icon: Utensils,
        description: 'Emergency food storage and water safety',
        progress: 30,
        status: completedModules.includes('fire') ? 'available' : 'locked',
        duration: '35 min',
        lessons: 6
      },
    {
      id: 'flood',
      title: 'Flood Response',
      icon: Waves,
      description: 'Flood preparedness and emergency response',
      progress: 0,
      status: completedModules.includes('fire') ? 'available' : 'locked',
      duration: '40 min',
      lessons: 7
    },
    {
      id: 'storm',
      title: 'Storm Safety',
      icon: Wind,
      description: 'Tornado, hurricane, and severe weather preparation',
      progress: 0,
      status: completedModules.includes('flood') ? 'available' : 'locked',
      duration: '55 min',
      lessons: 9
    },
      {
        id: 'home',
        title: 'Home Emergency Planning',
        icon: HomeIcon,
        description: 'Creating family emergency plans and communication',
        progress: 0,
        status: 'available',
        duration: '30 min',
        lessons: 5
      }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-success" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-warning" />;
      case 'locked':
        return <Lock className="w-5 h-5 text-muted-foreground" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'border-success/20 bg-success/5';
      case 'in-progress':
        return 'border-warning/20 bg-warning/5';
      case 'locked':
        return 'border-muted/20 bg-muted/5 opacity-60';
      default:
        return 'border-primary/20 bg-primary/5 hover:bg-primary/10';
    }
  };

  const handleModuleComplete = (moduleId: string) => {
    setCompletedModules(prev => [...prev, moduleId]);
    setSelectedModule(null);
  };

  const handleModuleClick = (module: any) => {
    if (module.status !== 'locked') {
      setSelectedModule(module.id);
    }
  };

  if (selectedModule) {
    return (
      <EnhancedModuleContent 
        moduleId={selectedModule} 
        onComplete={() => handleModuleComplete(selectedModule)}
        onBack={() => setSelectedModule(null)}
      />
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Learning Modules</h1>
          <p className="text-muted-foreground text-sm sm:text-base">Interactive disaster preparedness training with videos, simulations, activities, and assessments</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Trophy className="w-4 h-4" />
            <span>{completedModules.length} modules completed</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {modules.map((module) => {
          const Icon = module.icon;
          const isDisabled = module.status === 'locked';
          
          return (
            <div
              key={module.id}
              onClick={() => handleModuleClick(module)}
              className={`p-4 sm:p-6 rounded-lg border transition-all duration-200 ${getStatusColor(module.status)} ${
                isDisabled ? 'cursor-not-allowed' : 'cursor-pointer hover:shadow-lg hover:scale-[1.02]'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${
                  module.status === 'completed' ? 'bg-success/10' :
                  module.status === 'in-progress' ? 'bg-warning/10' :
                  module.status === 'locked' ? 'bg-muted/10' : 'bg-primary/10'
                }`}>
                  <Icon className={`w-6 h-6 ${
                    module.status === 'completed' ? 'text-success' :
                    module.status === 'in-progress' ? 'text-warning' :
                    module.status === 'locked' ? 'text-muted-foreground' : 'text-primary'
                  }`} />
                </div>
                {getStatusIcon(module.status)}
              </div>

              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">{module.title}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground mb-4">{module.description}</p>

              <div className="space-y-2 sm:space-y-3">
                <div className="flex justify-between text-xs sm:text-sm text-muted-foreground">
                  <span>{module.lessons} lessons</span>
                  <span>{module.duration}</span>
                </div>

                {module.status !== 'locked' && (
                  <div className="space-y-1 sm:space-y-2">
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="text-foreground font-medium">{module.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          module.status === 'completed' ? 'bg-success' :
                          module.status === 'in-progress' ? 'bg-warning' : 'bg-primary'
                        }`}
                        style={{ width: `${module.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <button
                    disabled={isDisabled}
                    className={`flex-1 py-2 px-3 sm:px-4 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                      isDisabled
                        ? 'bg-muted text-muted-foreground cursor-not-allowed'
                        : module.status === 'completed'
                        ? 'bg-success text-success-foreground hover:bg-success/90'
                        : module.status === 'in-progress'
                        ? 'bg-warning text-warning-foreground hover:bg-warning/90'
                        : 'bg-primary text-primary-foreground hover:bg-primary/90'
                    }`}
                  >
                    {module.status === 'completed' ? 'Review Module' :
                     module.status === 'in-progress' ? 'Continue Learning' :
                     module.status === 'locked' ? 'Locked' : 'Start Module'}
                  </button>
                  {module.status === 'completed' && (
                    <div className="flex items-center gap-1 text-success">
                      <Star className="w-4 h-4 fill-current" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ModulesPage;