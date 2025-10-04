import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Play, 
  BarChart3, 
  Network, 
  Type, 
  Grid3X3, 
  Clock,
  Zap,
  Eye,
  Code
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Home = () => {
  const { isDark, classes, getThemedGradient } = useTheme();
  const features = [
    {
      icon: Eye,
      title: 'Interactive Visualizations',
      description: 'Watch algorithms execute step-by-step with beautiful animations and real-time updates.'
    },
    {
      icon: Zap,
      title: 'High Performance',
      description: 'C++ backend ensures fast execution even for large datasets and complex algorithms.'
    },
    {
      icon: Code,
      title: 'Educational Focus',
      description: 'Perfect for learning DSA concepts with detailed explanations and complexity analysis.'
    },
    {
      icon: Clock,
      title: 'Performance Analysis',
      description: 'Compare algorithms side-by-side and analyze time/space complexity patterns.'
    }
  ];

  const algorithmCategories = [
    {
      title: 'Sorting Algorithms',
      icon: BarChart3,
      path: '/sorting',
      color: 'bg-blue-500',
      algorithms: ['Bubble Sort', 'Merge Sort', 'Quick Sort', 'Heap Sort', 'Counting Sort'],
      description: 'Visualize how different sorting algorithms organize data'
    },
    {
      title: 'Graph Algorithms',
      icon: Network,
      path: '/graph',
      color: 'bg-green-500',
      algorithms: ['BFS', 'DFS', 'Dijkstra', 'A*', 'Kruskal', 'Prim'],
      description: 'Explore graph traversal and shortest path algorithms'
    },
    {
      title: 'String Algorithms',
      icon: Type,
      path: '/string',
      color: 'bg-purple-500',
      algorithms: ['KMP', 'Rabin-Karp', 'Z-Algorithm'],
      description: 'Pattern matching and string processing techniques'
    },
    {
      title: 'Dynamic Programming',
      icon: Grid3X3,
      path: '/dp',
      color: 'bg-orange-500',
      algorithms: ['LCS', 'Knapsack', 'Coin Change'],
      description: 'Optimization problems with memoization strategies'
    }
  ];

  return (
    <div className={`min-h-screen transition-all duration-500 ${classes.bgGradient}`}>
      <div className="max-w-7xl md:mx-auto mx-4">
      {/* Hero Section */}
      <div className="text-center py-16">
        <h1 className={`text-3xl md:text-6xl font-bold ${classes.textPrimary} mb-6`}>
          Algorithm <span className="text-blue-600">Visualizer</span>
        </h1>
        <p className={`text-lg ${classes.textSecondary} mb-8 md:max-w-3xl max-w-80 mx-auto`}>
          An interactive platform to learn, visualize, and analyze data structures and algorithms. 
          Built with C++ performance and modern web technologies.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:mx-0 mx-4">
          <Link
            to="/sorting"
            className={`inline-flex items-center px-6 py-3 font-semibold rounded-lg transition-colors shadow-medium ${
              isDark
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            <Play className="h-5 w-5 mr-2" />
            Start Visualizing
          </Link>
          <Link
            to="/performance"
            className={`inline-flex items-center px-6 py-3 ${
              isDark 
                ? 'bg-gray-800 text-blue-400 border-blue-500 hover:bg-gray-700' 
                : 'bg-white text-blue-600 border-blue-600 hover:bg-blue-50'
            } font-semibold rounded-lg border-2 transition-colors shadow-medium`}
          >
            View Performance Analysis
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-16">
        <h2 className={`text-3xl font-bold text-center ${classes.textPrimary} mb-12`}>
          Why Choose Our Platform?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className={`text-center p-6 ${classes.cardBg} border rounded-xl shadow-soft hover:shadow-medium transition-shadow`}>
                <div className={`${
                  isDark ? 'bg-blue-900/40' : 'bg-blue-100'
                } w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <Icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className={`text-lg font-semibold ${classes.textPrimary} mb-2`}>
                  {feature.title}
                </h3>
                <p className={classes.textSecondary}>
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Algorithm Categories */}
      <section className="py-16">
        <h2 className={`text-3xl font-bold text-center ${classes.textPrimary} mb-12`}>
          Explore Algorithm Categories
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {algorithmCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Link
                key={index}
                to={category.path}
                className={`${classes.cardBg} rounded-xl shadow-soft hover:shadow-strong transition-all duration-300 p-6 group border`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`${category.color} p-3 rounded-lg group-hover:scale-110 transition-transform`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-xl font-semibold ${classes.textPrimary} mb-2 group-hover:text-blue-600 transition-colors`}>
                      {category.title}
                    </h3>
                    <p className={`${classes.textSecondary} mb-4`}>
                      {category.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {category.algorithms.map((algo) => (
                        <span 
                          key={algo}
                          className={`px-3 py-1 ${
                            isDark 
                              ? 'bg-gray-700 text-gray-200' 
                              : 'bg-gray-100 text-gray-700'
                          } text-sm rounded-full`}
                        >
                          {algo}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Quick Start Section */}
      <section 
        className={`py-16 rounded-2xl text-center transition-all duration-300 ${
          isDark 
            ? 'bg-gradient-to-r from-blue-900 to-purple-900 text-white' 
            : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'
        }`}
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Ready to Start Learning?
        </h2>
        <p className={`md:text-xl text-lg mb-8 max-w-2xl md:mx-auto mx-6 ${
          isDark ? 'text-blue-100' : 'text-blue-50'
        }`}>
          Choose an algorithm category and start visualizing. No setup required - just click and learn!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:mx-0 mx-4">
          <Link
            to="/sorting"
            className={`inline-flex items-center px-6 py-3 font-semibold rounded-lg transition-colors shadow-lg ${
              isDark 
                ? 'bg-white text-blue-900 hover:bg-blue-50' 
                : 'bg-white text-blue-700 hover:bg-blue-50 border border-white/30'
            }`}
          >
            Try Sorting Algorithms
          </Link>
          <Link
            to="/graph"
            className={`inline-flex items-center px-6 py-3 font-semibold rounded-lg transition-colors border shadow-lg ${
              isDark 
                ? 'bg-blue-800 text-white hover:bg-blue-700 border-blue-400' 
                : 'bg-blue-700 text-white hover:bg-blue-800 border-blue-400'
            }`}
          >
            Explore Graph Algorithms
          </Link>
        </div>
      </section>
      </div>
    </div>
  );
};

export default Home;
