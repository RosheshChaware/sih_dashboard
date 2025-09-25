import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const PerformanceChart = ({ data, type = 'bar', title }) => {
  const COLORS = ['#00D4FF', '#00FF88', '#FF8C00', '#FF3366', '#9D4EDD'];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="glass rounded-lg p-3 border border-border">
          <p className="text-text-primary font-medium">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {`${entry?.dataKey}: ${entry?.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderBarChart = () => (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
        <XAxis 
          dataKey="name" 
          stroke="#B3B3B3" 
          fontSize={12}
          tick={{ fill: '#B3B3B3' }}
        />
        <YAxis 
          stroke="#B3B3B3" 
          fontSize={12}
          tick={{ fill: '#B3B3B3' }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar 
          dataKey="value" 
          fill="#00D4FF" 
          radius={[4, 4, 0, 0]}
          className="hover:opacity-80 transition-opacity"
        />
      </BarChart>
    </ResponsiveContainer>
  );

  const renderPieChart = () => (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100)?.toFixed(0)}%`}
        >
          {data?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS?.[index % COLORS?.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </ResponsiveContainer>
  );

  return (
    <div className="glass rounded-lg p-6 h-full">
      <h3 className="text-lg font-semibold text-text-primary mb-4">{title}</h3>
      <div className="h-64">
        {type === 'bar' ? renderBarChart() : renderPieChart()}
      </div>
    </div>
  );
};

export default PerformanceChart;