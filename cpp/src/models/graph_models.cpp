#include "models/graph_models.h"

GraphNode::GraphNode(int id, const std::string& label, double x, double y)
    : id(id), label(label), x(x), y(y) {}

GraphEdge::GraphEdge(int from, int to, double weight, bool directed)
    : from(from), to(to), weight(weight), directed(directed) {}

GraphStep::GraphStep(const std::string& operation)
    : operation(operation) {}

SortingStep::SortingStep(const std::vector<int>& array,
                        const std::vector<int>& highlighted,
                        const std::vector<int>& comparing,
                        const std::string& operation,
                        int operations_count,
                        const std::string& time_complexity,
                        const std::string& space_complexity)
    : array(array), highlighted(highlighted), comparing(comparing),
      operation(operation), operations_count(operations_count),
      time_complexity(time_complexity), space_complexity(space_complexity) {}
