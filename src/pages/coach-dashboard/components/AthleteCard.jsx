import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const AthleteCard = ({ athlete, onViewProfile, onMessage, onAssignTest }) => {
  const getPerformanceColor = (score) => {
    if (score >= 85) return 'text-accent';
    if (score >= 70) return 'text-warning';
    return 'text-error';
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-accent';
    if (progress >= 60) return 'bg-warning';
    return 'bg-error';
  };

  return (
    <div className="glass rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Image
              src={athlete?.avatar}
              alt={athlete?.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-background ${
              athlete?.status === 'active' ? 'bg-accent' : 'bg-muted'
            }`} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">{athlete?.name}</h3>
            <p className="text-sm text-text-secondary">{athlete?.sport} • Age {athlete?.age}</p>
            <p className="text-xs text-primary">{athlete?.level}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onMessage(athlete)}
            className="text-text-secondary hover:text-primary"
          >
            <Icon name="MessageCircle" size={18} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onViewProfile(athlete)}
            className="text-text-secondary hover:text-primary"
          >
            <Icon name="ExternalLink" size={18} />
          </Button>
        </div>
      </div>
      <div className="space-y-4">
        {/* Performance Score */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-text-secondary">Overall Score</span>
          <span className={`text-lg font-bold ${getPerformanceColor(athlete?.overallScore)}`}>
            {athlete?.overallScore}%
          </span>
        </div>

        {/* Progress Bars */}
        <div className="space-y-3">
          {athlete?.skills?.map((skill, index) => (
            <div key={index}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-text-secondary">{skill?.name}</span>
                <span className="text-text-primary">{skill?.progress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(skill?.progress)}`}
                  style={{ width: `${skill?.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Last Assessment</span>
            <span className="text-text-primary">{athlete?.lastAssessment}</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-1">
            <span className="text-text-secondary">Tests Completed</span>
            <span className="text-accent font-medium">{athlete?.testsCompleted}</span>
          </div>
        </div>

        {/* Action Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onAssignTest(athlete)}
          iconName="Plus"
          iconPosition="left"
          className="w-full mt-4"
        >
          Assign Test
        </Button>
      </div>
    </div>
  );
};

export default AthleteCard;