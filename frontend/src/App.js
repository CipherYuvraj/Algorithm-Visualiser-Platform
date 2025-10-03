import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout/Layout';
import { getUserPreferences, setUserPreferences } from './services/userPreferences';
import SortingVisualizer from './pages/SortingVisualizer';
import GraphVisualizer from './pages/GraphVisualizer';
import StringVisualizer from './pages/StringVisualizer';
import DPVisualizer from './pages/DPVisualizer';
import HomePage from './pages/Home';
import AboutPage from './pages/AboutPage';
import DocumentationPage from './pages/DocumentationPage';
import ContributorsPage from './pages/ContributorsPage';
import './App.css';

function App() {
  // Theme state with persistence
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
  const handleThemeChange = (newTheme) => {
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
      const systemTheme = e.matches ? 'dark' : 'light';
      handleThemeChange(systemTheme);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Apply theme on mount and changes
  useEffect(() => {
    handleThemeChange(theme);
  }, [theme]);

  return (
    <div className="App">
      <Router>
        <Layout theme={theme} onThemeChange={handleThemeChange}>
          <Routes>
            <Route 
              path="/" 
              element={<HomePage theme={theme} />} 
            />
            <Route 
              path="/sorting" 
              element={<SortingVisualizer theme={theme} />} 
            />
            <Route 
              path="/graph" 
              element={<GraphVisualizer theme={theme} />} 
            />
            <Route 
              path="/string" 
              element={<StringVisualizer theme={theme} />} 
            />
            <Route 
              path="/dp" 
              element={<DPVisualizer theme={theme} />} 
            />
            <Route 
              path="/about" 
              element={<AboutPage theme={theme} />} 
            />
            <Route 
              path="/docs" 
              element={<DocumentationPage theme={theme} />} 
            />
            <Route 
              path="/contributors" 
              element={<ContributorsPage theme={theme} />} 
            />
          </Routes>
        </Layout>
      </Router>

      {/* Toast notifications */}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: theme === 'dark' ? '#374151' : '#ffffff',
            color: theme === 'dark' ? '#ffffff' : '#000000',
            border: `1px solid ${theme === 'dark' ? '#4B5563' : '#E5E7EB'}`,
          },
        }}
      />
    </div>
  );
}

export default App;
