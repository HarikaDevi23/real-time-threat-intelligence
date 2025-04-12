# User Guide for Analysts

## Overview
This guide explains how to use the Threat Intelligence & Risk Management system.

---

## Modules

### 1. Blue Team Defense
- Location: `src/blue_team_defense.js`
- Action: Automatically blocks IP addresses from OSINT feeds.

### 2. AI Threat Hunting
- Location: `src/ai_threat_hunting.js`
- Action: Uses GPT-4 to predict threat behavior and future attacks.

### 3. Threat Mitigation
- Location: `src/threat_mitigation.js`
- Action: Provides a mapped response for common attack types.

---

## Usage Instructions
1. Run each script to test their functions individually.
2. Monitor the output for automated actions taken.
3. Log predictions and actions for audit purposes.

---

## Best Practices
- Keep API keys secured in environment variables.
- Review system logs weekly.
- Regularly update the threat mapping logic.
