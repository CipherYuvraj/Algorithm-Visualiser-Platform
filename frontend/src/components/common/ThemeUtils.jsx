import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

// Higher-order component to inject theme props
export const withTheme = (WrappedComponent) => {
  return (props) => {
    const theme = useTheme();
    return <WrappedComponent {...props} {...theme} />;
  };
};

// Theme-aware components
export const ThemedCard = ({ children, variant = 'default', hover = false, className = '', ...props }) => {
  const { isDark } = useTheme();
  
  const variants = {
    default: isDark 
      ? 'bg-gray-800 border-gray-700' 
      : 'bg-white border-gray-200',
    glass: isDark 
      ? 'bg-gray-800/20 border-gray-700/50 backdrop-blur-xl' 
      : 'bg-white/20 border-white/50 backdrop-blur-xl',
    elevated: isDark 
      ? 'bg-gray-800 border-gray-700 shadow-xl' 
      : 'bg-white border-gray-200 shadow-xl',
  };
  
  const hoverEffect = hover 
    ? 'hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02] transition-all duration-200' 
    : '';
  
  return (
    <div 
      className={`
        rounded-lg border transition-all duration-200
        ${variants[variant]} ${hoverEffect} ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export const ThemedButton = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  const { isDark } = useTheme();
  
  const variants = {
    primary: `
      bg-gradient-to-r from-blue-600 to-purple-600 
      hover:from-blue-700 hover:to-purple-700
      text-white font-medium
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
      ${isDark ? 'focus:ring-offset-gray-900' : 'focus:ring-offset-white'}
    `,
    secondary: isDark
      ? `bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white border border-gray-600
         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900`
      : `bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 border border-gray-300
         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white`,
    ghost: isDark
      ? `text-gray-300 hover:text-white hover:bg-gray-700
         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900`
      : `text-gray-700 hover:text-gray-900 hover:bg-gray-100
         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white`,
    success: `
      bg-gradient-to-r from-green-600 to-green-700
      hover:from-green-700 hover:to-green-800
      text-white font-medium
      focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
      ${isDark ? 'focus:ring-offset-gray-900' : 'focus:ring-offset-white'}
    `,
    warning: `
      bg-gradient-to-r from-amber-600 to-amber-700
      hover:from-amber-700 hover:to-amber-800
      text-white font-medium
      focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2
      ${isDark ? 'focus:ring-offset-gray-900' : 'focus:ring-offset-white'}
    `,
    error: `
      bg-gradient-to-r from-red-600 to-red-700
      hover:from-red-700 hover:to-red-800
      text-white font-medium
      focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
      ${isDark ? 'focus:ring-offset-gray-900' : 'focus:ring-offset-white'}
    `,
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg',
  };
  
  return (
    <button
      className={`
        inline-flex items-center justify-center rounded-lg
        transition-all duration-200 transform hover:scale-105
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
        ${variants[variant]} ${sizes[size]} ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export const ThemedText = ({ 
  children, 
  variant = 'primary', 
  size = 'base', 
  className = '', 
  as: Component = 'p',
  ...props 
}) => {
  const { isDark } = useTheme();
  
  const variants = {
    primary: isDark ? 'text-gray-50' : 'text-gray-900',
    secondary: isDark ? 'text-gray-300' : 'text-gray-600',
    tertiary: isDark ? 'text-gray-400' : 'text-gray-500',
    inverse: isDark ? 'text-gray-900' : 'text-white',
    brand: isDark ? 'text-blue-400' : 'text-blue-600',
    success: isDark ? 'text-green-400' : 'text-green-600',
    warning: isDark ? 'text-amber-400' : 'text-amber-600',
    error: isDark ? 'text-red-400' : 'text-red-600',
  };
  
  const sizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
    '5xl': 'text-5xl',
  };
  
  return (
    <Component
      className={`${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

export const ThemedHeading = ({ 
  children, 
  level = 1, 
  variant = 'primary', 
  className = '', 
  gradient = false,
  ...props 
}) => {
  const { isDark } = useTheme();
  const Component = `h${level}`;
  
  const variants = {
    primary: isDark ? 'text-white' : 'text-gray-900',
    secondary: isDark ? 'text-gray-300' : 'text-gray-600',
    brand: isDark ? 'text-blue-400' : 'text-blue-600',
  };
  
  const levels = {
    1: 'text-4xl md:text-5xl font-bold',
    2: 'text-3xl md:text-4xl font-bold',
    3: 'text-2xl md:text-3xl font-bold',
    4: 'text-xl md:text-2xl font-semibold',
    5: 'text-lg md:text-xl font-semibold',
    6: 'text-base md:text-lg font-semibold',
  };
  
  const gradientClass = gradient 
    ? 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'
    : '';
  
  return (
    <Component
      className={`
        ${levels[level]} 
        ${gradient ? gradientClass : variants[variant]} 
        ${className}
      `}
      {...props}
    >
      {children}
    </Component>
  );
};

export const ThemedInput = ({ 
  className = '', 
  error = false,
  ...props 
}) => {
  const { isDark } = useTheme();
  
  const baseClasses = `
    block w-full rounded-lg border transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    ${isDark ? 'focus:ring-offset-gray-900' : 'focus:ring-offset-white'}
  `;
  
  const normalClasses = isDark
    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500';
    
  const errorClasses = isDark
    ? 'bg-gray-800 border-red-500 text-white placeholder-gray-400 focus:ring-red-500'
    : 'bg-white border-red-500 text-gray-900 placeholder-gray-500 focus:ring-red-500';
  
  return (
    <input
      className={`
        ${baseClasses}
        ${error ? errorClasses : normalClasses}
        px-3 py-2 text-sm
        ${className}
      `}
      {...props}
    />
  );
};

export const ThemedBadge = ({ 
  children, 
  variant = 'default', 
  size = 'md',
  className = '', 
  ...props 
}) => {
  const { isDark } = useTheme();
  
  const variants = {
    default: isDark 
      ? 'bg-gray-700 text-gray-300' 
      : 'bg-gray-100 text-gray-800',
    brand: isDark 
      ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30' 
      : 'bg-blue-100 text-blue-800 border border-blue-200',
    success: isDark 
      ? 'bg-green-600/20 text-green-300 border border-green-500/30' 
      : 'bg-green-100 text-green-800 border border-green-200',
    warning: isDark 
      ? 'bg-amber-600/20 text-amber-300 border border-amber-500/30' 
      : 'bg-amber-100 text-amber-800 border border-amber-200',
    error: isDark 
      ? 'bg-red-600/20 text-red-300 border border-red-500/30' 
      : 'bg-red-100 text-red-800 border border-red-200',
  };
  
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm',
    lg: 'px-3 py-1 text-sm',
  };
  
  return (
    <span
      className={`
        inline-flex items-center rounded-full font-medium
        ${variants[variant]} ${sizes[size]} ${className}
      `}
      {...props}
    >
      {children}
    </span>
  );
};

// Legacy compatibility helpers (for gradual migration)
export const getThemeColors = (theme) => ({
  primary: theme === 'dark' ? 'blue-400' : 'blue-500',
  secondary: theme === 'dark' ? 'purple-400' : 'purple-600',
  accent: theme === 'dark' ? 'teal-400' : 'teal-500',
  success: theme === 'dark' ? 'green-400' : 'green-500',
  warning: theme === 'dark' ? 'amber-400' : 'amber-500',
  error: theme === 'dark' ? 'red-400' : 'red-500',
  text: {
    primary: theme === 'dark' ? 'gray-50' : 'gray-900',
    secondary: theme === 'dark' ? 'gray-300' : 'gray-600',
    tertiary: theme === 'dark' ? 'gray-400' : 'gray-500',
  },
  bg: {
    primary: theme === 'dark' ? 'gray-900' : 'gray-50',
    secondary: theme === 'dark' ? 'gray-800' : 'white',
    tertiary: theme === 'dark' ? 'gray-700' : 'gray-100',
  },
  border: {
    primary: theme === 'dark' ? 'gray-700' : 'gray-200',
    secondary: theme === 'dark' ? 'gray-600' : 'gray-300',
  },
});

// Gradient utilities
export const getGradientClasses = (name, theme) => {
  const gradients = {
    primary: theme === 'dark' 
      ? 'bg-gradient-to-r from-blue-400 to-purple-400'
      : 'bg-gradient-to-r from-blue-600 to-purple-600',
    secondary: theme === 'dark'
      ? 'bg-gradient-to-r from-teal-400 to-blue-400'
      : 'bg-gradient-to-r from-teal-500 to-blue-500',
    accent: theme === 'dark'
      ? 'bg-gradient-to-r from-pink-400 to-orange-400'
      : 'bg-gradient-to-r from-pink-500 to-orange-500',
    surface: theme === 'dark'
      ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900'
      : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50',
  };
  
  return gradients[name] || gradients.primary;
};

export default {
  withTheme,
  ThemedCard,
  ThemedButton,
  ThemedText,
  ThemedHeading,
  ThemedInput,
  ThemedBadge,
  getThemeColors,
  getGradientClasses,
};