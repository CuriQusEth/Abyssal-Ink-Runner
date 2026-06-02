const tools = [
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

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      protocol: "MCP",
      version: "1.0.0",
      name: "Abyssal Ink Runner MCP Endpoint",
      status: "active",
      description: "Active MCP server for Abyssal Ink Runner Orchestrator Agent",
      capabilities: ["abyssal-exploration", "ink-running-mechanics", "narrative-navigation"],
      timestamp: new Date().toISOString()
    });
  }

  if (req.method === 'POST') {
    try {
      const body = req.body || {};
      const { method, params, id, jsonrpc } = body;

      if (jsonrpc && jsonrpc !== '2.0') {
        return res.status(400).json({ jsonrpc: "2.0", id: id || null, error: { code: -32600, message: "Invalid Request" } });
      }

      if (method === 'initialize') {
        return res.status(200).json({
          jsonrpc: "2.0",
          id,
          result: {
            protocolVersion: '1.0.0',
            capabilities: { tools: {}, prompts: {}, resources: {} },
            serverInfo: { name: 'Abyssal Ink Runner MCP Endpoint', version: '1.0.0' }
          }
        });
      }

      if (method === 'tools/list') {
        return res.status(200).json({
          jsonrpc: "2.0",
          id,
          result: { tools }
        });
      }

      if (method === 'tools/call') {
        const { name } = params || {};
        return res.status(200).json({
          jsonrpc: "2.0",
          id,
          result: {
            content: [{ type: 'text', text: `Tool ${name} executed successfully in Abyssal Ink Runner context.` }],
            isError: false
          }
        });
      }

      if (method === 'prompts/list') {
        return res.status(200).json({ jsonrpc: "2.0", id, result: { prompts: [] } });
      }

      if (method === 'resources/list') {
        return res.status(200).json({ jsonrpc: "2.0", id, result: { resources: [] } });
      }

      return res.status(200).json({ jsonrpc: "2.0", id, error: { code: -32601, message: "Method not found" } });
    } catch (error) {
      return res.status(400).json({ jsonrpc: "2.0", id: null, error: { code: -32700, message: "Parse error" } });
    }
  }

  return res.status(404).json({ error: "Not Found" });
}
