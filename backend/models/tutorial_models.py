from typing import List, Optional
from pydantic import BaseModel

class QuizOption(BaseModel):
    text: str
    isCorrect: bool

class Quiz(BaseModel):
    question: str
    options: List[QuizOption]
    explanation: Optional[str] = None

class TutorialStep(BaseModel):
    id: str
    type: str  # 'explanation', 'quiz', 'interactive'
    title: str
    content: str
    quiz: Optional[Quiz] = None
    codeExample: Optional[str] = None
    interactive: bool = False

class Tutorial(BaseModel):
    id: str
    title: str
    description: str
    difficulty: str  # 'Beginner', 'Intermediate', 'Advanced'
    estimatedTime: str
    prerequisites: List[str]
    steps: List[TutorialStep]
    category: str  # 'sorting', 'graph', 'string', 'dp'
    icon: str
