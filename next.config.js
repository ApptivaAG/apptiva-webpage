const { withPlaiceholder } = require('@plaiceholder/next')
/**
 * @type {import('next').NextConfig}
 */
const config = {
  images: {
    domains: ['cdn.sanity.io'],
  },
  experimental: {
    outputFileTracingIncludes: {
      '/blog': ['./content/blog/**/*'],
    },
    taint: true,
  },
}

module.exports = withPlaiceholder(config)
