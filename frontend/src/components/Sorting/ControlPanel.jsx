import React, { useCallback, useEffect } from 'react';
import { Play, Pause, RotateCcw, SkipBack, SkipForward, Settings, Volume2, VolumeX, RefreshCw, SplitSquareHorizontal } from 'lucide-react';
import { useAlgorithmSettings } from '../../contexts/AlgorithmSettingsContext';

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
  onStepBackward,
  onCompareMode,
  onThemeChange,
}) => {
  const { settings, updateSettings, resetSettings } = useAlgorithmSettings();
  
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
      <div className="flex flex-wrap gap-2">
        <div className="flex space-x-2 flex-1">
          <button
            onClick={onStepBackward}
            disabled={currentStep === 0 || isPlaying}
            className={`px-3 py-2 ${settings.theme === 'neon' ? 'bg-gray-800 text-purple-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all`}
          >
            <SkipBack className="h-4 w-4" />
          </button>
          
          <button
            onClick={onPlayPause}
            disabled={isLoading}
            className={`flex-1 flex items-center justify-center px-4 py-3 bg-gradient-to-r ${
              settings.theme === 'neon'
                ? 'from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                : settings.theme === 'minimal'
                  ? 'from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900'
                  : 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
            } text-white font-semibold rounded-lg disabled:opacity-50 transition-all shadow-md`}
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
            className={`px-3 py-2 ${settings.theme === 'neon' ? 'bg-gray-800 text-purple-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all`}
          >
            <SkipForward className="h-4 w-4" />
          </button>
          
          <button
            onClick={onReset}
            className={`px-3 py-2 ${settings.theme === 'neon' ? 'bg-gray-800 text-purple-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} rounded-lg transition-all`}
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => updateSettings({ soundEffects: !settings.soundEffects })}
            className={`px-3 py-2 ${settings.theme === 'neon' ? 'bg-gray-800 text-purple-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} rounded-lg transition-all`}
            title={settings.soundEffects ? 'Disable Sound Effects' : 'Enable Sound Effects'}
          >
            {settings.soundEffects ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </button>

          <button
            onClick={() => updateSettings({ compareMode: !settings.compareMode })}
            className={`px-3 py-2 ${
              settings.compareMode
                ? settings.theme === 'neon'
                  ? 'bg-purple-600 text-white'
                  : 'bg-blue-500 text-white'
                : settings.theme === 'neon'
                ? 'bg-gray-800 text-purple-400 hover:bg-gray-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            } rounded-lg transition-all`}
            title="Toggle Comparison Mode"
          >
            <SplitSquareHorizontal className="h-4 w-4" />
          </button>

          <button
            onClick={resetSettings}
            className={`px-3 py-2 ${settings.theme === 'neon' ? 'bg-gray-800 text-purple-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} rounded-lg transition-all`}
            title="Reset Settings"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      {/* Settings Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {/* Speed Control */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className={`block text-sm font-medium ${settings.theme === 'neon' ? 'text-purple-200' : 'text-gray-700'}`}>
              Speed: {speed}x
            </label>
            <div className="flex space-x-2">
              {[0.1, 0.5, 1, 2, 5, 10].map((preset) => (
                <button
                  key={preset}
                  onClick={() => onSpeedChange(preset)}
                  className={`px-2 py-1 text-xs rounded ${
                    speed === preset
                      ? settings.theme === 'neon'
                        ? 'bg-purple-600 text-white'
                        : settings.theme === 'minimal'
                          ? 'bg-gray-700 text-white'
                          : 'bg-blue-500 text-white'
                      : settings.theme === 'neon'
                        ? 'bg-gray-800 text-purple-400 hover:bg-gray-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {preset}x
                </button>
              ))}
            </div>
          </div>
          <input
            type="range"
            min="0.1"
            max="10"
            step="0.1"
            value={speed}
            onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
            className={`w-full h-3 rounded-lg appearance-none cursor-pointer ${
              settings.theme === 'neon' ? 'bg-gray-800' : 'bg-gray-200'
            }`}
            style={{
              background: `linear-gradient(to right, ${
                settings.theme === 'neon'
                  ? '#a855f7'
                  : settings.theme === 'minimal'
                    ? '#374151'
                    : '#3b82f6'
              } 0%, ${
                settings.theme === 'neon'
                  ? '#a855f7'
                  : settings.theme === 'minimal'
                    ? '#374151'
                    : '#3b82f6'
              } ${(speed / 10) * 100}%, ${
                settings.theme === 'neon' ? '#1f2937' : '#e5e7eb'
              } ${(speed / 10) * 100}%, ${
                settings.theme === 'neon' ? '#1f2937' : '#e5e7eb'
              } 100%)`
            }}
          />
        </div>

        {/* Theme Selection */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${
            settings.theme === 'neon' ? 'text-purple-200' : 'text-gray-700'
          }`}>
            Theme
          </label>
          <div className="grid grid-cols-3 gap-2">
            {['classic', 'neon', 'minimal'].map((theme) => (
              <button
                key={theme}
                onClick={() => updateSettings({ theme })}
                className={`px-3 py-2 text-sm rounded-lg capitalize ${
                  settings.theme === theme
                    ? theme === 'neon'
                      ? 'bg-purple-600 text-white'
                      : theme === 'minimal'
                        ? 'bg-gray-700 text-white'
                        : 'bg-blue-500 text-white'
                    : theme === 'neon'
                      ? 'bg-gray-800 text-purple-400 hover:bg-gray-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {theme}
              </button>
            ))}
          </div>
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
