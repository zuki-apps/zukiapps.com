import { joinResponse } from '../_lib/questivoJoinBridge.js';

export async function onRequest(context) {
  return joinResponse(context);
}
