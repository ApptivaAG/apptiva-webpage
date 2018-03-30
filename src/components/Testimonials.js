import React from 'react'
import Img from 'gatsby-image'

export const Testimonial = ({ name, position, statement, avatar }) => (
  <div key={name}>
    <p>{name}</p>
    <p>{position}</p>
    <p>{statement}</p>
    <Img resolutions={avatar.childImageSharp.resolutions} />
  </div>
)

export default ({ testimonials }) => (
  <section>
    <h2>Kundenstimmen</h2>
    {testimonials.edges.map(edge => <Testimonial {...edge.node.frontmatter} />)}
  </section>
)

export const testimonialFragment = graphql`
  fragment Testimonial_details on MarkdownRemark {
    frontmatter {
      templateKey
      name
      position
      statement
      avatar {
        childImageSharp {
          resolutions(width: 200) {
            ...GatsbyImageSharpResolutions
          }
        }
      }
    }
  }
`
