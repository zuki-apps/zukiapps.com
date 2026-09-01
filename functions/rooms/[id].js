import { toldyaBridgeResponse, deepLinkPathFromUrl } from '../_lib/toldyaBridge.js';

export async function onRequest(context) {
  const path = deepLinkPathFromUrl(new URL(context.request.url));
  return toldyaBridgeResponse(context, {
    title: 'Open room in ToldYa!',
    body: 'Join this private room in the app.',
    deepLinkPath: path,
  });
}
