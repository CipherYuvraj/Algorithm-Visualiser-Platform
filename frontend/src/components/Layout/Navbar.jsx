import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, User, Settings, LogOut, Moon, Sun, Zap, BarChart3, Network, Code, BookOpen, Type, Layers, Info } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ darkMode, setDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  const productsRef = useRef(null);
  const profileRef = useRef(null);

  // Design tokens
  const spacing = {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    '2xl': '32px'
  };

  const typography = {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px'
  };

  // Navigation items
  const navItems = [
    { path: '/', label: 'Home', icon: Code },
    { path: '/sorting', label: 'Sorting', icon: BarChart3 },
    { path: '/graph', label: 'Graph', icon: Network },
    { path: '/string', label: 'String', icon: Type },
    { path: '/dp', label: 'DP', icon: Layers },
    { path: '/tutorials', label: 'Tutorials', icon: BookOpen },
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

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (productsRef.current && !productsRef.current.contains(event.target)) {
        setIsProductsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsProductsOpen(false);
    setIsProfileOpen(false);
  }, [location]);

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Navbar */}
      <nav className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-200
        ${isScrolled 
          ? `backdrop-blur-xl border-b ${
              darkMode 
                ? 'bg-gray-900/80 border-gray-800' 
                : 'bg-white/80 border-gray-200'
            }` 
          : `backdrop-blur-sm ${
              darkMode 
                ? 'bg-gray-900/40 border-gray-800/40' 
                : 'bg-white/40 border-gray-200/40'
            } border-b`
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
                  transition-colors duration-200 focus-visible:outline-none 
                  focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
                  rounded-lg px-2 py-1
                  ${darkMode 
                    ? 'text-white hover:text-blue-400 focus-visible:ring-offset-gray-900' 
                    : 'text-gray-900 hover:text-blue-600 focus-visible:ring-offset-white'
                  }
                `}
              >
                <div className={`
                  w-8 h-8 rounded-lg flex items-center justify-center
                  bg-gradient-to-br from-blue-600 to-purple-600
                `}>
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <span>AlgoViz Pro</span>
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
                      px-3 py-2 rounded-md text-sm font-medium transition-all flex items-center space-x-2
                      focus-visible:outline-none focus-visible:ring-2 
                      focus-visible:ring-blue-500 focus-visible:ring-offset-2
                      ${isActive(path)
                        ? (darkMode ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white')
                        : (darkMode 
                            ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                            : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                          )
                      }
                    `}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Right side items */}
            <div className="hidden md:flex items-center space-x-3">
              {/* Theme Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`
                  p-2 rounded-lg transition-all
                  ${darkMode 
                    ? 'bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30' 
                    : 'bg-gray-800/20 text-gray-600 hover:bg-gray-800/30'
                  }
                `}
                aria-label="Toggle theme"
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`
                  p-2 rounded-lg transition-colors duration-200
                  focus-visible:outline-none focus-visible:ring-2 
                  focus-visible:ring-blue-500 focus-visible:ring-offset-2
                  ${darkMode 
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
            md:hidden border-t backdrop-blur-xl
            ${darkMode ? 'bg-gray-900/95 border-gray-800' : 'bg-white/95 border-gray-200'}
          `}>
            <div className="px-4 py-3 space-y-1">
              {navItems.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  className={`
                    flex items-center space-x-3 px-3 py-2 rounded-lg
                    transition-colors duration-200
                    focus-visible:outline-none focus-visible:ring-2 
                    focus-visible:ring-blue-500 focus-visible:ring-offset-2
                    ${darkMode 
                      ? `hover:bg-gray-800 focus-visible:ring-offset-gray-900
                         ${isActive(path) ? 'bg-gray-800 text-white' : 'text-gray-300'}`
                      : `hover:bg-gray-100 focus-visible:ring-offset-white
                         ${isActive(path) ? 'bg-gray-100 text-gray-900' : 'text-gray-600'}`
                    }
                  `}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{label}</span>
                </Link>
              ))}
              
              {/* Mobile CTA */}
              <div className="pt-3 mt-3 border-t border-gray-700">
                <Link
                  to="/get-started"
                  className={`
                    w-full flex items-center justify-center px-4 py-2 rounded-lg
                    text-base font-medium bg-gradient-to-r from-blue-600 to-purple-600
                    text-white hover:from-blue-700 hover:to-purple-700
                    transition-all duration-200
                    focus-visible:outline-none focus-visible:ring-2 
                    focus-visible:ring-blue-500 focus-visible:ring-offset-2
                    ${darkMode ? 'focus-visible:ring-offset-gray-900' : 'focus-visible:ring-offset-white'}
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
