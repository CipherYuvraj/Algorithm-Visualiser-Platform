#include "algorithms/graph.h"
#include <queue>
#include <stack>
#include <algorithm>
#include <climits>
#include <cmath>
#include <functional>

// Constructor implementations
GraphNode::GraphNode(int id, const std::string& label, double x, double y)
    : id(id), label(label), x(x), y(y) {}

GraphEdge::GraphEdge(int from, int to, double weight, bool directed)
    : from(from), to(to), weight(weight), directed(directed) {}

GraphStep::GraphStep(const std::string& operation)
    : operation(operation) {}

void Graph::addNode(const GraphNode& node) {
    nodes.push_back(node);
}

void Graph::addEdge(const GraphEdge& edge) {
    edges.push_back(edge);
}

void Graph::buildAdjacencyList() {
    int maxNode = 0;
    for (const auto& node : nodes) {
        maxNode = std::max(maxNode, node.id);
    }
    
    adjList.assign(maxNode + 1, std::vector<int>());
    weightedAdjList.assign(maxNode + 1, std::vector<std::pair<int, double>>());
    
    for (const auto& edge : edges) {
        adjList[edge.from].push_back(edge.to);
        weightedAdjList[edge.from].emplace_back(edge.to, edge.weight);
        
        if (!edge.directed) {
            adjList[edge.to].push_back(edge.from);
            weightedAdjList[edge.to].emplace_back(edge.from, edge.weight);
        }
    }
}

std::vector<GraphStep> Graph::bfs(int start) {
    std::vector<GraphStep> steps;
    std::vector<bool> visited(nodes.size(), false);
    std::queue<int> queue;
    
    GraphStep initialStep("Starting BFS from node " + std::to_string(start));
    steps.push_back(initialStep);
    
    queue.push(start);
    visited[start] = true;
    
    GraphStep firstStep("Added start node to queue");
    firstStep.currentNodes.push_back(start);
    steps.push_back(firstStep);
    
    while (!queue.empty()) {
        int current = queue.front();
        queue.pop();
        
        GraphStep visitStep("Visiting node " + std::to_string(current));
        visitStep.visitedNodes.push_back(current);
        for (const auto& step : steps) {
            visitStep.visitedNodes.insert(visitStep.visitedNodes.end(), 
                                        step.visitedNodes.begin(), step.visitedNodes.end());
        }
        steps.push_back(visitStep);
        
        for (int neighbor : adjList[current]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                queue.push(neighbor);
                
                GraphStep exploreStep("Exploring neighbor " + std::to_string(neighbor));
                exploreStep.visitedNodes = visitStep.visitedNodes;
                exploreStep.currentNodes.push_back(neighbor);
                exploreStep.currentEdges.emplace_back(current, neighbor);
                steps.push_back(exploreStep);
            }
        }
    }
    
    GraphStep finalStep("BFS Complete");
    steps.push_back(finalStep);
    return steps;
}

std::vector<GraphStep> Graph::dfs(int start) {
    std::vector<GraphStep> steps;
    std::vector<bool> visited(nodes.size(), false);
    std::stack<int> stack;
    
    GraphStep initialStep("Starting DFS from node " + std::to_string(start));
    steps.push_back(initialStep);
    
    stack.push(start);
    
    while (!stack.empty()) {
        int current = stack.top();
        stack.pop();
        
        if (!visited[current]) {
            visited[current] = true;
            
            GraphStep visitStep("Visiting node " + std::to_string(current));
            visitStep.visitedNodes.push_back(current);
            for (const auto& step : steps) {
                visitStep.visitedNodes.insert(visitStep.visitedNodes.end(), 
                                            step.visitedNodes.begin(), step.visitedNodes.end());
            }
            steps.push_back(visitStep);
            
            for (int neighbor : adjList[current]) {
                if (!visited[neighbor]) {
                    stack.push(neighbor);
                    
                    GraphStep exploreStep("Added neighbor " + std::to_string(neighbor) + " to stack");
                    exploreStep.visitedNodes = visitStep.visitedNodes;
                    exploreStep.currentNodes.push_back(neighbor);
                    exploreStep.currentEdges.emplace_back(current, neighbor);
                    steps.push_back(exploreStep);
                }
            }
        }
    }
    
    GraphStep finalStep("DFS Complete");
    steps.push_back(finalStep);
    return steps;
}

