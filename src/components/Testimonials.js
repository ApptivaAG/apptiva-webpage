import React from 'react'
import Img from 'gatsby-image'
import styled from 'styled-components'

const TestimonialStyle = styled.li`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex: 0 1 33.33%;
  padding: 1rem;
`
const Person = styled.div`
  display: flex;

  p {
    line-height: 1;
  }
`
const Avatar = styled(Img)`
  border: 1px solid red;
  border-radius: 50%;
  margin-right: 1em;
`
const Name = styled.p`
  font-weight: 800;
  margin: 0;
`
const Position = styled.p`
  margin: 0;
`
const Company = styled.p`
  font-weight: 500;
  margin: 0;
`
const Statement = styled.p`
  font-style: italic;
  margin-top: 0;
`
export const Testimonial = ({ name, position, statement, avatar, company }) => (
  <TestimonialStyle>
    <Person>
      <Avatar resolutions={avatar.childImageSharp.resolutions} />
      <div>
        <Name>{name}</Name>
        <Position>{position}</Position>
        <Company>{company}</Company>
      </div>
    </Person>
    <Statement>«{statement}»</Statement>
  </TestimonialStyle>
)

const TestimonialsStyle = styled.ul`
  display: flex;
  flex-wrap: wrap;
  font-size: 0.8rem;
  margin-left: -1rem;
  margin-right: -1rem;
  padding-left: 0;
  list-style: none;
`
export default ({ testimonials }) => (
  <section>
    <h2>Kundenstimmen</h2>
    <TestimonialsStyle>
      {testimonials.edges.map(edge => (
        <Testimonial key={edge.node.id} {...edge.node.frontmatter} />
      ))}
    </TestimonialsStyle>
  </section>
)

export const testimonialFragment = graphql`
  fragment Testimonial_details on MarkdownRemark {
    frontmatter {
      templateKey
      name
      position
      statement
      company
      avatar {
        childImageSharp {
          resolutions(width: 50, height: 50) {
            ...GatsbyImageSharpResolutions
          }
        }
      }
    }
  }
`
