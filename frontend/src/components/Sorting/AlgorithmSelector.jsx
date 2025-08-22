import React from 'react';

const AlgorithmSelector = ({ algorithms, selected, onChange }) => {
  return (
    <div className="space-y-3">
      {algorithms.map((algo) => (
        <button
          key={algo.id}
          onClick={() => onChange(algo.id)}
          className={`w-full text-left p-3 rounded-lg border transition-colors ${
            selected === algo.id
              ? 'border-primary-500 bg-primary-50 text-primary-700'
              : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          <div className="font-medium">{algo.name}</div>
          <div className="text-sm text-gray-500">{algo.complexity}</div>
        </button>
      ))}
    </div>
  );
};

export default AlgorithmSelector;