std::vector<GraphStep> Graph::dijkstra(int start, int end) {
    std::vector<GraphStep> steps;
    std::vector<double> dist(nodes.size(), INT_MAX);
    std::vector<int> parent(nodes.size(), -1);
    std::priority_queue<std::pair<double, int>, std::vector<std::pair<double, int>>, std::greater<>> pq;
    
    dist[start] = 0;
    pq.emplace(0, start);
    
    GraphStep initialStep("Starting Dijkstra from node " + std::to_string(start));
    initialStep.distances[start] = 0;
    steps.push_back(initialStep);
    
    while (!pq.empty()) {
        double d = pq.top().first;
        int u = pq.top().second;
        pq.pop();
        
        if (d > dist[u]) continue;
        
        GraphStep currentStep("Processing node " + std::to_string(u) + " with distance " + std::to_string(d));
        currentStep.currentNodes.push_back(u);
        for (int i = 0; i < nodes.size(); i++) {
            if (dist[i] != INT_MAX) {
                currentStep.distances[i] = dist[i];
            }
        }
        steps.push_back(currentStep);
        
        for (const auto& edge : weightedAdjList[u]) {
            int v = edge.first;
            double weight = edge.second;
            
            if (dist[u] + weight < dist[v]) {
                dist[v] = dist[u] + weight;
                parent[v] = u;
                pq.emplace(dist[v], v);
                
                GraphStep relaxStep("Relaxed edge " + std::to_string(u) + " -> " + std::to_string(v));
                relaxStep.currentEdges.emplace_back(u, v);
                for (int i = 0; i < nodes.size(); i++) {
                    if (dist[i] != INT_MAX) {
                        relaxStep.distances[i] = dist[i];
                    }
                }
                steps.push_back(relaxStep);
            }
        }
        
        if (end != -1 && u == end) break;
    }
    
    GraphStep finalStep("Dijkstra Complete");
    for (int i = 0; i < nodes.size(); i++) {
        if (dist[i] != INT_MAX) {
            finalStep.distances[i] = dist[i];
        }
    }
    steps.push_back(finalStep);
    return steps;
}

std::vector<GraphStep> Graph::aStar(int start, int end) {
    // Simplified A* implementation using Euclidean distance as heuristic
    std::vector<GraphStep> steps;
    
    auto heuristic = [this](int a, int b) -> double {
        if (a >= nodes.size() || b >= nodes.size()) return 0;
        double dx = nodes[a].x - nodes[b].x;
        double dy = nodes[a].y - nodes[b].y;
        return std::sqrt(dx * dx + dy * dy);
    };
    
    std::vector<double> gScore(nodes.size(), INT_MAX);
    std::vector<double> fScore(nodes.size(), INT_MAX);
    std::vector<int> parent(nodes.size(), -1);
    std::priority_queue<std::pair<double, int>, std::vector<std::pair<double, int>>, std::greater<>> openSet;
    
    gScore[start] = 0;
    fScore[start] = heuristic(start, end);
    openSet.emplace(fScore[start], start);
    
    GraphStep initialStep("Starting A* from " + std::to_string(start) + " to " + std::to_string(end));
    steps.push_back(initialStep);
    
    while (!openSet.empty()) {
        int current = openSet.top().second;
        openSet.pop();
        
        GraphStep currentStep("Exploring node " + std::to_string(current));
        currentStep.currentNodes.push_back(current);
        steps.push_back(currentStep);
        
        if (current == end) {
            GraphStep pathStep("Path found!");
            // Reconstruct path
            int node = end;
            while (node != -1) {
                pathStep.visitedNodes.push_back(node);
                if (parent[node] != -1) {
                    pathStep.visitedEdges.emplace_back(parent[node], node);
                }
                node = parent[node];
            }
            steps.push_back(pathStep);
            break;
        }
        
        for (const auto& edge : weightedAdjList[current]) {
            int neighbor = edge.first;
            double weight = edge.second;
            double tentativeGScore = gScore[current] + weight;
            
            if (tentativeGScore < gScore[neighbor]) {
                parent[neighbor] = current;
                gScore[neighbor] = tentativeGScore;
                fScore[neighbor] = gScore[neighbor] + heuristic(neighbor, end);
                openSet.emplace(fScore[neighbor], neighbor);
                
                GraphStep exploreStep("Updated path to node " + std::to_string(neighbor));
                exploreStep.currentEdges.emplace_back(current, neighbor);
                steps.push_back(exploreStep);
            }
        }
    }
    
    return steps;
}

