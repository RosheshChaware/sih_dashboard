import React from 'react';
import Icon from '../../../components/AppIcon';

const ExercisePanel = ({ 
  currentExercise, 
  progress, 
  instructions, 
  techniqueScore,
  targetReps,
  completedReps 
}) => {
  const progressPercentage = (completedReps / targetReps) * 100;

  const getTechniqueColor = () => {
    if (techniqueScore >= 85) return 'text-success';
    if (techniqueScore >= 70) return 'text-warning';
    return 'text-error';
  };

  const getTechniqueLabel = () => {
    if (techniqueScore >= 85) return 'Excellent Form';
    if (techniqueScore >= 70) return 'Good Form';
    return 'Form Needs Work';
  };

  return (
    <div className="h-full flex flex-col space-y-6">
      {/* Exercise Header */}
      <div className="glass rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <Icon name="Activity" size={24} className="text-background" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-text-primary">{currentExercise?.name}</h2>
            <p className="text-text-secondary">{currentExercise?.category}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-text-primary">Progress</span>
            <span className="text-sm text-text-secondary">{completedReps}/{targetReps} reps</span>
          </div>
          <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500 ease-out rounded-full"
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            />
          </div>
        </div>

        {/* Technique Score */}
        <div className="flex items-center justify-between p-3 bg-surface/50 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="Target" size={20} className={getTechniqueColor()} />
            <span className="text-sm font-medium text-text-primary">Technique</span>
          </div>
          <div className="text-right">
            <div className={`text-lg font-bold ${getTechniqueColor()}`}>
              {techniqueScore}%
            </div>
            <div className="text-xs text-text-secondary">
              {getTechniqueLabel()}
            </div>
          </div>
        </div>
      </div>
      {/* Instructions */}
      <div className="glass rounded-xl p-6 flex-1">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
          <Icon name="BookOpen" size={20} className="mr-2 text-primary" />
          Instructions
        </h3>
        <div className="space-y-4">
          {instructions?.map((instruction, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-semibold text-primary">{index + 1}</span>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed">{instruction}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Key Points */}
      <div className="glass rounded-xl p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
          <Icon name="Lightbulb" size={20} className="mr-2 text-accent" />
          Key Points
        </h3>
        <div className="space-y-3">
          {currentExercise?.keyPoints?.map((point, index) => (
            <div key={index} className="flex items-center space-x-3">
              <Icon name="CheckCircle" size={16} className="text-accent flex-shrink-0" />
              <span className="text-text-secondary text-sm">{point}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Common Mistakes */}
      <div className="glass rounded-xl p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
          <Icon name="AlertTriangle" size={20} className="mr-2 text-warning" />
          Avoid These Mistakes
        </h3>
        <div className="space-y-3">
          {currentExercise?.commonMistakes?.map((mistake, index) => (
            <div key={index} className="flex items-center space-x-3">
              <Icon name="X" size={16} className="text-error flex-shrink-0" />
              <span className="text-text-secondary text-sm">{mistake}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExercisePanel;