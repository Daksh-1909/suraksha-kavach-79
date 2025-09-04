import React, { useState } from 'react';
import { 
  User, 
  Trophy, 
  Target, 
  BookOpen, 
  Award, 
  Calendar,
  CheckCircle,
  TrendingUp,
  Clock,
  Star,
  Zap,
  Medal,
  Edit,
  Save,
  X
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ProfilePageProps {
  profile: {
    name: string;
    email: string;
    school: string;
  };
  setProfile: (profile: { name: string; email: string; school: string }) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ profile, setProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };
  // Mock data for learning progress
  const learningStats = {
    level: 7,
    xp: 2340,
    nextLevelXp: 3000,
    streak: 12,
    totalModules: 6,
    completedModules: 2,
    quizzesTaken: 15,
    averageScore: 87,
    studyHours: 42
  };

  const completedModules = [
    {
      id: 'earthquake',
      title: 'Earthquake Safety',
      completedDate: '2024-08-15',
      score: 95,
      time: '45 min'
    },
    {
      id: 'fire',
      title: 'Fire Safety',
      completedDate: '2024-08-20',
      score: 82,
      time: '50 min'
    }
  ];

  const recentQuizzes = [
    {
      id: 1,
      title: 'Earthquake Emergency Response',
      score: 95,
      date: '2024-08-15',
      questions: 20
    },
    {
      id: 2,
      title: 'Fire Safety Protocols',
      score: 88,
      date: '2024-08-14',
      questions: 15
    },
    {
      id: 3,
      title: 'Emergency First Aid',
      score: 92,
      date: '2024-08-12',
      questions: 25
    },
    {
      id: 4,
      title: 'Home Safety Assessment',
      score: 76,
      date: '2024-08-10',
      questions: 18
    },
    {
      id: 5,
      title: 'Evacuation Procedures',
      score: 84,
      date: '2024-08-08',
      questions: 22
    }
  ];

  const achievements = [
    {
      id: 1,
      title: 'First Steps',
      description: 'Completed your first module',
      icon: <Trophy className="w-5 h-5 text-warning" />,
      earned: true,
      date: '2024-08-15'
    },
    {
      id: 2,
      title: 'Quiz Master',
      description: 'Scored 90+ on 5 quizzes',
      icon: <Medal className="w-5 h-5 text-warning" />,
      earned: true,
      date: '2024-08-18'
    },
    {
      id: 3,
      title: 'Streak Keeper',
      description: 'Maintained 7-day learning streak',
      icon: <Zap className="w-5 h-5 text-warning" />,
      earned: true,
      date: '2024-08-22'
    },
    {
      id: 4,
      title: 'Safety Expert',
      description: 'Complete all modules with 85+ score',
      icon: <Star className="w-5 h-5 text-muted-foreground" />,
      earned: false,
      progress: 33
    }
  ];

  const progressPercentage = (learningStats.xp / learningStats.nextLevelXp) * 100;

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="p-6 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center">
            <User className="w-10 h-10 text-primary" />
          </div>
          <div className="flex-1">
            {!isEditing ? (
              <>
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-3xl font-bold text-foreground">{profile.name}</h1>
                  <Button
                    onClick={() => setIsEditing(true)}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Edit Profile
                  </Button>
                </div>
                <p className="text-muted-foreground mb-1">{profile.email}</p>
                <p className="text-sm text-muted-foreground">{profile.school}</p>
              </>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-foreground">Edit Profile</h2>
                  <div className="flex gap-2">
                    <Button
                      onClick={handleSave}
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      Save
                    </Button>
                    <Button
                      onClick={handleCancel}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </Button>
                  </div>
                </div>
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium">Name</Label>
                    <Input
                      id="name"
                      value={editedProfile.name}
                      onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={editedProfile.email}
                      onChange={(e) => setEditedProfile({...editedProfile, email: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="school" className="text-sm font-medium">School</Label>
                    <Input
                      id="school"
                      value={editedProfile.school}
                      onChange={(e) => setEditedProfile({...editedProfile, school: e.target.value})}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            )}
            {!isEditing && (
              <div className="flex items-center gap-4 mt-4">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Trophy className="w-3 h-3" />
                  Level {learningStats.level}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  {learningStats.streak} day streak
                </Badge>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
            <BookOpen className="w-6 h-6 text-primary" />
          </div>
          <div className="text-2xl font-bold text-primary">{learningStats.completedModules}</div>
          <div className="text-sm text-muted-foreground">Modules Completed</div>
        </Card>

        <Card className="p-4 text-center">
          <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-2">
            <Target className="w-6 h-6 text-success" />
          </div>
          <div className="text-2xl font-bold text-success">{learningStats.quizzesTaken}</div>
          <div className="text-sm text-muted-foreground">Quizzes Taken</div>
        </Card>

        <Card className="p-4 text-center">
          <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-2">
            <Award className="w-6 h-6 text-warning" />
          </div>
          <div className="text-2xl font-bold text-warning">{learningStats.averageScore}%</div>
          <div className="text-sm text-muted-foreground">Average Score</div>
        </Card>

        <Card className="p-4 text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
            <Clock className="w-6 h-6 text-primary" />
          </div>
          <div className="text-2xl font-bold text-primary">{learningStats.studyHours}h</div>
          <div className="text-sm text-muted-foreground">Study Time</div>
        </Card>
      </div>

      {/* Progress Section */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Learning Progress
        </h2>
        <div className="space-y-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Level Progress</span>
            <span className="text-primary font-medium">{learningStats.xp}/{learningStats.nextLevelXp} XP</span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
          <div className="text-xs text-muted-foreground">
            {learningStats.nextLevelXp - learningStats.xp} XP to reach Level {learningStats.level + 1}
          </div>
        </div>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Completed Modules */}
        <Card className="p-6">
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Completed Modules
          </h2>
          <div className="space-y-3">
            {completedModules.map((module) => (
              <div key={module.id} className="p-4 border border-border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-foreground">{module.title}</h3>
                  <Badge variant="secondary" className="text-xs">
                    {module.score}%
                  </Badge>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Completed: {new Date(module.completedDate).toLocaleDateString()}</span>
                  <span>Duration: {module.time}</span>
                </div>
              </div>
            ))}
            {completedModules.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                No modules completed yet. Start learning to see your progress here!
              </p>
            )}
          </div>
        </Card>

        {/* Recent Quizzes */}
        <Card className="p-6">
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Target className="w-5 h-5" />
            Recent Quizzes
          </h2>
          <div className="space-y-3">
            {recentQuizzes.map((quiz) => (
              <div key={quiz.id} className="p-4 border border-border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-foreground text-sm">{quiz.title}</h3>
                  <Badge 
                    variant={quiz.score >= 85 ? "default" : quiz.score >= 70 ? "secondary" : "outline"}
                    className="text-xs"
                  >
                    {quiz.score}%
                  </Badge>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{quiz.questions} questions</span>
                  <span>{new Date(quiz.date).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Achievements */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          <Award className="w-5 h-5" />
          Achievements
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-4 rounded-lg border transition-all ${
                achievement.earned
                  ? "bg-primary/10 border-primary/20"
                  : "bg-muted/50 border-border opacity-60"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                {achievement.icon}
                <div>
                  <h3 className="font-semibold text-sm">{achievement.title}</h3>
                  <p className="text-xs text-muted-foreground">{achievement.description}</p>
                </div>
              </div>
              {achievement.earned ? (
                <div className="text-xs text-success flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Earned on {new Date(achievement.date!).toLocaleDateString()}
                </div>
              ) : (
                <div className="space-y-1">
                  <Progress value={achievement.progress} className="h-1" />
                  <div className="text-xs text-muted-foreground">
                    {achievement.progress}% complete
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ProfilePage;