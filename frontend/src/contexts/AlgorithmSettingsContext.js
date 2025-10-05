import React, { createContext, useContext, useEffect, useState } from 'react';

const defaultSettings = {
  speed: 1,          // 0.1x to 10x
  stepMode: false,
  theme: 'classic',  // 'classic' | 'neon' | 'minimal'
  soundEffects: false,
  showComplexity: true,
  compareMode: false,
};

const AlgorithmSettingsContext = createContext(null);

export const useAlgorithmSettings = () => {
  const context = useContext(AlgorithmSettingsContext);
  if (!context) {
    throw new Error('useAlgorithmSettings must be used within an AlgorithmSettingsProvider');
  }
  return context;
};

export const AlgorithmSettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => {
    // Load settings from localStorage on initial render
    const savedSettings = localStorage.getItem('algorithmSettings');
    return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
  });

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('algorithmSettings', JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  return (
    <AlgorithmSettingsContext.Provider value={{ settings, updateSettings, resetSettings }}>
      {children}
    </AlgorithmSettingsContext.Provider>
  );
};

export const themes = {
  classic: {
    primary: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
    secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
    bar: 'bg-blue-500',
    text: 'text-gray-700',
    background: 'bg-white',
  },
  neon: {
    primary: 'from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600',
    secondary: 'bg-gray-900 text-purple-400 hover:bg-gray-800',
    bar: 'bg-purple-500',
    text: 'text-purple-200',
    background: 'bg-gray-900',
  },
  minimal: {
    primary: 'from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900',
    secondary: 'bg-gray-100 text-gray-600 hover:bg-gray-200',
    bar: 'bg-gray-700',
    text: 'text-gray-600',
    background: 'bg-gray-50',
  },
};
