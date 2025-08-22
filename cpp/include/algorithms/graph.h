#pragma once
#include <vector>
#include <string>
#include <unordered_map>

// Forward declarations to avoid circular dependencies
struct GraphNode {
    int id;
    std::string label;
    double x, y;
    
    GraphNode(int id = 0, const std::string& label = "", double x = 0.0, double y = 0.0);
};

struct GraphEdge {
    int from, to;
    double weight;
    bool directed;
    
    GraphEdge(int from = 0, int to = 0, double weight = 1.0, bool directed = false);
};

struct GraphStep {
    std::vector<int> visitedNodes;
    std::vector<int> currentNodes;
    std::vector<std::pair<int, int>> visitedEdges;
    std::vector<std::pair<int, int>> currentEdges;
    std::unordered_map<int, double> distances;
    std::unordered_map<int, int> parents;
    std::string operation;
    
    GraphStep(const std::string& operation = "");
};

class Graph {
private:
    std::vector<GraphNode> nodes;
    std::vector<GraphEdge> edges;
    std::vector<std::vector<int>> adjList;
    std::vector<std::vector<std::pair<int, double>>> weightedAdjList;

public:
    void addNode(const GraphNode& node);
    void addEdge(const GraphEdge& edge);
    void buildAdjacencyList();
    
    std::vector<GraphStep> bfs(int start);
    std::vector<GraphStep> dfs(int start);
    std::vector<GraphStep> dijkstra(int start, int end = -1);
    std::vector<GraphStep> aStar(int start, int end);
    std::vector<GraphStep> kruskal();
    std::vector<GraphStep> prim();
};
   
