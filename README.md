# Trust OS MCP Server

MCP server for verifying high-impact decisions with Trust OS.

Connect any MCP-compatible AI agent — Claude Desktop, Cursor, or any MCP client — to the [Trust OS Decision Verification API](https://trust-os.io) and verify financial and operational decisions before execution.

**Links**
- Website: [https://trust-os.io](https://trust-os.io)
- Docs: [https://trust-os.io/docs](https://trust-os.io/docs)
- API Reference: [https://trust-os.io/docs/api](https://trust-os.io/docs/api)
- Playground: [https://demo.trust-os.io](https://demo.trust-os.io)
- Operations Demo: [https://ops.trust-os.io](https://ops.trust-os.io)
- OpenAPI: [https://trust-os.io/openapi.json](https://trust-os.io/openapi.json)
- GitHub Org: [https://github.com/trustos-trustfolio](https://github.com/trustos-trustfolio)

---

## What it does

The Trust OS MCP Server exposes the Trust OS Decision Verification API as an MCP tool. When an AI agent calls `verify_decision`, the server:

1. Validates the input (action, amount, currency, destination, etc.)
2. POSTs the payload to Trust OS `/v1/decision/verify`
3. Returns a structured response including risk score, recommendation, and cryptographic proof

---

## Installation

```bash
git clone https://github.com/trustos-trustfolio/trustos-mcp-server.git
cd trustos-mcp-server
npm install
npm run build
```

---

## Environment Variables

Copy `.env.example` to `.env` and fill in your API key:

```bash
cp .env.example .env
```

| Variable | Required | Description |
|---|---|---|
| `TRUSTOS_API_KEY` | Yes | Your Trust OS API key |
| `TRUSTOS_BASE_URL` | No | Override API base URL (default: Trust OS gateway) |

Never commit `.env` to version control.

---

## Claude Desktop Configuration

Add the following to your Claude Desktop `claude_desktop_config.json`:

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

See [`examples/claude_desktop_config.json`](./examples/claude_desktop_config.json) for the full example.

**Claude Desktop config file location:**
- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

---

## Tool: `verify_decision`

**Description:** Verify a high-impact decision before execution using Trust OS.

**Input schema:**

| Field | Type | Required | Description |
|---|---|---|---|
| `action` | string | Yes | The action or decision to verify |
| `amount` | number | No | Monetary amount involved |
| `currency` | string | No | Currency code (e.g. USDC, USD) |
| `destination` | string | No | Destination address or identifier |
| `source` | string | No | Source address or identifier |
| `priority` | string | No | Priority level (e.g. high, critical) |
| `metadata` | object | No | Additional context as key-value pairs |

---

## Example Prompt

```
Use Trust OS to verify this decision before execution:
action stablecoin_transfer, amount 50000, currency USDC, destination wallet_abc.
```

---

## Example Response

```
Trust OS Decision Verification Result
════════════════════════════════════════
decision_id   : txn_a1b2c3d4
recommendation: APPROVE
risk_score    : 12
risk_level    : LOW
policy        : standard_transfer_policy
proof_hash    : 0xabc123...
verified      : true
latency_ms    : 142

Full response:
{
  "decision_id": "txn_a1b2c3d4",
  "recommendation": "APPROVE",
  "risk_score": 12,
  ...
}
```

---

## Security

- Store `TRUSTOS_API_KEY` in the MCP client's `env` config, never in source code
- `.env` is git-ignored
- API key is never logged or included in error messages
- To report a vulnerability, email **founder@trust-os.io** (see [SECURITY.md](./SECURITY.md))

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

---

## Changelog

See [CHANGELOG.md](./CHANGELOG.md).

---

## License

MIT © Trustfolio Inc.
