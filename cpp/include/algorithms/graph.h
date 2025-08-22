#pragma once
#include <vector>
#include <string>
#include <unordered_map>
#include <queue>

struct GraphNode {
    int id;
    std::string label;
    double x, y;
    
    GraphNode(int i, const std::string& l = "", double px = 0, double py = 0)
        : id(i), label(l), x(px), y(py) {}
};

struct GraphEdge {
    int from, to;
    double weight;
    bool directed;
    
    GraphEdge(int f, int t, double w = 1.0, bool d = false)
        : from(f), to(t), weight(w), directed(d) {}
};

struct GraphStep {
    std::vector<int> visitedNodes;
    std::vector<int> currentNodes;
    std::vector<std::pair<int,int>> visitedEdges;
    std::vector<std::pair<int,int>> currentEdges;
    std::unordered_map<int, double> distances;
    std::unordered_map<int, int> parents;
    std::string operation;
    
    GraphStep(const std::string& op = "") : operation(op) {}
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
    
    const std::vector<GraphNode>& getNodes() const { return nodes; }
    const std::vector<GraphEdge>& getEdges() const { return edges; }
};
