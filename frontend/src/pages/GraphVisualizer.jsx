import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Play, Pause, RotateCcw, Zap, Settings, ChevronDown, ChevronUp, BookOpen, Network, Download, Search, Moon, Sun, User, Palette } from 'lucide-react';
import toast from 'react-hot-toast';
import GraphCanvas from '../components/Graph/GraphCanvas';
import GraphInput from '../components/Graph/GraphInput';
import ControlPanel from '../components/Sorting/ControlPanel';
import ComplexityDisplay from '../components/Sorting/ComplexityDisplay';
import { graphService } from '../services/api';

const GraphVisualizer = () => {
  const [nodes, setNodes] = useState([
    { id: 0, label: 'A', x: 100, y: 100 },
    { id: 1, label: 'B', x: 300, y: 100 },
    { id: 2, label: 'C', x: 200, y: 250 },
    { id: 3, label: 'D', x: 400, y: 250 },
  ]);
  const [edges, setEdges] = useState([
    { from_node: 0, to: 1, weight: 2, directed: false },
    { from_node: 1, to: 2, weight: 3, directed: false },
    { from_node: 2, to: 3, weight: 1, directed: false },
    { from_node: 0, to: 2, weight: 4, directed: false },
  ]);
  const [algorithm, setAlgorithm] = useState('bfs');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState([]);
  const [speed, setSpeed] = useState(700);
  const [isLoading, setIsLoading] = useState(false);
  const [isAlgorithmSelectorOpen, setIsAlgorithmSelectorOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showParticles, setShowParticles] = useState(true);
  const [hoveredAlgorithm, setHoveredAlgorithm] = useState(null);
  const [typewriterText, setTypewriterText] = useState('');
  const [showDetailedLog, setShowDetailedLog] = useState(false);
  const [startNode, setStartNode] = useState(0);
  const [endNode, setEndNode] = useState(3);
  const canvasRef = useRef(null);
  const particleCanvasRef = useRef(null);

  const algorithms = [
    { 
      id: 'bfs', 
      name: 'Breadth-First Search', 
      complexity: 'O(V + E)', 
      color: '#3b82f6',
      description: 'Level-order graph traversal',
      explanation: 'BFS explores nodes level by level, visiting all neighbors before moving to the next level.',
      preview: '🌊 Explores nodes in waves, level by level',
      category: 'Traversal',
      bestCase: 'O(V + E)',
      worstCase: 'O(V + E)',
      stable: true
    },
    { 
      id: 'dfs', 
      name: 'Depth-First Search', 
      complexity: 'O(V + E)', 
      color: '#ef4444',
      description: 'Deep exploration traversal',
      explanation: 'DFS explores as far as possible along each branch before backtracking.',
      preview: '🏃 Goes deep into one path before exploring others',
      category: 'Traversal',
      bestCase: 'O(V + E)',
      worstCase: 'O(V + E)',
      stable: true
    },
    { 
      id: 'dijkstra', 
      name: 'Dijkstra\'s Algorithm', 
      complexity: 'O(V²)', 
      color: '#10b981',
      description: 'Shortest path algorithm',
      explanation: 'Dijkstra finds the shortest path from a source to all other vertices in weighted graphs.',
      preview: '🎯 Finds shortest paths with positive weights',
      category: 'Shortest Path',
      bestCase: 'O(V log V + E)',
      worstCase: 'O(V²)',
      stable: true
    },
    { 
      id: 'astar', 
      name: 'A* Search', 
      complexity: 'O(b^d)', 
      color: '#8b5cf6',
      description: 'Heuristic shortest path',
      explanation: 'A* uses heuristics to find optimal paths more efficiently than Dijkstra.',
      preview: '🧠 Smart pathfinding with heuristics',
      category: 'Shortest Path',
      bestCase: 'O(b^d)',
      worstCase: 'O(b^d)',
      stable: true
    },
    { 
      id: 'kruskal', 
      name: 'Kruskal\'s MST', 
      complexity: 'O(E log E)', 
      color: '#f59e0b',
      description: 'Minimum spanning tree',
      explanation: 'Kruskal finds the minimum spanning tree by sorting edges and avoiding cycles.',
      preview: '🌳 Builds MST by selecting minimum edges',
      category: 'MST',
      bestCase: 'O(E log E)',
      worstCase: 'O(E log E)',
      stable: true
    },
    { 
      id: 'prim', 
      name: 'Prim\'s MST', 
      complexity: 'O(V²)', 
      color: '#ec4899',
      description: 'Minimum spanning tree',
      explanation: 'Prim builds MST by growing the tree from a starting vertex.',
      preview: '🌱 Grows MST from a starting vertex',
      category: 'MST',
      bestCase: 'O(V log V)',
      worstCase: 'O(V²)',
      stable: true
    }
  ];

  const filteredAlgorithms = algorithms.filter(algo => 
    algo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    algo.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedAlgorithm = algorithms.find(a => a.id === algorithm);

  // Get detailed step explanation
  const getStepExplanation = (stepData, selectedAlgo) => {
    if (!stepData.operation) return '';
    
    const operation = stepData.operation.toLowerCase();
    
    if (operation.includes('bfs') || operation.includes('breadth')) {
      return `🌊 BFS: Exploring nodes level by level, ensuring all neighbors at current distance are visited before moving deeper.`;
    }
    if (operation.includes('dfs') || operation.includes('depth')) {
      return `🏃 DFS: Going as deep as possible in one direction before backtracking to explore other paths.`;
    }
    if (operation.includes('dijkstra') || operation.includes('shortest')) {
      return `🎯 Dijkstra: Finding the shortest path by always selecting the unvisited node with minimum distance.`;
    }
    if (operation.includes('visiting')) {
      return `👁️ Visiting: The algorithm is currently examining this node and processing its connections.`;
    }
    if (operation.includes('exploring')) {
      return `🔍 Exploring: Discovering new nodes connected to the current node and adding them to the search frontier.`;
    }
    if (operation.includes('relaxed') || operation.includes('relax')) {
      return `📉 Relaxing: Found a shorter path to this node, updating its distance and parent pointer.`;
    }
    if (operation.includes('mst') || operation.includes('spanning')) {
      return `🌳 MST: Building the minimum spanning tree by selecting edges that connect components without cycles.`;
    }
    if (operation.includes('complete')) {
      return `✅ Complete: The algorithm has finished! All reachable nodes have been processed.`;
    }
    if (operation.includes('start')) {
      return `🚀 Starting: The graph algorithm is beginning from the selected starting node.`;
    }
    
    return `⚙️ Processing: The algorithm is performing graph operations to explore or analyze the structure.`;
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
  }, [currentStep, steps, selectedAlgorithm]);

  // Particle system
  useEffect(() => {
    if (!showParticles || !particleCanvasRef.current) return;

    const canvas = particleCanvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2
      });
    }

    const animate = () => {
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

      requestAnimationFrame(animate);
    };

    animate();
  }, [showParticles]);

  const executeAlgorithm = useCallback(async () => {
    try {
      setIsLoading(true);
      toast.loading('Executing algorithm...', {
        icon: '⚡',
        style: {
          borderRadius: '12px',
          background: darkMode ? '#1f2937' : '#333',
          color: '#fff',
          backdropFilter: 'blur(10px)',
        },
      });
      
      const graphData = {
        nodes: nodes,
        edges: edges,
        start_node: startNode,
        end_node: endNode
      };

      const response = await graphService.runAlgorithm(algorithm, graphData);
      
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
  }, [algorithm, nodes, edges, startNode, endNode, selectedAlgorithm, darkMode]);

  // ...existing functions (playPause, reset, stepForward, stepBackward, etc.)...
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

  const generateRandomGraph = () => {
    const nodeCount = Math.floor(Math.random() * 4) + 4; // 4-7 nodes
    const newNodes = Array.from({ length: nodeCount }, (_, i) => ({
      id: i,
      label: String.fromCharCode(65 + i), // A, B, C, etc.
      x: Math.random() * 400 + 100,
      y: Math.random() * 300 + 100
    }));

    const newEdges = [];
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (Math.random() < 0.4) { // 40% chance of edge
          newEdges.push({
            from_node: i,
            to: j,
            weight: Math.floor(Math.random() * 9) + 1,
            directed: false
          });
        }
      }
    }

    setNodes(newNodes);
    setEdges(newEdges);
    setStartNode(0);
    setEndNode(nodeCount - 1);
    reset();
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

  const currentStepData = steps[currentStep] || {
    visitedNodes: [],
    currentNodes: [],
    visitedEdges: [],
    currentEdges: [],
    distances: {},
    parents: {},
    operation: 'Ready to start'
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900' 
        : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
    }`}>
      {/* Particle Background */}
      {showParticles && (
        <canvas
          ref={particleCanvasRef}
          className="fixed inset-0 pointer-events-none z-0"
          style={{ opacity: darkMode ? 0.6 : 0.3 }}
        />
      )}

      <div className="relative z-10 max-w-7xl mx-auto p-4">
        {/* Enhanced Header */}
        <div className={`backdrop-blur-xl rounded-2xl shadow-2xl mb-8 overflow-hidden border ${
          darkMode 
            ? 'bg-gray-800/20 border-gray-700/50' 
            : 'bg-white/20 border-white/50'
        }`}>
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-6">
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <h1 className="text-4xl font-bold mb-2 text-white">
                  Graph Algorithm Visualizer
                </h1>
                <p className="text-blue-100">
                  Interactive graph algorithm visualization platform
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search algorithms..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`pl-10 pr-4 py-2 rounded-lg backdrop-blur-md border transition-all ${
                      darkMode 
                        ? 'bg-gray-800/50 border-gray-600 text-white' 
                        : 'bg-white/50 border-white/30 text-gray-800'
                    }`}
                  />
                </div>

                {/* Theme Toggle */}
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`p-3 rounded-lg backdrop-blur-md transition-all hover:scale-110 ${
                    darkMode 
                      ? 'bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30' 
                      : 'bg-gray-800/20 text-gray-600 hover:bg-gray-800/30'
                  }`}
                >
                  {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>

                {/* Algorithm Selector */}
                <button
                  onClick={() => setIsAlgorithmSelectorOpen(!isAlgorithmSelectorOpen)}
                  className="px-6 py-3 bg-white/20 backdrop-blur-md rounded-lg hover:bg-white/30 transition-all flex items-center space-x-2 border border-white/30"
                >
                  <Network className="h-5 w-5 text-white" />
                  <span className="text-white font-medium">{selectedAlgorithm?.name}</span>
                  {isAlgorithmSelectorOpen ? 
                    <ChevronUp className="h-4 w-4 text-white" /> : 
                    <ChevronDown className="h-4 w-4 text-white" />
                  }
                </button>

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="p-3 bg-white/20 backdrop-blur-md rounded-lg hover:bg-white/30 transition-all border border-white/30"
                  >
                    <User className="h-5 w-5 text-white" />
                  </button>
                  
                  {showUserMenu && (
                    <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-xl backdrop-blur-xl border z-50 ${
                      darkMode 
                        ? 'bg-gray-800/90 border-gray-700' 
                        : 'bg-white/90 border-gray-200'
                    }`}>
                      <div className="p-2">
                        <button 
                          onClick={() => setShowParticles(!showParticles)}
                          className={`w-full text-left px-3 py-2 rounded transition-colors ${
                            darkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-100 text-gray-800'
                          }`}
                        >
                          <Palette className="h-4 w-4 inline mr-2" />
                          {showParticles ? 'Hide' : 'Show'} Particles
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Algorithm Selector */}
          {isAlgorithmSelectorOpen && (
            <div className={`backdrop-blur-xl border-t transition-all duration-300 ${
              darkMode 
                ? 'bg-gray-800/40 border-gray-700/50' 
                : 'bg-white/40 border-white/50'
            }`}>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredAlgorithms.map((algo) => (
                    <div
                      key={algo.id}
                      className={`group p-4 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 border ${
                        algorithm === algo.id
                          ? `border-2 shadow-lg ${darkMode ? 'bg-gray-700/50' : 'bg-white/50'}`
                          : `border ${darkMode ? 'border-gray-600 bg-gray-800/30 hover:bg-gray-700/50' : 'border-white/30 bg-white/20 hover:bg-white/40'}`
                      }`}
                      style={{
                        boxShadow: algorithm === algo.id ? `0 0 20px ${algo.color}40` : 'none'
                      }}
                      onClick={() => {
                        setAlgorithm(algo.id);
                        setIsAlgorithmSelectorOpen(false);
                        reset();
                        toast.success(`Switched to ${algo.name}`, {
                          icon: '🔄',
                          style: {
                            borderRadius: '12px',
                            background: algo.color,
                            color: '#fff',
                            boxShadow: `0 0 20px ${algo.color}40`,
                          },
                        });
                      }}
                      onMouseEnter={() => setHoveredAlgorithm(algo.id)}
                      onMouseLeave={() => setHoveredAlgorithm(null)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                          {algo.name}
                        </div>
                        <div 
                          className="w-4 h-4 rounded-full shadow-lg transform group-hover:scale-125 transition-transform"
                          style={{ backgroundColor: algo.color }}
                        />
                      </div>
                      <div className={`text-sm mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {algo.description}
                      </div>
                      <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {algo.complexity}
                      </div>
                      
                      {hoveredAlgorithm === algo.id && (
                        <div className={`mt-2 text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'} animate-fade-in`}>
                          {algo.preview}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Graph Configuration & Controls */}
          <div className="space-y-6">
            <div className={`backdrop-blur-xl rounded-2xl shadow-2xl border overflow-hidden ${
              darkMode 
                ? 'bg-gray-800/20 border-gray-700/50' 
                : 'bg-white/20 border-white/50'
            }`}>
              <div className={`p-6 border-b ${darkMode ? 'border-gray-700/50' : 'border-white/50'}`}>
                <h3 className={`text-xl font-bold flex items-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  <Settings className="h-6 w-6 mr-3 text-blue-500" />
                  Graph Configuration & Controls
                </h3>
              </div>
              
              <div className="p-6 space-y-8">
                {/* Graph Configuration */}
                <div>
                  <h4 className={`text-lg font-semibold mb-4 flex items-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    <span className="w-3 h-3 bg-blue-500 rounded-full mr-3 animate-pulse"></span>
                    Graph Setup
                  </h4>
                  
                  <GraphInput
                    nodes={nodes}
                    edges={edges}
                    startNode={startNode}
                    endNode={endNode}
                    onNodesChange={setNodes}
                    onEdgesChange={setEdges}
                    onStartNodeChange={setStartNode}
                    onEndNodeChange={setEndNode}
                    onRandomize={generateRandomGraph}
                    darkMode={darkMode}
                  />
                </div>

                {/* Controls */}
                <div>
                  <h4 className={`text-lg font-semibold mb-4 flex items-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
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
                    darkMode={darkMode}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Graph Visualization */}
          <div className="space-y-6">
            <div className={`backdrop-blur-xl rounded-2xl shadow-2xl border overflow-hidden ${
              darkMode 
                ? 'bg-gray-800/20 border-gray-700/50' 
                : 'bg-white/20 border-white/50'
            }`}>
              <div className={`p-4 border-b ${darkMode ? 'border-gray-700/50' : 'border-white/50'}`}>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      {selectedAlgorithm?.name} Visualization
                    </h3>
                    <div className={`flex items-center space-x-4 text-sm mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      <span className="flex items-center space-x-1">
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                        <span>Step {currentStep + 1} of {steps.length || 1}</span>
                      </span>
                      <div className="flex items-center space-x-1">
                        <Network className="h-4 w-4 text-green-500" />
                        <span>Nodes: {nodes.length}</span>
                      </div>
                    </div>
                  </div>
                  <div 
                    className="px-4 py-2 rounded-full text-sm font-bold text-white shadow-lg"
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
                <GraphCanvas
                  ref={canvasRef}
                  nodes={nodes}
                  edges={edges}
                  stepData={currentStepData}
                  startNode={startNode}
                  endNode={endNode}
                  algorithm={algorithm}
                  darkMode={darkMode}
                />
              </div>
            </div>

            {/* Step Explanation */}
            <div className={`backdrop-blur-xl rounded-2xl shadow-2xl border overflow-hidden ${
              darkMode 
                ? 'bg-gray-800/20 border-gray-700/50' 
                : 'bg-white/20 border-white/50'
            }`}>
              <div className={`p-4 border-b ${darkMode ? 'border-gray-700/50' : 'border-white/50'}`}>
                <div className="flex justify-between items-center">
                  <h4 className={`text-lg font-bold flex items-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    <BookOpen className="h-5 w-5 mr-2 text-purple-500" />
                    Step Explanation
                  </h4>
                  <button
                    onClick={() => setShowDetailedLog(!showDetailedLog)}
                    className={`text-sm px-3 py-1 rounded transition-colors ${
                      darkMode 
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
                  darkMode ? 'bg-blue-900/20' : 'bg-blue-50'
                }`}>
                  <p className={`text-sm font-medium mb-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    Current Operation:
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {currentStepData.operation}
                  </p>
                </div>
                
                <div className={`p-4 rounded-lg border-l-4 border-purple-500 ${
                  darkMode ? 'bg-purple-900/20' : 'bg-purple-50'
                }`}>
                  <p className={`text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    What's Happening:
                  </p>
                  <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {typewriterText}
                    <span className="animate-blink">|</span>
                  </p>
                </div>

                {selectedAlgorithm && (
                  <div className={`p-4 rounded-lg border-l-4 border-green-500 ${
                    darkMode ? 'bg-green-900/20' : 'bg-green-50'
                  }`}>
                    <p className={`text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      Algorithm Info:
                    </p>
                    <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {selectedAlgorithm.explanation}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Panel - Analysis & Metrics */}
        <div className="mt-8 grid md:grid-cols-2 gap-8">
          <div className={`backdrop-blur-xl rounded-2xl shadow-2xl border overflow-hidden ${
            darkMode 
              ? 'bg-gray-800/20 border-gray-700/50' 
              : 'bg-white/20 border-white/50'
          }`}>
            <div className={`p-4 border-b ${darkMode ? 'border-gray-700/50' : 'border-white/50'}`}>
              <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Complexity Analysis
              </h3>
            </div>
            <div className="p-6">
              <ComplexityDisplay
                algorithm={selectedAlgorithm}
                currentData={currentStepData}
                steps={steps}
                darkMode={darkMode}
                enhanced={true}
              />
            </div>
          </div>

          <div className={`backdrop-blur-xl rounded-2xl shadow-2xl border overflow-hidden ${
            darkMode 
              ? 'bg-gray-800/20 border-gray-700/50' 
              : 'bg-white/20 border-white/50'
          }`}>
            <div className={`p-4 border-b ${darkMode ? 'border-gray-700/50' : 'border-white/50'}`}>
              <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Graph Metrics
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-6">
                <div className={`p-6 rounded-xl text-center transform hover:scale-105 transition-all ${
                  darkMode ? 'bg-blue-900/30' : 'bg-blue-50'
                }`}>
                  <div className="text-3xl font-bold text-blue-600">
                    {nodes.length}
                  </div>
                  <div className={`text-sm ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                    Vertices
                  </div>
                </div>
                <div className={`p-6 rounded-xl text-center transform hover:scale-105 transition-all ${
                  darkMode ? 'bg-green-900/30' : 'bg-green-50'
                }`}>
                  <div className="text-3xl font-bold text-green-600">
                    {edges.length}
                  </div>
                  <div className={`text-sm ${darkMode ? 'text-green-300' : 'text-green-600'}`}>
                    Edges
                  </div>
                </div>
                <div className={`p-6 rounded-xl text-center transform hover:scale-105 transition-all ${
                  darkMode ? 'bg-purple-900/30' : 'bg-purple-50'
                }`}>
                  <div className="text-3xl font-bold text-purple-600">
                    {steps.length}
                  </div>
                  <div className={`text-sm ${darkMode ? 'text-purple-300' : 'text-purple-600'}`}>
                    Total Steps
                  </div>
                </div>
                <div className={`p-6 rounded-xl text-center transform hover:scale-105 transition-all ${
                  darkMode ? 'bg-orange-900/30' : 'bg-orange-50'
                }`}>
                  <div className="text-3xl font-bold text-orange-600">
                    {steps.length > 0 ? Math.round((currentStep / (steps.length - 1)) * 100) : 0}%
                  </div>
                  <div className={`text-sm ${darkMode ? 'text-orange-300' : 'text-orange-600'}`}>
                    Progress
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
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
      `}</style>
    </div>
  );
};

export default GraphVisualizer;
