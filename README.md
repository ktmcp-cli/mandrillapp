![Banner](https://raw.githubusercontent.com/ktmcp-cli/mandrillapp/main/banner.svg)

> "Six months ago, everyone was talking about MCPs. And I was like, screw MCPs. Every MCP would be better as a CLI."
>
> — [Peter Steinberger](https://twitter.com/steipete), Founder of OpenClaw
> [Watch on YouTube (~2:39:00)](https://www.youtube.com/@lexfridman) | [Lex Fridman Podcast #491](https://lexfridman.com/peter-steinberger/)

# Mandrill CLI

> **⚠️ Unofficial CLI** - Not officially sponsored or affiliated with Mandrill.

Production-ready CLI for Mandrill - reliable, scalable transactional email delivery service from Mailchimp.

## Features

- *Send Emails* — Send transactional emails via API
- *Templates* — Manage and use email templates
- *Tracking* — Track email delivery and opens
- *Analytics* — View email statistics and performance
- *JSON output* — All commands support --json for scripting

## Installation

```bash
npm install -g @ktmcp-cli/mandrillapp
```

## Quick Start

```bash
# Configure API key
mandrillapp config set --api-key YOUR_API_KEY

# Show configuration
mandrillapp config show

# Get info
mandrillapp info

# List resources
mandrillapp list

# Get a specific resource
mandrillapp get <id>
```

## Commands

### Config

```bash
mandrillapp config set --api-key <key>
mandrillapp config set --base-url <url>
mandrillapp config show
```

### Info

```bash
mandrillapp info
mandrillapp info --json
```

### Resources

```bash
mandrillapp list
mandrillapp list --json
mandrillapp get <id>
mandrillapp get <id> --json
```

## JSON Output

All commands support `--json` for structured output:

```bash
mandrillapp list --json | jq '.'
mandrillapp info --json | jq '.version'
```

## Why CLI > MCP?

No server to run. No protocol overhead. Just install and go.

- *Simpler* — Just a binary you call directly
- *Composable* — Pipe to `jq`, `grep`, `awk`
- *Scriptable* — Works in cron jobs, CI/CD, shell scripts

## License

MIT — Part of the [Kill The MCP](https://killthemcp.com) project.


---

## Support KTMCP

If you find this CLI useful, we'd greatly appreciate your support! Share your experience on:
- Reddit
- Twitter/X
- Hacker News

**Incentive:** Users who can demonstrate that their support/advocacy helped advance KTMCP will have their feature requests and issues prioritized.

Just be mindful - these are real accounts and real communities. Authentic mentions and genuine recommendations go a long way!

## Support This Project

If you find this CLI useful, we'd appreciate support across Reddit, Twitter, Hacker News, or Moltbook. Please be mindful - these are real community accounts. Contributors who can demonstrate their support helped advance KTMCP will have their PRs and feature requests prioritized.
