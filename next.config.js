const withNextIntl = require('next-intl/plugin')('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  poweredByHeader: false,
  // Next 14.2: externalize OTEL + Google auth so dev webpack does not reference a missing `vendor-chunks/@opentelemetry.js`.
  // (firebase-admin is already in Next's default server external list.)
  experimental: {
    serverComponentsExternalPackages: ['@opentelemetry/api', 'google-auth-library'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
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
      { source: '/images/collagio-icon.webp', destination: '/images/zuli-collage-icon.webp', permanent: true },
      { source: '/images/collagio-icon.png', destination: '/images/zuli-collage-icon.png', permanent: true },
      { source: '/collagio', destination: '/zuli-collage', permanent: true },
      { source: '/collagio/:path*', destination: '/zuli-collage/:path*', permanent: true },
      { source: '/:locale/collagio', destination: '/:locale/zuli-collage', permanent: true },
      { source: '/:locale/collagio/:path*', destination: '/:locale/zuli-collage/:path*', permanent: true },
      { source: '/Collagio', destination: '/zuli-collage', permanent: true },
      { source: '/Collagio/:path*', destination: '/zuli-collage/:path*', permanent: true },
      { source: '/ZuliCollage', destination: '/zuli-collage', permanent: true },
      { source: '/ZuliCollage/:path*', destination: '/zuli-collage/:path*', permanent: true },
      { source: '/:locale/ZuliCollage', destination: '/:locale/zuli-collage', permanent: true },
      { source: '/:locale/ZuliCollage/:path*', destination: '/:locale/zuli-collage/:path*', permanent: true },
      { source: '/:path*', has: [{ type: 'host', value: 'www.zukiapps.com' }], destination: `${canonicalHost}/:path*`, permanent: true },
      { source: '/:path*', has: [{ type: 'host', value: 'zukiapps.com' }, { type: 'header', key: 'x-forwarded-proto', value: 'http' }], destination: `${canonicalHost}/:path*`, permanent: true },
    ];
  },
};

module.exports = withNextIntl(nextConfig);
