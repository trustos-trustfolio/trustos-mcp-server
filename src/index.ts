#!/usr/bin/env node
import "dotenv/config";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { verifyDecisionSchema } from "./schemas.js";
import { verifyDecision } from "./trustos.js";

const server = new McpServer({
  name: "trustos",
  version: "0.1.0",
});

server.tool(
  "verify_decision",
  "Verify a high-impact decision before execution using Trust OS.",
  verifyDecisionSchema.shape,
  async (input) => {
    try {
      const result = await verifyDecision(input);

      const lines = [
        "Trust OS Decision Verification Result",
        "═".repeat(40),
        `decision_id   : ${result.decision_id ?? "—"}`,
        `recommendation: ${result.recommendation ?? "—"}`,
        `risk_score    : ${result.risk_score ?? "—"}`,
        `risk_level    : ${result.risk_level ?? "—"}`,
        `policy        : ${result.policy ?? "—"}`,
        `proof_hash    : ${result.proof_hash ?? "—"}`,
        `verified      : ${result.verified ?? "—"}`,
        `latency_ms    : ${result.latency_ms ?? "—"}`,
        "",
        "Full response:",
        JSON.stringify(result, null, 2),
      ];

      return {
        content: [{ type: "text", text: lines.join("\n") }],
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      return {
        content: [{ type: "text", text: `Error: ${message}` }],
        isError: true,
      };
    }
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
