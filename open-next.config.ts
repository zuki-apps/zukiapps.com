import { defineCloudflareConfig } from '@opennextjs/cloudflare';

const config = defineCloudflareConfig({});

// Prefer Node export conditions so firebase-admin / jose bundle for nodejs_compat.
config.cloudflare = { useWorkerdCondition: false };

export default config;
