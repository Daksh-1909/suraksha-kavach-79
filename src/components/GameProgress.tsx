import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Target, Zap, Star } from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  earned: boolean;
  progress?: number;
}

interface GameProgressProps {
  level: number;
  xp: number;
  nextLevelXp: number;
  achievements: Achievement[];
  streak: number;
}

export const GameProgress = ({ level, xp, nextLevelXp, achievements, streak }: GameProgressProps) => {
  const progressPercentage = (xp / nextLevelXp) * 100;
  const earnedAchievements = achievements.filter(a => a.earned).length;

  return (
    <Card className="p-6 bg-gradient-card shadow-soft">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-foreground">Your Progress</h2>
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-warning" />
          <span className="text-lg font-semibold text-warning">{streak} day streak</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-2">
            <Trophy className="w-8 h-8 text-primary-foreground" />
          </div>
          <div className="text-2xl font-bold text-primary">Level {level}</div>
          <div className="text-sm text-muted-foreground">Emergency Expert</div>
        </div>
        
        <div className="text-center">
          <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-2">
            <Target className="w-8 h-8 text-success" />
          </div>
          <div className="text-2xl font-bold text-success">{xp}</div>
          <div className="text-sm text-muted-foreground">Experience Points</div>
        </div>
        
        <div className="text-center">
          <div className="w-16 h-16 bg-warning/20 rounded-full flex items-center justify-center mx-auto mb-2">
            <Star className="w-8 h-8 text-warning" />
          </div>
          <div className="text-2xl font-bold text-warning">{earnedAchievements}</div>
          <div className="text-sm text-muted-foreground">Achievements</div>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Level Progress</span>
          <span className="text-primary font-medium">{xp}/{nextLevelXp} XP</span>
        </div>
        <Progress value={progressPercentage} className="h-3" />
        <div className="text-xs text-muted-foreground mt-1">
          {nextLevelXp - xp} XP to next level
        </div>
      </div>
      
      <div>
        <h3 className="font-semibold mb-3 text-foreground">Recent Achievements</h3>
        <div className="grid grid-cols-2 gap-3">
          {achievements.slice(0, 4).map((achievement) => (
            <div
              key={achievement.id}
              className={`p-3 rounded-lg border transition-all ${
                achievement.earned
                  ? "bg-primary/10 border-primary/20 animate-pulse-glow"
                  : "bg-muted/50 border-border opacity-60"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                {achievement.icon}
                <span className="text-sm font-medium">{achievement.title}</span>
              </div>
              <p className="text-xs text-muted-foreground">{achievement.description}</p>
              {achievement.progress !== undefined && !achievement.earned && (
                <Progress value={achievement.progress} className="h-1 mt-2" />
              )}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};