# Google Search Console – Checklist & Changes

**Last updated**: 2025

## Changes made for GSC

1. **Sitemap**
   - Added all indexable app routes: `bit-scope`, `sudoku-puzzle`, `tempoLabPro`, `football-trivia` and their `privacy`, `terms`, `support` pages.
   - Sitemap includes `lastModified`, `changeFrequency`, `priority`, and `alternates.languages` (hreflang) for all locales.

2. **robots.txt**
   - Added `app/robots.ts` so the sitemap URL uses `NEXT_PUBLIC_SITE_URL` (correct in production and staging).
   - `User-agent: *` / `Allow: /` / `Sitemap: {baseUrl}/sitemap.xml`.
   - You can remove `public/robots.txt`; `app/robots.ts` is used for `/robots.txt`.

3. **Home metadata**
   - Description and keywords updated to include all apps: Sudoku Fun Go, Football Trivia, Bit Scope, TempoLab Pro.
   - Improves relevance and coverage in Search Console.

4. **Structured data**
   - `SoftwareApplicationStructuredData`: added URL mapping for Football Trivia and Bit Scope so their app pages get correct `url` in JSON-LD.
   - WebSite schema: `inLanguage` set to all supported locales for international targeting.

## GSC setup checklist (do these in [Search Console](https://search.google.com/search-console))

- [x] **Property**
  1. Go to [search.google.com/search-console](https://search.google.com/search-console).
  2. Click **Add property** → **URL prefix** → enter `https://zukiapps.com` → **Continue**.
- [x] **Verify**
  1. GSC shows an HTML tag; your site uses `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` in layout. Set that env var (e.g. Netlify) so the meta tag matches.
  2. Click **Verify** in GSC.
- [x] **Sitemaps**
  1. Left menu → **Sitemaps**. Under "Add a new sitemap" enter `sitemap.xml` → **Submit**.
- [ ] **URL inspection**
  1. Top bar: paste `https://zukiapps.com` or e.g. `https://zukiapps.com/sudoku-puzzle` → Enter. If "URL is not on Google" → **Request indexing**.
- [ ] **International**
  1. **Settings** (gear) → **International targeting**. Hreflang is already set in sitemap and page alternates.
- [ ] **Coverage**
  1. Left menu → **Pages**. After indexing, check "Why pages aren't indexed" and fix issues.
- [ ] **Core Web Vitals**
  1. Left menu → **Experience** → **Core Web Vitals**. Fix any Poor URLs (LCP, INP, CLS) if reported.

## Already in place

- Canonical and `alternates.languages` (hreflang) on all key pages.
- Unique titles and meta descriptions per app/page.
- Organization + WebSite JSON-LD; BreadcrumbList and SoftwareApplication where relevant.
- `robots` meta: index, follow; `googleBot` hints for snippet length.
- Open Graph and Twitter Card meta tags.
- Google site verification meta tag in root and locale layouts.
- Mobile viewport and responsive layout.

## Optional next steps

- Add an **og:image** per app (e.g. 1200×630) for better sharing and possible rich results.
- Add **FAQPage** JSON-LD on support pages that have FAQs (e.g. Sudoku, ZuList).
- Monitor **Core Web Vitals** (LCP, INP, CLS) and optimize if needed.
- In GSC, use **URL Parameters** only if you have duplicate content from query params.
