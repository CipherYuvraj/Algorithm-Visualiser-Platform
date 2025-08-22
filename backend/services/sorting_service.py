from typing import List, Dict, Any
import asyncio

# Prefer absolute import when running from repo root; fallback when running inside backend/
try:
    from backend.utils.engine_loader import get_engine  # type: ignore
except Exception:
    try:
        from utils.engine_loader import get_engine  # type: ignore
    except Exception:
        def get_engine():  # type: ignore
            return None

algorithm_engine = get_engine()

class SortingService:
    def __init__(self):
        self.algorithms = {
            'bubble': self._bubble_sort,
            'merge': self._merge_sort,
            'quick': self._quick_sort,
            'heap': self._heap_sort,
            'counting': self._counting_sort,
        }

    async def execute_algorithm(self, algorithm: str, array: List[int]) -> Dict[str, Any]:
        if algorithm not in self.algorithms:
            raise ValueError(f"Unknown algorithm: {algorithm}")
        steps = await self.algorithms[algorithm](array or [])
        return {"steps": steps}

    # -------- Engine conversion helpers --------
    def _convert_cpp_steps(self, cpp_steps) -> List[Dict[str, Any]]:
        out = []
        for s in cpp_steps:
            out.append({
                "array": list(getattr(s, "array", [])),
                "highlighted": list(getattr(s, "highlighted", [])),
                "comparing": list(getattr(s, "comparing", [])),
                "operation": getattr(s, "operation", ""),
                "operations_count": int(getattr(s, "operations_count", 0)),
                "time_complexity": getattr(s, "time_complexity", ""),
                "space_complexity": getattr(s, "space_complexity", ""),
            })
        return out

    # -------- Algorithm dispatchers --------
    async def _bubble_sort(self, array: List[int]) -> List[Dict[str, Any]]:
        if algorithm_engine:
            try:
                cpp_steps = algorithm_engine.bubble_sort(list(array))
                return self._convert_cpp_steps(cpp_steps)
            except Exception:
                pass
        return await self._bubble_fallback(array)

    async def _merge_sort(self, array: List[int]) -> List[Dict[str, Any]]:
        if algorithm_engine:
            try:
                cpp_steps = algorithm_engine.merge_sort(list(array))
                return self._convert_cpp_steps(cpp_steps)
            except Exception:
                pass
        return await self._merge_fallback(array)

    async def _quick_sort(self, array: List[int]) -> List[Dict[str, Any]]:
        if algorithm_engine:
            try:
                cpp_steps = algorithm_engine.quick_sort(list(array))
                return self._convert_cpp_steps(cpp_steps)
            except Exception:
                pass
        # Minimal placeholder: reuse merge fallback to avoid 400s
        return await self._merge_fallback(array)

    async def _heap_sort(self, array: List[int]) -> List[Dict[str, Any]]:
        if algorithm_engine:
            try:
                cpp_steps = algorithm_engine.heap_sort(list(array))
                return self._convert_cpp_steps(cpp_steps)
            except Exception:
                pass
        # Minimal placeholder: reuse bubble fallback
        return await self._bubble_fallback(array)

    async def _counting_sort(self, array: List[int]) -> List[Dict[str, Any]]:
        if algorithm_engine:
            try:
                cpp_steps = algorithm_engine.counting_sort(list(array))
                return self._convert_cpp_steps(cpp_steps)
            except Exception:
                pass
        # Minimal placeholder: stable counting sort when numbers >= 0
        return await self._counting_fallback(array)

    # -------- Python fallbacks (concise) --------
    async def _bubble_fallback(self, array: List[int]) -> List[Dict[str, Any]]:
        steps: List[Dict[str, Any]] = []
        arr = list(array)
        n = len(arr)
        ops = 0
        steps.append(self._step(arr, [], [], "Starting Bubble Sort", ops, "O(n²)", "O(1)"))
        for i in range(n - 1):
            for j in range(n - i - 1):
                ops += 1
                steps.append(self._step(arr, [], [j, j + 1], f"Comparing {arr[j]} and {arr[j+1]}", ops, "O(n²)", "O(1)"))
                if arr[j] > arr[j + 1]:
                    arr[j], arr[j + 1] = arr[j + 1], arr[j]
                    steps.append(self._step(arr, [j, j + 1], [], f"Swapped positions {j} and {j+1}", ops, "O(n²)", "O(1)"))
        steps.append(self._step(arr, [], [], "Bubble Sort Complete", ops, "O(n²)", "O(1)"))
        return steps

    async def _merge_fallback(self, array: List[int]) -> List[Dict[str, Any]]:
        steps: List[Dict[str, Any]] = []
        arr = list(array)
        ops = 0
        steps.append(self._step(arr, [], [], "Starting Merge Sort", ops, "O(n log n)", "O(n)"))

        def merge_sort(l: int, r: int):
            nonlocal ops, arr, steps
            if l >= r:
                return
            m = (l + r) // 2
            steps.append(self._step(arr, [l, m, r], [], f"Divide [{l},{r}] => [{l},{m}] and [{m+1},{r}]", ops, "O(n log n)", "O(n)"))
            merge_sort(l, m)
            merge_sort(m + 1, r)
            # merge
            i, j = l, m + 1
            tmp = []
            while i <= m and j <= r:
                ops += 1
                if arr[i] <= arr[j]:
                    tmp.append(arr[i]); i += 1
                else:
                    tmp.append(arr[j]); j += 1
            while i <= m: tmp.append(arr[i]); i += 1
            while j <= r: tmp.append(arr[j]); j += 1
            arr[l:r + 1] = tmp
            steps.append(self._step(arr, list(range(l, r + 1)), [], f"Merged [{l},{m}] and [{m+1},{r}]", ops, "O(n log n)", "O(n)"))

        if arr:
            merge_sort(0, len(arr) - 1)
        steps.append(self._step(arr, [], [], "Merge Sort Complete", ops, "O(n log n)", "O(n)"))
        return steps

    async def _counting_fallback(self, array: List[int]) -> List[Dict[str, Any]]:
        steps: List[Dict[str, Any]] = []
        arr = list(array)
        ops = 0
        if not arr:
            return [self._step([], [], [], "Array is empty", 0, "O(n + k)", "O(k)")]
        mn, mx = min(arr), max(arr)
        rng = mx - mn + 1
        steps.append(self._step(arr, [], [], f"Starting Counting Sort. Range: {rng}", ops, "O(n + k)", "O(k)"))
        count = [0] * rng
        for v in arr:
            count[v - mn] += 1
            ops += 1
        steps.append(self._step(arr, [], [], "Counted element frequencies", ops, "O(n + k)", "O(k)"))
        idx = 0
        for i, c in enumerate(count):
            while c > 0:
                arr[idx] = i + mn
                idx += 1
                c -= 1
                ops += 1
        steps.append(self._step(arr, [], [], "Counting Sort Complete", ops, "O(n + k)", "O(k)"))
        return steps

    # -------- Utils --------
    def _step(self, arr, highlighted, comparing, operation, ops, t, s) -> Dict[str, Any]:
        return {
            "array": list(arr),
            "highlighted": list(highlighted),
            "comparing": list(comparing),
            "operation": operation,
            "operations_count": int(ops),
            "time_complexity": t,
            "space_complexity": s,
        }