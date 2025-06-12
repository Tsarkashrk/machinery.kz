import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: `s3.mchnry.kz`,
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'storage.tssp.kz',
        pathname: '/uploads/brand-images/**',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
