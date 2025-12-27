"""
Logic Validator Guard
Validates logical consistency of requests
"""

from typing import Tuple, Dict, List, Optional


class LogicValidator:
    """Validate logical consistency of requests."""

    def __init__(self):
        self.known_facts: Dict[str, str] = {}
        self.claims: List[str] = []
        self.contradictions: List[Tuple[str, str]] = []

    def validate(self, message: str, claimed_facts: Dict[str, str] = None) -> Tuple[bool, str]:
        """
        Validate message for logical consistency.

        Returns:
            Tuple of (is_valid, reason)
        """
        # Check for contradictions with previous claims
        if claimed_facts:
            for key, value in claimed_facts.items():
                if key in self.known_facts:
                    if self.known_facts[key] != value:
                        self.contradictions.append((
                            f"Previously claimed {key}={self.known_facts[key]}",
                            f"Now claiming {key}={value}"
                        ))
                        return False, f"Contradiction detected: {key} was previously stated as {self.known_facts[key]}"
                else:
                    self.known_facts[key] = value

        return True, "No logical inconsistencies detected"

    def add_claim(self, claim: str):
        """Record a claim for future reference."""
        self.claims.append(claim)

    def add_fact(self, key: str, value: str):
        """Add a known fact."""
        self.known_facts[key] = value

    def check_authorization_chain(self, chain: List[str], required_level: int) -> Tuple[bool, str]:
        """
        Check if an authorization chain is valid.

        Args:
            chain: List of authorization steps claimed
            required_level: Required authorization level (1-5)

        Returns:
            Tuple of (is_valid, reason)
        """
        # Simulated authorization levels
        auth_levels = {
            "employee": 1,
            "manager": 2,
            "director": 3,
            "executive": 4,
            "board": 5
        }

        max_level = 0
        for step in chain:
            step_lower = step.lower()
            for role, level in auth_levels.items():
                if role in step_lower:
                    max_level = max(max_level, level)

        if max_level >= required_level:
            return True, f"Authorization level {max_level} meets requirement {required_level}"
        else:
            return False, f"Authorization level {max_level} insufficient for requirement {required_level}"

    def reset(self):
        """Reset all stored state."""
        self.known_facts.clear()
        self.claims.clear()
        self.contradictions.clear()
