import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import AthleteHeader from './components/AthleteHeader';
import PerformanceCharts from './components/PerformanceCharts';
import VideoHistory from './components/VideoHistory';
import DetailedStats from './components/DetailedStats';
import AchievementTimeline from './components/AchievementTimeline';
import AssessmentCalendar from './components/AssessmentCalendar';

import Button from '../../components/ui/Button';

const AthleteProfile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [notifications, setNotifications] = useState([]);

  // Mock user data
  const currentUser = {
    id: 1,
    name: "Coach Sarah Johnson",
    email: "sarah.johnson@sportstalent.ai",
    type: "coach"
  };

  // Mock athlete data
  const athleteData = {
    id: 1,
    name: "Kartik Rapartiwar",
    age: 19,
    height: "5\'9\"",
    weight: "53 kg",
    position: "Point Guard",
    // sport: "Baske",
    photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtRs_rWILOMx5-v3aXwJu7LWUhnPceiKvvDg&s",
    overallScore: 87,
    rankings: {
      regional: 3,
      national: 15,
      ageGroup: 2
    },
    achievements: [
      { name: "Elite Performer", icon: "Trophy" },
      { name: "Consistency Master", icon: "Target" },
      { name: "Speed Demon", icon: "Zap" },
      { name: "Team Player", icon: "Users" },
      { name: "Improvement Champion", icon: "TrendingUp" }
    ]
  };

  // Mock performance data
  const performanceData = [
    { month: "Jan", overallScore: 75, physicalScore: 78, technicalScore: 72 },
    { month: "Feb", overallScore: 78, physicalScore: 80, technicalScore: 76 },
    { month: "Mar", overallScore: 82, physicalScore: 84, technicalScore: 80 },
    { month: "Apr", overallScore: 85, physicalScore: 87, technicalScore: 83 },
    { month: "May", overallScore: 87, physicalScore: 89, technicalScore: 85 },
    { month: "Jun", overallScore: 89, physicalScore: 91, technicalScore: 87 }
  ];

  // Mock skill data
  const skillData = [
    { skill: "Speed", current: 92, potential: 95 },
    { skill: "Agility", current: 88, potential: 92 },
    { skill: "Strength", current: 85, potential: 90 },
    { skill: "Endurance", current: 83, potential: 88 },
    { skill: "Coordination", current: 90, potential: 93 },
    { skill: "Reaction", current: 87, potential: 91 }
  ];

  // Mock comparison data
  const comparisonData = {
    ageGroup: [
      { name: "Top 10%", value: 15 },
      { name: "Top 25%", value: 25 },
      { name: "Average", value: 35 },
      { name: "Below Average", value: 25 }
    ]
  };

  // Mock video history
  const videoHistory = [
    {
      id: 1,
      title: "Sprint Speed Assessment",
      thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      date: "2025-01-05",
      duration: 180,
      score: 92,
      category: "agility",
      views: 15
    },
    {
      id: 2,
      title: "Strength Training Evaluation",
      thumbnail: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop",
      date: "2025-01-03",
      duration: 240,
      score: 88,
      category: "strength",
      views: 23
    },
    {
      id: 3,
      title: "Technical Skills Assessment",
      thumbnail: "https://images.unsplash.com/photo-1546483875-ad9014c88eba?w=400&h=300&fit=crop",
      date: "2024-12-28",
      duration: 300,
      score: 85,
      category: "technical",
      views: 31
    },
    {
      id: 4,
      title: "Endurance Test Session",
      thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      date: "2024-12-25",
      duration: 420,
      score: 83,
      category: "endurance",
      views: 18
    }
  ];

  // Mock detailed statistics
  const detailedStats = {
    physical: [
      {
        name: "Sprint Speed",
        description: "40-yard dash performance",
        current: 4.2,
        max: 5.0,
        unit: "sec",
        trend: 8,
        peerAverage: 4.5,
        icon: "Zap"
      },
      {
        name: "Vertical Jump",
        description: "Maximum vertical leap height",
        current: 38,
        max: 45,
        unit: "inches",
        trend: 5,
        peerAverage: 35,
        icon: "ArrowUp"
      },
      {
        name: "Bench Press",
        description: "Maximum bench press weight",
        current: 225,
        max: 300,
        unit: "lbs",
        trend: 12,
        peerAverage: 200,
        icon: "Dumbbell"
      }
    ],
    technical: [
      {
        name: "Ball Handling",
        description: "Dribbling accuracy and control",
        current: 88,
        max: 100,
        unit: "%",
        trend: 6,
        peerAverage: 82,
        icon: "Target"
      },
      {
        name: "Shooting Accuracy",
        description: "Field goal percentage",
        current: 76,
        max: 100,
        unit: "%",
        trend: 4,
        peerAverage: 72,
        icon: "Crosshair"
      }
    ],
    mental: [
      {
        name: "Focus Score",
        description: "Concentration during performance",
        current: 85,
        max: 100,
        unit: "%",
        trend: 3,
        peerAverage: 78,
        icon: "Brain"
      },
      {
        name: "Pressure Handling",
        description: "Performance under pressure",
        current: 82,
        max: 100,
        unit: "%",
        trend: 7,
        peerAverage: 75,
        icon: "Shield"
      }
    ],
    tactical: [
      {
        name: "Game IQ",
        description: "Strategic understanding",
        current: 90,
        max: 100,
        unit: "%",
        trend: 2,
        peerAverage: 85,
        icon: "Map"
      },
      {
        name: "Team Play",
        description: "Collaboration effectiveness",
        current: 87,
        max: 100,
        unit: "%",
        trend: 5,
        peerAverage: 80,
        icon: "Users"
      }
    ]
  };

  // Mock recommendations
  const recommendations = [
    {
      type: "strength",
      priority: "high",
      title: "Improve Lower Body Power",
      description: "Focus on explosive leg strength to enhance vertical jump and sprint acceleration.",
      actions: [
        "Add plyometric exercises 3x per week",
        "Increase squat training intensity",
        "Include jump training sessions"
      ],
      expectedImprovement: 15,
      timeline: "6-8 weeks"
    },
    {
      type: "technique",
      priority: "medium",
      title: "Enhance Shooting Consistency",
      description: "Work on shooting form and follow-through for better accuracy under pressure.",
      actions: [
        "Daily shooting drills (100 shots)",
        "Video analysis of shooting form",
        "Practice shooting under fatigue"
      ],
      expectedImprovement: 8,
      timeline: "4-6 weeks"
    },
    {
      type: "mental",
      priority: "low",
      title: "Develop Mental Resilience",
      description: "Build confidence and focus through mental training techniques.",
      actions: [
        "Meditation and mindfulness practice",
        "Visualization exercises",
        "Pressure situation training"
      ],
      expectedImprovement: 12,
      timeline: "8-12 weeks"
    }
  ];

  // Mock achievements and milestones
  const achievements = [
    {
      id: 1,
      title: "Elite Performance Level Achieved",
      description: "Reached top 5% in overall performance metrics",
      date: "2025-01-02",
      category: "performance",
      importance: "high",
      score: 92,
      details: [
        "Exceeded all benchmark targets",
        "Consistent performance over 3 months",
        "Top performer in regional rankings"
      ],
      tags: ["elite", "performance", "milestone"],
      impact: 25
    },
    {
      id: 2,
      title: "Speed Improvement Milestone",
      description: "Improved 40-yard dash time by 0.3 seconds",
      date: "2024-12-15",
      category: "speed",
      importance: "medium",
      score: 88,
      details: [
        "Consistent training regimen",
        "Proper nutrition and recovery",
        "Technical form improvements"
      ],
      tags: ["speed", "improvement", "training"],
      impact: 18
    }
  ];

  const milestones = [
    {
      id: 3,
      title: "100 Training Sessions Completed",
      description: "Reached milestone of 100 completed training sessions",
      date: "2024-12-01",
      category: "training",
      details: [
        "Perfect attendance record",
        "Consistent effort and dedication",
        "Positive attitude throughout"
      ],
      tags: ["dedication", "consistency", "training"],
      impact: 15
    },
    {
      id: 4,
      title: "First Competition Assessment",
      description: "Successfully completed first competitive assessment",
      date: "2024-11-20",
      category: "competition",
      score: 85,
      details: [
        "Overcame initial nervousness",
        "Solid performance across all metrics",
        "Great foundation for improvement"
      ],
      tags: ["competition", "debut", "assessment"],
      impact: 20
    }
  ];

  // Mock scheduled assessments
  const scheduledAssessments = [
    {
      id: 1,
      type: "comprehensive",
      date: "2025-01-15T10:00:00",
      time: "10:00",
      duration: 120,
      notes: "Full performance evaluation"
    },
    {
      id: 2,
      type: "strength",
      date: "2025-01-18T14:30:00",
      time: "14:30",
      duration: 60,
      notes: "Focus on lower body strength"
    },
    {
      id: 3,
      type: "agility",
      date: "2025-01-22T09:00:00",
      time: "09:00",
      duration: 90,
      notes: "Cone drills and reaction time"
    }
  ];

  const availableSlots = [
    "09:00", "10:00", "11:00", "14:00", "15:00", "16:00"
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'performance', label: 'Performance', icon: 'BarChart3' },
    { id: 'videos', label: 'Videos', icon: 'Video' },
    { id: 'stats', label: 'Statistics', icon: 'Target' },
    { id: 'achievements', label: 'Achievements', icon: 'Award' },
    { id: 'calendar', label: 'Calendar', icon: 'Calendar' }
  ];

  // Mock notifications
  useEffect(() => {
    setNotifications([
      {
        id: 1,
        title: "New Assessment Scheduled",
        message: "Comprehensive assessment scheduled for January 15th",
        time: "2 hours ago",
        read: false
      },
      {
        id: 2,
        title: "Performance Improvement",
        message: "Marcus showed 12% improvement in speed metrics",
        time: "1 day ago",
        read: false
      },
      {
        id: 3,
        title: "Training Milestone",
        message: "100 training sessions completed!",
        time: "3 days ago",
        read: true
      }
    ]);
  }, []);

  const handleScheduleAssessment = (formData) => {
    console.log('Scheduling assessment:', formData);
    // In a real app, this would make an API call
  };

  const handleCancelAssessment = (assessmentId) => {
    console.log('Cancelling assessment:', assessmentId);
    // In a real app, this would make an API call
  };

  const handleVideoPlay = (video) => {
    console.log('Playing video:', video);
    // In a real app, this would open a video player
  };

  const handleVideoDelete = (videoId) => {
    console.log('Deleting video:', videoId);
    // In a real app, this would make an API call
  };

  const handleExportReport = () => {
    console.log('Exporting athlete report');
    // In a real app, this would generate and download a report
  };

  const handleNotificationClick = (notification) => {
    console.log('Notification clicked:', notification);
    // Mark as read and handle navigation
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <PerformanceCharts 
              performanceData={performanceData}
              skillData={skillData}
              comparisonData={comparisonData}
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <VideoHistory 
                videos={videoHistory?.slice(0, 4)}
                onVideoPlay={handleVideoPlay}
                onVideoDelete={handleVideoDelete}
              />
              <div className="glass rounded-xl p-6">
                <h3 className="text-lg font-bold text-text-primary mb-4">Quick Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-surface/30 rounded-lg">
                    <p className="text-2xl font-bold text-primary">87%</p>
                    <p className="text-xs text-text-secondary">Overall Score</p>
                  </div>
                  <div className="text-center p-4 bg-surface/30 rounded-lg">
                    <p className="text-2xl font-bold text-accent">#3</p>
                    <p className="text-xs text-text-secondary">Regional Rank</p>
                  </div>
                  <div className="text-center p-4 bg-surface/30 rounded-lg">
                    <p className="text-2xl font-bold text-warning">+12%</p>
                    <p className="text-xs text-text-secondary">Improvement</p>
                  </div>
                  <div className="text-center p-4 bg-surface/30 rounded-lg">
                    <p className="text-2xl font-bold text-text-primary">24</p>
                    <p className="text-xs text-text-secondary">Assessments</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'performance':
        return (
          <PerformanceCharts 
            performanceData={performanceData}
            skillData={skillData}
            comparisonData={comparisonData}
          />
        );
      case 'videos':
        return (
          <VideoHistory 
            videos={videoHistory}
            onVideoPlay={handleVideoPlay}
            onVideoDelete={handleVideoDelete}
          />
        );
      case 'stats':
        return (
          <DetailedStats 
            stats={detailedStats}
            recommendations={recommendations}
          />
        );
      case 'achievements':
        return (
          <AchievementTimeline 
            achievements={achievements}
            milestones={milestones}
          />
        );
      case 'calendar':
        return (
          <AssessmentCalendar 
            scheduledAssessments={scheduledAssessments}
            availableSlots={availableSlots}
            onScheduleAssessment={handleScheduleAssessment}
            onCancelAssessment={handleCancelAssessment}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        user={currentUser}
        notifications={notifications}
        onNotificationClick={handleNotificationClick}
      />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Athlete Header */}
          <AthleteHeader 
            athlete={athleteData}
            onScheduleAssessment={() => setActiveTab('calendar')}
            onExportReport={handleExportReport}
          />

          {/* Navigation Tabs */}
          <div className="glass rounded-xl p-2 mb-6">
            <div className="flex flex-wrap gap-2">
              {tabs?.map((tab) => (
                <Button
                  key={tab?.id}
                  variant={activeTab === tab?.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveTab(tab?.id)}
                  iconName={tab?.icon}
                  iconPosition="left"
                  className="flex-1 sm:flex-none text-xs sm:text-sm"
                >
                  <span className="hidden sm:inline">{tab?.label}</span>
                  <span className="sm:hidden">{tab?.label?.split(' ')?.[0]}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="transition-all duration-300">
            {renderTabContent()}
          </div>

          {/* Back to Dashboard */}
          <div className="mt-8 pt-6 border-t border-border">
            <Button
              variant="outline"
              onClick={() => navigate('/coach-dashboard')}
              iconName="ArrowLeft"
              iconPosition="left"
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AthleteProfile;