#!/bin/bash
set -e

echo "🏗️  Building Algorithm Visualizer Platform..."

# Build frontend
echo "📦 Building frontend..."
cd frontend
npm install
npm run build
cd ..

# Check if build was successful
if [ ! -d "frontend/build" ]; then
    echo "❌ Frontend build failed!"
    exit 1
fi

echo "✅ Frontend built successfully"
echo "📄 New pages available:"
echo "   - About: /about"
echo "   - Documentation: /docs"

# Start backend
echo "🚀 Starting backend..."
cd backend
python main.py
