import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '194.110.54.189',
        port: '9100',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'storage.tssp.kz',
        pathname: '/uploads/brand-images/**',
      },
    ],
  },
}

export default withNextIntl(nextConfig)
