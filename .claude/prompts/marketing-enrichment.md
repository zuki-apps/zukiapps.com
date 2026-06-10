# Marketing page enrichment — ZukiApps-WEB

Act as **content-sync-specialist** + **senior-marketing-seo**.

1. Scan `/Users/zukman/GIT/{AppRepo}/marketing/` and `docs/`
2. List assets (icons, screenshots) with paths
3. Propose `messages/en.json` sections: hero, features, screenshots, howToUse, faq (8+), manual, tips
4. Implement: assets → `public/images/`, patch JSON, update `page.tsx`, `layout.tsx`, `llms.txt`, `faq.md`
5. Run `npm run build`

Match accent color to existing app family. Use `StoreDownloadBadges`, `FaqStructuredData`, `HowToStructuredData`.

Do not commit unless asked.
