from typing import List, Dict, Any
from models.api_models import DPRequest

class DPService:
    def __init__(self):
        self.algorithms = {
            'lcs': self._longest_common_subsequence,
            'knapsack': self._knapsack,
            'coin_change': self._coin_change
        }

    async def execute_algorithm(self, algorithm: str, request: DPRequest) -> List[Dict[str, Any]]:
        if algorithm not in self.algorithms:
            raise ValueError(f"Unknown algorithm: {algorithm}")
        
        return await self.algorithms[algorithm](request)

    async def _longest_common_subsequence(self, request: DPRequest) -> List[Dict[str, Any]]:
        params = request.params
        text1 = params.get('text1', '')
        text2 = params.get('text2', '')
        
        steps = []
        m, n = len(text1), len(text2)
        
        # Initialize DP table
        dp = [[0] * (n + 1) for _ in range(m + 1)]
        
        steps.append({
            'text1': text1,
            'text2': text2,
            'table': [row[:] for row in dp],
            'currentCell': [-1, -1],
            'operation': f'Initialized DP table for LCS of "{text1}" and "{text2}"'
        })
        
        # Fill DP table
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if text1[i-1] == text2[j-1]:
                    dp[i][j] = dp[i-1][j-1] + 1
                    steps.append({
                        'text1': text1,
                        'text2': text2,
                        'table': [row[:] for row in dp],
                        'currentCell': [i, j],
                        'operation': f'Characters match: {text1[i-1]} = {text2[j-1]}, dp[{i}][{j}] = {dp[i][j]}'
                    })
                else:
                    dp[i][j] = max(dp[i-1][j], dp[i][j-1])
                    steps.append({
                        'text1': text1,
                        'text2': text2,
                        'table': [row[:] for row in dp],
                        'currentCell': [i, j],
                        'operation': f'Characters differ: {text1[i-1]} ≠ {text2[j-1]}, take max({dp[i-1][j]}, {dp[i][j-1]}) = {dp[i][j]}'
                    })
        
        # Backtrack to find LCS
        lcs = []
        i, j = m, n
        backtrack_steps = []
        
        while i > 0 and j > 0:
            if text1[i-1] == text2[j-1]:
                lcs.append(text1[i-1])
                backtrack_steps.append([i, j])
                i -= 1
                j -= 1
            elif dp[i-1][j] > dp[i][j-1]:
                i -= 1
            else:
                j -= 1
        
        lcs.reverse()
        
        steps.append({
            'text1': text1,
            'text2': text2,
            'table': [row[:] for row in dp],
            'currentCell': [m, n],
            'lcs': ''.join(lcs),
            'backtrackPath': backtrack_steps,
            'operation': f'LCS found: "{"".join(lcs)}" (length: {dp[m][n]})'
        })
        
        return steps

    async def _knapsack(self, request: DPRequest) -> List[Dict[str, Any]]:
        params = request.params
        weights = params.get('weights', [])
        values = params.get('values', [])
        capacity = params.get('capacity', 0)
        knapsack_type = params.get('type', '0/1')  # '0/1' or 'unbounded'
        
        steps = []
        n = len(weights)
        
        if knapsack_type == '0/1':
            return await self._knapsack_01(weights, values, capacity)
        else:
            return await self._knapsack_unbounded(weights, values, capacity)

    async def _knapsack_01(self, weights: List[int], values: List[int], capacity: int) -> List[Dict[str, Any]]:
        steps = []
        n = len(weights)
        
        # Initialize DP table
        dp = [[0] * (capacity + 1) for _ in range(n + 1)]
        
        steps.append({
            'weights': weights,
            'values': values,
            'capacity': capacity,
            'table': [row[:] for row in dp],
            'currentCell': [-1, -1],
            'operation': f'Initialized 0/1 Knapsack DP table (capacity: {capacity})'
        })
        
        # Fill DP table
        for i in range(1, n + 1):
            for w in range(1, capacity + 1):
                if weights[i-1] <= w:
                    include = values[i-1] + dp[i-1][w - weights[i-1]]
                    exclude = dp[i-1][w]
                    
                    if include > exclude:
                        dp[i][w] = include
                        steps.append({
                            'weights': weights,
                            'values': values,
                            'capacity': capacity,
                            'table': [row[:] for row in dp],
                            'currentCell': [i, w],
                            'operation': f'Item {i} (w={weights[i-1]}, v={values[i-1]}): Include (value={include})'
                        })
                    else:
                        dp[i][w] = exclude
                        steps.append({
                            'weights': weights,
                            'values': values,
                            'capacity': capacity,
                            'table': [row[:] for row in dp],
                            'currentCell': [i, w],
                            'operation': f'Item {i} (w={weights[i-1]}, v={values[i-1]}): Exclude (value={exclude})'
                        })
                else:
                    dp[i][w] = dp[i-1][w]
                    steps.append({
                        'weights': weights,
                        'values': values,
                        'capacity': capacity,
                        'table': [row[:] for row in dp],
                        'currentCell': [i, w],
                        'operation': f'Item {i} too heavy (w={weights[i-1]} > {w}): Skip'
                    })
        
        # Backtrack to find selected items
        selected_items = []
        w = capacity
        for i in range(n, 0, -1):
            if dp[i][w] != dp[i-1][w]:
                selected_items.append(i-1)
                w -= weights[i-1]
        
        selected_items.reverse()
        
        steps.append({
            'weights': weights,
            'values': values,
            'capacity': capacity,
            'table': [row[:] for row in dp],
            'selectedItems': selected_items,
            'maxValue': dp[n][capacity],
            'operation': f'Optimal solution: items {selected_items}, max value: {dp[n][capacity]}'
        })
        
        return steps

    async def _knapsack_unbounded(self, weights: List[int], values: List[int], capacity: int) -> List[Dict[str, Any]]:
        steps = []
        n = len(weights)
        
        # Initialize DP array
        dp = [0] * (capacity + 1)
        
        steps.append({
            'weights': weights,
            'values': values,
            'capacity': capacity,
            'array': dp[:],
            'currentIndex': -1,
            'operation': f'Initialized Unbounded Knapsack DP array (capacity: {capacity})'
        })
        
        # Fill DP array
        for w in range(1, capacity + 1):
            for i in range(n):
                if weights[i] <= w:
                    new_value = values[i] + dp[w - weights[i]]
                    if new_value > dp[w]:
                        dp[w] = new_value
                        steps.append({
                            'weights': weights,
                            'values': values,
                            'capacity': capacity,
                            'array': dp[:],
                            'currentIndex': w,
                            'operation': f'Capacity {w}: Use item {i} (w={weights[i]}, v={values[i]}), new max: {dp[w]}'
                        })
        
        steps.append({
            'weights': weights,
            'values': values,
            'capacity': capacity,
            'array': dp[:],
            'maxValue': dp[capacity],
            'operation': f'Unbounded Knapsack complete: max value = {dp[capacity]}'
        })
        
        return steps

    async def _coin_change(self, request: DPRequest) -> List[Dict[str, Any]]:
        params = request.params
        coins = params.get('coins', [])
        amount = params.get('amount', 0)
        problem_type = params.get('problem_type', 'min_coins')  # 'min_coins' or 'ways'
        
        steps = []
        
        if problem_type == 'min_coins':
            return await self._coin_change_min(coins, amount)
        else:
            return await self._coin_change_ways(coins, amount)

    async def _coin_change_min(self, coins: List[int], amount: int) -> List[Dict[str, Any]]:
        steps = []
        
        # Initialize DP array
        dp = [float('inf')] * (amount + 1)
        dp[0] = 0
        
        steps.append({
            'coins': coins,
            'amount': amount,
            'array': [x if x != float('inf') else -1 for x in dp],
            'currentIndex': -1,
            'operation': f'Initialized Coin Change DP array (amount: {amount})'
        })
        
        # Fill DP array
        for i in range(1, amount + 1):
            for coin in coins:
                if coin <= i and dp[i - coin] != float('inf'):
                    if dp[i - coin] + 1 < dp[i]:
                        dp[i] = dp[i - coin] + 1
                        steps.append({
                            'coins': coins,
                            'amount': amount,
                            'array': [x if x != float('inf') else -1 for x in dp],
                            'currentIndex': i,
                            'operation': f'Amount {i}: Use coin {coin}, min coins: {dp[i]}'
                        })
        
        result = dp[amount] if dp[amount] != float('inf') else -1
        steps.append({
            'coins': coins,
            'amount': amount,
            'array': [x if x != float('inf') else -1 for x in dp],
            'minCoins': result,
            'operation': f'Minimum coins needed: {result if result != -1 else "impossible"}'
        })
        
        return steps

    async def _coin_change_ways(self, coins: List[int], amount: int) -> List[Dict[str, Any]]:
        steps = []
        
        # Initialize DP array
        dp = [0] * (amount + 1)
        dp[0] = 1
        
        steps.append({
            'coins': coins,
            'amount': amount,
            'array': dp[:],
            'currentCoin': -1,
            'operation': f'Initialized Coin Change Ways DP array (amount: {amount})'
        })
        
        # Fill DP array for each coin
        for coin in coins:
            steps.append({
                'coins': coins,
                'amount': amount,
                'array': dp[:],
                'currentCoin': coin,
                'operation': f'Processing coin: {coin}'
            })
            
            for i in range(coin, amount + 1):
                dp[i] += dp[i - coin]
                steps.append({
                    'coins': coins,
                    'amount': amount,
                    'array': dp[:],
                    'currentCoin': coin,
                    'currentIndex': i,
                    'operation': f'Amount {i}: Add ways using coin {coin}, total ways: {dp[i]}'
                })
        
        steps.append({
            'coins': coins,
            'amount': amount,
            'array': dp[:],
            'totalWays': dp[amount],
            'operation': f'Total ways to make amount {amount}: {dp[amount]}'
        })
        
        return steps
