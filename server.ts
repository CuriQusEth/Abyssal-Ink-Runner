import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // CORS Middleware for API routes
  app.use("/api", (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
      res.sendStatus(204);
      return;
    }
    next();
  });

  // API - Network (Base Mainnet Denim)
  app.get("/api/network", (req, res) => {
    res.json({
      network: "Base Mainnet",
      chainId: 8453,
      upgrade: "Denim",
      activationDate: "2026-11-05T18:00:00Z",
      blockTimeMs: 200,
      canonicalBlocks: true,
      flashblocksRetired: true,
      rpcUrl: "https://mainnet.base.org",
      builderCode: "bc_w5vtza16",
      status: "active"
    });
  });

  // API - Agent
  app.get("/api/agent", (req, res) => {
    res.json({
      name: "Abyssal Ink Runner Orchestrator",
      status: "active",
      network: "Base Mainnet (Denim 200ms Blocks)",
      chainId: 8453,
      builderCode: "bc_w5vtza16",
      wallet: "0x29536D0bc1004ab274c4F0F59734Ad74D4559b7B",
      platform: "Abyssal Ink Runner",
      version: "1.0.0"
    });
  });

  app.post("/api/agent", (req, res) => {
    res.json({
      status: "success",
      message: "Agent command received",
      network: "Base Mainnet (Denim)",
      receivedAt: new Date().toISOString(),
      payload: req.body
    });
  });

  const mcpTools = [
    {
      name: 'get_network_status',
      description: 'Get Base Mainnet Denim network specifications (200ms canonical blocks, Flashblocks retired)',
      inputSchema: { type: 'object', properties: {} }
    },
    {
      name: 'get_race_status',
      description: 'Get the current running status of the race / runner in the abyss',
      inputSchema: { type: 'object', properties: {} }
    },
    {
      name: 'start_race',
      description: 'Start a new descent / race',
      inputSchema: { type: 'object', properties: {} }
    },
    {
      name: 'get_leaderboard',
      description: 'Fetch the top depths reached by runners',
      inputSchema: { type: 'object', properties: {} }
    },
    {
      name: 'optimize_speed',
      description: 'Optimize the speed or ink mass consumption',
      inputSchema: { type: 'object', properties: {} }
    },
    {
      name: 'get_track_info',
      description: 'Get procedural generation details about abyss depth biomes',
      inputSchema: { type: 'object', properties: {} }
    }
  ];

  // API - MCP (Model Context Protocol)
  app.get("/api/mcp", (req, res) => {
    res.json({
      protocol: "MCP",
      version: "1.0.0",
      name: "Abyssal Ink Runner MCP Endpoint",
      status: "active",
      description: "Active MCP server for Abyssal Ink Runner Orchestrator Agent",
      capabilities: ["abyssal-exploration", "ink-running-mechanics", "narrative-navigation"],
      timestamp: new Date().toISOString()
    });
  });

  app.post("/api/mcp", (req, res) => {
    try {
      const body = req.body || {};
      const { method, params, id, jsonrpc } = body;

      if (jsonrpc && jsonrpc !== '2.0') {
        return res.status(400).json({ jsonrpc: "2.0", id: id || null, error: { code: -32600, message: "Invalid Request" } });
      }

      if (method === 'initialize') {
        res.json({
          jsonrpc: "2.0",
          id,
          result: {
            protocolVersion: '1.0.0',
            capabilities: { tools: {}, prompts: {}, resources: {} },
            serverInfo: { name: 'Abyssal Ink Runner MCP Endpoint', version: '1.0.0' }
          }
        });
        return;
      }

      if (method === 'tools/list') {
        res.json({
          jsonrpc: "2.0",
          id,
          result: { tools: mcpTools }
        });
        return;
      }

      if (method === 'tools/call') {
        const { name } = params || {};
        if (name === 'get_network_status') {
          res.json({
            jsonrpc: "2.0",
            id,
            result: {
              content: [{
                type: 'text',
                text: JSON.stringify({
                  network: "Base Mainnet",
                  chainId: 8453,
                  upgrade: "Denim",
                  status: "Active (Migrated from Flashblocks)",
                  blockTime: "200ms canonical blocks",
                  canonicalBlocksOnly: true,
                  flashblocksRetired: true,
                  rpc: "https://mainnet.base.org",
                  builderCode: "bc_w5vtza16"
                }, null, 2)
              }],
              isError: false
            }
          });
          return;
        }

        res.json({
          jsonrpc: "2.0",
          id,
          result: {
            content: [{ type: 'text', text: `Tool ${name} executed successfully in Abyssal Ink Runner context.` }],
            isError: false
          }
        });
        return;
      }

      if (method === 'prompts/list') {
        res.json({ jsonrpc: "2.0", id, result: { prompts: [] } });
        return;
      }

      if (method === 'resources/list') {
        res.json({ jsonrpc: "2.0", id, result: { resources: [] } });
        return;
      }

      res.status(404).json({ jsonrpc: "2.0", id, error: { code: -32601, message: "Method not found" } });
    } catch (error) {
      res.status(400).json({ jsonrpc: "2.0", id: null, error: { code: -32700, message: "Parse error" } });
    }
  });

  // Vite middleware for development or Static Serving for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files from the build directory (e.g. dist/client)
    // Vite build outputs index.html in the dist directory
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Abyssal Ink Runner Express server running on port ${PORT}`);
  });
}

startServer();
