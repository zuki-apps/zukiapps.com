import { inviteResponse } from '../../_lib/inviteBridge.js';

export async function onRequest(context) {
  return inviteResponse(context);
}
