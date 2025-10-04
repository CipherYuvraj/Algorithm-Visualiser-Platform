import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUserPreferences, setUserPreferences } from '../services/userPreferences';

const ThemeContext = createContext();

// Color system constants
export const COLORS = {
  // Brand colors
  brand: {
    primary: {
      light: 'rgb(59 130 246)', // blue-500
      dark: 'rgb(96 165 250)', // blue-400
    },
    secondary: {
      light: 'rgb(147 51 234)', // purple-600
      dark: 'rgb(168 85 247)', // purple-400
    },
    accent: {
      light: 'rgb(20 184 166)', // teal-500
      dark: 'rgb(45 212 191)', // teal-400
    },
  },
  
  // Algorithm visualization colors
  algorithm: {
    default: {
      light: 'rgb(100 116 139)', // slate-500
      dark: 'rgb(148 163 184)', // slate-400
    },
    current: {
      light: 'rgb(239 68 68)', // red-500
      dark: 'rgb(248 113 113)', // red-400
    },
    comparing: {
      light: 'rgb(245 158 11)', // amber-500
      dark: 'rgb(251 191 36)', // amber-400
    },
    completed: {
      light: 'rgb(34 197 94)', // green-500
      dark: 'rgb(74 222 128)', // green-400
    },
    visited: {
      light: 'rgb(59 130 246)', // blue-500
      dark: 'rgb(96 165 250)', // blue-400
    },
  },
  
  // Status colors
  status: {
    success: {
      light: 'rgb(34 197 94)', // green-500
      dark: 'rgb(74 222 128)', // green-400
    },
    warning: {
      light: 'rgb(245 158 11)', // amber-500
      dark: 'rgb(251 191 36)', // amber-400
    },
    error: {
      light: 'rgb(239 68 68)', // red-500
      dark: 'rgb(248 113 113)', // red-400
    },
    info: {
      light: 'rgb(59 130 246)', // blue-500
      dark: 'rgb(96 165 250)', // blue-400
    },
  },
};

// Gradient definitions
export const GRADIENTS = {
  primary: {
    light: 'linear-gradient(135deg, rgb(59 130 246) 0%, rgb(147 51 234) 100%)',
    dark: 'linear-gradient(135deg, rgb(96 165 250) 0%, rgb(168 85 247) 100%)',
  },
  secondary: {
    light: 'linear-gradient(135deg, rgb(20 184 166) 0%, rgb(59 130 246) 100%)',
    dark: 'linear-gradient(135deg, rgb(45 212 191) 0%, rgb(96 165 250) 100%)',
  },
  accent: {
    light: 'linear-gradient(135deg, rgb(244 63 94) 0%, rgb(251 146 60) 100%)',
    dark: 'linear-gradient(135deg, rgb(251 113 133) 0%, rgb(251 191 36) 100%)',
  },
  surface: {
    light: 'linear-gradient(135deg, rgb(243 244 246) 0%, rgb(255 255 255) 100%)',
    dark: 'linear-gradient(135deg, rgb(55 65 81) 0%, rgb(31 41 55) 100%)',
  },
};

// Helper function to get themed color
export const getThemedColor = (colorPath, theme) => {
  const pathArray = colorPath.split('.');
  let colorObj = COLORS;
  
  for (const path of pathArray) {
    colorObj = colorObj[path];
    if (!colorObj) return null;
  }
  
  return colorObj[theme] || colorObj.light;
};

// Helper function to get themed gradient
export const getThemedGradient = (gradientName, theme) => {
  return GRADIENTS[gradientName]?.[theme] || GRADIENTS[gradientName]?.light;
};

