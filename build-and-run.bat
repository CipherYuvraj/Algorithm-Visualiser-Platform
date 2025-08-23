@echo off
echo 🏗️  Building Algorithm Visualizer Platform...

REM Build frontend
echo 📦 Building frontend...
cd frontend
call npm install
call npm run build
cd ..

REM Check if build was successful
if not exist "frontend\build" (
    echo ❌ Frontend build failed!
    exit /b 1
)

echo ✅ Frontend built successfully

REM Start backend
echo 🚀 Starting backend...
cd backend
python main.py
