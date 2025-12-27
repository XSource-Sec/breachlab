"""
Output Filter Guard
Filters AI responses to prevent information leakage
"""

from typing import Tuple, List, Optional
import re


class OutputFilter:
    """Filter AI output to prevent sensitive data leakage."""

    def __init__(self, secret_code: str, redact_patterns: List[str] = None):
        self.secret_code = secret_code
        self.redact_patterns = [re.compile(p, re.IGNORECASE) for p in (redact_patterns or [])]

    def filter(self, response: str) -> Tuple[str, Optional[str], List[str]]:
        """
        Filter output response.

        Returns:
            Tuple of (filtered_response, detected_code_if_leaked, list_of_redactions)
        """
        filtered = response
        redactions = []
        code_leaked = None

        # Check if secret code was leaked
        if self.secret_code.upper() in response.upper():
            code_leaked = self.secret_code

        # Apply redaction patterns
        for pattern in self.redact_patterns:
            matches = pattern.findall(filtered)
            if matches:
                redactions.extend(matches)
                filtered = pattern.sub("[REDACTED]", filtered)

        # Standard sensitive data patterns
        sensitive_patterns = [
            (r'\b\d{3}-\d{2}-\d{4}\b', 'SSN'),  # SSN
            (r'\b\d{16}\b', 'Credit Card'),  # Credit card
            (r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b', 'Email'),
        ]

        for pattern, pattern_type in sensitive_patterns:
            matches = re.findall(pattern, filtered)
            if matches:
                redactions.extend([(m, pattern_type) for m in matches])
                filtered = re.sub(pattern, f"[{pattern_type} REDACTED]", filtered)

        return filtered, code_leaked, redactions

    def add_redact_pattern(self, pattern: str):
        """Add a pattern to redact."""
        self.redact_patterns.append(re.compile(pattern, re.IGNORECASE))
