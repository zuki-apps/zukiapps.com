import { toldyaBridgeResponse, deepLinkPathFromUrl } from './_lib/toldyaBridge.js';

export async function onRequest(context) {
  const path = deepLinkPathFromUrl(new URL(context.request.url));
  return toldyaBridgeResponse(context, {
    title: 'Join ToldYa!',
    body: 'Free social predictions — call it, vote, prove it.',
    deepLinkPath: path,
  });
}
