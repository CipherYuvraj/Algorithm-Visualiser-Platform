from pydantic import BaseModel, validator
from typing import List, Optional, Dict, Any, Union

class SortingRequest(BaseModel):
    array: List[int]
    
    @validator('array')
    def validate_array(cls, v):
        if not v:
            raise ValueError('Array cannot be empty')
        if len(v) > 1000:
            raise ValueError('Array too large (max 1000 elements)')
        return v

class GraphNode(BaseModel):
    id: int
    label: Optional[str] = ""
    x: Optional[float] = 0
    y: Optional[float] = 0

class GraphEdge(BaseModel):
    from_node: int = None  # Using from_node instead of 'from' (Python keyword)
    to: int
    weight: Optional[float] = 1.0
    directed: Optional[bool] = False
    
    class Config:
        # Allow using 'from' in JSON input
        alias_generator = lambda field_name: 'from' if field_name == 'from_node' else field_name
        allow_population_by_field_name = True

class GraphRequest(BaseModel):
    nodes: List[GraphNode]
    edges: List[GraphEdge]
    start_node: Optional[int] = None
    end_node: Optional[int] = None
    
    @validator('nodes')
    def validate_nodes(cls, v):
        if not v:
            raise ValueError('Graph must have at least one node')
        return v

class StringRequest(BaseModel):
    text: str
    pattern: str
    
    @validator('text', 'pattern')
    def validate_strings(cls, v):
        if not v:
            raise ValueError('Text and pattern cannot be empty')
        return v

class DPRequest(BaseModel):
    problem_type: str
    params: Dict[str, Any]
    
    @validator('problem_type')
    def validate_problem_type(cls, v):
        allowed_types = ['lcs', 'knapsack', 'coin_change']
        if v not in allowed_types:
            raise ValueError(f'Problem type must be one of {allowed_types}')
        return v

class AlgorithmStep(BaseModel):
    step_number: int
    operation: str
    data: Dict[str, Any]
    highlighted_elements: Optional[List[int]] = []
    comparing_elements: Optional[List[int]] = []

class AlgorithmResponse(BaseModel):
    algorithm: str
    steps: List[AlgorithmStep]
    time_complexity: str
    space_complexity: str
    total_operations: int
