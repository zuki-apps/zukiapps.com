# Agent guide — ZukiApps-WEB

Instructions for AI assistants maintaining **zukiapps.com** — Google SEO, AI-engine citations (AEO), and store conversion.

## Start here

| File | Purpose |
|------|---------|
| [`.cursor/context/project_context.md`](.cursor/context/project_context.md) | Project map (current paths) |
| [`.cursor/skills/product-page-enrichment/SKILL.md`](.cursor/skills/product-page-enrichment/SKILL.md) | Enrichment workflow |
| [`.cursor/skills/product-page-enrichment/aeo-reference.md`](.cursor/skills/product-page-enrichment/aeo-reference.md) | Google + AI citation playbook |
| [`.claude/CLAUDE.md`](.claude/CLAUDE.md) | Claude Code entry |
| [`AGENTS.md`](AGENTS.md) | This index |

Slug / namespace source of truth: `lib/productApps.ts`. Copy: `messages/apps/{slug}/en.json` + `messages/shared/`.

## Specialized agents

| Agent | When to use |
|-------|-------------|
| **site-growth-orchestrator** | Multi-app or “improve Google + AI exposure” |
| **senior-marketing-seo** | Titles, schema, llms.txt, faq.md, Search Console, citations |
| **senior-advertising** | Ads ↔ landing ↔ store message match |
| **senior-web-developer** | Routes, `productSeo`, sitemap, publish flags |
| **senior-ux-designer** | Twilight UI, a11y, RTL, visible FAQ/H1 |
| **content-sync-specialist** | Scan `/Users/zukman/GIT/{App}/marketing/` → site |

Definitions: `.claude/agents/{name}.md` (copied to `.cursor/agents/`).

## Prompts (paste into chat)

| Prompt | Purpose |
|--------|---------|
| `.claude/prompts/seo-audit.md` | Google + AEO gap analysis |
| `.claude/prompts/aeo-checklist.md` | Per-app answer-engine checklist |
| `.claude/prompts/ai-citation.md` | Would an AI cite this page? |
| `.claude/prompts/marketing-enrichment.md` | Full page sync from app repo |
| `.claude/prompts/ux-review.md` | UI/UX review |
| `.claude/prompts/review.md` | Code review |

## Cursor rules

| Rule | Scope |
|------|--------|
| `project-overview.mdc` | Always on |
| `seo-aeo.mdc` | Metadata, JSON-LD, llms.txt, faq.md |
| `marketing-content.mdc` | App-repo sync |
| `ux-design.mdc` | `app/`, `components/` |
| `new-app-playbook.mdc` | Launch checklist |
| `nextjs-app-pages.mdc` | App Router + `buildProductPageMetadata` |
| `i18n-messages.mdc` | `messages/apps` + `messages/shared` |

## Stack

Next.js 14 · TypeScript · Tailwind · next-intl · Cloudflare Workers

## Commands

```bash
npm run dev
npm run build
npm run lint
```

## Rules

- Small, focused diffs
- English first; other locales inherit
- No commits unless asked
- After copy changes: JSON + `faq.md` + `llms.txt` in lockstep
