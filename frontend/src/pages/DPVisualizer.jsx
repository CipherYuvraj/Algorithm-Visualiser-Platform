import React, { useState } from 'react';
import { Play, RotateCcw, Puzzle, Hash } from 'lucide-react';

const DPVisualizer = () => {
  const [selectedProblem, setSelectedProblem] = useState('fibonacci');
  const [inputValue, setInputValue] = useState(8); // Example: n for Fibonacci

  const handleVisualize = () => console.log('Visualize clicked!', { selectedProblem, inputValue });
  const handleReset = () => {
    setInputValue(0);
    console.log('Reset clicked!');
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 p-4 sm:p-8">
      {/* Spacer div */}
      <div className="h-24"></div>

      {/* 1. Gradient Header Card */}
      <div className="max-w-7xl mx-auto p-6 mb-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold text-white tracking-tight">
          Dynamic Programming Visualizer
        </h1>
        <p className="mt-2 text-blue-100">
          Visualize dynamic programming algorithms and optimization problems.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 2. Left Column: Inputs & Controls Card */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Puzzle size={22} className="text-indigo-500" />
              Problem & Controls
            </h2>

            {/* Problem Selection */}
            <div className="mb-4">
              <label htmlFor="dp-problem" className="block text-sm font-medium text-slate-600 mb-2">
                Select a Problem
              </label>
              <select
                id="dp-problem"
                value={selectedProblem}
                onChange={(e) => setSelectedProblem(e.target.value)}
                className="w-full p-3 bg-slate-100 text-slate-800 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="fibonacci">Fibonacci Sequence</option>
                <option value="knapsack">0/1 Knapsack</option>
                <option value="lcs">Longest Common Subsequence</option>
              </select>
            </div>

            {/* Conditional Inputs based on selected problem */}
            <div className="mb-6">
              <label htmlFor="main-input" className="block text-sm font-medium text-slate-600 mb-2">
                Input (n)
              </label>
              <input
                id="main-input"
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(Number(e.target.value))}
                className="w-full p-3 bg-slate-100 text-slate-800 placeholder-slate-400 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                placeholder="Enter a number..."
              />
            </div>
            
            {/* Buttons */}
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
          <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200 min-h-[300px]">
            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Hash size={22} className="text-indigo-500" />
              Visualization
            </h2>
            <div className="p-4 bg-slate-100 rounded-lg text-center text-slate-500">
              The visualization area for the {selectedProblem} problem will appear here.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DPVisualizer;