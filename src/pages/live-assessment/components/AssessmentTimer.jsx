import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const AssessmentTimer = ({ 
  isActive, 
  duration, 
  onTimeUp, 
  exerciseName,
  restTime = 0,
  isResting = false 
}) => {
  const [timeRemaining, setTimeRemaining] = useState(duration);
  const [restTimeRemaining, setRestTimeRemaining] = useState(restTime);

  useEffect(() => {
    setTimeRemaining(duration);
  }, [duration]);

  useEffect(() => {
    setRestTimeRemaining(restTime);
  }, [restTime]);

  useEffect(() => {
    let interval = null;

    if (isActive && !isResting && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(time => {
          if (time <= 1) {
            onTimeUp?.();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    } else if (isActive && isResting && restTimeRemaining > 0) {
      interval = setInterval(() => {
        setRestTimeRemaining(time => {
          if (time <= 1) {
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, isResting, timeRemaining, restTimeRemaining, onTimeUp]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const getProgressPercentage = () => {
    if (isResting) {
      return ((restTime - restTimeRemaining) / restTime) * 100;
    }
    return ((duration - timeRemaining) / duration) * 100;
  };

  const getTimeColor = () => {
    const currentTime = isResting ? restTimeRemaining : timeRemaining;
    const totalTime = isResting ? restTime : duration;
    const percentage = (currentTime / totalTime) * 100;
    
    if (percentage <= 20) return 'text-error';
    if (percentage <= 50) return 'text-warning';
    return 'text-success';
  };

  const getCircleColor = () => {
    const currentTime = isResting ? restTimeRemaining : timeRemaining;
    const totalTime = isResting ? restTime : duration;
    const percentage = (currentTime / totalTime) * 100;
    
    if (percentage <= 20) return 'stroke-error';
    if (percentage <= 50) return 'stroke-warning';
    return 'stroke-success';
  };

  return (
    <div className="glass rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary flex items-center">
          <Icon name="Clock" size={20} className="mr-2 text-primary" />
          {isResting ? 'Rest Time' : 'Exercise Timer'}
        </h3>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
          isActive 
            ? 'bg-success/20 text-success border border-success/30' :'bg-muted text-text-secondary'
        }`}>
          {isActive ? (isResting ? 'RESTING' : 'ACTIVE') : 'PAUSED'}
        </div>
      </div>

      {/* Exercise Name */}
      <div className="text-center mb-6">
        <h4 className="text-xl font-bold text-text-primary">{exerciseName}</h4>
        <p className="text-text-secondary text-sm mt-1">
          {isResting ? 'Take a break and prepare for next exercise' : 'Focus on proper form and technique'}
        </p>
      </div>

      {/* Timer Circle */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-40 h-40">
          <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 160 160">
            {/* Background circle */}
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-muted"
            />
            {/* Progress circle */}
            <circle
              cx="80"
              cy="80"
              r="70"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 70}`}
              strokeDashoffset={`${2 * Math.PI * 70 * (1 - getProgressPercentage() / 100)}`}
              className={`transition-all duration-1000 ease-linear ${getCircleColor()}`}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className={`text-4xl font-bold ${getTimeColor()}`}>
                {formatTime(isResting ? restTimeRemaining : timeRemaining)}
              </div>
              <div className="text-sm text-text-secondary mt-1">
                {isResting ? 'rest remaining' : 'time remaining'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-text-primary">
            {isResting ? 'Rest Progress' : 'Exercise Progress'}
          </span>
          <span className="text-sm text-text-secondary">
            {Math.round(getProgressPercentage())}%
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
          <div 
            className={`h-full transition-all duration-1000 ease-linear rounded-full ${
              isResting 
                ? 'bg-gradient-to-r from-accent to-primary' :'bg-gradient-to-r from-primary to-accent'
            }`}
            style={{ width: `${getProgressPercentage()}%` }}
          />
        </div>
      </div>

      {/* Time Indicators */}
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-3 bg-surface/50 rounded-lg">
          <Icon name="Play" size={16} className="text-primary mx-auto mb-1" />
          <div className="text-sm font-semibold text-text-primary">
            {formatTime(duration - timeRemaining)}
          </div>
          <div className="text-xs text-text-secondary">Elapsed</div>
        </div>
        <div className="text-center p-3 bg-surface/50 rounded-lg">
          <Icon name="Target" size={16} className="text-accent mx-auto mb-1" />
          <div className="text-sm font-semibold text-text-primary">
            {formatTime(duration)}
          </div>
          <div className="text-xs text-text-secondary">Target</div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentTimer;