/**
 * Questivo join bridge for App Links / Universal Links.
 * Opens questivo://join?code=… with Play Store fallback.
 */
const ANDROID_PACKAGE = 'com.zuki.apps.questivo';
const HOST = 'zukiapps.com';
const PLAY_STORE =
  'https://play.google.com/store/apps/details?id=com.zuki.apps.questivo';
const MARKETING = 'https://zukiapps.com/questivo';

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function looksLikeCode(value) {
  const c = String(value ?? '')
    .trim()
    .toUpperCase();
  return c.length >= 4 && c.length <= 8 && /^[A-Z0-9]+$/.test(c);
}

export function extractJoinCode(url) {
  const fromQuery = url.searchParams.get('code');
  if (looksLikeCode(fromQuery)) return String(fromQuery).trim().toUpperCase();

  const parts = url.pathname.split('/').filter(Boolean);
  // /questivo/join/:code or /:locale/questivo/join/:code
  const joinIdx = parts.findIndex((p) => p.toLowerCase() === 'join');
  if (joinIdx >= 0 && joinIdx < parts.length - 1) {
    const candidate = parts[joinIdx + 1];
    if (looksLikeCode(candidate)) return candidate.toUpperCase();
  }
  return '';
}

function customSchemeUrl(code) {
  if (!code) return 'questivo://join';
  return `questivo://join?code=${encodeURIComponent(code)}`;
}

function httpsJoinPath(code) {
  return code
    ? `/questivo/join?code=${encodeURIComponent(code)}`
    : '/questivo/join';
}

function androidIntentUrl(code) {
  const path = httpsJoinPath(code);
  const fallback = encodeURIComponent(PLAY_STORE);
  // intent host+path without leading scheme; query stays on path
  const intentPath = path.startsWith('/') ? path.slice(1) : path;
  return (
    `intent://${HOST}/${intentPath}` +
    `#Intent;scheme=https;package=${ANDROID_PACKAGE};` +
    `S.browser_fallback_url=${fallback};end`
  );
}

export function joinHtml(code) {
  const safeCode = escapeHtml(code);
  const custom = customSchemeUrl(code);
  const intent = androidIntentUrl(code);
  const customAttr = escapeHtml(custom);
  const codeLine = code
    ? `<p style="color:#a78bfa;margin:0 0 1.25rem;letter-spacing:.12em;font-weight:700">${safeCode}</p>`
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <meta name="robots" content="noindex, follow"/>
  <title>Questivo — Join quest</title>
  <style>
    body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;
      font-family:system-ui,-apple-system,sans-serif;background:#0b0614;color:#f5f3ff}
    .card{background:#161022;border:1px solid rgba(167,139,250,.35);border-radius:1rem;
      padding:2rem;max-width:28rem;width:90%;text-align:center;box-shadow:0 10px 40px rgba(0,0,0,.45)}
    .icon{width:5rem;height:5rem;margin:0 auto 1.25rem;background:linear-gradient(135deg,#7c3aed,#c084fc);
      border-radius:1.15rem;display:flex;align-items:center;justify-content:center;font-size:2rem}
    a.btn{display:inline-block;background:#7c3aed;color:#fff;text-decoration:none;
      padding:.75rem 1.5rem;border-radius:.75rem;font-weight:600}
    a.store{color:#c4b5fd;margin:0 .4rem}
    p{line-height:1.45}
  </style>
  <script>
    (function () {
      var custom = ${JSON.stringify(custom)};
      var intent = ${JSON.stringify(intent)};
      var ua = navigator.userAgent || '';
      var isAndroid = /Android/i.test(ua);
      try { window.location.href = isAndroid ? intent : custom; } catch (e) {}
      setTimeout(function () {
        var el = document.getElementById('fallback');
        if (el) el.style.display = 'block';
      }, 2200);
    })();
  </script>
</head>
<body>
  <div class="card">
    <div class="icon" aria-hidden="true">🧭</div>
    <h1>Join a Questivo quest</h1>
    <p>Opening the Questivo app…</p>
    ${codeLine}
    <p id="fallback" style="display:none;margin:1.5rem 0">
      <a class="btn" href="${customAttr}">Open Questivo</a>
    </p>
    <p style="margin-top:1.5rem;font-size:.9rem;color:#9ca3af">Don't have the app?</p>
    <p>
      <a class="store" href="${escapeHtml(PLAY_STORE)}" target="_blank" rel="noopener noreferrer">Google Play</a>
      ·
      <a class="store" href="${escapeHtml(MARKETING)}" rel="noopener noreferrer">Learn more</a>
    </p>
  </div>
</body>
</html>`;
}

export function joinResponse(context) {
  const url = new URL(context.request.url);
  const code = extractJoinCode(url);
  return new Response(joinHtml(code), {
    status: 200,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'public, max-age=0, must-revalidate',
      'x-robots-tag': 'noindex, follow',
    },
  });
}
