import os
from pathlib import Path
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel, ConfigDict
from typing import List, Optional, Dict, Any
import uvicorn

app = FastAPI(
    title="Algorithm Visualizer API",
    description="Backend API for Algorithm Visualizer Platform",
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

# Health check
@app.get("/health")
async def health_check():
    return {"status": "healthy", "message": "Algorithm Visualizer API is running"}

# Sorting endpoints
@app.post("/api/sorting/{algorithm}")
async def run_sorting_algorithm(algorithm: str, request: SortingRequest):
    try:
        sorting_service = get_sorting_service()
        result = await sorting_service.execute_algorithm(algorithm, request.array)
        return result
    except Exception as e:
        return {"error": str(e), "steps": []}

# Graph endpoints
@app.post("/api/graph/{algorithm}")
async def run_graph_algorithm(algorithm: str, request: GraphRequest):
    try:
        graph_service = get_graph_service()
        
        # Convert Pydantic models to simple objects
        class SimpleNode:
            def __init__(self, id, label="", x=0.0, y=0.0):
                self.id = id
                self.label = label
                self.x = x
                self.y = y
        
        class SimpleEdge:
            def __init__(self, from_node, to, weight=1.0, directed=False):
                self.from_node = from_node
                self.to = to
                self.weight = weight
                self.directed = directed
        
        class SimpleRequest:
            def __init__(self, nodes, edges, start_node=None, end_node=None):
                self.nodes = nodes
                self.edges = edges
                self.start_node = start_node
                self.end_node = end_node
        
        # Convert nodes and edges
        converted_nodes = [
            SimpleNode(node.id, node.label or "", node.x or 0.0, node.y or 0.0)
            for node in request.nodes
        ]
        
        converted_edges = [
            SimpleEdge(edge.from_node, edge.to, edge.weight or 1.0, edge.directed or False)
            for edge in request.edges
        ]
        
        simple_request = SimpleRequest(
            nodes=converted_nodes,
            edges=converted_edges,
            start_node=request.start_node,
            end_node=request.end_node
        )
        
        steps = await graph_service.execute_algorithm(algorithm, simple_request)
        return {"steps": steps}
    except Exception as e:
        return {"error": str(e), "steps": []}

# String algorithms placeholder
@app.post("/api/string/{algorithm}")
async def run_string_algorithm(algorithm: str, request: dict):
    return {"steps": [], "message": "String algorithms coming soon"}

# DP algorithms placeholder
@app.post("/api/dp/{algorithm}")
async def run_dp_algorithm(algorithm: str, request: dict):
    return {"steps": [], "message": "DP algorithms coming soon"}

# Function to check if frontend is built
def check_frontend_availability():
    possible_paths = [
        Path("../frontend/build"),  # Development
        Path("./frontend/build"),   # Docker/Production
        Path("frontend/build"),     # Alternative
        Path("build"),              # If moved to root
    ]
    
    for path in possible_paths:
        index_path = path / "index.html"
        if index_path.exists():
            print(f"✅ Frontend found at: {path}")
            return path, True
    
    print("❌ Frontend build not found. Available paths checked:")
    for path in possible_paths:
        print(f"   - {path.absolute()} (exists: {path.exists()})")
    return None, False

# Check frontend and setup static serving
frontend_path, frontend_available = check_frontend_availability()

if IS_PRODUCTION and frontend_available:
    static_path = frontend_path / "static"
    if static_path.exists():
        app.mount("/static", StaticFiles(directory=str(static_path)), name="static")
        print(f"✅ Static files mounted from: {static_path}")
    
    @app.get("/{full_path:path}")
    async def serve_react_app(full_path: str):
        # Skip API routes
        if full_path.startswith(("api/", "docs", "openapi", "health")):
            raise HTTPException(status_code=404, detail="Not found")
        
        # Try to serve specific file
        file_path = frontend_path / full_path
        if file_path.exists() and file_path.is_file():
            return FileResponse(str(file_path))
        
        # Fall back to index.html for client-side routing
        index_path = frontend_path / "index.html"
        if index_path.exists():
            return FileResponse(str(index_path))
        
        raise HTTPException(status_code=404, detail="Frontend not built")

@app.get("/")
async def root():
    return {
        "message": "Algorithm Visualizer API",
        "version": "1.0.0",
        "environment": ENVIRONMENT,
        "frontend_available": frontend_available,
        "frontend_path": str(frontend_path) if frontend_path else "Not found"
    }

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    host = "0.0.0.0" if IS_PRODUCTION else "127.0.0.1"
    
    print(f"🚀 Starting server on {host}:{port}")
    print(f"📝 Environment: {ENVIRONMENT}")
    print(f"📋 API docs: http://{host}:{port}/docs")
    
    uvicorn.run(
        "main:app" if IS_PRODUCTION else app,
        host=host,
        port=port,
        reload=not IS_PRODUCTION,
        log_level="info"
    )
