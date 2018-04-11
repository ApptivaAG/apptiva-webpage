import React from 'react'
import Img from 'gatsby-image'

import Testimonials from '../components/Testimonials'

export const StartPageTemplate = ({ image, title, testimonials }) => (
  <div>
    <section>
      <h1>{title}</h1>
      <Img sizes={image.childImageSharp.sizes} />
    </section>
    <Testimonials testimonials={testimonials} />
  </div>
)

export default ({ data }) => {
  const { frontmatter } = data.markdownRemark

  console.log('start page frontmatter', frontmatter)

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
        image {
          childImageSharp {
            sizes(maxWidth: 1920) {
              ...GatsbyImageSharpSizes
            }
          }
        }
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
