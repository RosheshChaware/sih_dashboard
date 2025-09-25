import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PerformanceTrends = ({ trendData, comparisonData }) => {
  const [activeTab, setActiveTab] = useState('trends');
  const [timeRange, setTimeRange] = useState('3months');

  const timeRanges = [
    { id: '1month', label: '1M', data: trendData?.slice(-4) },
    { id: '3months', label: '3M', data: trendData?.slice(-12) },
    { id: '6months', label: '6M', data: trendData?.slice(-24) },
    { id: '1year', label: '1Y', data: trendData }
  ];

  const currentData = timeRanges?.find(range => range?.id === timeRange)?.data || trendData;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="glass rounded-lg p-3 border border-border">
          <p className="text-text-primary font-medium">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {entry?.name}: {entry?.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass rounded-xl p-6 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-text-primary">Performance Analytics</h2>
        
        <div className="flex items-center gap-2">
          <Button
            variant={activeTab === 'trends' ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab('trends')}
            iconName="TrendingUp"
            iconPosition="left"
          >
            Trends
          </Button>
          <Button
            variant={activeTab === 'comparison' ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab('comparison')}
            iconName="BarChart3"
            iconPosition="left"
          >
            Comparison
          </Button>
        </div>
      </div>
      {activeTab === 'trends' && (
        <>
          {/* Time Range Selector */}
          <div className="flex items-center gap-2 mb-6">
            <span className="text-sm text-text-secondary mr-2">Time Range:</span>
            {timeRanges?.map((range) => (
              <Button
                key={range?.id}
                variant={timeRange === range?.id ? "default" : "outline"}
                size="xs"
                onClick={() => setTimeRange(range?.id)}
              >
                {range?.label}
              </Button>
            ))}
          </div>

          {/* Trend Chart */}
          <div className="h-80 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={currentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                <XAxis 
                  dataKey="date" 
                  stroke="#B3B3B3"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#B3B3B3"
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="overallScore" 
                  stroke="#00D4FF" 
                  strokeWidth={3}
                  dot={{ fill: '#00D4FF', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#00D4FF', strokeWidth: 2 }}
                  name="Overall Score"
                />
                <Line 
                  type="monotone" 
                  dataKey="speed" 
                  stroke="#00FF88" 
                  strokeWidth={2}
                  dot={{ fill: '#00FF88', strokeWidth: 2, r: 3 }}
                  name="Speed"
                />
                <Line 
                  type="monotone" 
                  dataKey="accuracy" 
                  stroke="#FF8C00" 
                  strokeWidth={2}
                  dot={{ fill: '#FF8C00', strokeWidth: 2, r: 3 }}
                  name="Accuracy"
                />
                <Line 
                  type="monotone" 
                  dataKey="consistency" 
                  stroke="#FF3366" 
                  strokeWidth={2}
                  dot={{ fill: '#FF3366', strokeWidth: 2, r: 3 }}
                  name="Consistency"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Performance Insights */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-surface rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <Icon name="TrendingUp" size={20} className="text-success" />
                <span className="font-semibold text-text-primary">Best Improvement</span>
              </div>
              <p className="text-2xl font-bold text-success mb-1">+15 points</p>
              <p className="text-sm text-text-secondary">Speed performance over 3 months</p>
            </div>
            
            <div className="bg-surface rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <Icon name="Target" size={20} className="text-primary" />
                <span className="font-semibold text-text-primary">Most Consistent</span>
              </div>
              <p className="text-2xl font-bold text-primary mb-1">Accuracy</p>
              <p className="text-sm text-text-secondary">Lowest variance in performance</p>
            </div>
            
            <div className="bg-surface rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <Icon name="AlertTriangle" size={20} className="text-warning" />
                <span className="font-semibold text-text-primary">Focus Area</span>
              </div>
              <p className="text-2xl font-bold text-warning mb-1">Consistency</p>
              <p className="text-sm text-text-secondary">Needs attention for improvement</p>
            </div>
          </div>
        </>
      )}
      {activeTab === 'comparison' && (
        <>
          <div className="mb-4">
            <p className="text-text-secondary">Compare your performance with athletes in your category</p>
          </div>
          
          {/* Comparison Chart */}
          <div className="h-80 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                <XAxis 
                  dataKey="metric" 
                  stroke="#B3B3B3"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#B3B3B3"
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="yourScore" 
                  fill="#00D4FF" 
                  name="Your Score"
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="averageScore" 
                  fill="#B3B3B3" 
                  name="Category Average"
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="topScore" 
                  fill="#00FF88" 
                  name="Top 10%"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Comparison Stats */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-surface rounded-lg p-4">
              <h4 className="font-semibold text-text-primary mb-3">Your Ranking</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Overall Rank</span>
                  <span className="font-bold text-primary">#23 of 156</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Percentile</span>
                  <span className="font-bold text-success">85th</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Category</span>
                  <span className="font-bold text-text-primary">Advanced</span>
                </div>
              </div>
            </div>
            
            <div className="bg-surface rounded-lg p-4">
              <h4 className="font-semibold text-text-primary mb-3">Strengths vs Peers</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Speed</span>
                  <span className="font-bold text-success">+12% above avg</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Accuracy</span>
                  <span className="font-bold text-success">+8% above avg</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Consistency</span>
                  <span className="font-bold text-warning">-3% below avg</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PerformanceTrends;