import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import { Section, Title, Container } from '../layouts/style'
import { truncate } from '../util'
import Layout from '../components/Layout'

export default ({ data }) => {
  const { edges: posts } = data.allMarkdownRemark

  return (
    <Layout>
      <Section>
        <Container>
          <Title>Blogbeiträge</Title>

          {posts.map(({ node: post }) => (
            <div key={post.id}>
              <p style={{ marginTop: '4em', fontWeight: 600 }}>
                <Link to={`/${post.frontmatter.slug}`}>
                  {post.frontmatter.title}
                </Link>
                <span> &bull; </span>
                <small>{post.frontmatter.date}</small>
              </p>
              <Img fixed={post.frontmatter.image.childImageSharp.fixed} />
              <p>
                {post.frontmatter.description
                  ? truncate(post.frontmatter.description, 400)
                  : post.excerpt}
                <Link
                  style={{ fontWeight: 500, marginLeft: 5 }}
                  to={`/${post.frontmatter.slug}`}
                >
                  Weiterlesen →
                </Link>
              </p>
            </div>
          ))}
        </Container>
      </Section>
    </Layout>
  )
}

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
                fixed(height: 150, width: 300) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    }
  }
`
