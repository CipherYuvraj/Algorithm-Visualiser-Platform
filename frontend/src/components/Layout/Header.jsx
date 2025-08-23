import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Github, Settings } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-soft border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-primary-600 p-2 rounded-lg">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Algorithm Visualizer
              </h1>
              <p className="text-sm text-gray-500">
                Interactive DSA Platform
              </p>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              to="/sorting" 
              className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
            >
              Sorting
            </Link>
            <Link 
              to="/graph" 
              className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
            >
              Graph
            </Link>
            <Link 
              to="/string" 
              className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
            >
              String
            </Link>
            <Link 
              to="/dp" 
              className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
            >
              Dynamic Programming
            </Link>
            <Link 
              to="/performance" 
              className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
            >
              Performance
            </Link>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
              <Settings className="h-5 w-5" />
            </button>
            <a 
              href="https://github.com/CipherYuvraj" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
