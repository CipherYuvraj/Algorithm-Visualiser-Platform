// Centralized configuration management
class Config {
  constructor() {
    this.env = this.loadEnvironment();
  }

  loadEnvironment() {
    // Handle different environment variable access methods
    let env = {};

    // Check for Vite environment variables (ESM)
    try {
      if (typeof import.meta !== 'undefined' && import.meta.env) {
        return import.meta.env;
      }
    } catch (e) {
      console.debug('Vite environment not available');
    }

    // Check for Node.js/Webpack environment variables
    if (typeof process !== 'undefined' && process.env) {
      return process.env;
    }

    // Check for browser environment variables
    if (typeof window !== 'undefined' && window.env) {
      return window.env;
    }

    return env;
  }

  get(key, defaultValue = null) {
    return this.env[key] || defaultValue;
  }

  // Specific getters
  get apiBaseUrl() {
    return this.get('VITE_API_BASE_URL', 'http://localhost:8000');
  }

  get analyticsEnabled() {
    return this.get('VITE_ANALYTICS_ENABLED', 'true') === 'true';
  }

  get appTitle() {
    return this.get('VITE_APP_TITLE', 'Algorithm Visualizer Pro');
  }

  get isDevelopment() {
    return this.get('VITE_NODE_ENV', 'development') === 'development';
  }

  get isProduction() {
    return this.get('VITE_NODE_ENV', 'development') === 'production';
  }
}

export const config = new Config();
