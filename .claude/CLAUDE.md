# ZukiApps-WEB — Claude Code

Marketing and legal site for **Zuki Apps** (Next.js 14, next-intl, Tailwind).

## Quick reference

| Topic | Location |
|-------|----------|
| Full context | `.cursor/context/project_context.md` |
| Short context | `.claude/context.md` |
| Cursor rules | `.cursor/rules/*.mdc` |
| UX/UI agent | `.claude/agents/senior-ux-designer.md` |
| Publish flags | `lib/appPublishState.ts` |
| English copy | `messages/en.json` |
| App routes | `app/[locale]/{slug}/` |
| Sitemap | `app/sitemap.ts` |

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
- Do not commit `.env*` or secrets
- Store URLs: verify live package IDs; use `lib/appStructuredData.ts` + `download.*` in JSON
- Hidden apps (ToldYa, Collagio): no home grid until `*_PUBLISHED = true`

## Adding an app

Follow `.cursor/rules/new-app-playbook.mdc`. Pull listing copy from the Flutter repo under `/Users/zukman/GIT/`.

See also **`AGENTS.md`** at repo root.
