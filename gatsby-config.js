const config = require('./src/config')

module.exports = {
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
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          placeholder: 'blurred',
        },
        stripMetadata: true,
      },
    },
    `gatsby-transformer-sharp`,
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
              showCaptions: ['title'],
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
                'hide-on-mobile': { classes: 'custom-block-hide-on-mobile' },
              },
            },
          },
          'gatsby-remark-embed-responsive-video',
          'gatsby-remark-responsive-iframe',
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              throwInlineCodeLanguageWarning: false,
            },
          },
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
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          'UA-66015649-1', // Google Analytics / GA
        ],
        // This object gets passed directly to the gtag config command
        // This config will be shared across all trackingIds
        gtagConfig: {
          anonymize_ip: true,
          cookie_expires: 0,
        },
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: false,
          // Setting this parameter is also optional
          respectDNT: true,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-mailchimp',
      options: {
        endpoint:
          'https://apptiva.us13.list-manage.com/subscribe/post?u=3ca7971bb5ee8b57e94b2b925&id=9612e94e98', // string; add your MC list endpoint here; see instructions below
        timeout: 3500, // number; the amount of time, in milliseconds, that you want to allow mailchimp to respond to your request before timing out. defaults to 3500
      },
    },
    {
      resolve: '@sentry/gatsby',
      options: {
        dsn:
          'https://007bbea8c3d841a08706c5f0cf775835@o419688.ingest.sentry.io/5747330',
        sampleRate: 0.7,
        ignoreErrors: ['ChunkLoadError'],
      },
    },
  ],
}
