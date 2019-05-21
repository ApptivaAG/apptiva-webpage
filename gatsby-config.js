const config = require('./src/config')

module.exports = {
  siteMetadata: {
    title: config.company,
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: config.url,
      },
    },
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
      options: {
        plugins: [
          'gatsby-remark-external-links',
          'gatsby-plugin-catch-links',
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
              },
            },
          },
          'gatsby-remark-embed-responsive-video',
          'gatsby-remark-responsive-iframe',
          'gatsby-remark-prismjs',
        ],
      },
    },
    'gatsby-plugin-svgr',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Apptiva AG`,
        short_name: `Apptiva`,
        start_url: `/`,
        background_color: `#252526`,
        theme_color: `#008FD7`,
        display: `standalone`,
        icon: `src/img/icon.svg`,
      },
    },
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
    'gatsby-plugin-netlify-cache',
    {
      resolve: `gatsby-plugin-netlify`,
      options: {
        allPageHeaders: [
          'Link: </font/Gentona-ExtraBold.woff2>; rel=preload; as=font; crossorigin=anonymous',
          'Link: </font/Gentona-Bold.woff2>; rel=preload; as=font; crossorigin=anonymous',
          'Link: </font/Gentona-Medium.woff2>; rel=preload; as=font; crossorigin=anonymous',
          'Link: </font/Gentona-ExtraLight.woff2>; rel=preload; as=font; crossorigin=anonymous',
        ],
      },
    },
  ],
}
