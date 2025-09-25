import React from 'react';
import Icon from '../../../components/AppIcon';

const PerformanceScore = ({ score, previousScore, achievements }) => {
  const scorePercentage = (score / 100) * 100;
  const improvement = score - previousScore;
  
  return (
    <div className="glass rounded-xl p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Overall Score */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-text-primary mb-4">Overall Performance</h2>
          <div className="flex items-center gap-6">
            <div className="relative w-32 h-32">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="rgba(255, 255, 255, 0.1)"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="url(#scoreGradient)"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${scorePercentage * 3.14} 314`}
                  className="transition-all duration-1000 ease-out"
                />
                <defs>
                  <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#00D4FF" />
                    <stop offset="100%" stopColor="#00FF88" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-text-primary">{score}</div>
                  <div className="text-sm text-text-secondary">/ 100</div>
                </div>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Icon 
                  name={improvement >= 0 ? "TrendingUp" : "TrendingDown"} 
                  size={20} 
                  className={improvement >= 0 ? "text-success" : "text-error"} 
                />
                <span className={`font-semibold ${improvement >= 0 ? "text-success" : "text-error"}`}>
                  {improvement >= 0 ? "+" : ""}{improvement} points
                </span>
              </div>
              <p className="text-text-secondary">
                {improvement >= 0 ? "Improved" : "Decreased"} from previous assessment
              </p>
              <div className="mt-3">
                <div className="text-sm text-text-secondary mb-1">Previous Score</div>
                <div className="text-lg font-semibold text-text-primary">{previousScore}/100</div>
              </div>
            </div>
          </div>
        </div>

        {/* Achievement Badges */}
        <div className="lg:w-80">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Achievements Earned</h3>
          <div className="grid grid-cols-3 gap-3">
            {achievements?.map((achievement, index) => (
              <div
                key={index}
                className="group relative bg-surface rounded-lg p-3 text-center hover:bg-primary/10 transition-all duration-300 cursor-pointer"
              >
                <div className={`w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center ${achievement?.color} glow-primary`}>
                  <Icon name={achievement?.icon} size={24} className="text-background" />
                </div>
                <div className="text-xs font-medium text-text-primary">{achievement?.name}</div>
                
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-popover text-popover-foreground text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                  {achievement?.description}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-popover"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceScore;