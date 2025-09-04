import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  BookOpen, 
  Users, 
  CheckCircle,
  Star,
  Target,
  Award,
  Clock,
  RotateCcw,
  Gamepad2,
  Video,
  FileText,
  Mic,
  HeadphonesIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface EnhancedModuleContentProps {
  moduleId: string;
  onComplete: () => void;
  onBack: () => void;
}

const EnhancedModuleContent: React.FC<EnhancedModuleContentProps> = ({ 
  moduleId, 
  onComplete, 
  onBack 
}) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [completedSections, setCompletedSections] = useState<number[]>([]);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [simulationActive, setSimulationActive] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const moduleData = {
    earthquake: {
      title: 'Earthquake Safety',
      sections: [
        {
          id: 0,
          title: 'Understanding Earthquakes',
          type: 'video',
          content: 'Learn about tectonic plates and earthquake causes',
          duration: '8 min',
          hasAudio: true
        },
        {
          id: 1,
          title: 'Drop, Cover, Hold',
          type: 'interactive',
          content: 'Practice the essential earthquake response technique',
          duration: '5 min',
          hasSimulation: true
        },
        {
          id: 2,
          title: 'Home Safety Preparation',
          type: 'checklist',
          content: 'Secure your home for earthquake readiness',
          duration: '10 min',
          hasAudio: true
        },
        {
          id: 3,
          title: 'Emergency Kit Assembly',
          type: 'activity',
          content: 'Build your earthquake emergency kit',
          duration: '15 min'
        },
        {
          id: 4,
          title: 'Community Response',
          type: 'scenario',
          content: 'Learn how communities respond together',
          duration: '12 min',
          hasGroup: true
        },
        {
          id: 5,
          title: 'Knowledge Assessment',
          type: 'quiz',
          content: 'Test your earthquake safety knowledge',
          duration: '10 min'
        }
      ],
      quiz: [
        {
          question: "What should you do immediately when you feel an earthquake?",
          options: ["Run outside", "Stand in a doorway", "Drop, Cover, and Hold On", "Get under a table only"],
          correct: 2
        },
        {
          question: "Where is the safest place to be during an earthquake?",
          options: ["Under a strong desk or table", "In a doorway", "Near a window", "In the center of a room"],
          correct: 0
        },
        {
          question: "How long should your emergency kit last?",
          options: ["1 day", "3 days", "1 week", "2 weeks"],
          correct: 1
        }
      ]
    }
  };

  const currentModule = moduleData[moduleId as keyof typeof moduleData] || moduleData.earthquake;
  const currentSectionData = currentModule.sections[currentSection];
  const progress = ((completedSections.length + (completedSections.includes(currentSection) ? 0 : 0)) / currentModule.sections.length) * 100;

  const markSectionComplete = () => {
    if (!completedSections.includes(currentSection)) {
      setCompletedSections([...completedSections, currentSection]);
    }
    
    if (currentSection < currentModule.sections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      onComplete();
    }
  };

  const renderSectionContent = () => {
    const section = currentSectionData;

    switch (section.type) {
      case 'video':
        return (
          <div className="space-y-6">
            <div className="bg-muted/20 rounded-lg p-8 text-center">
              <Video className="w-16 h-16 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
              <p className="text-muted-foreground mb-6">{section.content}</p>
              
              <div className="flex justify-center gap-4 mb-6">
                <Button 
                  variant={isAudioPlaying ? 'secondary' : 'default'}
                  onClick={() => setIsAudioPlaying(!isAudioPlaying)}
                  className="flex items-center gap-2"
                >
                  {isAudioPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {isAudioPlaying ? 'Pause' : 'Play'} Video
                </Button>
                
                {section.hasAudio && (
                  <Button
                    variant="outline"
                    onClick={() => setIsMuted(!isMuted)}
                    className="flex items-center gap-2"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    {isMuted ? 'Unmute' : 'Audio On'}
                  </Button>
                )}
              </div>

              <div className="bg-primary/5 rounded-lg p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Duration: {section.duration}</span>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <HeadphonesIcon className="w-3 h-3" />
                    Audio Available
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        );

      case 'interactive':
        return (
          <div className="space-y-6">
            <div className="bg-warning/10 rounded-lg p-8 text-center">
              <Gamepad2 className="w-16 h-16 text-warning mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
              <p className="text-muted-foreground mb-6">{section.content}</p>
              
              <Button 
                variant={simulationActive ? 'secondary' : 'default'}
                onClick={() => setSimulationActive(!simulationActive)}
                className="mb-4"
              >
                {simulationActive ? 'Stop Simulation' : 'Start Interactive Simulation'}
              </Button>

              {simulationActive && (
                <div className="bg-card rounded-lg p-6 mt-4">
                  <h4 className="font-semibold mb-4">🚨 Earthquake Simulation Active</h4>
                  <div className="space-y-4 text-left">
                    <div className="p-4 bg-emergency/10 rounded-lg">
                      <p className="font-medium">Step 1: DROP</p>
                      <p className="text-sm text-muted-foreground">Drop to your hands and knees</p>
                    </div>
                    <div className="p-4 bg-warning/10 rounded-lg">
                      <p className="font-medium">Step 2: COVER</p>
                      <p className="text-sm text-muted-foreground">Take cover under a desk or table</p>
                    </div>
                    <div className="p-4 bg-success/10 rounded-lg">
                      <p className="font-medium">Step 3: HOLD ON</p>
                      <p className="text-sm text-muted-foreground">Hold on to your shelter and protect your head</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 'checklist':
        return (
          <div className="space-y-6">
            <div className="bg-info/10 rounded-lg p-8">
              <FileText className="w-16 h-16 text-info mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-center">{section.title}</h3>
              <p className="text-muted-foreground mb-6 text-center">{section.content}</p>
              
              <div className="space-y-3">
                {[
                  'Secure heavy furniture to walls',
                  'Install safety latches on cabinets',
                  'Check foundation and structural integrity',
                  'Identify safe spots in each room',
                  'Practice evacuation routes',
                  'Install flexible gas line connections'
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-card rounded-lg">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'activity':
        return (
          <div className="space-y-6">
            <div className="bg-success/10 rounded-lg p-8 text-center">
              <Target className="w-16 h-16 text-success mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
              <p className="text-muted-foreground mb-6">{section.content}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {[
                  'Water (1 gallon per person per day)',
                  'Non-perishable food (3-day supply)',
                  'Flashlight and extra batteries',
                  'First aid kit',
                  'Emergency radio',
                  'Personal medications',
                  'Important documents',
                  'Cash and credit cards'
                ].map((item, index) => (
                  <div key={index} className="p-3 bg-card rounded-lg text-left">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-success/20 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-success" />
                      </div>
                      <span className="text-sm">{item}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'scenario':
        return (
          <div className="space-y-6">
            <div className="bg-primary/10 rounded-lg p-8 text-center">
              <Users className="w-16 h-16 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
              <p className="text-muted-foreground mb-6">{section.content}</p>
              
              <div className="space-y-4">
                <Card className="p-4 text-left">
                  <h4 className="font-semibold mb-2">Scenario: School Earthquake</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    You're in a classroom when a 6.5 magnitude earthquake strikes. What steps would your community take?
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">School</Badge>
                      <span className="text-sm">Execute evacuation plan</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Emergency Services</Badge>
                      <span className="text-sm">Coordinate rescue operations</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Community</Badge>
                      <span className="text-sm">Establish emergency shelters</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        );

      case 'quiz':
        if (!quizStarted) {
          return (
            <div className="space-y-6">
              <div className="bg-warning/10 rounded-lg p-8 text-center">
                <Award className="w-16 h-16 text-warning mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
                <p className="text-muted-foreground mb-6">{section.content}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Card className="p-4">
                    <div className="text-2xl font-bold text-primary">{currentModule.quiz.length}</div>
                    <div className="text-sm text-muted-foreground">Questions</div>
                  </Card>
                  <Card className="p-4">
                    <div className="text-2xl font-bold text-success">70%</div>
                    <div className="text-sm text-muted-foreground">Pass Rate</div>
                  </Card>
                  <Card className="p-4">
                    <div className="text-2xl font-bold text-info">{section.duration}</div>
                    <div className="text-sm text-muted-foreground">Time Limit</div>
                  </Card>
                </div>

                <Button 
                  onClick={() => setQuizStarted(true)}
                  className="w-full md:w-auto"
                >
                  Start Assessment
                </Button>
              </div>
            </div>
          );
        }

        if (showResults) {
          const score = selectedAnswers.reduce((acc, answer, index) => {
            return acc + (answer === currentModule.quiz[index].correct ? 1 : 0);
          }, 0);
          const percentage = Math.round((score / currentModule.quiz.length) * 100);

          return (
            <div className="space-y-6">
              <div className="bg-card rounded-lg p-8 text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  percentage >= 70 ? 'bg-success/20' : 'bg-warning/20'
                }`}>
                  {percentage >= 70 ? 
                    <CheckCircle className="w-8 h-8 text-success" /> : 
                    <RotateCcw className="w-8 h-8 text-warning" />
                  }
                </div>
                
                <h3 className="text-2xl font-bold mb-2">
                  {percentage >= 70 ? 'Congratulations!' : 'Good Effort!'}
                </h3>
                <p className="text-muted-foreground mb-6">
                  You scored {score} out of {currentModule.quiz.length} ({percentage}%)
                </p>

                <div className="space-y-4">
                  {currentModule.quiz.map((q, index) => (
                    <Card key={index} className="p-4 text-left">
                      <div className="flex items-start gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          selectedAnswers[index] === q.correct ? 'bg-success/20' : 'bg-destructive/20'
                        }`}>
                          {selectedAnswers[index] === q.correct ? 
                            <CheckCircle className="w-4 h-4 text-success" /> : 
                            <span className="text-destructive text-sm">✗</span>
                          }
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm mb-2">{q.question}</p>
                          <p className="text-sm text-success">
                            Correct: {q.options[q.correct]}
                          </p>
                          {selectedAnswers[index] !== q.correct && (
                            <p className="text-sm text-destructive">
                              Your answer: {q.options[selectedAnswers[index]]}
                            </p>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                <div className="flex gap-4 mt-6">
                  {percentage >= 70 ? (
                    <Button onClick={markSectionComplete} className="flex-1">
                      Complete Module
                    </Button>
                  ) : (
                    <>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setQuizStarted(false);
                          setShowResults(false);
                          setCurrentQuizQuestion(0);
                          setSelectedAnswers([]);
                        }}
                        className="flex-1"
                      >
                        Retry Quiz
                      </Button>
                      <Button onClick={markSectionComplete} variant="secondary" className="flex-1">
                        Continue Anyway
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        }

        const currentQuestion = currentModule.quiz[currentQuizQuestion];
        return (
          <div className="space-y-6">
            <div className="bg-card rounded-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <Badge variant="outline">
                  Question {currentQuizQuestion + 1} of {currentModule.quiz.length}
                </Badge>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>No time limit</span>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-6">{currentQuestion.question}</h3>

              <div className="space-y-3 mb-6">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      const newAnswers = [...selectedAnswers];
                      newAnswers[currentQuizQuestion] = index;
                      setSelectedAnswers(newAnswers);
                    }}
                    className={`w-full p-4 text-left rounded-lg border transition-colors ${
                      selectedAnswers[currentQuizQuestion] === index
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:bg-muted/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border ${
                        selectedAnswers[currentQuizQuestion] === index
                          ? 'border-primary bg-primary'
                          : 'border-muted-foreground'
                      }`} />
                      <span>{option}</span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setCurrentQuizQuestion(Math.max(0, currentQuizQuestion - 1))}
                  disabled={currentQuizQuestion === 0}
                >
                  Previous
                </Button>
                
                {currentQuizQuestion === currentModule.quiz.length - 1 ? (
                  <Button
                    onClick={() => setShowResults(true)}
                    disabled={selectedAnswers.length !== currentModule.quiz.length}
                  >
                    Finish Quiz
                  </Button>
                ) : (
                  <Button
                    onClick={() => setCurrentQuizQuestion(currentQuizQuestion + 1)}
                    disabled={selectedAnswers[currentQuizQuestion] === undefined}
                  >
                    Next Question
                  </Button>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return <div>Content not available</div>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Modules
        </button>
        
        <Badge variant="secondary" className="flex items-center gap-2">
          <BookOpen className="w-4 h-4" />
          {currentModule.title}
        </Badge>
      </div>

      {/* Progress */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Module Progress</h2>
          <span className="text-sm text-muted-foreground">
            {completedSections.length} of {currentModule.sections.length} sections completed
          </span>
        </div>
        <Progress value={progress} className="mb-4" />
        
        {/* Section Navigation */}
        <div className="flex flex-wrap gap-2">
          {currentModule.sections.map((section, index) => (
            <button
              key={index}
              onClick={() => setCurrentSection(index)}
              className={`px-3 py-1 text-xs rounded-md transition-colors ${
                index === currentSection
                  ? 'bg-primary text-primary-foreground'
                  : completedSections.includes(index)
                  ? 'bg-success/20 text-success'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {section.title}
              {completedSections.includes(index) && (
                <CheckCircle className="w-3 h-3 inline ml-1" />
              )}
            </button>
          ))}
        </div>
      </Card>

      {/* Current Section */}
      <Card className="p-6">
        {renderSectionContent()}
        
        {currentSectionData.type !== 'quiz' && (
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
              disabled={currentSection === 0}
            >
              Previous Section
            </Button>
            
            <Button onClick={markSectionComplete}>
              {currentSection === currentModule.sections.length - 1 ? 'Complete Module' : 'Next Section'}
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default EnhancedModuleContent;