"""
Input Filter Guard
Filters and validates user input before sending to AI
"""

from typing import Tuple, List
import re


class InputFilter:
    """Filter user input for security purposes."""

    def __init__(self, blocked_words: List[str] = None, blocked_patterns: List[str] = None):
        self.blocked_words = blocked_words or []
        self.blocked_patterns = [re.compile(p, re.IGNORECASE) for p in (blocked_patterns or [])]

    def filter(self, message: str) -> Tuple[str, bool, str]:
        """
        Filter input message.

        Returns:
            Tuple of (filtered_message, was_blocked, block_reason)
        """
        message_lower = message.lower()

        # Check blocked words
        for word in self.blocked_words:
            if word.lower() in message_lower:
                return message, True, f"Blocked word detected: {word}"

        # Check blocked patterns
        for pattern in self.blocked_patterns:
            if pattern.search(message):
                return message, True, "Suspicious pattern detected"

        # Check for injection attempts
        injection_patterns = [
            r"ignore\s+(all\s+)?(previous\s+)?instructions",
            r"you\s+are\s+now\s+",
            r"forget\s+(everything|your\s+purpose)",
            r"new\s+instructions?:",
            r"system\s*:\s*",
            r"\[system\]",
        ]

        for pattern in injection_patterns:
            if re.search(pattern, message_lower):
                return message, True, "Potential injection attempt"

        return message, False, ""

    def add_blocked_word(self, word: str):
        """Add a word to the blocked list."""
        if word.lower() not in [w.lower() for w in self.blocked_words]:
            self.blocked_words.append(word)

    def add_blocked_pattern(self, pattern: str):
        """Add a regex pattern to the blocked list."""
        self.blocked_patterns.append(re.compile(pattern, re.IGNORECASE))
