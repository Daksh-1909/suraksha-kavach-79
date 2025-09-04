import React, { useState } from 'react';
import { 
  CheckCircle, 
  Clock, 
  Play, 
  ArrowRight, 
  ArrowLeft,
  Target,
  Flame,
  Shield
} from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Progress } from './ui/progress';

interface Quiz {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface Lesson {
  id: string;
  title: string;
  content: string;
  videoUrl?: string;
  quiz?: Quiz;
  simulation?: string;
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
  completed: boolean;
}

interface ModuleContentProps {
  moduleId: string;
  onComplete: () => void;
  onBack: () => void;
}

const ModuleContent: React.FC<ModuleContentProps> = ({ moduleId, onComplete, onBack }) => {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [lessonCompleted, setLessonCompleted] = useState(false);
  const [fireExtinguished, setFireExtinguished] = useState(false);

  // Sample module data
  const modules: Record<string, Module> = {
    earthquake: {
      id: 'earthquake',
      title: 'Earthquake Safety',
      completed: false,
      lessons: [
        {
          id: 'eq1',
          title: 'Understanding Earthquakes',
          content: 'Earthquakes happen when tectonic plates in the Earth\'s crust suddenly move. This movement creates seismic waves that shake the ground. Understanding what causes earthquakes helps us prepare for them.',
          videoUrl: 'https://www.youtube.com/embed/e7ho6z32yyo',
          quiz: {
            question: 'What causes earthquakes?',
            options: ['Wind', 'Tectonic plate movement', 'Rain', 'Temperature changes'],
            correct: 1,
            explanation: 'Earthquakes are caused by the sudden movement of tectonic plates in the Earth\'s crust.'
          }
        },
        {
          id: 'eq2',
          title: 'Drop, Cover, and Hold',
          content: 'The most important earthquake safety rule is "Drop, Cover, and Hold." Drop to your hands and knees, take cover under a sturdy table, and hold on until the shaking stops.',
          quiz: {
            question: 'What should you do first when you feel an earthquake?',
            options: ['Run outside', 'Drop to hands and knees', 'Stand in doorway', 'Call for help'],
            correct: 1,
            explanation: 'The first step is to drop to your hands and knees immediately when you feel shaking.'
          }
        }
      ]
    },
    fire: {
      id: 'fire',
      title: 'Fire Safety',
      completed: false,
      lessons: [
        {
          id: 'fire1',
          title: 'Fire Prevention',
          content: 'Most fires can be prevented by being careful with heat sources, electricity, and flammable materials. Always keep matches and lighters away from children.',
          quiz: {
            question: 'Which is the best way to prevent fires?',
            options: ['Keep matches accessible', 'Be careful with heat sources', 'Leave candles unattended', 'Overload electrical outlets'],
            correct: 1,
            explanation: 'Being careful with heat sources like stoves, candles, and heaters is the best fire prevention.'
          }
        },
        {
          id: 'fire2',
          title: 'Using Fire Extinguishers',
          content: 'Remember PASS: Pull the pin, Aim at the base of the fire, Squeeze the handle, and Sweep side to side. Only fight small fires and always have an escape route.',
          simulation: 'fire-extinguisher',
          quiz: {
            question: 'What does the "A" in PASS stand for?',
            options: ['Attack the fire', 'Aim at the base', 'Always run', 'Alert others'],
            correct: 1,
            explanation: 'The "A" stands for "Aim at the base of the fire" - this is where you should direct the extinguisher.'
          }
        }
      ]
    }
  };

  const currentModule = modules[moduleId];
  
  if (!currentModule) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Modules
          </Button>
        </div>
        <Card className="p-8 text-center">
          <h2 className="text-xl font-semibold mb-2">Module Coming Soon</h2>
          <p className="text-muted-foreground">This module is under development and will be available soon.</p>
        </Card>
      </div>
    );
  }
  
  const lesson = currentModule.lessons[currentLesson];
  const isLastLesson = currentLesson === currentModule.lessons.length - 1;

  if (!lesson) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Modules
          </Button>
        </div>
        <Card className="p-8 text-center">
          <h2 className="text-xl font-semibold mb-2">Lesson Not Found</h2>
          <p className="text-muted-foreground">This lesson is not available.</p>
        </Card>
      </div>
    );
  }

  const handleQuizSubmit = (selectedAnswer: number) => {
    setQuizAnswer(selectedAnswer);
    setShowExplanation(true);
    if (selectedAnswer === lesson.quiz?.correct) {
      setLessonCompleted(true);
    }
  };

  const handleNextLesson = () => {
    if (isLastLesson) {
      onComplete();
    } else {
      setCurrentLesson(prev => prev + 1);
      setShowQuiz(false);
      setQuizAnswer(null);
      setShowExplanation(false);
      setLessonCompleted(false);
      setFireExtinguished(false);
    }
  };

  const handlePrevLesson = () => {
    if (currentLesson > 0) {
      setCurrentLesson(prev => prev - 1);
      setShowQuiz(false);
      setQuizAnswer(null);
      setShowExplanation(false);
      setLessonCompleted(false);
      setFireExtinguished(false);
    }
  };

  const FireExtinguisherSimulation = () => (
    <Card className="p-6 bg-gradient-to-b from-orange-50 to-red-50 border-orange-200">
      <h3 className="text-lg font-semibold mb-4 text-center">Fire Extinguisher Simulation</h3>
      <div className="relative h-40 bg-gray-100 rounded-lg flex items-center justify-center">
        {!fireExtinguished ? (
          <>
            <div className="text-6xl animate-pulse">🔥</div>
            <Button
              onClick={() => setFireExtinguished(true)}
              className="absolute bottom-4 right-4 bg-red-600 hover:bg-red-700"
              size="sm"
            >
              <Shield className="w-4 h-4 mr-1" />
              Use Extinguisher
            </Button>
          </>
        ) : (
          <div className="text-center">
            <div className="text-6xl mb-2">✅</div>
            <p className="text-sm text-muted-foreground">Fire extinguished! Well done!</p>
          </div>
        )}
      </div>
      {fireExtinguished && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
          <p className="text-sm text-green-800">
            Great job! You successfully used the fire extinguisher. Remember PASS: Pull, Aim, Squeeze, Sweep.
          </p>
        </div>
      )}
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Modules
        </Button>
        <div className="text-sm text-muted-foreground">
          Lesson {currentLesson + 1} of {currentModule.lessons.length}
        </div>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="font-medium">{currentModule.title}</span>
          <span>{Math.round(((currentLesson + 1) / currentModule.lessons.length) * 100)}% Complete</span>
        </div>
        <Progress value={((currentLesson + 1) / currentModule.lessons.length) * 100} />
      </div>

      {/* Lesson Content */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">{lesson.title}</h2>
        
        {/* Video */}
        {lesson.videoUrl && (
          <div className="mb-6">
            <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
              <Button variant="outline" className="flex items-center gap-2">
                <Play className="w-4 h-4" />
                Watch Video
              </Button>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="prose prose-sm max-w-none mb-6">
          <p className="text-muted-foreground leading-relaxed">{lesson.content}</p>
        </div>

        {/* Simulation */}
        {lesson.simulation === 'fire-extinguisher' && <FireExtinguisherSimulation />}

        {/* Quiz Section */}
        {lesson.quiz && (
          <div className="mt-8 p-6 bg-muted/30 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Target className="w-5 h-5" />
              Quick Quiz
            </h3>
            
            {!showQuiz ? (
              <Button onClick={() => setShowQuiz(true)} variant="outline">
                Take Quiz
              </Button>
            ) : (
              <div className="space-y-4">
                <p className="font-medium">{lesson.quiz.question}</p>
                
                <div className="space-y-2">
                  {lesson.quiz.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuizSubmit(index)}
                      disabled={showExplanation}
                      className={`w-full p-3 text-left rounded-md border transition-colors ${
                        quizAnswer === index
                          ? index === lesson.quiz!.correct
                            ? 'bg-green-50 border-green-200 text-green-800'
                            : 'bg-red-50 border-red-200 text-red-800'
                          : 'bg-background hover:bg-muted border-border'
                      } ${showExplanation ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      {option}
                      {showExplanation && index === lesson.quiz!.correct && (
                        <CheckCircle className="w-4 h-4 inline ml-2 text-green-600" />
                      )}
                    </button>
                  ))}
                </div>

                {showExplanation && (
                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
                    <p className="text-sm text-blue-800">{lesson.quiz.explanation}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={handlePrevLesson}
          disabled={currentLesson === 0}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Previous
        </Button>

        <Button 
          onClick={handleNextLesson}
          disabled={lesson.quiz && !lessonCompleted && !(lesson.simulation && fireExtinguished)}
          className="flex items-center gap-2"
        >
          {isLastLesson ? 'Complete Module' : 'Next Lesson'}
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default ModuleContent;