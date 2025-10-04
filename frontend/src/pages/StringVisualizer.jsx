import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const StringVisualizer = () => {
  const { classes, getThemedGradient } = useTheme();
  const [algorithm, setAlgorithm] = useState('kmp');
  
  return (
    <div className={`min-h-screen transition-all duration-500 py-8 ${classes.bgGradient}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className={`${classes.cardBg} border rounded-xl shadow-soft p-6`}>
          <h1 className={`text-3xl font-bold ${classes.textPrimary} mb-2`}>
            String Algorithm Visualizer
          </h1>
          <p className={classes.textSecondary}>
            Visualize pattern matching and string processing algorithms
          </p>
        </div>
        
        <div className={`${classes.cardBg} border rounded-xl shadow-soft p-6`}>
          <p className={classes.textSecondary}>String visualizer coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default StringVisualizer;
