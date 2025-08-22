import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

const ControlPanel = ({ 
  isPlaying, 
  onPlayPause, 
  onReset, 
  onSpeedChange, 
  speed, 
  currentStep, 
  totalSteps,
  isLoading 
}) => {
  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <button
          onClick={onPlayPause}
          disabled={isLoading}
          className="flex-1 flex items-center justify-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 transition-colors"
        >
          {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
          {isLoading ? 'Loading...' : isPlaying ? 'Pause' : 'Play'}
        </button>
        
        <button
          onClick={onReset}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Speed: {Math.round((1100 - speed) / 10)}%
        </label>
        <input
          type="range"
          min="100"
          max="1000"
          value={speed}
          onChange={(e) => onSpeedChange(parseInt(e.target.value))}
          className="w-full"
        />
      </div>
      
      <div className="text-sm text-gray-600">
        Step {currentStep} of {totalSteps}
      </div>
    </div>
  );
};

export default ControlPanel;
