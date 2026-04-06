const withMDX = require('@next/mdx')()
const { withPlausibleProxy } = require('next-plausible')
const redirects = require('./redirects')

/**
 * @type {import('next').NextConfig}
 */
const config = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
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
  headers,
}

async function headers() {
  return [
    {
      source: '/:path*',
      headers: securityHeaders,
    },
  ]
}

// Security headers applied to every response.
// CSP is intentionally omitted here — it needs a dedicated audit (Plausible,
// Sanity, chatbot.apptiva.ch, styled-components inline styles) and should be
// rolled out via Content-Security-Policy-Report-Only first.
const securityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
]

module.exports = withPlausibleProxy()(withMDX(config))
