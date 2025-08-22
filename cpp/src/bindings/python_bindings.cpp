#include <pybind11/pybind11.h>
#include <pybind11/stl.h>
#include <pybind11/operators.h>
#include "algorithms/graph.h"
#include "algorithms/sorting.h"

namespace py = pybind11;

PYBIND11_MODULE(algorithm_engine, m) {
    m.doc() = "Algorithm Visualizer C++ Engine";
    
    // GraphNode binding
    py::class_<GraphNode>(m, "GraphNode")
        .def(py::init<>())
        .def(py::init<int>())
        .def(py::init<int, const std::string&>())
        .def(py::init<int, const std::string&, double>())
        .def(py::init<int, const std::string&, double, double>())
        .def_readwrite("id", &GraphNode::id)
        .def_readwrite("label", &GraphNode::label)
        .def_readwrite("x", &GraphNode::x)
        .def_readwrite("y", &GraphNode::y);
    
    // GraphEdge binding
    py::class_<GraphEdge>(m, "GraphEdge")
        .def(py::init<>())
        .def(py::init<int, int>())
        .def(py::init<int, int, double>())
        .def(py::init<int, int, double, bool>())
        .def_readwrite("from", &GraphEdge::from)
        .def_readwrite("to", &GraphEdge::to)
        .def_readwrite("weight", &GraphEdge::weight)
        .def_readwrite("directed", &GraphEdge::directed);
    
    // GraphStep binding
    py::class_<GraphStep>(m, "GraphStep")
        .def(py::init<>())
        .def(py::init<const std::string&>())
        .def_readwrite("visitedNodes", &GraphStep::visitedNodes)
        .def_readwrite("currentNodes", &GraphStep::currentNodes)
        .def_readwrite("visitedEdges", &GraphStep::visitedEdges)
        .def_readwrite("currentEdges", &GraphStep::currentEdges)
        .def_readwrite("distances", &GraphStep::distances)
        .def_readwrite("parents", &GraphStep::parents)
        .def_readwrite("operation", &GraphStep::operation);
    
    // SortingStep binding
    py::class_<SortingStep>(m, "SortingStep")
        .def(py::init<>())
        .def(py::init<const std::vector<int>&>())
        .def(py::init<const std::vector<int>&, const std::vector<int>&>())
        .def(py::init<const std::vector<int>&, const std::vector<int>&, const std::vector<int>&>())
        .def(py::init<const std::vector<int>&, const std::vector<int>&, const std::vector<int>&,
                      const std::string&>())
        .def(py::init<const std::vector<int>&, const std::vector<int>&, const std::vector<int>&,
                      const std::string&, int>())
        .def(py::init<const std::vector<int>&, const std::vector<int>&, const std::vector<int>&,
                      const std::string&, int, const std::string&>())
        .def(py::init<const std::vector<int>&, const std::vector<int>&, const std::vector<int>&,
                      const std::string&, int, const std::string&, const std::string&>())
        .def_readwrite("array", &SortingStep::array)
        .def_readwrite("highlighted", &SortingStep::highlighted)
        .def_readwrite("comparing", &SortingStep::comparing)
        .def_readwrite("operation", &SortingStep::operation)
        .def_readwrite("operations_count", &SortingStep::operations_count)
        .def_readwrite("time_complexity", &SortingStep::time_complexity)
        .def_readwrite("space_complexity", &SortingStep::space_complexity);
    
    // Graph binding
    py::class_<Graph>(m, "Graph")
        .def(py::init<>())
        .def("add_node", &Graph::addNode)
        .def("add_edge", &Graph::addEdge)
        .def("build_adjacency_list", &Graph::buildAdjacencyList)
        .def("bfs", &Graph::bfs)
        .def("dfs", &Graph::dfs)
        .def("dijkstra", &Graph::dijkstra, py::arg("start"), py::arg("end") = -1)
        .def("astar", &Graph::aStar)
        .def("kruskal", &Graph::kruskal)
        .def("prim", &Graph::prim);
    
    // Sorting algorithm functions
    m.def("bubble_sort", &bubbleSort, "Bubble Sort Algorithm");
    m.def("merge_sort", &mergeSort, "Merge Sort Algorithm");
    m.def("quick_sort", &quickSort, "Quick Sort Algorithm");
    m.def("heap_sort", &heapSort, "Heap Sort Algorithm");
    m.def("counting_sort", &countingSort, "Counting Sort Algorithm");
    
    // Version info
    m.attr("__version__") = "1.0.0";
}
