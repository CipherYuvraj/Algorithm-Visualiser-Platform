import sys
import os
from typing import List, Dict, Any
from models.api_models import GraphRequest, GraphNode, GraphEdge

sys.path.append(os.path.join(os.path.dirname(__file__), '..', '..', 'cpp', 'build'))

try:
    import algorithm_engine
except ImportError:
    algorithm_engine = None

class GraphService:
    def __init__(self):
        self.algorithms = {
            'bfs': self._bfs,
            'dfs': self._dfs,
            'dijkstra': self._dijkstra,
            'astar': self._astar,
            'kruskal': self._kruskal,
            'prim': self._prim
        }

    async def execute_algorithm(self, algorithm: str, request: GraphRequest) -> List[Dict[str, Any]]:
        if algorithm not in self.algorithms:
            raise ValueError(f"Unknown algorithm: {algorithm}")
        
        return await self.algorithms[algorithm](request)

    async def _bfs(self, request: GraphRequest) -> List[Dict[str, Any]]:
        if algorithm_engine is None:
            return await self._fallback_bfs(request)
        
        try:
            graph = self._build_cpp_graph(request)
            start = request.start_node if request.start_node is not None else 0
            steps = graph.bfs(start)
            return [self._convert_graph_step(step) for step in steps]
        except Exception as e:
            return await self._fallback_bfs(request)

    async def _dfs(self, request: GraphRequest) -> List[Dict[str, Any]]:
        if algorithm_engine is None:
            return await self._fallback_dfs(request)
        
        try:
            graph = self._build_cpp_graph(request)
            start = request.start_node if request.start_node is not None else 0
            steps = graph.dfs(start)
            return [self._convert_graph_step(step) for step in steps]
        except Exception as e:
            return await self._fallback_dfs(request)

    async def _dijkstra(self, request: GraphRequest) -> List[Dict[str, Any]]:
        if algorithm_engine is None:
            return await self._fallback_dijkstra(request)
        
        try:
            graph = self._build_cpp_graph(request)
            start = request.start_node if request.start_node is not None else 0
            end = request.end_node if request.end_node is not None else -1
            steps = graph.dijkstra(start, end)
            return [self._convert_graph_step(step) for step in steps]
        except Exception as e:
            return await self._fallback_dijkstra(request)

    def _build_cpp_graph(self, request: GraphRequest):
        graph = algorithm_engine.Graph()
        
        for node in request.nodes:
            cpp_node = algorithm_engine.GraphNode(node.id, node.label or "", node.x or 0, node.y or 0)
            graph.add_node(cpp_node)
        
        for edge in request.edges:
            from_node = edge.from_node if hasattr(edge, 'from_node') else getattr(edge, 'from', None)
            cpp_edge = algorithm_engine.GraphEdge(from_node, edge.to, edge.weight or 1.0, edge.directed or False)
            graph.add_edge(cpp_edge)
        
        graph.build_adjacency_list()
        return graph

    def _convert_graph_step(self, step) -> Dict[str, Any]:
        return {
            'visitedNodes': list(step.visitedNodes),
            'currentNodes': list(step.currentNodes),
            'visitedEdges': [(edge[0], edge[1]) for edge in step.visitedEdges],
            'currentEdges': [(edge[0], edge[1]) for edge in step.currentEdges],
            'distances': dict(step.distances),
            'parents': dict(step.parents),
            'operation': step.operation
        }

    # Fallback Python implementations
    async def _fallback_bfs(self, request: GraphRequest) -> List[Dict[str, Any]]:
        from collections import deque
        
        steps = []
        adj_list = self._build_adjacency_list(request)
        visited = set()
        queue = deque()
        
        start = request.start_node if request.start_node is not None else 0
        
        steps.append({
            'visitedNodes': [],
            'currentNodes': [],
            'visitedEdges': [],
            'currentEdges': [],
            'distances': {},
            'parents': {},
            'operation': f'Starting BFS from node {start}'
        })
        
        queue.append(start)
        visited.add(start)
        
        steps.append({
            'visitedNodes': [],
            'currentNodes': [start],
            'visitedEdges': [],
            'currentEdges': [],
            'distances': {},
            'parents': {},
            'operation': f'Added start node {start} to queue'
        })
        
        while queue:
            current = queue.popleft()
            
            visited_list = list(visited)
            steps.append({
                'visitedNodes': visited_list,
                'currentNodes': [current],
                'visitedEdges': [],
                'currentEdges': [],
                'distances': {},
                'parents': {},
                'operation': f'Visiting node {current}'
            })
            
            for neighbor in adj_list.get(current, []):
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append(neighbor)
                    
                    steps.append({
                        'visitedNodes': visited_list,
                        'currentNodes': [neighbor],
                        'visitedEdges': [],
                        'currentEdges': [(current, neighbor)],
                        'distances': {},
                        'parents': {},
                        'operation': f'Exploring neighbor {neighbor}'
                    })
        
        steps.append({
            'visitedNodes': list(visited),
            'currentNodes': [],
            'visitedEdges': [],
            'currentEdges': [],
            'distances': {},
            'parents': {},
            'operation': 'BFS Complete'
        })
        
        return steps

    async def _fallback_dfs(self, request: GraphRequest) -> List[Dict[str, Any]]:
        steps = []
        adj_list = self._build_adjacency_list(request)
        visited = set()
        stack = []
        
        start = request.start_node if request.start_node is not None else 0
        
        steps.append({
            'visitedNodes': [],
            'currentNodes': [],
            'visitedEdges': [],
            'currentEdges': [],
            'distances': {},
            'parents': {},
            'operation': f'Starting DFS from node {start}'
        })
        
        stack.append(start)
        
        while stack:
            current = stack.pop()
            
            if current not in visited:
                visited.add(current)
                
                visited_list = list(visited)
                steps.append({
                    'visitedNodes': visited_list,
                    'currentNodes': [current],
                    'visitedEdges': [],
                    'currentEdges': [],
                    'distances': {},
                    'parents': {},
                    'operation': f'Visiting node {current}'
                })
                
                for neighbor in adj_list.get(current, []):
                    if neighbor not in visited:
                        stack.append(neighbor)
                        
                        steps.append({
                            'visitedNodes': visited_list,
                            'currentNodes': [neighbor],
                            'visitedEdges': [],
                            'currentEdges': [(current, neighbor)],
                            'distances': {},
                            'parents': {},
                            'operation': f'Added neighbor {neighbor} to stack'
                        })
        
        steps.append({
            'visitedNodes': list(visited),
            'currentNodes': [],
            'visitedEdges': [],
            'currentEdges': [],
            'distances': {},
            'parents': {},
            'operation': 'DFS Complete'
        })
        
        return steps

    async def _fallback_dijkstra(self, request: GraphRequest) -> List[Dict[str, Any]]:
        import heapq
        
        steps = []
        adj_list = self._build_weighted_adjacency_list(request)
        
        start = request.start_node if request.start_node is not None else 0
        end = request.end_node
        
        dist = {node.id: float('inf') for node in request.nodes}
        dist[start] = 0
        parent = {node.id: None for node in request.nodes}
        pq = [(0, start)]
        visited = set()
        
        steps.append({
            'visitedNodes': [],
            'currentNodes': [],
            'visitedEdges': [],
            'currentEdges': [],
            'distances': {start: 0},
            'parents': {},
            'operation': f'Starting Dijkstra from node {start}'
        })
        
        while pq:
            current_dist, u = heapq.heappop(pq)
            
            if u in visited:
                continue
            
            visited.add(u)
            
            steps.append({
                'visitedNodes': list(visited),
                'currentNodes': [u],
                'visitedEdges': [],
                'currentEdges': [],
                'distances': {k: v for k, v in dist.items() if v != float('inf')},
                'parents': parent,
                'operation': f'Processing node {u} with distance {current_dist}'
            })
            
            if end is not None and u == end:
                break
            
            for v, weight in adj_list.get(u, []):
                if v not in visited:
                    new_dist = dist[u] + weight
                    if new_dist < dist[v]:
                        dist[v] = new_dist
                        parent[v] = u
                        heapq.heappush(pq, (new_dist, v))
                        
                        steps.append({
                            'visitedNodes': list(visited),
                            'currentNodes': [v],
                            'visitedEdges': [],
                            'currentEdges': [(u, v)],
                            'distances': {k: v for k, v in dist.items() if v != float('inf')},
                            'parents': parent,
                            'operation': f'Relaxed edge {u} -> {v}'
                        })
        
        steps.append({
            'visitedNodes': list(visited),
            'currentNodes': [],
            'visitedEdges': [],
            'currentEdges': [],
            'distances': {k: v for k, v in dist.items() if v != float('inf')},
            'parents': parent,
            'operation': 'Dijkstra Complete'
        })
        
        return steps

    def _build_adjacency_list(self, request: GraphRequest) -> Dict[int, List[int]]:
        adj_list = {}
        
        for node in request.nodes:
            adj_list[node.id] = []
        
        for edge in request.edges:
            from_node = edge.from_node if hasattr(edge, 'from_node') else getattr(edge, 'from', None)
            adj_list[from_node].append(edge.to)
            
            if not edge.directed:
                adj_list[edge.to].append(from_node)
        
        return adj_list

    def _build_weighted_adjacency_list(self, request: GraphRequest) -> Dict[int, List[tuple]]:
        adj_list = {}
        
        for node in request.nodes:
            adj_list[node.id] = []
        
        for edge in request.edges:
            from_node = edge.from_node if hasattr(edge, 'from_node') else getattr(edge, 'from', None)
            adj_list[from_node].append((edge.to, edge.weight or 1.0))
            
            if not edge.directed:
                adj_list[edge.to].append((from_node, edge.weight or 1.0))
        
        return adj_list

    async def _astar(self, request: GraphRequest) -> List[Dict[str, Any]]:
        # Placeholder for A* algorithm
        return await self._fallback_dijkstra(request)

    async def _kruskal(self, request: GraphRequest) -> List[Dict[str, Any]]:
        # Placeholder for Kruskal's algorithm
        return []

    async def _prim(self, request: GraphRequest) -> List[Dict[str, Any]]:
        # Placeholder for Prim's algorithm
        return []
