# Contributing

Thank you for your interest in contributing to the Trust OS MCP Server.

## Getting Started

```bash
git clone https://github.com/trustos-trustfolio/trustos-mcp-server.git
cd trustos-mcp-server
npm install
cp .env.example .env   # add your TRUSTOS_API_KEY
npm run dev
```

## Development

```bash
npm run build      # compile TypeScript
npm run typecheck  # type-check without emitting
```

## Pull Requests

- Fork the repository
- Create a feature branch: `git checkout -b feat/your-feature`
- Make changes, run `npm run typecheck` to verify
- Open a PR against `main`

## Reporting Issues

Use the [GitHub issue tracker](https://github.com/trustos-trustfolio/trustos-mcp-server/issues).
For security issues, see [SECURITY.md](./SECURITY.md).
