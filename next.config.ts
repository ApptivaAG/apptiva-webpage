import type { NextConfig } from 'next'
import redirects from './redirects'

const withMDX = require('@next/mdx')
const { withPlausibleProxy } = require('next-plausible')

const config: NextConfig = {
  output: 'standalone',
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  trailingSlash: false,
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '**',
      },
    ],
  },
  experimental: {
    taint: true,
  },
  redirects,
}

export default withPlausibleProxy()(withMDX()(config))
