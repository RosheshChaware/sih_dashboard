import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import CameraPreview from './components/CameraPreview';
import ExercisePanel from './components/ExercisePanel';
import PerformanceNotifications from './components/PerformanceNotifications';
import TestProgress from './components/TestProgress';
import AssessmentTimer from './components/AssessmentTimer';
import Button from '../../components/ui/Button';


const LiveAssessment = () => {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [repCount, setRepCount] = useState(0);
  const [formScore, setFormScore] = useState(85);
  const [techniqueScore, setTechniqueScore] = useState(82);
  const [notifications, setNotifications] = useState([]);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isResting, setIsResting] = useState(false);

  // Mock user data
  const mockUser = {
    id: 1,
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    type: "athlete"
  };

  // Mock notifications
  const mockNotifications = [
    {
      id: 1,
      title: "Assessment Started",
      message: "Live assessment session initiated",
      time: "Just now",
      read: false
    }
  ];

  // Mock exercise data
  const exerciseQueue = [
    {
      id: 1,
      name: "Push-ups",
      category: "Upper Body Strength",
      targetReps: 20,
      duration: 60,
      keyPoints: [
        "Keep your body in a straight line",
        "Lower chest to ground level",
        "Push up with controlled movement",
        "Maintain steady breathing"
      ],
      commonMistakes: [
        "Sagging hips or raised buttocks",
        "Partial range of motion",
        "Too fast repetitions",
        "Holding breath during movement"
      ]
    },
    {
      id: 2,
      name: "Squats",
      category: "Lower Body Strength",
      targetReps: 25,
      duration: 75,
      keyPoints: [
        "Feet shoulder-width apart",
        "Lower until thighs parallel to ground",
        "Keep chest up and core engaged",
        "Drive through heels to stand"
      ],
      commonMistakes: [
        "Knees caving inward",
        "Not going deep enough",
        "Leaning too far forward",
        "Rising on toes"
      ]
    },
    {
      id: 3,
      name: "Burpees",
      category: "Full Body Conditioning",
      targetReps: 15,
      duration: 90,
      keyPoints: [
        "Smooth transition between movements",
        "Full plank position",
        "Jump with arms overhead",
        "Land softly on feet"
      ],
      commonMistakes: [
        "Skipping the plank position",
        "Not jumping high enough",
        "Poor landing mechanics",
        "Rushing through movements"
      ]
    },
    {
      id: 4,
      name: "Mountain Climbers",
      category: "Core & Cardio",
      targetReps: 30,
      duration: 45,
      keyPoints: [
        "Maintain plank position",
        "Alternate legs quickly",
        "Keep core tight",
        "Breathe rhythmically"
      ],
      commonMistakes: [
        "Raising hips too high",
        "Not bringing knees to chest",
        "Uneven leg movement",
        "Holding breath"
      ]
    }
  ];

  const currentExercise = exerciseQueue?.[currentExerciseIndex];
  const totalExercises = exerciseQueue?.length;
  const overallProgress = ((currentExerciseIndex + (repCount / currentExercise?.targetReps)) / totalExercises) * 100;
  const estimatedTimeRemaining = (totalExercises - currentExerciseIndex - 1) * 60 + (currentExercise?.duration - timeElapsed);

  const exerciseInstructions = [
    "Position yourself in front of the camera",
    "Ensure your full body is visible in the frame",
    "Follow the exercise demonstration",
    "Maintain proper form throughout",
    "Complete the target number of repetitions"
  ];

  useEffect(() => {
    let timer;
    if (isRecording && !isResting) {
      timer = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
        
        // Simulate rep counting
        if (Math.random() > 0.85) {
          setRepCount(prev => {
            const newCount = prev + 1;
            if (newCount >= currentExercise?.targetReps) {
              handleExerciseComplete();
            }
            return newCount;
          });
        }

        // Simulate form score changes
        if (Math.random() > 0.9) {
          setFormScore(prev => Math.max(60, Math.min(100, prev + (Math.random() - 0.5) * 10)));
          setTechniqueScore(prev => Math.max(60, Math.min(100, prev + (Math.random() - 0.5) * 8)));
        }

        // Generate performance notifications
        if (Math.random() > 0.95) {
          generatePerformanceNotification();
        }
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRecording, isResting, currentExercise?.targetReps]);

  const generatePerformanceNotification = () => {
    const notifications = [
      {
        type: 'success',
        title: 'Great Form!',
        message: 'Excellent technique detected',
        suggestion: 'Keep maintaining this form quality'
      },
      {
        type: 'warning',
        title: 'Form Check',
        message: 'Slight deviation in posture detected',
        suggestion: 'Focus on keeping your back straight'
      },
      {
        type: 'info',
        title: 'Pace Reminder',
        message: 'Maintain steady rhythm',
        suggestion: 'Control your breathing and movement speed'
      }
    ];

    const randomNotification = notifications?.[Math.floor(Math.random() * notifications?.length)];
    setNotifications(prev => [...prev, randomNotification]);
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setNotifications(prev => [...prev, {
        type: 'success',
        title: 'Assessment Started',
        message: `${currentExercise?.name} assessment is now active`,
        suggestion: 'Focus on proper form and complete the target reps'
      }]);
    }, 2000);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setNotifications(prev => [...prev, {
      type: 'info',
      title: 'Assessment Paused',
      message: 'Recording stopped. You can resume anytime.',
      suggestion: 'Take a moment to rest if needed'
    }]);
  };

  const handleExerciseComplete = () => {
    setNotifications(prev => [...prev, {
      type: 'success',
      title: 'Exercise Complete!',
      message: `${currentExercise?.name} completed successfully`,
      suggestion: 'Great job! Prepare for the next exercise'
    }]);

    if (currentExerciseIndex < totalExercises - 1) {
      setIsResting(true);
      setTimeout(() => {
        setCurrentExerciseIndex(prev => prev + 1);
        setRepCount(0);
        setTimeElapsed(0);
        setIsResting(false);
      }, 30000); // 30 second rest
    } else {
      // Assessment complete
      setIsRecording(false);
      setTimeout(() => {
        navigate('/assessment-results');
      }, 2000);
    }
  };

  const handleTimeUp = () => {
    if (repCount < currentExercise?.targetReps) {
      setNotifications(prev => [...prev, {
        type: 'warning',
        title: 'Time Up!',
        message: `Time limit reached for ${currentExercise?.name}`,
        suggestion: 'Moving to next exercise. Keep pushing!'
      }]);
    }
    handleExerciseComplete();
  };

  const handleNotificationDismiss = (notificationId) => {
    setNotifications(prev => prev?.filter(n => n?.id !== notificationId));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        user={mockUser} 
        notifications={mockNotifications}
        onNotificationClick={() => {}}
      />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-6">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-text-primary mb-2">Live Assessment</h1>
              <p className="text-text-secondary">
                Real-time AI-powered performance analysis and feedback
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => navigate('/athlete-dashboard')}
                iconName="ArrowLeft"
                iconPosition="left"
              >
                Back to Dashboard
              </Button>
              <Button
                variant="destructive"
                onClick={() => navigate('/assessment-results')}
                iconName="Square"
                iconPosition="left"
                disabled={!isRecording}
              >
                End Assessment
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Camera Preview - Main Section */}
            <div className="xl:col-span-2 order-1">
              <div className="h-[600px]">
                <CameraPreview
                  isRecording={isRecording}
                  onStartRecording={handleStartRecording}
                  onStopRecording={handleStopRecording}
                  repCount={repCount}
                  formScore={formScore}
                  exerciseName={currentExercise?.name}
                  isLoading={isLoading}
                />
              </div>
            </div>

            {/* Exercise Panel */}
            <div className="xl:col-span-1 order-2 xl:order-2">
              <div className="h-[600px] overflow-y-auto">
                <ExercisePanel
                  currentExercise={currentExercise}
                  progress={overallProgress}
                  instructions={exerciseInstructions}
                  techniqueScore={techniqueScore}
                  targetReps={currentExercise?.targetReps}
                  completedReps={repCount}
                />
              </div>
            </div>

            {/* Right Panel - Timer and Progress */}
            <div className="xl:col-span-1 order-3 space-y-6">
              {/* Assessment Timer */}
              <AssessmentTimer
                isActive={isRecording}
                duration={currentExercise?.duration}
                onTimeUp={handleTimeUp}
                exerciseName={currentExercise?.name}
                restTime={30}
                isResting={isResting}
              />

              {/* Test Progress */}
              <TestProgress
                currentExerciseIndex={currentExerciseIndex}
                totalExercises={totalExercises}
                exerciseQueue={exerciseQueue}
                overallProgress={overallProgress}
                timeElapsed={timeElapsed}
                estimatedTimeRemaining={estimatedTimeRemaining}
              />
            </div>
          </div>

          {/* Mobile Bottom Controls */}
          <div className="xl:hidden mt-6">
            <div className="glass rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{repCount}</div>
                    <div className="text-xs text-text-secondary">REPS</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">{formScore}%</div>
                    <div className="text-xs text-text-secondary">FORM</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {!isRecording ? (
                    <Button
                      variant="default"
                      onClick={handleStartRecording}
                      iconName="Play"
                      iconPosition="left"
                      className="bg-success hover:bg-success/90"
                    >
                      Start
                    </Button>
                  ) : (
                    <Button
                      variant="destructive"
                      onClick={handleStopRecording}
                      iconName="Pause"
                      iconPosition="left"
                    >
                      Pause
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Performance Notifications */}
      <PerformanceNotifications
        notifications={notifications}
        onDismiss={handleNotificationDismiss}
      />
    </div>
  );
};

export default LiveAssessment;