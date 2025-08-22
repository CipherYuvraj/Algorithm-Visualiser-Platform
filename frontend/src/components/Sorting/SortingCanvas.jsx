import React, { useEffect, useRef } from 'react';

const SortingCanvas = ({ data, algorithm }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !data.array) return;

    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    const array = data.array;
    const maxValue = Math.max(...array);
    const barWidth = (width - 40) / array.length;
    const maxBarHeight = height - 80;

    // Draw bars
    array.forEach((value, index) => {
      const barHeight = (value / maxValue) * maxBarHeight;
      const x = 20 + index * barWidth;
      const y = height - barHeight - 40;

      // Determine bar color
      let color = '#3b82f6'; // Default blue
      
      if (data.comparing && data.comparing.includes(index)) {
        color = '#ef4444'; // Red for comparing
      } else if (data.highlighted && data.highlighted.includes(index)) {
        color = '#10b981'; // Green for highlighted
      }

      // Draw bar
      ctx.fillStyle = color;
      ctx.fillRect(x + 2, y, barWidth - 4, barHeight);
      
      // Draw value on top of bar
      ctx.fillStyle = '#374151';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(value.toString(), x + barWidth / 2, y - 5);
      
      // Draw index at bottom
      ctx.fillStyle = '#6b7280';
      ctx.font = '10px Arial';
      ctx.fillText(index.toString(), x + barWidth / 2, height - 20);
    });

    // Draw legend
    const legendY = height - 15;
    ctx.font = '12px Arial';
    ctx.textAlign = 'left';
    
    ctx.fillStyle = '#3b82f6';
    ctx.fillRect(20, legendY, 15, 10);
    ctx.fillStyle = '#374151';
    ctx.fillText('Normal', 40, legendY + 8);
    
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(100, legendY, 15, 10);
    ctx.fillText('Comparing', 120, legendY + 8);
    
    ctx.fillStyle = '#10b981';
    ctx.fillRect(200, legendY, 15, 10);
    ctx.fillText('Modified', 220, legendY + 8);

  }, [data, algorithm]);

  return (
    <div className="border rounded-lg overflow-hidden bg-gray-50">
      <canvas
        ref={canvasRef}
        width={800}
        height={400}
        className="w-full h-auto"
      />
    </div>
  );
};

export default SortingCanvas;
