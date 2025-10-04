import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Network, Code, Zap, ArrowRight } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Dashboard = () => {
  const { theme, isDark, getThemedGradient } = useTheme();
  
  const features = [
    {
      icon: BarChart3,
      title: 'Sorting Algorithms',
      description: 'Visualize bubble sort, merge sort, quick sort, and more with step-by-step animations.',
      path: '/sorting',
      color: 'from-blue-500 to-blue-600',
      bgColor: isDark ? 'from-blue-600/20 to-blue-700/20' : 'from-blue-50 to-blue-100'
    },
    {
      icon: Network,
      title: 'Graph Algorithms',
      description: 'Explore BFS, DFS, Dijkstra, and other graph traversal algorithms interactively.',
      path: '/graph',
      color: 'from-green-500 to-green-600',
      bgColor: isDark ? 'from-green-600/20 to-green-700/20' : 'from-green-50 to-green-100'
    },
    {
      icon: Code,
      title: 'String Algorithms',
      description: 'Learn pattern matching, string searching, and text processing algorithms.',
      path: '/string',
      color: 'from-purple-500 to-purple-600',
      bgColor: isDark ? 'from-purple-600/20 to-purple-700/20' : 'from-purple-50 to-purple-100'
    },
    {
      icon: Zap,
      title: 'Dynamic Programming',
      description: 'Master optimization problems with interactive DP algorithm visualizations.',
      path: '/dp',
      color: 'from-orange-500 to-orange-600',
      bgColor: isDark ? 'from-orange-600/20 to-orange-700/20' : 'from-orange-50 to-orange-100'
    }
  ];

  return (
    <div className={`min-h-screen transition-all duration-500 ${theme === 'dark' ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'}`}>
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className={`text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}>
            Algorithm Visualizer Pro
          </h1>
          <p className={`text-xl mb-8 max-w-3xl mx-auto leading-relaxed ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Learn algorithms through interactive visualizations. 
            Watch how sorting, graph, and other algorithms work step by step.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/sorting"
              className={`
                inline-flex items-center px-6 py-3 text-white font-medium rounded-lg 
                bg-gradient-to-r from-blue-600 to-purple-600 
                hover:from-blue-700 hover:to-purple-700 
                transition-all duration-200 transform hover:scale-105
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                shadow-lg hover:shadow-xl group
                ${isDark ? 'focus:ring-offset-gray-900' : 'focus:ring-offset-white'}
              `}
            >
              Start Visualizing
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/docs"
              className={`
                inline-flex items-center px-6 py-3 font-medium rounded-lg border
                transition-all duration-200 transform hover:scale-105
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                ${isDark 
                  ? 'text-gray-300 bg-gray-800 hover:bg-gray-700 border-gray-700 focus:ring-offset-gray-900' 
                  : 'text-gray-700 bg-white hover:bg-gray-50 border-gray-300 focus:ring-offset-white'
                }
              `}
            >
              View Documentation
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Link
              key={index}
              to={feature.path}
              className={`
                group p-6 rounded-2xl backdrop-blur-xl border transition-all duration-300 
                transform hover:scale-105 hover:shadow-2xl relative overflow-hidden
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                ${isDark 
                  ? 'bg-gray-800/20 border-gray-700/50 hover:bg-gray-800/30 focus:ring-offset-gray-900' 
                  : 'bg-white/20 border-white/50 hover:bg-white/30 focus:ring-offset-white'
                }
              `}
            >
              {/* Background gradient overlay */}
              <div 
                className={`absolute inset-0 bg-gradient-to-br ${feature.bgColor} opacity-0 group-hover:opacity-30 transition-opacity duration-300`}
              />
              
              {/* Content */}
              <div className="relative z-10">
                <div className={`
                  w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} 
                  flex items-center justify-center mb-4 
                  group-hover:scale-110 transition-all duration-300
                  shadow-md group-hover:shadow-lg
                `}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className={`text-lg font-semibold mb-2 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {feature.title}
                </h3>
                <p className={`text-sm mb-4 leading-relaxed ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {feature.description}
                </p>
                <div className={`
                  flex items-center text-sm font-medium transition-all duration-200
                  ${isDark ? 'text-blue-400 group-hover:text-blue-300' : 'text-blue-600 group-hover:text-blue-700'}
                `}>
                  <span>Explore</span>
                  <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Stats Section */}
        <div className={`
          p-8 rounded-2xl backdrop-blur-xl border text-center transition-all duration-300
          ${isDark 
            ? 'bg-gray-800/20 border-gray-700/50' 
            : 'bg-white/20 border-white/50'
          }
        `}>
          <h2 className={`text-3xl font-bold mb-8 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Learn by Doing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <div className={`text-4xl font-bold ${
                isDark ? 'text-blue-400' : 'text-blue-600'
              }`}>
                15+
              </div>
              <div className={`text-sm ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Sorting Algorithms
              </div>
            </div>
            <div className="space-y-2">
              <div className={`text-4xl font-bold ${
                isDark ? 'text-green-400' : 'text-green-600'
              }`}>
                10+
              </div>
              <div className={`text-sm ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Graph Algorithms
              </div>
            </div>
            <div className="space-y-2">
              <div className={`text-4xl font-bold ${
                isDark ? 'text-purple-400' : 'text-purple-600'
              }`}>
                8+
              </div>
              <div className={`text-sm ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                String Algorithms
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
