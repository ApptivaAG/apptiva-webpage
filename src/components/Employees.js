import React from 'react'
import Img from 'gatsby-image'
import { Link, useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import '@fortawesome/fontawesome-free/css/fontawesome.min.css'
import '@fortawesome/fontawesome-free/css/solid.min.css'
import '@fortawesome/fontawesome-free/css/brands.min.css'

import { Section, Title, Subtitle, Container } from '../style'

const EmployeeList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 0 -0.5rem;
`
const Employee = styled.div`
  font-size: 0.8em;
  flex: 0 1 10rem;
  margin: 1.5rem 0.5rem;

  @media (max-width: 500px) {
    text-align: center;
  }
`
const Avatar = styled(Img)`
  border: 3px solid #eee;
  border-radius: 50%;
  margin-right: 1em;
  transform: none !important; /* Don't transform img because LinkStyled is already */
`
const LinkStyled = styled(Link)`
  display: block;
  transition: transform 0.3s;
  text-align: center;
  &:hover {
    transform: scale(1.06);
  }
`
const Name = styled.h2`
  margin: 0;
  color: ${(props) => props.theme.color.primary};
`
const Claim = styled.div`
  font-size: 0.8em;
`
const query = graphql`
  query {
    employees: allMarkdownRemark(
      sort: { order: ASC, fields: [frontmatter___name] }
      filter: { frontmatter: { templateKey: { eq: "employee-page" } } }
    ) {
      edges {
        node {
          id
          html
          frontmatter {
            templateKey
            slug
            name
            claim
            preview {
              childImageSharp {
                fixed(width: 200, height: 200) {
                  ...GatsbyImageSharpFixed_withWebp_noBase64
                }
                sqip(numberOfPrimitives: 8, blur: 16) {
                  dataURI
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
  const { employees } = useStaticQuery(query)

  return (
    <Section id="team" dark>
      <Container>
        <Title>Team</Title>
        <Subtitle>
          Mehr als 40 Jahre Erfahrung bei der Entwicklung von
          Enterprise-Software.
        </Subtitle>
        <EmployeeList>
          {employees.edges.map((edge) => {
            const { name, claim, slug, preview } = edge.node.frontmatter
            return (
              <Employee key={edge.node.id}>
                <LinkStyled to={slug}>
                  <Avatar
                    fixed={{
                      ...preview.childImageSharp.fixed,
                      base64: preview.childImageSharp.sqip.dataURI,
                    }}
                  />
                  <Name>{name}</Name>
                  <Claim>{claim}</Claim>
                </LinkStyled>
              </Employee>
            )
          })}
        </EmployeeList>
      </Container>
    </Section>
  )
}
