# Docker Deployment Guide

## Quick Start

### 1. Local Docker Build & Run
```bash
# Build the image
docker build -t algorithm-visualizer .

# Run locally
docker run -p 8000:8000 algorithm-visualizer

# Or use docker-compose
docker-compose up --build
```

### 2. Deploy to Railway (Recommended)
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up

# Railway will automatically detect and build the Dockerfile
```

### 3. Deploy to Render
1. Connect your GitHub repo to Render
2. Create a new Web Service
3. Set Docker as the environment
4. Deploy automatically builds from Dockerfile

### 4. Deploy to DigitalOcean App Platform
1. Connect your GitHub repo
2. Choose Docker as the source
3. Set port to 8000
4. Deploy

### 5. Deploy to Heroku (Container Registry)
```bash
# Install Heroku CLI and login
heroku login
heroku container:login

# Create app
heroku create your-app-name

# Build and push
heroku container:push web
heroku container:release web
```

## Environment Variables

Set these in your deployment platform:

```bash
ENVIRONMENT=production
PORT=8000
```

## Testing Docker Build Locally

```bash
# Build
docker build -t algo-viz .

# Run
docker run -p 8000:8000 \
  -e ENVIRONMENT=production \
  algo-viz

# Test
curl http://localhost:8000/health
```

## Deployment Platforms Comparison

| Platform | Ease | Free Tier | Auto Deploy | Best For |
|----------|------|-----------|-------------|----------|
| Railway | ⭐⭐⭐⭐⭐ | Limited | ✅ | Beginners |
| Render | ⭐⭐⭐⭐ | Good | ✅ | Small projects |
| DigitalOcean | ⭐⭐⭐ | $5/month | ✅ | Production |
| Heroku | ⭐⭐⭐ | Limited | ✅ | Enterprise |

## Recommended: Railway Deployment

Railway is the easiest for Docker deployments:

```bash
npm install -g @railway/cli
railway login
railway init
railway up
```

Your app will be live in minutes!
