import { toldyaBridgeResponse, deepLinkPathFromUrl } from '../_lib/toldyaBridge.js';

export async function onRequest(context) {
  const path = deepLinkPathFromUrl(new URL(context.request.url));
  return toldyaBridgeResponse(context, {
    title: 'Open in ToldYa!',
    body: 'View this prediction in the app.',
    deepLinkPath: path,
  });
}
