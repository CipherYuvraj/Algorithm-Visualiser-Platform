import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('Response error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Sorting API
export const sortingService = {
  runAlgorithm: async (algorithm, array) => {
    const response = await api.post(`/api/sorting/${algorithm}`, { array });
    return response.data;
  },
};

// Graph API
export const graphService = {
  runAlgorithm: async (algorithm, graphData) => {
    const response = await api.post(`/api/graph/${algorithm}`, graphData);
    return response.data;
  },
};

// String API
export const stringService = {
  runAlgorithm: async (algorithm, text, pattern) => {
    const response = await api.post(`/api/string/${algorithm}`, { text, pattern });
    return response.data;
  },
};

// Dynamic Programming API
export const dpService = {
  runAlgorithm: async (algorithm, params) => {
    const response = await api.post(`/api/dp/${algorithm}`, { 
      problem_type: algorithm,
      params 
    });
    return response.data;
  },
};

// WebSocket connection
export class AlgorithmWebSocket {
  constructor(onMessage, onError) {
    this.ws = null;
    this.onMessage = onMessage;
    this.onError = onError;
  }

  connect() {
    const wsUrl = `ws://localhost:8000/ws`;
    this.ws = new WebSocket(wsUrl);
    
    this.ws.onopen = () => {
      console.log('WebSocket connected');
    };
    
    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this.onMessage(data);
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error);
      }
    };
    
    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      this.onError(error);
    };
    
    this.ws.onclose = () => {
      console.log('WebSocket disconnected');
    };
  }

  send(message) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
    }
  }
}

// Health check
export const healthCheck = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    throw new Error('Backend is not responding');
  }
};

export default api;
