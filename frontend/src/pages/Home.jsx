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

const Home = () => {
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
    <div className="max-w-7xl md:mx-auto mx-4">
      {/* Hero Section */}
      <div className="text-center py-12">
        <h1 className="text-3xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          Algorithm <span className="text-primary-600">Visualizer</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 md:max-w-3xl max-w-80 mx-auto">
          An interactive platform to learn, visualize, and analyze data structures and algorithms. 
          Built with C++ performance and modern web technologies.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:mx-0 mx-4">
          <Link
            to="/sorting"
            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors shadow-medium"
          >
            <Play className="h-5 w-5 mr-2" />
            Start Visualizing
          </Link>
          <Link
            to="/performance"
            className="inline-flex items-center px-6 py-3 bg-white dark:bg-gray-100 text-primary-600 dark:text-primary-700 font-semibold rounded-lg border-2 border-primary-600 hover:bg-primary-50 dark:hover:bg-gray-200 transition-colors"
          >
            View Performance Analysis
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Why Choose Our Platform?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-soft hover:shadow-medium transition-shadow">
                <div className="bg-primary-100 dark:bg-primary-900/40 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Algorithm Categories */}
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Explore Algorithm Categories
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {algorithmCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Link
                key={index}
                to={category.path}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-soft hover:shadow-strong transition-all duration-300 p-6 group"
              >
                <div className="flex items-start space-x-4">
                  <div className={`${category.color} p-3 rounded-lg group-hover:scale-110 transition-transform`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {category.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {category.algorithms.map((algo) => (
                        <span 
                          key={algo}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm rounded-full"
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
      <section className="py-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl text-white text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Ready to Start Learning?
        </h2>
        <p className="md:text-xl text-lg text-primary-100 mb-8 max-w-2xl md:mx-auto mx-6">
          Choose an algorithm category and start visualizing. No setup required - just click and learn!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:mx-0 mx-4">
          <Link
            to="/sorting"
            className="inline-flex items-center px-6 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-primary-50 transition-colors"
          >
            Try Sorting Algorithms
          </Link>
          <Link
            to="/graph"
            className="inline-flex items-center px-6 py-3 bg-primary-700 text-white font-semibold rounded-lg hover:bg-primary-800 transition-colors border border-primary-400"
          >
            Explore Graph Algorithms
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
