#include "algorithms/sorting.h"
#include <algorithm>

std::vector<SortStep> SortingAlgorithms::bubbleSort(std::vector<int> arr) {
    std::vector<SortStep> steps;
    int n = arr.size();
    int operations = 0;
    
    steps.emplace_back(arr, std::vector<int>{}, std::vector<int>{}, "Starting Bubble Sort", operations);
    
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            operations++;
            steps.emplace_back(arr, std::vector<int>{}, std::vector<int>{j, j+1}, 
                             "Comparing elements at positions " + std::to_string(j) + " and " + std::to_string(j+1), operations);
            
            if (arr[j] > arr[j + 1]) {
                std::swap(arr[j], arr[j + 1]);
                steps.emplace_back(arr, std::vector<int>{j, j+1}, std::vector<int>{}, 
                                 "Swapped elements", operations);
            }
        }
        steps.emplace_back(arr, std::vector<int>{n-i-1}, std::vector<int>{}, 
                         "Element " + std::to_string(arr[n-i-1]) + " is in final position", operations);
    }
    
    steps.emplace_back(arr, std::vector<int>{}, std::vector<int>{}, "Bubble Sort Complete!", operations);
    return steps;
}

std::vector<SortStep> SortingAlgorithms::mergeSort(std::vector<int> arr) {
    std::vector<SortStep> steps;
    steps.emplace_back(arr, std::vector<int>{}, std::vector<int>{}, "Starting Merge Sort", 0);
    
    mergeSortHelper(arr, 0, arr.size() - 1, steps);
    
    steps.emplace_back(arr, std::vector<int>{}, std::vector<int>{}, "Merge Sort Complete!", steps.back().time_complexity_ops);
    return steps;
}

std::vector<SortStep> SortingAlgorithms::mergeSortHelper(std::vector<int>& arr, int left, int right, std::vector<SortStep>& steps) {
    if (left >= right) return steps;
    
    int mid = left + (right - left) / 2;
    
    // Divide
    std::vector<int> leftRange, rightRange;
    for (int i = left; i <= mid; i++) leftRange.push_back(i);
    for (int i = mid + 1; i <= right; i++) rightRange.push_back(i);
    
    steps.emplace_back(arr, leftRange, rightRange, 
                      "Dividing array: left[" + std::to_string(left) + "..." + std::to_string(mid) + 
                      "] right[" + std::to_string(mid+1) + "..." + std::to_string(right) + "]", 
                      steps.empty() ? 0 : steps.back().time_complexity_ops);
    
    mergeSortHelper(arr, left, mid, steps);
    mergeSortHelper(arr, mid + 1, right, steps);
    
    // Merge
    std::vector<int> temp(right - left + 1);
    int i = left, j = mid + 1, k = 0;
    int operations = steps.empty() ? 0 : steps.back().time_complexity_ops;
    
    while (i <= mid && j <= right) {
        operations++;
        if (arr[i] <= arr[j]) {
            temp[k++] = arr[i++];
        } else {
            temp[k++] = arr[j++];
        }
    }
    
    while (i <= mid) temp[k++] = arr[i++];
    while (j <= right) temp[k++] = arr[j++];
    
    for (i = left, k = 0; i <= right; i++, k++) {
        arr[i] = temp[k];
    }
    
    std::vector<int> merged;
    for (int i = left; i <= right; i++) merged.push_back(i);
    
    steps.emplace_back(arr, merged, std::vector<int>{}, 
                      "Merged subarrays [" + std::to_string(left) + "..." + std::to_string(right) + "]", operations);
    
    return steps;
}

std::vector<SortStep> SortingAlgorithms::quickSort(std::vector<int> arr) {
    std::vector<SortStep> steps;
    steps.emplace_back(arr, std::vector<int>{}, std::vector<int>{}, "Starting Quick Sort", 0);
    
    quickSortHelper(arr, 0, arr.size() - 1, steps);
    
    steps.emplace_back(arr, std::vector<int>{}, std::vector<int>{}, "Quick Sort Complete!", steps.back().time_complexity_ops);
    return steps;
}

void SortingAlgorithms::quickSortHelper(std::vector<int>& arr, int low, int high, std::vector<SortStep>& steps) {
    if (low < high) {
        int pi = partition(arr, low, high, steps);
        
        steps.emplace_back(arr, std::vector<int>{pi}, std::vector<int>{}, 
                          "Pivot " + std::to_string(arr[pi]) + " is in correct position", 
                          steps.empty() ? 0 : steps.back().time_complexity_ops);
        
        quickSortHelper(arr, low, pi - 1, steps);
        quickSortHelper(arr, pi + 1, high, steps);
    }
}

