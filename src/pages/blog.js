import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import { Section, Title, Container } from '../layouts/style'
import { truncate } from '../util'

export default ({ data }) => {
  const { edges: posts } = data.allMarkdownRemark

  return (
    <Section>
      <Container>
        <Title>Blogbeiträge</Title>

        {posts.map(({ node: post }) => (
          <div key={post.id}>
            <p style={{ marginTop: '4em', fontWeight: 600 }}>
              <Link to={`/${post.frontmatter.path}`}>
                {post.frontmatter.title}
              </Link>
              <span> &bull; </span>
              <small>{post.frontmatter.date}</small>
            </p>
            <Img
              resolutions={post.frontmatter.image.childImageSharp.resolutions}
            />
            <p>
              {post.frontmatter.description
                ? truncate(post.frontmatter.description, 400)
                : post.excerpt}
              <Link
                style={{ fontWeight: 500, marginLeft: 5 }}
                to={`/${post.frontmatter.path}`}
              >
                Weiterlesen →
              </Link>
            </p>
          </div>
        ))}
      </Container>
    </Section>
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
          fields {
            slug
          }
          frontmatter {
            title
            path
            templateKey
            date(formatString: "D. MMMM YYYY", locale: "de")
            description
            image {
              childImageSharp {
                resolutions(height: 150, width: 300) {
                  ...GatsbyImageSharpResolutions_withWebp
                }
              }
            }
          }
        }
      }
    }
  }
`
