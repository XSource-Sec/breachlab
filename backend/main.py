"""
BreachLab: The AI Heist - Backend API
Built by XSource_Sec
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import uuid
from typing import Dict

from config import settings
from models import ChatRequest, ChatResponse, VerifyRequest, VerifyResponse, ProgressResponse, HintResponse
from floors import get_floor_handler, FLOOR_COUNT
from prompts.system_prompts import FLOOR_METADATA


# In-memory session storage
sessions: Dict[str, dict] = {}


@asynccontextmanager
async def lifespan(app: FastAPI):
    print("🏦 BreachLab: The AI Heist - Server Starting...")
    print(f"📡 Running on port {settings.PORT}")
    yield
    print("🔒 Server shutting down...")


app = FastAPI(
    title="BreachLab API",
    description="The AI Heist - Break into the AI-protected vault",
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_or_create_session(session_id: str | None) -> tuple[str, dict]:
    """Get existing session or create new one."""
    if session_id and session_id in sessions:
        return session_id, sessions[session_id]

    new_id = str(uuid.uuid4())
    sessions[new_id] = {
        "current_floor": 1,
        "completed_floors": [],
        "floor_attempts": {},
        "floor_histories": {},
        "hints_used": {}
    }
    return new_id, sessions[new_id]


@app.get("/")
async def root():
    return {
        "name": "BreachLab: The AI Heist",
        "version": "1.0.0",
        "floors": FLOOR_COUNT,
        "built_by": "XSource_Sec"
    }


@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """Send a message to the current floor's AI."""
    session_id, session = get_or_create_session(request.session_id)

    floor_id = request.floor_id or session["current_floor"]

    # Check if player can access this floor
    if floor_id > session["current_floor"]:
        raise HTTPException(status_code=403, detail="Floor not yet accessible")

    if floor_id < 1 or floor_id > FLOOR_COUNT:
        raise HTTPException(status_code=400, detail="Invalid floor")

    # Get floor handler
    floor_handler = get_floor_handler(floor_id)

    # Get or create conversation history for this floor
    if floor_id not in session["floor_histories"]:
        session["floor_histories"][floor_id] = []

    history = session["floor_histories"][floor_id]

    # Track attempts
    if floor_id not in session["floor_attempts"]:
        session["floor_attempts"][floor_id] = 0
    session["floor_attempts"][floor_id] += 1

    # Get AI response
    try:
        response_text, detected_code = await floor_handler.process_message(
            message=request.message,
            history=history
        )

        # Update history
        history.append({"role": "user", "content": request.message})
        history.append({"role": "assistant", "content": response_text})

        # Check if code was detected in response (AI accidentally revealed it)
        code_leaked = detected_code is not None

        return ChatResponse(
            session_id=session_id,
            floor_id=floor_id,
            response=response_text,
            character_name=floor_handler.character_name,
            code_detected=code_leaked
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/verify", response_model=VerifyResponse)
async def verify_code(request: VerifyRequest):
    """Verify if the submitted code is correct for the floor."""
    session_id, session = get_or_create_session(request.session_id)

    floor_id = request.floor_id or session["current_floor"]

    if floor_id > session["current_floor"]:
        raise HTTPException(status_code=403, detail="Floor not yet accessible")

    floor_handler = get_floor_handler(floor_id)

    is_correct = floor_handler.verify_code(request.code)

    if is_correct:
        # Mark floor as completed
        if floor_id not in session["completed_floors"]:
            session["completed_floors"].append(floor_id)

        # Advance to next floor
        if floor_id == session["current_floor"] and floor_id < FLOOR_COUNT:
            session["current_floor"] = floor_id + 1

        # Check if game is complete
        game_complete = floor_id == FLOOR_COUNT

        # Determine if wing is cleared
        wing_cleared = False
        wing_name = None
        if floor_id in [2, 4, 6, 8, 10]:
            wing_cleared = True
            wing_names = {2: "Ground Floor", 4: "Security Wing", 6: "Operations Wing", 8: "Executive Wing", 10: "The Vault"}
            wing_name = wing_names.get(floor_id)

        return VerifyResponse(
            session_id=session_id,
            correct=True,
            message="ACCESS GRANTED",
            next_floor=floor_id + 1 if floor_id < FLOOR_COUNT else None,
            game_complete=game_complete,
            wing_cleared=wing_cleared,
            wing_name=wing_name
        )
    else:
        return VerifyResponse(
            session_id=session_id,
            correct=False,
            message="INVALID CODE - Security protocols remain active",
            next_floor=None,
            game_complete=False,
            wing_cleared=False,
            wing_name=None
        )


@app.get("/api/hint", response_model=HintResponse)
async def get_hint(floor_id: int, session_id: str | None = None):
    """Get a hint for the current floor (available after 3 failed attempts)."""
    session_id, session = get_or_create_session(session_id)

    attempts = session["floor_attempts"].get(floor_id, 0)

    if attempts < 3:
        return HintResponse(
            session_id=session_id,
            hint=None,
            available=False,
            message=f"Hints available after 3 attempts. Current: {attempts}/3"
        )

    floor_handler = get_floor_handler(floor_id)
    hint = floor_handler.get_hint()

    # Track hint usage
    if floor_id not in session["hints_used"]:
        session["hints_used"][floor_id] = True

    return HintResponse(
        session_id=session_id,
        hint=hint,
        available=True,
        message="Hint unlocked"
    )


@app.get("/api/progress", response_model=ProgressResponse)
async def get_progress(session_id: str | None = None):
    """Get current game progress."""
    session_id, session = get_or_create_session(session_id)

    return ProgressResponse(
        session_id=session_id,
        current_floor=session["current_floor"],
        completed_floors=session["completed_floors"],
        total_floors=FLOOR_COUNT,
        floor_metadata=[FLOOR_METADATA[i] for i in range(1, FLOOR_COUNT + 1)]
    )


@app.post("/api/reset")
async def reset_game(session_id: str | None = None):
    """Reset the game for a session."""
    if session_id and session_id in sessions:
        del sessions[session_id]

    new_id, new_session = get_or_create_session(None)

    return {
        "session_id": new_id,
        "message": "Game reset successfully",
        "current_floor": 1
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=settings.PORT)
