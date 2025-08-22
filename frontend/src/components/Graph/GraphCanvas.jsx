import React, { useRef, useEffect, forwardRef } from 'react';

const GraphCanvas = forwardRef(({ 
  nodes, 
  edges, 
  stepData, 
  startNode, 
  endNode, 
  algorithm, 
  darkMode 
}, ref) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;
    
    // Clear canvas
    ctx.fillStyle = darkMode ? '#1f2937' : '#f8fafc';
    ctx.fillRect(0, 0, width, height);
    
    // Draw edges
    edges.forEach(edge => {
      const fromNode = nodes.find(n => n.id === edge.from_node);
      const toNode = nodes.find(n => n.id === edge.to);
      
      if (!fromNode || !toNode) return;
      
      // Determine edge color
      let edgeColor = darkMode ? '#6b7280' : '#9ca3af';
      let lineWidth = 2;
      
      if (stepData.visitedEdges?.some(([from, to]) => 
        (from === edge.from_node && to === edge.to) || 
        (!edge.directed && from === edge.to && to === edge.from_node)
      )) {
        edgeColor = '#10b981'; // Green for visited
        lineWidth = 3;
      } else if (stepData.currentEdges?.some(([from, to]) => 
        (from === edge.from_node && to === edge.to) || 
        (!edge.directed && from === edge.to && to === edge.from_node)
      )) {
        edgeColor = '#f59e0b'; // Orange for current
        lineWidth = 4;
      }
      
      // Draw edge
      ctx.beginPath();
      ctx.moveTo(fromNode.x, fromNode.y);
      ctx.lineTo(toNode.x, toNode.y);
      ctx.strokeStyle = edgeColor;
      ctx.lineWidth = lineWidth;
      ctx.stroke();
      
      // Draw weight
      const midX = (fromNode.x + toNode.x) / 2;
      const midY = (fromNode.y + toNode.y) / 2;
      
      ctx.fillStyle = darkMode ? '#ffffff' : '#000000';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(edge.weight.toString(), midX, midY - 5);
      
      // Draw arrow for directed edges
      if (edge.directed) {
        const angle = Math.atan2(toNode.y - fromNode.y, toNode.x - fromNode.x);
        const arrowLength = 15;
        const arrowX = toNode.x - Math.cos(angle) * 25;
        const arrowY = toNode.y - Math.sin(angle) * 25;
        
        ctx.beginPath();
        ctx.moveTo(arrowX, arrowY);
        ctx.lineTo(
          arrowX - arrowLength * Math.cos(angle - Math.PI / 6),
          arrowY - arrowLength * Math.sin(angle - Math.PI / 6)
        );
        ctx.moveTo(arrowX, arrowY);
        ctx.lineTo(
          arrowX - arrowLength * Math.cos(angle + Math.PI / 6),
          arrowY - arrowLength * Math.sin(angle + Math.PI / 6)
        );
        ctx.strokeStyle = edgeColor;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    });
    
    // Draw nodes
    nodes.forEach(node => {
      // Determine node color and size
      let nodeColor = darkMode ? '#4b5563' : '#e5e7eb';
      let borderColor = darkMode ? '#6b7280' : '#9ca3af';
      let textColor = darkMode ? '#ffffff' : '#000000';
      let radius = 20;
      
      if (node.id === startNode) {
        nodeColor = '#3b82f6'; // Blue for start
        borderColor = '#1e40af';
        textColor = '#ffffff';
      } else if (node.id === endNode) {
        nodeColor = '#ef4444'; // Red for end
        borderColor = '#dc2626';
        textColor = '#ffffff';
      } else if (stepData.visitedNodes?.includes(node.id)) {
        nodeColor = '#10b981'; // Green for visited
        borderColor = '#059669';
        textColor = '#ffffff';
      } else if (stepData.currentNodes?.includes(node.id)) {
        nodeColor = '#f59e0b'; // Orange for current
        borderColor = '#d97706';
        textColor = '#ffffff';
        radius = 25; // Larger for current
      }
      
      // Draw node
      ctx.beginPath();
      ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI);
      ctx.fillStyle = nodeColor;
      ctx.fill();
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = 3;
      ctx.stroke();
      
      // Draw label
      ctx.fillStyle = textColor;
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(node.label, node.x, node.y + 5);
      
      // Draw distance (for shortest path algorithms)
      if (stepData.distances && stepData.distances[node.id] !== undefined) {
        const distance = stepData.distances[node.id];
        if (distance !== Infinity) {
          ctx.fillStyle = darkMode ? '#fbbf24' : '#f59e0b';
          ctx.font = '10px Arial';
          ctx.fillText(`d:${distance}`, node.x, node.y - radius - 5);
        }
      }
    });
    
    // Update ref for canvas export
    if (ref) {
      ref.current = canvas;
    }
    
  }, [nodes, edges, stepData, startNode, endNode, algorithm, darkMode, ref]);

  return (
    <div className="border-2 border-gray-200 rounded-lg overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100 shadow-inner">
      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        className="w-full h-auto"
        style={{ maxHeight: '400px' }}
      />
    </div>
  );
});

GraphCanvas.displayName = 'GraphCanvas';

export default GraphCanvas;
