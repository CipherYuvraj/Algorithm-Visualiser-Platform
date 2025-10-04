import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const DPVisualizer = () => {
  const { classes, getThemedGradient } = useTheme();
  const [algorithm, setAlgorithm] = useState('lcs');
  
  return (
    <div className={`min-h-screen transition-all duration-500 py-8 ${classes.bgGradient}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className={`${classes.cardBg} border rounded-xl shadow-soft p-6`}>
          <h1 className={`text-3xl font-bold ${classes.textPrimary} mb-2`}>
            Dynamic Programming Visualizer
          </h1>
          <p className={classes.textSecondary}>
            Visualize dynamic programming algorithms and optimization problems
          </p>
        </div>
        
        <div className={`${classes.cardBg} border rounded-xl shadow-soft p-6`}>
          <p className={classes.textSecondary}>DP visualizer coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default DPVisualizer;
