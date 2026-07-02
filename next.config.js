/** @type {import('next').NextConfig} */
const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./i18n.ts');
const { getNextRedirects } = require('./lib/legacySlugRedirects');

const isStaticExport = process.env.STATIC_EXPORT === '1';

const nextConfig = {
  ...(isStaticExport
    ? {
        output: 'export',
        images: { unoptimized: true },
      }
    : {}),
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    if (isStaticExport) return [];
    return getNextRedirects();
  },
};

if (!isStaticExport) {
  try {
    const { initOpenNextCloudflareForDev } = require('@opennextjs/cloudflare');
    initOpenNextCloudflareForDev();
  } catch {
    // OpenNext optional for local dev without Cloudflare bindings
  }
}

module.exports = withNextIntl(nextConfig);
