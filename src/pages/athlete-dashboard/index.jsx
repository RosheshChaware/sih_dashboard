import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import ProgressRings from './components/ProgressRings';
import ProgressCards from './components/ProgressCards';
import AssessmentPanel from './components/AssessmentPanel';
import Leaderboard from './components/Leaderboard';
import AchievementBadges from './components/AchievementBadges';
import ActivityFeed from './components/ActivityFeed';

const AthleteDashboard = () => {
  const [currentUser] = useState({
    id: 'user-001',
    // name: 'Alex Johnson',
    name: 'Kartik Rapartiwar',
    email: 'kartikrapartiwar@gmail.com',
    // email: 'alex.johnson@email.com',
    type: 'athlete',
    rank: 15,
    score: 2847
  });

  const [notifications] = useState([
    {
      id: 1,
      title: 'New Assessment Available',
      message: 'Speed & Agility test is now ready for you',
      time: '5 minutes ago',
      read: false
    },
    {
      id: 2,
      title: 'Achievement Unlocked',
      message: 'You earned the "Speed Demon" badge!',
      time: '1 hour ago',
      read: false
    },
    {
      id: 3,
      title: 'Weekly Report Ready',
      message: 'Your performance summary is available',
      time: '2 hours ago',
      read: true
    }
  ]);

  const [progressData] = useState([
    {
      id: 1,
      label: 'Overall Score',
      value: '2,847',
      // value:0,
      unit: 'pts',
      percentage: 85,
      color: 'var(--color-primary)'
    },
    {
      id: 2,
      label: 'Speed Rating',
      value: '94.2',
      unit: 'mph',
      percentage: 94,
      color: 'var(--color-accent)'
    },
    {
      id: 3,
      label: 'Technique',
      value: '87%',
      unit: 'acc',
      percentage: 87,
      color: 'var(--color-warning)'
    }
  ]);

  const [metricsData] = useState([
    {
      id: 1,
      label: 'Speed Score',
      value: '94.2',
      description: 'Average sprint velocity',
      trend: 'up',
      change: '+5.2%',
      progress: 94,
      icon: 'Zap',
      gradient: 'from-primary to-accent'
    },
    {
      id: 2,
      label: 'Agility Rating',
      value: '88.7',
      description: 'Cone drill performance',
      trend: 'up',
      change: '+2.1%',
      progress: 89,
      icon: 'Move',
      gradient: 'from-accent to-success'
    },
    {
      id: 3,
      label: 'Technique Score',
      value: '91.5',
      description: 'Form analysis rating',
      trend: 'stable',
      change: '0.0%',
      progress: 92,
      icon: 'Target',
      gradient: 'from-warning to-error'
    },
    {
      id: 4,
      label: 'Endurance Level',
      value: '76.3',
      description: 'Stamina assessment',
      trend: 'down',
      change: '-1.8%',
      progress: 76,
      icon: 'Heart',
      gradient: 'from-error to-primary'
    }
  ]);

  const [assessmentTypes] = useState([
    {
      id: 1,
      name: 'Speed Test',
      description: 'Measure your sprint velocity and acceleration',
      duration: '5-10 min',
      difficulty: 'Beginner',
      icon: 'Zap',
      gradient: 'from-primary to-accent'
    },
    {
      id: 2,
      name: 'Agility Challenge',
      description: 'Test your quick direction changes and coordination',
      duration: '8-12 min',
      difficulty: 'Intermediate',
      icon: 'Move',
      gradient: 'from-accent to-success'
    },
    {
      id: 3,
      name: 'Technique Analysis',
      description: 'AI-powered form and technique evaluation',
      duration: '10-15 min',
      difficulty: 'Advanced',
      icon: 'Target',
      gradient: 'from-warning to-error'
    },
    {
      id: 4,
      name: 'Endurance Test',
      description: 'Assess your cardiovascular fitness level',
      duration: '15-20 min',
      difficulty: 'Intermediate',
      icon: 'Heart',
      gradient: 'from-error to-primary'
    }
  ]);

  const [leaderboardData] = useState([
    {
      id: 'lb-001',
      name: 'Siddesh Sambhare',
      avatar: 'https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png',
      sport: 'Karate',
      region: 'north',
      ageGroup: '21-25',
      overall: 3245,
      speed: 98.5,
      agility: 94.2,
      technique: 96.8,
      change: 12
    },
    {
      id: 'lb-002',
      name: 'Purva Rathi',
      avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKgbExBLsq1kILurR49YyQ4sAwIu03CFHJDA&s',
      sport: 'tennis',
      region: 'asia',
      ageGroup: '16-20',
      overall: 3198,
      speed: 92.1,
      agility: 97.3,
      technique: 95.4,
      change: 8
    },
    {
      id: 'lb-003',
      name: 'Roshesh Chaware',
      avatar: 'https://i.pinimg.com/564x/5d/d4/4c/5dd44c627f7bc100c99b1fded05ef7fe.jpg',
      sport: 'basketball',
      region: 'north',
      ageGroup: '21-25',
      overall: 3156,
      speed: 89.7,
      agility: 96.1,
      technique: 93.2,
      change: -3
    },
    {
      id: 'lb-004',
      name: 'Emma Wilson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      sport: 'track',
      region: 'europe',
      ageGroup: '26-30',
      overall: 3089,
      speed: 95.8,
      agility: 88.4,
      technique: 91.7,
      change: 15
    },
    {
      id: 'lb-005',
      name: 'James Park',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      sport: 'football',
      region: 'asia',
      ageGroup: '21-25',
      overall: 2998,
      speed: 91.3,
      agility: 89.6,
      technique: 94.1,
      change: 5
    }
  ]);

  const [achievements] = useState([
    {
      id: 1,
      name: 'Speed Demon',
      description: 'Achieve 90+ speed rating in 5 consecutive tests',
      category: 'speed',
      tier: 'gold',
      unlocked: true,
      isNew: true,
      unlockedDate: 'Dec 8, 2024',
      requirement: '90+ speed rating × 5'
    },
    {
      id: 2,
      name: 'Agility Master',
      description: 'Complete agility course under 30 seconds',
      category: 'agility',
      tier: 'silver',
      unlocked: true,
      isNew: false,
      unlockedDate: 'Dec 5, 2024',
      requirement: 'Sub-30 second agility course'
    },
    {
      id: 3,
      name: 'Perfect Form',
      description: 'Score 95+ on technique analysis',
      category: 'technique',
      tier: 'bronze',
      unlocked: false,
      progress: 87,
      requirement: '95+ technique score'
    },
    {
      id: 4,
      name: 'Consistency King',
      description: 'Maintain performance within 5% variance for 10 tests',
      category: 'consistency',
      tier: 'gold',
      unlocked: false,
      progress: 60,
      requirement: '±5% variance × 10 tests'
    },
    {
      id: 5,
      name: 'Rapid Improver',
      description: 'Increase overall score by 20% in one month',
      category: 'improvement',
      tier: 'silver',
      unlocked: false,
      progress: 45,
      requirement: '+20% score improvement'
    },
    {
      id: 6,
      name: 'Endurance Elite',
      description: 'Complete 20-minute endurance test without breaks',
      category: 'endurance',
      tier: 'bronze',
      unlocked: false,
      progress: 0,
      requirement: '20-min continuous test'
    }
  ]);

  const [activities] = useState([
    {
      id: 1,
      type: 'assessment',
      title: 'Speed Test Completed',
      description: 'Achieved personal best with 94.2 mph average speed',
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      metrics: { speed: '94.2 mph', improvement: '+2.1%' },
      tags: ['Personal Best', 'Speed'],
      priority: 'high'
    },
    {
      id: 2,
      type: 'achievement',
      title: 'New Badge Unlocked',
      description: 'Earned "Speed Demon" achievement for consistent performance',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      tags: ['Achievement', 'Speed'],
      priority: 'normal'
    },
    {
      id: 3,
      type: 'improvement',
      title: 'Technique Score Improved',
      description: 'Your form analysis rating increased by 3.2 points',
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      metrics: { technique: '91.5', improvement: '+3.2' },
      tags: ['Technique', 'Improvement'],
      priority: 'normal'
    },
    {
      id: 4,
      type: 'milestone',
      title: 'Leaderboard Position',
      description: 'Moved up 3 positions to rank #15 in your region',
      timestamp: new Date(Date.now() - 14400000), // 4 hours ago
      metrics: { rank: '#15', change: '+3' },
      tags: ['Leaderboard', 'Ranking'],
      priority: 'normal'
    },
    {
      id: 5,
      type: 'alert',
      title: 'Performance Alert',
      description: 'Endurance score dropped below your 30-day average',
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
      metrics: { endurance: '76.3', change: '-1.8%' },
      tags: ['Alert', 'Endurance'],
      priority: 'high'
    }
  ]);

  const handleNotificationClick = (notification) => {
    console.log('Notification clicked:', notification);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        user={currentUser} 
        notifications={notifications}
        onNotificationClick={handleNotificationClick}
      />
      <main className="pt-16">
        <div className="container mx-auto px-4 py-8">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-white mb-2">
              Welcome back, {currentUser?.name}! 👋
            </h1>
            <p className="text-gray-400">
              Ready to push your limits? Your next breakthrough is just one assessment away.
            </p>
          </motion.div>

          {/* Progress Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <ProgressRings progressData={progressData} />
          </motion.div>

          {/* Metrics Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <ProgressCards metricsData={metricsData} />
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Assessment Panel */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2"
            >
              <AssessmentPanel assessmentTypes={assessmentTypes} />
            </motion.div>

            {/* Leaderboard */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Leaderboard 
                leaderboardData={leaderboardData} 
                currentUser={currentUser}
              />
            </motion.div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Achievement Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <AchievementBadges achievements={achievements} />
            </motion.div>

            {/* Activity Feed */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <ActivityFeed activities={activities} />
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AthleteDashboard;