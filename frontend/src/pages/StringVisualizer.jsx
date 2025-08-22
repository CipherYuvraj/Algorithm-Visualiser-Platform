import React, { useState } from 'react';

const StringVisualizer = () => {
  const [algorithm, setAlgorithm] = useState('kmp');
  
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="bg-white rounded-xl shadow-soft p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          String Algorithm Visualizer
        </h1>
        <p className="text-gray-600">
          Visualize pattern matching and string processing algorithms
        </p>
      </div>
      
      <div className="bg-white rounded-xl shadow-soft p-6">
        <p className="text-gray-600">String visualizer coming soon...</p>
      </div>
    </div>
  );
};

export default StringVisualizer;
