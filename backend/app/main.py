import os
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel, ConfigDict
from typing import List, Optional, Dict, Any
import uvicorn
from datetime import datetime, timedelta

# Import database and analytics
from app.database import get_database, analytics_db
from app.routers import analytics as analytics_router

app = FastAPI(
    title="Algorithm Visualizer API",
    description="Backend API for Algorithm Visualizer Platform with Analytics",
    version="1.0.0"
)

# Environment detection
ENVIRONMENT = os.getenv("ENVIRONMENT", "development")
IS_PRODUCTION = ENVIRONMENT == "production"

# Configure CORS
origins = ["*"] if not IS_PRODUCTION else [
    "https://yourdomain.com",
    "https://www.yourdomain.com"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include analytics router
app.include_router(analytics_router.router)

# Lazy import services to avoid import issues
_sorting_service = None
_graph_service = None

def get_sorting_service():
    global _sorting_service
    if _sorting_service is None:
        try:
            from backend.services.sorting_service import SortingService
            _sorting_service = SortingService()
        except ImportError:
            try:
                from services.sorting_service import SortingService
                _sorting_service = SortingService()
            except ImportError as e:
                raise HTTPException(status_code=500, detail=f"Cannot import SortingService: {e}")
    return _sorting_service

def get_graph_service():
    global _graph_service
    if _graph_service is None:
        try:
            from backend.services.graph_service import GraphService
            _graph_service = GraphService()
        except ImportError:
            try:
                from services.graph_service import GraphService
                _graph_service = GraphService()
            except ImportError as e:
                raise HTTPException(status_code=500, detail=f"Cannot import GraphService: {e}")
    return _graph_service

# Request models with Pydantic v2 config
class SortingRequest(BaseModel):
    model_config = ConfigDict(populate_by_name=True)
    array: List[int]

class GraphNodeModel(BaseModel):
    model_config = ConfigDict(populate_by_name=True)
    id: int
    label: Optional[str] = ""
    x: Optional[float] = 0.0
    y: Optional[float] = 0.0

class GraphEdgeModel(BaseModel):
    model_config = ConfigDict(populate_by_name=True)
    from_node: int
    to: int
    weight: Optional[float] = 1.0
    directed: Optional[bool] = False

class GraphRequest(BaseModel):
    model_config = ConfigDict(populate_by_name=True)
    nodes: List[GraphNodeModel]
    edges: List[GraphEdgeModel]
    start_node: Optional[int] = 0
    end_node: Optional[int] = None

# Health check endpoint
@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "environment": ENVIRONMENT}

# Sorting endpoints
@app.post("/api/sort/{algorithm}")
async def run_sorting_algorithm(algorithm: str, request: SortingRequest):
    service = get_sorting_service()
    try:
        result = service.sort(algorithm, request.array)
        return {"sorted_array": result}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Graph endpoints
@app.post("/api/graph/{algorithm}")
async def run_graph_algorithm(algorithm: str, request: GraphRequest):
    service = get_graph_service()
    
    # Convert request to the format expected by the service
    graph_data = {
        "nodes": [{"id": node.id, "label": node.label, "x": node.x, "y": node.y} 
                 for node in request.nodes],
        "edges": [{"from": edge.from_node, "to": edge.to, 
                  "weight": edge.weight, "directed": edge.directed} 
                 for edge in request.edges],
        "start_node": request.start_node,
        "end_node": request.end_node
    }
    
    try:
        result = service.run_algorithm(algorithm, graph_data)
        return result
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# String algorithms placeholder
@app.post("/api/string/{algorithm}")
async def run_string_algorithm(algorithm: str, request: dict):
    return {"message": f"String algorithm {algorithm} execution not implemented yet"}

# DP algorithms placeholder
@app.post("/api/dp/{algorithm}")
async def run_dp_algorithm(algorithm: str, request: dict):
    return {"message": f"DP algorithm {algorithm} execution not implemented yet"}

# Clean up old analytics data on startup
@app.on_event("startup")
async def startup_event():
    try:
        # Clean up data older than 90 days
        await analytics_db.clean_old_data(days_to_keep=90)
        print("Successfully cleaned up old analytics data")
    except Exception as e:
        print(f"Error during startup cleanup: {e}")

# Check if frontend is built and available
frontend_path = os.path.join(os.path.dirname(__file__), "..", "..", "frontend", "build")
frontend_available = os.path.exists(frontend_path) and os.path.isdir(frontend_path)

if frontend_available:
    # Serve static files from the frontend build directory
    app.mount("/static", StaticFiles(directory=os.path.join(frontend_path, "static")), name="static")
    
    # Serve the React app for any other route
    @app.get("/{full_path:path}")
    async def serve_react_app(full_path: str):
        # Don't interfere with API routes
        if full_path.startswith("api/"):
            return {"error": "Not found"}, 404
            
        file_path = os.path.join(frontend_path, full_path)
        if os.path.exists(file_path) and os.path.isfile(file_path):
            return FileResponse(file_path)
        
        # Serve index.html for all other paths (client-side routing)
        return FileResponse(os.path.join(frontend_path, "index.html"))

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    host = "0.0.0.0" if IS_PRODUCTION else "127.0.0.1"
    
    # Print startup information
    print(f"Starting server in {ENVIRONMENT} mode")
    print(f"Frontend available: {frontend_available}")
    print(f"Server running at http://{host}:{port}")
    
    # Start the server
    uvicorn.run(
        "app.main:app",
        host=host,
        port=port,
        reload=not IS_PRODUCTION,
        workers=4 if IS_PRODUCTION else 1
    )
