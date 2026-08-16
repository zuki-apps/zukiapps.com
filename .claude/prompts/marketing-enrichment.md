# Marketing page enrichment — ZukiApps-WEB

Act as **content-sync-specialist** + **senior-marketing-seo**.

Read `.cursor/skills/product-page-enrichment/SKILL.md`.

1. Scan `/Users/zukman/GIT/{AppRepo}/marketing/` (or `Marketing/`) and `docs/`
2. List assets (icons, screenshots) with paths
3. Patch `messages/apps/{slug}/en.json`: hero (incl. seoTitle/metaDescription), features, screenshots, howToUse, faq (8+), manual, tips
4. Implement: assets → `public/images/{slug}/`, page + layout (`buildProductPageMetadata`), `llms.txt`, `faq.md`
5. Align `messages/shared/en.json` → `home.{namespace}`
6. `npm run build`

Match accent to `lib/productApps.ts`. Do not invent store IDs. Do not commit unless asked.
