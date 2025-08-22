cmake_minimum_required(VERSION 3.15)
project(algorithm_visualizer_cpp VERSION 1.0.0 LANGUAGES CXX)

# Set C++ standard
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Set build type if not specified
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Find Python
find_package(Python3 COMPONENTS Interpreter Development REQUIRED)

# Find pybind11
find_package(pybind11 QUIET)
if(NOT pybind11_FOUND)
    # Fallback: try to find pybind11 via pip
    execute_process(
        COMMAND ${Python3_EXECUTABLE} -c "import pybind11; print(pybind11.get_cmake_dir())"
        OUTPUT_VARIABLE pybind11_DIR
        OUTPUT_STRIP_TRAILING_WHITESPACE
        RESULT_VARIABLE pybind11_RESULT
    )
    if(pybind11_RESULT EQUAL 0)
        set(pybind11_DIR ${pybind11_DIR})
        find_package(pybind11 REQUIRED)
    else()
        message(FATAL_ERROR "pybind11 not found. Please install with: pip install pybind11[global]")
    endif()
endif()

# Include directories
include_directories(${CMAKE_CURRENT_SOURCE_DIR}/include)

# Source files
set(SOURCES
    src/algorithms/sorting.cpp
    src/algorithms/graph.cpp
    src/bindings/python_bindings.cpp
)

# Create pybind11 module
pybind11_add_module(algorithm_engine ${SOURCES})

# Set module properties
set_target_properties(algorithm_engine PROPERTIES
    CXX_VISIBILITY_PRESET "hidden"
    INTERPROCEDURAL_OPTIMIZATION TRUE
)

# Compiler-specific options
target_compile_definitions(algorithm_engine PRIVATE VERSION_INFO="${PROJECT_VERSION}")

# Platform-specific settings
if(WIN32)
    # Windows-specific settings
    target_compile_definitions(algorithm_engine PRIVATE NOMINMAX WIN32_LEAN_AND_MEAN)
    target_compile_options(algorithm_engine PRIVATE /W3)
else()
    # Unix-specific settings
    target_compile_options(algorithm_engine PRIVATE -Wall -Wextra)
endif()

# Installation rules
install(TARGETS algorithm_engine
    LIBRARY DESTINATION .
    RUNTIME DESTINATION .
)

message(STATUS "Python version: ${Python3_VERSION}")
message(STATUS "Python executable: ${Python3_EXECUTABLE}")
message(STATUS "Python include dirs: ${Python3_INCLUDE_DIRS}")
message(STATUS "pybind11 version: ${pybind11_VERSION}")
message(STATUS "pybind11 version: ${pybind11_VERSION}")
