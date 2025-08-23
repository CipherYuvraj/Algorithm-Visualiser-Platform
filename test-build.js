const fs = require('fs');
const path = require('path');

const buildPaths = [
    './frontend/build/index.html',
    '../frontend/build/index.html',
    './build/index.html'
];

console.log('🔍 Checking for frontend build...');

buildPaths.forEach(buildPath => {
    const exists = fs.existsSync(buildPath);
    console.log(`${exists ? '✅' : '❌'} ${buildPath} - ${exists ? 'Found' : 'Not found'}`);
});

const currentDir = process.cwd();
console.log(`📂 Current directory: ${currentDir}`);
console.log('📋 Directory contents:');
fs.readdirSync('.').forEach(item => {
    const stats = fs.statSync(item);
    console.log(`   ${stats.isDirectory() ? '📁' : '📄'} ${item}`);
});
