import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import { Section as SectionDefault, Container } from '../layouts/style'

const Section = styled(SectionDefault)`
  padding-top: 4em;
`

const TestimonialStyle = styled.li`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex: 1 1 18em;
  max-width: 24rem;
  padding: 1rem;
`
const Person = styled.div`
  display: flex;
  color: #444;

  p {
    line-height: 1;
  }
`
const Avatar = styled(Img)`
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
export const Testimonial = ({ name, position, statement, avatar, company }) => (
  <TestimonialStyle>
    <Person>
      <Avatar
        fixed={{
          ...avatar.childImageSharp.fixed,
          base64: avatar.childImageSharp.sqip.dataURI,
        }}
      />
      <div>
        <Name>{name}</Name>
        <Position>{position}</Position>
        <Company>{company}</Company>
      </div>
    </Person>
    <Statement>«{statement}»        </Statement>
  </TestimonialStyle>
)

const TestimonialsStyle = styled.ul`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  font-size: 0.8rem;
  margin-left: -1rem;
  margin-right: -1rem;
  padding-left: 0;
  list-style: none;
`
export default ({ testimonials }) => (
  <Section>
    <Container>
      <TestimonialsStyle>
        {testimonials.edges.map(edge => (
          <Testimonial key={edge.node.id} {...edge.node.frontmatter} />
        ))}
      </TestimonialsStyle>
    </Container>
  </Section>
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
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed_withWebp_noBase64
          }
          sqip(numberOfPrimitives: 2, blur: 16) {
            dataURI
          }
        }
      }
    }
  }
`
