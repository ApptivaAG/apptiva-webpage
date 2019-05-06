const config = require('./src/config')

module.exports = {
  siteMetadata: {
    title: config.company,
  },
  plugins: [
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/img`,
        name: 'images',
      },
    },
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        useMozJpeg: false,
        stripMetadata: true,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-transformer-sqip',
    {
      resolve: 'gatsby-transformer-remark',
    },
    'gatsby-plugin-svgr',
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-66015649-1',
        // Setting this parameter is optional
        anonymize: true,
        // Avoids sending pageview hits from custom paths
        exclude: ['/preview/**', '/do-not-track/me/too/'],
      },
    },
  ],
}
