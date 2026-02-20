# AGENT.md — Mandrill CLI for AI Agents

This document explains how to use the Mandrill CLI as an AI agent.

## Overview

The `mandrillapp` CLI provides command-line access to the Mandrill API.

## Prerequisites

```bash
mandrillapp config set --api-key <key>
```

## All Commands

### Config

```bash
mandrillapp config set --api-key <key>
mandrillapp config set --base-url <url>
mandrillapp config show
```

### Info

```bash
mandrillapp info              # Get API information
mandrillapp info --json       # JSON output
```

### Resources

```bash
mandrillapp list              # List all resources
mandrillapp list --json       # JSON output
mandrillapp get <id>          # Get specific resource
mandrillapp get <id> --json
```

## Tips for Agents

1. Always use `--json` when parsing results programmatically
2. Check configuration with `mandrillapp config show` before making API calls
3. Use `mandrillapp list --json` to get structured data for parsing
4. The API requires an API key - ensure it's configured before use
