import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import PerformanceScore from './components/PerformanceScore';
import VideoReview from './components/VideoReview';
import ScoreBreakdown from './components/ScoreBreakdown';
import RecommendationsPanel from './components/RecommendationsPanel';
import PerformanceTrends from './components/PerformanceTrends';
import ActionButtons from './components/ActionButtons';
import Icon from '../../components/AppIcon';

const AssessmentResults = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user] = useState({
    id: 1,
    name: "Alex Rodriguez",
    email: "alex.rodriguez@email.com",
    type: "athlete"
  });

  const [notifications] = useState([
    {
      id: 1,
      title: "Assessment Complete",
      message: "Your basketball shooting assessment has been analyzed",
      time: "2 minutes ago",
      read: false
    },
    {
      id: 2,
      title: "New Achievement",
      message: "You've earned the 'Consistency Master' badge",
      time: "5 minutes ago",
      read: false
    }
  ]);

  // Mock assessment data
  const assessmentData = {
    overallScore: 87,
    previousScore: 82,
    achievements: [
      {
        name: "Speed Demon",
        description: "Achieved top 10% speed performance",
        icon: "Zap",
        color: "bg-primary"
      },
      {
        name: "Accuracy Pro",
        description: "Maintained 90%+ accuracy throughout test",
        icon: "Target",
        color: "bg-success"
      },
      {
        name: "Consistency King",
        description: "Low variance in performance metrics",
        icon: "TrendingUp",
        color: "bg-warning"
      }
    ],
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    videoDuration: 120,
    analysisPoints: [
      {
        timestamp: 15,
        x: 45,
        y: 30,
        type: "good",
        note: "Perfect form on release"
      },
      {
        timestamp: 32,
        x: 60,
        y: 40,
        type: "improvement",
        note: "Slight lean to the left"
      },
      {
        timestamp: 58,
        x: 35,
        y: 25,
        type: "good",
        note: "Excellent follow-through"
      },
      {
        timestamp: 85,
        x: 70,
        y: 50,
        type: "improvement",
        note: "Rushed shot preparation"
      }
    ],
    metrics: [
      {
        name: "Speed",
        score: 92,
        icon: "Zap",
        color: "bg-primary",
        details: [
          { label: "Average Shot Time", value: "1.2s" },
          { label: "Peak Velocity", value: "8.5 m/s" },
          { label: "Reaction Time", value: "0.18s" }
        ],
        improvements: [
          "Focus on quicker release preparation",
          "Practice rapid-fire shooting drills",
          "Improve muscle memory for faster setup"
        ]
      },
      {
        name: "Accuracy",
        score: 89,
        icon: "Target",
        color: "bg-success",
        details: [
          { label: "Shot Percentage", value: "89%" },
          { label: "Target Hits", value: "17/19" },
          { label: "Precision Score", value: "8.9/10" }
        ],
        improvements: [
          "Work on consistent shooting stance",
          "Practice shooting from various angles",
          "Focus on follow-through consistency"
        ]
      },
      {
        name: "Consistency",
        score: 78,
        icon: "BarChart3",
        color: "bg-warning",
        details: [
          { label: "Performance Variance", value: "12%" },
          { label: "Shot Grouping", value: "7.8/10" },
          { label: "Rhythm Score", value: "7.5/10" }
        ],
        improvements: [
          "Develop pre-shot routine",
          "Practice breathing techniques",
          "Focus on maintaining rhythm under pressure"
        ]
      },
      {
        name: "Technique",
        score: 85,
        icon: "Settings",
        color: "bg-accent",
        details: [
          { label: "Form Score", value: "8.5/10" },
          { label: "Balance Rating", value: "8.2/10" },
          { label: "Mechanics", value: "8.7/10" }
        ],
        improvements: [
          "Strengthen core for better balance",
          "Work on shooting arc consistency",
          "Practice proper footwork alignment"
        ]
      }
    ],
    previousMetrics: [
      { name: "Speed", score: 88 },
      { name: "Accuracy", score: 85 },
      { name: "Consistency", score: 75 },
      { name: "Technique", score: 82 }
    ],
    recommendations: [
      {
        title: "Improve Shot Consistency",
        description: "Your accuracy is excellent, but consistency needs work. Focus on developing a reliable pre-shot routine.",
        category: "technique",
        priority: "high",
        icon: "Target",
        color: "bg-error",
        actionSteps: [
          "Develop a 3-step pre-shot routine",
          "Practice 50 shots daily with the same routine",
          "Record yourself to identify form variations",
          "Work with a coach on muscle memory drills"
        ],
        resources: [
          { title: "Pre-Shot Routine Guide", url: "#" },
          { title: "Consistency Training Videos", url: "#" },
          { title: "Mental Focus Techniques", url: "#" }
        ],
        timeline: "2-4 weeks"
      },
      {
        title: "Speed Training Program",
        description: "Your speed is already excellent. Maintain this advantage with targeted training.",
        category: "fitness",
        priority: "medium",
        icon: "Zap",
        color: "bg-warning",
        actionSteps: [
          "Continue current speed training regimen",
          "Add plyometric exercises twice weekly",
          "Focus on explosive movement patterns",
          "Track reaction time improvements"
        ],
        resources: [
          { title: "Plyometric Training Guide", url: "#" },
          { title: "Speed Development Drills", url: "#" }
        ],
        timeline: "Ongoing"
      },
      {
        title: "Mental Game Enhancement",
        description: "Develop mental resilience to maintain performance under pressure situations.",
        category: "mental",
        priority: "medium",
        icon: "Brain",
        color: "bg-primary",
        actionSteps: [
          "Practice visualization techniques daily",
          "Learn pressure situation management",
          "Develop confidence-building routines",
          "Work on focus and concentration drills"
        ],
        resources: [
          { title: "Sports Psychology Basics", url: "#" },
          { title: "Visualization Techniques", url: "#" },
          { title: "Pressure Training Methods", url: "#" }
        ],
        timeline: "4-6 weeks"
      }
    ],
    trendData: [
      { date: "Jan 2025", overallScore: 75, speed: 78, accuracy: 72, consistency: 70 },
      { date: "Feb 2025", overallScore: 78, speed: 80, accuracy: 76, consistency: 72 },
      { date: "Mar 2025", overallScore: 80, speed: 82, accuracy: 78, consistency: 74 },
      { date: "Apr 2025", overallScore: 82, speed: 85, accuracy: 80, consistency: 75 },
      { date: "May 2025", overallScore: 84, speed: 87, accuracy: 83, consistency: 76 },
      { date: "Jun 2025", overallScore: 85, speed: 89, accuracy: 85, consistency: 77 },
      { date: "Jul 2025", overallScore: 86, speed: 90, accuracy: 87, consistency: 77 },
      { date: "Aug 2025", overallScore: 87, speed: 92, accuracy: 89, consistency: 78 }
    ],
    comparisonData: [
      { metric: "Speed", yourScore: 92, averageScore: 78, topScore: 95 },
      { metric: "Accuracy", yourScore: 89, averageScore: 82, topScore: 96 },
      { metric: "Consistency", yourScore: 78, averageScore: 81, topScore: 92 },
      { metric: "Technique", yourScore: 85, averageScore: 79, topScore: 94 }
    ]
  };

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleSaveResults = () => {
    console.log("Saving results to profile...");
    // Mock save functionality
  };

  const handleScheduleAssessment = () => {
    navigate('/live-assessment');
  };

  const handleShareResults = (platform) => {
    console.log(`Sharing results on ${platform}`);
    // Mock sharing functionality
  };

  const handleExportData = (format) => {
    console.log(`Exporting data in ${format} format`);
    // Mock export functionality
  };

  const handleReturnToDashboard = () => {
    navigate('/athlete-dashboard');
  };

  const handleNotificationClick = (notification) => {
    console.log("Notification clicked:", notification);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header user={user} notifications={notifications} onNotificationClick={handleNotificationClick} />
        <div className="pt-16 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-text-primary mb-2">Analyzing Your Performance</h2>
            <p className="text-text-secondary">AI is processing your assessment data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} notifications={notifications} onNotificationClick={handleNotificationClick} />
      <main className="pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Icon name="BarChart3" size={24} className="text-background" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-text-primary">Assessment Results</h1>
                <p className="text-text-secondary">Basketball Shooting Assessment • Completed {new Date()?.toLocaleDateString()}</p>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-surface rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary mb-1">{assessmentData?.overallScore}</div>
                <div className="text-sm text-text-secondary">Overall Score</div>
              </div>
              <div className="bg-surface rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-success mb-1">+{assessmentData?.overallScore - assessmentData?.previousScore}</div>
                <div className="text-sm text-text-secondary">Improvement</div>
              </div>
              <div className="bg-surface rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-accent mb-1">{assessmentData?.achievements?.length}</div>
                <div className="text-sm text-text-secondary">Achievements</div>
              </div>
              <div className="bg-surface rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-warning mb-1">#23</div>
                <div className="text-sm text-text-secondary">Rank</div>
              </div>
            </div>
          </div>

          {/* Performance Score */}
          <PerformanceScore 
            score={assessmentData?.overallScore}
            previousScore={assessmentData?.previousScore}
            achievements={assessmentData?.achievements}
          />

          {/* Video Review */}
          <VideoReview 
            videoUrl={assessmentData?.videoUrl}
            analysisPoints={assessmentData?.analysisPoints}
            duration={assessmentData?.videoDuration}
          />

          {/* Score Breakdown */}
          <ScoreBreakdown 
            metrics={assessmentData?.metrics}
            previousMetrics={assessmentData?.previousMetrics}
          />

          {/* Performance Trends */}
          <PerformanceTrends 
            trendData={assessmentData?.trendData}
            comparisonData={assessmentData?.comparisonData}
          />

          {/* Recommendations */}
          <RecommendationsPanel 
            recommendations={assessmentData?.recommendations}
          />

          {/* Action Buttons */}
          <ActionButtons 
            onSaveResults={handleSaveResults}
            onScheduleAssessment={handleScheduleAssessment}
            onShareResults={handleShareResults}
            onExportData={handleExportData}
            onReturnToDashboard={handleReturnToDashboard}
          />
        </div>
      </main>
    </div>
  );
};

export default AssessmentResults;