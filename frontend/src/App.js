import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import Layout from './components/Layout/Layout';
import SortingVisualizer from './pages/SortingVisualizer';
import GraphVisualizer from './pages/GraphVisualizer';
import StringVisualizer from './pages/StringVisualizer';
import DPVisualizer from './pages/DPVisualizer';
import HomePage from './pages/Home';
import AboutPage from './pages/AboutPage';
import DocumentationPage from './pages/DocumentationPage';
import ContributorsPage from './pages/ContributorsPage';
import TutorialPage from './pages/TutorialPage';
import TutorialsPage from './pages/TutorialsPage';

import NotFoundPage from './pages/NotFoundPage';

import './App.css';

const AppContent = () => {
  const { isDark } = useTheme();

  return (
    <div className="App">
      <Router>
        <Layout>
          <Routes>
            <Route 
              path="/" 
              element={<HomePage />} 
            />
            <Route 
              path="/sorting" 
              element={<SortingVisualizer />} 
            />
            <Route 
              path="/graph" 
              element={<GraphVisualizer />} 
            />
            <Route 
              path="/string" 
              element={<StringVisualizer />} 
            />
            <Route 
              path="/dp" 
              element={<DPVisualizer />} 
            />
            <Route 
              path="/about" 
              element={<AboutPage />} 
            />
            <Route 
              path="/docs" 
              element={<DocumentationPage />} 
            />
            <Route 
              path="/contributors" 
              element={<ContributorsPage />} 
            />
            <Route 
              path="*" 
              element={<NotFoundPage />} 
            />
          <Route path="/tutorials" element={<TutorialsPage darkMode={isDark} />} />
            <Route path="/tutorial/:tutorialId" element={<TutorialPage darkMode={isDark} />} />

          </Routes>
        </Layout>
      </Router>

      {/* Toast notifications with theme-aware styling */}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: isDark ? 'rgb(31 41 55)' : 'rgb(255 255 255)',
            color: isDark ? 'rgb(249 250 251)' : 'rgb(17 24 39)',
            border: `1px solid ${isDark ? 'rgb(75 85 99)' : 'rgb(229 231 235)'}`,
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            boxShadow: isDark 
              ? '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -4px rgba(0, 0, 0, 0.3)'
              : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
          },
          success: {
            iconTheme: {
              primary: isDark ? 'rgb(74 222 128)' : 'rgb(34 197 94)',
              secondary: isDark ? 'rgb(31 41 55)' : 'rgb(255 255 255)',
            },
          },
          error: {
            iconTheme: {
              primary: isDark ? 'rgb(248 113 113)' : 'rgb(239 68 68)',
              secondary: isDark ? 'rgb(31 41 55)' : 'rgb(255 255 255)',
            },
          },
          loading: {
            iconTheme: {
              primary: isDark ? 'rgb(96 165 250)' : 'rgb(59 130 246)',
              secondary: isDark ? 'rgb(31 41 55)' : 'rgb(255 255 255)',
            },
          },
        }}
      />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
