cmake_minimum_required(VERSION 3.16)
project(AlgorithmVisualizer)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Find required packages
find_package(pybind11 REQUIRED)

# Include directories
include_directories(include)

# Source files
file(GLOB_RECURSE SOURCES 
    "src/algorithms/*.cpp"
    "src/utils/*.cpp"
)

# Create the main library
add_library(algorithms STATIC ${SOURCES})

# Python bindings
pybind11_add_module(algorithm_engine src/bindings.cpp ${SOURCES})

# Compiler-specific options
target_compile_definitions(algorithm_engine PRIVATE VERSION_INFO=${EXAMPLE_VERSION_INFO})

# Enable testing
enable_testing()
add_subdirectory(tests)
