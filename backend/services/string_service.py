from typing import List, Dict, Any
from models.api_models import StringRequest

class StringService:
    def __init__(self):
        self.algorithms = {
            'kmp': self._kmp,
            'rabin_karp': self._rabin_karp,
            'z_algorithm': self._z_algorithm
        }

    async def execute_algorithm(self, algorithm: str, request: StringRequest) -> List[Dict[str, Any]]:
        if algorithm not in self.algorithms:
            raise ValueError(f"Unknown algorithm: {algorithm}")
        
        return await self.algorithms[algorithm](request)

    async def _kmp(self, request: StringRequest) -> List[Dict[str, Any]]:
        text = request.text
        pattern = request.pattern
        steps = []
        
        # Build LPS array
        lps = self._build_lps(pattern)
        
        steps.append({
            'text': text,
            'pattern': pattern,
            'textIndex': 0,
            'patternIndex': 0,
            'matches': [],
            'lps': lps,
            'operation': f'Starting KMP search for pattern "{pattern}" in text "{text}"'
        })
        
        i = j = 0  # text and pattern indices
        
        while i < len(text):
            if pattern[j] == text[i]:
                steps.append({
                    'text': text,
                    'pattern': pattern,
                    'textIndex': i,
                    'patternIndex': j,
                    'matches': [],
                    'lps': lps,
                    'operation': f'Characters match: text[{i}] = pattern[{j}] = "{text[i]}"'
                })
                i += 1
                j += 1
            
            if j == len(pattern):
                match_start = i - j
                steps.append({
                    'text': text,
                    'pattern': pattern,
                    'textIndex': i,
                    'patternIndex': j,
                    'matches': [match_start],
                    'lps': lps,
                    'operation': f'Pattern found at index {match_start}'
                })
                j = lps[j - 1]
            elif i < len(text) and pattern[j] != text[i]:
                if j != 0:
                    steps.append({
                        'text': text,
                        'pattern': pattern,
                        'textIndex': i,
                        'patternIndex': j,
                        'matches': [],
                        'lps': lps,
                        'operation': f'Mismatch: using LPS to skip to position {lps[j-1]}'
                    })
                    j = lps[j - 1]
                else:
                    steps.append({
                        'text': text,
                        'pattern': pattern,
                        'textIndex': i,
                        'patternIndex': j,
                        'matches': [],
                        'lps': lps,
                        'operation': f'Mismatch at start: advancing text index'
                    })
                    i += 1
        
        steps.append({
            'text': text,
            'pattern': pattern,
            'textIndex': len(text),
            'patternIndex': 0,
            'matches': [],
            'lps': lps,
            'operation': 'KMP search complete'
        })
        
        return steps

    def _build_lps(self, pattern: str) -> List[int]:
        """Build Longest Proper Prefix which is also Suffix array"""
        m = len(pattern)
        lps = [0] * m
        length = 0
        i = 1
        
        while i < m:
            if pattern[i] == pattern[length]:
                length += 1
                lps[i] = length
                i += 1
            else:
                if length != 0:
                    length = lps[length - 1]
                else:
                    lps[i] = 0
                    i += 1
        
        return lps

    async def _rabin_karp(self, request: StringRequest) -> List[Dict[str, Any]]:
        text = request.text
        pattern = request.pattern
        steps = []
        
        d = 256  # Number of characters
        q = 101  # A prime number
        m = len(pattern)
        n = len(text)
        
        if m > n:
            return [{'text': text, 'pattern': pattern, 'operation': 'Pattern longer than text'}]
        
        # Calculate pattern hash and first window hash
        p = 0  # pattern hash
        t = 0  # text hash
        h = 1
        
        # h = pow(d, m-1) % q
        for i in range(m - 1):
            h = (h * d) % q
        
        # Calculate hash of pattern and first window
        for i in range(m):
            p = (d * p + ord(pattern[i])) % q
            t = (d * t + ord(text[i])) % q
        
        steps.append({
            'text': text,
            'pattern': pattern,
            'windowStart': 0,
            'patternHash': p,
            'windowHash': t,
            'matches': [],
            'operation': f'Calculated pattern hash: {p}, first window hash: {t}'
        })
        
        # Slide the pattern over text
        for i in range(n - m + 1):
            # Check if hashes match
            if p == t:
                # Check characters one by one
                match = True
                for j in range(m):
                    if text[i + j] != pattern[j]:
                        match = False
                        break
                
                if match:
                    steps.append({
                        'text': text,
                        'pattern': pattern,
                        'windowStart': i,
                        'patternHash': p,
                        'windowHash': t,
                        'matches': [i],
                        'operation': f'Pattern found at index {i} (hash match confirmed)'
                    })
                else:
                    steps.append({
                        'text': text,
                        'pattern': pattern,
                        'windowStart': i,
                        'patternHash': p,
                        'windowHash': t,
                        'matches': [],
                        'operation': f'Hash collision at index {i} (spurious match)'
                    })
            else:
                steps.append({
                    'text': text,
                    'pattern': pattern,
                    'windowStart': i,
                    'patternHash': p,
                    'windowHash': t,
                    'matches': [],
                    'operation': f'Hash mismatch at index {i}: pattern={p}, window={t}'
                })
            
            # Calculate hash for next window
            if i < n - m:
                t = (d * (t - ord(text[i]) * h) + ord(text[i + m])) % q
                if t < 0:
                    t += q
        
        steps.append({
            'text': text,
            'pattern': pattern,
            'windowStart': n - m,
            'patternHash': p,
            'windowHash': t,
            'matches': [],
            'operation': 'Rabin-Karp search complete'
        })
        
        return steps

    async def _z_algorithm(self, request: StringRequest) -> List[Dict[str, Any]]:
        text = request.text
        pattern = request.pattern
        steps = []
        
        # Concatenate pattern and text with a separator
        s = pattern + "$" + text
        n = len(s)
        z = [0] * n
        
        steps.append({
            'text': text,
            'pattern': pattern,
            'concatenated': s,
            'zArray': z.copy(),
            'left': 0,
            'right': 0,
            'operation': f'Starting Z-algorithm on "{s}"'
        })
        
        left = right = 0
        
        for i in range(1, n):
            if i <= right:
                z[i] = min(right - i + 1, z[i - left])
            
            # Try to extend match
            while i + z[i] < n and s[z[i]] == s[i + z[i]]:
                z[i] += 1
            
            if i + z[i] - 1 > right:
                left, right = i, i + z[i] - 1
            
            steps.append({
                'text': text,
                'pattern': pattern,
                'concatenated': s,
                'zArray': z.copy(),
                'left': left,
                'right': right,
                'currentIndex': i,
                'operation': f'Z[{i}] = {z[i]} (substring length from position {i})'
            })
        
        # Find matches (where Z[i] == pattern length)
        pattern_len = len(pattern)
        matches = []
        
        for i in range(pattern_len + 1, n):
            if z[i] == pattern_len:
                match_pos = i - pattern_len - 1  # Adjust for separator
                matches.append(match_pos)
        
        steps.append({
            'text': text,
            'pattern': pattern,
            'concatenated': s,
            'zArray': z,
            'matches': matches,
            'operation': f'Z-algorithm complete. Found {len(matches)} matches'
        })
        
        return steps
