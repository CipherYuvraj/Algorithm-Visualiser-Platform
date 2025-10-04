import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Zap, Settings, BookOpen, Download } from 'lucide-react';
import toast from 'react-hot-toast';
import { useTheme } from '../contexts/ThemeContext';
import SortingCanvas from '../components/Sorting/SortingCanvas';
import ArrayInput from '../components/Sorting/ArrayInput';
import ControlPanel from '../components/Sorting/ControlPanel';
import ComplexityDisplay from '../components/Sorting/ComplexityDisplay';
import { sortingService } from '../services/api';

const SortingVisualizer = () => {
  const { isDark, classes, getThemedGradient } = useTheme();
  const [array, setArray] = useState([64, 34, 25, 12, 22, 11, 90]);
  const [algorithm, setAlgorithm] = useState('bubble');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState([]);
  const [speed, setSpeed] = useState(700);
  const [isLoading, setIsLoading] = useState(false);
  const [arraySize, setArraySize] = useState(7);
  const [showParticles] = useState(true);
  const [typewriterText, setTypewriterText] = useState('');
  const [showDetailedLog, setShowDetailedLog] = useState(false);
  const [timeoutDetected, setTimeoutDetected] = useState(false);
  const canvasRef = useRef(null);
  const particleCanvasRef = useRef(null);
  const timeoutCountRef = useRef(0);
  const lastTimeoutCheck = useRef(Date.now());

  const algorithms = [
    { 
      id: 'bubble', 
      name: 'Bubble Sort', 
      complexity: 'O(n²)', 
      color: '#ef4444',
      description: 'Simple comparison-based algorithm',
      explanation: 'Bubble Sort repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
      preview: '🔄 Compares adjacent elements and swaps them',
      category: 'Simple',
      bestCase: 'O(n)',
      worstCase: 'O(n²)',
      stable: true
    },
    { 
      id: 'merge', 
      name: 'Merge Sort', 
      complexity: 'O(n log n)', 
      color: '#10b981',
      description: 'Divide and conquer algorithm',
      explanation: 'Merge Sort divides the array into two halves, recursively sorts them, and then merges the sorted halves.',
      preview: '✂️ Divides array, then merges sorted halves',
      category: 'Efficient',
      bestCase: 'O(n log n)',
      worstCase: 'O(n log n)',
      stable: true
    },
    { 
      id: 'quick', 
      name: 'Quick Sort', 
      complexity: 'O(n log n)', 
      color: '#3b82f6',
      description: 'Fast divide and conquer',
      explanation: 'Quick Sort picks a pivot element and partitions the array around it, then recursively sorts the sub-arrays.',
      preview: '🎯 Uses pivot to partition and sort',
      category: 'Efficient',
      bestCase: 'O(n log n)',
      worstCase: 'O(n²)',
      stable: false
    },
    { 
      id: 'heap', 
      name: 'Heap Sort', 
      complexity: 'O(n log n)', 
      color: '#8b5cf6',
      description: 'Binary heap based sorting',
      explanation: 'Heap Sort builds a max heap from the array, then repeatedly extracts the maximum element.',
      preview: '🏗️ Builds heap structure for sorting',
      category: 'Efficient',
      bestCase: 'O(n log n)',
      worstCase: 'O(n log n)',
      stable: false
    },
    { 
      id: 'counting', 
      name: 'Counting Sort', 
      complexity: 'O(n + k)', 
      color: '#f59e0b',
      description: 'Non-comparison based algorithm',
      explanation: 'Counting Sort counts the occurrences of each element and uses this information to place elements in sorted order.',
      preview: '🔢 Counts elements to determine positions',
      category: 'Special',
      bestCase: 'O(n + k)',
      worstCase: 'O(n + k)',
      stable: true
    }
  ];


  // Move selectedAlgorithm definition here, before useEffect hooks
  const selectedAlgorithm = algorithms.find(a => a.id === algorithm);

  // Move currentStepData definition here, before useEffect hooks
  const currentStepData = steps[currentStep] || {
    array: array,
    highlighted: [],
    comparing: [],
    operation: 'Ready to start',
    operations_count: 0,
    time_complexity: 'O(n)',
    space_complexity: 'O(1)'
  };

  // Typewriter effect for step explanations
  useEffect(() => {
    const text = getStepExplanation(currentStepData, selectedAlgorithm);
    let index = 0;
    setTypewriterText('');
    
    const timer = setInterval(() => {
      if (index < text.length) {
        setTypewriterText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 30);

    return () => clearInterval(timer);
  }, [currentStep, steps, selectedAlgorithm, currentStepData]); // Add currentStepData as dependency

  // Monitor for timeout loops
  useEffect(() => {
    const checkTimeouts = () => {
      const now = Date.now();
      if (now - lastTimeoutCheck.current < 1000) {
        timeoutCountRef.current++;
        if (timeoutCountRef.current > 5) {
          setTimeoutDetected(true);
          console.warn('Timeout loop detected, disabling problematic features');
        }
      } else {
        timeoutCountRef.current = 0;
        lastTimeoutCheck.current = now;
      }
    };

    const interval = setInterval(checkTimeouts, 1000);
    return () => clearInterval(interval);
  }, []);

  // Disable particle system if timeouts detected
  const shouldShowParticles = showParticles && !timeoutDetected;

  // Particle system
  useEffect(() => {
    if (!shouldShowParticles || !particleCanvasRef.current) return;

    let animationId;
    const canvas = particleCanvasRef.current;
    
    try {
      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const particles = [];
      for (let i = 0; i < 30; i++) { // Reduced particles
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.3 + 0.1
        });
      }

      const animate = () => {
        if (!shouldShowParticles) return;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
          particle.x += particle.vx;
          particle.y += particle.vy;

          if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
          if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(59, 130, 246, ${particle.opacity})`;
          ctx.fill();
        });

        animationId = requestAnimationFrame(animate);
      };

      animate();
    } catch (error) {
      console.error('Particle system error:', error);
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [shouldShowParticles]);

  // Dynamic array size change
  useEffect(() => {
    const newArray = Array.from({ length: arraySize }, (_, i) => 
      i < array.length ? array[i] : Math.floor(Math.random() * 80) + 10
    );
    setArray(newArray);
    reset();
  }, [arraySize]);

  // Get detailed step explanation
  const getStepExplanation = (stepData, selectedAlgo) => {
    if (!stepData.operation) return '';
    
    const operation = stepData.operation.toLowerCase();
    
    if (operation.includes('comparing')) {
      return `🔍 Comparison: The algorithm is checking if elements need to be swapped based on their values. This is the core operation of most sorting algorithms.`;
    }
    if (operation.includes('swap')) {
      return `🔄 Swap: Two elements are being exchanged because they were found to be in the wrong order. This moves us closer to the final sorted array.`;
    }
    if (operation.includes('divide') || operation.includes('dividing')) {
      return `✂️ Divide: The array is being split into smaller sub-arrays. This is the "divide" part of the divide-and-conquer strategy.`;
    }
    if (operation.includes('merge')) {
      return `🔗 Merge: Two sorted sub-arrays are being combined into a single sorted array. This is the "conquer" part of merge sort.`;
    }
    if (operation.includes('pivot')) {
      return `🎯 Pivot Selection: A pivot element is chosen to partition the array. All smaller elements go to the left, larger ones to the right.`;
    }
    if (operation.includes('heap')) {
      return `🏗️ Heap Operation: The algorithm is maintaining the heap property - parent nodes are larger than their children.`;
    }
    if (operation.includes('count')) {
      return `🔢 Counting: The algorithm is counting occurrences of each value to determine their final positions without comparisons.`;
    }
    if (operation.includes('complete')) {
      return `✅ Sorting Complete: The array is now fully sorted! All elements are in their correct positions.`;
    }
    if (operation.includes('start')) {
      return `🚀 Starting: The sorting algorithm is beginning. Initial array setup and preparation phase.`;
    }
    
    return `⚙️ Processing: The algorithm is performing internal operations to organize the data structure.`;
  };

  const executeAlgorithm = useCallback(async () => {
    try {
      setIsLoading(true);
      toast.loading('Executing algorithm...', {
        icon: '⚡',
        style: {
          borderRadius: '12px',
          background: isDark ? '#1f2937' : '#333',
          color: '#fff',
          backdropFilter: 'blur(10px)',
        },
      });
      
      const response = await sortingService.runAlgorithm(algorithm, array);
      
      if (response.steps && Array.isArray(response.steps)) {
        setSteps(response.steps);
        setCurrentStep(0);
        toast.dismiss();
        toast.success(`${selectedAlgorithm?.name} executed successfully!`, {
          icon: '🎉',
          style: {
            borderRadius: '12px',
            background: selectedAlgorithm?.color,
            color: '#fff',
            boxShadow: `0 0 20px ${selectedAlgorithm?.color}40`,
          },
        });
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      toast.dismiss();
      toast.error('Failed to execute algorithm');
      console.error('Algorithm execution error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [algorithm, array, selectedAlgorithm, isDark]);

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

  const stepForward = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const stepBackward = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generateRandomArray = () => {
    const newArray = Array.from({ length: arraySize }, () => 
      Math.floor(Math.random() * 80) + 10
    );
    setArray(newArray);
    reset();
  };

  const downloadVisualization = () => {
    if (!canvasRef.current) return;
    
    const link = document.createElement('a');
    link.download = `${algorithm}-sort-step-${currentStep + 1}.png`;
    link.href = canvasRef.current.toDataURL();
    link.click();
    
    toast.success('Visualization downloaded!', {
      icon: '📥',
      style: {
        borderRadius: '12px',
        background: '#10b981',
        color: '#fff',
      },
    });
  };

  useEffect(() => {
    if (isPlaying && currentStep < steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, speed);
      
      return () => clearTimeout(timer);
    } else if (currentStep >= steps.length - 1 && isPlaying) {
      setIsPlaying(false);
      toast.success('🎉 Algorithm completed!', {
        style: {
          borderRadius: '12px',
          background: 'linear-gradient(45deg, #10b981, #059669)',
          color: '#fff',
          boxShadow: '0 0 30px #10b98140',
        },
      });
    }
  }, [isPlaying, currentStep, steps.length, speed]);

  return (
    <div className={`min-h-screen transition-all duration-500 ${classes.bgGradient}`}>
      {/* Conditional Particle Background */}
      {shouldShowParticles && (
        <canvas
          ref={particleCanvasRef}
          className="fixed inset-0 pointer-events-none z-0"
          style={{ opacity: isDark ? 0.4 : 0.2 }}
        />
      )}

      {/* Timeout Warning */}
      {timeoutDetected && (
        <div className="fixed top-20 right-4 z-50 bg-yellow-500 text-black p-3 rounded-lg shadow-lg">
          ⚠️ Performance issue detected. Some visual effects disabled.
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto p-4">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Enhanced Array & Controls */}
          <div className="space-y-6">
            <div className={`backdrop-blur-xl rounded-2xl shadow-2xl border overflow-hidden ${
              isDark 
                ? 'bg-gray-800/20 border-gray-700/50' 
                : 'bg-white/20 border-white/50'
            }`}>
              <div className={`p-6 border-b ${classes.border}`}>
                <h3 className={`text-xl font-bold flex items-center ${classes.textPrimary}`}>
                  <Settings className="h-6 w-6 mr-3 text-blue-500" />
                  Configuration & Controls
                </h3>
                
                {/* Add algorithm selector here */}
                <div className="mt-4">
                  <label className={`block text-sm font-medium mb-2 ${classes.textSecondary}`}>
                    Algorithm
                  </label>
                  <select
                    value={algorithm}
                    onChange={(e) => {
                      setAlgorithm(e.target.value);
                      reset();
                    }}
                    className={`w-full p-3 rounded-lg border transition-all ${
                      isDark 
                        ? 'bg-gray-800 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-800'
                    }`}
                  >
                    {algorithms.map((algo) => (
                      <option key={algo.id} value={algo.id}>
                        {algo.name} - {algo.complexity}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="p-6 space-y-8">
                {/* Enhanced Array Section */}
                <div>
                  <h4 className={`text-lg font-semibold mb-4 flex items-center ${classes.textPrimary}`}>
                    <span className="w-3 h-3 bg-blue-500 rounded-full mr-3 animate-pulse"></span>
                    Array Configuration
                  </h4>
                  
                  {/* Array Size Slider */}
                  <div className="mb-6">
                    <label className={`block text-sm font-medium mb-2 ${classes.textSecondary}`}>
                      Array Size: {arraySize}
                    </label>
                    <input
                      type="range"
                      min="5"
                      max="15"
                      value={arraySize}
                      onChange={(e) => setArraySize(parseInt(e.target.value))}
                      className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((arraySize - 5) / 10) * 100}%, #e5e7eb ${((arraySize - 5) / 10) * 100}%, #e5e7eb 100%)`
                      }}
                    />
                  </div>
                  
                  <ArrayInput
                    array={array}
                    onChange={setArray}
                    onRandomize={generateRandomArray}
                  />
                </div>

                {/* Enhanced Controls Section */}
                <div>
                  <h4 className={`text-lg font-semibold mb-4 flex items-center ${classes.textPrimary}`}>
                    <span className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></span>
                    Playback Controls
                  </h4>
                  <ControlPanel
                    isPlaying={isPlaying}
                    onPlayPause={playPause}
                    onReset={reset}
                    onSpeedChange={setSpeed}
                    speed={speed}
                    currentStep={currentStep}
                    totalSteps={steps.length}
                    isLoading={isLoading}
                    onStepForward={stepForward}
                    onStepBackward={stepBackward}
                  />
                </div>

                {/* Download Button */}
                <button
                  onClick={downloadVisualization}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-all hover:scale-105 flex items-center justify-center space-x-2 ${
                    isDark 
                      ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                      : 'bg-purple-500 hover:bg-purple-600 text-white'
                  }`}
                >
                  <Download className="h-5 w-5" />
                  <span>Download Visualization</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Panel - Enhanced Visualization */}
          <div className="space-y-6">
            <div className={`backdrop-blur-xl rounded-2xl shadow-2xl border overflow-hidden ${classes.cardBg}`}>
              {/* Visualization Header */}
              <div className={`p-4 border-b ${classes.border}`}>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className={`text-xl font-bold ${classes.textPrimary}`}>
                      {selectedAlgorithm?.name} Visualization
                    </h3>
                    <div className={`flex items-center space-x-4 text-sm mt-1 ${classes.textSecondary}`}>
                      <span className="flex items-center space-x-1">
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                        <span>Step {currentStep + 1} of {steps.length || 1}</span>
                      </span>
                      <div className="flex items-center space-x-1">
                        <Zap className="h-4 w-4 text-yellow-500" />
                        <span>Ops: {currentStepData.operations_count || 0}</span>
                      </div>
                    </div>
                  </div>
                  <div 
                    className="px-4 py-2 rounded-full text-sm font-bold text-white shadow-lg animate-pulse"
                    style={{ 
                      backgroundColor: selectedAlgorithm?.color,
                      boxShadow: `0 0 20px ${selectedAlgorithm?.color}40`
                    }}
                  >
                    {selectedAlgorithm?.complexity}
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                {/* Enhanced Visualization Canvas */}
                <SortingCanvas
                  ref={canvasRef}
                  data={currentStepData}
                  algorithm={algorithm}
                  compact={true}
                  selectedAlgorithm={selectedAlgorithm}
                  enhanced={true}
                />
              </div>
            </div>

            {/* Enhanced Step Explanation with Typewriter Effect */}
            <div className={`backdrop-blur-xl rounded-2xl shadow-2xl border overflow-hidden ${classes.cardBg}`}>
              <div className={`p-4 border-b ${classes.border}`}>
                <div className="flex justify-between items-center">
                  <h4 className={`text-lg font-bold flex items-center ${classes.textPrimary}`}>
                    <BookOpen className="h-5 w-5 mr-2 text-purple-500" />
                    Step Explanation
                  </h4>
                  <button
                    onClick={() => setShowDetailedLog(!showDetailedLog)}
                    className={`text-sm px-3 py-1 rounded transition-colors ${
                      isDark 
                        ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                    }`}
                  >
                    {showDetailedLog ? 'Hide' : 'Show'} Detailed Log
                  </button>
                </div>
              </div>
              
              <div className="p-4 space-y-4 max-h-80 overflow-y-auto">
                <div className={`p-4 rounded-lg border-l-4 border-blue-500 ${
                  isDark ? 'bg-blue-900/20' : 'bg-blue-50'
                }`}>
                  <p className={`text-sm font-medium mb-1 ${classes.textPrimary}`}>
                    Current Operation:
                  </p>
                  <p className={`text-sm ${classes.textSecondary}`}>
                    {currentStepData.operation}
                  </p>
                </div>
                
                <div className={`p-4 rounded-lg border-l-4 border-purple-500 ${
                  isDark ? 'bg-purple-900/20' : 'bg-purple-50'
                }`}>
                  <p className={`text-sm font-medium mb-2 ${classes.textPrimary}`}>
                    What's Happening:
                  </p>
                  <p className={`text-sm leading-relaxed ${classes.textSecondary}`}>
                    {typewriterText}
                    <span className="animate-blink">|</span>
                  </p>
                </div>

                {selectedAlgorithm && (
                  <div className={`p-4 rounded-lg border-l-4 border-green-500 ${
                    isDark ? 'bg-green-900/20' : 'bg-green-50'
                  }`}>
                    <p className={`text-sm font-medium mb-2 ${classes.textPrimary}`}>
                      Algorithm Info:
                    </p>
                    <p className={`text-sm leading-relaxed ${classes.textSecondary}`}>
                      {selectedAlgorithm.explanation}
                    </p>
                  </div>
                )}

                {/* Detailed Log */}
                {showDetailedLog && (
                  <div className={`p-4 rounded-lg ${
                    isDark ? 'bg-gray-800/50' : 'bg-gray-100'
                  }`}>
                    <h5 className={`text-sm font-bold mb-2 ${classes.textPrimary}`}>
                      Step History:
                    </h5>
                    <div className="space-y-1 max-h-32 overflow-y-auto">
                      {steps.slice(Math.max(0, currentStep - 5), currentStep + 1).map((step, index) => (
                        <div key={index} className={`text-xs p-2 rounded ${
                          index === 5 || index === steps.slice(Math.max(0, currentStep - 5), currentStep + 1).length - 1
                            ? (isDark ? 'bg-blue-800/50 text-blue-200' : 'bg-blue-100 text-blue-800')
                            : (isDark ? 'text-gray-400' : 'text-gray-600')
                        }`}>
                          {step.operation}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Bottom Panel - Analysis & Metrics */}
        <div className="mt-8 grid md:grid-cols-2 gap-8">
          <div className={`backdrop-blur-xl rounded-2xl shadow-2xl border overflow-hidden ${classes.cardBg}`}>
            <div className={`p-4 border-b ${classes.border}`}>
              <h3 className={`text-lg font-bold ${classes.textPrimary}`}>
                Complexity Analysis
              </h3>
            </div>
            <div className="p-6">
              <ComplexityDisplay
                algorithm={selectedAlgorithm}
                currentData={currentStepData}
                steps={steps}
                enhanced={true}
              />
            </div>
          </div>

          <div className={`backdrop-blur-xl rounded-2xl shadow-2xl border overflow-hidden ${classes.cardBg}`}>
            <div className={`p-4 border-b ${classes.border}`}>
              <h3 className={`text-lg font-bold ${classes.textPrimary}`}>
                Performance Metrics
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-6">
                <div className={`p-6 rounded-xl text-center transform hover:scale-105 transition-all ${
                  isDark ? 'bg-blue-900/30' : 'bg-blue-50'
                }`}>
                  <div className="text-3xl font-bold text-blue-600 animate-pulse">
                    {array.length}
                  </div>
                  <div className={`text-sm ${isDark ? 'text-blue-300' : 'text-blue-600'}`}>
                    Array Size
                  </div>
                </div>
                <div className={`p-6 rounded-xl text-center transform hover:scale-105 transition-all ${
                  isDark ? 'bg-green-900/30' : 'bg-green-50'
                }`}>
                  <div className="text-3xl font-bold text-green-600 animate-pulse">
                    {steps.length}
                  </div>
                  <div className={`text-sm ${isDark ? 'text-green-300' : 'text-green-600'}`}>
                    Total Steps
                  </div>
                </div>
                <div className={`p-6 rounded-xl text-center transform hover:scale-105 transition-all ${
                  isDark ? 'bg-purple-900/30' : 'bg-purple-50'
                }`}>
                  <div className="text-3xl font-bold text-purple-600 animate-pulse">
                    {currentStepData.operations_count || 0}
                  </div>
                  <div className={`text-sm ${isDark ? 'text-purple-300' : 'text-purple-600'}`}>
                    Operations
                  </div>
                </div>
                <div className={`p-6 rounded-xl text-center transform hover:scale-105 transition-all ${
                  isDark ? 'bg-orange-900/30' : 'bg-orange-50'
                }`}>
                  <div className="text-3xl font-bold text-orange-600 animate-pulse">
                    {steps.length > 0 ? Math.round((currentStep / (steps.length - 1)) * 100) : 0}%
                  </div>
                  <div className={`text-sm ${isDark ? 'text-orange-300' : 'text-orange-600'}`}>
                    Progress
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
          }
          .animate-blink {
            animation: blink 1s infinite;
          }
          .animate-fade-in {
            animation: fadeIn 0.3s ease-in-out;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `
      }} />
    </div>
  );
};

export default SortingVisualizer;
