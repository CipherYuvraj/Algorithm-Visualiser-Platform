import React, { useEffect, useRef, forwardRef, useCallback } from 'react';

const SortingCanvas = forwardRef(({ 
  data, 
  algorithm, 
  compact = false,
  selectedAlgorithm,
  darkMode = false,
  enhanced = false
}, ref) => {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const lastRenderTime = useRef(0);

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !data || !data.array) return;

    // Prevent excessive rendering
    const now = Date.now();
    if (now - lastRenderTime.current < 16) return; // Limit to ~60fps
    lastRenderTime.current = now;

    try {
      const ctx = canvas.getContext('2d');
      const { width, height } = canvas;
      
      // Clear canvas
      ctx.fillStyle = darkMode ? '#1f2937' : '#f8fafc';
      ctx.fillRect(0, 0, width, height);
      
      // Validate array data
      if (!Array.isArray(data.array) || data.array.length === 0) return;
      
      // Draw bars
      const maxValue = Math.max(...data.array);
      if (maxValue <= 0) return;
      
      const barWidth = width / data.array.length;
      const maxBarHeight = height - 40;
      
      data.array.forEach((value, index) => {
        if (typeof value !== 'number' || value < 0) return;
        
        const barHeight = (value / maxValue) * maxBarHeight;
        const x = index * barWidth;
        const y = height - barHeight - 20;
        
        // Determine bar color
        let barColor = darkMode ? '#6b7280' : '#e5e7eb';
        
        if (data.highlighted?.includes(index)) {
          barColor = '#f59e0b'; // Orange for highlighted
        } else if (data.comparing?.includes(index)) {
          barColor = '#ef4444'; // Red for comparing
        }
        
        // Draw bar
        ctx.fillStyle = barColor;
        ctx.fillRect(x + 2, y, barWidth - 4, barHeight);
        
        // Draw value label
        ctx.fillStyle = darkMode ? '#ffffff' : '#000000';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(value.toString(), x + barWidth / 2, height - 5);
      });
      
      // Update ref for canvas export
      if (ref) {
        ref.current = canvas;
      }
    } catch (error) {
      console.error('Canvas drawing error:', error);
    }
  }, [data, algorithm, darkMode, enhanced, ref]);

  useEffect(() => {
    // Cancel any pending animation frame
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    // Schedule new render
    animationFrameRef.current = requestAnimationFrame(drawCanvas);
    
    // Cleanup function
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [drawCanvas]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="border-2 border-gray-200 rounded-lg overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100 shadow-inner">
      <canvas
        ref={canvasRef}
        width={600}
        height={300}
        className="w-full h-auto"
        style={{ maxHeight: '300px' }}
      />
    </div>
  );
});

SortingCanvas.displayName = 'SortingCanvas';

export default SortingCanvas;
