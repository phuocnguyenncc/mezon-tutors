# Figma + Cursor

- get api key: login figma -> top-left menu -> settings -> Security tab -> generate token
- link to cursor: files -> preferences -> Cursor settings -> MCP

```json
{
  "mcpServers": {
    "Framelink MCP for Figma": {
      "command": "cmd",
      "args": [
        "/c",
        "npx",
        "-y",
        "figma-developer-mcp",
        "--figma-api-key=FIXME",
        "--stdio"
      ]
    }
  }
}
```