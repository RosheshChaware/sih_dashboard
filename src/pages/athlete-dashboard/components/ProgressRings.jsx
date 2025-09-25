import React from 'react';
import { motion } from 'framer-motion';

const ProgressRings = ({ progressData }) => {
  const CircularProgress = ({ percentage, size = 120, strokeWidth = 8, color, label, value, unit }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="flex flex-col items-center">
        <div className="relative">
          <svg width={size} height={size} className="transform -rotate-90">
            {/* Background circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth={strokeWidth}
              fill="none"
            />
            {/* Progress circle */}
            <motion.circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={color}
              strokeWidth={strokeWidth}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={strokeDasharray}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 2, ease: "easeInOut" }}
              style={{
                filter: `drop-shadow(0 0 8px ${color}40)`
              }}
            />
          </svg>
          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-white">{value}</span>
            <span className="text-xs text-gray-400">{unit}</span>
          </div>
        </div>
        <div className="mt-3 text-center">
          <p className="text-sm font-medium text-white">{label}</p>
          <p className="text-xs text-gray-400">{percentage}% Complete</p>
        </div>
      </div>
    );
  };

  return (
    <div className="glass rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-6">Performance Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {progressData?.map((item, index) => (
          <motion.div
            key={item?.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <CircularProgress
              percentage={item?.percentage}
              color={item?.color}
              label={item?.label}
              value={item?.value}
              unit={item?.unit}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProgressRings;