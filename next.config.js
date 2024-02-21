/** @type {import('next').NextConfig} */

module.exports = {
  images: {
    domains: ['cdn.sanity.io'],
  },
  experimental: {
    outputFileTracingIncludes: {
      '/blog': ['./content/blog/**/*'],
      '/': ['./content/data/customers/**/*'],
    },
    taint: true,
  },
}
