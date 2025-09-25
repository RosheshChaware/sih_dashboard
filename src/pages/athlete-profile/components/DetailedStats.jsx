import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DetailedStats = ({ stats, recommendations }) => {
  const [activeCategory, setActiveCategory] = useState('physical');

  const categories = [
    { id: 'physical', label: 'Physical', icon: 'Dumbbell' },
    { id: 'technical', label: 'Technical', icon: 'Target' },
    { id: 'mental', label: 'Mental', icon: 'Brain' },
    { id: 'tactical', label: 'Tactical', icon: 'Map' }
  ];

  const getStatColor = (value, max = 100) => {
    const percentage = (value / max) * 100;
    if (percentage >= 85) return 'text-accent';
    if (percentage >= 70) return 'text-warning';
    return 'text-error';
  };

  const getStatBg = (value, max = 100) => {
    const percentage = (value / max) * 100;
    if (percentage >= 85) return 'bg-accent';
    if (percentage >= 70) return 'bg-warning';
    return 'bg-error';
  };

  const getRecommendationIcon = (type) => {
    switch (type) {
      case 'strength': return 'Dumbbell';
      case 'speed': return 'Zap';
      case 'endurance': return 'Heart';
      case 'technique': return 'Target';
      case 'mental': return 'Brain';
      default: return 'AlertCircle';
    }
  };

  const getRecommendationColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error border-error/30 bg-error/10';
      case 'medium': return 'text-warning border-warning/30 bg-warning/10';
      case 'low': return 'text-accent border-accent/30 bg-accent/10';
      default: return 'text-text-secondary border-border bg-surface/50';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Detailed Statistics */}
      <div className="lg:col-span-2 glass rounded-xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-xl font-bold text-text-primary">Detailed Statistics</h2>
          <div className="flex flex-wrap gap-2">
            {categories?.map((category) => (
              <Button
                key={category?.id}
                variant={activeCategory === category?.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveCategory(category?.id)}
                iconName={category?.icon}
                iconPosition="left"
                className="text-xs"
              >
                {category?.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {stats?.[activeCategory]?.map((stat, index) => (
            <div key={index} className="bg-surface/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Icon name={stat?.icon} size={20} className="text-primary" />
                  <div>
                    <h4 className="font-semibold text-text-primary">{stat?.name}</h4>
                    <p className="text-xs text-text-secondary">{stat?.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-bold ${getStatColor(stat?.current, stat?.max)}`}>
                    {stat?.current}
                    {stat?.unit && <span className="text-sm font-normal text-text-secondary">/{stat?.unit}</span>}
                  </p>
                  <p className="text-xs text-text-secondary">
                    Max: {stat?.max}{stat?.unit}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-muted rounded-full h-2 mb-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-1000 ${getStatBg(stat?.current, stat?.max)}`}
                  style={{ width: `${Math.min((stat?.current / stat?.max) * 100, 100)}%` }}
                />
              </div>

              {/* Trend and Comparison */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Icon 
                    name={stat?.trend > 0 ? "TrendingUp" : stat?.trend < 0 ? "TrendingDown" : "Minus"} 
                    size={12} 
                    className={stat?.trend > 0 ? "text-accent" : stat?.trend < 0 ? "text-error" : "text-text-secondary"} 
                  />
                  <span className={stat?.trend > 0 ? "text-accent" : stat?.trend < 0 ? "text-error" : "text-text-secondary"}>
                    {stat?.trend > 0 ? '+' : ''}{stat?.trend}% vs last month
                  </span>
                </div>
                <span className="text-text-secondary">
                  Peer avg: {stat?.peerAverage}{stat?.unit}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Improvement Recommendations */}
      <div className="glass rounded-xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <Icon name="Lightbulb" size={20} className="text-warning" />
          <h2 className="text-xl font-bold text-text-primary">Recommendations</h2>
        </div>

        <div className="space-y-4">
          {recommendations?.map((rec, index) => (
            <div 
              key={index} 
              className={`rounded-lg p-4 border transition-all duration-200 hover:shadow-lg ${getRecommendationColor(rec?.priority)}`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-surface/50 flex items-center justify-center">
                  <Icon name={getRecommendationIcon(rec?.type)} size={16} className="text-text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-text-primary text-sm">{rec?.title}</h4>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${
                      rec?.priority === 'high' ? 'bg-error/20 text-error' :
                      rec?.priority === 'medium'? 'bg-warning/20 text-warning' : 'bg-accent/20 text-accent'
                    }`}>
                      {rec?.priority}
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary mb-2">{rec?.description}</p>
                  
                  {/* Action Items */}
                  <div className="space-y-1">
                    {rec?.actions?.map((action, actionIndex) => (
                      <div key={actionIndex} className="flex items-center gap-2 text-xs">
                        <Icon name="CheckCircle2" size={12} className="text-accent" />
                        <span className="text-text-secondary">{action}</span>
                      </div>
                    ))}
                  </div>

                  {/* Expected Improvement */}
                  <div className="mt-3 pt-3 border-t border-border/50">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-text-secondary">Expected improvement:</span>
                      <span className="text-xs font-semibold text-accent">+{rec?.expectedImprovement}%</span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-text-secondary">Timeline:</span>
                      <span className="text-xs font-medium text-text-primary">{rec?.timeline}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-6 pt-6 border-t border-border">
          <h3 className="text-sm font-semibold text-text-primary mb-3">Quick Actions</h3>
          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Calendar"
              iconPosition="left"
              className="w-full justify-start text-xs"
            >
              Schedule Training Session
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="MessageSquare"
              iconPosition="left"
              className="w-full justify-start text-xs"
            >
              Contact Coach
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="BookOpen"
              iconPosition="left"
              className="w-full justify-start text-xs"
            >
              View Training Plan
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedStats;