import React from 'react';
import { Clock, MemoryStick, Cpu } from 'lucide-react';

const ComplexityDisplay = ({ algorithm, currentData, steps }) => {
  if (!algorithm) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2 text-blue-600">
        <Clock className="h-4 w-4" />
        <span className="font-medium text-sm">Time Complexity</span>
      </div>
      <div className="text-lg font-bold text-blue-600 ml-6">
        {algorithm.complexity}
      </div>
      
      <div className="flex items-center space-x-2 text-green-600">
        <MemoryStick className="h-4 w-4" />
        <span className="font-medium text-sm">Space Complexity</span>
      </div>
      <div className="text-lg font-bold text-green-600 ml-6">
        {currentData?.space_complexity || 'O(1)'}
      </div>

      <div className="flex items-center space-x-2 text-purple-600">
        <Cpu className="h-4 w-4" />
        <span className="font-medium text-sm">Performance</span>
      </div>
      <div className="ml-6 space-y-1 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Operations:</span>
          <span className="font-medium">{currentData?.operations_count || 0}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Steps:</span>
          <span className="font-medium">{steps.length}</span>
        </div>
      </div>
    </div>
  );
};

export default ComplexityDisplay;
