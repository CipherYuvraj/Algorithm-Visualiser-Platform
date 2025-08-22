import React, { useEffect, useRef } from 'react';

const SortingCanvas = ({ data, algorithm, compact = false }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !data.array) return;

    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;
    
    // Adjust dimensions for compact mode
    const canvasHeight = compact ? 300 : 450;
    const canvasWidth = compact ? 600 : 800;
    
    if (canvas.height !== canvasHeight) {
      canvas.height = canvasHeight;
      canvas.width = canvasWidth;
    }
    
    // Clear canvas with gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, '#f8fafc');
    gradient.addColorStop(1, '#e2e8f0');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    const array = data.array;
    const maxValue = Math.max(...array);
    const barWidth = Math.max(compact ? 35 : 45, (width - 80) / array.length);
    const maxBarHeight = height - (compact ? 80 : 120);
    const startX = (width - (array.length * barWidth)) / 2;

    // Enhanced bar rendering with animations
    array.forEach((value, index) => {
      const barHeight = (value / maxValue) * maxBarHeight;
      const x = startX + index * barWidth;
      const y = height - barHeight - (compact ? 50 : 60);

      // Determine bar color with enhanced scheme
      let barColor = '#3b82f6'; // Default blue
      let shadowColor = '#1e40af';
      let textColor = '#1f2937';
      
      if (data.comparing && data.comparing.includes(index)) {
        barColor = '#ef4444'; // Red for comparing
        shadowColor = '#dc2626';
        textColor = '#fff';
        // Add pulsing effect for comparing bars
        const pulse = Math.sin(Date.now() * 0.01) * 0.1 + 0.9;
        ctx.globalAlpha = pulse;
      } else if (data.highlighted && data.highlighted.includes(index)) {
        barColor = '#10b981'; // Green for highlighted/swapped
        shadowColor = '#059669';
        textColor = '#fff';
      } else if (data.operation.includes('Complete')) {
        // Gradient effect for completed sort
        const gradient = ctx.createLinearGradient(x, y, x, y + barHeight);
        gradient.addColorStop(0, '#8b5cf6');
        gradient.addColorStop(1, '#7c3aed');
        barColor = gradient;
        shadowColor = '#6d28d9';
        textColor = '#fff';
      }

      // Draw shadow for depth
      ctx.fillStyle = shadowColor;
      ctx.fillRect(x + 2, y + 2, barWidth - 8, barHeight);
      
      // Draw main bar with rounded corners
      ctx.fillStyle = barColor;
      ctx.beginPath();
      ctx.roundRect(x + 1, y, barWidth - 6, barHeight, 3);
      ctx.fill();
      
      // Add highlight effect on top
      const highlight = ctx.createLinearGradient(x, y, x, y + 15);
      highlight.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
      highlight.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = highlight;
      ctx.beginPath();
      ctx.roundRect(x + 1, y, barWidth - 6, 15, 3);
      ctx.fill();
      
      // Reset alpha
      ctx.globalAlpha = 1;
      
      // Draw value on bar with better positioning
      ctx.fillStyle = textColor;
      ctx.font = `bold ${compact ? '12px' : '14px'} Inter, Arial, sans-serif`;
      ctx.textAlign = 'center';
      const textY = barHeight < 25 ? y - 6 : y + barHeight / 2 + 4;
      ctx.fillText(value.toString(), x + barWidth / 2, textY);
      
      // Draw index at bottom with enhanced styling
      ctx.fillStyle = '#6b7280';
      ctx.font = `${compact ? '10px' : '12px'} Inter, Arial, sans-serif`;
      ctx.fillText(index.toString(), x + barWidth / 2, height - (compact ? 25 : 35));
    });

    // Compact legend
    if (compact) {
      const legendY = height - 20;
      const legendItems = [
        { color: '#3b82f6', label: 'Normal' },
        { color: '#ef4444', label: 'Comparing' },
        { color: '#10b981', label: 'Modified' },
        { color: '#8b5cf6', label: 'Sorted' }
      ];
      
      let legendX = 20;
      legendItems.forEach(item => {
        // Draw legend box with border
        ctx.fillStyle = item.color;
        ctx.fillRect(legendX, legendY, 12, 8);
        ctx.fillStyle = '#374151';
        ctx.font = '10px Inter, Arial, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(item.label, legendX + 16, legendY + 6);
        
        legendX += ctx.measureText(item.label).width + 35;
      });
    }

    // Add algorithm name and complexity info
    ctx.fillStyle = '#1f2937';
    ctx.font = `bold ${compact ? '14px' : '16px'} Inter, Arial, sans-serif`;
    ctx.textAlign = 'left';
    ctx.fillText(`${algorithm.charAt(0).toUpperCase() + algorithm.slice(1)} Sort`, 20, 20);

  }, [data, algorithm, compact]);

  return (
    <div className={`border-2 border-gray-200 rounded-lg overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100 shadow-inner ${compact ? 'h-72' : 'h-96'}`}>
      <canvas
        ref={canvasRef}
        width={compact ? 600 : 800}
        height={compact ? 300 : 450}
        className="w-full h-full"
      />
    </div>
  );
};

export default SortingCanvas;
