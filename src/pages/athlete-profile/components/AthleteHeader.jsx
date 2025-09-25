import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const AthleteHeader = ({ athlete, onScheduleAssessment, onExportReport }) => {
  const getPerformanceColor = (score) => {
    if (score >= 85) return 'text-accent';
    if (score >= 70) return 'text-warning';
    return 'text-error';
  };

  const getPerformanceLabel = (score) => {
    if (score >= 85) return 'Elite';
    if (score >= 70) return 'Advanced';
    if (score >= 55) return 'Intermediate';
    return 'Developing';
  };

  return (
    <div className="glass rounded-xl p-6 mb-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Athlete Photo and Basic Info */}
        <div className="flex flex-col sm:flex-row gap-4 lg:gap-6">
          <div className="relative">
            <div className="w-32 h-32 rounded-xl overflow-hidden bg-surface">
              <Image
                src={athlete?.photo}
                alt={athlete?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center">
              <Icon name="Star" size={16} className="text-background" />
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
              <h1 className="text-2xl font-bold text-text-primary">{athlete?.name}</h1>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary">
                {athlete?.sport}
              </span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-text-secondary">Age</p>
                <p className="font-semibold text-text-primary">{athlete?.age} years</p>
              </div>
              <div>
                <p className="text-text-secondary">Height</p>
                <p className="font-semibold text-text-primary">{athlete?.height}</p>
              </div>
              <div>
                <p className="text-text-secondary">Weight</p>
                <p className="font-semibold text-text-primary">{athlete?.weight}</p>
              </div>
              <div>
                <p className="text-text-secondary">Position</p>
                <p className="font-semibold text-text-primary">{athlete?.position}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Score and Rankings */}
        <div className="flex-1 lg:max-w-md">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {/* Overall Performance Score */}
            <div className="bg-surface/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-text-secondary">Overall Score</h3>
                <span className={`text-lg font-bold ${getPerformanceColor(athlete?.overallScore)}`}>
                  {athlete?.overallScore}%
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 mb-2">
                <div 
                  className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${athlete?.overallScore}%` }}
                />
              </div>
              <p className={`text-xs font-medium ${getPerformanceColor(athlete?.overallScore)}`}>
                {getPerformanceLabel(athlete?.overallScore)} Level
              </p>
            </div>

            {/* Rankings */}
            <div className="bg-surface/50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-text-secondary mb-3">Rankings</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-text-secondary">Regional</span>
                  <span className="text-sm font-semibold text-primary">#{athlete?.rankings?.regional}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-text-secondary">National</span>
                  <span className="text-sm font-semibold text-accent">#{athlete?.rankings?.national}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-text-secondary">Age Group</span>
                  <span className="text-sm font-semibold text-warning">#{athlete?.rankings?.ageGroup}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Achievement Badges */}
      <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-border">
        {athlete?.achievements?.map((achievement, index) => (
          <div
            key={index}
            className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full border border-primary/30 hover:border-primary/50 transition-all duration-200 cursor-pointer group"
          >
            <Icon name={achievement?.icon} size={14} className="text-primary group-hover:text-accent transition-colors" />
            <span className="text-xs font-medium text-text-primary">{achievement?.name}</span>
          </div>
        ))}
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-6">
        <Button
          variant="default"
          onClick={onScheduleAssessment}
          iconName="Calendar"
          iconPosition="left"
          className="flex-1 sm:flex-none"
        >
          Schedule Assessment
        </Button>
        <Button
          variant="outline"
          onClick={onExportReport}
          iconName="Download"
          iconPosition="left"
          className="flex-1 sm:flex-none"
        >
          Export Report
        </Button>
      </div>
    </div>
  );
};

export default AthleteHeader;