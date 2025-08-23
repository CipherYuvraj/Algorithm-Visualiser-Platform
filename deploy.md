# Deployment Guide

## Quick Deployment Options

### 1. Frontend Only (Recommended for beginners)

#### Vercel (Easiest)
```bash
cd frontend
npm run build
npx vercel --prod
```

#### Netlify
```bash
cd frontend
npm run build
npx netlify deploy --prod --dir=build
```

### 2. Full Stack Deployment

#### Railway (Recommended)
```bash
# Install Railway CLI
npm install -g @railway/cli

# Deploy
railway login
railway init
railway up
```

#### Render
1. Connect your GitHub repo to Render
2. Create a Web Service
3. Build Command: `npm run build`
4. Start Command: `cd backend && python main.py`

#### Heroku
```bash
# Create Heroku app
heroku create your-app-name

# Set environment variables
heroku config:set ENVIRONMENT=production

# Deploy
git add .
git commit -m "Deploy to Heroku"
git push heroku main
```

## Environment Variables

Set these in your deployment platform:

```bash
ENVIRONMENT=production
PORT=8000
```

## Build Steps

1. **Build Frontend:**
   ```bash
   cd frontend
   npm install
   npm run build
   ```

2. **Install Backend Dependencies:**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

3. **Start Production Server:**
   ```bash
   cd backend
   ENVIRONMENT=production python main.py
   ```

## Troubleshooting

- If you get "build directory not found" error, run `npm run build` in the frontend directory first
- Make sure Python 3.9+ is installed
- Check that all dependencies are installed correctly
