/**
 * ToldYa! deep-link bridge (arena / join / rooms).
 * Opens toldya://open<path> or Android intent:// fallback.
 */
const ANDROID_PACKAGE = 'com.zuki.apps.toldya';
const HOST = 'zukiapps.com';
const IOS_STORE = 'https://apps.apple.com/app/id6756342206';
const PLAY_STORE =
  'https://play.google.com/store/apps/details?id=com.zuki.apps.toldya';

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function normalizedPath(path) {
  if (!path || path === '/') return '/';
  return path.startsWith('/') ? path : `/${path}`;
}

function customSchemeUrl(deepLinkPath) {
  return `toldya://open${normalizedPath(deepLinkPath)}`;
}

function androidIntentUrl(deepLinkPath) {
  const path = normalizedPath(deepLinkPath);
  const fallback = encodeURIComponent(PLAY_STORE);
  return (
    `intent://${HOST}${path}` +
    `#Intent;scheme=https;package=${ANDROID_PACKAGE};` +
    `S.browser_fallback_url=${fallback};end`
  );
}

export function toldyaBridgeHtml({ title, body, deepLinkPath }) {
  const safeTitle = escapeHtml(title);
  const safeBody = escapeHtml(body);
  const custom = customSchemeUrl(deepLinkPath);
  const intent = androidIntentUrl(deepLinkPath);
  const customJson = JSON.stringify(custom);
  const intentJson = JSON.stringify(intent);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <meta name="robots" content="noindex, follow"/>
  <title>${safeTitle}</title>
  <style>
    body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;
      font-family:system-ui,-apple-system,sans-serif;background:#0a0a0f;color:#f5f5f5}
    .card{background:#111118;border-radius:20px;padding:2rem;max-width:28rem;width:90%;
      text-align:center;border:1px solid #2a2a38}
  </style>
  <script>
    (function () {
      var custom = ${customJson};
      var intent = ${intentJson};
      var ua = navigator.userAgent || "";
      var isAndroid = /Android/i.test(ua);
      try { window.location.href = isAndroid ? intent : custom; } catch (e) {}
      setTimeout(function () {
        var el = document.getElementById('fallback');
        if (el) el.style.display = 'block';
      }, 2000);
    })();
  </script>
</head>
<body>
  <div class="card">
    <p style="color:#00c896;font-weight:600;margin:0 0 1rem">ToldYa!</p>
    <h1 style="margin:0 0 .75rem;font-size:1.35rem">${safeTitle}</h1>
    <p style="color:#b0b0c0;margin:0 0 1.5rem;line-height:1.5">${safeBody}</p>
    <p id="fallback" style="display:none;margin:0 0 1rem">
      <a href="${escapeHtml(custom)}" style="display:inline-block;background:#2d7eff;color:#fff;
        text-decoration:none;padding:.75rem 1.25rem;border-radius:.75rem;font-weight:600">Open in ToldYa!</a>
    </p>
    <p style="font-size:.85rem;color:#b0b0c0;margin:0">
      <a href="${IOS_STORE}" style="color:#2d7eff">App Store</a>
      ·
      <a href="${PLAY_STORE}" style="color:#00c896">Google Play</a>
    </p>
  </div>
</body>
</html>`;
}

export function toldyaBridgeResponse(context, opts) {
  return new Response(toldyaBridgeHtml(opts), {
    status: 200,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'public, max-age=0, must-revalidate',
      'x-robots-tag': 'noindex, follow',
    },
  });
}

export function deepLinkPathFromUrl(url) {
  const pathname = url.pathname.replace(/\/$/, '') || '/';
  return pathname;
}
