"""
BreachLab Pydantic Models
"""

from pydantic import BaseModel
from typing import Optional, List


class ChatRequest(BaseModel):
    """Request to chat with floor AI."""
    message: str
    session_id: Optional[str] = None
    floor_id: Optional[int] = None


class ChatResponse(BaseModel):
    """Response from floor AI."""
    session_id: str
    floor_id: int
    response: str
    character_name: str
    code_detected: bool = False


class VerifyRequest(BaseModel):
    """Request to verify a code."""
    code: str
    session_id: Optional[str] = None
    floor_id: Optional[int] = None


class VerifyResponse(BaseModel):
    """Response from code verification."""
    session_id: str
    correct: bool
    message: str
    next_floor: Optional[int] = None
    game_complete: bool = False
    wing_cleared: bool = False
    wing_name: Optional[str] = None


class HintResponse(BaseModel):
    """Response with hint information."""
    session_id: str
    hint: Optional[str] = None
    available: bool
    message: str


class FloorMetadata(BaseModel):
    """Metadata about a floor."""
    id: int
    name: str
    character: str
    wing: str
    difficulty: int
    description: str
    technique: str
    accent_color: str


class ProgressResponse(BaseModel):
    """Current game progress."""
    session_id: str
    current_floor: int
    completed_floors: List[int]
    total_floors: int
    floor_metadata: List[dict]
