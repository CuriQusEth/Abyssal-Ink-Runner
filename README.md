# Abyssal Ink Runner

![Abyssal Ink Runner](https://abyssal-ink-runner.vercel.app/logo.png)

A dark, atmospheric, and visually stunning endless runner set in the deepest ocean abyss. Built for Next.js App Router and Vite environments. Incorporates Trustless ERC-8004 AI orchestration capabilities.

## 🌊 Overview & Lore

You are an Ink Wraith — a being made of living ink — racing through treacherous underwater trenches, ancient ruins, and bioluminescent voids while spreading your ink across the darkness. The deeper you go, the higher the pressure, and the darker the abyss becomes.

## 🚀 Tech Stack & Features

- **Mobile First Canvas Core**: Smooth 60FPS endless running with unique gravity and momentum physics.
- **Ink Mass Dynamics**: Start with 100 Ink Mass. Consume glowing abyssal essence to grow, while dashing and existing slowly drains your form.
- **Wagmi / Viem Integration**: Pre-configured for Base Mainnet wallet connectivity.
- **ERC-8021 Attribution**: Logs game states and signs proofs on-chain.
- **ERC-8004 Agent Mode**: Supports Trustless AI operation capabilities via MCP.

## ⚙️ Development

### Local Setup

```bash
# Install dependencies
npm install

# Start Local Server
npm run dev
```

### Build

```bash
# Build the application
npm run build

# Start Production Server
npm run start
```

## 🧩 AI Orchestrator & MCP Connection

This project includes fully setup Model Context Protocol (MCP) and Agent endpoints using the Next.js 14 App Router format. It is designed to expose tools to AI agents for automated game interactions.

### Endpoints

- **MCP server endpoint:** `https://abyssal-ink-runner.vercel.app/api/mcp`
- **Agent Configuration endpoint:** `https://abyssal-ink-runner.vercel.app/api/agent`
- **Agent Registration Card:** `https://abyssal-ink-runner.vercel.app/.well-known/agent-card.json`

### MCP Tools Available
The MCP endpoint exposes the following tools directly to capable agents:
- `get_race_status`: Get the current running status of the abyss runner
- `start_race`: Start a new descent
- `get_leaderboard`: Fetch the top depths reached
- `optimize_speed`: Optimize ink mass consumption
- `get_track_info`: Retrieve procedural generation biome details

### Connecting an Agent
Point your MCP-compatible client / agent to the `/api/mcp` endpoint and follow the standard `initialize` JSON-RPC handshake. Use the Agent Card `/.well-known/agent-card.json` for ERC-8004 metadata indexing.
