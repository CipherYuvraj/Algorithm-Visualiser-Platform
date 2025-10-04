const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');

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
  "background_color": "#ffffff"
};

// Write manifest file
fs.writeFileSync(
  path.join(publicDir, 'manifest.json'),
  JSON.stringify(manifest, null, 2)
);

console.log('✅ Created manifest.json in public directory');
console.log('\nNext steps:');
console.log('1. Open public/generate-assets.html in your browser');
console.log('2. Generate and save the required image assets');
console.log('3. Place them in the public/ directory');
console.log('4. Run the development server with: npm start');
