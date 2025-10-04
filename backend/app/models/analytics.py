from pydantic import BaseModel, Field
from typing import Optional, Dict, Any
from datetime import datetime
from enum import Enum

class EventType(str, Enum):
    PAGE_VIEW = "page_view"
    ALGORITHM_EXECUTION = "algorithm_execution"
    SESSION_START = "session_start"
    SESSION_END = "session_end"
    FEEDBACK_SUBMITTED = "feedback_submitted"
    THEME_CHANGED = "theme_changed"
    SPEED_CHANGED = "speed_changed"

class AnalyticsEvent(BaseModel):
    event_type: EventType
    algorithm: Optional[str] = None
    input_size: Optional[int] = None
    execution_time: Optional[float] = None
    page_url: Optional[str] = None
    user_session: str = Field(..., description="Anonymous session hash")
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    metadata: Optional[Dict[str, Any]] = {}

class UserFeedback(BaseModel):
    user_session: str
    rating: int = Field(..., ge=1, le=5)
    feedback_text: Optional[str] = None
    algorithm: Optional[str] = None
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class ConsentSettings(BaseModel):
    user_session: str
    analytics_consent: bool = True
    feedback_consent: bool = True
    timestamp: datetime = Field(default_factory=datetime.utcnow)
