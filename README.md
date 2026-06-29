# Trust OS MCP Server

Official MCP Server for AI decision verification with Trust OS.

---

## What is Trust OS?

Trust OS is a Decision Verification Platform that helps organizations verify high-impact decisions before execution.

- Decision verification
- Risk evaluation
- Policy enforcement
- Auditability
- Explainability
- API-first integration

---

## Features

- MCP-compatible tool for any MCP client
- `verify_decision` tool with structured input/output
- Claude Desktop integration
- Automatic risk assessment and cryptographic proof

---

## Quick Start

```bash
git clone https://github.com/trustos-trustfolio/trustos-mcp-server.git
cd trustos-mcp-server
npm install
npm run build
```

Set your API key:

```bash
cp .env.example .env
# Edit .env and set TRUSTOS_API_KEY=your_api_key_here
```

Add to Claude Desktop (`claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "trustos": {
      "command": "node",
      "args": ["C:/trustos-mcp-server/dist/index.js"],
      "env": {
        "TRUSTOS_API_KEY": "YOUR_API_KEY"
      }
    }
  }
}
```

Config file locations:
- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

---

## Tool Reference

### `verify_decision`

Verify a high-impact decision before execution.

| Field | Type | Required | Description |
|---|---|---|---|
| `action` | string | Yes | The action to verify |
| `amount` | number | No | Monetary amount |
| `currency` | string | No | Currency code (e.g. USDC) |
| `destination` | string | No | Destination identifier |
| `source` | string | No | Source system |
| `priority` | string | No | Priority level |
| `metadata` | object | No | Additional context |

**Example prompt:**

```
Use Trust OS to verify this decision before execution:
action stablecoin_transfer, amount 50000, currency USDC, destination wallet_abc.
```

**Example response:**

```
Trust OS Decision Verification Result
════════════════════════════════════════
decision_id   : dec_a1b2c3d4
recommendation: APPROVE
risk_score    : 0.18
risk_level    : LOW
policy        : Stablecoin Settlement Policy v1.0
proof_hash    : SHA-256: 0xabc123...
verified      : true
latency_ms    : 142
```

---

## Documentation

- Website: https://trust-os.io
- Developer Docs: https://trust-os.io/docs
- OpenAPI: https://trust-os.io/openapi.json

---

## License

MIT
