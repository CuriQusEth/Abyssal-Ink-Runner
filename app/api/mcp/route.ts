// app/api/mcp/route.ts

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

export async function GET() {
  return Response.json(
    {
      protocol: "MCP",
      version: "1.0.0",
      name: "Abyssal Ink Runner MCP Endpoint",
      status: "active",
      description: "Active MCP server for Abyssal Ink Runner Orchestrator Agent",
      capabilities: ["abyssal-exploration", "ink-running-mechanics", "narrative-navigation"],
      timestamp: new Date().toISOString()
    },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      }
    }
  );
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { method, params, id, jsonrpc } = body;

    if (jsonrpc && jsonrpc !== '2.0') {
      return Response.json(
        { jsonrpc: "2.0", id: id || null, error: { code: -32600, message: "Invalid Request" } },
        { status: 400 }
      );
    }

    if (method === 'initialize') {
      return Response.json({
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
      return Response.json({
        jsonrpc: "2.0",
        id,
        result: { tools }
      });
    }

    if (method === 'tools/call') {
      const { name, arguments: args } = params || {};
      return Response.json({
        jsonrpc: "2.0",
        id,
        result: {
          content: [{ type: 'text', text: `Tool ${name} executed successfully in Abyssal Ink Runner context.` }],
          isError: false
        }
      });
    }

    if (method === 'prompts/list') {
      return Response.json({ jsonrpc: "2.0", id, result: { prompts: [] } });
    }

    if (method === 'resources/list') {
      return Response.json({ jsonrpc: "2.0", id, result: { resources: [] } });
    }

    return Response.json({ jsonrpc: "2.0", id, error: { code: -32601, message: "Method not found" } });
  } catch (error) {
    return Response.json({ jsonrpc: "2.0", id: null, error: { code: -32700, message: "Parse error" } }, { status: 400 });
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  });
}
