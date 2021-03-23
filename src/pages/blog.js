import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'

import { company } from '../config'
import { Section, MainTitle, Container } from '../style'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import BlogLinkItem from '../components/BlogLinkItem'

const metadata = {
  title: 'Blog',
  description: 'Aktuelle News rund um die Apptiva.',
  slug: 'blog',
}

const Blog = ({ data }) => {
  const { edges: posts } = data.allMarkdownRemark

  return (
    <Layout>
      <main>
        <Helmet title={`Blog - ${company}`} />
        <SEO metaData={metadata} />

        <Section>
          <Container>
            <MainTitle>Blogbeiträge</MainTitle>

            {posts.map(({ node: post }) => (
              <BlogLinkItem
                css={`
                  background: ${(p) => p.theme.color.lightBg};
                `}
                frontmatter={post.frontmatter}
                excerpt={post.frontmatter.description}
              />
            ))}
          </Container>
        </Section>
      </main>
    </Layout>
  )
}

export default Blog

export const blogListPage = graphql`
  query BlogQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
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
                gatsbyImageData(
                  height: 150
                  width: 300
                  transformOptions: { cropFocus: ENTROPY }
                  layout: FIXED
                )
              }
            }
          }
        }
      }
    }
  }
`
