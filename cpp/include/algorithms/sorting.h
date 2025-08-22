#pragma once
#include <vector>
#include <string>
#include <functional>

struct SortingStep {
    std::vector<int> array;
    std::vector<int> highlighted;
    std::vector<int> comparing;
    std::string operation;
    int operations_count;
    std::string time_complexity;
    std::string space_complexity;
    
    SortingStep(const std::vector<int>& array = {},
                const std::vector<int>& highlighted = {},
                const std::vector<int>& comparing = {},
                const std::string& operation = "",
                int operations_count = 0,
                const std::string& time_complexity = "",
                const std::string& space_complexity = "");
};

// Sorting algorithm declarations
std::vector<SortingStep> bubbleSort(std::vector<int> arr);
std::vector<SortingStep> mergeSort(std::vector<int> arr);
std::vector<SortingStep> quickSort(std::vector<int> arr);
std::vector<SortingStep> heapSort(std::vector<int> arr);
std::vector<SortingStep> countingSort(std::vector<int> arr);

// Helper functions
int partition(std::vector<int>& arr, int low, int high, std::vector<SortingStep>& steps, int& operations);
void heapify(std::vector<int>& arr, int n, int i, std::vector<SortingStep>& steps, int& operations);
