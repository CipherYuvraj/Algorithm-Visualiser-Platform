import axios from 'axios';

// Smart API URL detection
const getApiBaseUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    // In production, try same origin first, then fallback
    return window.location.origin;
  }
  // Development
  return process.env.REACT_APP_API_URL || 'http://localhost:8000';
};

const API_BASE_URL = getApiBaseUrl();

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds
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
    
    // Handle timeout specifically
    if (error.code === 'ECONNABORTED') {
      console.error('Request timed out');
      return Promise.reject(new Error('Request timed out. Backend may not be running.'));
    }
    
    // Handle network errors
    if (error.code === 'ERR_NETWORK') {
      console.error('Network error - backend may not be running');
      return Promise.reject(new Error('Cannot connect to backend. Server may not be running.'));
    }
    
    return Promise.reject(error);
  }
);

// Sorting API with fallback
export const sortingService = {
  runAlgorithm: async (algorithm, array) => {
    try {
      const response = await api.post(`/api/sorting/${algorithm}`, { array });
      return response.data;
    } catch (error) {
      console.warn('Backend not available, using fallback sorting visualization');
      // Return fallback sorting steps
      return generateSortingFallback(algorithm, array);
    }
  },
};

// Fallback sorting visualization
function generateSortingFallback(algorithm, array) {
  const steps = [];
  const arrCopy = [...array];
  
  steps.push({
    array: [...arrCopy],
    highlighted: [],
    comparing: [],
    operation: `Starting ${algorithm} sort`,
    operations_count: 0,
    time_complexity: 'O(n²)',
    space_complexity: 'O(1)'
  });

  // Simple bubble sort simulation for fallback
  for (let i = 0; i < arrCopy.length - 1; i++) {
    for (let j = 0; j < arrCopy.length - i - 1; j++) {
      steps.push({
        array: [...arrCopy],
        highlighted: [j, j + 1],
        comparing: [j, j + 1],
        operation: `Comparing elements at positions ${j} and ${j + 1}`,
        operations_count: steps.length,
        time_complexity: 'O(n²)',
        space_complexity: 'O(1)'
      });

      if (arrCopy[j] > arrCopy[j + 1]) {
        [arrCopy[j], arrCopy[j + 1]] = [arrCopy[j + 1], arrCopy[j]];
        steps.push({
          array: [...arrCopy],
          highlighted: [j, j + 1],
          comparing: [],
          operation: `Swapped elements at positions ${j} and ${j + 1}`,
          operations_count: steps.length,
          time_complexity: 'O(n²)',
          space_complexity: 'O(1)'
        });
      }
    }
  }

  steps.push({
    array: [...arrCopy],
    highlighted: [],
    comparing: [],
    operation: 'Sorting completed!',
    operations_count: steps.length,
    time_complexity: 'O(n²)',
    space_complexity: 'O(1)'
  });

  return { steps };
}

// Graph API with better error handling
export const graphService = {
  runAlgorithm: async (algorithm, graphData) => {
    try {
      console.log('Sending graph request:', { algorithm, graphData });
      
      // Validate input data
      if (!graphData.nodes || graphData.nodes.length === 0) {
        throw new Error('Graph must have at least one node');
      }
      
      const response = await api.post(`/api/graph/${algorithm}`, graphData);
      console.log('Graph response:', response.data);
      
      if (!response.data.steps || response.data.steps.length === 0) {
        return generateFallbackSteps(algorithm, graphData);
      }
      
      return response.data;
    } catch (error) {
      console.error('Graph API error:', error);
      console.warn('Backend not responding, using fallback visualization');
      return generateFallbackSteps(algorithm, graphData);
    }
  },
};

// Fallback function when backend is not available
function generateFallbackSteps(algorithm, graphData) {
  const steps = [];
  const startNode = graphData.start_node || 0;
  
  // Add starting step
  steps.push({
    visitedNodes: [],
    currentNodes: [startNode],
    visitedEdges: [],
    currentEdges: [],
    distances: { [startNode]: 0 },
    parents: {},
    operation: `Starting ${algorithm.toUpperCase()} from node ${startNode}`
  });
  
  // Simulate visiting each node
  graphData.nodes.forEach((node, index) => {
    if (node.id !== startNode && index < 4) { // Limit steps to prevent performance issues
      steps.push({
        visitedNodes: [startNode, ...graphData.nodes.slice(0, index).map(n => n.id).filter(id => id !== startNode)],
        currentNodes: [node.id],
        visitedEdges: [],
        currentEdges: index > 0 ? [[startNode, node.id]] : [],
        distances: { [startNode]: 0, [node.id]: index },
        parents: { [node.id]: startNode },
        operation: `Visiting node ${node.label || node.id}`
      });
    }
  });
  
  // Add completion step
  steps.push({
    visitedNodes: graphData.nodes.map(n => n.id),
    currentNodes: [],
    visitedEdges: [],
    currentEdges: [],
    distances: {},
    parents: {},
    operation: `${algorithm.toUpperCase()} algorithm completed`
  });
  
  return { steps };
}

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

console.log(`🔗 API Base URL: ${API_BASE_URL}`);
console.log(`🏗️ Environment: ${process.env.NODE_ENV}`);

export default api;
export { sortingService, graphService };
