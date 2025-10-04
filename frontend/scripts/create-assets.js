const fs = require('fs');
const path = require('path');

// Create simple SVG-based assets
function createSVGIcon(size, filename, text) {
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="#4F46E5" rx="${size/10}"/>
  <text x="50%" y="50%" text-anchor="middle" dy="0.3em" fill="white" font-family="Arial, sans-serif" font-size="${Math.floor(size/3)}" font-weight="bold">${text}</text>
</svg>`;

  const publicDir = path.join(__dirname, '../public');
  const filePath = path.join(publicDir, filename);
  
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  fs.writeFileSync(filePath, svg);
  console.log(`✅ Created ${filename} (${size}x${size})`);
}

// Create favicon.ico
function createFavicon() {
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
  <rect width="32" height="32" fill="#4F46E5" rx="4"/>
  <text x="16" y="20" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="12" font-weight="bold">AV</text>
</svg>`;

  const publicDir = path.join(__dirname, '../public');
  const filePath = path.join(publicDir, 'favicon.svg');
  
  fs.writeFileSync(filePath, svg);
  console.log('✅ Created favicon.svg');
}

// Create all assets
console.log('🎨 Creating placeholder assets...\n');

createFavicon();
createSVGIcon(192, 'logo192.svg', 'AV');
createSVGIcon(512, 'logo512.svg', 'AV');

// Create manifest.json
const manifest = {
  "short_name": "AlgoViz",
  "name": "Algorithm Visualizer Pro",
  "description": "Interactive algorithm visualization platform",
  "icons": [
    {
      "src": "favicon.svg",
      "type": "image/svg+xml",
      "sizes": "any"
    },
    {
      "src": "logo192.svg",
      "type": "image/svg+xml",
      "sizes": "192x192",
      "purpose": "any maskable"
    },
    {
      "src": "logo512.svg",
      "type": "image/svg+xml",
      "sizes": "512x512",
      "purpose": "any maskable"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#4F46E5",
  "background_color": "#ffffff",
  "orientation": "portrait-primary"
};

// Write manifest file
const publicDir = path.join(__dirname, '../public');
fs.writeFileSync(
  path.join(publicDir, 'manifest.json'),
  JSON.stringify(manifest, null, 2)
);
console.log('✅ Created manifest.json');

console.log('\n🎉 All assets created successfully!');
console.log('💡 Note: For production, consider creating proper PNG/ICO files.');
console.log('   The SVG assets will work for development purposes.');
