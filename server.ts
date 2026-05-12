import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

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