std::vector<GraphStep> Graph::kruskal() {
    std::vector<GraphStep> steps;
    
    // Sort edges by weight
    std::vector<GraphEdge> sortedEdges = edges;
    std::sort(sortedEdges.begin(), sortedEdges.end(), 
              [](const GraphEdge& a, const GraphEdge& b) {
                  return a.weight < b.weight;
              });
    
    GraphStep initialStep("Starting Kruskal's MST algorithm");
    steps.push_back(initialStep);
    
    // Union-Find data structure
    std::vector<int> parent(nodes.size());
    for (int i = 0; i < nodes.size(); i++) {
        parent[i] = i;
    }
    
    std::function<int(int)> find = [&](int x) -> int {
        if (parent[x] != x) {
            parent[x] = find(parent[x]);
        }
        return parent[x];
    };
    
    auto unite = [&](int x, int y) {
        x = find(x);
        y = find(y);
        if (x != y) {
            parent[x] = y;
            return true;
        }
        return false;
    };
    
    for (const auto& edge : sortedEdges) {
        GraphStep considerStep("Considering edge " + std::to_string(edge.from) + 
                              " -> " + std::to_string(edge.to) + " (weight: " + std::to_string(edge.weight) + ")");
        considerStep.currentEdges.emplace_back(edge.from, edge.to);
        steps.push_back(considerStep);
        
        if (unite(edge.from, edge.to)) {
            GraphStep addStep("Added edge to MST");
            addStep.visitedEdges.emplace_back(edge.from, edge.to);
            for (const auto& step : steps) {
                addStep.visitedEdges.insert(addStep.visitedEdges.end(), 
                                          step.visitedEdges.begin(), step.visitedEdges.end());
            }
            steps.push_back(addStep);
        } else {
            GraphStep rejectStep("Rejected edge (would create cycle)");
            steps.push_back(rejectStep);
        }
    }
    
    GraphStep finalStep("Kruskal's MST Complete");
    steps.push_back(finalStep);
    return steps;
}

std::vector<GraphStep> Graph::prim() {
    std::vector<GraphStep> steps;
    
    if (nodes.empty()) return steps;
    
    std::vector<bool> inMST(nodes.size(), false);
    std::vector<double> key(nodes.size(), INT_MAX);
    std::vector<int> parent(nodes.size(), -1);
    std::priority_queue<std::pair<double, int>, std::vector<std::pair<double, int>>, std::greater<>> pq;
    
    int start = 0;
    key[start] = 0;
    pq.emplace(0, start);
    
    GraphStep initialStep("Starting Prim's MST algorithm from node " + std::to_string(start));
    steps.push_back(initialStep);
    
    while (!pq.empty()) {
        int u = pq.top().second;
        pq.pop();
        
        if (inMST[u]) continue;
        
        inMST[u] = true;
        
        GraphStep addStep("Added node " + std::to_string(u) + " to MST");
        addStep.visitedNodes.push_back(u);
        if (parent[u] != -1) {
            addStep.visitedEdges.emplace_back(parent[u], u);
        }
        steps.push_back(addStep);
        
        for (const auto& edge : weightedAdjList[u]) {
            int v = edge.first;
            double weight = edge.second;
            
            if (!inMST[v] && weight < key[v]) {
                key[v] = weight;
                parent[v] = u;
                pq.emplace(key[v], v);
                
                GraphStep updateStep("Updated key for node " + std::to_string(v));
                updateStep.currentEdges.emplace_back(u, v);
                steps.push_back(updateStep);
            }
        }
    }
    
    GraphStep finalStep("Prim's MST Complete");
    steps.push_back(finalStep);
    return steps;
}
