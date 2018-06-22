import React from 'react'
import Img from 'gatsby-image'
import Link from 'gatsby-link'
import styled from 'styled-components'
import PhoneIcon from 'react-icons/lib/fa/phone'
import EnvelopeIcon from 'react-icons/lib/fa/envelope'
import TwitterIcon from 'react-icons/lib/fa/twitter'

import { Section, Title, Subtitle, Container } from '../layouts/style'

const EmployeeList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 -0.5rem;
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

export default ({ employees }) => (
  <Section id="team" dark>
    <Container>
      <Title>Team</Title>
      <Subtitle>
        Mehr als 40 Jahre Erfahrung bei der Entwicklung von Enterprise-Software.
      </Subtitle>
      <EmployeeList>
        {employees.edges.map(edge => {
          const { name, claim, contact, path, preview } = edge.node.frontmatter
          return (
            <EmployeeWrapper key={edge.node.id}>
              <Employee>
                <LinkStyled to={path}>
                  <Avatar
                    resolutions={{
                      ...preview.childImageSharp.resolutions,
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
                  <a href={`https://twitter.com/${contact.twitter}`}>
                    <TwitterIcon />@{contact.twitter}
                  </a>
                </Contact>
              </Employee>
            </EmployeeWrapper>
          )
        })}
      </EmployeeList>
    </Container>
  </Section>
)

export const employeeFragment = graphql`
  fragment Employee_details on MarkdownRemark {
    html
    frontmatter {
      templateKey
      path
      name
      claim
      contact {
        tel
        mail
        twitter
      }
      preview {
        childImageSharp {
          resolutions(width: 200, height: 200) {
            ...GatsbyImageSharpResolutions_withWebp
          }
          sqip(numberOfPrimitives: 8, blur: 16) {
            dataURI
          }
        }
      }
    }
  }
`
