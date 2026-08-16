# AI citation audit — one app or whole site

Act as **senior-marketing-seo**. Target: Google AI Overviews, Gemini, ChatGPT, Perplexity, Claude.

For each app (or the named slug):

1. Can a model answer “what is {app}?” from the **first paragraph** + `llms.txt` bullet alone?
2. Do HTML, `public/{slug}/faq.md`, `llms.txt`, and store listing agree on name, publisher (**Zuki Apps**), platforms, price, package IDs?
3. Are FAQ answers specific (permissions, offline, Pro, delete-account) instead of generic marketing?
4. Are crawlers allowed in `app/robots.ts` (GPTBot, ClaudeBot, PerplexityBot, Google-Extended)?
5. Would you cite this page? If not, rewrite the lead + FAQ sentence 1 until yes.

Output a patch list only. English JSON first. Do not commit unless asked.
