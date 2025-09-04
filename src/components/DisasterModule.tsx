import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Clock, Users, Award, Play } from "lucide-react";

interface DisasterModuleProps {
  title: string;
  description: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  participants: number;
  progress: number;
  icon: React.ReactNode;
  isCompleted?: boolean;
  onStart: () => void;
}

export const DisasterModule = ({
  title,
  description,
  duration,
  difficulty,
  participants,
  progress,
  icon,
  isCompleted = false,
  onStart,
}: DisasterModuleProps) => {
  const getDifficultyColor = () => {
    switch (difficulty) {
      case "Beginner":
        return "bg-success text-success-foreground";
      case "Intermediate":
        return "bg-warning text-warning-foreground";
      case "Advanced":
        return "bg-emergency text-emergency-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <Card className="p-6 bg-gradient-card shadow-soft hover:shadow-medium transition-all duration-300 group cursor-pointer">
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
          {icon}
        </div>
        <Badge className={getDifficultyColor()}>
          {difficulty}
        </Badge>
      </div>
      
      <h3 className="text-xl font-semibold mb-2 text-foreground">{title}</h3>
      <p className="text-muted-foreground mb-4 line-clamp-2">{description}</p>
      
      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          {duration}
        </div>
        <div className="flex items-center gap-1">
          <Users className="w-4 h-4" />
          {participants} students
        </div>
      </div>
      
      {progress > 0 && (
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Progress</span>
            <span className="text-primary font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      )}
      
      <Button 
        onClick={onStart}
        className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
        variant={isCompleted ? "secondary" : "default"}
      >
        {isCompleted ? (
          <>
            <Award className="w-4 h-4 mr-2" />
            Review Module
          </>
        ) : (
          <>
            <Play className="w-4 h-4 mr-2" />
            {progress > 0 ? "Continue Learning" : "Start Module"}
          </>
        )}
      </Button>
    </Card>
  );
};