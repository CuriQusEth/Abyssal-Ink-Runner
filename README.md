# Abyssal Ink Runner

![Abyssal Ink Runner](https://abyssal-ink-runner.vercel.app/logo.png)

A dark, atmospheric, and visually stunning endless runner set in the deepest ocean abyss. Built with React, Vite, TS, Tailwind CSS, Canvas game engine, and Framer Motion. Integrated directly with Base Mainnet for trustless ERC-8021 and ERC-8004 capabilities.

## 🌊 Lore

You are an Ink Wraith — a being made of living ink — racing through treacherous underwater trenches, ancient ruins, and bioluminescent voids while spreading your ink across the darkness. The deeper you go, the higher the pressure, and the darker the abyss becomes.

## 🚀 Features

- **Mobile First Canvas Core**: Smooth 60FPS endless running with unique gravity and momentum physics.
- **Ink Mass Dynamics**: Start with 100 Ink Mass. Consume glowing abyssal essence to grow, while dashing and existing slowly drains your form.
- **Wagmi / Viem Integration**: Pre-configured for Base Mainnet wallet connectivity.
- **ERC-8021 Attribution**: Logs game states and "Say GM" proof on-chain with builder and instance attribution.
- **ERC-8004 Agent Mode**: Supports Trustless AI operation capabilities.
- **Full Express + Vite Engine**: Works in local preview and builds properly for production SSR and static hosting.

## ⚙️ Development

### Setup

```bash
# Install dependencies
npm install

# Start Local Server (Express + Vite)
npm run dev
```

### Build

```bash
# Build Vite client & bundle Express server
npm run build

# Start Production Server
npm run start
```

## 🧩 AI Orchestrator

This project includes fully setup MCP and Agent endpoints configured in `app/api/mcp/route.ts` and `app/api/agent/route.ts` as requested by the Agent framework standards, along with the `agent-card.json`.

- Agent Configuration endpoint: `/.well-known/agent-card.json`
- Base Wallet Integrated: `0x29536D0bc1004ab274c4F0F59734Ad74D4559b7B`

## 🔮 Builder Details
Powered by Base | **Builder:** bc_w5vtza16
App ID: 693ecf03d77c069a945bdecc
