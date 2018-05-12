import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import { Section, Title } from '../layouts/style'

export default ({ data }) => {
  const { edges: posts } = data.allMarkdownRemark

  return (
    <Section>
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
            {post.excerpt}
            <Link
              style={{ fontWeight: 500, marginLeft: 5 }}
              to={`/${post.frontmatter.path}`}
            >
              Weiterlesen →
            </Link>
          </p>
        </div>
      ))}
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
            date(formatString: "MMMM DD, YYYY")
            image {
              childImageSharp {
                resolutions(height: 150, width: 300) {
                  ...GatsbyImageSharpResolutions
                }
              }
            }
          }
        }
      }
    }
  }
`
