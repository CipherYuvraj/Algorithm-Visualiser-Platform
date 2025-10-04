const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// Create public directory if it doesn't exist
const publicDir = path.join(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Function to create a simple image with text
function createImageWithText(text, width, height, bgColor, textColor, outputPath) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  
  // Draw background
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, width, height);
  
  // Draw text
  ctx.fillStyle = textColor;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // Calculate font size based on canvas dimensions
  const fontSize = Math.min(width, height) * 0.15;
  ctx.font = `bold ${fontSize}px Arial`;
  
  // Split text into multiple lines if needed
  const words = text.split(' ');
  let line = '';
  const lines = [];
  const maxWidth = width * 0.9;
  
  for (const word of words) {
    const testLine = line ? `${line} ${word}` : word;
    const metrics = ctx.measureText(testLine);
    
    if (metrics.width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = testLine;
    }
  }
  if (line) lines.push(line);
  
  // Draw each line of text
  const lineHeight = fontSize * 1.2;
  const startY = (height - (lines.length - 1) * lineHeight) / 2;
  
  lines.forEach((line, i) => {
    ctx.fillText(line, width / 2, startY + (i * lineHeight));
  });
  
  // Save the image
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(outputPath, buffer);
  console.log(`Created: ${outputPath}`);
}

// Create manifest.json
const manifest = {
  "short_name": "AlgoVisualizer",
  "name": "Algorithm Visualizer Pro",
  "description": "Interactive algorithm visualization platform",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    },
    {
      "src": "logo192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "logo512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#4F46E5",
  "background_color": "#ffffff",
  "orientation": "portrait-primary"
};

// Write manifest file
fs.writeFileSync(
  path.join(publicDir, 'manifest.json'),
  JSON.stringify(manifest, null, 2)
);
console.log('Created: manifest.json');

// Create favicon
createImageWithText(
  'AV',
  64,
  64,
  '#4F46E5',
  '#FFFFFF',
  path.join(publicDir, 'favicon.ico')
);

// Create logo192.png
createImageWithText(
  'Algorithm Visualizer',
  192,
  192,
  '#4F46E5',
  '#FFFFFF',
  path.join(publicDir, 'logo192.png')
);

// Create logo512.png
createImageWithText(
  'Algorithm Visualizer Pro\nInteractive Learning Platform',
  512,
  512,
  '#4F46E5',
  '#FFFFFF',
  path.join(publicDir, 'logo512.png')
);

console.log('\n✅ Asset generation complete!');
console.log('You can now start the development server with: npm start');
