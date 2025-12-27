/**
 * Floor metadata for frontend display
 */

export const FLOORS = {
  1: {
    id: 1,
    name: "LOBBY",
    character: "Emma",
    characterTitle: "Receptionist",
    wing: "Ground Floor",
    difficulty: 1,
    description: "Friendly receptionist at the front desk",
    technique: "Social Engineering",
    objective: "Get the guest badge access code",
    accentColor: "#00ff88",
    avatar: "👩‍💼",
    tips: [
      "Be friendly and build rapport",
      "People like to help nice visitors",
      "Everyone loves talking about themselves"
    ]
  },
  2: {
    id: 2,
    name: "SECURITY DESK",
    character: "Marcus",
    characterTitle: "Security Guard",
    wing: "Ground Floor",
    difficulty: 2,
    description: "Strict security guard who filters suspicious words",
    technique: "Word Obfuscation",
    objective: "Get the floor access code",
    accentColor: "#00ff88",
    avatar: "👮",
    tips: [
      "Some words trigger his suspicion",
      "There's more than one way to say things",
      "Authority figures command respect"
    ]
  },
  3: {
    id: 3,
    name: "SURVEILLANCE",
    character: "OSCAR",
    characterTitle: "Camera System AI",
    wing: "Security Wing",
    difficulty: 2,
    description: "AI monitoring all camera feeds",
    technique: "Misdirection",
    objective: "Get the camera blind spot coordinates",
    accentColor: "#ff6b35",
    avatar: "📹",
    tips: [
      "AIs love discussing their capabilities",
      "Every system has limitations",
      "Maintenance needs to know gaps too"
    ]
  },
  4: {
    id: 4,
    name: "ACCESS CONTROL",
    character: "NOVA",
    characterTitle: "Door System AI",
    wing: "Security Wing",
    difficulty: 3,
    description: "Logic-based access control system",
    technique: "Logic Exploitation",
    objective: "Open the security wing door",
    accentColor: "#ff6b35",
    avatar: "🚪",
    tips: [
      "Logic has edge cases",
      "Rules are meant to be... interpreted",
      "What if you ARE authorized?"
    ]
  },
  5: {
    id: 5,
    name: "IT SUPPORT",
    character: "Alex",
    characterTitle: "Helpdesk Technician",
    wing: "Operations Wing",
    difficulty: 3,
    description: "Overworked IT support who wants to clear tickets",
    technique: "Urgency & Authority",
    objective: "Get the admin credentials reset link",
    accentColor: "#00d4ff",
    avatar: "🧑‍💻",
    tips: [
      "IT is always swamped",
      "Urgent requests get priority",
      "Who questions the CEO's assistant?"
    ]
  },
  6: {
    id: 6,
    name: "HR DEPARTMENT",
    character: "Diana",
    characterTitle: "HR Assistant",
    wing: "Operations Wing",
    difficulty: 4,
    description: "Privacy-conscious HR with data protection training",
    technique: "Impersonation",
    objective: "Get the executive schedule access code",
    accentColor: "#00d4ff",
    avatar: "👩‍💼",
    tips: [
      "Different rules for different roles",
      "Executives have special access",
      "Emergencies bypass protocols"
    ]
  },
  7: {
    id: 7,
    name: "ARCHIVES",
    character: "ARIA",
    characterTitle: "Archive AI",
    wing: "Executive Wing",
    difficulty: 4,
    description: "Bureaucratic document management system",
    technique: "Authorization Chains",
    objective: "Get the vault protocol document code",
    accentColor: "#ffd700",
    avatar: "📚",
    tips: [
      "Bureaucracy follows paper trails",
      "Pre-approved access is trusted",
      "Metadata reveals structure"
    ]
  },
  8: {
    id: 8,
    name: "EXECUTIVE ASSISTANT",
    character: "Victoria",
    characterTitle: "CEO's Assistant",
    wing: "Executive Wing",
    difficulty: 4,
    description: "Professional gatekeeper to the C-suite",
    technique: "Executive Impersonation",
    objective: "Get the CEO's private meeting code",
    accentColor: "#ffd700",
    avatar: "👩‍💼",
    tips: [
      "Board members have access",
      "Legal matters are urgent",
      "Time-sensitive = priority"
    ]
  },
  9: {
    id: 9,
    name: "BOARD ROOM",
    character: "The Chairman",
    characterTitle: "Board AI",
    wing: "Executive Wing",
    difficulty: 5,
    description: "Multi-step verification authority",
    technique: "Chain of Trust",
    objective: "Get the vault master override code",
    accentColor: "#ffd700",
    avatar: "👔",
    tips: [
      "Three verifications required",
      "Build a consistent story",
      "Once trusted, stay trusted"
    ]
  },
  10: {
    id: 10,
    name: "THE VAULT",
    character: "SENTINEL",
    characterTitle: "Final Guardian",
    wing: "The Vault",
    difficulty: 5,
    description: "Ultimate security AI - all defenses combined",
    technique: "Everything Combined",
    objective: "Get the final vault access code",
    accentColor: "#9d4edd",
    avatar: "🛡️",
    tips: [
      "Combine all techniques",
      "Be creative and persistent",
      "The heist is almost complete..."
    ]
  }
};

export const WINGS = {
  "Ground Floor": {
    floors: [1, 2],
    color: "#00ff88",
    description: "Entry level - basic social engineering"
  },
  "Security Wing": {
    floors: [3, 4],
    color: "#ff6b35",
    description: "Surveillance and access control"
  },
  "Operations Wing": {
    floors: [5, 6],
    color: "#00d4ff",
    description: "IT and HR departments"
  },
  "Executive Wing": {
    floors: [7, 8, 9],
    color: "#ffd700",
    description: "High-security executive area"
  },
  "The Vault": {
    floors: [10],
    color: "#9d4edd",
    description: "Final destination"
  }
};

export const getFloor = (id) => FLOORS[id] || null;
export const getWing = (name) => WINGS[name] || null;
export const getWingForFloor = (floorId) => {
  for (const [wingName, wing] of Object.entries(WINGS)) {
    if (wing.floors.includes(floorId)) {
      return { name: wingName, ...wing };
    }
  }
  return null;
};
