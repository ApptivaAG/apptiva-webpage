/** @type {import('next').NextConfig} */

module.exports = {
	images: {
		domains: ['cdn.sanity.io']
	},
  experimental: {
    taint: true,
    outputFileTracingIncludes: {
      '/blog': ['./content/blog/**/*'],
    },
  },
};
