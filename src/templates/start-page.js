import React from 'react'

export const StartPageTemplate = ({ image, title, testimonials }) => (
  <section>
    <h2>{title}</h2>
    {testimonials.edges.map(edge => {
      const { logo, name, position, statement } = edge.node.frontmatter
      return (
        <div key={edge.node.id}>
          <p>{name}</p>
          <p>{position}</p>
          <p>{statement}</p>
        </div>
      )
    })}
  </section>
)

export default ({ data }) => {
  const { frontmatter } = data.markdownRemark

  console.log('testimonials', data.testimonials)

  return (
    <StartPageTemplate
      image={frontmatter.image}
      title={frontmatter.title}
      testimonials={data.testimonials}
    />
  )
}

export const startPageQuery = graphql`
  query StartPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        image
      }
    }
    testimonials: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/data/" } }
    ) {
      edges {
        node {
          id
          frontmatter {
            templateKey
            logo
            name
            position
            statement
          }
        }
      }
    }
  }
`
