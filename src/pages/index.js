import React from 'react'

const IndexPage = () => (
  <div>
    <h1>Apptiva</h1>
    <p>Willkomen auf der Webseite der Apptiva AG.</p>
  </div>
)

export default IndexPage

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
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
          }
        }
      }
    }
  }
`
