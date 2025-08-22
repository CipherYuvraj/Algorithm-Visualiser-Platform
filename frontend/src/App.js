import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import Home from './pages/Home';
import SortingVisualizer from './pages/SortingVisualizer';
import GraphVisualizer from './pages/GraphVisualizer';
import StringVisualizer from './pages/StringVisualizer';
import DPVisualizer from './pages/DPVisualizer';
import PerformanceAnalysis from './pages/PerformanceAnalysis';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-6 ml-64">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sorting" element={<SortingVisualizer />} />
              <Route path="/graph" element={<GraphVisualizer />} />
              <Route path="/string" element={<StringVisualizer />} />
              <Route path="/dp" element={<DPVisualizer />} />
              <Route path="/performance" element={<PerformanceAnalysis />} />
            </Routes>
          </main>
        </div>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;
