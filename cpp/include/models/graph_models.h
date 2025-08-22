#pragma once
#include <vector>
#include <string>
#include <unordered_map>

struct GraphNode {
    int id;
    std::string label;
    double x, y;
    
    GraphNode(int id, const std::string& label = "", double x = 0.0, double y = 0.0);
};

struct GraphEdge {
    int from, to;
    double weight;
    bool directed;
    
    GraphEdge(int from, int to, double weight = 1.0, bool directed = false);
};

struct GraphStep {
    std::vector<int> visitedNodes;
    std::vector<int> currentNodes;
    std::vector<std::pair<int, int>> visitedEdges;
    std::vector<std::pair<int, int>> currentEdges;
    std::unordered_map<int, double> distances;
    std::unordered_map<int, int> parents;
    std::string operation;
    
    GraphStep(const std::string& operation);
};

struct SortingStep {
    std::vector<int> array;
    std::vector<int> highlighted;
    std::vector<int> comparing;
    std::string operation;
    int operations_count;
    std::string time_complexity;
    std::string space_complexity;
    
    SortingStep(const std::vector<int>& array,
                const std::vector<int>& highlighted,
                const std::vector<int>& comparing,
                const std::string& operation,
                int operations_count,
                const std::string& time_complexity,
                const std::string& space_complexity);
};
