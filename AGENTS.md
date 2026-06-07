# Agent guide — ZukiApps-WEB

Instructions for AI assistants (Cursor, Claude Code, etc.) maintaining this repository.

## Start here

| File | Purpose |
|------|---------|
| [`.cursor/context/project_context.md`](.cursor/context/project_context.md) | Full project map |
| [`.claude/CLAUDE.md`](.claude/CLAUDE.md) | Claude Code entry |
| [`.claude/context.md`](.claude/context.md) | Short context |
| [`.cursor/rules/`](.cursor/rules/) | Cursor rules (`.mdc`) |
| [`.claude/agents/senior-ux-designer.md`](.claude/agents/senior-ux-designer.md) | Senior UX/UI designer agent |

## Specialized agents

| Agent | When to use |
|-------|-------------|
| **senior-ux-designer** | Page layout, visual polish, a11y, RTL, twilight theme, store-badge placement |
| *(default)* | Routing, i18n, legal copy, SEO, store URLs — see `.cursor/rules/` |

UX review prompt: `.claude/prompts/ux-review.md`

## Stack

Next.js 14 · TypeScript · Tailwind · next-intl · Netlify

## Common tasks

| Task | Where to look |
|------|----------------|
| Add app page | `.cursor/rules/new-app-playbook.mdc`, copy `collagio/` or `bit-scope/` |
| Update copy | `messages/en.json` → `{appNamespace}` |
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
- App source repos live in `/Users/zukman/GIT/` (Flutter) — use their `docs/` for listing copy
