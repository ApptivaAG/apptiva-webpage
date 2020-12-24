const config = require('./src/config')

module.exports = {
  flags: {
    FAST_DEV: true,
    FAST_REFRESH: true,
  },
  siteMetadata: {
    title: config.company,
    siteUrl: config.url, // needed in gatsby-plugin-sitemap
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content`,
        name: 'content',
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
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-external-links',
          'gatsby-remark-smartypants',
          {
            resolve: 'gatsby-remark-emoji',
            options: {
              // default emojiConversion --> shortnameToUnicode
              emojiConversion: 'toImage',
            },
          },
          'gatsby-remark-copy-linked-files',
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 960,
            },
          },
          'gatsby-remark-lazy-load',
          {
            resolve: 'gatsby-remark-custom-blocks',
            options: {
              blocks: {
                dark: { classes: 'custom-block-dark' },
                center: { classes: 'custom-block-center' },
                row: { classes: 'custom-block-row' },
                col: { classes: 'custom-block-col' },
                left: { classes: 'custom-block-left' },
                right: { classes: 'custom-block-right' },
                button: { classes: 'custom-block-button' },
                avatar: { classes: 'custom-block-avatar' },
                'no-margin': { classes: 'custom-block-no-margin' },
                'hide-on-mobile': { classes: 'custom-block-hide-on-mobile' },
              },
            },
          },
          'gatsby-remark-embed-responsive-video',
          'gatsby-remark-responsive-iframe',
          'gatsby-remark-prismjs',
        ],
      },
    },
    'gatsby-plugin-react-helmet',
    `gatsby-plugin-sitemap`,
    'gatsby-plugin-styled-components',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-svgr',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Apptiva AG',
        short_name: 'Apptiva',
        start_url: '/',
        background_color: '#252526',
        theme_color: '#008FD7',
        display: 'standalone',
        icon: 'src/img/icon.svg',
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-66015649-1',
        // Setting this parameter is optional
        anonymize: true,
        // Avoids sending pageview hits from custom paths
        exclude: ['/preview/**', '/do-not-track/me/too/'],
      },
    },
    'gatsby-plugin-netlify-cache',
    'gatsby-plugin-preload-fonts',
  ],
}
