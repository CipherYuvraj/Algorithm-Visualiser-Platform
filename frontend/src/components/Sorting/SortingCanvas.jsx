import React, { useEffect, useRef, forwardRef, useCallback } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const themeColors = {
  classic: {
    background: (isDark) => isDark ? '#1f2937' : '#f8fafc',
    bar: (isDark) => isDark ? '#6b7280' : '#e5e7eb',
    comparing: '#ef4444',
    swapping: '#f59e0b',
    sorted: '#10b981',
    text: (isDark) => isDark ? '#ffffff' : '#000000',
    glow: '#3b82f6'
  },
  neon: {
    background: () => '#0f172a',
    bar: () => '#312e81',
    comparing: '#f0abfc',
    swapping: '#f472b6',
    sorted: '#22d3ee',
    text: () => '#ffffff',
    glow: '#a855f7'
  },
  minimal: {
    background: (isDark) => isDark ? '#18181b' : '#fafafa',
    bar: (isDark) => isDark ? '#3f3f46' : '#d4d4d8',
    comparing: '#525252',
    swapping: '#737373',
    sorted: '#404040',
    text: (isDark) => isDark ? '#ffffff' : '#000000',
    glow: '#71717a'
  }
};

const SortingCanvas = forwardRef(({ 
  array,
  comparing = [],
  swapping = [],
  sorted = [],
  theme = 'classic',
  compact = false,
}, ref) => {
  const { isDark } = useTheme();
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const lastRenderTime = useRef(0);

  const getColor = useCallback((index) => {
    const colors = themeColors[theme] || themeColors.classic;
    
    if (sorted.includes(index)) {
      return colors.sorted;
    }
    if (swapping.includes(index)) {
      return colors.swapping;
    }
    if (comparing.includes(index)) {
      return colors.comparing;
    }
    return colors.bar(isDark);
  }, [theme, isDark, comparing, swapping, sorted]);

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !array) return;

    const now = Date.now();
    if (now - lastRenderTime.current < 16) return; // Limit to ~60fps
    lastRenderTime.current = now;

    try {
      const ctx = canvas.getContext('2d');
      const { width, height } = canvas;
      
      // Clear canvas with theme background
      const colors = themeColors[theme] || themeColors.classic;
      ctx.fillStyle = colors.background(isDark);
      ctx.fillRect(0, 0, width, height);
      
      if (!Array.isArray(array) || array.length === 0) return;
      
      const maxValue = Math.max(...array);
      if (maxValue <= 0) return;
      
      const barWidth = width / array.length;
      const maxBarHeight = height - 40;
      
      // Draw bars with glow effect for neon theme
      array.forEach((value, index) => {
        if (typeof value !== 'number' || value < 0) return;
        
        const barHeight = (value / maxValue) * maxBarHeight;
        const x = index * barWidth;
        const y = height - barHeight - 20;
        
        if (theme === 'neon') {
          ctx.shadowColor = colors.glow;
          ctx.shadowBlur = 15;
        } else {
          ctx.shadowBlur = 0;
        }
        
        // Draw bar
        ctx.fillStyle = getColor(index);
        ctx.fillRect(x + 2, y, barWidth - 4, barHeight);
        
        // Draw value label with theme color
        ctx.fillStyle = colors.text(isDark);
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(value.toString(), x + barWidth / 2, height - 5);
      });
      
      if (ref) {
        ref.current = canvas;
      }
    } catch (error) {
      console.error('Canvas drawing error:', error);
    }
  }, [array, comparing, swapping, sorted, theme, isDark, getColor, ref]);

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
