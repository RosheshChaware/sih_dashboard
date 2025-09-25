import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsCard = ({ title, value, change, changeType, icon, color = 'primary' }) => {
  const getColorClasses = (colorName) => {
    switch (colorName) {
      case 'accent':
        return {
          bg: 'bg-accent/20',
          text: 'text-accent',
          icon: 'text-accent'
        };
      case 'warning':
        return {
          bg: 'bg-warning/20',
          text: 'text-warning',
          icon: 'text-warning'
        };
      case 'error':
        return {
          bg: 'bg-error/20',
          text: 'text-error',
          icon: 'text-error'
        };
      default:
        return {
          bg: 'bg-primary/20',
          text: 'text-primary',
          icon: 'text-primary'
        };
    }
  };

  const getChangeIcon = () => {
    if (changeType === 'increase') return 'TrendingUp';
    if (changeType === 'decrease') return 'TrendingDown';
    return 'Minus';
  };

  const getChangeColor = () => {
    if (changeType === 'increase') return 'text-accent';
    if (changeType === 'decrease') return 'text-error';
    return 'text-text-secondary';
  };

  const colors = getColorClasses(color);

  return (
    <div className="glass rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg ${colors?.bg} flex items-center justify-center`}>
          <Icon name={icon} size={24} className={colors?.icon} />
        </div>
        {change && (
          <div className={`flex items-center space-x-1 ${getChangeColor()}`}>
            <Icon name={getChangeIcon()} size={16} />
            <span className="text-sm font-medium">{change}</span>
          </div>
        )}
      </div>
      <div>
        <h3 className="text-2xl font-bold text-text-primary mb-1">{value}</h3>
        <p className="text-sm text-text-secondary">{title}</p>
      </div>
    </div>
  );
};

export default StatsCard;