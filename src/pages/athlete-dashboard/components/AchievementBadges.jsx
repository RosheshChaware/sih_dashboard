import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const AchievementBadges = ({ achievements }) => {
  const [hoveredBadge, setHoveredBadge] = useState(null);

  const getBadgeGradient = (tier) => {
    switch (tier) {
      case 'gold':
        return 'from-yellow-400 to-yellow-600';
      case 'silver':
        return 'from-gray-300 to-gray-500';
      case 'bronze':
        return 'from-orange-400 to-orange-600';
      default:
        return 'from-gray-600 to-gray-800';
    }
  };

  const getBadgeIcon = (category) => {
    switch (category) {
      case 'speed':
        return 'Zap';
      case 'endurance':
        return 'Heart';
      case 'technique':
        return 'Target';
      case 'consistency':
        return 'TrendingUp';
      case 'improvement':
        return 'Award';
      default:
        return 'Star';
    }
  };

  return (
    <div className="glass rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Achievements</h3>
        <div className="flex items-center space-x-2">
          <Icon name="Star" size={16} className="text-accent" />
          <span className="text-sm text-gray-400">
            {achievements?.filter(a => a?.unlocked)?.length}/{achievements?.length}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {achievements?.map((achievement, index) => (
          <motion.div
            key={achievement?.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="relative"
            onMouseEnter={() => setHoveredBadge(achievement?.id)}
            onMouseLeave={() => setHoveredBadge(null)}
          >
            <div className={`relative w-20 h-20 mx-auto mb-3 rounded-full flex items-center justify-center cursor-pointer ${
              achievement?.unlocked 
                ? `bg-gradient-to-br ${getBadgeGradient(achievement?.tier)} shadow-lg` 
                : 'bg-gray-700 opacity-50'
            }`}>
              {achievement?.unlocked && achievement?.isNew && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-6 h-6 bg-accent rounded-full flex items-center justify-center"
                >
                  <Icon name="Sparkles" size={12} className="text-background" />
                </motion.div>
              )}
              
              <Icon 
                name={getBadgeIcon(achievement?.category)} 
                size={32} 
                className={achievement?.unlocked ? 'text-background' : 'text-gray-500'} 
              />
              
              {achievement?.unlocked && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent"
                />
              )}
            </div>
            
            <div className="text-center">
              <p className={`text-sm font-medium ${
                achievement?.unlocked ? 'text-white' : 'text-gray-500'
              }`}>
                {achievement?.name}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {achievement?.unlocked ? achievement?.unlockedDate : `${achievement?.progress}%`}
              </p>
            </div>

            {/* Progress bar for locked achievements */}
            {!achievement?.unlocked && achievement?.progress > 0 && (
              <div className="mt-2">
                <div className="w-full bg-gray-700 rounded-full h-1">
                  <motion.div
                    className="h-1 rounded-full bg-gradient-to-r from-primary to-accent"
                    initial={{ width: 0 }}
                    animate={{ width: `${achievement?.progress}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                </div>
              </div>
            )}

            {/* Tooltip */}
            <AnimatePresence>
              {hoveredBadge === achievement?.id && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-10"
                >
                  <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-lg border border-gray-700 max-w-48">
                    <p className="font-medium mb-1">{achievement?.name}</p>
                    <p className="text-gray-300">{achievement?.description}</p>
                    {achievement?.requirement && (
                      <p className="text-primary mt-1">
                        Requirement: {achievement?.requirement}
                      </p>
                    )}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
      {/* Recent unlock animation */}
      <AnimatePresence>
        {achievements?.some(a => a?.isNew && a?.unlocked) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="mt-6 p-4 bg-gradient-to-r from-accent/20 to-primary/20 rounded-lg border border-accent/30"
          >
            <div className="flex items-center space-x-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 bg-accent rounded-full flex items-center justify-center"
              >
                <Icon name="Star" size={16} className="text-background" />
              </motion.div>
              <div>
                <p className="font-medium text-white">New Achievement Unlocked!</p>
                <p className="text-sm text-gray-300">
                  {achievements?.find(a => a?.isNew && a?.unlocked)?.name}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AchievementBadges;