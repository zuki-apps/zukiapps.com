const withNextIntl = require('next-intl/plugin')('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next 14.2: externalize OTEL + Google auth so dev webpack does not reference a missing `vendor-chunks/@opentelemetry.js`.
  // (firebase-admin is already in Next's default server external list.)
  experimental: {
    serverComponentsExternalPackages: ['@opentelemetry/api', 'google-auth-library'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    const canonicalHost = 'https://zukiapps.com';
    return [
      { source: '/tempoLabPro', destination: '/tempo-lab-pro', permanent: true },
      { source: '/tempoLabPro/:path*', destination: '/tempo-lab-pro/:path*', permanent: true },
      { source: '/:locale/tempoLabPro', destination: '/:locale/tempo-lab-pro', permanent: true },
      { source: '/:locale/tempoLabPro/:path*', destination: '/:locale/tempo-lab-pro/:path*', permanent: true },
      { source: '/:path*', has: [{ type: 'host', value: 'www.zukiapps.com' }], destination: `${canonicalHost}/:path*`, permanent: true },
      { source: '/:path*', has: [{ type: 'host', value: 'zukiapps.com' }, { type: 'header', key: 'x-forwarded-proto', value: 'http' }], destination: `${canonicalHost}/:path*`, permanent: true },
    ];
  },
};

module.exports = withNextIntl(nextConfig);
