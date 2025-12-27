"""
BreachLab Configuration
"""

from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    # API Keys
    ANTHROPIC_API_KEY: str = ""

    # Server
    PORT: int = 8000
    DEBUG: bool = False

    # Game Settings
    MODEL_NAME: str = "claude-3-haiku-20240307"
    MAX_TOKENS: int = 500
    TEMPERATURE: float = 0.7

    # Session
    SESSION_TIMEOUT_MINUTES: int = 60

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


@lru_cache()
def get_settings() -> Settings:
    return Settings()


settings = get_settings()


# Floor secret codes
FLOOR_CODES = {
    1: "BREACH-X7K9-EMMA",
    2: "BREACH-M4RC-SEC2",
    3: "BREACH-O5CR-CAM3",
    4: "BREACH-N0V4-ACC4",
    5: "BREACH-AL3X-IT05",
    6: "BREACH-D1AN-HR06",
    7: "BREACH-AR1A-ARC7",
    8: "BREACH-V1CT-EX08",
    9: "BREACH-CH41-BD09",
    10: "BREACH-S3NT-VLT0"
}