// Component class names based on theme
export const getThemeClasses = (theme) => ({
  // Background classes
  bgPrimary: theme === 'dark' 
    ? 'bg-gray-900' 
    : 'bg-gray-50',
  bgSecondary: theme === 'dark' 
    ? 'bg-gray-800' 
    : 'bg-white',
  bgTertiary: theme === 'dark' 
    ? 'bg-gray-700' 
    : 'bg-gray-100',
  bgElevated: theme === 'dark' 
    ? 'bg-gray-800' 
    : 'bg-white',
  bgGradient: theme === 'dark' 
    ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
    : 'bg-gradient-to-br from-gray-50 via-white to-gray-100',
    
  // Text classes
  textPrimary: theme === 'dark' 
    ? 'text-gray-50' 
    : 'text-gray-900',
  textSecondary: theme === 'dark' 
    ? 'text-gray-300' 
    : 'text-gray-600',
  textTertiary: theme === 'dark' 
    ? 'text-gray-400' 
    : 'text-gray-500',
  textInverse: theme === 'dark' 
    ? 'text-gray-900' 
    : 'text-white',
    
  // Border classes
  borderPrimary: theme === 'dark' 
    ? 'border-gray-700' 
    : 'border-gray-200',
  borderSecondary: theme === 'dark' 
    ? 'border-gray-600' 
    : 'border-gray-300',
  borderAccent: theme === 'dark' 
    ? 'border-blue-400' 
    : 'border-blue-500',
    
  // Brand color classes
  brandPrimary: theme === 'dark' 
    ? 'text-blue-400' 
    : 'text-blue-500',
  brandSecondary: theme === 'dark' 
    ? 'text-purple-400' 
    : 'text-purple-600',
  brandAccent: theme === 'dark' 
    ? 'text-teal-400' 
    : 'text-teal-500',
    
  // Button classes
  btnPrimary: `inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 
               hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 
               focus:ring-offset-2 rounded-lg transition-all duration-200 ${
                 theme === 'dark' ? 'focus:ring-offset-gray-900' : 'focus:ring-offset-white'
               }`,
  btnSecondary: `inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg 
                 transition-all duration-200 ${
                   theme === 'dark' 
                     ? 'text-gray-300 bg-gray-700 hover:bg-gray-600 border-gray-600 focus:ring-offset-gray-900' 
                     : 'text-gray-700 bg-white hover:bg-gray-50 border-gray-300 focus:ring-offset-white'
                 } border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`,
  btnGhost: `inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg 
             transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 
             focus:ring-offset-2 ${
               theme === 'dark' 
                 ? 'text-gray-300 hover:bg-gray-700 focus:ring-offset-gray-900' 
                 : 'text-gray-700 hover:bg-gray-100 focus:ring-offset-white'
             }`,
             
  // Card classes
  card: `rounded-lg border transition-all duration-200 ${
    theme === 'dark' 
      ? 'bg-gray-800 border-gray-700' 
      : 'bg-white border-gray-200'
  }`,
  cardHover: `rounded-lg border transition-all duration-200 hover:shadow-lg hover:-translate-y-1 ${
    theme === 'dark' 
      ? 'bg-gray-800 border-gray-700 hover:border-gray-600' 
      : 'bg-white border-gray-200 hover:border-gray-300'
  }`,
  cardGlass: `rounded-lg border backdrop-blur-xl transition-all duration-200 ${
    theme === 'dark' 
      ? 'bg-gray-800/20 border-gray-700/50' 
      : 'bg-white/20 border-white/50'
  }`,
});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Check system preference first
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    try {
      const { theme: savedTheme } = getUserPreferences();
      return savedTheme || systemPreference;
    } catch (error) {
      console.error('Error loading theme preference:', error);
      return systemPreference;
    }
  });

  // Update theme and save preference
  const setThemeAndPersist = (newTheme) => {
    setTheme(newTheme);
    
    // Save to localStorage
    const preferences = getUserPreferences();
    setUserPreferences({ ...preferences, theme: newTheme });
    
    // Update document class for global styling
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      // Only update if user hasn't set a preference
      try {
        const { theme: savedTheme } = getUserPreferences();
        if (!savedTheme) {
          setThemeAndPersist(e.matches ? 'dark' : 'light');
        }
      } catch (error) {
        console.error('Error handling system theme change:', error);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Apply initial theme
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setThemeAndPersist(theme === 'light' ? 'dark' : 'light');
  };

  const isDark = theme === 'dark';
  const classes = getThemeClasses(theme);

  const value = {
    theme,
    setTheme: setThemeAndPersist,
    toggleTheme,
    isDark,
    classes,
    colors: COLORS,
    gradients: GRADIENTS,
    getThemedColor: (colorPath) => getThemedColor(colorPath, theme),
    getThemedGradient: (gradientName) => getThemedGradient(gradientName, theme),
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;