import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import config from '../config'
import { stripHTML, compose } from '../util'

const getSchemaOrgJSONLD = ({
  isBlogPost,
  url,
  title,
  image,
  description,
  author,
  date,
}) => {
  const schemaOrgJSONLD = [
    {
      '@context': 'http://schema.org',
      '@type': 'WebSite',
      url,
      name: title,
      description,
      alternateName: config.title,
    },
  ]

  return isBlogPost
    ? [
        ...schemaOrgJSONLD,
        {
          '@context': 'http://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              item: {
                '@id': url,
                name: title,
                image,
              },
            },
          ],
        },
        {
          '@context': 'http://schema.org',
          '@type': 'BlogPosting',
          url,
          name: title,
          alternateName: config.title,
          headline: title,
          image: {
            '@type': 'ImageObject',
            url: image,
          },
          description,
          author: {
            '@type': 'Person',
            name: author,
          },
          publisher: {
            '@type': 'Organization',
            url: config.url,
            name: config.company,
            logo: {
              '@type': 'ImageObject',
              url: config.logo,
            },
          },
          mainEntityOfPage: {
            '@type': 'WebSite',
            '@id': config.url,
          },
          datePublished: date,
        },
      ]
    : schemaOrgJSONLD
}

const addSlash = url => (url.endsWith('/') ? url : `${url}/`)
const baseOrSlugUrl = (baseUrl, slug) => new URL(slug || '', baseUrl).href
const composeUrl = compose(addSlash, baseOrSlugUrl)

const SEO = ({ metaData, postImage, isBlogPost }) => {
  const title = stripHTML(metaData.title) || config.title
  const description =
    metaData.description || metaData.excerpt || config.description
  const image = postImage ? `${config.url}${postImage}` : config.logo
  const url = composeUrl(config.url, metaData.slug)
  const date = isBlogPost ? metaData.isoDate : false
  const author = metaData.author || config.company

  const schemaOrgJSONLD = getSchemaOrgJSONLD({
    isBlogPost,
    url,
    title,
    image,
    description,
    author,
    date,
  })

  return (
    <Helmet htmlAttributes={{ lang: 'de-CH' }}>
      {/* General tags */}
      <meta name="description" content={description} />
      <meta name="image" content={image} />
      <link
        rel="canonical"
        href={url}
        data-baseprotocol="https:"
        data-basehost="apptiva.ch"
      />

      {/* Schema.org tags */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>

      {/* OpenGraph tags */}
      <meta property="og:url" content={url} />
      {isBlogPost ? <meta property="og:type" content="article" /> : null}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="fb:app_id" content={config.fbAppID} />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={config.twitter} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  )
}

SEO.propTypes = {
  isBlogPost: PropTypes.bool,
  metaData: PropTypes.shape({
    title: PropTypes.string,
    image: PropTypes.any,
    description: PropTypes.string,
    author: PropTypes.string,
    isoDate: PropTypes.any,
    slug: PropTypes.string,
  }),
  postImage: PropTypes.string,
}

SEO.defaultProps = {
  isBlogPost: false,
  postImage: null,
  metaData: {},
}

export default SEO

// eslint-disable-next-line no-underscore-dangle
export const __test__ = { composeUrl }
