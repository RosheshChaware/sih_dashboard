import React from 'react';
import Icon from '../../../components/AppIcon';

const TestProgress = ({ 
  currentExerciseIndex, 
  totalExercises, 
  exerciseQueue, 
  overallProgress,
  timeElapsed,
  estimatedTimeRemaining 
}) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const getProgressColor = (progress) => {
    if (progress >= 75) return 'from-success to-accent';
    if (progress >= 50) return 'from-primary to-accent';
    if (progress >= 25) return 'from-warning to-primary';
    return 'from-error to-warning';
  };

  return (
    <div className="glass rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Assessment Progress</h3>
        <div className="text-sm text-text-secondary">
          {currentExerciseIndex + 1} of {totalExercises} exercises
        </div>
      </div>
      {/* Overall Progress Ring */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-32 h-32">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
            {/* Background circle */}
            <circle
              cx="60"
              cy="60"
              r="50"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-muted"
            />
            {/* Progress circle */}
            <circle
              cx="60"
              cy="60"
              r="50"
              stroke="url(#progressGradient)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 50}`}
              strokeDashoffset={`${2 * Math.PI * 50 * (1 - overallProgress / 100)}`}
              className="transition-all duration-500 ease-out"
            />
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" className="text-primary" stopColor="currentColor" />
                <stop offset="100%" className="text-accent" stopColor="currentColor" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-text-primary">{Math.round(overallProgress)}%</div>
              <div className="text-xs text-text-secondary">Complete</div>
            </div>
          </div>
        </div>
      </div>
      {/* Time Information */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-3 bg-surface/50 rounded-lg">
          <Icon name="Clock" size={20} className="text-primary mx-auto mb-2" />
          <div className="text-lg font-semibold text-text-primary">{formatTime(timeElapsed)}</div>
          <div className="text-xs text-text-secondary">Elapsed</div>
        </div>
        <div className="text-center p-3 bg-surface/50 rounded-lg">
          <Icon name="Timer" size={20} className="text-accent mx-auto mb-2" />
          <div className="text-lg font-semibold text-text-primary">{formatTime(estimatedTimeRemaining)}</div>
          <div className="text-xs text-text-secondary">Remaining</div>
        </div>
      </div>
      {/* Exercise Queue */}
      <div>
        <h4 className="text-sm font-semibold text-text-primary mb-3 flex items-center">
          <Icon name="List" size={16} className="mr-2 text-primary" />
          Remaining Exercises
        </h4>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {exerciseQueue?.map((exercise, index) => {
            const isActive = index === 0;
            const isCompleted = index < currentExerciseIndex;
            
            return (
              <div
                key={exercise?.id}
                className={`
                  flex items-center space-x-3 p-3 rounded-lg transition-all duration-200
                  ${isActive 
                    ? 'bg-primary/20 border border-primary/30' 
                    : isCompleted 
                      ? 'bg-success/10 border border-success/20' :'bg-surface/30 border border-border'
                  }
                `}
              >
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                  ${isActive 
                    ? 'bg-primary text-primary-foreground' 
                    : isCompleted 
                      ? 'bg-success text-success-foreground' 
                      : 'bg-muted text-text-secondary'
                  }
                `}>
                  {isCompleted ? (
                    <Icon name="Check" size={16} />
                  ) : (
                    <span className="text-xs font-semibold">{index + 1}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`
                    font-medium text-sm truncate
                    ${isActive ? 'text-primary' : isCompleted ? 'text-success' : 'text-text-primary'}
                  `}>
                    {exercise?.name}
                  </div>
                  <div className="text-xs text-text-secondary">
                    {exercise?.targetReps} reps • {exercise?.duration}s
                  </div>
                </div>
                {isActive && (
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TestProgress;