import React from 'react';
import { Shuffle, Plus, Trash2 } from 'lucide-react';

const GraphInput = ({ 
  nodes, 
  edges, 
  startNode, 
  endNode, 
  onNodesChange, 
  onEdgesChange, 
  onStartNodeChange, 
  onEndNodeChange, 
  onRandomize,
  darkMode 
}) => {
  
  const addNode = () => {
    const newNode = {
      id: nodes.length,
      label: String.fromCharCode(65 + nodes.length),
      x: Math.random() * 400 + 100,
      y: Math.random() * 200 + 100
    };
    onNodesChange([...nodes, newNode]);
  };

  const removeNode = (nodeId) => {
    const newNodes = nodes.filter(n => n.id !== nodeId).map((n, i) => ({ ...n, id: i }));
    const newEdges = edges.filter(e => e.from_node !== nodeId && e.to !== nodeId)
                         .map(e => ({
                           ...e,
                           from_node: e.from_node > nodeId ? e.from_node - 1 : e.from_node,
                           to: e.to > nodeId ? e.to - 1 : e.to
                         }));
    onNodesChange(newNodes);
    onEdgesChange(newEdges);
  };

  const addEdge = () => {
    if (nodes.length < 2) return;
    
    const newEdge = {
      from_node: 0,
      to: nodes.length > 1 ? 1 : 0,
      weight: 1,
      directed: false
    };
    onEdgesChange([...edges, newEdge]);
  };

  const updateEdge = (index, field, value) => {
    const newEdges = [...edges];
    newEdges[index] = { ...newEdges[index], [field]: value };
    onEdgesChange(newEdges);
  };

  const removeEdge = (index) => {
    const newEdges = edges.filter((_, i) => i !== index);
    onEdgesChange(newEdges);
  };

  return (
    <div className="space-y-6">
      {/* Node Selection */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Start Node
          </label>
          <select
            value={startNode}
            onChange={(e) => onStartNodeChange(parseInt(e.target.value))}
            className={`w-full p-2 rounded border ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-800'
            }`}
          >
            {nodes.map(node => (
              <option key={node.id} value={node.id}>
                {node.label} (Node {node.id})
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            End Node
          </label>
          <select
            value={endNode}
            onChange={(e) => onEndNodeChange(parseInt(e.target.value))}
            className={`w-full p-2 rounded border ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-800'
            }`}
          >
            {nodes.map(node => (
              <option key={node.id} value={node.id}>
                {node.label} (Node {node.id})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Nodes Management */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h5 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Nodes ({nodes.length})
          </h5>
          <button
            onClick={addNode}
            className={`px-3 py-1 rounded text-sm flex items-center space-x-1 ${
              darkMode 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            <Plus className="h-3 w-3" />
            <span>Add Node</span>
          </button>
        </div>
        
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {nodes.map(node => (
            <div key={node.id} className={`flex items-center justify-between p-2 rounded ${
              darkMode ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <span className={`text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {node.label} (ID: {node.id})
              </span>
              {nodes.length > 2 && (
                <button
                  onClick={() => removeNode(node.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Edges Management */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h5 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Edges ({edges.length})
          </h5>
          <button
            onClick={addEdge}
            disabled={nodes.length < 2}
            className={`px-3 py-1 rounded text-sm flex items-center space-x-1 disabled:opacity-50 ${
              darkMode 
                ? 'bg-green-600 hover:bg-green-700 text-white' 
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            <Plus className="h-3 w-3" />
            <span>Add Edge</span>
          </button>
        </div>
        
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {edges.map((edge, index) => (
            <div key={index} className={`p-3 rounded border ${
              darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="grid grid-cols-4 gap-2 mb-2">
                <select
                  value={edge.from_node}
                  onChange={(e) => updateEdge(index, 'from_node', parseInt(e.target.value))}
                  className={`p-1 rounded text-xs ${
                    darkMode ? 'bg-gray-600 text-white' : 'bg-white text-gray-800'
                  }`}
                >
                  {nodes.map(node => (
                    <option key={node.id} value={node.id}>{node.label}</option>
                  ))}
                </select>
                
                <select
                  value={edge.to}
                  onChange={(e) => updateEdge(index, 'to', parseInt(e.target.value))}
                  className={`p-1 rounded text-xs ${
                    darkMode ? 'bg-gray-600 text-white' : 'bg-white text-gray-800'
                  }`}
                >
                  {nodes.map(node => (
                    <option key={node.id} value={node.id}>{node.label}</option>
                  ))}
                </select>
                
                <input
                  type="number"
                  min="1"
                  max="99"
                  value={edge.weight}
                  onChange={(e) => updateEdge(index, 'weight', parseInt(e.target.value) || 1)}
                  className={`p-1 rounded text-xs ${
                    darkMode ? 'bg-gray-600 text-white' : 'bg-white text-gray-800'
                  }`}
                  placeholder="Weight"
                />
                
                <button
                  onClick={() => removeEdge(index)}
                  className="text-red-500 hover:text-red-600 text-xs"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
              
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={edge.directed}
                  onChange={(e) => updateEdge(index, 'directed', e.target.checked)}
                  className="text-blue-500"
                />
                <span className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Directed
                </span>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Random Graph Button */}
      <button
        onClick={onRandomize}
        className={`w-full py-2 px-4 rounded font-medium transition-colors flex items-center justify-center space-x-2 ${
          darkMode 
            ? 'bg-purple-600 hover:bg-purple-700 text-white' 
            : 'bg-purple-500 hover:bg-purple-600 text-white'
        }`}
      >
        <Shuffle className="h-4 w-4" />
        <span>Generate Random Graph</span>
      </button>
    </div>
  );
};

export default GraphInput;
