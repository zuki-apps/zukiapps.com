# ZukiApps-WEB — Claude Code

Marketing site for **Zuki Apps**. Optimize for **Google SEO** and **AI-engine citations** (Gemini, ChatGPT, Perplexity, Claude, AI Overviews).

## Quick reference

| Topic | Location |
|-------|----------|
| Project map | `.cursor/context/project_context.md` |
| AEO playbook | `.cursor/skills/product-page-enrichment/aeo-reference.md` |
| Agent roster | `AGENTS.md` |
| App copy | `messages/apps/{slug}/en.json` |
| Shared / home | `messages/shared/en.json` |
| Metadata | `lib/productSeo.ts` |
| Slug map | `lib/productApps.ts` |
| Machine index | `public/llms.txt`, `public/ai.txt`, `public/{slug}/faq.md` |

## Agents (`.claude/agents/`)

| Agent | Role |
|-------|------|
| `site-growth-orchestrator` | Multi-app Google + AI exposure |
| `senior-marketing-seo` | SEO, AEO, schema, llms.txt |
| `senior-advertising` | Paid ↔ landing message match |
| `senior-web-developer` | Next.js, metadata, sitemap |
| `senior-ux-designer` | UI, a11y, visible H1/FAQ |
| `content-sync-specialist` | App repo → web page |

## Commands

```bash
npm run dev
npm run build
npm run lint
```

## Hard constraints

- No root `messages/en.json`
- Do not invent store IDs or ratings
- Copy change → update `faq.md` + `llms.txt`
- Do not commit unless asked

See **`AGENTS.md`**.
