import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'

import { company, referenzenRoute } from '../config'
import { Section, MainTitle, Container } from '../style'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import ReferenzLinkItem from '../components/ReferenzLinkItem'

const metadata = {
  title: 'Referenzen',
  description: 'Projekte und Produkte der Apptiva.',
  slug: referenzenRoute,
}

const Referenzen = ({ data }) => {
  const { edges: posts } = data.allMarkdownRemark

  return (
    <Layout>
      <Helmet title={`Referenzen - ${company}`} />
      <SEO metaData={metadata} />

      <Section>
        <Container>
          <MainTitle>Referenzen</MainTitle>
          {posts.map(({ node: post }) => (
            <ReferenzLinkItem
              key={post.id}
              css={`
                background: ${(p) => p.theme.color.lightBg};
              `}
              frontmatter={post.frontmatter}
              excerpt={post.frontmatter.description}
              route={referenzenRoute}
            />
          ))}
        </Container>
      </Section>
    </Layout>
  )
}

export default Referenzen

export const blogListPage = graphql`
  query ReferenzQuery {
    allMarkdownRemark(
      sort: { order: ASC, fields: [frontmatter___order] }
      filter: { frontmatter: { templateKey: { eq: "referenz" } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          frontmatter {
            title
            slug
            templateKey
            date(formatString: "D. MMMM YYYY", locale: "de")
            description
            image {
              childImageSharp {
                gatsbyImageData(width: 240, layout: CONSTRAINED)
              }
            }
          }
        }
      }
    }
  }
`
