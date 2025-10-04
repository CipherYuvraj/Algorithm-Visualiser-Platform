import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme, isDark } = useTheme();
  
  return (
    <button
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      onClick={toggleTheme}
      className={`
        relative p-2 rounded-lg transition-all duration-300 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-offset-2 
        ${isDark 
          ? 'bg-gray-800 hover:bg-gray-700 focus:ring-blue-400 focus:ring-offset-gray-900 border border-gray-700' 
          : 'bg-white hover:bg-gray-50 focus:ring-blue-500 focus:ring-offset-white border border-gray-200'
        }
        transform hover:scale-105 shadow-sm hover:shadow-md
      `}
      style={{
        background: isDark 
          ? 'linear-gradient(135deg, rgb(55 65 81) 0%, rgb(31 41 55) 100%)'
          : 'linear-gradient(135deg, rgb(255 255 255) 0%, rgb(249 250 251) 100%)',
      }}
    >
      <div className="relative w-6 h-6">
        {/* Moon icon for dark mode */}
        <span
          className={`absolute inset-0 transform transition-all duration-300 ease-in-out ${
            isDark ? 'rotate-0 opacity-100 scale-100' : '-rotate-90 opacity-0 scale-75'
          }`}
        >
          <Moon className="w-6 h-6 text-blue-400" />
        </span>
        
        {/* Sun icon for light mode */}
        <span
          className={`absolute inset-0 transform transition-all duration-300 ease-in-out ${
            isDark ? 'rotate-90 opacity-0 scale-75' : 'rotate-0 opacity-100 scale-100'
          }`}
        >
          <Sun className="w-6 h-6 text-amber-500" />
        </span>
      </div>
      
      {/* Subtle glow effect */}
      <div 
        className={`
          absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300
          ${isDark ? 'bg-blue-400/20' : 'bg-amber-500/20'}
        `}
        style={{
          filter: 'blur(8px)',
          zIndex: -1,
        }}
      />
    </button>
  );
};

export default ThemeToggle;
