import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout/Layout';
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
  // Dark mode state with persistence
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem('darkMode');
      return saved ? JSON.parse(saved) : false;
    } catch (error) {
      console.error('Error loading dark mode preference:', error);
      return false;
    }
  });

  // Save dark mode preference
  useEffect(() => {
    try {
      localStorage.setItem('darkMode', JSON.stringify(darkMode));
      
      // Update document class for global styling
      if (darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (error) {
      console.error('Error saving dark mode preference:', error);
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'dark bg-gray-900' : 'bg-white'
    }`}>
      <Router>
        <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
          <Routes>
            <Route 
              path="/" 
              element={<HomePage darkMode={darkMode} setDarkMode={setDarkMode} />} 
            />
            <Route 
              path="/sorting" 
              element={<SortingVisualizer darkMode={darkMode} setDarkMode={setDarkMode} />} 
            />
            <Route 
              path="/graph" 
              element={<GraphVisualizer darkMode={darkMode} setDarkMode={setDarkMode} />} 
            />
            <Route 
              path="/string" 
              element={<StringVisualizer darkMode={darkMode} setDarkMode={setDarkMode} />} 
            />
            <Route 
              path="/dp" 
              element={<DPVisualizer darkMode={darkMode} setDarkMode={setDarkMode} />} 
            />
            <Route 
              path="/about" 
              element={<AboutPage darkMode={darkMode} setDarkMode={setDarkMode} />} 
            />
            <Route 
              path="/docs" 
              element={<DocumentationPage darkMode={darkMode} setDarkMode={setDarkMode} />} 
            />
            <Route 
              path="/contributors" 
              element={<ContributorsPage darkMode={darkMode} setDarkMode={setDarkMode} />} 
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
            background: darkMode ? '#374151' : '#ffffff',
            color: darkMode ? '#ffffff' : '#000000',
            border: `1px solid ${darkMode ? '#4B5563' : '#E5E7EB'}`,
          },
        }}
      />
    </div>
  );
}

export default App;
