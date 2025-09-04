import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  BookOpen, 
  AlertTriangle, 
  TrendingUp, 
  Calendar,
  Download,
  Bell
} from "lucide-react";

interface SchoolStats {
  totalStudents: number;
  activeModules: number;
  completionRate: number;
  drillsCompleted: number;
  preparednessScore: number;
}

interface AdminDashboardProps {
  schoolName: string;
  stats: SchoolStats;
}

export const AdminDashboard = ({ schoolName, stats }: AdminDashboardProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{schoolName}</h1>
          <p className="text-muted-foreground">Disaster Preparedness Dashboard</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button size="sm" className="bg-gradient-primary">
            <Bell className="w-4 h-4 mr-2" />
            Send Alert
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-card shadow-soft">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Students</p>
              <p className="text-3xl font-bold text-foreground">{stats.totalStudents}</p>
            </div>
            <div className="p-3 bg-primary/10 rounded-lg">
              <Users className="w-6 h-6 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-card shadow-soft">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Modules</p>
              <p className="text-3xl font-bold text-foreground">{stats.activeModules}</p>
            </div>
            <div className="p-3 bg-info/10 rounded-lg">
              <BookOpen className="w-6 h-6 text-info" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-card shadow-soft">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Completion Rate</p>
              <p className="text-3xl font-bold text-foreground">{stats.completionRate}%</p>
            </div>
            <div className="p-3 bg-success/10 rounded-lg">
              <TrendingUp className="w-6 h-6 text-success" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-card shadow-soft">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Preparedness Score</p>
              <p className="text-3xl font-bold text-foreground">{stats.preparednessScore}/100</p>
            </div>
            <div className="p-3 bg-warning/10 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-warning" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-gradient-card shadow-soft">
          <h3 className="text-xl font-semibold mb-4 text-foreground">Preparedness Overview</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Fire Safety Training</span>
                <span className="text-success font-medium">95%</span>
              </div>
              <Progress value={95} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Earthquake Preparedness</span>
                <span className="text-warning font-medium">78%</span>
              </div>
              <Progress value={78} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Flood Response</span>
                <span className="text-info font-medium">83%</span>
              </div>
              <Progress value={83} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Emergency Communication</span>
                <span className="text-primary font-medium">91%</span>
              </div>
              <Progress value={91} className="h-2" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-card shadow-soft">
          <h3 className="text-xl font-semibold mb-4 text-foreground">Recent Activities</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-success" />
                <div>
                  <p className="font-medium text-foreground">Fire Drill Completed</p>
                  <p className="text-xs text-muted-foreground">Grade 9-12 • 2 hours ago</p>
                </div>
              </div>
              <Badge className="bg-success text-success-foreground">Completed</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-warning/10 rounded-lg">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-warning" />
                <div>
                  <p className="font-medium text-foreground">Earthquake Module</p>
                  <p className="text-xs text-muted-foreground">Grade 6-8 • 1 day ago</p>
                </div>
              </div>
              <Badge className="bg-warning text-warning-foreground">In Progress</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-info/10 rounded-lg">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-info" />
                <div>
                  <p className="font-medium text-foreground">Staff Training Session</p>
                  <p className="text-xs text-muted-foreground">All Staff • 3 days ago</p>
                </div>
              </div>
              <Badge className="bg-info text-info-foreground">Scheduled</Badge>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};