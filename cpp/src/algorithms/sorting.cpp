#include "algorithms/sorting.h"
#include <algorithm>
#include <functional>

// SortingStep constructor implementation
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

std::vector<SortingStep> SortingAlgorithms::bubbleSort(std::vector<int> arr) {
    std::vector<SortingStep> steps;
    int n = static_cast<int>(arr.size());
    int operations = 0;
    
    steps.push_back(SortingStep(arr, {}, {}, "Starting Bubble Sort", operations, "O(n²)", "O(1)"));
    
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            operations++;
            std::vector<int> comparing = {j, j+1};
            steps.push_back(SortingStep(arr, {}, comparing, 
                           "Comparing " + std::to_string(arr[j]) + " and " + std::to_string(arr[j+1]), 
                           operations, "O(n²)", "O(1)"));
            
            if (arr[j] > arr[j + 1]) {
                std::swap(arr[j], arr[j + 1]);
                std::vector<int> highlighted = {j, j+1};
                steps.push_back(SortingStep(arr, highlighted, {}, 
                               "Swapped " + std::to_string(arr[j+1]) + " and " + std::to_string(arr[j]), 
                               operations, "O(n²)", "O(1)"));
            }
        }
    }
    
    steps.push_back(SortingStep(arr, {}, {}, "Bubble Sort Complete", operations, "O(n²)", "O(1)"));
    return steps;
}

std::vector<SortingStep> SortingAlgorithms::mergeSort(std::vector<int> arr) {
    std::vector<SortingStep> steps;
    int operations = 0;
    
    steps.push_back(SortingStep(arr, {}, {}, "Starting Merge Sort", operations, "O(n log n)", "O(n)"));
    
    std::function<void(int, int)> mergeSortHelper = [&](int left, int right) {
        if (left < right) {
            int mid = left + (right - left) / 2;
            
            std::vector<int> highlighted = {left, mid, right};
            steps.push_back(SortingStep(arr, highlighted, {}, 
                           "Dividing array from " + std::to_string(left) + " to " + std::to_string(right), 
                           operations, "O(n log n)", "O(n)"));
            
            mergeSortHelper(left, mid);
            mergeSortHelper(mid + 1, right);
            
            // Merge process
            std::vector<int> temp(right - left + 1);
            int i = left, j = mid + 1, k = 0;
            
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
            
            for (int idx = 0; idx < k; idx++) {
                arr[left + idx] = temp[idx];
            }
            
            std::vector<int> merged;
            for (int idx = left; idx <= right; idx++) {
                merged.push_back(idx);
            }
            steps.push_back(SortingStep(arr, merged, {}, 
                           "Merged subarrays", operations, "O(n log n)", "O(n)"));
        }
    };
    
    mergeSortHelper(0, static_cast<int>(arr.size()) - 1);
    steps.push_back(SortingStep(arr, {}, {}, "Merge Sort Complete", operations, "O(n log n)", "O(n)"));
    return steps;
}

std::vector<SortingStep> SortingAlgorithms::quickSort(std::vector<int> arr) {
    std::vector<SortingStep> steps;
    int operations = 0;
    
    steps.push_back(SortingStep(arr, {}, {}, "Starting Quick Sort", operations, "O(n log n)", "O(log n)"));
    
    std::function<void(int, int)> quickSortHelper = [&](int low, int high) {
        if (low < high) {
            int pi = partition(arr, low, high, steps, operations);
            quickSortHelper(low, pi - 1);
            quickSortHelper(pi + 1, high);
        }
    };
    
    quickSortHelper(0, static_cast<int>(arr.size()) - 1);
    steps.push_back(SortingStep(arr, {}, {}, "Quick Sort Complete", operations, "O(n log n)", "O(log n)"));
    return steps;
}

