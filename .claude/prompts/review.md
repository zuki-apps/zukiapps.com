# Code review — ZukiApps-WEB

Review the diff for this Next.js marketing site.

Check:

1. **Routes** — `app/[locale]/` paths, sitemap, publish flags
2. **i18n** — `t('…')` keys exist in `messages/apps/{slug}/en.json` or `messages/shared/`; legal keys match `LegalSections`
3. **Google SEO** — `buildProductPageMetadata`, unique title/description, canonical, hreflang, robots
4. **AI discovery** — if copy changed: `faq.md`, `llms.txt`, schema matches visible FAQ/HowTo
5. **Store links** — package IDs match `lib/appStructuredData.ts` and live listings
6. **Scope** — no unrelated refactors or full-file JSON reformats

Output: Critical → SEO/AEO → suggested minimal patches → summary.

`npm run build` if routes or messages changed.
