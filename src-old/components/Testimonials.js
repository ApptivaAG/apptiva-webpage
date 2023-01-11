import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import styled from 'styled-components'

const TestimonialStyle = styled.li`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex: 0 1 20em;
  padding: 1rem;
`
const Person = styled.div`
  display: flex;
  color: #444;

  p {
    line-height: 1;
  }
`
const Avatar = styled(GatsbyImage)`
  border: 2px solid #e2e2e2;
  border-radius: 50%;
  margin-right: 1em;
  transform: translateZ(0); /* Safari bug rounded image flicker  */
`
const Name = styled.p`
  font-weight: 500;
  margin: 0;
`
const Position = styled.p`
  margin: 0;
`
const Company = styled.p`
  font-weight: 800;
  margin: 0;
`
const Statement = styled.p`
  font-style: italic;
  margin-top: 0.8em;
`
const Testimonial = ({ name, position, statement, avatar, company }) => (
  <TestimonialStyle>
    <Person>
      <Avatar image={avatar.childImageSharp.gatsbyImageData} alt={name} />
      <div>
        <Name>{name}</Name>
        <Position>{position}</Position>
        <Company>{company}</Company>
      </div>
    </Person>
    <Statement>«{statement}» </Statement>
  </TestimonialStyle>
)

const TestimonialsStyle = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  font-size: 0.8rem;
  margin-left: -1rem;
  margin-right: -1rem;
  padding-left: 0;
  list-style: none;
`
const query = graphql`
  {
    testimonials: allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "testimonial-data" } } }
    ) {
      edges {
        node {
          id
          frontmatter {
            templateKey
            name
            position
            statement
            company
            avatar {
              childImageSharp {
                gatsbyImageData(width: 50, height: 50, layout: FIXED)
              }
            }
          }
        }
      }
    }
  }
`

const Testimonials = () => {
  const { testimonials } = useStaticQuery(query)
  return (
    <>
      <h2>Testimonials</h2>
      <TestimonialsStyle>
        {testimonials.edges.map((edge) => {
          const {
            name,
            position,
            statement,
            avatar,
            company,
          } = edge.node.frontmatter
          return (
            <Testimonial
              key={edge.node.id}
              name={name}
              position={position}
              statement={statement}
              avatar={avatar}
              company={company}
            />
          )
        })}
      </TestimonialsStyle>
    </>
  )
}

export default Testimonials
