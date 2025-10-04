import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Zap, BarChart3, Network, Code, BookOpen, Type, Layers, Info } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const { isDark, classes } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Navigation items
  const navItems = [
    { path: '/', label: 'Home', icon: Code },
    { path: '/sorting', label: 'Sorting', icon: BarChart3 },
    { path: '/graph', label: 'Graph', icon: Network },
    { path: '/string', label: 'String', icon: Type },
    { path: '/dp', label: 'DP', icon: Layers },
    { path: '/about', label: 'About', icon: Info },
    { path: '/docs', label: 'Docs', icon: BookOpen }
  ];

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Navbar */}
      <nav className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out
        ${isScrolled 
          ? `backdrop-blur-xl border-b ${isDark ? 'bg-gray-900/90 border-gray-700' : 'bg-white/90 border-gray-200'} shadow-lg` 
          : `backdrop-blur-sm ${isDark ? 'bg-gray-900/60 border-gray-800/40' : 'bg-white/60 border-gray-200/40'} border-b`
        }
      `}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link 
                to="/" 
                className={`
                  flex items-center space-x-3 font-bold text-xl
                  transition-all duration-200 focus-visible:outline-none 
                  focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
                  rounded-lg px-2 py-1 group
                  ${isDark 
                    ? 'text-white hover:text-blue-400 focus-visible:ring-offset-gray-900' 
                    : 'text-gray-900 hover:text-blue-600 focus-visible:ring-offset-white'
                  }
                `}
              >
                <div className={`
                  w-8 h-8 rounded-lg flex items-center justify-center
                  bg-gradient-to-br from-blue-600 to-purple-600
                  group-hover:from-blue-500 group-hover:to-purple-500
                  transform group-hover:scale-105 transition-all duration-200
                  shadow-md group-hover:shadow-lg
                `}>
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  AlgoViz Pro
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-1">
                {navItems.map(({ path, label, icon: Icon }) => (
                  <Link
                    key={path}
                    to={path}
                    className={`
                      px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                      flex items-center space-x-2 group relative overflow-hidden
                      focus-visible:outline-none focus-visible:ring-2 
                      focus-visible:ring-blue-500 focus-visible:ring-offset-2
                      ${isActive(path)
                        ? `${isDark ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-600/10 text-blue-600'} shadow-md`
                        : `${isDark 
                            ? 'text-gray-300 hover:text-white hover:bg-gray-800/50' 
                            : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100/50'
                          }`
                      }
                      ${isDark ? 'focus-visible:ring-offset-gray-900' : 'focus-visible:ring-offset-white'}
                    `}
                  >
                    <Icon className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                    <span>{label}</span>
                    {isActive(path) && (
                      <div className={`
                        absolute bottom-0 left-0 right-0 h-0.5 
                        ${isDark ? 'bg-blue-400' : 'bg-blue-600'}
                        transition-all duration-200
                      `} />
                    )}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right side items */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Theme Toggle */}
              <ThemeToggle />
              
              {/* CTA Button */}
              <Link
                to="/get-started"
                className={`
                  inline-flex items-center px-4 py-2 text-sm font-medium text-white
                  bg-gradient-to-r from-blue-600 to-purple-600
                  hover:from-blue-700 hover:to-purple-700
                  rounded-lg transition-all duration-200 transform hover:scale-105
                  focus-visible:outline-none focus-visible:ring-2 
                  focus-visible:ring-blue-500 focus-visible:ring-offset-2
                  shadow-md hover:shadow-lg
                  ${isDark ? 'focus-visible:ring-offset-gray-900' : 'focus-visible:ring-offset-white'}
                `}
              >
                Get Started
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              <ThemeToggle />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`
                  p-2 rounded-lg transition-all duration-200
                  focus-visible:outline-none focus-visible:ring-2 
                  focus-visible:ring-blue-500 focus-visible:ring-offset-2
                  ${isDark 
                    ? 'hover:bg-gray-800 text-gray-300 hover:text-white focus-visible:ring-offset-gray-900' 
                    : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900 focus-visible:ring-offset-white'
                  }
                `}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className={`
            md:hidden border-t backdrop-blur-xl transition-all duration-300 ease-in-out
            ${isDark ? 'bg-gray-900/95 border-gray-700' : 'bg-white/95 border-gray-200'}
            shadow-xl
          `}>
            <div className="px-4 py-3 space-y-2">
              {navItems.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-lg
                    transition-all duration-200
                    focus-visible:outline-none focus-visible:ring-2 
                    focus-visible:ring-blue-500 focus-visible:ring-offset-2
                    ${isDark 
                      ? `hover:bg-gray-800 focus-visible:ring-offset-gray-900 ${
                          isActive(path) ? 'bg-gray-800 text-blue-400' : 'text-gray-300'
                        }`
                      : `hover:bg-gray-100 focus-visible:ring-offset-white ${
                          isActive(path) ? 'bg-gray-100 text-blue-600' : 'text-gray-600'
                        }`
                    }
                  `}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-base font-medium">{label}</span>
                  {isActive(path) && (
                    <div className={`
                      ml-auto w-2 h-2 rounded-full 
                      ${isDark ? 'bg-blue-400' : 'bg-blue-600'}
                    `} />
                  )}
                </Link>
              ))}

              {/* Mobile CTA */}
              <div className="pt-4 mt-4 border-t border-gray-700">
                <Link
                  to="/get-started"
                  className={`
                    w-full flex items-center justify-center px-4 py-3 rounded-lg
                    text-base font-medium bg-gradient-to-r from-blue-600 to-purple-600
                    text-white hover:from-blue-700 hover:to-purple-700
                    transition-all duration-200 transform hover:scale-105
                    focus-visible:outline-none focus-visible:ring-2 
                    focus-visible:ring-blue-500 focus-visible:ring-offset-2
                    shadow-md hover:shadow-lg
                    ${isDark ? 'focus-visible:ring-offset-gray-900' : 'focus-visible:ring-offset-white'}
                  `}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-16" />
    </>
  );
};

export default Navbar;
