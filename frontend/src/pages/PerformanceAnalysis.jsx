import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const PerformanceAnalysis = () => {
  const { classes } = useTheme();
  
  return (
    <div className={`min-h-screen py-8 ${classes.bgGradient}`}>
      <div className="max-w-7xl mx-auto px-4 space-y-6">
        <div className={`${classes.bgElevated} rounded-xl shadow-soft p-6 border ${classes.borderPrimary}`}>
          <h1 className={`text-3xl font-bold ${classes.textPrimary} mb-2`}>
            Performance Analysis
          </h1>
          <p className={classes.textSecondary}>
            Compare algorithm performance and analyze complexity
          </p>
        </div>
        
        <div className={`${classes.bgElevated} rounded-xl shadow-soft p-6 border ${classes.borderPrimary}`}>
          <p className={classes.textSecondary}>Performance analysis coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default PerformanceAnalysis;
