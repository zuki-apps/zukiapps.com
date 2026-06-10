# Agent guide — ZukiApps-WEB

Instructions for AI assistants (Cursor, Claude Code, etc.) maintaining **zukiapps.com** — marketing, SEO/AEO, and store conversion.

## Start here

| File | Purpose |
|------|---------|
| [`.cursor/context/project_context.md`](.cursor/context/project_context.md) | Full project map |
| [`.claude/CLAUDE.md`](.claude/CLAUDE.md) | Claude Code entry |
| [`.claude/context.md`](.claude/context.md) | Short context |
| [`.cursor/rules/`](.cursor/rules/) | Cursor rules (`.mdc`) |
| [`.cursor/agents/`](.cursor/agents/) | Agent index (links to `.claude/agents/`) |

## Specialized agents

| Agent | When to use |
|-------|-------------|
| **senior-marketing-seo** | Google SEO, answer engines, `llms.txt`, FAQ/HowTo schema, enrich product pages |
| **senior-advertising** | Paid ads message match, SEA/UAC/Meta/ASA ↔ landing page copy |
| **senior-web-developer** | Next.js routes, i18n, metadata, builds, publish flags |
| **senior-ux-designer** | Layout, twilight theme, a11y, RTL, store CTAs |
| **content-sync-specialist** | Scan app repo (`marketing/`, `docs/`) → update site |

Definitions: `.claude/agents/{name}.md`

## Prompts (copy into chat)

| Prompt | Purpose |
|--------|---------|
| `.claude/prompts/seo-audit.md` | SEO/AEO gap analysis |
| `.claude/prompts/marketing-enrichment.md` | Full page sync from app repo |
| `.claude/prompts/aeo-checklist.md` | Per-app answer-engine checklist |
| `.claude/prompts/ux-review.md` | UI/UX review |
| `.claude/prompts/review.md` | Code review (routes, i18n, stores) |

## Cursor rules

| Rule | Scope |
|------|--------|
| `project-overview.mdc` | Always on |
| `seo-aeo.mdc` | Metadata, JSON-LD, llms.txt, product pages |
| `marketing-content.mdc` | Copy/assets from sibling app repos |
| `ux-design.mdc` | `app/`, `components/`, `globals.css` |
| `new-app-playbook.mdc` | New app launch checklist |
| `nextjs-app-pages.mdc` | App Router patterns |
| `i18n-messages.mdc` | `messages/en.json` |

## Stack

Next.js 14 · TypeScript · Tailwind · next-intl · Netlify

## Common tasks

| Task | Where to look |
|------|----------------|
| Enrich product page | `hush-gallery`, `whistle-camera` + `marketing-content.mdc` |
| Add app page | `new-app-playbook.mdc`, copy `collagio/` or `bit-scope/` |
| Update copy | `messages/en.json` → `{appNamespace}` |
| SEO / AEO | `seo-aeo.mdc`, `senior-marketing-seo` agent |
| Hide until launch | `lib/appPublishState.ts`, skip home grid |
| Store URLs | `{namespace}.download` + `lib/appStructuredData.ts` |
| Go live on home | publish flag, `siteCatalog.ts`, `AppsGrid`, `AppsCarousel`, `llms.txt` |

## Commands

```bash
npm run dev
npm run build
npm run lint
```

## Rules

- Small, focused diffs
- English messages first; other locales inherit via merge
- No commits unless the user asks
- App source repos: `/Users/zukman/GIT/{AppName}/` — use `marketing/` + `docs/` for listing copy