int SortingAlgorithms::partition(std::vector<int>& arr, int low, int high, std::vector<SortStep>& steps) {
    int pivot = arr[high];
    int i = low - 1;
    int operations = steps.empty() ? 0 : steps.back().time_complexity_ops;
    
    steps.emplace_back(arr, std::vector<int>{high}, std::vector<int>{}, 
                      "Choosing pivot: " + std::to_string(pivot), operations);
    
    for (int j = low; j < high; j++) {
        operations++;
        steps.emplace_back(arr, std::vector<int>{high}, std::vector<int>{j}, 
                          "Comparing " + std::to_string(arr[j]) + " with pivot " + std::to_string(pivot), operations);
        
        if (arr[j] < pivot) {
            i++;
            std::swap(arr[i], arr[j]);
            steps.emplace_back(arr, std::vector<int>{i, j}, std::vector<int>{}, 
                              "Swapped " + std::to_string(arr[i]) + " and " + std::to_string(arr[j]), operations);
        }
    }
    
    std::swap(arr[i + 1], arr[high]);
    steps.emplace_back(arr, std::vector<int>{i + 1, high}, std::vector<int>{}, 
                      "Placed pivot in correct position", operations);
    
    return i + 1;
}

std::vector<SortStep> SortingAlgorithms::heapSort(std::vector<int> arr) {
    std::vector<SortStep> steps;
    int n = arr.size();
    int operations = 0;
    
    steps.emplace_back(arr, std::vector<int>{}, std::vector<int>{}, "Starting Heap Sort", operations);
    
    // Build max heap
    for (int i = n / 2 - 1; i >= 0; i--) {
        heapify(arr, n, i, steps);
    }
    
    steps.emplace_back(arr, std::vector<int>{}, std::vector<int>{}, "Max heap built", operations);
    
    // Extract elements one by one
    for (int i = n - 1; i > 0; i--) {
        std::swap(arr[0], arr[i]);
        operations++;
        steps.emplace_back(arr, std::vector<int>{0, i}, std::vector<int>{}, 
                          "Moved max element to position " + std::to_string(i), operations);
        
        heapify(arr, i, 0, steps);
    }
    
    steps.emplace_back(arr, std::vector<int>{}, std::vector<int>{}, "Heap Sort Complete!", operations);
    return steps;
}

void SortingAlgorithms::heapify(std::vector<int>& arr, int n, int i, std::vector<SortStep>& steps) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;
    int operations = steps.empty() ? 0 : steps.back().time_complexity_ops;
    
    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }
    
    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }
    
    if (largest != i) {
        std::swap(arr[i], arr[largest]);
        operations++;
        steps.emplace_back(arr, std::vector<int>{i, largest}, std::vector<int>{}, 
                          "Heapifying: swapped " + std::to_string(arr[i]) + " and " + std::to_string(arr[largest]), operations);
        
        heapify(arr, n, largest, steps);
    }
}

std::vector<SortStep> SortingAlgorithms::countingSort(std::vector<int> arr) {
    std::vector<SortStep> steps;
    int operations = 0;
    
    if (arr.empty()) {
        steps.emplace_back(arr, std::vector<int>{}, std::vector<int>{}, "Array is empty", operations);
        return steps;
    }
    
    int max_val = *std::max_element(arr.begin(), arr.end());
    int min_val = *std::min_element(arr.begin(), arr.end());
    int range = max_val - min_val + 1;
    
    steps.emplace_back(arr, std::vector<int>{}, std::vector<int>{}, 
                      "Starting Counting Sort. Range: " + std::to_string(range), operations);
    
    std::vector<int> count(range, 0);
    
    // Count occurrences
    for (int i = 0; i < arr.size(); i++) {
        count[arr[i] - min_val]++;
        operations++;
    }
    
    steps.emplace_back(arr, std::vector<int>{}, std::vector<int>{}, "Counted element frequencies", operations);
    
    // Reconstruct array
    int index = 0;
    for (int i = 0; i < range; i++) {
        while (count[i]-- > 0) {
            arr[index++] = i + min_val;
            operations++;
        }
    }
    
    steps.emplace_back(arr, std::vector<int>{}, std::vector<int>{}, "Counting Sort Complete!", operations);
    return steps;
}
