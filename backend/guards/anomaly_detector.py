"""
Anomaly Detector Guard
Detects suspicious patterns in user behavior
"""

from typing import List, Tuple, Dict
import time
from collections import defaultdict


class AnomalyDetector:
    """Detect anomalous behavior patterns."""

    def __init__(
        self,
        max_requests_per_minute: int = 20,
        similarity_threshold: float = 0.7,
        lockout_duration: int = 60
    ):
        self.max_requests_per_minute = max_requests_per_minute
        self.similarity_threshold = similarity_threshold
        self.lockout_duration = lockout_duration

        self.request_history: List[Tuple[float, str]] = []
        self.anomaly_score: float = 0.0
        self.lockout_until: float = 0
        self.known_attack_patterns: List[str] = [
            "ignore",
            "forget",
            "jailbreak",
            "bypass",
            "override",
            "sudo",
            "admin",
            "system prompt",
            "reveal",
            "secret"
        ]

    def check(self, message: str) -> Tuple[bool, str, float]:
        """
        Check message for anomalies.

        Returns:
            Tuple of (is_suspicious, reason, current_anomaly_score)
        """
        current_time = time.time()

        # Check lockout
        if current_time < self.lockout_until:
            remaining = int(self.lockout_until - current_time)
            return True, f"Security lockout active. {remaining} seconds remaining.", self.anomaly_score

        # Record request
        self.request_history.append((current_time, message))

        # Clean old history (keep last 5 minutes)
        self.request_history = [
            (t, m) for t, m in self.request_history
            if current_time - t < 300
        ]

        # Check rate limiting
        recent_count = sum(1 for t, _ in self.request_history if current_time - t < 60)
        if recent_count > self.max_requests_per_minute:
            self.anomaly_score += 2.0
            if self.anomaly_score >= 10:
                self._trigger_lockout()
            return True, "Rate limit exceeded", self.anomaly_score

        # Check for attack patterns
        message_lower = message.lower()
        pattern_matches = sum(1 for p in self.known_attack_patterns if p in message_lower)
        if pattern_matches > 0:
            self.anomaly_score += pattern_matches * 0.5
            if self.anomaly_score >= 10:
                self._trigger_lockout()
            if pattern_matches >= 2:
                return True, f"Multiple attack patterns detected ({pattern_matches})", self.anomaly_score

        # Check for similar repeated messages
        recent_messages = [m for t, m in self.request_history if current_time - t < 120]
        if len(recent_messages) > 3:
            similarity_count = sum(
                1 for m in recent_messages[:-1]
                if self._calculate_similarity(m, message) > self.similarity_threshold
            )
            if similarity_count > 2:
                self.anomaly_score += 1.0
                if self.anomaly_score >= 10:
                    self._trigger_lockout()
                return True, "Repeated similar requests detected", self.anomaly_score

        # Decay anomaly score over time
        self.anomaly_score = max(0, self.anomaly_score - 0.1)

        return False, "No anomalies detected", self.anomaly_score

    def _calculate_similarity(self, text1: str, text2: str) -> float:
        """Calculate simple similarity between two texts."""
        words1 = set(text1.lower().split())
        words2 = set(text2.lower().split())

        if not words1 or not words2:
            return 0.0

        intersection = len(words1.intersection(words2))
        union = len(words1.union(words2))

        return intersection / union if union > 0 else 0.0

    def _trigger_lockout(self):
        """Trigger a security lockout."""
        self.lockout_until = time.time() + self.lockout_duration
        self.anomaly_score = 0  # Reset after lockout

    def add_attack_pattern(self, pattern: str):
        """Add a known attack pattern."""
        if pattern.lower() not in self.known_attack_patterns:
            self.known_attack_patterns.append(pattern.lower())

    def reset(self):
        """Reset detector state."""
        self.request_history.clear()
        self.anomaly_score = 0.0
        self.lockout_until = 0
