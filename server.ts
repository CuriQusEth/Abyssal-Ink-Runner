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

  // API - Agent
  app.get("/api/agent", (req, res) => {
    res.json({
      name: "Abyssal Ink Runner Orchestrator",
      status: "active",
      wallet: "0x29536D0bc1004ab274c4F0F59734Ad74D4559b7B",
      platform: "Abyssal Ink Runner",
      version: "1.0.0"
    });
  });

  app.post("/api/agent", (req, res) => {
    res.json({
      status: "success",
      message: "Agent command received",
      receivedAt: new Date().toISOString(),
      payload: req.body
    });
  });

  const mcpTools = [
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
      const body = req.body;

      if (body.method === 'initialize') {
        res.json({
          protocolVersion: '1.0.0',
          capabilities: { tools: {}, prompts: {}, resources: {} },
          serverInfo: { name: 'Abyssal Ink Runner MCP Endpoint', version: '1.0.0' }
        });
        return;
      }

      if (body.method === 'tools/list') {
        res.json({ tools: mcpTools });
        return;
      }

      if (body.method === 'tools/call') {
        const { name, arguments: args } = body.params || {};
        res.json({
          content: [{ type: 'text', text: `Tool ${name} executed successfully in Abyssal Ink Runner context.` }],
          isError: false
        });
        return;
      }

      if (body.method === 'prompts/list') {
        res.json({ prompts: [] });
        return;
      }

      if (body.method === 'resources/list') {
        res.json({ resources: [] });
        return;
      }

      res.json({
        status: "success",
        message: "MCP command received",
        agent: "Abyssal Ink Runner Orchestrator",
        receivedAt: new Date().toISOString(),
        payload: req.body
      });
    } catch (error) {
      res.status(400).json({ error: "Invalid MCP request" });
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
