// @ts-nocheck
// app/api/mcp/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    protocol: "MCP",
    version: "1.0.0",
    name: "Abyssal Ink Runner MCP Endpoint",
    status: "active",
    description: "Active MCP server for Abyssal Ink Runner Orchestrator Agent",
    capabilities: ["abyssal-exploration", "ink-running-mechanics", "narrative-navigation"],
    timestamp: new Date().toISOString()
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    return NextResponse.json({
      status: "success",
      message: "MCP command received",
      agent: "Abyssal Ink Runner Orchestrator",
      receivedAt: new Date().toISOString(),
      payload: body
    });
  } catch (error) {
    return NextResponse.json({ error: "Invalid MCP request" }, { status: 400 });
  }
}
