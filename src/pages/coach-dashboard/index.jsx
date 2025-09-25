import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import AthleteCard from './components/AthleteCard';
import AthleteTable from './components/AthleteTable';
import PerformanceChart from './components/PerformanceChart';
import NotificationPanel from './components/NotificationPanel';
import StatsCard from './components/StatsCard';
import AssignTestModal from './components/AssignTestModal';

import Button from '../../components/ui/Button';

const CoachDashboard = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('table');
  const [selectedAthlete, setSelectedAthlete] = useState(null);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

  // Mock user data
  const mockUser = {
    id: 1,
    name: "Coach Sarah Johnson",
    email: "sarah.johnson@sportstalent.ai",
    type: "coach",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  };

  // Mock athletes data
  const mockAthletes = [
    {
      id: 1,
      name: "Marcus Thompson",
      age: 22,
      sport: "Basketball",
      level: "Professional",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      overallScore: 92,
      testsCompleted: 15,
      lastAssessment: "Dec 5, 2024",
      status: "active",
      skills: [
        { name: "Speed", progress: 95 },
        { name: "Agility", progress: 88 },
        { name: "Strength", progress: 92 }
      ]
    },
    {
      id: 2,
      name: "Emma Rodriguez",
      age: 19,
      sport: "Soccer",
      level: "College",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      overallScore: 87,
      testsCompleted: 12,
      lastAssessment: "Dec 4, 2024",
      status: "active",
      skills: [
        { name: "Endurance", progress: 90 },
        { name: "Ball Control", progress: 85 },
        { name: "Speed", progress: 86 }
      ]
    },
    {
      id: 3,
      name: "David Chen",
      age: 24,
      sport: "Tennis",
      level: "Semi-Pro",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      overallScore: 78,
      testsCompleted: 8,
      lastAssessment: "Dec 3, 2024",
      status: "active",
      skills: [
        { name: "Reaction Time", progress: 82 },
        { name: "Precision", progress: 75 },
        { name: "Agility", progress: 77 }
      ]
    },
    {
      id: 4,
      name: "Sophia Williams",
      age: 20,
      sport: "Swimming",
      level: "College",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      overallScore: 85,
      testsCompleted: 10,
      lastAssessment: "Dec 2, 2024",
      status: "active",
      skills: [
        { name: "Endurance", progress: 88 },
        { name: "Technique", progress: 83 },
        { name: "Speed", progress: 84 }
      ]
    },
    {
      id: 5,
      name: "James Miller",
      age: 21,
      sport: "Track & Field",
      level: "College",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      overallScore: 73,
      testsCompleted: 6,
      lastAssessment: "Nov 30, 2024",
      status: "inactive",
      skills: [
        { name: "Speed", progress: 76 },
        { name: "Power", progress: 71 },
        { name: "Technique", progress: 72 }
      ]
    }
  ];

  // Mock notifications
  const mockNotifications = [
    {
      id: 1,
      type: "test_submission",
      title: "New Test Submission",
      message: "Marcus Thompson completed Speed & Agility Assessment with a score of 94%",
      timestamp: "2 minutes ago",
      read: false,
      priority: "medium"
    },
    {
      id: 2,
      type: "performance_alert",
      title: "Performance Alert",
      message: "Emma Rodriguez showed 15% improvement in endurance metrics",
      timestamp: "1 hour ago",
      read: false,
      priority: "high"
    },
    {
      id: 3,
      type: "milestone",
      title: "Achievement Unlocked",
      message: "David Chen reached 100 total assessment points milestone",
      timestamp: "3 hours ago",
      read: true,
      priority: "low"
    },
    {
      id: 4,
      type: "message",
      title: "New Message",
      message: "Sophia Williams sent a question about upcoming assessments",
      timestamp: "5 hours ago",
      read: false,
      priority: "medium"
    }
  ];

  // Mock performance data for charts
  const performanceData = [
    { name: 'Basketball', value: 92 },
    { name: 'Soccer', value: 87 },
    { name: 'Tennis', value: 78 },
    { name: 'Swimming', value: 85 },
    { name: 'Track & Field', value: 73 }
  ];

  const genderDistribution = [
    { name: 'Male', value: 60 },
    { name: 'Female', value: 40 }
  ];

  const handleViewProfile = (athlete) => {
    navigate('/athlete-profile', { state: { athlete } });
  };

  const handleMessage = (athlete) => {
    // In a real app, this would open a messaging interface
    console.log('Opening message for:', athlete?.name);
  };

  const handleAssignTest = (athlete) => {
    setSelectedAthlete(athlete);
    setIsAssignModalOpen(true);
  };

  const handleTestAssignment = (assignmentData) => {
    console.log('Test assigned:', assignmentData);
    // In a real app, this would send the assignment to the backend
  };

  const handleMarkAsRead = (notification) => {
    console.log('Marking as read:', notification);
  };

  const handleMarkAllAsRead = () => {
    console.log('Marking all notifications as read');
  };

  const handleNotificationClick = (notification) => {
    console.log('Notification clicked:', notification);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        user={mockUser} 
        notifications={mockNotifications}
        onNotificationClick={handleNotificationClick}
      />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-text-primary mb-2">Coach Dashboard</h1>
              <p className="text-text-secondary">
                Manage your athletes and track their performance progress
              </p>
            </div>
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <Button
                variant="outline"
                onClick={() => navigate('/live-assessment')}
                iconName="Play"
                iconPosition="left"
              >
                Start Assessment
              </Button>
              <Button
                variant="default"
                onClick={() => navigate('/assessment-results')}
                iconName="BarChart3"
                iconPosition="left"
              >
                View Reports
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="Total Athletes"
              value="24"
              change="+3"
              changeType="increase"
              icon="Users"
              color="primary"
            />
            <StatsCard
              title="Active Assessments"
              value="8"
              change="+2"
              changeType="increase"
              icon="Activity"
              color="accent"
            />
            <StatsCard
              title="Avg Performance"
              value="83%"
              change="+5%"
              changeType="increase"
              icon="TrendingUp"
              color="warning"
            />
            <StatsCard
              title="Completed Tests"
              value="156"
              change="+12"
              changeType="increase"
              icon="CheckCircle"
              color="accent"
            />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Main Content Area */}
            <div className="xl:col-span-3 space-y-8">
              {/* Athletes Section */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-text-primary">Athletes</h2>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant={viewMode === 'table' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('table')}
                      iconName="Table"
                    >
                      Table
                    </Button>
                    <Button
                      variant={viewMode === 'cards' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('cards')}
                      iconName="Grid3X3"
                    >
                      Cards
                    </Button>
                  </div>
                </div>

                {viewMode === 'table' ? (
                  <AthleteTable
                    athletes={mockAthletes}
                    onViewProfile={handleViewProfile}
                    onMessage={handleMessage}
                    onAssignTest={handleAssignTest}
                  />
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockAthletes?.map((athlete) => (
                      <AthleteCard
                        key={athlete?.id}
                        athlete={athlete}
                        onViewProfile={handleViewProfile}
                        onMessage={handleMessage}
                        onAssignTest={handleAssignTest}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Performance Analytics */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <PerformanceChart
                  data={performanceData}
                  type="bar"
                  title="Performance by Sport"
                />
                <PerformanceChart
                  data={genderDistribution}
                  type="pie"
                  title="Gender Distribution"
                />
              </div>
            </div>

            {/* Sidebar */}
            <div className="xl:col-span-1">
              <NotificationPanel
                notifications={mockNotifications}
                onMarkAsRead={handleMarkAsRead}
                onMarkAllAsRead={handleMarkAllAsRead}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Assign Test Modal */}
      <AssignTestModal
        athlete={selectedAthlete}
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        onAssign={handleTestAssignment}
      />
    </div>
  );
};

export default CoachDashboard;