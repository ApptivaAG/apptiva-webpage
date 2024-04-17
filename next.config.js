const withMDX = require('@next/mdx')()
/**
 * @type {import('next').NextConfig}
 */
const config = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '**',
      },
    ],
  },
  experimental: {
    outputFileTracingIncludes: {
      '/blog': ['./content/blog/**/*'],
    },
    taint: true,
  },  
  async redirects() {
    return [
      {
        source: '/web-apps',
        destination: '/angebot/development/webentwicklung',
        permanent: true,
      },
    ]
  
  }
}




module.exports = withMDX(config)
