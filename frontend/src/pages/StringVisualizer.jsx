import React, { useState } from 'react';
// STEP 1: Add 'BookOpen' to the import list
import { Play, RotateCcw, Text, Hash, BookOpen } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const StringVisualizer = () => {
  const { isDark } = useTheme();
  const [text, setText] = useState('ababcabcabababd');
  const [pattern, setPattern] = useState('abababd');

  // STEP 2: Add the new state for the explanation text
  const [showDetailedLog, setShowDetailedLog] = useState(false);
  const [explanation, setExplanation] = useState({
    operation: 'Ready to start.',
    details: 'Enter text and a pattern, then click Visualize to begin the process.',
    algorithmInfo: 'The Naive (or Brute-Force) search algorithm checks for a match at every possible position in the text.'
  });

  const handleVisualize = () => console.log('Visualize clicked!', { text, pattern });
  const handleReset = () => {
    setText('');
    setPattern('');
    console.log('Reset clicked!');
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 p-4 sm:p-8">
      {/* Spacer to push content down from the main site navigation */}
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

        {/* 2. Left Column: Contains both cards now */}
        <div className="lg:col-span-1 space-y-8">
          {/* Inputs & Controls Card */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Text size={22} className="text-indigo-500" />
              Inputs & Controls
            </h2>
            <div className="mb-4">
              <label htmlFor="main-text" className="block text-sm font-medium text-slate-600 mb-2">
                Main Text (Haystack)
              </label>
              <input
                id="main-text"
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full p-3 bg-slate-100 text-slate-800 placeholder-slate-400 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                placeholder="Enter text..."
              />
            </div>
            <div className="mb-6">
              <label htmlFor="pattern-text" className="block text-sm font-medium text-slate-600 mb-2">
                Pattern to Find (Needle)
              </label>
              <input
                id="pattern-text"
                type="text"
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                className="w-full p-3 bg-slate-100 text-slate-800 placeholder-slate-400 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
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

          {/* Step Explanation Card */}
          <div className={`backdrop-blur-xl rounded-2xl shadow-2xl border overflow-hidden ${isDark ? 'bg-gray-800/20 border-gray-700/50' : 'bg-white/20 border-white/50'}`}>
            <div className={`p-4 border-b ${isDark ? 'border-gray-700/50' : 'border-white/50'}`}>
              <div className="flex justify-between items-center">
                <h4 className={`text-lg font-bold flex items-center ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  <BookOpen className="h-5 w-5 mr-2 text-purple-500" />
                  Step Explanation
                </h4>
                <button
                  onClick={() => setShowDetailedLog(!showDetailedLog)}
                  className={`text-sm px-3 py-1 rounded transition-colors ${isDark ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'}`}
                >
                  {showDetailedLog ? 'Hide Log' : 'Show Log'}
                </button>
              </div>
            </div>
            <div className="p-4 space-y-4">
              <div className={`p-4 rounded-lg border-l-4 border-blue-500 ${isDark ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
                <p className={`text-sm font-medium mb-1 ${isDark ? 'text-white' : 'text-gray-800'}`}>Current Operation:</p>
                <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{explanation.operation}</p>
              </div>
              <div className={`p-4 rounded-lg border-l-4 border-purple-500 ${isDark ? 'bg-purple-900/20' : 'bg-purple-50'}`}>
                <p className={`text-sm font-medium mb-1 ${isDark ? 'text-white' : 'text-gray-800'}`}>What's Happening:</p>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{explanation.details}</p>
              </div>
              <div className={`p-4 rounded-lg border-l-4 border-green-500 bg-green-50`}>
                <p className={`text-sm font-medium mb-1 text-slate-800`}>
                  Algorithm Info:
                </p>
                <p className={`text-sm leading-relaxed text-slate-700`}>
                  {explanation.algorithmInfo}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Right Column: Display Area Card */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200 min-h-[300px]">
            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Hash size={22} className="text-indigo-500" />
              Visualization
            </h2>
            <div className="mb-6">
              <h3 className="text-md font-semibold mb-3 text-slate-600">Text</h3>
              <div className="flex flex-wrap gap-1 p-3 bg-slate-100 rounded-lg">
                {text.split('').map((char, index) => (
                  <div key={`text-${index}`} className="flex flex-col items-center">
                    <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-white border border-slate-300 rounded-md text-lg font-mono text-slate-800">
                      {char}
                    </div>
                    <span className="text-xs text-slate-500 mt-1">{index}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-md font-semibold mb-3 text-slate-600">Pattern</h3>
              <div className="flex flex-wrap gap-1 p-3 bg-slate-100 rounded-lg">
                {pattern.split('').map((char, index) => (
                  <div key={`pattern-${index}`} className="flex flex-col items-center">
                    <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-white border border-slate-300 rounded-md text-lg font-mono text-slate-800">
                      {char}
                    </div>
                    <span className="text-xs text-slate-500 mt-1">{index}</span>
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