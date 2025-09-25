import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PerformanceCharts = ({ performanceData, skillData, comparisonData }) => {
  const [activeChart, setActiveChart] = useState('performance');

  const chartTypes = [
    { id: 'performance', label: 'Performance Trend', icon: 'TrendingUp' },
    { id: 'skills', label: 'Skill Analysis', icon: 'BarChart3' },
    { id: 'comparison', label: 'Peer Comparison', icon: 'Users' }
  ];

  const COLORS = ['#00D4FF', '#00FF88', '#FF8C00', '#FF3366', '#9D4EDD'];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="glass rounded-lg p-3 border border-border">
          <p className="text-text-primary font-medium">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {entry?.name}: {entry?.value}
              {entry?.name?.includes('Score') || entry?.name?.includes('Performance') ? '%' : ''}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    switch (activeChart) {
      case 'performance':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="month" 
                stroke="#B3B3B3" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#B3B3B3" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
                domain={[0, 100]}
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
                dataKey="physicalScore" 
                stroke="#00FF88" 
                strokeWidth={2}
                dot={{ fill: '#00FF88', strokeWidth: 2, r: 3 }}
                name="Physical Score"
              />
              <Line 
                type="monotone" 
                dataKey="technicalScore" 
                stroke="#FF8C00" 
                strokeWidth={2}
                dot={{ fill: '#FF8C00', strokeWidth: 2, r: 3 }}
                name="Technical Score"
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'skills':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={skillData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="skill" 
                stroke="#B3B3B3" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                stroke="#B3B3B3" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
                domain={[0, 100]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="current" 
                fill="url(#skillGradient)" 
                radius={[4, 4, 0, 0]}
                name="Current Level"
              />
              <Bar 
                dataKey="potential" 
                fill="rgba(0, 212, 255, 0.3)" 
                radius={[4, 4, 0, 0]}
                name="Potential Level"
              />
              <defs>
                <linearGradient id="skillGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00D4FF" />
                  <stop offset="100%" stopColor="#00FF88" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        );

      case 'comparison':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={comparisonData?.ageGroup}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {comparisonData?.ageGroup?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS?.[index % COLORS?.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col justify-center space-y-3">
              <h4 className="text-sm font-semibold text-text-primary mb-2">Age Group Performance</h4>
              {comparisonData?.ageGroup?.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS?.[index % COLORS?.length] }}
                  />
                  <span className="text-sm text-text-secondary flex-1">{item?.name}</span>
                  <span className="text-sm font-medium text-text-primary">{item?.value}%</span>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="glass rounded-xl p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-bold text-text-primary">Performance Analytics</h2>
        <div className="flex flex-wrap gap-2">
          {chartTypes?.map((chart) => (
            <Button
              key={chart?.id}
              variant={activeChart === chart?.id ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveChart(chart?.id)}
              iconName={chart?.icon}
              iconPosition="left"
              className="text-xs"
            >
              {chart?.label}
            </Button>
          ))}
        </div>
      </div>
      <div className="bg-surface/30 rounded-lg p-4">
        {renderChart()}
      </div>
      {/* Performance Insights */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-surface/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="TrendingUp" size={16} className="text-accent" />
            <h4 className="text-sm font-semibold text-text-primary">Improvement</h4>
          </div>
          <p className="text-lg font-bold text-accent">+12.5%</p>
          <p className="text-xs text-text-secondary">vs last month</p>
        </div>

        <div className="bg-surface/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Target" size={16} className="text-primary" />
            <h4 className="text-sm font-semibold text-text-primary">Consistency</h4>
          </div>
          <p className="text-lg font-bold text-primary">87.3%</p>
          <p className="text-xs text-text-secondary">performance stability</p>
        </div>

        <div className="bg-surface/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Award" size={16} className="text-warning" />
            <h4 className="text-sm font-semibold text-text-primary">Peak Score</h4>
          </div>
          <p className="text-lg font-bold text-warning">94.2%</p>
          <p className="text-xs text-text-secondary">personal best</p>
        </div>
      </div>
    </div>
  );
};

export default PerformanceCharts;