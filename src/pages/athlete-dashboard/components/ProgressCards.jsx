import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ProgressCards = ({ metricsData }) => {
  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return 'TrendingUp';
      case 'down':
        return 'TrendingDown';
      default:
        return 'Minus';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up':
        return 'text-accent';
      case 'down':
        return 'text-error';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metricsData?.map((metric, index) => (
        <motion.div
          key={metric?.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -5, scale: 1.02 }}
          className="glass rounded-xl p-6 cursor-pointer group hover:shadow-lg transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${metric?.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
              <Icon name={metric?.icon} size={24} className="text-background" />
            </div>
            <div className={`flex items-center space-x-1 ${getTrendColor(metric?.trend)}`}>
              <Icon name={getTrendIcon(metric?.trend)} size={16} />
              <span className="text-sm font-medium">{metric?.change}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-400">{metric?.label}</h4>
            <p className="text-2xl font-bold text-white">{metric?.value}</p>
            <p className="text-xs text-gray-500">{metric?.description}</p>
          </div>

          {/* Progress bar */}
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-gray-400">Progress</span>
              <span className="text-xs text-white">{metric?.progress}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <motion.div
                className={`h-2 rounded-full bg-gradient-to-r ${metric?.gradient}`}
                initial={{ width: 0 }}
                animate={{ width: `${metric?.progress}%` }}
                transition={{ duration: 1.5, delay: index * 0.2 }}
              />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ProgressCards;