int SortingAlgorithms::partition(std::vector<int>& arr, int low, int high, std::vector<SortingStep>& steps, int& operations) {
    int pivot = arr[high];
    int i = low - 1;
    
    std::vector<int> pivotHighlight = {high};
    steps.push_back(SortingStep(arr, pivotHighlight, {}, "Choosing pivot: " + std::to_string(pivot), 
                    operations, "O(n log n)", "O(log n)"));
    
    for (int j = low; j < high; j++) {
        operations++;
        std::vector<int> comparing = {j};
        steps.push_back(SortingStep(arr, {}, comparing, 
                        "Comparing " + std::to_string(arr[j]) + " with pivot " + std::to_string(pivot), 
                        operations, "O(n log n)", "O(log n)"));
        
        if (arr[j] < pivot) {
            i++;
            std::swap(arr[i], arr[j]);
            std::vector<int> swapped = {i, j};
            steps.push_back(SortingStep(arr, swapped, {}, 
                            "Swapped " + std::to_string(arr[i]) + " and " + std::to_string(arr[j]), 
                            operations, "O(n log n)", "O(log n)"));
        }
    }
    
    std::swap(arr[i + 1], arr[high]);
    std::vector<int> finalPos = {i + 1};
    steps.push_back(SortingStep(arr, finalPos, {}, "Placed pivot in correct position", 
                    operations, "O(n log n)", "O(log n)"));
    
    return i + 1;
}

std::vector<SortingStep> SortingAlgorithms::heapSort(std::vector<int> arr) {
    std::vector<SortingStep> steps;
    int n = static_cast<int>(arr.size());
    int operations = 0;
    
    steps.push_back(SortingStep(arr, {}, {}, "Starting Heap Sort", operations, "O(n log n)", "O(1)"));
    
    // Build max heap
    for (int i = n / 2 - 1; i >= 0; i--) {
        heapify(arr, n, i, steps, operations);
    }
    
    steps.push_back(SortingStep(arr, {}, {}, "Max heap built", operations, "O(n log n)", "O(1)"));
    
    // Extract elements from heap
    for (int i = n - 1; i > 0; i--) {
        std::swap(arr[0], arr[i]);
        operations++;
        std::vector<int> swapped = {0, i};
        steps.push_back(SortingStep(arr, swapped, {}, "Moved max element to position " + std::to_string(i), 
                        operations, "O(n log n)", "O(1)"));
        
        heapify(arr, i, 0, steps, operations);
    }
    
    steps.push_back(SortingStep(arr, {}, {}, "Heap Sort Complete", operations, "O(n log n)", "O(1)"));
    return steps;
}

void SortingAlgorithms::heapify(std::vector<int>& arr, int n, int i, std::vector<SortingStep>& steps, int& operations) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;
    
    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }
    
    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }
    
    if (largest != i) {
        std::swap(arr[i], arr[largest]);
        operations++;
        std::vector<int> heapified = {i, largest};
        steps.push_back(SortingStep(arr, heapified, {}, "Heapifying: swapped elements", 
                        operations, "O(n log n)", "O(1)"));
        heapify(arr, n, largest, steps, operations);
    }
}

std::vector<SortingStep> SortingAlgorithms::countingSort(std::vector<int> arr) {
    std::vector<SortingStep> steps;
    int operations = 0;
    
    if (arr.empty()) {
        steps.push_back(SortingStep(arr, {}, {}, "Array is empty", operations, "O(n + k)", "O(k)"));
        return steps;
    }
    
    int maxVal = *std::max_element(arr.begin(), arr.end());
    int minVal = *std::min_element(arr.begin(), arr.end());
    int range = maxVal - minVal + 1;
    
    steps.push_back(SortingStep(arr, {}, {}, "Starting Counting Sort, range: " + std::to_string(range), 
                    operations, "O(n + k)", "O(k)"));
    
    std::vector<int> count(range, 0);
    
    // Count frequencies
    for (size_t i = 0; i < arr.size(); i++) {
        count[arr[i] - minVal]++;
        operations++;
    }
    
    steps.push_back(SortingStep(arr, {}, {}, "Counted element frequencies", operations, "O(n + k)", "O(k)"));
    
    // Reconstruct array
    int index = 0;
    for (int i = 0; i < range; i++) {
        while (count[i] > 0) {
            arr[index] = i + minVal;
            index++;
            count[i]--;
            operations++;
        }
    }
    
    steps.push_back(SortingStep(arr, {}, {}, "Counting Sort Complete", operations, "O(n + k)", "O(k)"));
    return steps;
}
