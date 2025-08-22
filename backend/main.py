from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import json
import asyncio
from typing import List, Dict, Any
import sys
import os

# Add the cpp build directory to Python path
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'cpp', 'build'))

try:
    import algorithm_engine # pyright: ignore[reportMissingImports]
except ImportError as e:
    print(f"Warning: Could not import algorithm_engine: {e}")
    print("Please build the C++ module first using: cd cpp && mkdir build && cd build && cmake .. && make")
    algorithm_engine = None

from services.sorting_service import SortingService
from services.graph_service import GraphService
from services.string_service import StringService
from services.dp_service import DPService
from models.api_models import *

app = FastAPI(title="Algorithm Visualizer API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize services
sorting_service = SortingService()
graph_service = GraphService()
string_service = StringService()
dp_service = DPService()

# WebSocket connection manager
class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def send_personal_message(self, message: dict, websocket: WebSocket):
        await websocket.send_text(json.dumps(message))

    async def broadcast(self, message: dict):
        for connection in self.active_connections:
            await connection.send_text(json.dumps(message))

manager = ConnectionManager()

@app.get("/")
async def root():
    return {"message": "Algorithm Visualizer API", "status": "running"}

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "cpp_module": algorithm_engine is not None,
        "services": {
            "sorting": True,
            "graph": True,
            "string": True,
            "dp": True
        }
    }

# Sorting endpoints
@app.post("/api/sorting/{algorithm}")
async def run_sorting_algorithm(algorithm: str, request: SortingRequest):
    try:
        steps = await sorting_service.execute_algorithm(algorithm, request.array)
        return {"steps": steps, "algorithm": algorithm}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# Graph endpoints
@app.post("/api/graph/{algorithm}")
async def run_graph_algorithm(algorithm: str, request: GraphRequest):
    try:
        steps = await graph_service.execute_algorithm(algorithm, request)
        return {"steps": steps, "algorithm": algorithm}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# String endpoints
@app.post("/api/string/{algorithm}")
async def run_string_algorithm(algorithm: str, request: StringRequest):
    try:
        steps = await string_service.execute_algorithm(algorithm, request)
        return {"steps": steps, "algorithm": algorithm}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# Dynamic Programming endpoints
@app.post("/api/dp/{algorithm}")
async def run_dp_algorithm(algorithm: str, request: DPRequest):
    try:
        steps = await dp_service.execute_algorithm(algorithm, request)
        return {"steps": steps, "algorithm": algorithm}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# WebSocket endpoint for real-time algorithm execution
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            message = json.loads(data)
            
            algorithm_type = message.get("type")
            algorithm_name = message.get("algorithm")
            params = message.get("params", {})
            
            # Execute algorithm based on type
            if algorithm_type == "sorting":
                steps = await sorting_service.execute_algorithm(algorithm_name, params.get("array", []))
                
                # Stream steps with delay for visualization
                for i, step in enumerate(steps):
                    await manager.send_personal_message({
                        "type": "step",
                        "step_number": i,
                        "total_steps": len(steps),
                        "data": step
                    }, websocket)
                    await asyncio.sleep(0.1)  # Adjust delay as needed
                    
            elif algorithm_type == "graph":
                # Convert params to GraphRequest object
                graph_request = GraphRequest(**params)
                steps = await graph_service.execute_algorithm(algorithm_name, graph_request)
                
                for i, step in enumerate(steps):
                    await manager.send_personal_message({
                        "type": "step",
                        "step_number": i,
                        "total_steps": len(steps),
                        "data": step
                    }, websocket)
                    await asyncio.sleep(0.2)
                    
            # Send completion message
            await manager.send_personal_message({
                "type": "complete",
                "algorithm": algorithm_name
            }, websocket)
            
    except WebSocketDisconnect:
        manager.disconnect(websocket)
    except Exception as e:
        await manager.send_personal_message({
            "type": "error",
            "message": str(e)
        }, websocket)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
