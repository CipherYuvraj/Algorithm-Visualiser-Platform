# Optimized Dockerfile for Railway deployment

FROM node:18-alpine AS frontend-build
WORKDIR /app

# Copy frontend files
COPY frontend/package*.json ./frontend/
WORKDIR /app/frontend
RUN npm ci --only=production

COPY frontend/ ./
RUN npm run build

# Python backend stage
FROM python:3.11-slim
WORKDIR /app

# Install dependencies
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Python dependencies
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy application
COPY backend/ ./
COPY --from=frontend-build /app/frontend/build ./frontend/build

# Railway uses PORT environment variable
ENV ENVIRONMENT=production
EXPOSE $PORT

CMD ["sh", "-c", "python main.py"]
