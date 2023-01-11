import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getSrc } from 'gatsby-plugin-image'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'

import { HTMLContent } from '../components/Content'
import { Container, Section, MainTitle } from '../style'
import config from '../config'
import SEO from '../components/SEO'
import { stripHTML } from '../util'
import Layout from '../components/Layout'

const HeaderTitle = styled(MainTitle)`
  margin-bottom: 0.2em;
  text-align: left;
  @media (min-width: 640px) {
    font-size: 3em;
  }
`

const Grid = styled.div`
  gap: 1em;

  @media (min-width: 768px) {
    display: grid;
    grid:
      'name logo'
      'content content' / 1fr auto;
  }
`

const PartnerTemplate = ({ content, excerpt, name, logo, url, slug }) => {
  const metaData = { excerpt, title: name, slug }
  return (
    <main>
      <Helmet title={`${stripHTML(name)} - Partner - ${config.company}`} />
      <SEO
        metaData={metaData}
        postImage={getSrc(logo.childImageSharp?.gatsbyImageData)}
      />
      <Container>
        <Section>
          <Grid>
            <div>
              <HeaderTitle dangerouslySetInnerHTML={{ __html: name }} />
              <a href={url} target="_blank" rel="noopener noreferrer">
                {url}
              </a>
            </div>
            {logo.childImageSharp && (
              <GatsbyImage
                image={logo.childImageSharp.gatsbyImageData}
                css="margin: 2em 0"
              />
            )}
            <HTMLContent css="grid-area: content" content={content} />
          </Grid>
        </Section>
      </Container>
    </main>
  )
}

const PartnerPage = ({ data }) => {
  const {
    partner: {
      html,
      excerpt,
      frontmatter: { name, logo, url, slug },
    },
  } = data

  return (
    <Layout>
      <PartnerTemplate
        content={html}
        excerpt={excerpt}
        name={name}
        logo={logo}
        url={url}
        slug={slug}
      />
    </Layout>
  )
}

export default PartnerPage

export const pageQuery = graphql`
  query PartnerByID($slug: String!) {
    partner: markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      id
      html
      excerpt(pruneLength: 300)
      frontmatter {
        name
        url
        slug
        logo {
          childImageSharp {
            gatsbyImageData(width: 320, layout: FIXED)
          }
        }
      }
    }
  }
`
