import React from 'react'
import Img from 'gatsby-image'
import { Link, useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import {
  FaPhone as PhoneIcon,
  FaEnvelope as EnvelopeIcon,
  FaTwitter as TwitterIcon,
} from 'react-icons/fa'

import { Section, Title, Subtitle, Container } from '../style'

const EmployeeList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 800px;
`
const EmployeeWrapper = styled.div`
  font-size: 0.8em;
  flex: 1 0 10rem;
  margin: 2rem 0.5rem;

  @media (max-width: 500px) {
    text-align: center;
  }
`
const Employee = styled.div`
  width: 10rem;
  margin-left: auto;
  margin-right: auto;
`
const Avatar = styled(Img)`
  border: 3px solid #eee;
  border-radius: 50%;
  margin-right: 1em;
  transform: translateZ(0); /* Safari bug rounded image flicker  */
`
const LinkStyled = styled(Link)`
  display: block;
  /* transition: transform 0.3s;
  &:hover {
    transform: scale(1.06);
  } */
`
const Name = styled.h2`
  margin: 0;
  color: ${props => props.theme.color.primary};
`
const Claim = styled.div`
  font-size: 0.8em;
`
const Contact = styled.div`
  font-size: 0.9em;
  margin-top: 1em;
  a {
    display: block;
    margin-top: 0.4em;
    color: #777;
    white-space: nowrap;

    svg {
      font-size: 0.9em;
      margin-right: 0.4em;
      color: #aaa;
    }
  }
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
            contact {
              tel
              mail
              twitter
            }
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
          {employees.edges.map(edge => {
            const {
              name,
              claim,
              contact,
              slug,
              preview,
            } = edge.node.frontmatter
            return (
              <EmployeeWrapper key={edge.node.id}>
                <Employee>
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
                  <Contact>
                    <a href={`tel:${contact.tel}`}>
                      <PhoneIcon />
                      {contact.tel}
                    </a>
                    <a href={`mailto:${contact.mail}`}>
                      <EnvelopeIcon />
                      {contact.mail}
                    </a>
                    {contact.twitter && (
                      <a href={`https://twitter.com/${contact.twitter}`}>
                        <TwitterIcon />@{contact.twitter}
                      </a>
                    )}
                  </Contact>
                </Employee>
              </EmployeeWrapper>
            )
          })}
        </EmployeeList>
      </Container>
    </Section>
  )
}
