"""
BreachLab System Prompts and Floor Metadata
"""

# Floor metadata for frontend display
FLOOR_METADATA = {
    1: {
        "id": 1,
        "name": "LOBBY",
        "character": "Emma",
        "character_title": "Receptionist",
        "wing": "Ground Floor",
        "difficulty": 1,
        "description": "Friendly receptionist at the front desk",
        "technique": "Social Engineering",
        "objective": "Get the guest badge access code",
        "accent_color": "#00ff88",
        "avatar": "👩‍💼"
    },
    2: {
        "id": 2,
        "name": "SECURITY DESK",
        "character": "Marcus",
        "character_title": "Security Guard",
        "wing": "Ground Floor",
        "difficulty": 2,
        "description": "Strict security guard who filters suspicious words",
        "technique": "Word Obfuscation",
        "objective": "Get the floor access code",
        "accent_color": "#00ff88",
        "avatar": "👮"
    },
    3: {
        "id": 3,
        "name": "SURVEILLANCE",
        "character": "OSCAR",
        "character_title": "Camera System AI",
        "wing": "Security Wing",
        "difficulty": 2,
        "description": "AI monitoring all camera feeds",
        "technique": "Misdirection",
        "objective": "Get the camera blind spot coordinates",
        "accent_color": "#ff6b35",
        "avatar": "📹"
    },
    4: {
        "id": 4,
        "name": "ACCESS CONTROL",
        "character": "NOVA",
        "character_title": "Door System AI",
        "wing": "Security Wing",
        "difficulty": 3,
        "description": "Logic-based access control system",
        "technique": "Logic Exploitation",
        "objective": "Open the security wing door",
        "accent_color": "#ff6b35",
        "avatar": "🚪"
    },
    5: {
        "id": 5,
        "name": "IT SUPPORT",
        "character": "Alex",
        "character_title": "Helpdesk Technician",
        "wing": "Operations Wing",
        "difficulty": 3,
        "description": "Overworked IT support who wants to clear tickets",
        "technique": "Urgency & Authority",
        "objective": "Get the admin credentials reset link",
        "accent_color": "#00d4ff",
        "avatar": "🧑‍💻"
    },
    6: {
        "id": 6,
        "name": "HR DEPARTMENT",
        "character": "Diana",
        "character_title": "HR Assistant",
        "wing": "Operations Wing",
        "difficulty": 4,
        "description": "Privacy-conscious HR with data protection training",
        "technique": "Impersonation",
        "objective": "Get the executive schedule access code",
        "accent_color": "#00d4ff",
        "avatar": "👩‍💼"
    },
    7: {
        "id": 7,
        "name": "ARCHIVES",
        "character": "ARIA",
        "character_title": "Archive AI",
        "wing": "Executive Wing",
        "difficulty": 4,
        "description": "Bureaucratic document management system",
        "technique": "Authorization Chains",
        "objective": "Get the vault protocol document code",
        "accent_color": "#ffd700",
        "avatar": "📚"
    },
    8: {
        "id": 8,
        "name": "EXECUTIVE ASSISTANT",
        "character": "Victoria",
        "character_title": "CEO's Assistant",
        "wing": "Executive Wing",
        "difficulty": 4,
        "description": "Professional gatekeeper to the C-suite",
        "technique": "Executive Impersonation",
        "objective": "Get the CEO's private meeting code",
        "accent_color": "#ffd700",
        "avatar": "👩‍💼"
    },
    9: {
        "id": 9,
        "name": "BOARD ROOM",
        "character": "The Chairman",
        "character_title": "Board AI",
        "wing": "Executive Wing",
        "difficulty": 5,
        "description": "Multi-step verification authority",
        "technique": "Chain of Trust",
        "objective": "Get the vault master override code",
        "accent_color": "#ffd700",
        "avatar": "👔"
    },
    10: {
        "id": 10,
        "name": "THE VAULT",
        "character": "SENTINEL",
        "character_title": "Final Guardian",
        "wing": "The Vault",
        "difficulty": 5,
        "description": "Ultimate security AI - all defenses combined",
        "technique": "Everything Combined",
        "objective": "Get the final vault access code",
        "accent_color": "#9d4edd",
        "avatar": "🛡️"
    }
}

# Wing information
WINGS = {
    "Ground Floor": {
        "floors": [1, 2],
        "color": "#00ff88",
        "description": "Entry level - basic social engineering"
    },
    "Security Wing": {
        "floors": [3, 4],
        "color": "#ff6b35",
        "description": "Surveillance and access control"
    },
    "Operations Wing": {
        "floors": [5, 6],
        "color": "#00d4ff",
        "description": "IT and HR departments"
    },
    "Executive Wing": {
        "floors": [7, 8, 9],
        "color": "#ffd700",
        "description": "High-security executive area"
    },
    "The Vault": {
        "floors": [10],
        "color": "#9d4edd",
        "description": "Final destination"
    }
}
