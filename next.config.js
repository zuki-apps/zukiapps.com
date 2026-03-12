const withNextIntl = require('next-intl/plugin')('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    const canonicalHost = 'https://zukiapps.com';
    return [
      { source: '/:path*', has: [{ type: 'host', value: 'www.zukiapps.com' }], destination: `${canonicalHost}/:path*`, permanent: true },
      { source: '/:path*', has: [{ type: 'host', value: 'zukiapps.com' }, { type: 'header', key: 'x-forwarded-proto', value: 'http' }], destination: `${canonicalHost}/:path*`, permanent: true },
    ];
  },
};

module.exports = withNextIntl(nextConfig);
