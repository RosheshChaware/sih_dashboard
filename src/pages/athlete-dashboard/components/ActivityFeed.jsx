import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ActivityFeed = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'assessment':
        return 'Activity';
      case 'achievement':
        return 'Award';
      case 'improvement':
        return 'TrendingUp';
      case 'milestone':
        return 'Target';
      case 'alert':
        return 'AlertCircle';
      default:
        return 'Bell';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'assessment':
        return 'text-primary';
      case 'achievement':
        return 'text-accent';
      case 'improvement':
        return 'text-success';
      case 'milestone':
        return 'text-warning';
      case 'alert':
        return 'text-error';
      default:
        return 'text-gray-400';
    }
  };

  const getActivityBg = (type) => {
    switch (type) {
      case 'assessment':
        return 'bg-primary/10';
      case 'achievement':
        return 'bg-accent/10';
      case 'improvement':
        return 'bg-success/10';
      case 'milestone':
        return 'bg-warning/10';
      case 'alert':
        return 'bg-error/10';
      default:
        return 'bg-gray-700/10';
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - activityTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="glass rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
          <span className="text-sm text-gray-400">Live Feed</span>
        </div>
      </div>
      <div className="space-y-4 max-h-80 overflow-y-auto">
        {activities?.map((activity, index) => (
          <motion.div
            key={activity?.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-surface/30 transition-colors duration-200"
          >
            <div className={`w-10 h-10 rounded-full ${getActivityBg(activity?.type)} flex items-center justify-center flex-shrink-0`}>
              <Icon 
                name={getActivityIcon(activity?.type)} 
                size={18} 
                className={getActivityColor(activity?.type)} 
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium text-white truncate">
                  {activity?.title}
                </p>
                <span className="text-xs text-gray-400 flex-shrink-0 ml-2">
                  {formatTimestamp(activity?.timestamp)}
                </span>
              </div>
              
              <p className="text-sm text-gray-300 mb-2">
                {activity?.description}
              </p>
              
              {activity?.metrics && (
                <div className="flex items-center space-x-4 text-xs">
                  {Object.entries(activity?.metrics)?.map(([key, value]) => (
                    <div key={key} className="flex items-center space-x-1">
                      <span className="text-gray-400 capitalize">{key}:</span>
                      <span className="text-primary font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              )}
              
              {activity?.tags && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {activity?.tags?.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            {activity?.priority === 'high' && (
              <div className="w-2 h-2 bg-error rounded-full flex-shrink-0 mt-2" />
            )}
          </motion.div>
        ))}
      </div>
      {activities?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Activity" size={48} className="mx-auto mb-4 text-gray-600" />
          <p className="text-gray-400 mb-2">No recent activity</p>
          <p className="text-sm text-gray-500">
            Complete an assessment to see your activity here
          </p>
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;