import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AchievementTimeline = ({ achievements, milestones }) => {
  const [filter, setFilter] = useState('all');
  const [expandedItems, setExpandedItems] = useState(new Set());

  const filterOptions = [
    { id: 'all', label: 'All', icon: 'List' },
    { id: 'achievements', label: 'Achievements', icon: 'Award' },
    { id: 'milestones', label: 'Milestones', icon: 'Flag' },
    { id: 'recent', label: 'Recent', icon: 'Clock' }
  ];

  const toggleExpanded = (id) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded?.has(id)) {
      newExpanded?.delete(id);
    } else {
      newExpanded?.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const getFilteredItems = () => {
    const allItems = [
      ...achievements?.map(item => ({ ...item, type: 'achievement' })),
      ...milestones?.map(item => ({ ...item, type: 'milestone' }))
    ]?.sort((a, b) => new Date(b.date) - new Date(a.date));

    switch (filter) {
      case 'achievements':
        return allItems?.filter(item => item?.type === 'achievement');
      case 'milestones':
        return allItems?.filter(item => item?.type === 'milestone');
      case 'recent':
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo?.setDate(thirtyDaysAgo?.getDate() - 30);
        return allItems?.filter(item => new Date(item.date) >= thirtyDaysAgo);
      default:
        return allItems;
    }
  };

  const getItemIcon = (item) => {
    if (item?.type === 'achievement') {
      switch (item?.category) {
        case 'performance': return 'Trophy';
        case 'skill': return 'Target';
        case 'endurance': return 'Heart';
        case 'strength': return 'Dumbbell';
        case 'speed': return 'Zap';
        default: return 'Award';
      }
    } else {
      switch (item?.category) {
        case 'training': return 'Calendar';
        case 'competition': return 'Flag';
        case 'assessment': return 'BarChart3';
        case 'certification': return 'Certificate';
        default: return 'Milestone';
      }
    }
  };

  const getItemColor = (item) => {
    if (item?.type === 'achievement') {
      switch (item?.importance) {
        case 'high': return 'text-warning border-warning/30 bg-warning/10';
        case 'medium': return 'text-primary border-primary/30 bg-primary/10';
        case 'low': return 'text-accent border-accent/30 bg-accent/10';
        default: return 'text-text-secondary border-border bg-surface/50';
      }
    } else {
      return 'text-primary border-primary/30 bg-primary/10';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const filteredItems = getFilteredItems();

  return (
    <div className="glass rounded-xl p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-bold text-text-primary">Achievement Timeline</h2>
        <div className="flex flex-wrap gap-2">
          {filterOptions?.map((option) => (
            <Button
              key={option?.id}
              variant={filter === option?.id ? "default" : "ghost"}
              size="sm"
              onClick={() => setFilter(option?.id)}
              iconName={option?.icon}
              iconPosition="left"
              className="text-xs"
            >
              {option?.label}
            </Button>
          ))}
        </div>
      </div>
      {/* Timeline */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-warning opacity-30" />

        <div className="space-y-6">
          {filteredItems?.map((item, index) => (
            <div key={item?.id} className="relative flex gap-4">
              {/* Timeline Node */}
              <div className={`flex-shrink-0 w-12 h-12 rounded-full border-2 flex items-center justify-center z-10 ${getItemColor(item)}`}>
                <Icon name={getItemIcon(item)} size={20} />
              </div>

              {/* Content */}
              <div className="flex-1 pb-6">
                <div className={`rounded-lg border p-4 transition-all duration-200 hover:shadow-lg ${getItemColor(item)}`}>
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-text-primary">{item?.title}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${
                          item?.type === 'achievement' ? 'bg-warning/20 text-warning' : 'bg-primary/20 text-primary'
                        }`}>
                          {item?.type}
                        </span>
                      </div>
                      <p className="text-sm text-text-secondary">{item?.description}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-xs text-text-secondary">{formatDate(item?.date)}</p>
                      {item?.score && (
                        <p className="text-sm font-bold text-primary">{item?.score}%</p>
                      )}
                    </div>
                  </div>

                  {/* Details */}
                  {item?.details && (
                    <div className="mt-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleExpanded(item?.id)}
                        iconName={expandedItems?.has(item?.id) ? "ChevronUp" : "ChevronDown"}
                        iconPosition="right"
                        className="text-xs text-text-secondary hover:text-text-primary"
                      >
                        {expandedItems?.has(item?.id) ? 'Show Less' : 'Show Details'}
                      </Button>
                      
                      {expandedItems?.has(item?.id) && (
                        <div className="mt-3 pt-3 border-t border-border/50">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                            {item?.details?.map((detail, detailIndex) => (
                              <div key={detailIndex} className="flex items-center gap-2">
                                <Icon name="CheckCircle2" size={12} className="text-accent" />
                                <span className="text-text-secondary">{detail}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Tags */}
                  {item?.tags && item?.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {item?.tags?.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-surface/50 rounded-full text-xs text-text-secondary"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Impact Score */}
                  {item?.impact && (
                    <div className="mt-3 pt-3 border-t border-border/50">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-text-secondary">Impact on Performance:</span>
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-muted rounded-full h-1">
                            <div 
                              className="bg-accent h-1 rounded-full transition-all duration-1000"
                              style={{ width: `${item?.impact}%` }}
                            />
                          </div>
                          <span className="text-xs font-semibold text-accent">+{item?.impact}%</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Empty State */}
      {filteredItems?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Calendar" size={48} className="mx-auto mb-4 text-text-secondary opacity-50" />
          <h3 className="text-lg font-semibold text-text-primary mb-2">No items found</h3>
          <p className="text-text-secondary mb-4">
            {filter === 'all' 
              ? "No achievements or milestones recorded yet." 
              : `No ${filter} found for the selected filter.`}
          </p>
        </div>
      )}
      {/* Summary Stats */}
      <div className="mt-8 pt-6 border-t border-border">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-warning">{achievements?.length}</p>
            <p className="text-xs text-text-secondary">Achievements</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{milestones?.length}</p>
            <p className="text-xs text-text-secondary">Milestones</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-accent">
              {achievements?.filter(a => a?.importance === 'high')?.length}
            </p>
            <p className="text-xs text-text-secondary">Major Wins</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-text-primary">
              {filteredItems?.filter(item => {
                const thirtyDaysAgo = new Date();
                thirtyDaysAgo?.setDate(thirtyDaysAgo?.getDate() - 30);
                return new Date(item.date) >= thirtyDaysAgo;
              })?.length}
            </p>
            <p className="text-xs text-text-secondary">This Month</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementTimeline;