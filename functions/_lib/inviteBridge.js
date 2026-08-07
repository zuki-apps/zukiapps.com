/**
 * Minimal ZuList invite bridge (no ASSETS dependency).
 * Opens zulist://invite?id=… then shows store fallbacks.
 */
function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function inviteHtml(invitationId, listName = '') {
  const id = String(invitationId ?? '').slice(0, 200);
  const appUrl = `zulist://invite?id=${encodeURIComponent(id)}`;
  const appUrlAttr = escapeHtml(appUrl);
  const safeList = escapeHtml(String(listName || '').slice(0, 120));
  const listLine = safeList
    ? `<p style="color:#6b7280;margin:0 0 1.5rem">רשימה: <strong>${safeList}</strong></p>`
    : '';

  return `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <meta name="robots" content="noindex, follow"/>
  <title>ZuList — הזמנה לרשימה</title>
  <style>
    body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;
      font-family:system-ui,-apple-system,sans-serif;background:linear-gradient(135deg,#eff6ff,#faf5ff);color:#111}
    .card{background:#eff6ff;border-radius:1rem;padding:2rem;max-width:28rem;width:90%;text-align:center;box-shadow:0 10px 30px rgba(0,0,0,.08)}
    .icon{width:5rem;height:5rem;margin:0 auto 1.25rem;background:#2563eb;border-radius:1rem;display:flex;align-items:center;justify-content:center;color:#fff;font-size:2rem}
    a.btn{display:inline-block;background:#2563eb;color:#fff;text-decoration:none;padding:.75rem 1.5rem;border-radius:.75rem;font-weight:600}
    a.store{color:#2563eb}
  </style>
  <script>
    (function () {
      var appUrl = ${JSON.stringify(appUrl)};
      try { window.location.href = appUrl; } catch (e) {}
      setTimeout(function () {
        var el = document.getElementById('fallback');
        if (el) el.style.display = 'block';
      }, 2500);
    })();
  </script>
</head>
<body>
  <div class="card">
    <div class="icon" aria-hidden="true">🛒</div>
    <h1>הזמנה לרשימה</h1>
    <p>הוזמנת להצטרף לרשימת קניות ב-ZuList!</p>
    ${listLine}
    <p id="fallback" style="display:none;margin:1.5rem 0">
      <a class="btn" href="${appUrlAttr}">פתח את ZuList</a>
    </p>
    <p style="margin-top:1.5rem;font-size:.9rem;color:#6b7280">אין לך את האפליקציה?</p>
    <p>
      <a class="store" href="https://apps.apple.com/us/app/zulist/id6753878439" target="_blank" rel="noopener noreferrer">הורד מ-App Store</a>
    </p>
  </div>
</body>
</html>`;
}

export function inviteResponse(context) {
  const url = new URL(context.request.url);
  const parts = url.pathname.split('/').filter(Boolean);
  // /zulist/invite/:id  or  /:locale/zulist/invite/:id
  const id = parts[parts.length - 1] || '';
  const listName = url.searchParams.get('listName') || '';
  return new Response(inviteHtml(id, listName), {
    status: 200,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'public, max-age=0, must-revalidate',
      'x-robots-tag': 'noindex, follow',
    },
  });
}
