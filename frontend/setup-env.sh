#!/bin/bash

# Create .env.local file with default values
cat > .env.local <<EOL
# API Configuration
VITE_API_BASE_URL=http://localhost:8000

# Analytics Configuration
VITE_ANALYTICS_ENABLED=true

# App Configuration
VITE_APP_TITLE=Algorithm Visualizer Pro
VITE_NODE_ENV=development
EOL

echo "Created .env.local file with default values"
echo "Please review and edit .env.local if needed"
