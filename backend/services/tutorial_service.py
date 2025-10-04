from typing import Dict, List, Optional
from models.tutorial_models import Tutorial, TutorialStep, Quiz, QuizOption

# Mock database of tutorials
TUTORIALS_DB: Dict[str, Tutorial] = {
    "sorting": Tutorial(
        id="sorting",
        title="Sorting Algorithms Mastery",
        description="Learn about different sorting algorithms and their implementations",
        difficulty="Beginner",
        estimatedTime="30 minutes",
        prerequisites=["basic-arrays"],
        category="sorting",
        icon="🔄",
        steps=[
            TutorialStep(
                id="intro",
                type="explanation",
                title="Introduction to Sorting",
                content="Sorting is a fundamental operation in computer science...",
                interactive=True
            ),
            TutorialStep(
                id="bubble-sort",
                type="explanation",
                title="Bubble Sort Algorithm",
                content="Bubble Sort is the simplest sorting algorithm...",
                codeExample="""def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr""",
                interactive=True,
                quiz=Quiz(
                    question="What is the time complexity of Bubble Sort?",
                    options=[
                        QuizOption(text="O(n)", isCorrect=False),
                        QuizOption(text="O(n²)", isCorrect=True),
                        QuizOption(text="O(n log n)", isCorrect=False),
                        QuizOption(text="O(1)", isCorrect=False)
                    ],
                    explanation="Bubble Sort uses nested loops, leading to O(n²) time complexity"
                )
            )
        ]
    ),
    "graph": Tutorial(
        id="graph",
        title="Graph Algorithms",
        description="Master graph traversal and pathfinding algorithms",
        difficulty="Intermediate",
        estimatedTime="45 minutes",
        prerequisites=["basic-arrays", "sorting"],
        category="graph",
        icon="🕸️",
        steps=[
            TutorialStep(
                id="intro",
                type="explanation",
                title="Introduction to Graphs",
                content="Graphs are versatile data structures...",
                interactive=True
            )
        ]
    )
}

class TutorialService:
    @staticmethod
    def get_all_tutorials() -> List[Tutorial]:
        """Get all available tutorials."""
        return list(TUTORIALS_DB.values())

    @staticmethod
    def get_tutorial_by_id(tutorial_id: str) -> Optional[Tutorial]:
        """Get a specific tutorial by ID."""
        return TUTORIALS_DB.get(tutorial_id)

    @staticmethod
    def get_tutorials_by_difficulty(difficulty: str) -> List[Tutorial]:
        """Get tutorials filtered by difficulty level."""
        return [
            tutorial for tutorial in TUTORIALS_DB.values()
            if tutorial.difficulty.lower() == difficulty.lower()
        ]

    @staticmethod
    def get_tutorials_by_category(category: str) -> List[Tutorial]:
        """Get tutorials filtered by category."""
        return [
            tutorial for tutorial in TUTORIALS_DB.values()
            if tutorial.category.lower() == category.lower()
        ]
