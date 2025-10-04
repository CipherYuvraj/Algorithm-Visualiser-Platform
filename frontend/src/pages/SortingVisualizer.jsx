import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Zap, Settings, BookOpen, Download } from 'lucide-react';
import toast from 'react-hot-toast';
import { useTheme } from '../contexts/ThemeContext';
import { AlgorithmSettingsProvider, useAlgorithmSettings } from '../contexts/AlgorithmSettingsContext';
import SortingCanvas from '../components/Sorting/SortingCanvas';
import ArrayInput from '../components/Sorting/ArrayInput';
import ControlPanel from '../components/Sorting/ControlPanel';
import ComplexityDisplay from '../components/Sorting/ComplexityDisplay';
import { sortingService } from '../services/api';

const SortingVisualizerContent = () => {
  const { isDark, classes, getThemedGradient } = useTheme();
  const { settings } = useAlgorithmSettings();
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
  const audioRef = useRef(new Audio('/sounds/swap.mp3'));

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

  // Convert speed setting (0.1x - 10x) to delay in ms (1000ms - 100ms)
  const getDelay = useCallback(() => {
    return Math.round(1000 / settings.speed);
  }, [settings.speed]);

  // Handle sound effects
  const playSwapSound = useCallback(() => {
    if (settings.soundEffects && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  }, [settings.soundEffects]);

  useEffect(() => {
    // Update speed when settings change
    setSpeed(getDelay());
  }, [settings.speed, getDelay]);

  // Play step sound when moving forward
  useEffect(() => {
    if (currentStep > 0 && settings.soundEffects) {
      playSwapSound();
    }
  }, [currentStep, settings.soundEffects, playSwapSound]);

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
    <div className={`min-h-screen ${classes.bgGradient}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main content */}
        <div className="space-y-6">
          {/* Algorithm selection and array input */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ArrayInput
              array={array}
              onChange={setArray}
              arraySize={arraySize}
              onSizeChange={setArraySize}
              isLoading={isLoading}
            />
            <ComplexityDisplay algorithm={selectedAlgorithm} />
          </div>

          {/* Control panel with new settings */}
          <div className={`p-6 rounded-2xl backdrop-blur-xl ${
            settings.theme === 'neon'
              ? 'bg-gray-900/50 border-purple-500/20'
              : settings.theme === 'minimal'
                ? 'bg-gray-50/50 border-gray-200'
                : 'bg-white/20 border-white/20'
          } border`}>
            <ControlPanel
              isPlaying={isPlaying}
              onPlayPause={playPause}
              onReset={reset}
              onSpeedChange={(newSpeed) => settings.updateSettings({ speed: newSpeed })}
              speed={settings.speed}
              currentStep={currentStep}
              totalSteps={steps.length}
              isLoading={isLoading}
              onStepForward={stepForward}
              onStepBackward={stepBackward}
              onCompareMode={() => settings.updateSettings({ compareMode: !settings.compareMode })}
              onThemeChange={(theme) => settings.updateSettings({ theme })}
            />
          </div>

          {/* Visualization canvas */}
          <div className={`relative overflow-hidden rounded-2xl ${
            settings.theme === 'neon'
              ? 'bg-gray-900/50 border-purple-500/20'
              : settings.theme === 'minimal'
                ? 'bg-gray-50/50 border-gray-200'
                : 'bg-white/20 border-white/20'
          } border p-6`}>
            <SortingCanvas
              ref={canvasRef}
              array={currentStep < steps.length ? steps[currentStep].array : array}
              comparing={currentStep < steps.length ? steps[currentStep].comparing : []}
              swapping={currentStep < steps.length ? steps[currentStep].swapping : []}
              sorted={currentStep < steps.length ? steps[currentStep].sorted : []}
              theme={settings.theme}
            />
            {showParticles && (
              <canvas
                ref={particleCanvasRef}
                className="absolute inset-0 pointer-events-none"
                style={{ opacity: 0.5 }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const SortingVisualizer = () => {
  return (
    <AlgorithmSettingsProvider>
      <SortingVisualizerContent />
    </AlgorithmSettingsProvider>
  );
};

export default SortingVisualizer;
