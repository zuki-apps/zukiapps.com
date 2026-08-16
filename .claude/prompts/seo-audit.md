# SEO & AEO audit — ZukiApps-WEB

Act as **senior-marketing-seo**. Read `.cursor/skills/product-page-enrichment/aeo-reference.md`.

Audit the target app route (or whole site if unspecified):

1. **Google metadata** — `hero.seoTitle` (≤58), `hero.metaDescription` (≤155), H1, OG, canonical, hreflang, indexability
2. **Structured data** — SoftwareApplication, FAQPage, HowTo, Breadcrumbs; schema matches visible copy; no fake ratings
3. **Content depth** — vs hush-gallery / whistle-camera
4. **AI citation surfaces** — `llms.txt`, `ai.txt`, `{slug}/faq.md` (quotable first sentences, absolute URLs), `siteCatalog.ts`
5. **Fact lockstep** — hero, FAQ, llms.txt, store listing, `home.{namespace}` do not contradict
6. **Store hygiene** — URLs, package IDs, UTM

Output: Critical → Google gaps → AI-citation gaps → minimal patches → `npm run build`.
