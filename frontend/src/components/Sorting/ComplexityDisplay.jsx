import React from 'react';
import { Clock, MemoryStick } from 'lucide-react';

const ComplexityDisplay = ({ algorithm, currentData, steps }) => {
  if (!algorithm) return null;

  return (
    <div className="bg-white rounded-xl shadow-soft p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Complexity Analysis
      </h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-blue-500" />
            <span className="font-medium text-gray-700">Time Complexity</span>
          </div>
          <div className="text-2xl font-bold text-blue-600">
            {algorithm.complexity}
          </div>
          <div className="text-sm text-gray-600">
            Operations: {currentData?.operations_count || 0}
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <MemoryStick className="h-5 w-5 text-green-500" />
            <span className="font-medium text-gray-700">Space Complexity</span>
          </div>
          <div className="text-2xl font-bold text-green-600">
            {currentData?.space_complexity || 'O(1)'}
          </div>
          <div className="text-sm text-gray-600">
            Total Steps: {steps.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplexityDisplay;
