# ToldYa! on zukiapps.com — App Links

ToldYa deep-link files live next to ZuList under `public/.well-known/` and `public/apple-app-site-association`.

## After changing fingerprints

From the ToldYA repo (merges ToldYa entry into this file):

```bash
PLAY_APP_SIGNING_SHA256='FROM:PLAY:CONSOLE' bash ../ToldYA/tool/sync_android_assetlinks.sh
npm run deploy
```

Play Console → **App integrity** → **App signing key certificate** → SHA-256 (not upload key).

## Routes (Pages Functions)

| URL | Handler |
|-----|---------|
| `/join` | `functions/join.js` |
| `/arena/:id` | `functions/arena/[id].js` |
| `/rooms/:id` | `functions/rooms/[id].js` |

Opens `toldya://open/...` or Android `intent://` with Play Store fallback.

## Verify

```bash
curl -sS https://zukiapps.com/.well-known/assetlinks.json | python3 -m json.tool
curl -sS https://zukiapps.com/apple-app-site-association | python3 -m json.tool
```

See also: `../ToldYA/DOCS/ANDROID_APP_LINKS.md`
