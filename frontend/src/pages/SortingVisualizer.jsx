import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, Settings, Zap } from 'lucide-react';
import toast from 'react-hot-toast';
import SortingCanvas from '../components/Sorting/SortingCanvas';
import AlgorithmSelector from '../components/Sorting/AlgorithmSelector';
import ArrayInput from '../components/Sorting/ArrayInput';
import ControlPanel from '../components/Sorting/ControlPanel';
import ComplexityDisplay from '../components/Sorting/ComplexityDisplay';
import { sortingService } from '../services/api';

const SortingVisualizer = () => {
  const [array, setArray] = useState([64, 34, 25, 12, 22, 11, 90]);
  const [algorithm, setAlgorithm] = useState('bubble');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState([]);
  const [speed, setSpeed] = useState(500);
  const [isLoading, setIsLoading] = useState(false);

  const algorithms = [
    { id: 'bubble', name: 'Bubble Sort', complexity: 'O(n²)' },
    { id: 'merge', name: 'Merge Sort', complexity: 'O(n log n)' },
    { id: 'quick', name: 'Quick Sort', complexity: 'O(n log n)' },
    { id: 'heap', name: 'Heap Sort', complexity: 'O(n log n)' },
    { id: 'counting', name: 'Counting Sort', complexity: 'O(n + k)' }
  ];

  const executeAlgorithm = useCallback(async () => {
    try {
      setIsLoading(true);
      toast.loading('Executing algorithm...');
      
      const response = await sortingService.runAlgorithm(algorithm, array);
      setSteps(response.steps);
      setCurrentStep(0);
      
      toast.dismiss();
      toast.success(`${algorithm} algorithm executed successfully!`);
    } catch (error) {
      toast.dismiss();
      toast.error('Failed to execute algorithm');
      console.error('Algorithm execution error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [algorithm, array]);

  const playPause = () => {
    if (steps.length === 0) {
      executeAlgorithm();
      return;
    }
    setIsPlaying(!isPlaying);
  };

  const reset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setSteps([]);
  };

  const generateRandomArray = () => {
    const size = Math.floor(Math.random() * 10) + 5;
    const newArray = Array.from({ length: size }, () => 
      Math.floor(Math.random() * 100) + 1
    );
    setArray(newArray);
    reset();
  };

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying && currentStep < steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 1100 - speed);
      
      return () => clearTimeout(timer);
    } else if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
    }
  }, [isPlaying, currentStep, steps.length, speed]);

  const currentStepData = steps[currentStep] || {
    array: array,
    highlighted: [],
    comparing: [],
    operation: 'Ready to start',
    operations_count: 0
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-soft p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Sorting Algorithm Visualizer
        </h1>
        <p className="text-gray-600">
          Watch sorting algorithms in action with step-by-step visualization
        </p>
      </div>

      {/* Controls */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Algorithm Selection */}
        <div className="bg-white rounded-xl shadow-soft p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Algorithm Selection
          </h3>
          <AlgorithmSelector
            algorithms={algorithms}
            selected={algorithm}
            onChange={setAlgorithm}
          />
        </div>

        {/* Array Input */}
        <div className="bg-white rounded-xl shadow-soft p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Array Configuration
          </h3>
          <ArrayInput
            array={array}
            onChange={setArray}
            onRandomize={generateRandomArray}
          />
        </div>

        {/* Control Panel */}
        <div className="bg-white rounded-xl shadow-soft p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Playback Controls
          </h3>
          <ControlPanel
            isPlaying={isPlaying}
            onPlayPause={playPause}
            onReset={reset}
            onSpeedChange={setSpeed}
            speed={speed}
            currentStep={currentStep}
            totalSteps={steps.length}
            isLoading={isLoading}
          />
        </div>
      </div>

      {/* Visualization */}
      <div className="bg-white rounded-xl shadow-soft p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Visualization
          </h3>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              Step {currentStep + 1} of {steps.length || 1}
            </span>
            <div className="flex items-center space-x-2">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700">
                Operations: {currentStepData.operations_count || 0}
              </span>
            </div>
          </div>
        </div>
        
        <SortingCanvas
          data={currentStepData}
          algorithm={algorithm}
        />
        
        {/* Current Operation */}
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm font-medium text-gray-700">
            Current Operation:
          </p>
          <p className="text-gray-600">
            {currentStepData.operation}
          </p>
        </div>
      </div>

      {/* Complexity Analysis */}
      <ComplexityDisplay
        algorithm={algorithms.find(a => a.id === algorithm)}
        currentData={currentStepData}
        steps={steps}
      />
    </div>
  );
};

export default SortingVisualizer;
