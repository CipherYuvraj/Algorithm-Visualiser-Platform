from typing import List, Dict, Any
import asyncio

class SortingService:
    async def _fallback_quick_sort(self, array: List[int]) -> List[Dict[str, Any]]:
        steps = []
        arr = array.copy()
        operations = [0]
        
        steps.append({
            'array': arr.copy(),
            'highlighted': [],
            'comparing': [],
            'operation': 'Starting Quick Sort',
            'operations_count': operations[0],
            'time_complexity': 'O(n log n)',
            'space_complexity': 'O(log n)'
        })
        
        async def quick_sort_recursive(arr, low, high):
            if low < high:
                pi = await partition(arr, low, high)
                
                steps.append({
                    'array': arr.copy(),
                    'highlighted': [pi],
                    'comparing': [],
                    'operation': f'Pivot {arr[pi]} is in correct position',
                    'operations_count': operations[0],
                    'time_complexity': 'O(n log n)',
                    'space_complexity': 'O(log n)'
                })
                
                await quick_sort_recursive(arr, low, pi - 1)
                await quick_sort_recursive(arr, pi + 1, high)
        
        async def partition(arr, low, high):
            pivot = arr[high]
            i = low - 1
            
            steps.append({
                'array': arr.copy(),
                'highlighted': [high],
                'comparing': [],
                'operation': f'Choosing pivot: {pivot}',
                'operations_count': operations[0],
                'time_complexity': 'O(n log n)',
                'space_complexity': 'O(log n)'
            })
            
            for j in range(low, high):
                operations[0] += 1
                steps.append({
                    'array': arr.copy(),
                    'highlighted': [high],
                    'comparing': [j],
                    'operation': f'Comparing {arr[j]} with pivot {pivot}',
                    'operations_count': operations[0],
                    'time_complexity': 'O(n log n)',
                    'space_complexity': 'O(log n)'
                })
                
                if arr[j] < pivot:
                    i += 1
                    arr[i], arr[j] = arr[j], arr[i]
                    steps.append({
                        'array': arr.copy(),
                        'highlighted': [i, j],
                        'comparing': [],
                        'operation': f'Swapped {arr[i]} and {arr[j]}',
                        'operations_count': operations[0],
                        'time_complexity': 'O(n log n)',
                        'space_complexity': 'O(log n)'
                    })
                
                await asyncio.sleep(0)
            
            arr[i + 1], arr[high] = arr[high], arr[i + 1]
            return i + 1
        
        await quick_sort_recursive(arr, 0, len(arr) - 1)
        
        steps.append({
            'array': arr.copy(),
            'highlighted': [],
            'comparing': [],
            'operation': 'Quick Sort Complete!',
            'operations_count': operations[0],
            'time_complexity': 'O(n log n)',
            'space_complexity': 'O(log n)'
        })
        
        return steps

    async def _fallback_heap_sort(self, array: List[int]) -> List[Dict[str, Any]]:
        steps = []
        arr = array.copy()
        n = len(arr)
        operations = [0]
        
        steps.append({
            'array': arr.copy(),
            'highlighted': [],
            'comparing': [],
            'operation': 'Starting Heap Sort',
            'operations_count': operations[0],
            'time_complexity': 'O(n log n)',
            'space_complexity': 'O(1)'
        })
        
        async def heapify(arr, n, i):
            largest = i
            left = 2 * i + 1
            right = 2 * i + 2
            
            if left < n and arr[left] > arr[largest]:
                largest = left
            
            if right < n and arr[right] > arr[largest]:
                largest = right
            
            if largest != i:
                arr[i], arr[largest] = arr[largest], arr[i]
                operations[0] += 1
                steps.append({
                    'array': arr.copy(),
                    'highlighted': [i, largest],
                    'comparing': [],
                    'operation': f'Heapifying: swapped {arr[i]} and {arr[largest]}',
                    'operations_count': operations[0],
                    'time_complexity': 'O(n log n)',
                    'space_complexity': 'O(1)'
                })
                await heapify(arr, n, largest)
                await asyncio.sleep(0)
        
        # Build max heap
        for i in range(n // 2 - 1, -1, -1):
            await heapify(arr, n, i)
        
        steps.append({
            'array': arr.copy(),
            'highlighted': [],
            'comparing': [],
            'operation': 'Max heap built',
            'operations_count': operations[0],
            'time_complexity': 'O(n log n)',
            'space_complexity': 'O(1)'
        })
        
        # Extract elements
        for i in range(n - 1, 0, -1):
            arr[0], arr[i] = arr[i], arr[0]
            operations[0] += 1
            steps.append({
                'array': arr.copy(),
                'highlighted': [0, i],
                'comparing': [],
                'operation': f'Moved max element to position {i}',
                'operations_count': operations[0],
                'time_complexity': 'O(n log n)',
                'space_complexity': 'O(1)'
            })
            await heapify(arr, i, 0)
        
        steps.append({
            'array': arr.copy(),
            'highlighted': [],
            'comparing': [],
            'operation': 'Heap Sort Complete!',
            'operations_count': operations[0],
            'time_complexity': 'O(n log n)',
            'space_complexity': 'O(1)'
        })
        
        return steps

    async def _fallback_counting_sort(self, array: List[int]) -> List[Dict[str, Any]]:
        steps = []
        arr = array.copy()
        operations = [0]
        
        if not arr:
            return [{'array': [], 'highlighted': [], 'comparing': [], 'operation': 'Array is empty', 'operations_count': 0, 'time_complexity': 'O(n + k)', 'space_complexity': 'O(k)'}]
        
        max_val = max(arr)
        min_val = min(arr)
        range_val = max_val - min_val + 1
        
        steps.append({
            'array': arr.copy(),
            'highlighted': [],
            'comparing': [],
            'operation': f'Starting Counting Sort. Range: {range_val}',
            'operations_count': operations[0],
            'time_complexity': 'O(n + k)',
            'space_complexity': 'O(k)'
        })
        
        count = [0] * range_val
        
        for i in range(len(arr)):
            count[arr[i] - min_val] += 1
            operations[0] += 1
            await asyncio.sleep(0)
        
        steps.append({
            'array': arr.copy(),
            'highlighted': [],
            'comparing': [],
            'operation': 'Counted element frequencies',
            'operations_count': operations[0],
            'time_complexity': 'O(n + k)',
            'space_complexity': 'O(k)'
        })
        
        index = 0
        for i in range(range_val):
            while count[i] > 0:
                arr[index] = i + min_val
                index += 1
                count[i] -= 1
                operations[0] += 1
                await asyncio.sleep(0)
        
        steps.append({
            'array': arr.copy(),
            'highlighted': [],
            'comparing': [],
            'operation': 'Counting Sort Complete!',
            'operations_count': operations[0],
            'time_complexity': 'O(n + k)',
            'space_complexity': 'O(k)'
        })
        
        return steps