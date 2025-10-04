import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext'; // Use the project's theme system
import { Play, RotateCcw, Text, Hash } from 'lucide-react';

const StringVisualizer = () => {
  const { classes } = useTheme(); // Get the theme classes
  const [text, setText] = useState('ababcabcabababd');
  const [pattern, setPattern] = useState('abababd');

  const handleVisualize = () => console.log('Visualize clicked!', { text, pattern });
  const handleReset = () => {
    setText('');
    setPattern('');
    console.log('Reset clicked!');
  };

  return (
    // Use the theme's background class
    <div className={`w-full min-h-screen ${classes.bgPrimary} p-4 sm:p-8`}>
      {/* Spacer div */}
      <div className="h-24"></div>

      {/* 1. Gradient Header Card */}
      <div className="max-w-7xl mx-auto p-6 mb-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold text-white tracking-tight">
          String Algorithm Visualizer
        </h1>
        <p className="mt-2 text-blue-100">
          Visualize pattern matching and string processing algorithms with ease.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* 2. Left Column: Inputs & Controls Card */}
        <div className="lg:col-span-1">
          <div className={`${classes.cardBg} p-6 rounded-xl shadow-md border ${classes.border}`}>
            <h2 className={`text-xl font-bold ${classes.textPrimary} mb-6 flex items-center gap-2`}>
              <Text size={22} className="text-indigo-500" />
              Inputs & Controls
            </h2>

            <div className="mb-4">
              <label htmlFor="main-text" className={`block text-sm font-medium ${classes.textSecondary} mb-2`}>
                Main Text (Haystack)
              </label>
              <input
                id="main-text"
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className={`w-full p-3 ${classes.inputBg} ${classes.textPrimary} placeholder-slate-400 rounded-lg border ${classes.border} focus:outline-none focus:ring-2 focus:ring-indigo-500 transition`}
                placeholder="Enter text..."
              />
            </div>

            <div className="mb-6">
              <label htmlFor="pattern-text" className={`block text-sm font-medium ${classes.textSecondary} mb-2`}>
                Pattern to Find (Needle)
              </label>
              <input
                id="pattern-text"
                type="text"
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                className={`w-full p-3 ${classes.inputBg} ${classes.textPrimary} placeholder-slate-400 rounded-lg border ${classes.border} focus:outline-none focus:ring-2 focus:ring-indigo-500 transition`}
                placeholder="Enter pattern..."
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleVisualize}
                className="flex flex-1 items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-transform transform hover:scale-105 shadow-md"
              >
                <Play size={20} />
                Visualize
              </button>
              <button
                onClick={handleReset}
                className="flex flex-1 items-center justify-center gap-2 bg-slate-500 hover:bg-slate-600 text-white font-semibold py-3 px-4 rounded-lg transition-transform transform hover:scale-105 shadow-md"
              >
                <RotateCcw size={20} />
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* 3. Right Column: Display Area Card */}
        <div className="lg:col-span-2">
          <div className={`${classes.cardBg} p-6 rounded-xl shadow-md border ${classes.border} min-h-[300px]`}>
            <h2 className={`text-xl font-bold ${classes.textPrimary} mb-6 flex items-center gap-2`}>
              <Hash size={22} className="text-indigo-500" />
              Visualization
            </h2>

            <div className="mb-6">
              <h3 className={`text-md font-semibold mb-3 ${classes.textSecondary}`}>Text</h3>
              <div className={`flex flex-wrap gap-1 p-3 ${classes.inputBg} rounded-lg`}>
                {text.split('').map((char, index) => (
                  <div key={`text-${index}`} className="flex flex-col items-center">
                    <div className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 ${classes.cardBg} border ${classes.border} rounded-md text-lg font-mono ${classes.textPrimary}`}>
                      {char}
                    </div>
                    <span className={`text-xs ${classes.textMuted} mt-1`}>{index}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className={`text-md font-semibold mb-3 ${classes.textSecondary}`}>Pattern</h3>
              <div className={`flex flex-wrap gap-1 p-3 ${classes.inputBg} rounded-lg`}>
                {pattern.split('').map((char, index) => (
                  <div key={`pattern-${index}`} className="flex flex-col items-center">
                    <div className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 ${classes.cardBg} border ${classes.border} rounded-md text-lg font-mono ${classes.textPrimary}`}>
                      {char}
                    </div>
                    <span className={`text-xs ${classes.textMuted} mt-1`}>{index}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StringVisualizer;