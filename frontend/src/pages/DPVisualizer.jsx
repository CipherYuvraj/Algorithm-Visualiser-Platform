import React, { useState } from 'react';

const DPVisualizer = () => {
  const [algorithm, setAlgorithm] = useState('lcs');
  
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="bg-white rounded-xl shadow-soft p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Dynamic Programming Visualizer
        </h1>
        <p className="text-gray-600">
          Visualize dynamic programming algorithms and optimization problems
        </p>
      </div>
      
      <div className="bg-white rounded-xl shadow-soft p-6">
        <p className="text-gray-600">DP visualizer coming soon...</p>
      </div>
    </div>
  );
};

export default DPVisualizer;
