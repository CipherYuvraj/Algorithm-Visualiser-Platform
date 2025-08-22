import React, { useState } from 'react';

const GraphVisualizer = () => {
  const [algorithm, setAlgorithm] = useState('bfs');
  
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="bg-white rounded-xl shadow-soft p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Graph Algorithm Visualizer
        </h1>
        <p className="text-gray-600">
          Visualize graph traversal and pathfinding algorithms
        </p>
      </div>
      
      <div className="bg-white rounded-xl shadow-soft p-6">
        <p className="text-gray-600">Graph visualizer coming soon...</p>
      </div>
    </div>
  );
};

export default GraphVisualizer;
