import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import Helmet from 'react-helmet'
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

export const PartnerTemplate = ({
  content,
  excerpt,
  name,
  logo,
  url,
  slug,
}) => {
  const metaData = { excerpt, title: name, slug }
  return (
    <main>
      <Helmet title={`${stripHTML(name)} - Partner - ${config.company}`} />
      <SEO metaData={metaData} postImage={logo.childImageSharp.resize.src} />
      <Container>
        <Section>
          <Grid>
            <div>
              <HeaderTitle dangerouslySetInnerHTML={{ __html: name }} />
              <a href={url}>{url}</a>
            </div>
            <Img css="margin: 2em 0" fixed={logo.childImageSharp.fixed} />
            <HTMLContent css="grid-area: content" content={content} />
          </Grid>
        </Section>
      </Container>
    </main>
  )
}

export default ({ data }) => {
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
            fixed(width: 320) {
              ...GatsbyImageSharpFixed
            }
            resize(width: 1200, height: 630, cropFocus: ENTROPY) {
              src
            }
          }
        }
      }
    }
  }
`
