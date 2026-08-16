# AEO (answer engine) checklist — one app

Copy: `messages/apps/{slug}/en.json`. Playbook: `.cursor/skills/product-page-enrichment/aeo-reference.md`.

- [ ] `hero.seoTitle` ≤58 and `hero.metaDescription` ≤155 (`lib/productSeo.ts`)
- [ ] First visible paragraph answers “what is {app}?” (entity + platforms + Zuki Apps)
- [ ] `hero.structuredDataDescription` — who, what, platforms, package / iOS ids
- [ ] `faq.items` — 8+ factual Q&A; answer sentence 1 is quotable (no puffery)
- [ ] On-page FAQ + `FaqStructuredData` (same questions)
- [ ] `HowToStructuredData` only if 3+ steps are on the page
- [ ] `public/{slug}/faq.md` with `https://zukiapps.com/{slug}` links
- [ ] `llms.txt` bullet expanded (support, stores, package IDs, features)
- [ ] New app also listed in `public/ai.txt` and `lib/siteCatalog.ts`
- [ ] `SoftwareApplicationStructuredData` + correct icon; no invented ratings
- [ ] `home.{namespace}` in `messages/shared/en.json` matches the product hero
- [ ] Robots still allow GPTBot, ClaudeBot, PerplexityBot, Google-Extended

`npm run build`.
