# ZukiApps-WEB — Claude Code

Marketing and legal site for **Zuki Apps** (Next.js 14, next-intl, Tailwind). Optimized for **Google SEO** and **answer-engine (AEO)** discovery.

## Quick reference

| Topic | Location |
|-------|----------|
| Full context | `.cursor/context/project_context.md` |
| Short context | `.claude/context.md` |
| Agent roster | `AGENTS.md` |
| Cursor rules | `.cursor/rules/*.mdc` |
| SEO/AEO rule | `.cursor/rules/seo-aeo.mdc` |
| Publish flags | `lib/appPublishState.ts` |
| English copy | `messages/en.json` |
| Rich page examples | `hush-gallery/`, `whistle-camera/` |
| Machine index | `public/llms.txt`, `api/site-facts` |

## Agents (`.claude/agents/`)

| Agent | Role |
|-------|------|
| `senior-marketing-seo` | SEO, AEO, structured data, llms.txt |
| `senior-advertising` | Paid ads ↔ landing message match |
| `senior-web-developer` | Next.js implementation |
| `senior-ux-designer` | UI, twilight theme, a11y |
| `content-sync-specialist` | App repo → web page sync |

## Commands

```bash
npm run dev
npm run build
npm run lint
```

## Hard constraints

- Minimize diff scope; match existing app page patterns
- Update `messages/en.json` first for new copy
- Do not commit unless explicitly asked
- Store URLs: verify live package IDs; `lib/appStructuredData.ts`
- Hidden apps: no home grid until `*_PUBLISHED = true`

See **`AGENTS.md`** at repo root.
