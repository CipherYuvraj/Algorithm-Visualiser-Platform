import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Global timeout loop detection
let timeoutCounter = 0;
let lastTimeoutTime = Date.now();

const originalSetTimeout = window.setTimeout;
window.setTimeout = function(callback, delay, ...args) {
  const now = Date.now();
  
  // Detect potential timeout loops
  if (now - lastTimeoutTime < 100) {
    timeoutCounter++;
    if (timeoutCounter > 10) {
      console.warn('Potential timeout loop detected, blocking excessive timeouts');
      return null;
    }
  } else {
    timeoutCounter = 0;
  }
  
  lastTimeoutTime = now;
  return originalSetTimeout.call(this, callback, delay, ...args);
};
