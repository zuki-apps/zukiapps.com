# Code review — ZukiApps-WEB

Review the diff for this Next.js marketing site.

Check:

1. **Routes** — `app/[locale]/` paths, sitemap entries, publish flags
2. **i18n** — all `t('…')` keys exist in `messages/en.json`; legal section keys match `LegalSections` config
3. **SEO** — canonical, hreflang, robots for under-construction pages
4. **Store links** — package IDs match `lib/appStructuredData.ts` and live listings
5. **Scope** — no unrelated refactors or full-file JSON reformats

Output: Critical → SEO/i18n → suggested minimal patches → summary.

Run `npm run build` if routes or messages changed.
