import sys
import os
from pathlib import Path
from typing import Optional

def _candidate_dirs(root: Path) -> list:
    cpp = root / "cpp"
    build = cpp / "build"
    return [
        build,                        # cpp/build
        build / "Release",            # cpp/build/Release (Windows MSVC default)
        build / "Debug",              # cpp/build/Debug
        cpp,                          # cpp (in case built in-place)
    ]

def _has_engine(dir_path: Path) -> bool:
    if not dir_path.exists():
        return False
    # Windows .pyd, Linux .so, Mac .so/.dylib
    patterns = ["algorithm_engine*.pyd", "algorithm_engine*.so", "algorithm_engine*.dylib"]
    for pattern in patterns:
        if any(dir_path.glob(pattern)):
            return True
    return False

def ensure_path() -> Optional[Path]:
    """Find engine location and append to sys.path once. Returns the directory if found."""
    # project root = backend/.. 
    here = Path(__file__).resolve()
    root = here.parents[1]
    for d in _candidate_dirs(root):
        if _has_engine(d):
            p = str(d)
            if p not in sys.path:
                sys.path.insert(0, p)
            return d
    return None

def get_engine():
    """Attempt to import algorithm_engine after wiring sys.path. Returns module or None."""
    ensure_path()
    try:
        import algorithm_engine  # type: ignore
        return algorithm_engine
    except Exception:
        return None
