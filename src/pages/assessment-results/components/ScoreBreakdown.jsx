import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ScoreBreakdown = ({ metrics, previousMetrics }) => {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  const getProgressColor = (score) => {
    if (score >= 80) return 'bg-success';
    if (score >= 60) return 'bg-warning';
    return 'bg-error';
  };

  return (
    <div className="glass rounded-xl p-6 mb-6">
      <h2 className="text-2xl font-bold text-text-primary mb-6">Detailed Score Breakdown</h2>
      <div className="space-y-4">
        {metrics?.map((metric, index) => {
          const previousMetric = previousMetrics?.find(p => p?.name === metric?.name);
          const improvement = previousMetric ? metric?.score - previousMetric?.score : 0;
          const isExpanded = expandedSection === metric?.name;
          
          return (
            <div key={index} className="bg-surface rounded-lg overflow-hidden">
              <div
                className="p-4 cursor-pointer hover:bg-surface/80 transition-colors duration-200"
                onClick={() => toggleSection(metric?.name)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${metric?.color}`}>
                      <Icon name={metric?.icon} size={24} className="text-background" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-text-primary">{metric?.name}</h3>
                        <div className="flex items-center gap-2">
                          <span className={`text-2xl font-bold ${getScoreColor(metric?.score)}`}>
                            {metric?.score}
                          </span>
                          <span className="text-text-secondary">/100</span>
                          {improvement !== 0 && (
                            <div className="flex items-center gap-1">
                              <Icon 
                                name={improvement > 0 ? "ArrowUp" : "ArrowDown"} 
                                size={16} 
                                className={improvement > 0 ? "text-success" : "text-error"} 
                              />
                              <span className={`text-sm font-medium ${improvement > 0 ? "text-success" : "text-error"}`}>
                                {Math.abs(improvement)}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-1000 ease-out ${getProgressColor(metric?.score)}`}
                          style={{ width: `${metric?.score}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <Icon 
                    name={isExpanded ? "ChevronUp" : "ChevronDown"} 
                    size={20} 
                    className="text-text-secondary ml-4" 
                  />
                </div>
              </div>
              {isExpanded && (
                <div className="px-4 pb-4 border-t border-border">
                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <h4 className="font-semibold text-text-primary mb-3">Performance Details</h4>
                      <div className="space-y-2">
                        {metric?.details?.map((detail, detailIndex) => (
                          <div key={detailIndex} className="flex justify-between items-center">
                            <span className="text-text-secondary">{detail?.label}</span>
                            <span className="font-medium text-text-primary">{detail?.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-text-primary mb-3">Improvement Areas</h4>
                      <div className="space-y-2">
                        {metric?.improvements?.map((improvement, impIndex) => (
                          <div key={impIndex} className="flex items-start gap-2">
                            <Icon name="Target" size={16} className="text-primary mt-0.5" />
                            <span className="text-sm text-text-secondary">{improvement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {previousMetric && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <h4 className="font-semibold text-text-primary mb-3">Comparison with Previous Test</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-muted rounded-lg">
                          <div className="text-sm text-text-secondary mb-1">Previous Score</div>
                          <div className="text-xl font-bold text-text-primary">{previousMetric?.score}</div>
                        </div>
                        <div className="text-center p-3 bg-muted rounded-lg">
                          <div className="text-sm text-text-secondary mb-1">Current Score</div>
                          <div className="text-xl font-bold text-text-primary">{metric?.score}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScoreBreakdown;