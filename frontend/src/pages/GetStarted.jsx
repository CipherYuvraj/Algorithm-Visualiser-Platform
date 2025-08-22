import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, BarChart3, Network, Code, Zap, CheckCircle } from 'lucide-react';

const GetStarted = ({ darkMode }) => {
  const steps = [
    {
      number: '01',
      title: 'Choose an Algorithm Category',
      description: 'Start with sorting algorithms if you\'re new to algorithm visualization.',
      action: 'Browse Categories',
      link: '/'
    },
    {
      number: '02',
      title: 'Configure Your Data',
      description: 'Set up your array, graph, or input data using our intuitive controls.',
      action: 'Try Sorting',
      link: '/sorting'
    },
    {
      number: '03',
      title: 'Watch & Learn',
      description: 'Use playback controls to step through the algorithm at your own pace.',
      action: 'Explore Graphs',
      link: '/graph'
    },
    {
      number: '04',
      title: 'Analyze & Understand',
      description: 'Review complexity analysis and detailed step explanations.',
      action: 'Read Docs',
      link: '/docs'
    }
  ];

  const features = [
    {
      icon: BarChart3,
      title: 'Sorting Algorithms',
      description: 'Bubble, Merge, Quick, Heap, and Counting sort with step-by-step visualization.',
      algorithms: ['Bubble Sort', 'Merge Sort', 'Quick Sort', 'Heap Sort', 'Counting Sort'],
      link: '/sorting'
    },
    {
      icon: Network,
      title: 'Graph Algorithms',
      description: 'BFS, DFS, Dijkstra, A*, and MST algorithms with interactive graph editing.',
      algorithms: ['Breadth-First Search', 'Depth-First Search', 'Dijkstra\'s Algorithm', 'A* Search', 'Kruskal\'s MST'],
      link: '/graph'
    },
    {
      icon: Code,
      title: 'String Algorithms',
      description: 'Pattern matching and text processing algorithms (coming soon).',
      algorithms: ['KMP Algorithm', 'Boyer-Moore', 'Rabin-Karp', 'Longest Common Subsequence'],
      link: '/string',
      comingSoon: true
    },
    {
      icon: Zap,
      title: 'Dynamic Programming',
      description: 'Optimization problems and DP solutions (coming soon).',
      algorithms: ['Fibonacci', 'Knapsack Problem', 'Longest Path', 'Edit Distance'],
      link: '/dp',
      comingSoon: true
    }
  ];

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900' 
        : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className={`text-4xl font-bold mb-6 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Get Started with Algorithm Visualizer Pro
          </h1>
          <p className={`text-xl mb-8 max-w-3xl mx-auto ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Your journey to mastering algorithms starts here. Follow these simple steps to begin exploring 
            interactive algorithm visualizations.
          </p>
          <Link
            to="/sorting"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
          >
            <Play className="mr-2 h-5 w-5" />
            Start Your First Visualization
          </Link>
        </div>

        {/* Steps */}
        <div className="mb-16">
          <h2 className={`text-3xl font-bold text-center mb-12 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            How It Works
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`
                  relative p-6 rounded-2xl backdrop-blur-xl border transition-all duration-300 
                  transform hover:scale-105
                  ${darkMode 
                    ? 'bg-gray-800/20 border-gray-700/50' 
                    : 'bg-white/20 border-white/50'
                  }
                `}
              >
                <div className={`
                  text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 
                  bg-clip-text text-transparent
                `}>
                  {step.number}
                </div>
                <h3 className={`text-lg font-semibold mb-3 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {step.title}
                </h3>
                <p className={`text-sm mb-4 ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {step.description}
                </p>
                <Link
                  to={step.link}
                  className={`
                    inline-flex items-center text-sm font-medium transition-colors
                    ${darkMode 
                      ? 'text-blue-400 hover:text-blue-300' 
                      : 'text-blue-600 hover:text-blue-700'
                    }
                  `}
                >
                  {step.action}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Algorithm Categories */}
        <div className="mb-16">
          <h2 className={`text-3xl font-bold text-center mb-12 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Available Algorithm Categories
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`
                  p-6 rounded-2xl backdrop-blur-xl border transition-all duration-300 
                  ${feature.comingSoon ? 'opacity-75' : 'transform hover:scale-105'}
                  ${darkMode 
                    ? 'bg-gray-800/20 border-gray-700/50' 
                    : 'bg-white/20 border-white/50'
                  }
                `}
              >
                <div className="flex items-start space-x-4 mb-4">
                  <div className={`
                    w-12 h-12 rounded-lg flex items-center justify-center
                    ${feature.comingSoon 
                      ? 'bg-gray-500' 
                      : 'bg-gradient-to-r from-blue-500 to-purple-600'
                    }
                  `}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className={`text-xl font-semibold ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {feature.title}
                      </h3>
                      {feature.comingSoon && (
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          darkMode ? 'bg-yellow-900/50 text-yellow-300' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          Coming Soon
                        </span>
                      )}
                    </div>
                    <p className={`text-sm mb-4 ${
                      darkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {feature.description}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  {feature.algorithms.map((algo, algoIndex) => (
                    <div key={algoIndex} className="flex items-center space-x-2">
                      <CheckCircle className={`h-4 w-4 ${
                        feature.comingSoon 
                          ? (darkMode ? 'text-gray-500' : 'text-gray-400')
                          : (darkMode ? 'text-green-400' : 'text-green-500')
                      }`} />
                      <span className={`text-sm ${
                        darkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {algo}
                      </span>
                    </div>
                  ))}
                </div>
                
                {!feature.comingSoon && (
                  <Link
                    to={feature.link}
                    className={`
                      inline-flex items-center px-4 py-2 rounded-lg font-medium
                      transition-all duration-200 transform hover:scale-105
                      ${darkMode 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                      }
                    `}
                  >
                    Explore {feature.title}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className={`
          text-center p-8 rounded-2xl backdrop-blur-xl border
          ${darkMode 
            ? 'bg-gray-800/20 border-gray-700/50' 
            : 'bg-white/20 border-white/50'
          }
        `}>
          <h2 className={`text-2xl font-bold mb-4 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Ready to Start Learning?
          </h2>
          <p className={`text-lg mb-6 ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Choose your first algorithm to visualize and begin your journey into the world of algorithms.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/sorting"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105"
            >
              <BarChart3 className="mr-2 h-5 w-5" />
              Try Sorting Algorithms
            </Link>
            <Link
              to="/graph"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-medium rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 transform hover:scale-105"
            >
              <Network className="mr-2 h-5 w-5" />
              Explore Graph Algorithms
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
