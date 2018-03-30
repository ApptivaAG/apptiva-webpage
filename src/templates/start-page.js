import React from 'react'
import Testimonials from '../components/Testimonials'

export const StartPageTemplate = ({ image, title, testimonials }) => (
  <section>
    <Testimonials testimonials={testimonials} />
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
      filter: { frontmatter: { templateKey: { eq: "testimonial-data" } } }
    ) {
      edges {
        node {
          id
          ...Testimonial_details
        }
      }
    }
  }
`
