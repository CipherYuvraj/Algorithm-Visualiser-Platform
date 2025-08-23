import axios from 'axios';

// Smart API URL detection with better fallbacks
const getApiBaseUrl = () => {
  // Check if we're in development
  if (process.env.NODE_ENV === 'development') {
    return process.env.REACT_APP_API_URL || 'http://localhost:8000';
  }
  
  // Production: try various methods to detect API URL
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  
  // Same origin (for full-stack deployments)
  if (window.location.origin) {
    return window.location.origin;
  }
  
  // Fallback to common production patterns
  const host = window.location.hostname;
  if (host.includes('vercel.app') || host.includes('netlify.app')) {
    // For frontend-only deployments, API might not be available
    return null;
  }
  
  return window.location.origin;
};

const API_BASE_URL = getApiBaseUrl();

// Create axios instance only if we have a valid API URL
const api = API_BASE_URL ? axios.create({
  baseURL: API_BASE_URL,
  timeout: 8000, // 8 seconds
  headers: {
    'Content-Type': 'application/json',
  },
}) : null;

// Enhanced request interceptor
if (api) {
  api.interceptors.request.use(
    (config) => {
      // Only log in development
      if (process.env.NODE_ENV === 'development') {
        console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
      }
      return config;
    },
    (error) => {
      console.error('Request error:', error);
      return Promise.reject(error);
    }
  );

  // Enhanced response interceptor
  api.interceptors.response.use(
    (response) => {
      if (process.env.NODE_ENV === 'development') {
        console.log(`API Response: ${response.status} ${response.config.url}`);
      }
      return response;
    },
    (error) => {
      // Don't spam console in production
      if (process.env.NODE_ENV === 'development') {
        console.error('Response error:', error.response?.data || error.message);
      }
      
      // Handle timeout specifically
      if (error.code === 'ECONNABORTED') {
        return Promise.reject(new Error('Request timed out. Backend may not be running.'));
      }
      
      // Handle network errors
      if (error.code === 'ERR_NETWORK') {
        return Promise.reject(new Error('Cannot connect to backend. Server may not be running.'));
      }
      
      return Promise.reject(error);
    }
  );
}

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
    // Always use fallback if no API available
    if (!api || !API_BASE_URL) {
      console.log('No API available, using fallback visualization');
      return generateFallbackSteps(algorithm, graphData);
    }

    try {
      if (process.env.NODE_ENV === 'development') {
        console.log('Sending graph request:', { algorithm, graphData });
      }
      
      // Validate input data
      if (!graphData.nodes || graphData.nodes.length === 0) {
        throw new Error('Graph must have at least one node');
      }
      
      const response = await api.post(`/api/graph/${algorithm}`, graphData);
      
      if (process.env.NODE_ENV === 'development') {
        console.log('Graph response:', response.data);
      }
      
      if (!response.data.steps || response.data.steps.length === 0) {
        return generateFallbackSteps(algorithm, graphData);
      }
      
      return response.data;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Graph API error:', error);
      }
      console.log('Backend not responding, using fallback visualization');
      return generateFallbackSteps(algorithm, graphData);
    }
  },
};

// Enhanced fallback with more realistic algorithm simulation
function generateFallbackSteps(algorithm, graphData) {
  const steps = [];
  const startNode = graphData.start_node || 0;
  const nodes = graphData.nodes || [];
  const edges = graphData.edges || [];
  
  // Validate inputs
  if (nodes.length === 0) {
    return { steps: [{ 
      visitedNodes: [], 
      currentNodes: [], 
      operation: 'No nodes to process',
      visitedEdges: [],
      currentEdges: [],
      distances: {},
      parents: {}
    }] };
  }

  // Add starting step
  steps.push({
    visitedNodes: [],
    currentNodes: [startNode],
    visitedEdges: [],
    currentEdges: [],
    distances: { [startNode]: 0 },
    parents: {},
    operation: `Starting ${algorithm.toUpperCase()} from node ${nodes.find(n => n.id === startNode)?.label || startNode}`
  });
  
  // Simulate algorithm-specific behavior
  if (algorithm === 'bfs') {
    // BFS: level by level
    const queue = [startNode];
    const visited = new Set([startNode]);
    let level = 0;
    
    while (queue.length > 0 && level < 3) { // Limit iterations
      const current = queue.shift();
      const neighbors = edges
        .filter(e => e.from_node === current || e.to === current)
        .map(e => e.from_node === current ? e.to : e.from_node)
        .filter(n => !visited.has(n));
      
      neighbors.forEach(neighbor => {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
          
          steps.push({
            visitedNodes: Array.from(visited),
            currentNodes: [neighbor],
            visitedEdges: [],
            currentEdges: [[current, neighbor]],
            distances: { [startNode]: 0, [neighbor]: level + 1 },
            parents: { [neighbor]: current },
            operation: `BFS: Visiting ${nodes.find(n => n.id === neighbor)?.label || neighbor} at level ${level + 1}`
          });
        }
      });
      level++;
    }
  } else if (algorithm === 'dijkstra') {
    // Dijkstra: shortest path simulation
    const distances = { [startNode]: 0 };
    const visited = new Set();

    for (let i = 0; i < Math.min(nodes.length, 4); i++) {
      let current = null;
      let minDist = Infinity;

      // Find unvisited node with minimum distance
      for (const node of nodes) {
        if (!visited.has(node.id) && (distances[node.id] || Infinity) < minDist) {
          current = node.id;
          minDist = distances[node.id] || Infinity;
        }
      }

      // If no reachable unvisited node remains, stop
      if (current === null || minDist === Infinity) {
        break;
      }

      // Mark current as visited
      visited.add(current);

      // Ensure parents map exists for steps tracking
      const parents = {};

      // Relax edges from current
      for (const edge of edges) {
        const neighbor = edge.from_node === current ? edge.to : (edge.to === current ? edge.from_node : null);
        if (neighbor === null) continue;
        const weight = edge.weight != null ? edge.weight : 1;
        const newDist = (distances[current] || Infinity) + weight;
        if (newDist < (distances[neighbor] || Infinity)) {
          distances[neighbor] = newDist;
          parents[neighbor] = current;

          steps.push({
            visitedNodes: Array.from(visited),
            currentNodes: [neighbor],
            visitedEdges: [],
            currentEdges: [[current, neighbor]],
            distances: { ...distances },
            parents: { ...parents },
            operation: `Dijkstra: Updated distance for ${nodes.find(n => n.id === neighbor)?.label || neighbor} to ${newDist}`
          });
        }
      }
    }
  }

  // Final summary step for fallback simulation
  steps.push({
    visitedNodes: Array.from(new Set(steps.flatMap(s => s.visitedNodes || []))),
    currentNodes: [],
    visitedEdges: [],
    currentEdges: [],
    distances: steps.length ? (steps[steps.length - 1].distances || {}) : {},
    parents: steps.length ? (steps[steps.length - 1].parents || {}) : {},
    operation: `${algorithm.toUpperCase()} simulation completed`
  });

  return { steps };
}

console.log(`🔗 API Base URL: ${API_BASE_URL}`);
console.log(`🏗️ Environment: ${process.env.NODE_ENV}`);

export default api;
