/**
 * @type {import('next').NextConfig}
 */
const config = {
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'cdn.sanity.io',
      pathname: '**'
    }],
  },
  experimental: {
    outputFileTracingIncludes: {
      '/blog': ['./content/blog/**/*'],
    },
    taint: true,
  },
}

module.exports = config
