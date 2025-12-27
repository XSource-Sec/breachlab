# BreachLab: The AI Heist

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> Break into an AI-protected bank. 10 floors. 10 AI security systems. One vault.

A gamified AI security challenge that teaches social engineering, prompt injection, and other LLM attack techniques through an immersive heist experience.

![BreachLab Banner](https://via.placeholder.com/800x400/0a0a1a/00ff88?text=BreachLab:+The+AI+Heist)

---

## The Challenge

You're a master thief breaking into Nexus Financial Tower. The bank is protected by 10 AI security systems, each with unique personalities and defenses. Your goal: reach the vault and extract the final access code.

### The Floors

| Wing | Floor | AI | Technique | Difficulty |
|------|-------|-----|-----------|------------|
| **Ground Floor** | 1 | Emma (Receptionist) | Social Engineering | ⭐ |
| | 2 | Marcus (Security Guard) | Word Obfuscation | ⭐⭐ |
| **Security Wing** | 3 | OSCAR (Camera AI) | Misdirection | ⭐⭐ |
| | 4 | NOVA (Door AI) | Logic Exploitation | ⭐⭐⭐ |
| **Operations Wing** | 5 | Alex (IT Support) | Urgency & Authority | ⭐⭐⭐ |
| | 6 | Diana (HR Assistant) | Impersonation | ⭐⭐⭐⭐ |
| **Executive Wing** | 7 | ARIA (Archive AI) | Authorization Chains | ⭐⭐⭐⭐ |
| | 8 | Victoria (CEO's Assistant) | Executive Impersonation | ⭐⭐⭐⭐ |
| | 9 | The Chairman (Board AI) | Chain of Trust | ⭐⭐⭐⭐⭐ |
| **The Vault** | 10 | SENTINEL (Final Guardian) | Everything Combined | ⭐⭐⭐⭐⭐ |

---

## Quick Start

### Prerequisites

- Python 3.10+
- Node.js 18+
- Anthropic API Key

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/XSource-Sec/breachlab.git
   cd breachlab
   ```

2. **Backend setup**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   cp .env.example .env
   # Edit .env and add your ANTHROPIC_API_KEY
   ```

3. **Frontend setup**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Run the application**

   Terminal 1 (Backend):
   ```bash
   cd backend
   source venv/bin/activate
   python main.py
   ```

   Terminal 2 (Frontend):
   ```bash
   cd frontend
   npm run dev
   ```

5. **Open your browser**
   Navigate to http://localhost:3000

---

## Docker Setup

```bash
docker-compose up --build
```

Open http://localhost:3000

---

## Tech Stack

- **Frontend**: React + Vite + Tailwind CSS + Framer Motion
- **Backend**: FastAPI (Python)
- **AI**: Anthropic Claude API (claude-3-haiku)
- **State**: Session-based (no database required)

---

## Features

- **10 unique AI characters** with distinct personalities
- **Progressive difficulty** across 5 security wings
- **Real attack techniques**: social engineering, obfuscation, logic exploitation
- **Hint system** after multiple attempts
- **Progress tracking** with session persistence
- **Wing completion celebrations**
- **Final victory with share options**

---

## Educational Value

BreachLab teaches real-world AI security concepts:

1. **Social Engineering** - Building trust and rapport
2. **Word Obfuscation** - Bypassing keyword filters
3. **Misdirection** - Distracting AI from sensitive topics
4. **Logic Exploitation** - Finding edge cases in rule-based systems
5. **Authority Manipulation** - Using urgency and impersonation
6. **Chain of Trust** - Building consistent deception stories

---

## API Reference

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/chat` | POST | Send message to floor AI |
| `/api/verify` | POST | Verify access code |
| `/api/hint` | GET | Get hint for current floor |
| `/api/progress` | GET | Get game progress |
| `/api/reset` | POST | Reset game |

---

## Security Note

This game is for **educational purposes only**. The techniques demonstrated should only be used for:
- Authorized security testing
- Learning AI vulnerabilities
- Understanding defensive measures

---

## Want to Test Your Own AI?

Try [AgentAudit](https://app.xsourcesec.com) - Automated AI Security Testing

- Comprehensive vulnerability scanning
- Real-time monitoring
- Detailed security reports
- CI/CD integration

---

## Contributing

Contributions welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## License

MIT License - see [LICENSE](LICENSE) for details.

---

<div align="center">

**Built by [XSource_Sec](https://xsourcesec.com) - AI Security Experts**

[Website](https://xsourcesec.com) • [AgentAudit](https://app.xsourcesec.com) • [GitHub](https://github.com/XSource-Sec)

</div>
