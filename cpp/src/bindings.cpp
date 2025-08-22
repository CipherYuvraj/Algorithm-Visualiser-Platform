#include <pybind11/pybind11.h>
#include <pybind11/stl.h>
#include <pybind11/numpy.h>
#include "algorithms/sorting.h"
#include "algorithms/graph.h"
#include "algorithms/step.h"

namespace py = pybind11;

PYBIND11_MODULE(algorithm_engine, m) {
    m.doc() = "Algorithm Visualizer C++ Engine";
    
    // SortStep structure
    py::class_<SortStep>(m, "SortStep")
        .def(py::init<const std::vector<int>&, const std::vector<int>&, const std::vector<int>&, const std::string&, int>(),
             py::arg("array"), py::arg("highlighted") = std::vector<int>(), 
             py::arg("comparing") = std::vector<int>(), py::arg("operation") = "", py::arg("time_complexity_ops") = 0)
        .def_readwrite("array", &SortStep::array)
        .def_readwrite("highlighted", &SortStep::highlighted)
        .def_readwrite("comparing", &SortStep::comparing)
        .def_readwrite("operation", &SortStep::operation)
        .def_readwrite("time_complexity_ops", &SortStep::time_complexity_ops);
    
    // SortingAlgorithms class
    py::class_<SortingAlgorithms>(m, "SortingAlgorithms")
        .def_static("bubble_sort", &SortingAlgorithms::bubbleSort)
        .def_static("merge_sort", &SortingAlgorithms::mergeSort)
        .def_static("quick_sort", &SortingAlgorithms::quickSort)
        .def_static("heap_sort", &SortingAlgorithms::heapSort)
        .def_static("counting_sort", &SortingAlgorithms::countingSort);
    
    // GraphNode structure
    py::class_<GraphNode>(m, "GraphNode")
        .def(py::init<int, const std::string&, double, double>(),
             py::arg("id"), py::arg("label") = "", py::arg("x") = 0, py::arg("y") = 0)
        .def_readwrite("id", &GraphNode::id)
        .def_readwrite("label", &GraphNode::label)
        .def_readwrite("x", &GraphNode::x)
        .def_readwrite("y", &GraphNode::y);
    
    // GraphEdge structure
    py::class_<GraphEdge>(m, "GraphEdge")
        .def(py::init<int, int, double, bool>(),
             py::arg("from"), py::arg("to"), py::arg("weight") = 1.0, py::arg("directed") = false)
        .def_readwrite("from", &GraphEdge::from)
        .def_readwrite("to", &GraphEdge::to)
        .def_readwrite("weight", &GraphEdge::weight)
        .def_readwrite("directed", &GraphEdge::directed);
    
    // GraphStep structure
    py::class_<GraphStep>(m, "GraphStep")
        .def(py::init<const std::string&>(), py::arg("operation") = "")
        .def_readwrite("visitedNodes", &GraphStep::visitedNodes)
        .def_readwrite("currentNodes", &GraphStep::currentNodes)
        .def_readwrite("visitedEdges", &GraphStep::visitedEdges)
        .def_readwrite("currentEdges", &GraphStep::currentEdges)
        .def_readwrite("distances", &GraphStep::distances)
        .def_readwrite("parents", &GraphStep::parents)
        .def_readwrite("operation", &GraphStep::operation);
    
    // Graph class
    py::class_<Graph>(m, "Graph")
        .def(py::init<>())
        .def("add_node", &Graph::addNode)
        .def("add_edge", &Graph::addEdge)
        .def("build_adjacency_list", &Graph::buildAdjacencyList)
        .def("bfs", &Graph::bfs)
        .def("dfs", &Graph::dfs)
        .def("dijkstra", &Graph::dijkstra, py::arg("start"), py::arg("end") = -1)
        .def("a_star", &Graph::aStar)
        .def("kruskal", &Graph::kruskal)
        .def("prim", &Graph::prim)
        .def("get_nodes", &Graph::getNodes)
        .def("get_edges", &Graph::getEdges);
}
