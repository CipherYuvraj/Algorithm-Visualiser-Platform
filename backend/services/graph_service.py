import sys
from typing import List, Dict, Any

# Prefer absolute import when running from repo root (uvicorn backend.main:app)
# Fallback to relative when running inside backend dir (uvicorn main:app)
try:
    from backend.utils.engine_loader import get_engine  # type: ignore
except Exception:
    try:
        from utils.engine_loader import get_engine  # type: ignore
    except Exception:
        def get_engine():  # type: ignore
            return None

algorithm_engine = get_engine()

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

    async def execute_algorithm(self, algorithm: str, request) -> List[Dict[str, Any]]:
        try:
            if algorithm not in self.algorithms:
                raise ValueError(f"Unknown algorithm: {algorithm}")
            
            print(f"Executing {algorithm} with {len(request.nodes)} nodes and {len(request.edges)} edges")
            
            result = await self.algorithms[algorithm](request)
            print(f"Algorithm {algorithm} completed with {len(result)} steps")
            
            return result
        except Exception as e:
            print(f"Error in execute_algorithm: {e}")
            # Return a basic fallback result
            return [{
                'visitedNodes': [],
                'currentNodes': [request.start_node or 0],
                'visitedEdges': [],
                'currentEdges': [],
                'distances': {},
                'parents': {},
                'operation': f'Error executing {algorithm}: {str(e)}'
            }]

    async def _bfs(self, request) -> List[Dict[str, Any]]:
        try:
            if algorithm_engine is None:
                return await self._fallback_bfs(request)
            
            graph = self._build_cpp_graph(request)
            start = request.start_node if request.start_node is not None else 0
            steps = graph.bfs(start)
            return [self._convert_graph_step(step) for step in steps]
        except Exception as e:
            print(f"Error in BFS: {e}")
            return await self._fallback_bfs(request)

    async def _dfs(self, request) -> List[Dict[str, Any]]:
        if algorithm_engine is None:
            return await self._fallback_dfs(request)
        
        try:
            graph = self._build_cpp_graph(request)
            start = request.start_node if request.start_node is not None else 0
            steps = graph.dfs(start)
            return [self._convert_graph_step(step) for step in steps]
        except Exception as e:
            return await self._fallback_dfs(request)

    async def _dijkstra(self, request) -> List[Dict[str, Any]]:
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

    def _build_cpp_graph(self, request) :
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
    async def _fallback_bfs(self, request) -> List[Dict[str, Any]]:
        try:
            from collections import deque
            
            steps = []
            adj_list = self._build_adjacency_list(request)
            visited = set()
            queue = deque()
            
            start = request.start_node if request.start_node is not None else 0
            
            # Validate start node
            if start >= len(request.nodes) or start < 0:
                start = 0
            
            print(f"Starting BFS from node {start}")
            
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
                'distances': {start: 0},
                'parents': {},
                'operation': f'Added start node {start} to queue'
            })
            
            step_count = 0
            max_steps = 50  # Prevent infinite loops
            
            while queue and step_count < max_steps:
                current = queue.popleft()
                step_count += 1
                
                visited_list = list(visited)
                steps.append({
                    'visitedNodes': visited_list,
                    'currentNodes': [current],
                    'visitedEdges': [],
                    'currentEdges': [],
                    'distances': {node: i for i, node in enumerate(visited_list)},
                    'parents': {},
                    'operation': f'Processing node {current}'
                })
                
                # Get neighbors safely
                neighbors = adj_list.get(current, [])
                print(f"Node {current} has neighbors: {neighbors}")
                
                for neighbor in neighbors:
                    if neighbor not in visited and neighbor < len(request.nodes) and neighbor >= 0:
                        visited.add(neighbor)
                        queue.append(neighbor)
                        
                        steps.append({
                            'visitedNodes': list(visited),
                            'currentNodes': [neighbor],
                            'visitedEdges': [],
                            'currentEdges': [(current, neighbor)],
                            'distances': {node: i for i, node in enumerate(visited)},
                            'parents': {neighbor: current},
                            'operation': f'Discovered node {neighbor} from {current}'
                        })
            
            steps.append({
                'visitedNodes': list(visited),
                'currentNodes': [],
                'visitedEdges': [],
                'currentEdges': [],
                'distances': {},
                'parents': {},
                'operation': 'BFS completed - All reachable nodes visited'
            })
            
            print(f"BFS completed with {len(steps)} steps")
            return steps
            
        except Exception as e:
            print(f"Error in fallback BFS: {e}")
            # Return minimal working result
            return [{
                'visitedNodes': [request.start_node or 0],
                'currentNodes': [],
                'visitedEdges': [],
                'currentEdges': [],
                'distances': {},
                'parents': {},
                'operation': f'BFS failed: {str(e)}'
            }]

    async def _fallback_dfs(self, request) -> List[Dict[str, Any]]:
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

    async def _fallback_dijkstra(self, request) -> List[Dict[str, Any]]:
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

    def _build_adjacency_list(self, request) -> Dict[int, List[int]]:
        try:
            adj_list = {}
            
            # Initialize adjacency list for all nodes
            for node in request.nodes:
                adj_list[node.id] = []
            
            print(f"Building adjacency list for {len(request.nodes)} nodes and {len(request.edges)} edges")
            
            # Add edges
            for edge in request.edges:
                try:
                    from_node = getattr(edge, 'from_node', None)
                    to_node = getattr(edge, 'to', None)
                    
                    if from_node is not None and to_node is not None:
                        if from_node in adj_list and to_node < len(request.nodes):
                            adj_list[from_node].append(to_node)
                            print(f"Added edge: {from_node} -> {to_node}")
                        
                        # Add reverse edge if undirected
                        if not getattr(edge, 'directed', False):
                            if to_node in adj_list and from_node < len(request.nodes):
                                adj_list[to_node].append(from_node)
                                print(f"Added reverse edge: {to_node} -> {from_node}")
                except Exception as e:
                    print(f"Error processing edge: {e}")
                    continue
            
            print(f"Final adjacency list: {adj_list}")
            return adj_list
            
        except Exception as e:
            print(f"Error building adjacency list: {e}")
            return {}

    def _build_weighted_adjacency_list(self, request) -> Dict[int, List[tuple]]:
        adj_list = {}
        
        for node in request.nodes:
            adj_list[node.id] = []
        
        for edge in request.edges:
            from_node = edge.from_node if hasattr(edge, 'from_node') else getattr(edge, 'from', None)
            adj_list[from_node].append((edge.to, edge.weight or 1.0))
            
            if not edge.directed:
                adj_list[edge.to].append((from_node, edge.weight or 1.0))
        
        return adj_list

    async def _astar(self, request) -> List[Dict[str, Any]]:
        # Placeholder for A* algorithm
        return await self._fallback_dijkstra(request)

    async def _kruskal(self, request) -> List[Dict[str, Any]]:
        # Placeholder for Kruskal's algorithm
        return []

    async def _prim(self, request) -> List[Dict[str, Any]]:
        # Placeholder for Prim's algorithm
        return []