import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import {
  Section as SectionDefault,
  Container,
  DeemphasizedTitle,
} from '../style'

const Section = styled(SectionDefault)`
  padding-top: 4em;
`

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
export const Testimonial = ({ name, position, statement, avatar, company }) => {
  return (
    <TestimonialStyle>
      <Person>
        <Avatar
          fixed={avatar.childImageSharp.fixed}
          placeholderStyle={{
            filter: `blur(16px)`,
            transform: `scale(1.04)`,
          }}
        />
        <div>
          <Name>{name}</Name>
          <Position>{position}</Position>
          <Company>{company}</Company>
        </div>
      </Person>
      <Statement>«{statement}» </Statement>
    </TestimonialStyle>
  )
}

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
  query {
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
                fixed(width: 50, height: 50) {
                  ...GatsbyImageSharpFixed_withWebp
                }
              }
            }
          }
        }
      }
    }
  }
`

export default () => {
  const { testimonials } = useStaticQuery(query)
  return (
    <Section dark>
      <Container>
        <DeemphasizedTitle>Testimonials</DeemphasizedTitle>
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
      </Container>
    </Section>
  )
}
