import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, User, Settings, LogOut, Moon, Sun, Zap, BarChart3, Network, Code, BookOpen } from 'lucide-react';
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
    { name: 'Dashboard', path: '/', icon: BarChart3 },
    { 
      name: 'Products', 
      path: '#',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Sorting Algorithms', path: '/sorting', icon: BarChart3, description: 'Visualize sorting algorithms' },
        { name: 'Graph Algorithms', path: '/graph', icon: Network, description: 'Explore graph traversal' },
        { name: 'String Algorithms', path: '/string', icon: Code, description: 'Pattern matching & more' },
        { name: 'Dynamic Programming', path: '/dp', icon: Zap, description: 'Optimization problems' }
      ]
    },
    { name: 'Documentation', path: '/docs', icon: BookOpen },
    { name: 'About', path: '/about', icon: User }
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

  const isActivePath = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
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
                {navItems.map((item) => (
                  <div key={item.name} className="relative" ref={item.hasDropdown ? productsRef : null}>
                    {item.hasDropdown ? (
                      <button
                        onClick={() => setIsProductsOpen(!isProductsOpen)}
                        className={`
                          px-3 py-2 rounded-lg text-sm font-medium
                          transition-all duration-200 flex items-center space-x-1
                          focus-visible:outline-none focus-visible:ring-2 
                          focus-visible:ring-blue-500 focus-visible:ring-offset-2
                          ${darkMode 
                            ? `hover:bg-gray-800 focus-visible:ring-offset-gray-900
                               ${isProductsOpen ? 'bg-gray-800 text-white' : 'text-gray-300 hover:text-white'}`
                            : `hover:bg-gray-100 focus-visible:ring-offset-white
                               ${isProductsOpen ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:text-gray-900'}`
                          }
                        `}
                      >
                        <span>{item.name}</span>
                        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                          isProductsOpen ? 'rotate-180' : ''
                        }`} />
                      </button>
                    ) : (
                      <Link
                        to={item.path}
                        className={`
                          px-3 py-2 rounded-lg text-sm font-medium
                          transition-all duration-200 relative
                          focus-visible:outline-none focus-visible:ring-2 
                          focus-visible:ring-blue-500 focus-visible:ring-offset-2
                          ${darkMode 
                            ? `hover:bg-gray-800 focus-visible:ring-offset-gray-900
                               ${isActivePath(item.path) 
                                 ? 'text-white bg-gray-800' 
                                 : 'text-gray-300 hover:text-white'
                               }`
                            : `hover:bg-gray-100 focus-visible:ring-offset-white
                               ${isActivePath(item.path) 
                                 ? 'text-gray-900 bg-gray-100' 
                                 : 'text-gray-600 hover:text-gray-900'
                               }`
                          }
                        `}
                      >
                        {item.name}
                        {isActivePath(item.path) && (
                          <div className={`
                            absolute bottom-0 left-1/2 transform -translate-x-1/2 
                            w-6 h-0.5 bg-blue-600 rounded-full
                          `} />
                        )}
                      </Link>
                    )}

                    {/* Products Dropdown */}
                    {item.hasDropdown && isProductsOpen && (
                      <div className={`
                        absolute top-full left-0 mt-2 w-80 rounded-xl shadow-xl
                        backdrop-blur-xl border animate-in slide-in-from-top-2 duration-200
                        ${darkMode 
                          ? 'bg-gray-900/95 border-gray-700' 
                          : 'bg-white/95 border-gray-200'
                        }
                      `}>
                        <div className="p-2">
                          {item.dropdownItems.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              to={dropdownItem.path}
                              className={`
                                flex items-start space-x-3 p-3 rounded-lg
                                transition-colors duration-200
                                focus-visible:outline-none focus-visible:ring-2 
                                focus-visible:ring-blue-500 focus-visible:ring-offset-2
                                ${darkMode 
                                  ? `hover:bg-gray-800 focus-visible:ring-offset-gray-900
                                     ${isActivePath(dropdownItem.path) ? 'bg-gray-800' : ''}`
                                  : `hover:bg-gray-100 focus-visible:ring-offset-white
                                     ${isActivePath(dropdownItem.path) ? 'bg-gray-100' : ''}`
                                }
                              `}
                            >
                              <div className={`
                                p-2 rounded-lg mt-0.5
                                ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}
                              `}>
                                <dropdownItem.icon className={`h-4 w-4 ${
                                  darkMode ? 'text-blue-400' : 'text-blue-600'
                                }`} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className={`text-sm font-medium ${
                                  darkMode ? 'text-white' : 'text-gray-900'
                                }`}>
                                  {dropdownItem.name}
                                </div>
                                <div className={`text-xs mt-0.5 ${
                                  darkMode ? 'text-gray-400' : 'text-gray-500'
                                }`}>
                                  {dropdownItem.description}
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right side items */}
            <div className="hidden md:flex items-center space-x-3">
              {/* Theme Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
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
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>

              {/* Profile Menu */}
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className={`
                    flex items-center space-x-2 p-2 rounded-lg
                    transition-colors duration-200
                    focus-visible:outline-none focus-visible:ring-2 
                    focus-visible:ring-blue-500 focus-visible:ring-offset-2
                    ${darkMode 
                      ? `hover:bg-gray-800 focus-visible:ring-offset-gray-900
                         ${isProfileOpen ? 'bg-gray-800' : ''}`
                      : `hover:bg-gray-100 focus-visible:ring-offset-white
                         ${isProfileOpen ? 'bg-gray-100' : ''}`
                    }
                  `}
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  } ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <div className={`
                    absolute top-full right-0 mt-2 w-48 rounded-xl shadow-xl
                    backdrop-blur-xl border animate-in slide-in-from-top-2 duration-200
                    ${darkMode 
                      ? 'bg-gray-900/95 border-gray-700' 
                      : 'bg-white/95 border-gray-200'
                    }
                  `}>
                    <div className="p-2">
                      <div className={`px-3 py-2 border-b ${
                        darkMode ? 'border-gray-700' : 'border-gray-200'
                      }`}>
                        <div className={`text-sm font-medium ${
                          darkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          Demo User
                        </div>
                        <div className={`text-xs ${
                          darkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          demo@algoviz.com
                        </div>
                      </div>
                      
                      <button className={`
                        w-full flex items-center space-x-3 px-3 py-2 rounded-lg
                        text-left transition-colors duration-200
                        focus-visible:outline-none focus-visible:ring-2 
                        focus-visible:ring-blue-500 focus-visible:ring-offset-2
                        ${darkMode 
                          ? 'hover:bg-gray-800 text-gray-300 hover:text-white focus-visible:ring-offset-gray-900' 
                          : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900 focus-visible:ring-offset-white'
                        }
                      `}>
                        <Settings className="h-4 w-4" />
                        <span className="text-sm">Settings</span>
                      </button>
                      
                      <button className={`
                        w-full flex items-center space-x-3 px-3 py-2 rounded-lg
                        text-left transition-colors duration-200
                        focus-visible:outline-none focus-visible:ring-2 
                        focus-visible:ring-red-500 focus-visible:ring-offset-2
                        ${darkMode 
                          ? 'hover:bg-red-900/50 text-red-400 hover:text-red-300 focus-visible:ring-offset-gray-900' 
                          : 'hover:bg-red-50 text-red-600 hover:text-red-700 focus-visible:ring-offset-white'
                        }
                      `}>
                        <LogOut className="h-4 w-4" />
                        <span className="text-sm">Sign out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* CTA Button */}
              <Link
                to="/get-started"
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium
                  bg-gradient-to-r from-blue-600 to-purple-600
                  text-white hover:from-blue-700 hover:to-purple-700
                  transition-all duration-200 transform hover:scale-105
                  focus-visible:outline-none focus-visible:ring-2 
                  focus-visible:ring-blue-500 focus-visible:ring-offset-2
                  ${darkMode ? 'focus-visible:ring-offset-gray-900' : 'focus-visible:ring-offset-white'}
                `}
              >
                Get Started
              </Link>
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
              {navItems.map((item) => (
                <div key={item.name}>
                  {item.hasDropdown ? (
                    <>
                      <button
                        onClick={() => setIsProductsOpen(!isProductsOpen)}
                        className={`
                          w-full flex items-center justify-between px-3 py-2 rounded-lg
                          text-left transition-colors duration-200
                          focus-visible:outline-none focus-visible:ring-2 
                          focus-visible:ring-blue-500 focus-visible:ring-offset-2
                          ${darkMode 
                            ? 'hover:bg-gray-800 text-gray-300 hover:text-white focus-visible:ring-offset-gray-900' 
                            : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900 focus-visible:ring-offset-white'
                          }
                        `}
                      >
                        <span className="text-base font-medium">{item.name}</span>
                        <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${
                          isProductsOpen ? 'rotate-180' : ''
                        }`} />
                      </button>
                      
                      {isProductsOpen && (
                        <div className="mt-2 ml-4 space-y-1">
                          {item.dropdownItems.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              to={dropdownItem.path}
                              className={`
                                flex items-center space-x-3 px-3 py-2 rounded-lg
                                transition-colors duration-200
                                focus-visible:outline-none focus-visible:ring-2 
                                focus-visible:ring-blue-500 focus-visible:ring-offset-2
                                ${darkMode 
                                  ? `hover:bg-gray-800 focus-visible:ring-offset-gray-900
                                     ${isActivePath(dropdownItem.path) ? 'bg-gray-800 text-white' : 'text-gray-300'}`
                                  : `hover:bg-gray-100 focus-visible:ring-offset-white
                                     ${isActivePath(dropdownItem.path) ? 'bg-gray-100 text-gray-900' : 'text-gray-600'}`
                                }
                              `}
                            >
                              <dropdownItem.icon className="h-4 w-4" />
                              <span className="text-sm font-medium">{dropdownItem.name}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={item.path}
                      className={`
                        flex items-center space-x-3 px-3 py-2 rounded-lg
                        transition-colors duration-200
                        focus-visible:outline-none focus-visible:ring-2 
                        focus-visible:ring-blue-500 focus-visible:ring-offset-2
                        ${darkMode 
                          ? `hover:bg-gray-800 focus-visible:ring-offset-gray-900
                             ${isActivePath(item.path) ? 'bg-gray-800 text-white' : 'text-gray-300'}`
                          : `hover:bg-gray-100 focus-visible:ring-offset-white
                             ${isActivePath(item.path) ? 'bg-gray-100 text-gray-900' : 'text-gray-600'}`
                        }
                      `}
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="text-base font-medium">{item.name}</span>
                    </Link>
                  )}
                </div>
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
