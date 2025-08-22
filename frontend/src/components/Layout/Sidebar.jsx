import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  BarChart3, 
  Network, 
  Type, 
  Grid3X3, 
  TrendingUp,
  ChevronRight
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      title: 'Home',
      path: '/',
      icon: Home,
      description: 'Dashboard & Overview'
    },
    {
      title: 'Sorting Algorithms',
      path: '/sorting',
      icon: BarChart3,
      description: 'Bubble, Merge, Quick, Heap, Counting',
      algorithms: ['Bubble Sort', 'Merge Sort', 'Quick Sort', 'Heap Sort', 'Counting Sort']
    },
    {
      title: 'Graph Algorithms',
      path: '/graph',
      icon: Network,
      description: 'BFS, DFS, Dijkstra, A*, MST',
      algorithms: ['BFS', 'DFS', 'Dijkstra', 'A*', 'Kruskal', 'Prim']
    },
    {
      title: 'String Algorithms',
      path: '/string',
      icon: Type,
      description: 'Pattern Matching & Processing',
      algorithms: ['KMP', 'Rabin-Karp', 'Z-Algorithm']
    },
    {
      title: 'Dynamic Programming',
      path: '/dp',
      icon: Grid3X3,
      description: 'Optimization Problems',
      algorithms: ['LCS', 'Knapsack', 'Coin Change']
    },
    {
      title: 'Performance Analysis',
      path: '/performance',
      icon: TrendingUp,
      description: 'Compare & Analyze'
    }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="fixed left-0 top-16 h-full w-64 bg-white border-r border-gray-200 shadow-soft overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Algorithm Categories
        </h2>
        
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <div key={item.path}>
                <Link
                  to={item.path}
                  className={`
                    flex items-center p-3 rounded-lg transition-all duration-200 group
                    ${active 
                      ? 'bg-primary-50 text-primary-700 border border-primary-200' 
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                >
                  <Icon className={`h-5 w-5 mr-3 ${active ? 'text-primary-600' : 'text-gray-500'}`} />
                  <div className="flex-1">
                    <div className="font-medium">{item.title}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {item.description}
                    </div>
                  </div>
                  <ChevronRight className={`h-4 w-4 transition-transform ${active ? 'rotate-90' : ''}`} />
                </Link>
                
                {/* Algorithm List - Show when active */}
                {active && item.algorithms && (
                  <div className="ml-8 mt-2 space-y-1 animate-slide-in">
                    {item.algorithms.map((algo) => (
                      <div 
                        key={algo}
                        className="text-sm text-gray-600 py-1 px-2 rounded hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        {algo}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Algorithm Stats */}
      <div className="p-4 border-t border-gray-200 mt-auto">
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg p-4 text-white">
          <h3 className="font-semibold mb-2">Quick Stats</h3>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Algorithms:</span>
              <span>15+</span>
            </div>
            <div className="flex justify-between">
              <span>Categories:</span>
              <span>4</span>
            </div>
            <div className="flex justify-between">
              <span>Visualizations:</span>
              <span>Real-time</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
