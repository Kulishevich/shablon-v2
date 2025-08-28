import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  skipTrailingSlashRedirect: true,
  skipMiddlewareUrlNormalize: true,
  images: {
    qualities: [100],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'temapi.webspaceteam.site',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'webspaceteam.site',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'kosmetika.webspaceteam.by',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'dlyadoma.webspaceteam.by',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'odejda.webspaceteam.by',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'auto.webspaceteam.by',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'tehnika.webspaceteam.by',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'podarok.webspaceteam.by',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'stroyka.webspaceteam.by',
        pathname: '/**',
      },
    ],
  },

  async rewrites() {
    return [
      { source: '/robots.txt', destination: '/api/robots' },
      { source: '/sitemap.xml', destination: '/api/sitemap.xml' },
      { source: '/feed.xml', destination: '/api/feed' },
    ];
  },

};

export default nextConfig;
