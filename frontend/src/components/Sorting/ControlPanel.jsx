import React from 'react';
import { Play, Pause, RotateCcw, SkipBack, SkipForward } from 'lucide-react';

const ControlPanel = ({ 
  isPlaying, 
  onPlayPause, 
  onReset, 
  onSpeedChange, 
  speed, 
  currentStep, 
  totalSteps,
  isLoading,
  onStepForward,
  onStepBackward
}) => {
  
  const getSpeedLabel = (speed) => {
    if (speed < 300) return 'Very Fast';
    if (speed < 500) return 'Fast';
    if (speed < 700) return 'Medium';
    if (speed < 900) return 'Slow';
    return 'Very Slow';
  };

  // Fixed speed calculation - now higher values = faster
  const speedPercentage = Math.round(((1000 - speed) / 800) * 100);

  return (
    <div className="space-y-4">
      {/* Main Controls */}
      <div className="flex space-x-2">
        <button
          onClick={onStepBackward}
          disabled={currentStep === 0 || isPlaying}
          className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <SkipBack className="h-4 w-4" />
        </button>
        
        <button
          onClick={onPlayPause}
          disabled={isLoading}
          className="flex-1 flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 transition-all shadow-md"
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
          ) : isPlaying ? (
            <Pause className="h-4 w-4 mr-2" />
          ) : (
            <Play className="h-4 w-4 mr-2" />
          )}
          {isLoading ? 'Loading...' : isPlaying ? 'Pause' : 'Play'}
        </button>
        
        <button
          onClick={onStepForward}
          disabled={currentStep >= totalSteps - 1 || isPlaying}
          className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <SkipForward className="h-4 w-4" />
        </button>
        
        <button
          onClick={onReset}
          className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>
      
      {/* Enhanced Speed Control - Fixed Direction */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Speed: {getSpeedLabel(speed)}
          </label>
          <span className="text-xs text-gray-500 font-medium">
            {speedPercentage}%
          </span>
        </div>
        <input
          type="range"
          min="200"    // Fastest (200ms delay)
          max="1000"   // Slowest (1000ms delay)
          value={1200 - speed} // Invert the value so right = faster
          onChange={(e) => onSpeedChange(1200 - parseInt(e.target.value))}
          className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${speedPercentage}%, #e5e7eb ${speedPercentage}%, #e5e7eb 100%)`
          }}
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>Slow</span>
          <span>Fast</span>
        </div>
      </div>
      
      {/* Enhanced Progress Bar */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm text-gray-600 font-mono">
            {currentStep} / {totalSteps || 1}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-300 ease-out shadow-sm"
            style={{ 
              width: `${totalSteps > 0 ? (currentStep / (totalSteps - 1)) * 100 : 0}%` 
            }}
          />
        </div>
      </div>
      
      {/* Enhanced Stats */}
      <div className="bg-gray-50 rounded-lg p-3">
        <div className="text-sm text-gray-700 space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Current Step:</span>
            <span className="font-semibold text-blue-600">{currentStep + 1}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Total Steps:</span>
            <span className="font-semibold text-green-600">{totalSteps}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Completion:</span>
            <span className="font-semibold text-purple-600">
              {totalSteps > 0 ? Math.round((currentStep / (totalSteps - 1)) * 100) : 0}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
