import React, { useState } from 'react';
import { Book, Code, Play, Settings, ChevronRight, ChevronDown, ExternalLink, Copy, Check } from 'lucide-react';

const DocumentationPage = ({ darkMode, setDarkMode }) => {
  const [expandedSections, setExpandedSections] = useState({});
  const [copiedCode, setCopiedCode] = useState('');

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const copyToClipboard = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  const algorithms = {
    sorting: [
      { name: 'Bubble Sort', complexity: 'O(n²)', description: 'Simple comparison-based sorting algorithm' },
      { name: 'Quick Sort', complexity: 'O(n log n)', description: 'Efficient divide-and-conquer sorting' },
      { name: 'Merge Sort', complexity: 'O(n log n)', description: 'Stable divide-and-conquer sorting' },
      { name: 'Heap Sort', complexity: 'O(n log n)', description: 'In-place comparison-based sorting' },
    ],
    graph: [
      { name: 'BFS', complexity: 'O(V + E)', description: 'Breadth-first graph traversal' },
      { name: 'DFS', complexity: 'O(V + E)', description: 'Depth-first graph traversal' },
      { name: "Dijkstra's", complexity: 'O(V²)', description: 'Shortest path algorithm' },
      { name: "Kruskal's MST", complexity: 'O(E log E)', description: 'Minimum spanning tree' },
    ]
  };

  const codeExamples = {
    bubbleSort: `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`,
    bfs: `function bfs(graph, startNode) {
  const visited = new Set();
  const queue = [startNode];
  const result = [];
  
  while (queue.length > 0) {
    const node = queue.shift();
    if (!visited.has(node)) {
      visited.add(node);
      result.push(node);
      
      for (const neighbor of graph[node]) {
        if (!visited.has(neighbor)) {
          queue.push(neighbor);
        }
      }
    }
  }
  
  return result;
}`
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900' 
        : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header */}
        <div className={`text-center mb-12 p-8 rounded-2xl backdrop-blur-xl ${
          darkMode 
            ? 'bg-gray-800/20 border-gray-700/50' 
            : 'bg-white/20 border-white/50'
        } border`}>
          <h1 className={`text-5xl font-bold mb-6 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Documentation
          </h1>
          <p className={`text-xl max-w-3xl mx-auto ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Complete guide to using Algorithm Visualizer Pro, understanding algorithms, and implementation examples.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Table of Contents */}
          <div className={`lg:col-span-1 p-6 rounded-2xl backdrop-blur-xl ${
            darkMode 
              ? 'bg-gray-800/20 border-gray-700/50' 
              : 'bg-white/20 border-white/50'
          } border h-fit sticky top-24`}>
            <h3 className={`text-lg font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Table of Contents
            </h3>
            <nav className="space-y-2">
              {[
                { id: 'getting-started', title: 'Getting Started' },
                { id: 'algorithms', title: 'Algorithms' },
                { id: 'features', title: 'Features' },
                { id: 'examples', title: 'Code Examples' },
                { id: 'api', title: 'API Reference' },
                { id: 'contributing', title: 'Contributing' }
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                    darkMode 
                      ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {item.title}
                </a>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            
            {/* Getting Started */}
            <section id="getting-started" className={`p-8 rounded-2xl backdrop-blur-xl ${
              darkMode 
                ? 'bg-gray-800/20 border-gray-700/50' 
                : 'bg-white/20 border-white/50'
            } border`}>
              <h2 className={`text-3xl font-bold mb-6 flex items-center ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                <Play className="h-8 w-8 mr-3 text-green-500" />
                Getting Started
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className={`text-xl font-semibold mb-3 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    How to Use
                  </h3>
                  <ol className={`list-decimal list-inside space-y-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    <li>Choose an algorithm category from the navigation menu</li>
                    <li>Select a specific algorithm from the dropdown</li>
                    <li>Configure input data (array for sorting, graph for graph algorithms)</li>
                    <li>Click the play button to start visualization</li>
                    <li>Use controls to pause, step through, or adjust speed</li>
                  </ol>
                </div>
                
                <div>
                  <h3 className={`text-xl font-semibold mb-3 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Controls
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { icon: Play, name: 'Play/Pause', desc: 'Start or pause algorithm execution' },
                      { icon: Settings, name: 'Speed Control', desc: 'Adjust visualization speed' },
                      { icon: Code, name: 'Step Mode', desc: 'Execute one step at a time' },
                      { icon: Book, name: 'Reset', desc: 'Reset to initial state' }
                    ].map((control, index) => (
                      <div key={index} className={`p-4 rounded-lg ${
                        darkMode ? 'bg-gray-700/30' : 'bg-white/30'
                      }`}>
                        <div className="flex items-center mb-2">
                          <control.icon className="h-5 w-5 mr-2 text-blue-500" />
                          <span className={`font-medium ${
                            darkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            {control.name}
                          </span>
                        </div>
                        <p className={`text-sm ${
                          darkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          {control.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Algorithms */}
            <section id="algorithms" className={`p-8 rounded-2xl backdrop-blur-xl ${
              darkMode 
                ? 'bg-gray-800/20 border-gray-700/50' 
                : 'bg-white/20 border-white/50'
            } border`}>
              <h2 className={`text-3xl font-bold mb-6 flex items-center ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                <Code className="h-8 w-8 mr-3 text-blue-500" />
                Supported Algorithms
              </h2>
              
              {Object.entries(algorithms).map(([category, algos]) => (
                <div key={category} className="mb-6">
                  <button
                    onClick={() => toggleSection(category)}
                    className={`w-full flex items-center justify-between p-4 rounded-lg ${
                      darkMode ? 'bg-gray-700/30 hover:bg-gray-700/50' : 'bg-white/30 hover:bg-white/50'
                    } transition-colors`}
                  >
                    <h3 className={`text-xl font-semibold capitalize ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {category} Algorithms
                    </h3>
                    {expandedSections[category] ? 
                      <ChevronDown className="h-5 w-5" /> : 
                      <ChevronRight className="h-5 w-5" />
                    }
                  </button>
                  
                  {expandedSections[category] && (
                    <div className="mt-4 grid md:grid-cols-2 gap-4">
                      {algos.map((algo, index) => (
                        <div key={index} className={`p-4 rounded-lg border ${
                          darkMode 
                            ? 'bg-gray-800/30 border-gray-600' 
                            : 'bg-white/50 border-gray-200'
                        }`}>
                          <div className="flex justify-between items-start mb-2">
                            <h4 className={`font-semibold ${
                              darkMode ? 'text-white' : 'text-gray-900'
                            }`}>
                              {algo.name}
                            </h4>
                            <span className={`text-xs px-2 py-1 rounded ${
                              darkMode ? 'bg-blue-600' : 'bg-blue-100 text-blue-800'
                            }`}>
                              {algo.complexity}
                            </span>
                          </div>
                          <p className={`text-sm ${
                            darkMode ? 'text-gray-300' : 'text-gray-600'
                          }`}>
                            {algo.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </section>

            {/* Code Examples */}
            <section id="examples" className={`p-8 rounded-2xl backdrop-blur-xl ${
              darkMode 
                ? 'bg-gray-800/20 border-gray-700/50' 
                : 'bg-white/20 border-white/50'
            } border`}>
              <h2 className={`text-3xl font-bold mb-6 flex items-center ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                <Book className="h-8 w-8 mr-3 text-purple-500" />
                Code Examples
              </h2>
              
              {Object.entries(codeExamples).map(([key, code]) => (
                <div key={key} className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className={`text-lg font-semibold ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {key === 'bubbleSort' ? 'Bubble Sort' : 'Breadth-First Search'}
                    </h3>
                    <button
                      onClick={() => copyToClipboard(code, key)}
                      className={`flex items-center px-3 py-1 rounded-lg text-sm transition-colors ${
                        darkMode 
                          ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                      }`}
                    >
                      {copiedCode === key ? (
                        <>
                          <Check className="h-4 w-4 mr-1" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-1" />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                  <div className={`rounded-lg overflow-hidden ${
                    darkMode ? 'bg-gray-900' : 'bg-gray-100'
                  }`}>
                    <pre className={`p-4 text-sm overflow-x-auto ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      <code>{code}</code>
                    </pre>
                  </div>
                </div>
              ))}
            </section>

            {/* API Reference */}
            <section id="api" className={`p-8 rounded-2xl backdrop-blur-xl ${
              darkMode 
                ? 'bg-gray-800/20 border-gray-700/50' 
                : 'bg-white/20 border-white/50'
            } border`}>
              <h2 className={`text-3xl font-bold mb-6 flex items-center ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                <ExternalLink className="h-8 w-8 mr-3 text-orange-500" />
                API Reference
              </h2>
              <div className="space-y-4">
                <div className={`p-4 rounded-lg ${
                  darkMode ? 'bg-gray-700/30' : 'bg-white/30'
                }`}>
                  <h3 className={`font-semibold mb-2 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Sorting Algorithms
                  </h3>
                  <code className={`text-sm ${
                    darkMode ? 'text-green-400' : 'text-green-600'
                  }`}>
                    POST /api/sorting/{algorithms}
                  </code>
                  <p className={`text-sm mt-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Execute sorting algorithm with provided array data
                  </p>
                </div>
                
                <div className={`p-4 rounded-lg ${
                  darkMode ? 'bg-gray-700/30' : 'bg-white/30'
                }`}>
                  <h3 className={`font-semibold mb-2 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Graph Algorithms
                  </h3>
                  <code className={`text-sm ${
                    darkMode ? 'text-green-400' : 'text-green-600'
                  }`}>
                    POST /api/graph/{algorithms}
                  </code>
                  <p className={`text-sm mt-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Execute graph algorithm with nodes and edges data
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentationPage;
