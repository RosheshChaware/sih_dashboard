import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecommendationsPanel = ({ recommendations }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedCard, setExpandedCard] = useState(null);

  const categories = [
    { id: 'all', label: 'All Recommendations', icon: 'List' },
    { id: 'technique', label: 'Technique', icon: 'Target' },
    { id: 'fitness', label: 'Fitness', icon: 'Activity' },
    { id: 'mental', label: 'Mental', icon: 'Brain' },
    { id: 'equipment', label: 'Equipment', icon: 'Settings' }
  ];

  const filteredRecommendations = selectedCategory === 'all' 
    ? recommendations 
    : recommendations?.filter(rec => rec?.category === selectedCategory);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-text-secondary';
    }
  };

  const getPriorityBg = (priority) => {
    switch (priority) {
      case 'high': return 'bg-error/10 border-error/20';
      case 'medium': return 'bg-warning/10 border-warning/20';
      case 'low': return 'bg-success/10 border-success/20';
      default: return 'bg-surface border-border';
    }
  };

  return (
    <div className="glass rounded-xl p-6 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-text-primary">AI Recommendations</h2>
        <div className="flex items-center gap-2">
          <Icon name="Sparkles" size={20} className="text-primary" />
          <span className="text-sm text-text-secondary">Powered by AI Analysis</span>
        </div>
      </div>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories?.map((category) => (
          <Button
            key={category?.id}
            variant={selectedCategory === category?.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category?.id)}
            iconName={category?.icon}
            iconPosition="left"
            className="transition-all duration-200"
          >
            {category?.label}
          </Button>
        ))}
      </div>
      {/* Recommendations Grid */}
      <div className="grid gap-4">
        {filteredRecommendations?.map((recommendation, index) => (
          <div
            key={index}
            className={`rounded-lg border transition-all duration-300 hover:shadow-lg ${getPriorityBg(recommendation?.priority)}`}
          >
            <div
              className="p-4 cursor-pointer"
              onClick={() => setExpandedCard(expandedCard === index ? null : index)}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${recommendation?.color || 'bg-primary'}`}>
                    <Icon name={recommendation?.icon} size={20} className="text-background" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-text-primary">{recommendation?.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(recommendation?.priority)}`}>
                        {recommendation?.priority?.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-text-secondary text-sm">{recommendation?.description}</p>
                  </div>
                </div>
                
                <Icon 
                  name={expandedCard === index ? "ChevronUp" : "ChevronDown"} 
                  size={20} 
                  className="text-text-secondary" 
                />
              </div>
            </div>
            
            {expandedCard === index && (
              <div className="px-4 pb-4 border-t border-border/50">
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  {/* Action Steps */}
                  <div>
                    <h4 className="font-semibold text-text-primary mb-3 flex items-center gap-2">
                      <Icon name="CheckSquare" size={16} className="text-primary" />
                      Action Steps
                    </h4>
                    <div className="space-y-2">
                      {recommendation?.actionSteps?.map((step, stepIndex) => (
                        <div key={stepIndex} className="flex items-start gap-2">
                          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs font-medium text-primary">{stepIndex + 1}</span>
                          </div>
                          <span className="text-sm text-text-secondary">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Resources */}
                  <div>
                    <h4 className="font-semibold text-text-primary mb-3 flex items-center gap-2">
                      <Icon name="BookOpen" size={16} className="text-accent" />
                      Resources
                    </h4>
                    <div className="space-y-2">
                      {recommendation?.resources?.map((resource, resourceIndex) => (
                        <div key={resourceIndex} className="flex items-center gap-2">
                          <Icon name="ExternalLink" size={14} className="text-accent" />
                          <a 
                            href={resource?.url} 
                            className="text-sm text-accent hover:text-accent/80 transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {resource?.title}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Expected Timeline */}
                <div className="mt-4 pt-4 border-t border-border/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon name="Clock" size={16} className="text-text-secondary" />
                      <span className="text-sm text-text-secondary">Expected improvement timeline</span>
                    </div>
                    <span className="text-sm font-medium text-text-primary">{recommendation?.timeline}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {filteredRecommendations?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Search" size={48} className="mx-auto mb-4 text-text-secondary opacity-50" />
          <p className="text-text-secondary">No recommendations found for the selected category.</p>
        </div>
      )}
    </div>
  );
};

export default RecommendationsPanel;