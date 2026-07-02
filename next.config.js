/** @type {import('next').NextConfig} */
const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./i18n.ts');

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
    return [
      {
        source: '/:locale/collagio',
        destination: '/:locale/zuli-collage',
        permanent: true,
      },
      {
        source: '/:locale/collagio/:path*',
        destination: '/:locale/zuli-collage/:path*',
        permanent: true,
      },
      {
        source: '/:locale/tempoLabPro',
        destination: '/:locale/tempo-lab-pro',
        permanent: true,
      },
      {
        source: '/:locale/tempoLabPro/:path*',
        destination: '/:locale/tempo-lab-pro/:path*',
        permanent: true,
      },
      {
        source: '/:locale/tempo-lab',
        destination: '/:locale/tempo-lab-pro',
        permanent: true,
      },
      {
        source: '/:locale/tempo-lab/:path*',
        destination: '/:locale/tempo-lab-pro/:path*',
        permanent: true,
      },
      {
        source: '/:locale/dreambit',
        destination: '/:locale/dreambit-legacy',
        permanent: true,
      },
      {
        source: '/:locale/dreambit/:path*',
        destination: '/:locale/dreambit-legacy/:path*',
        permanent: true,
      },
      {
        source: '/:locale/noise-meter',
        destination: '/:locale/noise-meter-shusher',
        permanent: true,
      },
      {
        source: '/:locale/noise-meter/:path*',
        destination: '/:locale/noise-meter-shusher/:path*',
        permanent: true,
      },
      {
        source: '/:locale/shusher',
        destination: '/:locale/noise-meter-shusher',
        permanent: true,
      },
      {
        source: '/:locale/shusher/:path*',
        destination: '/:locale/noise-meter-shusher/:path*',
        permanent: true,
      },
      {
        source: '/:locale/football-trivia-quiz',
        destination: '/:locale/football-trivia',
        permanent: true,
      },
      {
        source: '/:locale/football-trivia-quiz/:path*',
        destination: '/:locale/football-trivia/:path*',
        permanent: true,
      },
      {
        source: '/:locale/fun-facts',
        destination: '/:locale/fun-facts-trivia',
        permanent: true,
      },
      {
        source: '/:locale/fun-facts/:path*',
        destination: '/:locale/fun-facts-trivia/:path*',
        permanent: true,
      },
      {
        source: '/:locale/sudoku',
        destination: '/:locale/sudoku-puzzle',
        permanent: true,
      },
      {
        source: '/:locale/sudoku/:path*',
        destination: '/:locale/sudoku-puzzle/:path*',
        permanent: true,
      },
      {
        source: '/:locale/paratrooper',
        destination: '/:locale/paratrooper-blitz',
        permanent: true,
      },
      {
        source: '/:locale/paratrooper/:path*',
        destination: '/:locale/paratrooper-blitz/:path*',
        permanent: true,
      },
      {
        source: '/:locale/power-interval',
        destination: '/:locale/power-interval-timer',
        permanent: true,
      },
      {
        source: '/:locale/power-interval/:path*',
        destination: '/:locale/power-interval-timer/:path*',
        permanent: true,
      },
      {
        source: '/:locale/trackledger',
        destination: '/:locale/track-ledger',
        permanent: true,
      },
      {
        source: '/:locale/trackledger/:path*',
        destination: '/:locale/track-ledger/:path*',
        permanent: true,
      },
      {
        source: '/:locale/bitscope',
        destination: '/:locale/bit-scope',
        permanent: true,
      },
      {
        source: '/:locale/bitscope/:path*',
        destination: '/:locale/bit-scope/:path*',
        permanent: true,
      },
      {
        source: '/:locale/hushgallery',
        destination: '/:locale/hush-gallery',
        permanent: true,
      },
      {
        source: '/:locale/hushgallery/:path*',
        destination: '/:locale/hush-gallery/:path*',
        permanent: true,
      },
      {
        source: '/:locale/whistlecamera',
        destination: '/:locale/whistle-camera',
        permanent: true,
      },
      {
        source: '/:locale/whistlecamera/:path*',
        destination: '/:locale/whistle-camera/:path*',
        permanent: true,
      },
      {
        source: '/:locale/zulist',
        destination: '/:locale/zulist',
        permanent: false,
      },
    ];
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
