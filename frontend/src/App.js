import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout/Layout';
import SortingVisualizer from './pages/SortingVisualizer';
import GraphVisualizer from './pages/GraphVisualizer';
import Dashboard from './pages/Dashboard';
import Documentation from './pages/Documentation';
import About from './pages/About';
import GetStarted from './pages/GetStarted';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/sorting" element={<SortingVisualizer />} />
          <Route path="/graph" element={<GraphVisualizer />} />
          <Route path="/docs" element={<Documentation />} />
          <Route path="/about" element={<About />} />
          <Route path="/get-started" element={<GetStarted />} />
        </Routes>
      </Layout>
      
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1f2937',
            color: '#fff',
            borderRadius: '12px',
          },
        }}
      />
    </Router>
  );
}

export default App;
  