#pragma once
#include <vector>
#include <string>
#include <functional>

struct SortStep {
    std::vector<int> array;
    std::vector<int> highlighted;
    std::vector<int> comparing;
    std::string operation;
    int time_complexity_ops;
    
    SortStep(const std::vector<int>& arr, const std::vector<int>& high = {}, 
             const std::vector<int>& comp = {}, const std::string& op = "", int ops = 0)
        : array(arr), highlighted(high), comparing(comp), operation(op), time_complexity_ops(ops) {}
};

class SortingAlgorithms {
public:
    using StepCallback = std::function<void(const SortStep&)>;
    
    static std::vector<SortStep> bubbleSort(std::vector<int> arr);
    static std::vector<SortStep> mergeSort(std::vector<int> arr);
    static std::vector<SortStep> quickSort(std::vector<int> arr);
    static std::vector<SortStep> heapSort(std::vector<int> arr);
    static std::vector<SortStep> countingSort(std::vector<int> arr);

private:
    static std::vector<SortStep> mergeSortHelper(std::vector<int>& arr, int left, int right, std::vector<SortStep>& steps);
    static int partition(std::vector<int>& arr, int low, int high, std::vector<SortStep>& steps);
    static void quickSortHelper(std::vector<int>& arr, int low, int high, std::vector<SortStep>& steps);
    static void heapify(std::vector<int>& arr, int n, int i, std::vector<SortStep>& steps);
};
