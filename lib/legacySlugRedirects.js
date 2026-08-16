/** @typedef {{ source: string; destination: string; permanent: boolean }} NextRedirect */

const LOCALES = ['en', 'he', 'de', 'es', 'it', 'pt', 'ru', 'fr', 'ja', 'ko', 'ar', 'zh'];
const DEFAULT_LOCALE = 'en';
const RTL_LOCALES = ['he', 'ar'];

/** Sample product paths every locale must export */
const LOCALE_SAMPLE_PAGES = ['', 'hush-gallery', 'zulist/support', 'about'];

/** @type {[string, string][]} legacy slug → canonical slug */
const SLUG_PAIRS = [
  ['collagio', 'zuli-collage'],
  ['tempoLabPro', 'tempo-lab-pro'],
  ['tempo-lab', 'tempo-lab-pro'],
  ['dreambit', 'dreambit-legacy'],
  ['noise-meter', 'noise-meter-shusher'],
  ['shusher', 'noise-meter-shusher'],
  ['football-trivia-quiz', 'football-trivia'],
  ['fun-facts', 'fun-facts-trivia'],
  ['sudoku', 'sudoku-puzzle'],
  ['paratrooper', 'paratrooper-blitz'],
  ['power-interval', 'power-interval-timer'],
  ['trackledger', 'track-ledger'],
  ['bitscope', 'bit-scope'],
  ['hushgallery', 'hush-gallery'],
  ['whistlecamera', 'whistle-camera'],
];

/** Extra Cloudflare/Netlify lines beyond slug pairs (case aliases, .html, etc.). */
const EXTRA_NETLIFY_LINES = [
  // Collagio → Zuli Collage (CF Pages redirects are case-sensitive)
  '/Collagio /zuli-collage 301',
  '/Collagio/* /zuli-collage/:splat 301',
  '/COLLAGIO /zuli-collage 301',
  '/COLLAGIO/* /zuli-collage/:splat 301',
  '/:locale/Collagio /:locale/zuli-collage 301',
  '/:locale/Collagio/* /:locale/zuli-collage/:splat 301',
  '/:locale/COLLAGIO /:locale/zuli-collage 301',
  '/:locale/COLLAGIO/* /:locale/zuli-collage/:splat 301',
  '/collagio.html /zuli-collage 301',
  '/Collagio.html /zuli-collage 301',
  '/COLLAGIO.html /zuli-collage 301',
  // ToldYa! App Store / Play + in-app guidelines use /toldya/safety
  '/toldya/safety /toldya/child-safety 301',
  '/toldya/safety/ /toldya/child-safety 301',
  '/:locale/toldya/safety /:locale/toldya/child-safety 301',
  '/:locale/toldya/safety/ /:locale/toldya/child-safety 301',
];

/** @returns {NextRedirect[]} */
function getNextRedirects() {
  /** @type {NextRedirect[]} */
  const rules = [];
  for (const [from, to] of SLUG_PAIRS) {
    rules.push(
      { source: `/:locale/${from}`, destination: `/:locale/${to}`, permanent: true },
      { source: `/:locale/${from}/:path*`, destination: `/:locale/${to}/:path*`, permanent: true },
    );
  }
  // Case aliases for Collagio (Next redirect matching is case-sensitive too)
  for (const from of ['Collagio', 'COLLAGIO']) {
    rules.push(
      { source: `/${from}`, destination: '/zuli-collage', permanent: true },
      { source: `/${from}/:path*`, destination: '/zuli-collage/:path*', permanent: true },
      { source: `/:locale/${from}`, destination: `/:locale/zuli-collage`, permanent: true },
      { source: `/:locale/${from}/:path*`, destination: `/:locale/zuli-collage/:path*`, permanent: true },
    );
  }
  rules.push(
    { source: '/collagio.html', destination: '/zuli-collage', permanent: true },
    { source: '/Collagio.html', destination: '/zuli-collage', permanent: true },
    { source: '/COLLAGIO.html', destination: '/zuli-collage', permanent: true },
  );
  rules.push({
    source: '/:locale/zulist',
    destination: '/:locale/zulist',
    permanent: false,
  });
  // ToldYa! community guidelines / store safety URL alias
  rules.push(
    { source: '/toldya/safety', destination: '/toldya/child-safety', permanent: true },
    { source: '/toldya/safety/', destination: '/toldya/child-safety', permanent: true },
    {
      source: '/:locale/toldya/safety',
      destination: '/:locale/toldya/child-safety',
      permanent: true,
    },
    {
      source: '/:locale/toldya/safety/',
      destination: '/:locale/toldya/child-safety',
      permanent: true,
    },
  );
  return rules;
}

/** Netlify / Cloudflare Pages `_redirects` lines (locale + default-locale unprefixed). */
function getNetlifyRedirectLines() {
  /** @type {string[]} */
  const lines = [];
  for (const [from, to] of SLUG_PAIRS) {
    lines.push(`/:locale/${from} /:locale/${to} 301`);
    lines.push(`/:locale/${from}/* /:locale/${to}/:splat 301`);
    lines.push(`/${from} /${to} 301`);
    lines.push(`/${from}/* /${to}/:splat 301`);
  }
  lines.push(...EXTRA_NETLIFY_LINES);
  lines.push('/:locale/zulist/invite/* /:locale/zulist/invite/_/index.html 200');
  lines.push('/zulist/invite/* /zulist/invite/_/index.html 200');
  return lines;
}

module.exports = {
  LOCALES,
  DEFAULT_LOCALE,
  RTL_LOCALES,
  LOCALE_SAMPLE_PAGES,
  SLUG_PAIRS,
  getNextRedirects,
  getNetlifyRedirectLines,
};
