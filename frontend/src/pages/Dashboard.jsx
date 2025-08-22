import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Network, Code, Zap, ArrowRight } from 'lucide-react';

const Dashboard = ({ darkMode }) => {
  const features = [
    {
      icon: BarChart3,
      title: 'Sorting Algorithms',
      description: 'Visualize bubble sort, merge sort, quick sort, and more with step-by-step animations.',
      path: '/sorting',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Network,
      title: 'Graph Algorithms',
      description: 'Explore BFS, DFS, Dijkstra, and other graph traversal algorithms interactively.',
      path: '/graph',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Code,
      title: 'String Algorithms',
      description: 'Learn pattern matching, string searching, and text processing algorithms.',
      path: '/string',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Zap,
      title: 'Dynamic Programming',
      description: 'Master optimization problems with interactive DP algorithm visualizations.',
      path: '/dp',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900' 
        : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className={`text-5xl font-bold mb-6 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Algorithm Visualizer Pro
          </h1>
          <p className={`text-xl mb-8 max-w-3xl mx-auto ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Learn algorithms through interactive visualizations. 
            Watch how sorting, graph, and other algorithms work step by step.
          </p>
          <Link
            to="/sorting"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
          >
            Start Visualizing
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Link
              key={index}
              to={feature.path}
              className={`
                group p-6 rounded-2xl backdrop-blur-xl border transition-all duration-300 
                transform hover:scale-105 hover:shadow-2xl
                ${darkMode 
                  ? 'bg-gray-800/20 border-gray-700/50 hover:bg-gray-800/30' 
                  : 'bg-white/20 border-white/50 hover:bg-white/30'
                }
              `}
            >
              <div className={`
                w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} 
                flex items-center justify-center mb-4 group-hover:scale-110 transition-transform
              `}>
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className={`text-lg font-semibold mb-2 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {feature.title}
              </h3>
              <p className={`text-sm ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {feature.description}
              </p>
              <div className="mt-4 flex items-center text-blue-500 group-hover:text-blue-400">
                <span className="text-sm font-medium">Explore</span>
                <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
