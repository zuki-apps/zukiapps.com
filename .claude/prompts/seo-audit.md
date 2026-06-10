# SEO & AEO audit — ZukiApps-WEB

Act as **senior-marketing-seo** (`.claude/agents/senior-marketing-seo.md`).

Audit the target app route (or whole site if unspecified):

1. **Metadata** — title, description, OG, keywords, canonical, hreflang
2. **Structured data** — SoftwareApplication, FAQPage, HowTo, Breadcrumbs
3. **Content depth** — vs hush-gallery / whistle-camera benchmark
4. **Machine index** — `llms.txt`, `{slug}/faq.md`, `siteCatalog.ts`
5. **Store hygiene** — URLs, package IDs, UTM on badges
6. **Home carousel** — `home.{namespace}` message match

Output: Critical gaps → Quick wins (minimal diff) → Optional enhancements → build command.
